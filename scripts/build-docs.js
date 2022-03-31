#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const { marked } = require("marked");
const jsdoc2md = require("jsdoc-to-markdown");

const args = process.argv.slice(2);
const mode = args[0] || "watch";
const base = args[1];

const markedRenderer = new marked.Renderer();

const root = path.join(process.cwd(), "docs", "src");
const out = path.join(process.cwd(), "docs", "dist");
fs.mkdirSync(out, { recursive: true });

// const APIS = [
//   { folder: "core", files: ["itto", "input", "drawing"], page: "core" },
//   { folder: "core", files: ["settings"], page: "settings" },
// ];

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
};

const replaceAsync = async (str, regex, asyncFn) => {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
};

class DocumentationBuilder {
  constructor() {
    this.dom = null;
    this.parseIndex();
  }

  parseIndex() {
    const index = fs.readFileSync(path.join(root, "index.html"), { encoding: "utf8", flag: "r" });
    this.dom = new JSDOM(index);
  }

  async parseApi(file) {
    const api = await jsdoc2md.render({
      files: file,
      partial: [path.join(process.cwd(), "docs", "partials", "body.hbs")],
    });
    return api;
  }

  async parseMarkdown(file) {
    let content = fs.readFileSync(path.join(root, file), { encoding: "utf8", flag: "r" });

    const markdownIncludes = /\[\[.*?\]\]/g;
    content = content.replace(markdownIncludes, (match) => {
      const include = match.slice(2, match.length - 2);
      return this.parseMarkdown(include);
    });

    const apiIncludes = /\{\[.*?\]}/g;
    content = await replaceAsync(content, apiIncludes, async (match) => {
      const include = match.slice(2, match.length - 2);
      const api = await this.parseApi(path.join(process.cwd(), include));
      return api;
    });

    return content;
  }

  async renderPage({ markdown = "pages/index.md", url = "/" } = {}) {
    const clone = new JSDOM(this.dom.window.document.documentElement.innerHTML);

    if (base) {
      for (const node of clone.window.document.querySelectorAll("[href]")) {
        if (node.href.startsWith("/")) {
          node.href = base + node.href;
        }
      }
    }

    const content = await this.parseMarkdown(markdown);
    const html = marked(content, {
      renderer: markedRenderer,
      breaks: true,
      headerIds: false,
    });
    clone.window.document.querySelector("section").innerHTML = html;

    console.log(`Building ${url}`);
    const destination = path.join(out, url);
    fs.mkdirSync(destination, { recursive: true });
    fs.writeFileSync(path.join(destination, "index.html"), clone.serialize());
  }

  async renderSite() {
    this.copy("style.css");
    await this.renderPage();
    const pages = this.dom.window.document.querySelectorAll("[data-md]");
    for (const page of pages) {
      const url = page.getAttribute("href");
      await this.renderPage({ markdown: page.dataset.md, url });
    }
  }

  async handleFileChange(event, filename) {
    console.log(`${filename} file Changed`);

    if (filename === "index.html") {
      this.parseIndex();
      await this.renderSite();
    } else if (filename.endsWith("md")) {
      const affectedNodes = this.dom.window.document.querySelectorAll(
        `[data-md*="${path.basename(filename)}"]`
      );
      for (const node of affectedNodes) {
        const url = node.getAttribute("href");
        this.renderPage({ markdown: filename, url });
      }
    } else if (filename.endsWith(".js")) {
      // await this.parseApis();
      await this.renderSite();
    } else {
      this.copy(filename);
    }
  }

  copy(src) {
    fs.copyFileSync(path.join(root, src), path.join(out, src));
  }

  watch() {
    fs.watch(root, { recursive: true }, debounce(this.handleFileChange.bind(this), 500));
    fs.watch(
      path.join(process.cwd(), "itto"),
      { recursive: true },
      debounce(this.handleFileChange.bind(this), 500)
    );
  }

  // async parseApis() {
  //   await Promise.all(
  //     APIS.map(async ({ folder, files, page }) => {
  //       const docs = await jsdoc2md.render({
  //         files: files.map((file) => path.join(process.cwd(), "itto", folder, `${file}.js`)),
  //         partial: [path.join(process.cwd(), "docs", "partials", "body.hbs")],
  //       });
  //       fs.mkdirSync(path.join(root, "pages", "api"), { recursive: true });
  //       fs.writeFileSync(path.join(root, "pages", "api", `${page}.md`), docs);
  //     })
  //   );
  // }
}

const builder = new DocumentationBuilder();
switch (mode) {
  case "watch":
    builder.renderSite().then(() => builder.watch());
    break;

  case "build":
    builder.renderSite();
    break;

  default:
    break;
}

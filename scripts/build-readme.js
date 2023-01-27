#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const jsdoc2md = require("jsdoc-to-markdown");

const replaceAsync = async (str, regex, asyncFn) => {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
};

const parseApi = async (file, linesToTruncate) => {
  const api = await jsdoc2md.render({
    files: file,
    partial: [path.join(process.cwd(), "docs", "partials", "body.hbs")],
    "example-lang": "js",
    "name-format": "<code>string</code>",
    "heading-depth": 3,
  });
  return api
    .split("\n")
    .slice(linesToTruncate || 0)
    .join("\n");
};

const parseReadme = async (file) => {
  let content = fs.readFileSync(file, { encoding: "utf8", flag: "r" });

  // const markdownIncludes = /\[\[.*?\]\]/g;
  // content = content.replace(markdownIncludes, (match) => {
  //   const include = match.slice(2, match.length - 2);
  //   return this.parseMarkdown(include);
  // });

  const apiIncludes = /\{\[.*?\]}/g;
  content = await replaceAsync(content, apiIncludes, async (match) => {
    const include = match.slice(2, match.length - 2);
    const [file, linesToTruncate] = include.split(":");
    const api = await parseApi(path.join(process.cwd(), file), linesToTruncate);
    return api;
  });

  const contentIncludes = /\[\[.*?\]\]/g;
  content = await replaceAsync(content, contentIncludes, async (match) => {
    const include = match.slice(2, match.length - 2);
    switch (include) {
      case "examples":
        return fs.readdirSync(path.join(process.cwd(), "examples"), { withFileTypes: true })
          .filter((dir) => dir.isDirectory())
          .filter((dir) => !["assets", "dist"].includes(dir.name))
          .filter((dir) => !dir.name.startsWith("."))
          .map((dir) => `* [${dir.name}](https://leoncvlt.github.io/itto/${dir.name})`)
          .join("\n");
        break;

      default:
        break;
    }
    return "";
  });

  return content;
};

parseReadme(path.join(process.cwd(), "docs", "README.draft.md")).then((content) =>
  fs.writeFileSync("README.md", content)
);

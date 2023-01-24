const { resolve, join } = require("path");
const { defineConfig } = require("vite");
const { readdirSync, renameSync, symlinkSync } = require("fs");

const input = readdirSync(__dirname, { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .filter((dir) => !["assets", "dist"].includes(dir.name))
  .filter((dir) => !dir.name.startsWith("."))
  .reduce((entries, dir) => {
    try {
      symlinkSync(
        resolve(__dirname, `.template/index.html`),
        resolve(__dirname, `${dir.name}/index.html`),
        "file"
      );
    } catch (error) {
      console.error(error);
    }
    return {
      ...entries,
      [dir.name]: resolve(__dirname, `${dir.name}/index.html`),
    };
  }, {});

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "assets",
  base: "/itto/",
  server: {
    host: true,
  },
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input,
    },
  },
  // plugins: [
  //   {
  //     name: "postbuild-copy-public-assets",
  //     closeBundle: async () => {
  //       readdirSync(resolve(__dirname, "dist"), { withFileTypes: true })
  //         .filter((file) => file.isFile())
  //         .forEach((file) =>
  //           renameSync(
  //             resolve(__dirname, `dist/${file.name}`),
  //             resolve(__dirname, `dist/assets/${file.name}`)
  //           )
  //         );
  //     },
  //   },
  // ],
});

const { resolve } = require("path");
const { defineConfig } = require("vite");
const { readdirSync, symlinkSync, copyFileSync } = require("fs");

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
  base: "./",
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
  plugins: [
    {
      name: "postbuild-copy-assets",
      closeBundle: async () => {
        readdirSync(resolve(__dirname, "assets"), { withFileTypes: true })
          .filter((file) => file.isFile())
          .forEach((file) =>
            copyFileSync(
              resolve(__dirname, `assets/${file.name}`),
              resolve(__dirname, `dist/assets/${file.name}`)
            )
          );
      },
    },
  ],
});

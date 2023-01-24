const { resolve, join } = require("path");
const { defineConfig } = require("vite");
const { readdirSync } = require("fs");

const input = readdirSync(__dirname, { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .filter((dir) => !["assets", "dist"].includes(dir.name))
  .filter((dir) => !dir.name.startsWith("."))
  .reduce(
    (entries, dir) => ({
      ...entries,
      [dir.name]: resolve(__dirname, `${dir.name}/index.html`),
    }),
    {}
  );

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "assets",
  base: "/../",
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
});

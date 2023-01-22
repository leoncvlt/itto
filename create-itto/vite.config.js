const { defineConfig } = require("vite");

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  base: "./",
  publicDir: "assets",
  server: {
    open: true,
  },
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    outDir: "../build/web",
    emptyOutDir: true,
  },
});

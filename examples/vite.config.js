const { resolve } = require("path");
const { defineConfig } = require("vite");

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "assets",
  server: {
    host: true,
  },
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        hello: resolve(__dirname, "hello/index.html"),
        playground: resolve(__dirname, "playground/index.html"),
      },
    },
  },
});

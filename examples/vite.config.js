const { resolve } = require("path");
const { defineConfig } = require("vite");

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "assets",
  server: {
    host: true,
    open: true,
  },
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        playground: resolve(__dirname, "playground/index.html"),
      },
    },
  },
});

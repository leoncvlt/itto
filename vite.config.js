const path = require("path");
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./examples",
  base: "./",
  server: {
    host: true,
    open: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    lib: {
      name: "itto",
      entry: path.resolve(__dirname, "src/index.js"),
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        itto: path.resolve(__dirname, "src/index.js"),
        // test: path.resolve(__dirname, "src/test.js"),
      },
      output: {
        // preserveModules: true,
        entryFileNames: ({ name: fileName }) => `${fileName}.js`,
      },
    },
  },
});

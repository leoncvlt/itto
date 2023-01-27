const { resolve } = require("path");
const { defineConfig } = require("vite");
const { transform } = require("esbuild");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    lib: {
      name: "itto",
      entry: resolve(__dirname, "core/index.js"),
      formats: ["es", "iife"],
      fileName: (format) =>
        ({
          es: `itto.mjs`,
          iife: `itto.js`,
        }[format]),
    },
    rollupOptions: {
      input: {
        core: resolve(__dirname, "core/index.js"),
      },
      output: {
        // preserveModules: true,
        // entryFileNames: ({ name: fileName }) => `itto.${fileName}.js`,
      },
    },
  },
});

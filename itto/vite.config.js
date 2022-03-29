const { resolve } = require("path");
const { defineConfig } = require("vite");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    lib: {
      name: "itto",
      entry: resolve(__dirname, "core/index.js"),
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        core: resolve(__dirname, "core/index.js"),
        utils: resolve(__dirname, "utils/index.js"),
      },
      output: {
        // preserveModules: true,
        entryFileNames: ({ name: fileName }) => `itto.${fileName}.js`,
      },
    },
  },
});

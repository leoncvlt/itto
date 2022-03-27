const { resolve } = require("path");
const { defineConfig } = require("vite");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    lib: {
      name: "itto",
      entry: resolve(__dirname, "itto/index.js"),
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        core: resolve(__dirname, "itto/core/index.js"),
        utils: resolve(__dirname, "itto/utils/index.js"),
      },
      output: {
        // preserveModules: true,
        entryFileNames: ({ name: fileName }) => `itto.${fileName}.js`,
      },
    },
  },
});

import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  base: "./",
  publicDir: "assets",
  plugins: [viteSingleFile({ removeViteModuleLoader: true })],
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

import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
    }),
  ],
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  server: {
    host: true,
    proxy: {
      "/api": "http://localhost:7100",
    },
  },
});

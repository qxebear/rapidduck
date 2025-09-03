import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["opensearch.xml"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,xml,svg}"],
        navigateFallbackDenylist: [
          /\/opensearch\.xml$/,
          /\.xml$/,
          /robots\.txt$/, 
          /manifest\.webmanifest$/,
        ],
      },
    }),
  ],
  server: {
    host: true,
  },
});

import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config"; // import lit from '@astrojs/lit';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-minimal-starter.netlify.app/",
  base: "/sub/",
  integrations: [
    sitemap(),
    AstroPWA({
      devOptions: {
        enabled: true,
      },
      registerType: "autoUpdate",
      manifest: {
        name: "example",
        short_name: "example",
        description: "example",
        start_url: "index.html",
        id: "example",
        scope: "/",
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ["{**/*.{js,css},index.html}"],
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /\.(js|css|ttf)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "app-resources",
              cacheableResponse: {
                statuses: [200],
              },
              expiration: {
                maxAgeSeconds: 60 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
});

// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://hoopla.uz",
  output: "static",
  adapter: node({ mode: "standalone" }),
  i18n: {
    defaultLocale: "uz",
    locales: ["uz", "en", "ru"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 3000,
  },
});

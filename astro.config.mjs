// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import solid from "@astrojs/solid-js";
import wyw from "@wyw-in-js/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [solid(), mdx(), sitemap()],
  output: "server",
  adapter: netlify(),
  vite: {
    plugins: [
      wyw({
        babelOptions: {
          presets: ["solid"]
        }
      })
    ]
  }
});
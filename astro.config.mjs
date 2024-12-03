import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';


// https://astro.build/config
export default defineConfig({
  site: 'https://medical-isvil.com.pe/',
  integrations: [
    tailwind(),
    react(),
    sitemap(),
  ],

  // o "hybrid"
  output: "server",
  adapter: vercel()
});
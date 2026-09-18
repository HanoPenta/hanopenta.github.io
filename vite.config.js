import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        news: resolve(import.meta.dirname, 'news.html'),
        works: resolve(import.meta.dirname, 'works.html'),
        portfolio: resolve(import.meta.dirname, 'portfolio.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
      },
    },
  },
});

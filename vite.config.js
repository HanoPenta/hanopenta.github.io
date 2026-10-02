import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        service: resolve(import.meta.dirname, 'service.html'),
        news: resolve(import.meta.dirname, 'news.html'),
        works: resolve(import.meta.dirname, 'works.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
      },
    },
  },
});

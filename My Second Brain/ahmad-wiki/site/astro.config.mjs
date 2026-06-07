import { defineConfig } from 'astro/config';
import remarkWikiLink from './src/plugins/remark-wiki-link';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkWikiLink],
    shikiConfig: {
      theme: 'github-light',
    },
  },
  output: 'static',
  vite: {
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js'],
      },
    },
  },
});

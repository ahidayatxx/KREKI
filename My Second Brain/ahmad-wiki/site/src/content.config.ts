import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const wikiBase = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'wiki');

const wiki = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!_meta/**'],
    base: wikiBase,
  }),
});

export const collections = { wiki };

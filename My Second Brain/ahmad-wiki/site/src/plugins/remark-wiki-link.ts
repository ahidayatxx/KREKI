import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { visit } from 'unist-util-visit';

let indexCache: Record<string, string> | null = null;

function loadIndex(): Record<string, string> {
  if (indexCache) return indexCache;
  const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');
  const raw = readFileSync(join(dataDir, 'wiki-index.json'), 'utf-8');
  indexCache = JSON.parse(raw);
  return indexCache;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[&\s]+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function resolveWikiLink(title: string): string | null {
  const index = loadIndex();
  if (index[title]) return index[title];
  if (index[slugify(title)]) return index[slugify(title)];
  return null;
}

export default function remarkWikiLink() {
  return (tree: any) => {
    visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined || typeof node.value !== 'string') return;

      const value: string = node.value;
      const regex = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;
      const matches = [...value.matchAll(regex)];
      if (matches.length === 0) return;

      const children: any[] = [];
      let lastIndex = 0;

      for (const match of matches) {
        const [fullMatch, target, displayText] = match;
        const start = match.index!;

        if (start > lastIndex) {
          children.push({ type: 'text', value: value.slice(lastIndex, start) });
        }

        const display = displayText?.trim() || target.trim();
        const resolvedPath = resolveWikiLink(target.trim());

        if (resolvedPath) {
          const slug = resolvedPath.split('/').pop();
          children.push({
            type: 'link',
            url: `/wiki/${slug}`,
            children: [{ type: 'text', value: display }],
          });
        } else {
          children.push({
            type: 'html',
            value: `<span class="wiki-link-broken" title="Page not yet created">${display}</span>`,
          });
        }

        lastIndex = start + fullMatch.length;
      }

      if (lastIndex < value.length) {
        children.push({ type: 'text', value: value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}

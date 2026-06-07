import { readFileSync, writeFileSync } from 'node:fs';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep, parse, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WIKI_DIR = join(__dirname, '..', 'wiki');
const OUTPUT = join(__dirname, '..', 'src', 'data', 'wiki-index.json');

function walk(dir) {
  let results = [];
  for (const entry of readdirSync(dir)) {
    if (entry === '_meta') continue; // Skip internal metadata pages
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results = results.concat(walk(full));
    } else if (entry.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function extractTitle(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const nameMatch = content.match(/^---\n[\s\S]*?name:\s*["']?(.+?)["']?\s*\n[\s\S]*?---/);
  if (nameMatch) return nameMatch[1].trim();
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();
  return parse(filePath).name.replace(/-/g, ' ');
}

function extractCategory(filePath) {
  const rel = relative(WIKI_DIR, filePath);
  const parts = rel.split(sep);
  return parts.length > 1 ? parts[0] : '';
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[&\s]+/g, '-')
    .replace(/[^a-z0-9À-ɏ\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const files = walk(WIKI_DIR);
const index = {};

for (const file of files) {
  const title = extractTitle(file);
  const category = extractCategory(file);
  const slug = parse(file).name;
  const path = category ? `${category}/${slug}` : slug;
  index[title] = path;
  index[slugify(title)] = path;
}

writeFileSync(OUTPUT, JSON.stringify(index, null, 2));
console.log(`Wiki index built: ${Object.keys(index).length} entries from ${files.length} files`);

# Ahmad Wiki Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Wikipedia-like website from the 41 existing ahmad-wiki markdown pages, browsable locally with sidebar navigation, wiki-link resolution, backlinks panel, and full-text search.

**Architecture:** Astro 5 static site. Content collections use a glob loader reading directly from `../wiki/`. A custom remark plugin resolves `[[Title]]` and `[[target|display]]` wiki-link syntax into proper `<a>` tags. Backlinks are computed at build time from the raw markdown. Pagefind provides client-side search. Vanilla CSS for a clean Wikipedia-like reading experience.

**Tech Stack:** Astro 5, TypeScript, Pagefind, vanilla CSS

---

## File Structure

```
ahmad-wiki/
├── wiki/                          # Source of truth (existing, never modified by site)
├── raw/                           # Raw sources (existing)
├── CLAUDE.md                      # Wiki schema (existing)
├── docs/
│   └── superpowers/plans/         # This plan
└── site/                          # Astro project (new)
    ├── package.json
    ├── astro.config.mjs
    ├── tsconfig.json
    ├── scripts/
    │   └── build-wiki-index.mjs   # Pre-build: scans wiki/, outputs title→path JSON
    ├── src/
    │   ├── content.config.ts      # Content collection: glob loader → ../wiki
    │   ├── plugins/
    │   │   └── remark-wiki-link.ts  # [[Title]] → <a href="/wiki/...">
    │   ├── utils/
    │   │   └── slugify.ts         # Title → slug helper
    │   ├── layouts/
    │   │   └── WikiLayout.astro   # Wikipedia-style page shell
    │   ├── components/
    │   │   ├── Sidebar.astro      # Category-grouped navigation
    │   │   ├── Backlinks.astro    # "Pages that link here" panel
    │   │   ├── TagList.astro      # Frontmatter tag badges
    │   │   └── PageMeta.astro     # Type, updated date, source badges
    │   ├── pages/
    │   │   ├── index.astro        # Home: wiki index / dashboard
    │   │   └── wiki/
    │   │       └── [...slug].astro  # Dynamic route for all wiki pages
    │   └── styles/
    │       └── global.css         # Wikipedia-like design system
    └── public/
        └── pagefind/             # Search index (generated post-build)
```

**Key design decisions:**

- **Flat URLs**: `/wiki/ahmad-hidayat` not `/wiki/entities/ahmad-hidayat`. All basenames are unique across categories (verified). Cleaner URLs, Wikipedia feel.
- **Pre-build index script**: `build-wiki-index.mjs` scans wiki files, extracts H1 headings, outputs `wiki-index.json`. The remark plugin reads this to resolve titles.
- **Broken links**: Pages linked but not yet created (e.g., `[[AeHIN]]`) render as red italic text — like Wikipedia stubs.
- **No framework CSS**: Vanilla CSS with custom properties. Lighter than Tailwind, perfectly adequate for a reading-focused wiki.

---

### Task 1: Initialize Astro Project

**Files:**
- Create: `site/package.json`
- Create: `site/astro.config.mjs`
- Create: `site/tsconfig.json`

- [ ] **Step 1: Create project directory and package.json**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
mkdir -p site/src/{plugins,utils,layouts,components,pages/wiki,styles} site/scripts site/public
```

Create `site/package.json`:

```json
{
  "name": "ahmad-wiki-site",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "prebuild": "node scripts/build-wiki-index.mjs",
    "dev": "node scripts/build-wiki-index.mjs && astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "postbuild": "npx pagefind --site dist/"
  },
  "dependencies": {
    "astro": "^5"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run:
```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site"
npm install
```

Expected: `node_modules/` created, `package-lock.json` generated.

- [ ] **Step 3: Create astro.config.mjs**

Create `site/astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  output: 'static',
});
```

- [ ] **Step 4: Create tsconfig.json**

Create `site/tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 5: Verify dev server starts**

Run:
```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site"
npx astro dev --port 4321
```

Expected: Server starts on `http://localhost:4321` (shows Astro default page or 404 — both OK).

- [ ] **Step 6: Commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/package.json site/package-lock.json site/astro.config.mjs site/tsconfig.json
git commit -m "feat(wiki-site): initialize Astro project"
```

---

### Task 2: Build Wiki Title Index Script

**Files:**
- Create: `site/scripts/build-wiki-index.mjs`
- Create: `site/src/utils/slugify.ts`

This script runs before each build/dev session. It scans all wiki markdown files, extracts the H1 heading and frontmatter `name` field, and outputs a JSON map of `{ "Page Title": "category/slug", ... }`. The remark plugin reads this file to resolve `[[wiki-links]]`.

- [ ] **Step 1: Create slugify utility**

Create `site/src/utils/slugify.ts`:

```ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[&\s]+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
```

- [ ] **Step 2: Create the index builder script**

Create `site/scripts/build-wiki-index.mjs`:

```js
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

  // Try frontmatter "name" field first
  const nameMatch = content.match(/^---\n[\s\S]*?name:\s*["']?(.+?)["']?\s*\n[\s\S]*?---/);
  if (nameMatch) return nameMatch[1].trim();

  // Fall back to first H1
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();

  // Fall back to filename
  return parse(filePath).name.replace(/-/g, ' ');
}

function extractCategory(filePath) {
  // e.g., wiki/entities/ahmad-hidayat.md → "entities"
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
  const slug = parse(file).name; // filename without extension, e.g., "ahmad-hidayat"
  const path = category ? `${category}/${slug}` : slug;

  index[title] = path;

  // Also index by the slugified title for fuzzy matching
  index[slugify(title)] = path;
}

writeFileSync(OUTPUT, JSON.stringify(index, null, 2));
console.log(`Wiki index built: ${Object.keys(index).length} entries from ${files.length} files`);
```

- [ ] **Step 3: Run the index builder**

```bash
mkdir -p "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site/src/data"
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site"
node scripts/build-wiki-index.mjs
```

Expected: `src/data/wiki-index.json` created with entries like `"Cynefin Framework": "concepts/cynefin-framework"`.

- [ ] **Step 4: Verify index output**

Run:
```bash
cat "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site/src/data/wiki-index.json" | head -20
```

Expected: JSON object mapping page titles to category/slug paths.

- [ ] **Step 5: Add wiki-index.json to .gitignore**

Create `site/.gitignore`:

```
node_modules/
dist/
src/data/wiki-index.json
```

- [ ] **Step 6: Commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/scripts/ site/src/utils/ site/src/data/ site/.gitignore
git commit -m "feat(wiki-site): add wiki index builder and slugify utility"
```

---

### Task 3: Create Remark Wiki-Link Plugin

**Files:**
- Create: `site/src/plugins/remark-wiki-link.ts`

Resolves `[[Page Title]]` and `[[target|display text]]` into `<a>` links. Reads the pre-built `wiki-index.json` for title→path resolution.

- [ ] **Step 1: Write the plugin**

Create `site/src/plugins/remark-wiki-link.ts`:

```ts
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

      // Match [[Title]] and [[target|display text]]
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
          // Extract slug from path (e.g., "entities/ahmad-hidayat" → "ahmad-hidayat")
          const slug = resolvedPath.split('/').pop();
          children.push({
            type: 'link',
            url: `/wiki/${slug}`,
            children: [{ type: 'text', value: display }],
          });
        } else {
          // Broken link → styled as red italic stub (wrapped in html for class)
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
```

- [ ] **Step 2: Install unist-util-visit dependency**

Run:
```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site"
npm install unist-util-visit
```

- [ ] **Step 3: Register plugin in astro.config.mjs**

Update `site/astro.config.mjs`:

```js
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
});
```

- [ ] **Step 4: Commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/src/plugins/ site/astro.config.mjs site/package.json site/package-lock.json
git commit -m "feat(wiki-site): add remark-wiki-link plugin for [[wiki-link]] resolution"
```

---

### Task 4: Create Content Collection Config

**Files:**
- Create: `site/src/content.config.ts`

Uses Astro 5's Content Layer API with a glob loader to read directly from `../wiki/`. No copying, no symlinks — the wiki directory is the single source of truth.

- [ ] **Step 1: Write content config**

Create `site/src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const wikiBase = join(dirname(fileURLToPath(import.meta.url)), '..', 'wiki');

const wiki = defineCollection({
  loader: glob({ pattern: '**/*.md', base: wikiBase }),
});

export const collections = { wiki };
```

- [ ] **Step 2: Verify content collection loads**

Create a temporary test page `site/src/pages/test.astro`:

```astro
---
import { getCollection } from 'astro:content';
const pages = await getCollection('wiki');
---

<ul>
  {pages.map(p => <li>{p.id}</li>)}
</ul>
```

Run:
```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site"
npx astro dev --port 4321
```

Open `http://localhost:4321/test`. Expected: List of ~41 page IDs like `entities/ahmad-hidayat`, `concepts/cynefin-framework`.

- [ ] **Step 3: Delete test page and commit**

```bash
rm "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site/src/pages/test.astro"
```

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/src/content.config.ts
git commit -m "feat(wiki-site): add content collection reading from wiki/ directory"
```

---

### Task 5: Create Global Styles

**Files:**
- Create: `site/src/styles/global.css`

Wikipedia-inspired design: clean serif headings, readable body text, subtle borders, blue links, red broken links.

- [ ] **Step 1: Write the stylesheet**

Create `site/src/styles/global.css`:

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f8f9fa;
  --color-border: #a2a9b1;
  --color-border-light: #eaecf0;
  --color-text: #202122;
  --color-text-muted: #54595d;
  --color-link: #0645ad;
  --color-link-visited: #0b0080;
  --color-link-broken: #ba0000;
  --color-accent: #3366cc;
  --color-tag-bg: #eaf3ff;
  --color-tag-text: #36465d;
  --color-sidebar-bg: #f8f9fa;
  --color-sidebar-active: #e8f0fe;
  --font-heading: 'Linux Libertine', 'Georgia', 'Times', serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Menlo', 'Consolas', monospace;
  --sidebar-width: 260px;
  --max-content: 960px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.65;
}

/* Layout */
.app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: var(--sidebar-width);
  background: var(--color-sidebar-bg);
  border-right: 1px solid var(--color-border-light);
  padding: 1.5rem 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
}

.main-content {
  margin-left: var(--sidebar-width);
  flex: 1;
  min-width: 0;
}

.content-area {
  max-width: var(--max-content);
  margin: 0 auto;
  padding: 2rem 2.5rem 4rem;
}

/* Typography */
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  border-bottom: 1px solid var(--color-border-light);
  padding-bottom: 0.2em;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.3;
}

h1 {
  font-size: 1.8rem;
  margin-top: 0;
  border-bottom-color: var(--color-border);
}

h2 { font-size: 1.4rem; }
h3 { font-size: 1.2rem; border-bottom: none; }
h4 { font-size: 1.05rem; border-bottom: none; }

p {
  margin-bottom: 0.8em;
}

/* Links */
a {
  color: var(--color-link);
  text-decoration: none;
}

a:visited {
  color: var(--color-link-visited);
}

a:hover {
  text-decoration: underline;
}

.wiki-link-broken {
  color: var(--color-link-broken);
  font-style: italic;
  cursor: help;
}

/* Lists */
ul, ol {
  margin: 0.5em 0 0.8em 1.5em;
}

li {
  margin-bottom: 0.3em;
}

/* Tables */
table {
  border-collapse: collapse;
  width: 100%;
  margin: 0.8em 0;
  font-size: 0.95rem;
}

th, td {
  border: 1px solid var(--color-border);
  padding: 0.5em 0.8em;
  text-align: left;
}

th {
  background: var(--color-surface);
  font-weight: 600;
}

/* Code */
code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--color-surface);
  padding: 0.15em 0.35em;
  border-radius: 3px;
}

pre {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: 4px;
  padding: 1em;
  overflow-x: auto;
  margin: 0.8em 0;
}

pre code {
  background: none;
  padding: 0;
}

/* Blockquotes */
blockquote {
  border-left: 3px solid var(--color-border);
  padding-left: 1em;
  color: var(--color-text-muted);
  margin: 0.8em 0;
  font-style: italic;
}

/* Horizontal rule */
hr {
  border: none;
  border-top: 1px solid var(--color-border-light);
  margin: 1.5em 0;
}

/* Tags */
.tag {
  display: inline-block;
  background: var(--color-tag-bg);
  color: var(--color-tag-text);
  font-size: 0.8rem;
  padding: 0.15em 0.6em;
  border-radius: 12px;
  margin: 0.15em;
  white-space: nowrap;
}

/* Page meta */
.page-meta {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: 1.5em;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8em;
  align-items: center;
}

.page-meta .type-badge {
  background: var(--color-accent);
  color: white;
  padding: 0.15em 0.6em;
  border-radius: 3px;
  font-size: 0.8rem;
  text-transform: capitalize;
}

/* Backlinks */
.backlinks {
  margin-top: 2.5em;
  padding-top: 1.5em;
  border-top: 1px solid var(--color-border);
}

.backlinks h3 {
  font-size: 1.1rem;
  font-family: var(--font-body);
  font-weight: 600;
  margin-bottom: 0.5em;
}

.backlinks ul {
  list-style: none;
  margin-left: 0;
}

.backlinks li {
  padding: 0.3em 0;
}

.backlinks li::before {
  content: "← ";
  color: var(--color-text-muted);
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .main-content {
    margin-left: 0;
  }

  .content-area {
    padding: 1.5rem 1rem 3rem;
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/src/styles/
git commit -m "feat(wiki-site): add Wikipedia-inspired global stylesheet"
```

---

### Task 6: Create Sidebar Component

**Files:**
- Create: `site/src/components/Sidebar.astro`

Category-grouped navigation matching the wiki's 7 content sections. Highlights current page.

- [ ] **Step 1: Write Sidebar component**

Create `site/src/components/Sidebar.astro`:

```astro
---
import { getCollection } from 'astro:content';

interface Props {
  currentPageId?: string;
}

const { currentPageId = '' } = Astro.props;

const pages = await getCollection('wiki');

// Group pages by category (directory name from page.id)
const categories: Record<string, string> = {
  entities: 'Entities',
  concepts: 'Concepts',
  domains: 'Domains',
  sources: 'Sources',
  workstreams: 'Workstreams',
  outputs: 'Outputs',
  synthesis: 'Synthesis',
};

const grouped: Record<string, { id: string; title: string; slug: string }[]> = {};

for (const [key] of Object.entries(categories)) {
  grouped[key] = [];
}

for (const page of pages) {
  const parts = page.id.split('/');
  const category = parts.length > 1 ? parts[0] : 'uncategorized';
  const slug = parts.pop()!;

  const title =
    (page.data as any).name ||
    (page.data as any).title ||
    slug.replace(/-/g, ' ');

  if (!grouped[category]) grouped[category] = [];
  grouped[category].push({ id: page.id, title, slug });
}

// Sort pages within each category alphabetically
for (const key of Object.keys(grouped)) {
  grouped[key].sort((a, b) => a.title.localeCompare(b.title));
}

const currentSlug = currentPageId.split('/').pop();
---

<aside class="sidebar">
  <div class="sidebar-header">
    <a href="/" class="sidebar-title">Ahmad Wiki</a>
    <span class="sidebar-subtitle">Second Brain</span>
  </div>

  <nav class="sidebar-nav">
    {Object.entries(categories).map(([key, label]) => grouped[key]?.length > 0 && (
      <div class="sidebar-section">
        <div class="sidebar-section-title">{label}</div>
        <ul class="sidebar-list">
          {grouped[key].map(page => (
            <li>
              <a
                href={`/wiki/${page.slug}`}
                class:list={['sidebar-link', { active: page.slug === currentSlug }]}
              >
                {page.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </nav>
</aside>

<style>
  .sidebar-header {
    padding: 0 1.25rem 1rem;
    border-bottom: 1px solid var(--color-border-light);
    margin-bottom: 0.5rem;
  }

  .sidebar-title {
    display: block;
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text);
    text-decoration: none;
  }

  .sidebar-title:hover {
    text-decoration: none;
    color: var(--color-accent);
  }

  .sidebar-subtitle {
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }

  .sidebar-section {
    margin-bottom: 0.25rem;
  }

  .sidebar-section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    padding: 0.75rem 1.25rem 0.25rem;
  }

  .sidebar-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .sidebar-link {
    display: block;
    padding: 0.3rem 1.25rem 0.3rem 1.5rem;
    font-size: 0.88rem;
    color: var(--color-text);
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: background 0.15s, border-color 0.15s;
  }

  .sidebar-link:hover {
    background: var(--color-sidebar-active);
    text-decoration: none;
  }

  .sidebar-link.active {
    background: var(--color-sidebar-active);
    border-left-color: var(--color-accent);
    font-weight: 500;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/src/components/Sidebar.astro
git commit -m "feat(wiki-site): add Sidebar component with category-grouped navigation"
```

---

### Task 7: Create PageMeta, TagList, and Backlinks Components

**Files:**
- Create: `site/src/components/PageMeta.astro`
- Create: `site/src/components/TagList.astro`
- Create: `site/src/components/Backlinks.astro`

- [ ] **Step 1: Write PageMeta component**

Create `site/src/components/PageMeta.astro`:

```astro
---
interface Props {
  type: string;
  subtype?: string;
  updated: string;
  sources?: string[];
}

const { type, subtype, updated, sources = [] } = Astro.props;
---

<div class="page-meta">
  <span class="type-badge">{subtype ? `${subtype}` : type}</span>
  {updated && <span>Updated: {updated}</span>}
  {sources.length > 0 && (
    <span>Sources: {sources.join(', ')}</span>
  )}
</div>
```

- [ ] **Step 2: Write TagList component**

Create `site/src/components/TagList.astro`:

```astro
---
interface Props {
  tags: string[];
}

const { tags = [] } = Astro.props;
---

{tags.length > 0 && (
  <div class="tag-list">
    {tags.map(tag => <span class="tag">{tag}</span>)}
  </div>
)}
```

- [ ] **Step 3: Write Backlinks component**

Create `site/src/components/Backlinks.astro`:

```astro
---
interface BacklinkEntry {
  slug: string;
  title: string;
}

interface Props {
  links: BacklinkEntry[];
}

const { links = [] } = Astro.props;
---

{links.length > 0 && (
  <section class="backlinks">
    <h3>Pages that link here</h3>
    <ul>
      {links.map(link => (
        <li>
          <a href={`/wiki/${link.slug}`}>{link.title}</a>
        </li>
      ))}
    </ul>
  </section>
)}
```

- [ ] **Step 4: Commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/src/components/PageMeta.astro site/src/components/TagList.astro site/src/components/Backlinks.astro
git commit -m "feat(wiki-site): add PageMeta, TagList, and Backlinks components"
```

---

### Task 8: Create Wiki Layout

**Files:**
- Create: `site/src/layouts/WikiLayout.astro`

The main page shell: sidebar + content area. Imports global CSS and all sub-components.

- [ ] **Step 1: Write the layout**

Create `site/src/layouts/WikiLayout.astro`:

```astro
---
import Sidebar from '../components/Sidebar.astro';
import PageMeta from '../components/PageMeta.astro';
import TagList from '../components/TagList.astro';
import Backlinks from '../components/Backlinks.astro';
import '../styles/global.css';

interface BacklinkEntry {
  slug: string;
  title: string;
}

interface Props {
  title: string;
  type: string;
  subtype?: string;
  updated?: string;
  tags?: string[];
  sources?: string[];
  backlinks?: BacklinkEntry[];
  currentPageId?: string;
}

const {
  title,
  type,
  subtype,
  updated,
  tags = [],
  sources = [],
  backlinks = [],
  currentPageId,
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} — Ahmad Wiki</title>
  </head>
  <body>
    <div class="app">
      <Sidebar currentPageId={currentPageId} />
      <main class="main-content">
        <article class="content-area">
          <h1>{title}</h1>
          <PageMeta type={type} subtype={subtype} updated={updated} sources={sources} />
          <TagList tags={tags} />
          <hr />
          <slot />
          <Backlinks links={backlinks} />
        </article>
      </main>
    </div>
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/src/layouts/WikiLayout.astro
git commit -m "feat(wiki-site): add WikiLayout with sidebar, meta, and backlinks"
```

---

### Task 9: Create Dynamic Wiki Page Route

**Files:**
- Create: `site/src/pages/wiki/[...slug].astro`

The core route. Reads all wiki pages, builds the backlink map at build time, and renders each page with the WikiLayout.

- [ ] **Step 1: Write the dynamic route**

Create `site/src/pages/wiki/[...slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import WikiLayout from '../../layouts/WikiLayout.astro';

export async function getStaticPaths() {
  const pages = await getCollection('wiki');

  // Build title→id index for backlink resolution
  const titleToId = new Map<string, string>();
  for (const page of pages) {
    const data = page.data as any;
    const title = data.name || data.title || page.id.split('/').pop()!.replace(/-/g, ' ');
    titleToId.set(title, page.id);
    // Also index lowercase for case-insensitive matching
    titleToId.set(title.toLowerCase(), page.id);
  }

  // Build backlink map: targetId → [{ slug, title }]
  const backlinkMap = new Map<string, { slug: string; title: string }[]>();

  for (const page of pages) {
    const body = page.body ?? '';
    const matches = [...body.matchAll(/\[\[([^\]|]+?)(?:\|[^\]]+?)?\]\]/g)];

    for (const match of matches) {
      const target = match[1].trim();
      const targetId = titleToId.get(target) || titleToId.get(target.toLowerCase());

      if (targetId) {
        const existing = backlinkMap.get(targetId) ?? [];
        const sourceSlug = page.id.split('/').pop()!;
        const sourceTitle = (page.data as any).name || (page.data as any).title || sourceSlug.replace(/-/g, ' ');

        if (!existing.some(e => e.slug === sourceSlug)) {
          existing.push({ slug: sourceSlug, title: sourceTitle });
        }
        backlinkMap.set(targetId, existing);
      }
    }
  }

  return pages.map(page => {
    const data = page.data as any;
    const slug = page.id.split('/').pop()!;

    return {
      params: { slug },
      props: {
        page,
        backlinks: backlinkMap.get(page.id) ?? [],
      },
    };
  });
}

const { page, backlinks } = Astro.props;
const { Content } = await render(page);
const data = page.data as any;
---

<WikiLayout
  title={data.name || data.title || page.id.split('/').pop()!.replace(/-/g, ' ')}
  type={data.type || 'page'}
  subtype={data.subtype}
  updated={data.updated}
  tags={data.tags || []}
  sources={data.sources || []}
  backlinks={backlinks}
  currentPageId={page.id}
>
  <Content />
</WikiLayout>
```

- [ ] **Step 2: Test: build the site and verify pages render**

Run:
```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site"
node scripts/build-wiki-index.mjs && npx astro build
```

Expected: Build succeeds, `dist/` directory contains HTML files for all 41 wiki pages.

Run:
```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site"
npx astro preview --port 4321
```

Open `http://localhost:4321/wiki/cynefin-framework`. Expected: Full page with sidebar, content, backlinks, wiki-links resolved.

- [ ] **Step 3: Verify wiki-links resolve correctly**

Open a page that has wiki-links (e.g., `/wiki/ahmad-hidayat`). Check that:
- `[[integrindos]]` links to `/wiki/integrindos`
- `[[Cynefin Framework]]` links to `/wiki/cynefin-framework`
- Broken links (e.g., `[[AeHIN]]`) show as red italic text, not `<a>` tags

- [ ] **Step 4: Verify backlinks render**

Open `/wiki/cynefin-framework`. Check that the backlinks section lists pages that contain `[[Cynefin Framework]]` or `[[Cynefin Framework|...]]`.

- [ ] **Step 5: Commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/src/pages/wiki/
git commit -m "feat(wiki-site): add dynamic wiki page route with backlinks"
```

---

### Task 10: Create Home Page

**Files:**
- Create: `site/src/pages/index.astro`

A dashboard/landing page that mirrors the wiki index. Shows all categories with page counts and a brief description of the wiki.

- [ ] **Step 1: Write the home page**

Create `site/src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import WikiLayout from '../layouts/WikiLayout.astro';
import '../styles/global.css';

const pages = await getCollection('wiki');

const categoryInfo: Record<string, { label: string; description: string }> = {
  entities: { label: 'Entities', description: 'Named real-world things: people, organizations, platforms, frameworks' },
  concepts: { label: 'Concepts', description: 'Abstract technical, policy, or theoretical ideas' },
  domains: { label: 'Domains', description: 'High-level synthesis pages for five canonical work domains' },
  sources: { label: 'Sources', description: 'One summary page per ingested raw document' },
  workstreams: { label: 'Workstreams', description: 'Active and historical project and engagement pages' },
  outputs: { label: 'Outputs', description: 'Filed query answers, analyses, comparisons' },
  synthesis: { label: 'Synthesis', description: 'Cross-source synthesis pages connecting multiple concepts and domains' },
};

const grouped: Record<string, { slug: string; title: string }[]> = {};
for (const key of Object.keys(categoryInfo)) {
  grouped[key] = [];
}

for (const page of pages) {
  const parts = page.id.split('/');
  const category = parts.length > 1 ? parts[0] : 'uncategorized';
  const slug = parts.pop()!;
  const data = page.data as any;
  const title = data.name || data.title || slug.replace(/-/g, ' ');

  if (!grouped[category]) grouped[category] = [];
  grouped[category].push({ slug, title });
}

for (const key of Object.keys(grouped)) {
  grouped[key].sort((a, b) => a.title.localeCompare(b.title));
}

const totalPages = pages.length;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ahmad Wiki — Second Brain</title>
  </head>
  <body>
    <div class="app">
      <nav class="sidebar" style="padding: 1.5rem 0;">
        <div class="sidebar-header" style="padding: 0 1.25rem 1rem; border-bottom: 1px solid var(--color-border-light);">
          <a href="/" style="display: block; font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: var(--color-text); text-decoration: none;">Ahmad Wiki</a>
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">Second Brain</span>
        </div>
      </nav>
      <main class="main-content">
        <div class="content-area">
          <h1>Ahmad Hidayat — Second Brain Wiki</h1>
          <p class="home-subtitle">{totalPages} pages across {Object.keys(categoryInfo).length} categories</p>
          <hr />

          <div class="home-grid">
            {Object.entries(categoryInfo).map(([key, info]) => grouped[key]?.length > 0 && (
              <section class="home-category">
                <h2>{info.label} <span class="count">({grouped[key].length})</span></h2>
                <p class="home-category-desc">{info.description}</p>
                <ul class="home-page-list">
                  {grouped[key].map(page => (
                    <li>
                      <a href={`/wiki/${page.slug}`}>{page.title}</a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  </body>
</html>

<style>
  .home-subtitle {
    font-size: 1.1rem;
    color: var(--color-text-muted);
    margin-bottom: 0;
  }

  .home-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;
  }

  .home-category h2 {
    font-size: 1.2rem;
    margin-bottom: 0.2em;
  }

  .home-category h2 .count {
    font-size: 0.85rem;
    font-weight: 400;
    color: var(--color-text-muted);
  }

  .home-category-desc {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    margin-bottom: 0.8em;
  }

  .home-page-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .home-page-list li {
    padding: 0.25em 0;
  }

  .home-page-list li::before {
    content: "• ";
    color: var(--color-accent);
  }
</style>
```

- [ ] **Step 2: Verify home page renders**

Run:
```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site"
node scripts/build-wiki-index.mjs && npx astro dev --port 4321
```

Open `http://localhost:4321/`. Expected: Dashboard with all 7 categories, page counts, and clickable links.

- [ ] **Step 3: Commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/src/pages/index.astro
git commit -m "feat(wiki-site): add home page with category dashboard"
```

---

### Task 11: Add Pagefind Search

**Files:**
- Modify: `site/package.json` (postbuild script already included)

Pagefind is a static search tool. It indexes the built HTML and provides a zero-JS-bundle search UI. Configured as a post-build step.

- [ ] **Step 1: Create search component**

Create `site/src/components/SearchBar.astro`:

```astro
---
---

<div id="search" class="search-container">
  <div id="search-bar" class="search-bar">
    <input
      type="text"
      id="search-input"
      placeholder="Search wiki..."
      class="search-input"
      autocomplete="off"
    />
  </div>
  <div id="search-results" class="search-results"></div>
</div>

<script>
  async function initSearch() {
    // @ts-ignore — Pagefind is loaded at runtime from the generated bundle
    const pagefind = await import('/pagefind/pagefind.js');
    const input = document.getElementById('search-input') as HTMLInputElement;
    const results = document.getElementById('search-results') as HTMLDivElement;

    input.addEventListener('input', async () => {
      const query = input.value.trim();
      if (query.length < 2) {
        results.innerHTML = '';
        results.style.display = 'none';
        return;
      }

      const search = await pagefind.search(query);
      const items = await Promise.all(search.results.slice(0, 8).map((r: any) => r.data()));

      results.innerHTML = items
        .map(
          (item: any) =>
            `<a href="${item.url}" class="search-result">
              <span class="search-result-title">${item.meta?.title || item.url}</span>
              <span class="search-result-excerpt">${item.excerpt || ''}</span>
            </a>`
        )
        .join('');
      results.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
      if (!(e.target as Element).closest('.search-container')) {
        results.style.display = 'none';
      }
    });
  }

  initSearch();
</script>

<style>
  .search-container {
    position: relative;
    padding: 0 1.25rem 1rem;
  }

  .search-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-size: 0.88rem;
    font-family: var(--font-body);
    background: var(--color-bg);
    color: var(--color-text);
    outline: none;
  }

  .search-input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(51, 102, 204, 0.15);
  }

  .search-results {
    display: none;
    position: absolute;
    top: 100%;
    left: 1.25rem;
    right: 1.25rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
    max-height: 400px;
    overflow-y: auto;
  }

  .search-result {
    display: block;
    padding: 0.6rem 0.75rem;
    text-decoration: none;
    border-bottom: 1px solid var(--color-border-light);
  }

  .search-result:last-child {
    border-bottom: none;
  }

  .search-result:hover {
    background: var(--color-sidebar-active);
    text-decoration: none;
  }

  .search-result-title {
    display: block;
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--color-link);
  }

  .search-result-excerpt {
    display: block;
    font-size: 0.8rem;
    color: var(--color-text-muted);
    margin-top: 0.15em;
  }

  .search-result-excerpt mark {
    background: #fff3a8;
    padding: 0.05em 0.15em;
    border-radius: 2px;
  }
</style>
```

- [ ] **Step 2: Add SearchBar to Sidebar component**

Add the import and placement at the top of the Sidebar, right after the header block.

Update `site/src/components/Sidebar.astro` — add at the top of the frontmatter imports:

```astro
---
import SearchBar from './SearchBar.astro';
import { getCollection } from 'astro:content';
// ... rest of existing imports and props
```

Then add the SearchBar component inside the `<aside class="sidebar">` tag, right after the `sidebar-header` div:

```astro
  <aside class="sidebar">
    <div class="sidebar-header">
      <a href="/" class="sidebar-title">Ahmad Wiki</a>
      <span class="sidebar-subtitle">Second Brain</span>
    </div>
    <SearchBar />  <!-- ADD THIS LINE -->
    <nav class="sidebar-nav">
```

- [ ] **Step 3: Add page title metadata for Pagefind**

Update `site/src/layouts/WikiLayout.astro` — add `data-pagefind-body` attribute to the content article and `data-pagefind-meta="title"` to a hidden span:

Replace the `<article class="content-area">` opening tag with:

```astro
      <article class="content-area" data-pagefind-body>
        <h1>{title}<span data-pagefind-meta="title" style="display:none">{title}</span></h1>
```

- [ ] **Step 4: Build site with Pagefind and test search**

Run:
```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site"
node scripts/build-wiki-index.mjs && npx astro build && npx pagefind --site dist/
```

Expected: Build succeeds, Pagefind indexes all pages, `dist/pagefind/` directory created.

Test:
```bash
npx astro preview --port 4321
```

Open `http://localhost:4321/`. Type "cynefin" in the search bar. Expected: Search results appear with page titles and excerpts.

- [ ] **Step 5: Commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/src/components/SearchBar.astro site/src/components/Sidebar.astro site/src/layouts/WikiLayout.astro
git commit -m "feat(wiki-site): add Pagefind full-text search"
```

---

### Task 12: Final Integration Test and Cleanup

**Files:**
- Modify: `site/package.json` (finalize scripts)

- [ ] **Step 1: Verify the complete build pipeline**

Run:
```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki/site"
rm -rf dist/
node scripts/build-wiki-index.mjs && npx astro build && npx pagefind --site dist/
```

Expected: Clean build with no errors. `dist/` contains:
- `index.html` (home page)
- `wiki/*.html` (41 wiki pages)
- `pagefind/` (search index)

- [ ] **Step 2: Run preview and manually verify all key flows**

```bash
npx astro preview --port 4321
```

Check:
1. Home page loads at `/` with all categories
2. Click any page → content renders with sidebar highlighting
3. Click a `[[wiki-link]]` → navigates to the target page
4. Backlinks section shows correct incoming links
5. Search bar returns results
6. Broken links show as red italic text
7. Responsive: resize to mobile → sidebar hides, content full-width

- [ ] **Step 3: Update .gitignore for dist**

Verify `site/.gitignore` contains:
```
node_modules/
dist/
src/data/wiki-index.json
```

- [ ] **Step 4: Final commit**

```bash
cd "/Users/ahmadhidayat/claude-code/My Second Brain/ahmad-wiki"
git add site/
git commit -m "feat(wiki-site): complete wiki website with search, backlinks, and wiki-link resolution"
```

---

## Summary

| Task | What it builds |
|------|---------------|
| 1 | Astro project scaffolding |
| 2 | Wiki title→path index (pre-build script) |
| 3 | Remark plugin for `[[wiki-link]]` syntax |
| 4 | Content collection reading from `../wiki/` |
| 5 | Wikipedia-like global stylesheet |
| 6 | Sidebar navigation grouped by category |
| 7 | PageMeta, TagList, Backlinks components |
| 8 | WikiLayout page shell |
| 9 | Dynamic route rendering all 41 pages with backlinks |
| 10 | Home page dashboard |
| 11 | Pagefind full-text search |
| 12 | Integration test and cleanup |

**Start to finish:** ~12 tasks, each 2-5 minutes. Build output is a `dist/` folder you can serve locally or deploy anywhere static hosting is available.

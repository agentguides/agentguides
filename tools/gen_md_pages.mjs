// Generate clean Markdown twins of each content page for LLM ingestion, served at
// /<slug>.md. GitHub Pages (legacy build) can't generate these itself, so they're
// committed; re-run `just md-pages` after editing page content.
//
// Each twin is emitted as a small page under docs/llms-md/<slug>.html: front matter
// (so layout/permalink are controllable) + an .html source extension (so Jekyll does
// NOT markdown-convert it) + the raw page body wrapped in {% raw %}. Jekyll outputs it
// verbatim at /<slug>.md. (A bare .md static file gets processed because the site's
// front-matter defaults apply to it — hence the .html-source trick.)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const docs = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const outDir = join(docs, 'llms-md');
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
let n = 0;

for (const file of readdirSync(docs)) {
  if (!file.endsWith('.md') || file === 'index.md') continue;
  const src = readFileSync(join(docs, file), 'utf8');
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);     // leading front matter only
  if (!fm) continue;
  const permalink = (fm[1].match(/^permalink:\s*(.+?)\s*$/m) || [])[1];
  if (!permalink) continue;                                      // only real pages

  const slug = permalink.replace(/\//g, '');
  const body = src.slice(fm[0].length)
    .replace(/^\{:\s*\.no_toc\s*\}\s*$/gm, '')   // kramdown attr lists
    .replace(/^1\.\s*TOC\s*$/gm, '')             // the `1. TOC` marker
    .replace(/^\{:toc\}\s*$/gm, '')              // the {:toc} directive
    .replace(/\n{3,}/g, '\n\n')                  // collapse blank runs
    .replace(/^\s+/, '')                         // trim leading blanks
    .trimEnd();

  const page = `---\npermalink: /${slug}.md\nlayout: none\nsitemap: false\n---\n{% raw %}\n${body}\n{% endraw %}\n`;
  writeFileSync(join(outDir, `${slug}.html`), page);
  console.log('md  ', `/${slug}.md`);
  n++;
}
console.log(`generated ${n} markdown page twin(s) in docs/llms-md/`);

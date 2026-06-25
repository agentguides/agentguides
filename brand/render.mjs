// Brand asset renderer — token-driven SVG -> PNG via rsvg-convert.
// Edit brand/tokens.json (palette/type) or brand/templates/*.svg, then `just brand`.
// Deps: node, rsvg-convert (librsvg). Outputs to docs/assets/.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));        // brand/
const hub = join(root, '..');
const tokens = JSON.parse(readFileSync(join(root, 'tokens.json'), 'utf8'));
const tpl = (n) => readFileSync(join(root, 'templates', n), 'utf8');
const outDir = join(hub, 'docs', 'assets');
const ogDir = join(outDir, 'og');
const buildDir = join(root, '.build');
[outDir, ogDir, buildDir].forEach((d) => mkdirSync(d, { recursive: true }));

const c = tokens.color, f = tokens.font;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function fill(svg, extra = {}) {
  const map = { BASE: c.base, SURFACE: c.surface, BORDER: c.border, TEXT: c.text,
    MUTED: c.muted, ACCENT: c.accent, SANS: f.sans, MONO: f.mono, ...extra };
  return svg.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in map ? map[k] : `{{${k}}}`));
}
function rsvg(svg, args, out) {
  const tmp = join(buildDir, 'tmp.svg');
  writeFileSync(tmp, svg);
  execFileSync('rsvg-convert', [...args, tmp, '-o', out]);
}
// greedy word-wrap by estimated glyph width (~0.56em average)
function wrap(text, fontSize, maxWidth, maxLines) {
  const max = Math.floor(maxWidth / (fontSize * 0.56));
  const lines = []; let line = '';
  for (const w of text.split(/\s+/)) {
    const t = line ? `${line} ${w}` : w;
    if (t.length > max && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines.slice(0, maxLines);
}

// ---- OG cards (1200x630) ----
const HEAD_X = 90, HEAD_Y = 300, LH = 78;
const ogTpl = tpl('og.svg');
const cards = [
  { name: 'default', title: 'Multi-step procedural workflows for agents and humans',
    subtitle: tokens.tagline },
];
for (const card of cards) {
  const lines = wrap(card.title, 66, 1020, 3);
  const tspans = lines.map((l, i) => `<tspan x="${HEAD_X}" dy="${i ? LH : 0}">${esc(l)}</tspan>`).join('');
  const subY = HEAD_Y + (lines.length - 1) * LH + 64;
  const svg = fill(ogTpl, { WORDMARK: esc(tokens.name), TITLE_TSPANS: tspans,
    SUBTITLE: esc(card.subtitle), SUBTITLE_Y: String(subY), DOMAIN: 'agentguides.io' });
  rsvg(svg, ['-w', '1200', '-h', '630'], join(ogDir, `${card.name}.png`));
  console.log('og   ', `og/${card.name}.png`);
}

// ---- mark + favicons ----
const markSvg = fill(tpl('mark.svg'));
writeFileSync(join(outDir, 'favicon.svg'), markSvg);
for (const [name, size] of [['favicon-16.png', 16], ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  rsvg(markSvg, ['-w', String(size), '-h', String(size)], join(outDir, name));
  console.log('icon ', name);
}

// ---- logo lockup ----
const logoSvg = fill(tpl('logo.svg'));
writeFileSync(join(outDir, 'logo.svg'), logoSvg);
rsvg(logoSvg, ['-w', '600'], join(outDir, 'logo.png'));
console.log('logo ', 'logo.svg, logo.png');
console.log(`done — palette: ${tokens.direction}`);

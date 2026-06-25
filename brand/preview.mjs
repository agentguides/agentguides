// Render candidate brand DIRECTIONS (palette + type) to brand/.build/preview/<name>/
// without touching the committed docs/assets. For design review only.
//   node brand/preview.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const tpl = (n) => readFileSync(join(root, 'templates', n), 'utf8');
const build = join(root, '.build');
const previewDir = join(build, 'preview');
mkdirSync(previewDir, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fill = (svg, m) => svg.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in m ? m[k] : `{{${k}}}`));
function rsvg(svg, args, out) {
  const t = join(build, 'tmp.svg'); writeFileSync(t, svg);
  execFileSync('rsvg-convert', [...args, t, '-o', out]);
}
function wrap(text, fs, maxW, maxL, per) {
  const max = Math.floor(maxW / (fs * per)); const ls = []; let l = '';
  for (const w of text.split(/\s+/)) { const t = l ? `${l} ${w}` : w; if (t.length > max && l) { ls.push(l); l = w; } else l = t; }
  if (l) ls.push(l); return ls.slice(0, maxL);
}

const TITLE = 'Multi-step procedural workflows for agents and humans';
const SUB = 'An open, Skills-compatible specification.';

const directions = [
  { name: 'd1-mono-indigo',
    color: { base: '#0B0D12', surface: '#14171F', border: '#2A2F3A', text: '#E7EAF0', muted: '#8A90A0', accent: '#7C8CFF' },
    font: { display: 'JetBrains Mono', mono: 'JetBrains Mono' }, head: 54, per: 0.62 },
  { name: 'd2-inter-ultramarine',
    color: { base: '#0A0C12', surface: '#121723', border: '#272F40', text: '#E8EEF6', muted: '#8893A6', accent: '#3D5AFF' },
    font: { display: 'Inter', mono: 'JetBrains Mono' }, head: 66, per: 0.55 },
  { name: 'd3-inter-teal',
    color: { base: '#0B1012', surface: '#121A1B', border: '#243130', text: '#E6EDEC', muted: '#88989A', accent: '#2BB6A3' },
    font: { display: 'Inter', mono: 'JetBrains Mono' }, head: 66, per: 0.55 },
];

for (const d of directions) {
  const out = join(previewDir, d.name); mkdirSync(out, { recursive: true });
  const base = { BASE: d.color.base, SURFACE: d.color.surface, BORDER: d.color.border,
    TEXT: d.color.text, MUTED: d.color.muted, ACCENT: d.color.accent,
    DISPLAY: d.font.display, MONO: d.font.mono };
  const LH = Math.round(d.head * 1.18);
  const lines = wrap(TITLE, d.head, 1020, 3, d.per);
  const tspans = lines.map((l, i) => `<tspan x="90" dy="${i ? LH : 0}">${esc(l)}</tspan>`).join('');
  const subY = 300 + (lines.length - 1) * LH + 64;
  rsvg(fill(tpl('og.svg'), { ...base, WORDMARK: 'Agent Guides', TITLE_TSPANS: tspans,
    SUBTITLE: esc(SUB), SUBTITLE_Y: String(subY), DOMAIN: 'agentguides.io', HEAD_SIZE: String(d.head) }),
    ['-w', '1200', '-h', '630'], join(out, 'og.png'));
  rsvg(fill(tpl('mark.svg'), base), ['-w', '256', '-h', '256'], join(out, 'mark.png'));
  rsvg(fill(tpl('mark.svg'), base), ['-w', '32', '-h', '32'], join(out, 'favicon-32.png'));
  rsvg(fill(tpl('logo.svg'), base), ['-w', '560'], join(out, 'logo.png'));
  console.log('rendered', d.name);
}
console.log('preview ->', previewDir);

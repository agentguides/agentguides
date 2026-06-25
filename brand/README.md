# brand/

Token-driven brand-asset pipeline. Edit one token file (or a template), run one
command, and the OG card, favicons, and logo regenerate into `docs/assets/`.

```sh
just brand          # or: node brand/render.mjs
```

## How it works

`render.mjs` reads `tokens.json`, substitutes `{{TOKEN}}` placeholders into the
SVG templates, and rasterizes them with `rsvg-convert` (librsvg). No browser, no
external API — deterministic and committable.

- **`tokens.json`** — the single source of palette + type. Change the palette here
  and every asset re-renders to match; nothing is hard-coded per asset.
- **`templates/`**
  - `mark.svg` — the standalone mark (rounded tile + 3-node ascending path = steps of a walk). Favicons render from this.
  - `logo.svg` — mark + "Agent Guides" wordmark lockup.
  - `og.svg` — 1200×630 social card; the renderer wraps the headline into `<tspan>` lines.

## Outputs (`docs/assets/`)

| File | Size | Use |
|---|---|---|
| `og/default.png` | 1200×630 | `og:image` / Twitter card (wired in `docs/_config.yml`) |
| `favicon.svg` | vector | modern favicon |
| `favicon-16.png`, `favicon-32.png` | 16/32 | legacy favicon |
| `apple-touch-icon.png` | 180 | iOS home screen |
| `icon-192.png`, `icon-512.png` | 192/512 | PWA / manifest |
| `logo.svg`, `logo.png` | — | sidebar logo (just-the-docs) + JSON-LD (jekyll-seo-tag) |

Favicons are linked via `docs/_includes/head_custom.html`; `og:image`/`logo`/
`twitter` are set in `docs/_config.yml`.

## Requirements

- `node` (run the script), `rsvg-convert` (`brew install librsvg`).

## Notes / next

- **Per-page OG cards:** add entries to the `cards` array in `render.mjs` (each
  `{ name, title, subtitle }` renders `og/<name>.png`); set the page's front-matter
  `image:` to it.
- **Fonts at regen time:** text is rendered via fontconfig, so a clean sans/mono
  must be installed where you regenerate (macOS has Helvetica Neue / Menlo). The
  committed PNGs are the fixed end state; only regeneration is font-sensitive. For
  full portability, outline the wordmark to paths or embed a webfont.
- **Logo variant:** `logo.png` is the dark-background (light-text) lockup. A
  light-background (dark-text) variant is a follow-up if needed.
- **AI concept art (optional):** the `fal-ai-media` skill can generate background /
  hero art, but needs the fal.ai MCP configured (`FAL_KEY`). Not used by this
  deterministic pipeline; reserved for future concept exploration.

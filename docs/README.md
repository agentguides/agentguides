# docs/

Source for [agentguides.io](https://agentguides.io). Built with Jekyll + [just-the-docs](https://just-the-docs.com/) via GitHub Pages.

## Local preview

From the repo root:

```sh
brew bundle    # one-time: mise + librsvg
mise install   # one-time: ruby, node, just, lefthook, gh, markdownlint-cli2
just deps      # one-time: site gems (jekyll, …)
just init      # one-time: install git hooks
just serve     # http://localhost:4000
```

## Tasks

Run `just` to list everything:

- `just build` / `just serve` — build / serve the site
- `just lint-md` — Markdown lint (markdownlint)
- `just brand` — regenerate brand assets (logo, OG card, favicons) from `brand/tokens.json`
- `just md-pages` — regenerate the per-page `.md` twins for LLM ingestion
- `just sync-schemas` — pull the JSON schemas from `agentguides/runtime` at a tag
- `just pre-commit` — run the git hooks manually

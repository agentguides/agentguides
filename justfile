# agentguides (the spec/hub) task runner.
# The JSON schemas are canonical in the runtime repo (generated from Pydantic
# models there); this hub serves a synced COPY so the schema $id URLs resolve.

runtime_dir := "../runtime"

# List available recipes.
default:
    @just --list

# Sync JSON schemas from the runtime repo at a tag into docs/schemas/0.1/ (served at agentguides.io/schemas/0.1/).
# Short-term: pulls from the local ../runtime git clone at TAG. Future (infra-dju): published wheel.
sync-schemas TAG="v0.5.10":
    #!/usr/bin/env bash
    set -euo pipefail
    git -C {{runtime_dir}} fetch --tags --quiet
    rm -rf docs/schemas/0.1
    mkdir -p docs/schemas/0.1
    git -C {{runtime_dir}} archive {{TAG}} schemas/ | tar -x --strip-components=1 -C docs/schemas/0.1
    # verify: expect 8 schema files, each $id pinned to the versioned /schemas/0.1/ path
    count="$(ls docs/schemas/0.1/*.schema.json | wc -l | tr -d ' ')"
    test "$count" = "8" || { echo "expected 8 schemas, got $count"; exit 1; }
    ! grep -L '"\$id": "https://agentguides.io/schemas/0.1/' docs/schemas/0.1/*.schema.json
    echo "synced $count schemas from {{runtime_dir}}@{{TAG}} -> docs/schemas/0.1/"

# Regenerate brand assets (OG card, favicons, logo) from brand/tokens.json into docs/assets/.
brand:
    node brand/render.mjs

# Regenerate clean Markdown twins of each page (<url>/index.html.md) for LLM ingestion.
md-pages:
    node tools/gen_md_pages.mjs

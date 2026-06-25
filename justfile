# agentguides (the spec/hub) task runner.
# The JSON schemas are canonical in agentguides/runtime (generated from Pydantic models
# there); this hub serves a synced COPY so the schema $id URLs resolve.

# Run every recipe under `mise exec`, so the pinned toolchain (node, ruby, gh, lefthook,
# markdownlint-cli2) is on PATH without a per-command prefix. Shebang recipes set their
# own interpreter, so they use the `#!/usr/bin/env -S mise exec -- bash` form instead.
set shell := ["mise", "exec", "--", "bash", "-c"]

runtime_repo := "agentguides/runtime"

# List available recipes.
default:
    @just --list

# Install git hooks (lefthook). Run once after cloning (after `mise install`).
init:
    lefthook install

# Run the pre-commit hooks manually (pass --all-files to check everything).
pre-commit *ARGS:
    lefthook run pre-commit {{ARGS}}

# Build the static site into docs/_site/.
build:
    cd docs && bundle exec jekyll build

# Serve the site locally at http://localhost:4000 (live reload).
serve:
    cd docs && bundle exec jekyll serve

# Sync JSON schemas from agentguides/runtime at a tag into docs/schemas/0.1/.
# Pulls from GitHub via `gh` (uses your auth — works while runtime is private and after
# it's public; no local checkout needed). Future (infra-dju): pull from the published wheel.
sync-schemas TAG="v0.5.10":
    #!/usr/bin/env -S mise exec -- bash
    set -euo pipefail
    dest="docs/schemas/0.1"
    rm -rf "$dest"; mkdir -p "$dest"
    names="$(gh api "repos/{{runtime_repo}}/contents/schemas?ref={{TAG}}" \
      --jq '.[] | select(.name | endswith(".schema.json")) | .name')"
    for name in $names; do
      gh api "repos/{{runtime_repo}}/contents/schemas/$name?ref={{TAG}}" \
        -H "Accept: application/vnd.github.raw" > "$dest/$name"
      echo "  $name"
    done
    # verify: expect 8 schema files, each $id pinned to the versioned /schemas/0.1/ path
    count="$(ls "$dest"/*.schema.json | wc -l | tr -d ' ')"
    test "$count" = "8" || { echo "expected 8 schemas, got $count"; exit 1; }
    ! grep -L '"\$id": "https://agentguides.io/schemas/0.1/' "$dest"/*.schema.json
    echo "synced $count schemas from {{runtime_repo}}@{{TAG}} -> $dest"

# Regenerate brand assets (OG card, favicons, logo) from brand/tokens.json into docs/assets/.
brand:
    node brand/render.mjs

# Regenerate clean Markdown twins of each page (<url>/index.html.md) for LLM ingestion.
md-pages:
    node tools/gen_md_pages.mjs

# Lint Markdown (content pages + repo docs) with markdownlint.
lint-md:
    markdownlint-cli2 "*.md" "docs/*.md"

---
title: Quickstart
nav_order: 2
---

Author and walk your first Guide in five minutes.

## Install

The runtime CLI is published as `guide-cli` on PyPI; it installs a `guide` binary on your PATH.

```sh
uv tool install guide-cli
guide --version
```

If you're using a Guide-aware harness (Claude Code, Hermes), the plugin for that harness bundles `guide` plus the activation Skills the harness needs — install it from the harness's plugin catalog instead. See the [Client showcase](clients).

## Scaffold a Guide

```sh
guide new my-guide --into ./guides
```

This creates `./guides/my-guide/` with a valid `SKILL.md`, a `GUIDE.md`, and a starter step under `steps/`. Open the files and edit the placeholders to describe the procedure you actually want to walk.

## Validate

```sh
guide validate --root ./guides/my-guide --collection ./guides
```

Should print `OK`. If not, the error messages point at the field in `GUIDE.md` or the step frontmatter that needs adjustment.

## Walk

Inside a Guide-aware harness, ask the agent to walk the Guide by name. The harness reads `SKILL.md` to discover it, loads `GUIDE.md`, and walks the step DAG together with you.

The agent records its reasoning before each verdict. You report what you observed when a step asks. Every event — start, reasoning, report, success, failure, recovery, rollback — appends to a run file. When the walk reaches an end state, that run file is the audit trail.

## Next steps

- [Specification](specification) — the full data model.
- [Client showcase](clients) — Guide-aware harnesses available today.
- [GitHub](https://github.com/agentguides/agentguides) — contribute spec changes or canonical examples.

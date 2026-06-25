---
title: Specification
nav_order: 6
permalink: /specification/
description: The Agent Guides format specification — the data model, JSON schemas, and validation behind Skills-compatible multi-step workflows.
---

# Specification
{: .no_toc }

Spec version **0.1** · reference runtime [`agentguides`](https://github.com/agentguides/runtime) 0.5.10

This page defines the Guide format: the files you author, the data model, the JSON
schemas that validate them, and how validation works. To install and run the runtime,
see the [Quickstart](/quickstart/).

1. TOC
{:toc}

---

## What a Guide is

A **Guide** is a Skill (per the [Agent Skills](https://agentskills.io) spec) whose
`metadata.type` is `guide`. On top of the Skill, it adds a workflow
definition, an ordered set of steps, and a runtime record of each walk:

```text
my-guide/
  SKILL.md        # Skill-spec compliant; metadata.type: guide
  GUIDE.md        # the workflow: goal, prerequisites, end states, rollback
  steps/
    010-prep.md   # one markdown file per step
    020-execute.md
    030-verify.md
  scripts/        # optional, per the Skill spec
  references/     # optional
  assets/         # optional
```

Every Guide is a valid Skill. A Skills-only harness reads it as an ordinary Skill; a
Guide-aware harness executes the workflow step by step. Because a Guide is data rather
than framework code, the same Guide runs across [clients](/clients/).

---

## The data model

| Artifact | Authored? | What it carries |
|---|---|---|
| `SKILL.md` (+ guide extension) | yes | Skill frontmatter; `metadata.type: guide` and the `metadata.guide` block |
| `GUIDE.md` | yes | `id`, `version`, `summary`, `goal_state`, `prerequisites`, `end_states`, `rollback_strategy` |
| `steps/NNN[a-z]?-<id>.md` | yes | one step each: `performer`, action, verification, failure handling, interactions |
| `BOOK.md` | yes (optional) | groups related Guides into a Book; declares child Guides and their roles |
| run state file | no — written by the runtime | one run's frontmatter + the append-only event log |

A few concepts the rest of the spec leans on:

- **performer** — every step declares who acts: `agent`, `human`, or `either`. A
  single Guide mixes them freely. Neither party is the other's safety net; both are
  co-protagonists.
- **verification** — how a step is judged done: `script`, `agent_judgment`,
  `human_confirm`, or `none`. An `agent_judgment` step must record its reasoning in
  the log *before* declaring a verdict.
- **end states** — a Guide declares its possible exits, each with an optional score
  (the Postgres example scores `migrated` at 1.0, a clean rollback to `original` at
  0.5). A rollback is still *an* end state — failure is recorded, not hidden.
- **failure handling** — a step's `on_failure` can `retry`, `recover` (hand off to a
  rescue Guide, then optionally resume), `ask`, or `abort`.
- **run / walk / event log** — a **run** is one execution, persisted as a single run
  file with a timestamped, append-only event log. To **walk** a Guide is to traverse
  it; the run file is the evidence that traversal leaves behind.

---

## Schemas

The normative contracts are JSON Schema (Draft 2020-12), generated from the runtime's
models and served here so the `$id` URLs resolve. Editors that honor the
`# yaml-language-server: $schema=...` directive validate your frontmatter as you type.

**Authored artifacts** — the files you write:

| Schema | Validates |
|---|---|
| [`guide.schema.json`](/schemas/0.1/guide.schema.json) | `GUIDE.md` frontmatter |
| [`step.schema.json`](/schemas/0.1/step.schema.json) | a step file's frontmatter |
| [`skill-guide-extension.schema.json`](/schemas/0.1/skill-guide-extension.schema.json) | the `metadata.guide` block in `SKILL.md` |
| [`book.schema.json`](/schemas/0.1/book.schema.json) | `BOOK.md` frontmatter |

**Runtime + derived shapes** — produced by the runtime, not hand-written:

| Schema | Describes |
|---|---|
| [`run-state.schema.json`](/schemas/0.1/run-state.schema.json) | a run file's frontmatter |
| [`walk-skill.schema.json`](/schemas/0.1/walk-skill.schema.json) | the rendered walk Skill's `guide.runtime` block |
| [`walk-path.schema.json`](/schemas/0.1/walk-path.schema.json) | a reconstructed traversal of one run |
| [`dag.schema.json`](/schemas/0.1/dag.schema.json) | the step dependency graph |

Schema URLs are versioned by spec **major.minor** (`/schemas/0.1/`). A minor or major
bump mints a new path segment; patch-level edits (wording only) overwrite in place,
since the set of valid documents is unchanged.

---

## Validation

`guide validate --root <path>` checks a Guide (or Book) against the schemas above,
verifies the step dependency graph is a DAG, and resolves every reference
(`requires`, `guide_ref`, `recover_with`). It auto-detects whether the target is a
Guide or a Book. See the [Quickstart](/quickstart/) for the command in context.

---

## Full specification

The complete normative specification — exact frontmatter fields, the step lifecycle,
verification and recovery rules, and the runtime contracts — is maintained in
[`SPEC.md`](https://github.com/agentguides/runtime/blob/main/docs/SPEC.md). It covers:

- Compatibility with Agent Skills
- `SKILL.md` extensions · `GUIDE.md` schema · step file schema
- Step lifecycle · verification · failure recovery · rollback
- Interactions and free-form result reporting
- State and audit model · the `StateBackend` interface
- Composition · reference resolution · versioning
- The harness contract (what a new [client](/clients/) must implement)
- Appendix — a worked example (Postgres major-version upgrade)

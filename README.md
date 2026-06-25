# Agent Guides

Skill-compatible specification for multi-step procedural workflows. Agent and human walk together as equal participants; every walk produces an append-only event log.

## What is this?

The Skill spec gives an agent a self-describing unit of capability — one task, executed in one shot. Guides extend that model to **multi-step procedures**: runbooks, incident response, migrations, onboarding. Each Guide is a valid Skill, so any Skills-compatible harness can discover and load it. Guide-aware harnesses additionally execute the workflow step by step. For Skills-only harnesses, we publish reference Skills that add Guide awareness by delegating execution to the [`guide`](https://github.com/agentguides/runtime) runtime.

Each step declares its `performer` (human, agent, or either) and how success is verified (script result, agent judgment, or human confirmation). The runtime captures the agent's reasoning and the human's reports next to each action. Skill artifacts have no history of how they were used; Guides do, and that execution history is the substrate for closing a feedback loop currently driven entirely by human review.

## Shape of a Guide

```text
my-guide/
  SKILL.md          # Skill-spec compliant; metadata.type: guide
  GUIDE.md          # workflow: goal, prerequisites, end states
  steps/
    010-prep.md
    020-execute.md
    030-verify.md
```

## What's in this repo

| Path | Purpose |
| --- | --- |
| [`docs/`](docs/) | Spec docs + the source of [agentguides.io](https://agentguides.io) |
| [`docs/schemas/`](docs/schemas/) | JSON schemas for `SKILL.md`, `GUIDE.md`, step files, manifests — synced from the runtime; served at `/schemas/<major.minor>/` |
| [`examples/`](examples/) | Canonical example Guides |

## Get started

- [Specification](https://agentguides.io/specification) — full data model
- [Quickstart](https://agentguides.io/quickstart) — author and run a Guide
- [Compatible clients](https://agentguides.io/clients) — where Guides run today

## Contribute

PRs welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the DCO sign-off requirement and the workflow for proposing canonical examples or spec changes.

## License

[MIT](LICENSE).

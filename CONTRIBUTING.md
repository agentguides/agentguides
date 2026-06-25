# Contributing to Agent Guides

Thanks for your interest. This repo is the spec, schemas, and canonical examples for Agent Guides. Runtime code lives at [agentguides/runtime](https://github.com/agentguides/runtime).

## Where things go

| Kind of change | Where |
| --- | --- |
| Spec text, data model, file conventions | `docs/` (PR opens against the spec) |
| JSON schemas | not here — they are generated from the runtime's models and synced into `docs/schemas/` by `just sync-schemas`. Propose schema changes against [agentguides/runtime](https://github.com/agentguides/runtime); editing the synced copy here is overwritten on the next sync. |
| New canonical example Guide | `examples/<your-guide>/` |
| Runtime behavior (CLI, MCP server) | not here — open against [agentguides/runtime](https://github.com/agentguides/runtime) |

## DCO sign-off

All commits must be signed off under the [Developer Certificate of Origin](https://developercertificate.org/). Add `Signed-off-by: Your Name <your.email@example.com>` to commit messages — `git commit -s` does this automatically.

No CLA. We're MIT-licensed under [LICENSE](LICENSE); the DCO is sufficient.

## Proposing a spec change

1. Open an issue describing the change and the problem it solves before writing the PR
2. Once the shape is agreed, open the PR against `docs/`. Schema changes are made in the [runtime](https://github.com/agentguides/runtime) models and land here via `just sync-schemas`
3. Update at least one example in `examples/` if the change affects authored Guides
4. The PR must build the site cleanly (CI will check)

## Proposing a canonical example

1. Open a PR adding a new directory under `examples/`
2. Include a `SKILL.md`, `GUIDE.md`, `steps/`, and a `README.md` explaining the scenario
3. The example should pass `guide validate` from the [agentguides/runtime](https://github.com/agentguides/runtime) CLI
4. Aim for examples that teach a *pattern*, not just a one-off task

## Code of conduct

Be kind. Disagree on the merits, not the person. Maintainers reserve the right to remove comments or contributions that violate this norm.

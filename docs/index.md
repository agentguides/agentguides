---
title: Home
layout: home
nav_order: 1
description: A Skills-compatible specification for multi-step agent workflows — runbooks, incident response, migrations — walked by agents and humans together.
---

[Quickstart](/quickstart/){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Specification](/specification/){: .btn .fs-5 .mb-4 .mb-md-0 .mr-2 }
[![GitHub stars](https://img.shields.io/github/stars/agentguides/agentguides?style=social)](https://github.com/agentguides/agentguides)

*An open, Skills-compatible specification for multi-step agent workflows. Agents and humans walk each guide; recorded walks refine the guidance over time.*

## What are Agent Guides?

Agent Guides are an open specification for *multi-step procedural workflows* — runbooks, incident response, migrations, onboarding — that agents and humans walk through together.

A Guide is a directory containing a `SKILL.md`, a `GUIDE.md`, and one markdown file per step. Every Guide is a valid Skill: Skills-only harnesses see a useful self-describing artifact, and Guide-aware harnesses additionally execute the workflow step by step.

```text
my-guide/
  SKILL.md          # discovery (Skill-spec compliant)
  GUIDE.md          # workflow: goal, prerequisites, end states
  steps/
    010-prep.md     # frontmatter: performer, action, verify, rollback
    020-execute.md
    030-verify.md
```

A single end-to-end execution is called a *walk* — agents and humans stepping through the Guide together.

## Why Agent Guides?

Skills give an agent a self-describing unit of capability — knowledge, guidelines, or procedural instructions, expressed as freeform prose. There's no validation of what happened beyond the conversation itself. Many real procedures need more: validated outcomes at each step, captured recovery paths, and an audit trail built from verdicts rather than chat history. Guides keep the freeform prose where it belongs and add just enough structure around it to make the procedure runnable, recoverable, and auditable:

- **Declarative structured process in natural language, not code.** Each step declares its performer (agent, human, or either) and how success is verified. The procedure is text — light scaffolding around freeform prose, not interpreted code or a rigid DAG — so it stays readable and adapts when the environment shifts.
- **Recovery as a first-class primitive.** When a step fails, recovery can be pre-declared, discovered from the library, or improvised on the fly — and in every case the steps taken are captured as part of the walk record, not lost in agent conversation history.
- **Walks produce evidence.** A structured event log records the agent's reasoning, the human's reports, and every verdict in between. Skill artifacts have no record of how they were used; Guides do.

## How do Agent Guides work?

A Guide-aware harness reads `GUIDE.md` to understand the goal, prerequisites, and end states, then walks the step DAG. Each step declares who performs the action (agent, human, or either) and how success is verified (script result, agent judgment, or human confirmation). Failures route through a recovery — pre-declared, discovered from the library, or improvised on the fly — and the walk resumes once it succeeds, or terminates honestly if it doesn't.

The full record of the walk — agent reasoning, human reports, recoveries, rollbacks, and the final scored end state — persists as an append-only event log. That record is the audit trail today, and the substrate for improvement: recorded walks are what let a guide be reviewed, refined, and shared back to everyone who runs it, so the guidance keeps pace as the world it describes changes.

## Where can I use Agent Guides?

Guides are designed to run under any Skills-compatible harness. Guide-aware execution is provided by the [`guide`](https://github.com/agentguides/runtime) runtime — install it directly, or activate it inside an existing Skills-only harness via the reference Skills we publish.

See the [Clients](/clients/) for the current list.

## Open standard

Agent Guides is an open MIT-licensed specification, designed to extend the Skill ecosystem with the procedural-workflow shape that Skills alone don't cover. Contributions land via PR against [agentguides/agentguides](https://github.com/agentguides/agentguides) with DCO sign-off; the runtime lives at [agentguides/runtime](https://github.com/agentguides/runtime).

## Get started

- [Quickstart](/quickstart/) — author and run a Guide.
- [Specification](/specification/) — the full data model.
- [Clients](/clients/) — where Guides run today.

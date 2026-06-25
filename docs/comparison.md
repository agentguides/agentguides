---
title: Comparison
nav_order: 3
permalink: /comparison/
description: How Agent Guides compares to workflow engines, agent frameworks, and wiki runbooks — and when to reach for each.
---

# Comparison
{: .no_toc }

Agent Guides occupies a specific niche: **advised structure** — between the
determinism of workflow engines and the open-endedness of an LLM with tools and a
system prompt. The orchestrator is an agent, so you don't encode every branch in code;
the *advice* is structural — the step graph, the `requires` constraints, the scored
end states, the declared recovery paths — so the agent keeps its discretion without
escaping the shape.

The tables below are explicit about where each alternative is the better choice.

1. TOC
{:toc}

---

## Workflow engines

Deterministic orchestrators. They put deterministic code in charge of
non-deterministic activities and replay from an event log.

| Tool | Where it wins | Where Agent Guides fits better | Reach for it when |
|---|---|---|---|
| **Temporal** | Exactly-once semantics, multi-day timers, huge throughput, operational maturity | The LLM is the orchestrator — no encoding every branch in Go/TS/Python; equal-participant; no SDK lock-in | Deterministic backend logic that needs durability and exactly-once |
| **AWS Step Functions** | Managed infra, deep AWS integration, visual editor | LLM orchestrator, vendor-portable, intent-prose authoring | AWS-native deterministic workflow, no LLM in the loop |
| **Airflow / Prefect / Dagster** | Scheduling, data-tooling ecosystem, lineage, materialized assets | Built for human + agent collaboration, not unattended ETL; markdown not Python decorators | Scheduled data pipelines and unattended batch |
| **n8n** | No-code, vast integration library, fast for non-engineers | Version-controlled, audit-grade evidence, LLM judgment, harness-portable | A non-engineer wiring SaaS-to-SaaS automation with no judgment steps |
| **Inngest** | Managed, durable, low-friction TypeScript, event-triggered | LLM orchestrator, equal-participant, multi-harness data format | TypeScript backend with event-triggered durable workflows |

---

## Agent orchestration frameworks

LLM-in-the-loop frameworks. The closest neighbors — and mostly SDK-coupled.

| Tool | Where it wins | Where Agent Guides fits better | Reach for it when |
|---|---|---|---|
| **LangGraph** | Rich graph primitives, tight LangChain integration, fine-grained control flow | Data format vs. framework — the same Guide walks anywhere; human-as-equal-participant is first-class, not a feature you build | LangChain shop, complex control flow, no portability constraint |
| **CrewAI** | Multi-agent roles, fast for agent-to-agent work | A single procedure a human and agent walk *together*; auditability; portability | Multi-agent workflows with no human in the loop |
| **AutoGen** | Conversational agent-to-agent dialog primitives | Equal-participant, audit-grade, harness-portable | Agent-to-agent research and conversational multi-agent |
| **OpenAI Agents SDK / Swarm** | Simple, OpenAI-aligned, fast to start | Not vendor-coupled; intent-prose; equal-participant; audit | OpenAI shop, simple agent-handoff workflow |
| **Mastra** | TypeScript-native, modern DX, workflow primitives | Portable data format; equal-participant | TS shop, single runtime, framework coupling is fine |
| **Claude Code plan mode / dynamic workflows** | Zero authoring overhead — the model plans on demand | Persisted across sessions, reusable across walkers, audit-grade, library-shaped | A one-shot task inside a single session |

---

## Human procedure media

The inspiration. Agent Guides is what these become when the runtime joins in.

| Medium | Where it wins | Where Agent Guides fits better | Reach for it when |
|---|---|---|---|
| **Wiki runbooks** (Notion / Confluence) | Zero runtime, zero spec, every team already has one | Staleness, duplication, broken update loops, and no evidence trail all have a runtime answer | The runbook is rare, simple, and the rot is tolerable |
| **ITSM knowledge bases** (ServiceNow, JSM) | Tight ITSM integration, ticket routing, SLA tracking | The agent *walks* the procedure rather than ticketing it; evidence is per-walk | A support org with ticketed procedures |
| **Runbook automation** (PagerDuty, Rundeck) | Pre-built integrations, RBAC, scheduling | LLM in the orchestrator slot — handles unanticipated state via recovery; audit captures reasoning, not just commands | Pure infra runbooks with no judgment |
| **Checklists** | Universally understood, no runtime, work under stress | Capture branching, recovery, judgment, and evidence | A confirmatory pre-flight list with no branching |
| **SOPs / OPORDs** | Established compliance pedigree, legally recognized | Executable *and* evidence-producing, not documentation alone | The procedure is legally-recognized documentation only |

---

## The baseline: an LLM with tools and a Skill

The most important comparison, because it's many readers' default mental model. A
Skills-capable harness plus a Skill plus the model's general reasoning is trivial to
start, has no spec overhead, and is excellent for one-shots. What you give up is what
Agent Guides exists to provide: persistent lessons across walks, a structured evidence
trail distinct from observability traces, an audit-grade history, a real
equal-participant model, and a library that can be composed and curated. The tradeoff
is real — **the baseline wins for one-shots; Agent Guides wins when the work recurs, is
walked by more than one person, or has to be audited.**

---

## Decision matrix

**Reach for Agent Guides when…**

| Scenario | Why it fits |
|---|---|
| Multi-step procedure with human checkpoints | Equal-participant model is native |
| Your team has a wiki-runbook problem | Stale, duplicated runbooks with broken update loops are what it's built to fix |
| Regulated workflow needing an audit trail | The append-only event log is evidence-grade |
| Procedural knowledge transfer across seniority | The log answers "why does step 3 say this?" |
| The procedure recurs across many walkers | Library + evidence compound over time |
| Multi-tool / multi-vendor environment | Harness portability across tools |
| The procedure hits unanticipated states | Recovery paths and rescue Guides handle them |

**Reach for something else when…**

| Scenario | Better fit |
|---|---|
| Pure data-pipeline ETL | Airflow / Prefect / Dagster |
| Deterministic financial reconciliation | Temporal or Step Functions |
| A single-shot LLM task | A Skill + harness — a Guide is overhead |
| High-throughput event processing | Inngest or Temporal |
| Exactly-once distributed semantics | Temporal |
| Agent-to-agent workflow with no human | CrewAI or AutoGen |
| A static pre-flight checklist | A checklist |

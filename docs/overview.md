---
title: Overview
nav_order: 2
permalink: /overview/
description: A tour of Agent Guides — equal human–agent participation, advised structure, verification, recovery, scored outcomes, and an append-only audit log.
---

# Overview

A Guide turns a multi-step procedure into something an agent and a person can walk
together, while the runtime keeps a record of what happened. This page is a conceptual
tour of what a Guide gives you and where each piece is useful. For the exact format see
the [Specification](/specification/); to build one, see the [Quickstart](/quickstart/).

---

## What it's for

Guides suit multi-step work that calls for judgment and doesn't always run the same way
twice: incident response, database migrations, release runbooks, onboarding, regulated
procedures. For a one-shot task a plain Skill is enough — a Guide earns its keep when
the work **recurs**, is walked by **more than one person**, or has to be **audited**.

The rest of this page tours the feature set one capability at a time.

---

## Equal participants

*A single Guide assigns each step to a person, the agent, or either — so one procedure can cover work that genuinely needs both.*

Every step names its `performer` — `agent`, `human`, or `either` — and the runtime
treats both as first-class actors. A Guide mixes them freely: the agent runs the checks
it can, the person makes the calls only a person should.

## Advised structure

*The agent navigates a graph of steps with discretion — structure where you need repeatability, latitude where you need judgment.*

Steps form a graph with `requires` ordering. Within that shape the agent chooses its own
path, rather than following a fixed script. It's the middle ground between a rigid state
machine and a fully open-ended agent: enough structure to be repeatable, enough latitude
to handle reality.

## Verification built in

*Each step declares how it's checked, so a walk records that the work succeeded — not just that it ran.*

A step is verified by a `script` result, the agent's `agent_judgment`, a `human_confirm`,
or `none`. Judgment-based checks must record the reasoning behind the verdict before the
step is called done.

## Recovery from the unexpected

*A failed step has a defined way forward, so a procedure can handle states its author never anticipated.*

A step that fails can retry, hand off to a rescue Guide via `recover_with` and resume
afterward, ask for input, or abort. The rescue procedure is itself a Guide, so the way
out of an unanticipated state is a reusable artifact rather than a one-off.

## Outcomes that are scored

*A Guide ranks its possible endings and records failures instead of hiding them.*

A Guide declares its possible `end_states`, each with a score. A rollback to the prior
state is a recorded outcome — a less-preferred success, not a silent failure.

## An append-only record

*Every walk leaves a durable, ordered log — the basis for audit, debugging, and improving guidance over time.*

The log captures step results, the agent's reasoning, human reports, recoveries, and
rollbacks, in order. It is the durable artifact a walk leaves behind.

## Composition and libraries

*Guides build on other Guides, so a procedure composes from parts instead of bloating into one file.*

A step can call another Guide (`guide_ref`), and a Book groups related Guides that
reference each other. Procedures become a curated library rather than monolithic
documents.

## Runs across clients

*The same Guide walks under every compatible client — not only the one you use today.*

The same `GUIDE.md` walks under Claude Code, under Hermes, and under a headless CLI.
Because a Guide is data rather than framework code, your procedures stay independent of
any one tool. See [Clients](/clients/).

---

## Where to go next

- [Quickstart](/quickstart/) — author and walk your first Guide
- [Specification](/specification/) — the exact format and JSON schemas
- [Clients](/clients/) — where Guides run today
- [Comparison](/comparison/) — how Agent Guides relates to adjacent tools

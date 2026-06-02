---
name: hachi-sense
description: Collect user pain signals, weak market signals, workarounds, repeated questions, and unmet needs as structured SEEDs for hachi-concept-factory. Use when asked to find product ideas, seeds, idea material, pain points, dissatisfaction, demand signals, or early product opportunities for a focus area, especially before hachi-position, hachi-concept, hachi-prd, or hachi-adr work.
---

# hachi-sense

Use this skill to turn messy signals into reusable `SEED` candidates. A SEED is not a PRD or a product concept; it is an observed pain, workaround, unmet need, technology change, or repeated question that may deserve positioning analysis later.

## Workflow

1. Normalize the request.
   - Detect the output locale from the user request unless explicitly specified.
   - Extract `focus_area`, period, source preferences, depth, and maximum SEED count.
   - Use defaults when omitted: `period=last_30_days`, `depth=standard`, `max_seeds=10`, `output_format=markdown`.

2. Collect evidence.
   - Prefer user-provided notes, URLs, repositories, issues, release notes, and docs when available.
   - For external research, use multiple source types when feasible: GitHub Issues/Discussions, official release notes, technical blogs, community forums, product directories, reviews, jobs, and trend sources.
   - Capture source URLs and dates. Keep direct quotes short; summarize most evidence.
   - If source access is incomplete, state the gap, lower confidence, and avoid presenting the run as exhaustive.

3. Separate fact, inference, and judgment.
   - Fact: what the source explicitly says or shows.
   - Inference: what the signal may imply.
   - Judgment: why this is or is not worth carrying forward.

4. Cluster and score signals.
   - Merge duplicate signals into one SEED when they describe the same pain.
   - Score each SEED from 1-5 for impact, urgency, novelty, and repeatability.
   - Set confidence to `low`, `medium`, or `high` based on evidence quality and cross-source support.
   - Keep the candidate list tight. Do not promote weakly evidenced signals just to fill `max_seeds`.

5. Recommend a next action.
   - `position`: strong enough for hachi-position.
   - `watch`: plausible but needs more signal.
   - `merge`: overlaps with another SEED.
   - `discard`: weak, solved, or outside hachiware-labs fit.
   - Include discarded or merged signal notes when depth is `standard` or `deep`.
   - For promoted SEEDs, include the handoff bundle hachi-position needs: affected user, pain, current workaround, strongest evidence, weakest evidence gap, and product hypothesis hint.

## hachiware-labs Fit

Evaluate whether each SEED fits these strengths:

- AI agent development support
- Local-first workflows
- CLI / Skill / OSS distribution
- PRD / ADR / Wiki / Deck handoff
- Japanese and domestic business context
- TPS / flow / Agentable design
- Small, adoptable developer tools

## Output

Return a Markdown report unless the user requests YAML or JSON.

Match section headings to the output locale. If output locale is Japanese, translate headings and field labels into Japanese while preserving stable IDs such as `seed_id`, URLs, and decision values. Do not use English headings such as `Scope` or `Executive Summary` in Japanese reports.

Use this structure:

```markdown
# hachi-sense SEED Report

## Scope
- Focus area:
- Period:
- Sources:
- Depth:
- Output locale:

## Executive Summary

## Signal Map
- Observed facts:
- Inferences:
- Judgments:

## SEED Candidates

### SEED 1: {title}
- Seed ID:
- Pain:
- Affected user:
- Evidence:
- Current workaround:
- Scores:
- Confidence:
- hachiware-labs fit:
- Next action:

## Recommended Next Step

## Evidence Gaps and Carry-forward
```

## References

- Read `references/seed-schema.md` when exact fields, scoring, or YAML-style output is needed.
- Read `references/source-strategy.md` when planning external research or selecting sources.
- Read `references/selection-rules.md` when deciding which signals become SEEDs.
- Read `references/quality-gates.md` before final recommendation, especially when sources are noisy, sparse, or inaccessible.
- Read `references/heading-localization.md` when output locale is Japanese.
- Read `examples/seed-report-mini.md` for a compact example of the expected report shape.

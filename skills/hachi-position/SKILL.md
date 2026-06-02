---
name: hachi-position
description: Evaluate hachi-concept-factory SEEDs as product hypotheses. Use when asked to assess a SEED, product idea, idea material, market position, win condition, vendor risk, OSS competition, differentiation, moat, wedge, or whether an idea should advance to hachi-concept.
---

# hachi-position

Use this skill to decide whether a SEED deserves to become a product concept. The goal is not a full business plan; the goal is a defensible positioning brief that clarifies target user, alternatives, differentiation, moat, wedge, risks, and next action.

## Workflow

1. Normalize the input.
   - Identify the source SEED, focus area, source evidence, output locale, and requested depth.
   - If the input is not already a SEED, restate it as a product-pain hypothesis before analysis.
   - Preserve links and evidence from hachi-sense when present.

2. Define the product hypothesis.
   - State the target user, pain, current workaround, proposed category, and job-to-be-done.
   - Keep the hypothesis narrow enough to evaluate. Split broad ideas into positioning options.

3. Check the landscape.
   - Big vendors: look for platform absorption risk and adjacent official capabilities.
   - Commercial alternatives: identify SaaS/tools users may already buy.
   - OSS alternatives: identify repositories, frameworks, extensions, scripts, and docs.
   - Manual workarounds: identify spreadsheets, hand-written docs, custom scripts, chat prompts, and consultants.
   - Use a depth-appropriate research completion check before scoring.
   - If research is incomplete, include the gap and avoid overconfident promotion.

4. Analyze differentiation and moat.
   - Separate feature differences from compounding advantages.
   - Explain why the moat may compound, how it may fail, how competitors could copy it, and how big vendors could absorb it.
   - Prefer narrow wedges that fit hachiware-labs strengths.

5. Score and decide.
   - Score pain-to-product fit, differentiation, vendor risk, OSS competition risk, wedge clarity, buildability, and moat.
   - Treat `vendor risk` and `OSS competition risk` as risk scores: higher is worse.
   - Recommend exactly one decision: `promote_to_concept`, `watch`, `merge`, or `discard`.
   - Include the next hachi-concept input if promoted.
   - Include why the decision would change if vendor, OSS, or evidence conditions change.

## hachiware-labs Fit

Prefer positions that strengthen one or more of these:

- AI agent development support
- Local-first workflows
- CLI / Skill / OSS distribution
- PRD / ADR / Wiki / Deck handoff
- Japanese and domestic business context
- TPS / flow / Agentable design
- Small, adoptable developer tools

Avoid positions that require competing head-on with broad platform features unless the wedge is clearly local, workflow-specific, transparent, Japanese-context-specific, or complementary.

## Output

Return Markdown unless the user requests YAML or JSON.

Match section headings to the output locale. If output locale is Japanese, translate headings and field labels into Japanese while preserving stable IDs, URLs, score names when useful, and decision values such as `promote_to_concept`. Do not use English headings such as `Scope` or `Product Hypothesis` in Japanese reports.

Use this structure:

```markdown
# hachi-position Report

## 1. Scope
- Source SEED:
- Focus area:
- Period:
- Sources:
- Output locale:

## 2. Product Hypothesis
### Hypothesis
### Target User
### Pain
### Proposed Product Category
### Job-to-be-Done

## 3. Market and Vendor Landscape
### Big Vendor Direction
### Commercial Alternatives
### OSS Alternatives
### Manual Workarounds

## 4. Differentiation Analysis

## 5. Moat Analysis

## 6. Positioning Options

## 7. Recommendation
Decision:
- promote_to_concept
- watch
- merge
- discard

## 8. Scores

## 9. Research Gaps and Decision Triggers

## 10. Next Step
```

## References

- Read `references/positioning-schema.md` when exact fields, scoring, or YAML-style output is needed.
- Read `references/landscape-research.md` when planning external research.
- Read `references/moat-and-wedge.md` when evaluating compounding advantage and first wedge.
- Read `references/research-completion.md` before final scoring.
- Read `references/quality-gates.md` before final recommendation, especially for vendor absorption, mature OSS, weak evidence, or broad SEEDs.
- Read `references/heading-localization.md` when output locale is Japanese.
- Read `examples/position-report-mini.md` for a compact example of the expected report shape.

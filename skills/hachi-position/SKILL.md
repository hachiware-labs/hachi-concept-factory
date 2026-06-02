---
name: hachi-position
description: Evaluate and select hachi-concept-factory SEEDs as product hypotheses. Use when asked to assess one SEED, choose promising or distinctive SEEDs from a SEED report, evaluate product ideas, market position, win condition, vendor risk, OSS competition, differentiation, moat, wedge, or whether an idea should advance to hachi-concept.
---

# hachi-position

Use this skill to decide whether a SEED deserves to become a product concept. It can evaluate a single SEED, or it can read a multi-SEED hachi-sense report, select the most promising or distinctive candidates, and then evaluate the selected candidates. The goal is not a full business plan; the goal is a defensible positioning brief that clarifies target user, alternatives, differentiation, moat, wedge, risks, and next action.

## Workflow

1. Normalize the input.
   - Identify the source SEED, focus area, source evidence, output locale, and requested depth.
   - If the input is a hachi-sense report or contains multiple SEEDs, treat it as a candidate pool before choosing what to evaluate.
   - If the input is not already a SEED or SEED report, restate it as a product-pain hypothesis before analysis.
   - Preserve links and evidence from hachi-sense when present.

2. Select candidates when multiple SEEDs are present.
   - Do not require the user to manually choose one SEED from a hachi-sense report.
   - Build a short candidate table for all plausible SEEDs, using their ID, title, user, pain, evidence, current workaround, existing-solution gap, uniqueness, risk, product hint, and hachiware-labs fit.
   - Evaluate candidate-selection attributes before choosing:
     - User pain intensity: repeated, expensive, urgent, emotionally sharp, or tied to visible failure.
     - Pain ownership: a clear user or buyer owns the pain and can recognize success.
     - Evidence strength: the SEED has concrete observations, artifacts, repeated reports, or strong firsthand notes.
     - Existing-solution gap: current tools, OSS, vendor features, or manual workarounds leave an unresolved workflow gap.
     - Problem distinctiveness: the pain is specific, non-obvious, under-served, or framed differently from crowded categories.
     - Wedge sharpness: a small first workflow, input, output, and success moment are imaginable.
     - hachiware-labs fit: local-first, Skill / CLI / Markdown artifact, Japanese context, PRD / ADR / Wiki handoff, or small-team workflow strengths apply.
     - Moat potential: repeated use can accumulate workflow, context, rules, examples, evaluation data, or decision history.
     - Risk-adjusted feasibility: a small team can ship a credible first version without being immediately absorbed by vendors or mature OSS.
     - Learning value: even a `watch` candidate would teach something useful about users, workflows, or the market.
   - Select candidates by intent:
     - `top`: highest overall promise for hachiware-labs.
     - `pain`: strongest user pain, urgency, frequency, or failure consequence.
     - `distinctive`: most unusual, non-obvious, under-served, or defensible problem framing even if evidence is thinner.
     - `solution_gap`: clearest gap left by existing vendor, OSS, SaaS, or manual alternatives.
     - `safe`: strongest evidence and lowest vendor / OSS absorption risk.
     - `risky_but_interesting`: high upside but weak evidence, high vendor risk, or unclear wedge.
     - `coverage`: diverse candidates across different users, pains, workflows, and product forms.
   - If the user does not specify selection intent, select 1 primary candidate and 2 secondary candidates using `top` plus `coverage`.
   - Explain why selected candidates were chosen and why obvious rejected candidates were not selected.
   - Then run full positioning on the primary candidate unless the user asks for top-N brief evaluations.

3. Define the product hypothesis.
   - State the target user, pain, current workaround, proposed category, and job-to-be-done.
   - Keep the hypothesis narrow enough to evaluate. Split broad ideas into positioning options.

4. Check the landscape.
   - Big vendors: look for platform absorption risk and adjacent official capabilities.
   - Commercial alternatives: identify SaaS/tools users may already buy.
   - OSS alternatives: identify repositories, frameworks, extensions, scripts, and docs.
   - Manual workarounds: identify spreadsheets, hand-written docs, custom scripts, chat prompts, and consultants.
   - Use a depth-appropriate research completion check before scoring.
   - If research is incomplete, include the gap and avoid overconfident promotion.

5. Analyze differentiation and moat.
   - Separate feature differences from compounding advantages.
   - Explain why the moat may compound, how it may fail, how competitors could copy it, and how big vendors could absorb it.
   - Prefer narrow wedges that fit hachiware-labs strengths.

6. Score and decide.
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
- Source SEED report:
- Focus area:
- Period:
- Sources:
- Output locale:

## 2. Candidate Selection
### Selection Intent
### Candidate Pool
### Selected Candidates
### Rejected or Deferred Candidates

## 3. Product Hypothesis
### Hypothesis
### Target User
### Pain
### Proposed Product Category
### Job-to-be-Done

## 4. Market and Vendor Landscape
### Big Vendor Direction
### Commercial Alternatives
### OSS Alternatives
### Manual Workarounds

## 5. Differentiation Analysis

## 6. Moat Analysis

## 7. Positioning Options

## 8. Recommendation
Decision:
- promote_to_concept
- watch
- merge
- discard

## 9. Scores

## 10. Research Gaps and Decision Triggers

## 11. Next Step
```

## References

- Read `references/positioning-schema.md` when exact fields, scoring, or YAML-style output is needed.
- Read `references/landscape-research.md` when planning external research.
- Read `references/moat-and-wedge.md` when evaluating compounding advantage and first wedge.
- Read `references/research-completion.md` before final scoring.
- Read `references/quality-gates.md` before final recommendation, especially for vendor absorption, mature OSS, weak evidence, or broad SEEDs.
- Read `references/heading-localization.md` when output locale is Japanese.
- Read `examples/position-report-mini.md` for a compact example of the expected report shape.

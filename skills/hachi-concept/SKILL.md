---
name: hachi-concept
description: Create, extract, refine, or synthesize product Concept Briefs for hachi-concept-factory. Use when asked to turn SEEDs, hachi-position reports, GitHub repositories, README files, issues, code, past notes, or rough product ideas into a sharper concept that can advance to hachi-prd.
---

# hachi-concept

Use this skill to turn a promising SEED or positioning brief into a product concept. A Concept Brief should clarify target user, pain, proposed solution, product form, differentiation, moat, wedge, MVP direction, risks, and PRD readiness.

## Modes

- `extract`: infer latent product concepts from a repository, README, docs, issues, examples, CLI help, code structure, or notes.
- `refine`: sharpen an existing concept by clarifying user, pain, differentiation, wedge, moat, MVP, and non-goals.
- `synthesize`: merge multiple SEEDs, positioning briefs, repositories, or past notes into a stronger concept.

If the user does not specify a mode:

- Use `extract` for repositories, README files, codebases, or raw notes.
- Use `refine` for one concept or one positioning brief.
- Use `synthesize` for multiple SEEDs, position reports, or concept candidates.

## Workflow

1. Normalize the input.
   - Identify mode, output locale, source SEEDs, positioning briefs, repositories, past concepts, constraints, and target product form.
   - Preserve source links and file paths.
   - Separate observed facts, inferences, and judgments.

2. Restate the concept candidate.
   - Write a clear title, one-liner, tagline, target user, target context, pain, and proposed product form.
   - If the input is broad, choose one first wedge and put other options in risks or future directions.

3. Design the core product concept.
   - Explain what the product does, what it does not do, first input, first output, and first workflow.
   - Describe both first-use experience and repeated-use experience. Do not reduce the concept to only a first 10-minute experience when ongoing use is part of the value.
   - Prefer a small Skill / CLI / OSS wedge when it fits hachiware-labs strengths.
   - Avoid turning the concept into a full PRD.

4. Embed differentiation and moat.
   - Use the hachi-position moat as a product design constraint.
   - Explain what compounds through repeated use: workflow, context, data, integrations, community, local-first, Japanese-context, process, taste, or Agentable outputs.
   - State how the moat can be strengthened.

5. Run the self-refinement loop.
   - Critique the draft before finalizing it.
   - Identify where the target user is too broad, the wedge is too vague, the concept sounds like a prompt, or the moat does not compound.
   - Sharpen the concept around first user, signature workflow, example input, example output, activation moment, sharpest non-goal, and why this is not just a prompt.
   - Keep a short `Refinement Log` in the output for non-trivial concept work.
   - Iterate again if the critique exposes a major weakness. Do not promote to PRD until the concept survives at least one critique pass.

6. Assess PRD readiness.
   - Score or discuss clarity, pain alignment, differentiation, moat strength, wedge, and PRD readiness.
   - Do not recommend `promote_to_prd` unless signature workflow, example input, example output, activation moment, sharpest non-goal, and why this is not just a prompt are all present and concrete.
   - Recommend exactly one next action: `promote_to_prd`, `refine`, `merge`, `watch`, or `discard`.

## hachiware-labs Fit

Prefer concepts that connect to:

- AI agent development support
- Local-first workflows
- CLI / Skill / OSS distribution
- PRD / ADR / Wiki / Deck handoff
- Japanese and domestic business context
- TPS / flow / Agentable design
- Small, adoptable developer tools

## Output

Return Markdown unless the user requests YAML or JSON.

Match section headings to the output locale. If output locale is Japanese, translate headings and field labels into Japanese while preserving stable IDs, URLs, score names when useful, and decision values such as `promote_to_prd`. Do not use English headings such as `Scope` or `Concept Summary` in Japanese reports.

Use this structure:

```markdown
# hachi-concept Concept Brief

## 1. Scope
- Input:
- Mode:
- Output locale:

## 2. Concept Summary
- Title:
- One-liner:
- Tagline:
- Target user:
- Product form:

## 3. Pain and Context

## 4. Signature Workflow and Experience

## 5. Proposed Concept

## 6. Differentiation

## 7. Moat

## 8. Wedge and MVP Direction

## 9. Evidence and Source Trace

## 10. Refinement Log

## 11. Risks and Assumptions

## 12. PRD Readiness

## 13. Recommendation
Decision:
- promote_to_prd
- refine
- merge
- watch
- discard

Next step:
```

## References

- Read `references/concept-schema.md` when exact fields or YAML-style output is needed.
- Read `references/modes.md` when choosing between extract, refine, and synthesize.
- Read `references/refinement-loop.md` when sharpening a concept before final output.
- Read `references/prd-readiness.md` when deciding whether to promote the concept.
- Read `references/experience-gates.md` before final recommendation, especially when the concept risks becoming a prompt, dashboard, or broad platform.
- Read `references/heading-localization.md` when output locale is Japanese.
- Read `examples/concept-brief-mini.md` for a compact example of the expected report shape.

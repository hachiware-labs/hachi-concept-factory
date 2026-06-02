---
name: hachi-prd
description: Turn hachi-concept Concept Briefs into implementation-ready PRDs with detailed user analysis, concrete pain points, operation-image use cases, functional and non-functional requirements, acceptance criteria, success metrics, and ADR candidates.
---

# hachi-prd

Use this skill to convert a Concept Brief into a PRD. The PRD must define what to build, who it is for, why it matters, how users operate it, what the MVP includes, how acceptance is tested, and which design decisions should move to hachi-adr.

## Workflow

1. Normalize the input.
   - Identify source Concept Brief, output locale, product form, priority, density level, constraints, target platform, and distribution.
   - Preserve source file paths, SEED IDs, positioning reports, concept IDs, and evidence.
   - If concept details are missing, infer conservatively from hachi-sense, hachi-position, hachi-concept, repository conventions, and hachiware-labs strengths.
   - Use `standard` density unless the user or source clearly asks for `mvp` or `full`.

2. Analyze users before writing requirements.
   - Separate primary user, secondary users, buyer, approver, operator, reader, and maintainer.
   - Describe current workflow, technical level, constraints, success condition, and failure consequence.
   - Distinguish who operates the product from who consumes the output.

3. Draw pain points in detail.
   - For each pain, write situation, trigger, workaround, why alternatives fail, frequency, severity, emotional tone, workflow/business impact, willingness to pay or adopt, and evidence.
   - Avoid vague pains such as "debugging is hard" unless the concrete failure scenario is also written.

4. Convert the Signature Workflow into use cases.
   - Do not stop at `As a ...` user stories.
   - For each key use case, include actor, goal, preconditions, input, user operation, system behavior, output, next action, success state, failure or edge cases, and acceptance criteria.
   - Include both first-use and repeated-use workflows when the concept compounds over time.
   - Include failure, empty, invalid input, privacy, locale, and handoff edge cases when relevant to the product form.

5. Define scope and requirements.
   - State goals, non-goals, product scope, input/output, data model, workflow, functional requirements, non-functional requirements, acceptance criteria, success metrics, risks, assumptions, and open questions.
   - Trace each major functional requirement to a pain point, use case, or explicit concept constraint.
   - Keep final technology decisions out of the PRD unless they are hard constraints.
   - Extract ADR candidates for storage, runtime, schema, integration, privacy, evaluation, and distribution decisions.

6. Decide readiness.
   - Recommend exactly one decision: `promote_to_adr`, `refine_prd`, `return_to_concept`, `watch`, or `discard`.
   - Use `refine_prd` if user analysis, pain points, use cases, MVP scope, requirement traceability, or acceptance criteria are not concrete enough.

## hachiware-labs Fit

Prefer PRDs that preserve:

- AI agent development support
- Local-first workflows
- CLI / Skill / OSS distribution
- PRD / ADR / Wiki / Deck handoff
- Japanese and domestic business context
- TPS / flow / Agentable design
- Small, adoptable developer tools

## Output

Return Markdown unless the user requests YAML or JSON.

Match section headings to the output locale. If output locale is Japanese, translate headings and field labels into Japanese while preserving stable IDs, URLs, score names when useful, and decision values such as `promote_to_adr`. Do not use English headings such as `Metadata` or `User Analysis` in Japanese reports.

Use this structure:

```markdown
# PRD: {title}

## 1. Metadata

## 2. Summary

## 3. Background

## 4. Problem Statement

## 5. Target Users

## 6. User Analysis

## 7. Pain Points

## 8. Goals

## 9. Non-Goals

## 10. Product Scope

## 11. User Stories

## 12. Use Cases and Operation Image

## 13. Functional Requirements

## 14. Non-Functional Requirements

## 15. Input / Output

## 16. Data Model

## 17. Workflow

## 18. Acceptance Criteria

## 19. Requirement Traceability

## 20. Success Metrics

## 21. Risks

## 22. Assumptions

## 23. Open Questions

## 24. ADR Candidates

## 25. Readiness Decision
```

## References

- Read `references/prd-schema.md` when exact fields or YAML-style output is needed.
- Read `references/output-density.md` before deciding how detailed the PRD should be.
- Read `references/user-analysis.md` before writing Target Users, User Analysis, or Pain Points.
- Read `references/use-cases-operation.md` before writing User Stories, Use Cases, Workflow, or Acceptance Criteria.
- Read `references/adr-candidates.md` before writing ADR Candidates.
- Read `references/implementation-readiness.md` before final readiness decision.
- Read `references/heading-localization.md` when output locale is Japanese.
- Read `examples/prd-mini.md` for a compact example of the expected report shape.

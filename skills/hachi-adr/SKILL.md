---
name: hachi-adr
description: Create rigorous ADRs from hachi-prd ADR candidates or design decisions, with grill-me style detail: explicit assumptions, inferred defaults, alternatives, consequences, verification notes, privacy and local-first checks, reversibility, and implementation guidance.
---

# hachi-adr

Use this skill to record why a design decision was chosen. hachi-adr is not a PRD and not an implementation task list. It should document one important decision, its context, assumptions, alternatives, consequences, risks, mitigations, verification plan, and follow-up work.

## Core Rule

Use grill-me style rigor. If user-provided information is incomplete, do not stop immediately. Infer conservative defaults from the PRD, Concept Brief, SEED, repository conventions, npm / JavaScript tooling, local-first policy, and hachiware-labs strengths. Mark those inferences clearly as `Assumed`, `Inferred`, or `Defaulted`.

One ADR records one decision. If the input mixes independent decisions, split the ADR or recommend `split_adr` before trying to solve everything in one document.

## Workflow

1. Normalize the decision.
   - Identify the related PRD, Concept, SEED, repository context, constraints, and specific ADR candidate.
   - Ensure the ADR covers one decision. If multiple decisions are mixed, split or recommend `split_adr` using the decision-splitting rules.

2. Build the Assumption Ledger.
   - List what is explicitly known.
   - List what is assumed, inferred, defaulted, needs confirmation, and the conservative fallback.
   - If context is missing, use npm / Node.js / JavaScript, local-first Markdown artifacts under `factory/`, and no hosted data transfer as defaults unless contradicted.
   - Keep the ledger decision-relevant and capped; do not turn missing context into a generic requirements dump.

3. Grill the decision.
   - Define decision boundary, non-decision scope, affected inputs/outputs, storage, runtime, dependencies, privacy, testability, and reversibility.
   - Include at least two alternatives for important decisions.
   - Explain why each rejected alternative loses.
   - Do not hide uncertainty in open questions without also giving a provisional recommendation.

4. Write implementation and verification notes.
   - Include affected files or modules when known.
   - Include input/output examples, edge cases, error handling, local storage behavior, secret handling, log behavior, and npm / JavaScript implementation notes.
   - Include required tests, acceptance checks, regression checks, and manual review points.

5. Decide ADR status.
   - Recommend exactly one decision: `accept_adr`, `refine_adr`, `split_adr`, `return_to_prd`, or `discard`.
   - Use `refine_adr` when rationale, alternatives, risks, or verification are still weak.
   - Use `split_adr` when one ADR contains multiple independent design decisions.
   - Do not use `accept_adr` unless the adopted decision, rejected alternatives, consequences, rollback or migration path, and verification notes are all decision-specific.

## Output

Return Markdown unless the user requests YAML or JSON.

Match section headings to the output locale. If output locale is Japanese, translate headings and field labels into Japanese while preserving stable IDs, URLs, score names when useful, and decision values such as `accept_adr`. Do not use English headings such as `Context` or `Assumption Ledger` in Japanese reports.

Use this structure:

```markdown
# ADR: {title}

## 1. Metadata

## 2. Context

## 3. Assumption Ledger

## 4. Decision

## 5. Rationale

## 6. Alternatives Considered

## 7. Consequences

## 8. Risks

## 9. Mitigations

## 10. Implementation Notes

## 11. Verification Notes

## 12. Follow-up Tasks

## 13. Related Documents

## 14. ADR Decision
```

## References

- Read `references/adr-schema.md` when exact fields or YAML-style output is needed.
- Read `references/decision-splitting.md` before deciding whether the ADR should stay as one document.
- Read `references/detail-grilling.md` before writing or reviewing any ADR.
- Read `references/assumptions-and-verification.md` when context is incomplete or tests are needed.
- Read `references/acceptance-gates.md` before final ADR decision.
- Read `references/heading-localization.md` when output locale is Japanese.
- Read `examples/adr-mini.md` for a compact example of the expected report shape.

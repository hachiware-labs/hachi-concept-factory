# hachi-prd Implementation Readiness

Use this before recommending `promote_to_adr`.

## Scenario Gates

- Thin concept input: infer conservative details, label assumptions, and use `return_to_concept` if target user, pain, or signature workflow must be rediscovered.
- MVP request: keep scope narrow, but still include operation-image use cases and acceptance criteria.
- Full PRD request: expand users, pain points, use cases, and requirements without turning ADR decisions into final technology choices.
- Multi-user product: separate operator, reader, buyer, approver, and maintainer; do not collapse them into one persona.
- Local-first or sensitive data: include privacy, storage, redaction, and no-hosted-transfer requirements.
- Japanese output or mixed-language sources: include locale acceptance checks.

## Requirement Traceability

Use a compact trace table or bullets:

```markdown
| Requirement | Source pain / use case / concept constraint | Acceptance check |
|---|---|---|
| FR-001 | PAIN-001 / UC-001 | Given/When/Then check |
```

Every major functional requirement should trace to one of:

- Pain point
- Use case
- Concept non-goal or constraint
- hachiware-labs fit requirement
- Privacy, locale, or local-first requirement

## 90-Point Output Gate

A strong hachi-prd output should satisfy all of these:

- Density level is explicit or sensibly defaulted.
- Primary user and stakeholder roles are separated.
- Pain points include situation, trigger, workaround, failure of alternatives, frequency, severity, impact, adoption willingness, and evidence.
- Use cases include concrete user operation, system behavior, output, next action, success state, and edge cases.
- Requirements are traceable to pains, use cases, or concept constraints.
- Acceptance criteria are observable and include edge cases.
- ADR candidates name decision boundaries and urgency.
- Readiness decision matches the evidence; weak PRDs use `refine_prd` or `return_to_concept`.

## Edge Case Checklist

- Missing or malformed input
- Empty result
- Duplicate or overlapping artifacts
- Mixed Japanese/English input
- Sensitive data or secrets
- Local file path and storage failure
- Unsupported product form or environment
- Handoff failure to hachi-adr or implementation

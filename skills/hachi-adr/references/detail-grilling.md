# hachi-adr Detail Grilling

hachi-adr should aggressively remove ambiguity from design decisions. It should not ask for clarification as the first move unless progress would be unsafe. Instead, make conservative assumptions and label them.

## Required Checks

- What exactly is being decided?
- What is explicitly not being decided?
- Is this one decision, or should it be split into multiple ADRs?
- Which PRD requirements depend on this decision?
- What breaks if the decision is not made?
- Which inputs, outputs, storage locations, runtime behavior, and dependencies are affected?
- How does the decision affect local-first behavior?
- How does it affect Japanese output locale or mixed-language input?
- How does it affect privacy and secrets?
- How does it affect testability?
- What is the rollback or migration path?
- What evidence would prove the decision worked?

## Alternative Coverage

For important decisions, include at least:

- Adopted option
- Conservative simpler option
- More powerful or scalable option
- Hosted/vendor option if relevant

Each alternative needs:

- Pros
- Cons
- Reason rejected

## Stop Conditions

Use `return_to_prd` only when the requirement itself is too unclear to choose a responsible default. Use `split_adr` when storage, runtime, schema, privacy, distribution, or evaluation decisions are mixed into one ADR and can be reversed independently.

## Size Discipline

- Keep the decision sentence short enough to test directly.
- Keep alternatives on the same decision boundary.
- Move unrelated future options to follow-up tasks or proposed split ADRs.
- Do not expand implementation notes into a full task plan.
- Do not expand verification notes into every possible test; cover major consequences and risk-bearing paths.

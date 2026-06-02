# hachi-adr Decision Splitting

Use this before writing or accepting an ADR.

## One ADR = One Decision

An ADR should answer one primary question:

- "Which storage format should this product use?"
- "Should outputs be local Markdown artifacts or hosted records?"
- "How should the CLI validate generated concept briefs?"

It should not combine storage, runtime, schema, privacy, distribution, and evaluation decisions unless they are inseparable consequences of one primary decision.

## Recommend `split_adr` When

Use `split_adr` when at least one condition is true:

- The title contains two independent choices joined by "and", "plus", or equivalent.
- Different stakeholders would approve different parts of the decision.
- A rejected alternative for one part could still be adopted for another part.
- The decision affects multiple independent boundaries such as storage format, runtime, external service use, schema, distribution, evaluation, or permission model.
- Verification notes require unrelated test suites.
- Reversing one part would not require reversing the other parts.

## Keep One ADR When

Keep one ADR when:

- One decision naturally determines the other details.
- Alternatives can be compared on the same decision boundary.
- Consequences, risks, and verification checks all point to the same implementation surface.
- Splitting would create documents that cannot be understood independently.

## Split Output Pattern

When recommending `split_adr`, include:

- Original mixed decision:
- Reason to split:
- Proposed ADR 1:
- Proposed ADR 2:
- Proposed ADR 3, if needed:
- Which ADR should be written first:

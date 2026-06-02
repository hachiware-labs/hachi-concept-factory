# hachi-adr Acceptance Gates

Use this before recommending `accept_adr`.

## Scenario Gates

- Mixed decision: recommend `split_adr` if storage, runtime, schema, privacy, distribution, or evaluation can be reversed independently.
- Missing PRD detail: infer conservative defaults only when the decision boundary is still clear; otherwise use `return_to_prd`.
- Implementation-only topic: use `discard` if the choice is not important enough to preserve as an architectural decision.
- Privacy or hosted service impact: require explicit local-first, data transfer, secrets, log, and rollback checks.
- npm / JavaScript project: default to Node.js-compatible implementation notes unless contradicted.
- Locale-sensitive output: include Japanese heading and mixed-language verification checks when text generation is affected.

## 90-Point Output Gate

A strong hachi-adr output should satisfy all of these:

- One primary decision is stated in one sentence.
- Non-decision scope blocks adjacent choices.
- Context connects to PRD requirements, concept constraints, or hachiware-labs principles.
- Assumption Ledger is capped, labeled, and decision-relevant.
- At least two rejected alternatives have pros, cons, and specific rejection reasons.
- Consequences include positive, negative, operational, and future implications.
- Risks and mitigations cover privacy, local-first behavior, dependencies, reversibility, and testability when relevant.
- Implementation notes name affected files, artifact paths, input/output examples, edge cases, and npm / JavaScript implications when known.
- Verification notes tie checks to consequences and include acceptance, regression, and manual review points.
- Final decision is `accept_adr` only when a future implementer can act without rediscovering the rationale.

## Reject Acceptance When

Use `refine_adr`, `split_adr`, or `return_to_prd` instead of `accept_adr` when:

- The decision sentence contains multiple independent choices.
- Alternatives are topics rather than concrete options.
- Rejected options lack reasons grounded in PRD goals or constraints.
- Verification notes test the whole product rather than the decision.
- Open questions change the adopted decision instead of only confirming implementation details.

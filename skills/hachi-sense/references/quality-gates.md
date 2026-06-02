# hachi-sense Quality Gates

Use this before finalizing a SEED report.

## Scenario Gates

- User-provided notes only: treat the notes as primary evidence, mark source coverage as limited, and avoid claiming market repetition unless the notes show repeated cases.
- Sparse or inaccessible external sources: lower confidence, keep fewer SEEDs, and write the missing source types under evidence gaps.
- High-noise social trend: require a concrete affected user and workaround before promoting to `position`.
- Repository or issue mining: preserve issue links, maintainer responses, stale issue age, workaround comments, and whether the pain is still open.
- Vendor release or regulatory change: separate technology change from user pain; do not create a SEED unless the downstream user impact is concrete.

## 90-Point Output Gate

A strong hachi-sense output should satisfy all of these:

- Focus area, period, depth, source types, and output locale are explicit.
- Observed facts, inferences, and judgments are separated.
- Candidate count follows depth rules and does not fill the maximum with weak signals.
- Each promoted SEED has an affected user, pain, current workaround, evidence, confidence, scores, hachiware-labs fit, and product hypothesis hint.
- `watch`, `merge`, and `discard` decisions are used when evidence is weak or overlapping.
- Evidence gaps are visible and affect confidence.
- Promoted SEEDs include enough context for hachi-position to start without rediscovering the pain.

## Carry-forward Notes

Include carry-forward notes when useful:

- Promoted to hachi-position: what to compare first.
- Watch: what signal would change the decision.
- Merge: which stronger SEED owns the pain.
- Discard: why it should not reappear unless new evidence arrives.

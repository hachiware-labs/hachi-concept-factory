# hachi-position Quality Gates

Use this before deciding whether a SEED advances to hachi-concept.

## Scenario Gates

- Multi-SEED input: first select candidate SEEDs. Do not force the user to manually identify one SEED when a hachi-sense report is available.
- Candidate selection: include at least one selected primary candidate, up to two secondary candidates, and a short explanation for rejected or deferred obvious candidates.
- Candidate attributes: score user pain intensity, pain ownership, evidence strength, existing-solution gap, problem distinctiveness, wedge sharpness, hachiware-labs fit, moat potential, risk-adjusted feasibility, and learning value before choosing.
- Distinctive candidate request: do not simply choose the highest evidence SEED. Favor unusual pain, non-obvious problem framing, under-served workflows, hachiware-labs fit, and learnability, while clearly labeling evidence gaps.
- Top candidate request: rank by pain intensity, pain ownership, evidence strength, solution gap, wedge sharpness, risk-adjusted feasibility, moat potential, and hachiware-labs fit.
- Pain-first request: choose the SEED with the sharpest repeated user pain even if product form is less obvious, then state what concept work is needed.
- Solution-gap request: choose the SEED where current vendor, OSS, SaaS, or manual alternatives leave the clearest unresolved workflow gap.
- Strong pain, crowded market: promote only if the wedge avoids direct feature comparison and names a compounding moat.
- Weak evidence, attractive idea: use `watch` and state what evidence would raise confidence.
- Big vendor absorption risk: use `watch` or `discard` unless the wedge is local-first, workflow-specific, Japanese-context-specific, transparent, or complementary.
- Mature OSS competition: promote only when the target user still has an unresolved adoption, workflow, evaluation, locale, or handoff pain.
- Broad SEED: split into positioning options, score each briefly, and promote only one first wedge.
- User asks for quick opinion: still include risk direction and at least a minimal alternative/workaround check.

## 90-Point Output Gate

A strong hachi-position output should satisfy all of these:

- The product hypothesis is narrower than the original SEED.
- If multiple SEEDs were provided, candidate selection is explicit and the primary candidate is justified.
- Landscape coverage matches requested depth or the gap is explicit.
- Big vendor, commercial, OSS, and manual workaround alternatives are all considered when relevant.
- Differentiation is stated as a wedge, not a generic quality claim.
- Moat explains what compounds and how it can fail.
- Scores include direction for risk scores and match the recommendation.
- `promote_to_concept` includes a 3-7 bullet hachi-concept input.
- `watch`, `merge`, or `discard` includes the evidence or condition that would change the decision.

## Decision Triggers

State triggers when the decision is not stable:

- Promote later if repeated direct user evidence appears.
- Watch if vendor roadmaps are unclear.
- Discard if a default platform feature fully covers the wedge.
- Merge if another SEED owns the same user, pain, and workflow entry point.

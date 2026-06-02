# hachi-concept PRD Readiness

Use these checks before recommending `promote_to_prd`.

## Rubric

- Clarity: title, one-liner, target user, and product form are concrete.
- Pain alignment: the concept directly addresses a SEED or positioning pain.
- Differentiation: the concept is not just a generic assistant, dashboard, or wrapper.
- Moat strength: repeated use creates workflow, context, data, integration, local-first, Japanese-context, process, taste, or Agentable value.
- Wedge: first user, first input, first output, and MVP are narrow.
- Signature workflow: the representative use flow, example input, example output, and activation moment are concrete.
- Not-a-prompt: the concept explains why it is more than a reusable prompt or generic assistant.
- PRD readiness: requirements can be written without redoing positioning.

## Promote to PRD When

- Target user and first workflow are clear.
- Signature workflow, example input, example output, activation moment, sharpest non-goal, and not-a-prompt rationale are all concrete.
- MVP can be described in 3-7 bullets.
- Non-goals prevent scope creep.
- The Concept Brief includes a refinement log or explicitly states why no refinement was needed.
- Risks and assumptions are explicit.
- The next implementation questions belong in PRD or ADR, not in concept discovery.

## Block Promotion When

Recommend `refine`, `watch`, or `discard` instead of `promote_to_prd` when any of these are true:

- First input or first output is missing, generic, or impossible to picture.
- Activation moment is not tied to a visible workflow improvement.
- Sharpest non-goal is weak, broad, or contradicted by the proposed MVP.
- The concept's differentiation depends on model quality, prompt wording, or vague taste alone.
- The core value requires unproven integrations, hosted data collection, or a marketplace before a narrow MVP can work.
- The PRD writer would need to redo user, pain, workflow, or positioning discovery.

## Recommend Refine When

- The concept is attractive but too broad.
- Target user is vague.
- Product form is unclear.
- Differentiation depends on taste rather than a concrete wedge.
- Moat is asserted but not connected to accumulated artifacts or workflow.

## Recommend Watch or Discard When

- Evidence is weak.
- Vendor or OSS absorption removes the wedge.
- The product would require a large platform before proving core value.
- hachiware-labs strengths are not relevant.

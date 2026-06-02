# hachi-prd Output Density

Use the smallest density that satisfies the user's request. If unspecified, use `standard`.

## Density Levels

### mvp

Use when the user wants a quick buildable PRD, a small Skill / CLI / OSS wedge, or a first implementation pass.

- Primary users: 1
- Secondary users / stakeholders: 0-2
- Pain points: 2-3
- Use cases: 2-3
- Functional requirements: 5-7
- Non-functional requirements: 3-5
- Acceptance criteria: 5-8
- Success metrics: 3-5
- ADR candidates: 2-3

### standard

Use for normal hachi-concept-factory handoff from concept to implementation.

- Primary users: 1
- Secondary users / stakeholders: 2-4
- Pain points: 3-5
- Use cases: 3-5
- Functional requirements: 8-12
- Non-functional requirements: 5-8
- Acceptance criteria: 8-12
- Success metrics: 5-7
- ADR candidates: 4-6

### full

Use when the user asks for exhaustive analysis, multi-role rollout, product review, investor-quality planning, or a high-stakes implementation.

- Primary users: 1-2, with one clearly marked first adopter
- Secondary users / stakeholders: 4-7
- Pain points: 5-8
- Use cases: 5-8
- Functional requirements: 12-20
- Non-functional requirements: 8-12
- Acceptance criteria: 12-20
- Success metrics: 7-10
- ADR candidates: 6-10

## Density Discipline

- Do not inflate weak requirements to hit a maximum.
- If evidence is thin, keep density lower and mark assumptions explicitly.
- Every functional requirement should trace to a pain point, use case, or explicit concept constraint.
- Every ADR candidate should name the decision boundary, not just a topic.
- If the PRD exceeds the chosen density, split future scope into follow-up PRDs or ADR candidates.

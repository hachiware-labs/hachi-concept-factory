# hachi-concept Schema

Use this schema when structured output is requested or when the Concept Brief needs to become a durable artifact.

```yaml
concept:
  concept_id: "concept-YYYYMMDD-001"
  title: ""
  one_liner: ""
  tagline: ""
  source:
    seeds: []
    positioning_briefs: []
    repositories: []
    past_concepts: []
  target_user: ""
  target_context: ""
  pain: ""
  current_alternatives: []
  proposed_solution: ""
  product_form: ""
  core_value: ""
  signature_workflow:
    first_use_steps: []
    repeated_use_steps: []
  example_input: ""
  example_output: ""
  activation_moment: ""
  sharpest_non_goal: ""
  why_not_just_a_prompt: ""
  differentiation:
    primary: ""
    secondary: []
  moat:
    type:
      - workflow
      - context
      - data
      - integration
      - community
      - local_first
      - japanese_context
      - process
      - agentable
    description: ""
    how_it_compounds: ""
    how_to_strengthen: ""
  wedge: ""
  mvp_direction: ""
  non_goals: []
  user_story:
    - "As a ..., I want ..., so that ..."
  key_use_cases: []
  success_signals: []
  risks: []
  assumptions: []
  open_questions: []
  disqualification_checks:
    missing_first_input_output: false
    weak_activation_moment: false
    weak_non_goal: false
    prompt_only_risk: false
    platform_before_wedge_risk: false
  prd_readiness: low | medium | high
  next_action: promote_to_prd | refine | merge | watch | discard
  output_locale: ""
```

## Field Guidance

- `title`: concrete product name or working name.
- `one_liner`: literal description, not marketing copy.
- `tagline`: short positioning phrase.
- `target_user`: first user, not all future users.
- `target_context`: when and where the pain occurs.
- `proposed_solution`: what the product actually does.
- `product_form`: Skill, CLI, library, web app, GitHub Action, VS Code extension, or SaaS.
- `core_value`: the first valuable outcome.
- `wedge`: first narrow entry point.
- `mvp_direction`: what to build first, not a full roadmap.
- `next_action`: the recommended next hachi-concept-factory step.

# hachi-prd Schema

Use this schema when structured output is requested or when the PRD must become a durable artifact.

```yaml
prd:
  prd_id: "prd-YYYYMMDD-001"
  title: ""
  status: draft | review | approved | deprecated
  source_concept_id: ""
  summary: ""
  background: ""
  problem_statement: ""
  target_users: []
  user_analysis:
    primary_user:
      role: ""
      context: ""
      current_workflow: ""
      technical_level: ""
      constraints: []
      success_condition: ""
      failure_consequence: ""
    secondary_users: []
    stakeholders:
      buyer: ""
      approver: ""
      operator: ""
      maintainer: ""
    user_journey:
      before: ""
      trigger: ""
      during: ""
      after: ""
      repeated_use: ""
  pain_points: []
  goals: []
  non_goals: []
  product_scope:
    product_type: ""
    target_environment: []
    in_scope: []
    out_of_scope: []
  user_stories: []
  use_cases: []
  functional_requirements: []
  non_functional_requirements: []
  input_output: {}
  data_model: []
  workflow: []
  acceptance_criteria: []
  success_metrics: []
  risks: []
  assumptions: []
  open_questions: []
  adr_candidates: []
  output_locale: ""
```

## Readiness Scores

- Problem Clarity
- Target User Clarity
- User Analysis Depth
- Pain Point Specificity
- Use Case Operational Clarity
- MVP Focus
- Requirement Completeness
- Acceptance Testability
- Non-Goal Clarity
- ADR Candidate Coverage
- Implementation Readiness

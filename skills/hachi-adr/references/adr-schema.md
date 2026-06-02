# hachi-adr Schema

Use this schema when structured output is requested or when the ADR must become a durable artifact.

```yaml
adr:
  adr_id: "adr-YYYYMMDD-001"
  title: ""
  status: proposed | accepted | superseded | deprecated | rejected
  date: "YYYY-MM-DD"
  related_prd_id: ""
  related_concept_id: ""
  context: ""
  assumption_ledger:
    assumed: []
    inferred: []
    defaulted: []
    needs_confirmation: []
    conservative_fallback: []
  decision: ""
  rationale: ""
  alternatives_considered:
    - name: ""
      description: ""
      pros: []
      cons: []
      reason_rejected: ""
  consequences:
    positive: []
    negative: []
    operational: []
    future_implications: []
  risks: []
  mitigations: []
  implementation_notes: []
  verification_notes:
    required_tests: []
    acceptance_checks: []
    regression_checks: []
    manual_review_points: []
  follow_up_tasks: []
  related_documents: []
  output_locale: ""
```

## Readiness Scores

- Decision Clarity
- PRD Alignment
- Alternative Coverage
- Consequence Clarity
- Reversibility
- Moat Alignment
- Implementation Usefulness
- Future Traceability
- Assumption Explicitness
- Detail Completeness
- Verification Readiness
- Security and Privacy Coverage
- Local-first and npm/JavaScript Alignment

# hachi-sense SEED Schema

Use this schema when structured output is requested or when a report needs durable SEED records.

```yaml
seed_id: "seed-YYYYMMDD-001"
title: ""
focus_area: ""
source_type: ""
source_name: ""
source_url: ""
observed_at: "YYYY-MM-DD"
period:
  start: "YYYY-MM-DD"
  end: "YYYY-MM-DD"
raw_signal: ""
pain_summary: ""
affected_user: ""
context: ""
current_workaround: ""
emotion:
  - frustration
  - confusion
  - urgency
  - curiosity
  - excitement
frequency_hint: one_off | repeated | rising | unknown
market_hint: ""
competitor_hint: ""
change_hint: ""
evidence:
  - source_url: ""
    quote_or_summary: ""
    observed_at: ""
confidence: low | medium | high
impact_score: 1-5
urgency_score: 1-5
novelty_score: 1-5
repeatability_score: 1-5
monetization_hint: low | medium | high | unknown
next_action: watch | position | merge | discard
notes: ""
```

## Scoring

- Impact: severity of the pain and breadth of affected users.
- Urgency: whether the user needs a near-term solution or is actively blocked.
- Novelty: whether the signal reflects a new technology, new workflow, new constraint, or under-served niche.
- Repeatability: whether the pain appears across multiple users, organizations, sources, or recurring workflows.

Use `high` confidence only when there is clear cross-source support or direct evidence from affected users. Use `medium` for credible but limited evidence. Use `low` for weak, indirect, or single-source signals.

## Next Action Rules

- `position`: score pattern is strong enough to evaluate market, competition, differentiation, and moat.
- `watch`: signal is plausible but lacks repetition, urgency, or clarity.
- `merge`: another SEED covers the same pain more clearly.
- `discard`: outside scope, already solved well, lacks product potential, or conflicts with hachiware-labs strengths.

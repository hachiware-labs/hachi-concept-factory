# hachi-position Schema

Use this schema when structured output is requested or when a report needs durable positioning records.

```yaml
positioning:
  positioning_id: "position-YYYYMMDD-001"
  source_seed_id: ""
  title: ""
  focus_area: ""
  product_hypothesis:
    hypothesis: ""
    target_user: ""
    pain: ""
    proposed_product_category: ""
    job_to_be_done: "When ..., I want to ..., so that ..."
  landscape:
    big_vendor_direction: []
    commercial_alternatives: []
    oss_alternatives: []
    manual_workarounds: []
  differentiation:
    primary_axis: ""
    secondary_axes: []
    weak_axes: []
  moat:
    candidates:
      workflow: ""
      context: ""
      data: ""
      integration: ""
      community: ""
      local_first: ""
      japanese_context: ""
      agentable: ""
    strength: weak | medium | strong
    why_compounds: ""
    why_may_fail: ""
    competitor_copy_path: ""
    big_vendor_absorption_path: ""
    recommended_moat_to_strengthen: ""
  wedge:
    first_user: ""
    first_pain: ""
    workflow_entry_point: ""
    mvp_form: "Skill | CLI | Web UI | GitHub Action | VS Code extension | library"
  scores:
    pain_to_product_fit: 1-5
    differentiation: 1-5
    vendor_risk: 1-5
    oss_competition_risk: 1-5
    wedge_clarity: 1-5
    buildability: 1-5
    moat_score: 1-5
  decision:
    type: promote_to_concept | watch | merge | discard
    reason: ""
    next_step: ""
  output_locale: ""
```

## Scoring Notes

- Pain-to-product fit: high when the pain is repeated, expensive, and clearly owned by a target user.
- Differentiation: high when the wedge is meaningfully different, not just a UI wrapper.
- Vendor risk: high means risk is high. A high score is bad.
- OSS competition risk: high means mature OSS likely covers the wedge. A high score is bad.
- Wedge clarity: high when first user, first pain, and first product form are obvious.
- Buildability: high when a small team can ship a credible MVP quickly.
- Moat score: high when continued use creates workflow, context, data, integration, community, local-first, Japanese-context, or Agentable advantage.

## Decision Rules

- `promote_to_concept`: strong pain, clear wedge, acceptable risk, and a plausible hachiware-labs moat.
- `watch`: plausible but evidence, wedge, or timing is not strong enough.
- `merge`: overlaps with another stronger positioning route.
- `discard`: weak pain, poor fit, excessive vendor/OSS risk, or no practical wedge.

# hachi-position Schema

Use this schema when structured output is requested or when a report needs durable positioning records.

```yaml
positioning:
  positioning_id: "position-YYYYMMDD-001"
  source_seed_id: ""
  source_seed_report: ""
  title: ""
  focus_area: ""
  candidate_selection:
    selection_intent: top | pain | distinctive | solution_gap | safe | risky_but_interesting | coverage | user_specified
    candidate_pool:
      - seed_id: ""
        title: ""
        target_user: ""
        pain: ""
        current_workaround: ""
        existing_solution_gap: ""
        strongest_evidence: ""
        weakest_evidence_gap: ""
        product_hint: ""
        selection_scores:
          user_pain_intensity: 1-5
          pain_ownership: 1-5
          evidence_strength: 1-5
          existing_solution_gap: 1-5
          problem_distinctiveness: 1-5
          wedge_sharpness: 1-5
          hachiware_labs_fit: 1-5
          moat_potential: 1-5
          learning_value: 1-5
          vendor_absorption_risk: 1-5
          oss_competition_risk: 1-5
          risk_adjusted_feasibility: 1-5
        selection_role: primary | secondary | rejected | deferred
        selection_reason: ""
    selected_primary_seed_id: ""
    selected_secondary_seed_ids: []
    rejected_or_deferred_summary: ""
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

## Candidate Selection Notes

- Use candidate selection when the input contains a full hachi-sense report, multiple SEEDs, or the user asks for promising, unusual, distinctive, characteristic, or top candidates.
- `top`: choose the best overall candidate for hachiware-labs productization.
- `pain`: choose candidates with the strongest user pain, urgency, frequency, or failure consequence.
- `distinctive`: choose candidates with unusual pain, non-obvious problem framing, under-served workflows, or stronger differentiation, even if evidence is thinner.
- `solution_gap`: choose candidates where existing vendor, OSS, SaaS, or manual alternatives leave the clearest gap.
- `safe`: choose candidates with stronger evidence and lower vendor / OSS absorption risk.
- `risky_but_interesting`: choose candidates with high upside but major evidence, timing, or absorption risk.
- `coverage`: choose a diverse set across users, pains, workflows, and product forms.
- If the user does not specify a mode, choose one primary candidate and two secondary candidates using `top` plus `coverage`.
- Full positioning should run on the primary candidate unless the user asks for top-N brief evaluations.

## Candidate Selection Attributes

- User pain intensity: how repeated, expensive, urgent, emotionally sharp, or failure-linked the pain is.
- Pain ownership: whether a specific user or buyer owns the pain and can judge success.
- Evidence strength: whether the signal is backed by concrete observations, artifacts, repeated reports, or firsthand notes.
- Existing-solution gap: whether current tools, OSS, vendor features, or manual workarounds leave a meaningful workflow gap.
- Problem distinctiveness: whether the problem is specific, non-obvious, under-served, or framed differently from crowded categories.
- Wedge sharpness: whether a first workflow, input, output, and success moment are imaginable.
- hachiware-labs fit: whether local-first, Skill / CLI / Markdown artifact, Japanese context, PRD / ADR / Wiki handoff, or small-team workflow strengths apply.
- Moat potential: whether repeated use can accumulate workflow, context, rules, examples, evaluation data, or decision history.
- Risk-adjusted feasibility: whether a small team can ship a credible first version without immediate vendor or mature OSS absorption.
- Learning value: whether the candidate would teach useful user, workflow, or market information even if the decision is `watch`.

## Decision Rules

- `promote_to_concept`: strong pain, clear wedge, acceptable risk, and a plausible hachiware-labs moat.
- `watch`: plausible but evidence, wedge, or timing is not strong enough.
- `merge`: overlaps with another stronger positioning route.
- `discard`: weak pain, poor fit, excessive vendor/OSS risk, or no practical wedge.

# hachi-prd ADR Candidates

Extract ADR candidates whenever requirements imply a design decision that should be recorded separately.

## Common ADR Candidate Categories

- Data and storage: Markdown/YAML/JSON/SQLite, directory layout, history format, evidence schema.
- Runtime and distribution: Vercel Skill only, npm CLI, JavaScript/TypeScript, package structure.
- Integration: GitHub, Wiki, PRD/ADR handoff, external trace exports, local files.
- Architecture: parser design, adapter design, schema normalization, extension points.
- Quality and evaluation: golden outputs, fixture tests, scoring, review rubrics.
- Security and privacy: local-first boundaries, redaction, secrets handling, hosted service avoidance.
- Locale and UX: Japanese headings, mixed-language sources, output language behavior.
- Moat: workflow history, context accumulation, artifact reuse, Agentable output.

## ADR Candidate Format

```yaml
adr_candidates:
  - title: ""
    reason: ""
    urgency: high | medium | low
    related_requirements: []
    decision_needed_by: "before_mvp | before_release | later"
```

## Quality Bar

- Do not hide final technology choices inside PRD when alternatives need evaluation.
- Include at least storage/runtime/schema/privacy candidates when the product manipulates local artifacts.
- For npm/JavaScript projects, explicitly call out Node.js, module format, TypeScript, test strategy, and package boundaries when relevant.

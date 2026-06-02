# hachi-adr Assumptions and Verification

## Assumption Defaults

Use these defaults unless the input contradicts them.

```yaml
assumption_handling:
  if_missing_repository_context:
    default: "current repository conventions and npm/JavaScript tooling"
  if_missing_storage_policy:
    default: "local-first Markdown artifacts under factory/"
  if_missing_runtime:
    default: "npm / Node.js / JavaScript, TypeScript if implementation complexity requires types"
  if_missing_security_requirements:
    default: "do not send sensitive traces, PRD inputs, or local artifacts to hosted services unless explicitly requested"
  if_missing_test_strategy:
    default: "fixture-based tests plus golden Markdown output checks"
```

## Assumption Ledger Format

```markdown
## Assumption Ledger

- Assumed:
- Inferred:
- Defaulted:
- Needs confirmation:
- Conservative fallback:
```

## Assumption Ledger Discipline

- Default target size: 5-7 total items across the ledger.
- Full target size for complex ADRs: 8-10 total items.
- Include only assumptions that affect the decision, alternatives, risks, or verification.
- Merge duplicate missing-context items instead of listing every unknown.
- Each `Needs confirmation` item should include a provisional fallback so the ADR can still move forward.
- If the ledger needs more than 10 items, recommend `split_adr` or `return_to_prd`.

## Verification Notes Format

```markdown
## Verification Notes

- Required tests:
- Acceptance checks:
- Regression checks:
- Manual review points:
```

## Verification Quality Bar

- Include at least one test or check tied to each major consequence.
- Include privacy checks when data, traces, logs, files, or hosted services are involved.
- Include locale checks when output text is generated.
- Include rollback or migration checks when storage format or schema changes are involved.

## Verification Notes Discipline

- Keep verification notes focused on consequences of the decision, not the whole product.
- Group checks by required tests, acceptance checks, regression checks, and manual review points.
- Prefer npm / JavaScript commands and fixture-based checks.
- If unrelated verification areas appear, split the ADR or move those checks to the relevant ADR.

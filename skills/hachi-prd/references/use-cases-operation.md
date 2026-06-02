# hachi-prd Use Cases and Operation Image

User stories are not enough. Every important user story must connect to a use case with operation details.

## Use Case Format

```yaml
use_case_id: "UC-001"
title: ""
actor: ""
goal: ""
preconditions: []
input:
  required: []
  optional: []
user_operation:
  - step: ""
    user_action: ""
    system_response: ""
output:
  primary: ""
  secondary: []
next_action: ""
success_state: ""
failure_or_edge_cases: []
acceptance_criteria: []
notes: ""
```

## Operation Detail by Product Form

- Skill: user request, pasted content, referenced files, generated Markdown, saved artifacts, next hachi skill.
- CLI: command, arguments, input files, output files, stdout/stderr, exit code.
- Web UI: screen, form, button, list, validation, empty/loading/error states.
- GitHub Action: trigger, workflow input, generated artifact, PR/issue comment, check status.
- Library: API call, arguments, return value, error behavior, example integration.

## Acceptance Criteria Guidance

Acceptance criteria must be observable. Prefer:

- Given/When/Then statements.
- Specific required sections in output.
- Concrete input/output examples.
- Edge case behavior.
- Locale behavior.
- Privacy and local-first behavior when relevant.

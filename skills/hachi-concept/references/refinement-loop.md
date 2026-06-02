# hachi-concept Refinement Loop

Every non-trivial concept should pass through at least one critique and sharpening pass before the final recommendation.

## Loop

```text
draft concept
  -> critique
  -> sharpen
  -> test against rubric
  -> decide:
       promote_to_prd
       refine
       return_to_position
       split
       watch
       discard
```

## Critique Questions

- Is the target user still too broad?
- Is the first workflow concrete enough?
- Can the signature workflow be described for both first use and repeated use?
- What exact input does the user provide first?
- What exact output do they receive first?
- Where is the activation moment?
- Why would the user not just paste this into a chat prompt?
- Which non-goal most sharply protects the concept?
- Does the moat compound through real artifacts or only through vague usage?
- Is the MVP small enough to try quickly?
- Does the concept need PRD work, more concept refinement, or a return to positioning?

## Required Refinement Fields

For substantial concepts, include:

- Signature Workflow
- Example input
- Example output
- Activation moment
- Sharpest non-goal
- Why this is not just a prompt
- Refinement Log

## Required Output Gate

Before final recommendation, verify these fields are not placeholders:

- `Signature Workflow`: includes first-use steps and repeated-use steps.
- `Example input`: shows the actual thing the user would paste, reference, select, or run.
- `Example output`: shows the concrete artifact, decision, patch, report, PRD section, ADR, issue, or command result returned.
- `Activation moment`: states the moment the user realizes the product is better than the current workaround.
- `Sharpest non-goal`: excludes the most tempting adjacent scope.
- `Why this is not just a prompt`: names the durable workflow, artifact structure, integration, evaluation, or compounding context that makes it product-like.

If any item is vague, keep the decision at `refine`, `watch`, or `discard`. Do not use `promote_to_prd`.

## Disqualification Before PRD

Recommend `refine` or lower instead of `promote_to_prd` when:

- The concept cannot show a realistic first input and first output.
- The activation moment is only "better analysis" rather than an observable user outcome.
- The strongest non-goal would remove the core product if enforced.
- The concept can be replaced by a saved chat prompt with no durable artifact, workflow state, integration, or evaluation loop.
- The MVP requires a broad platform before the first workflow proves value.
- The target user cannot be narrowed to one first adopter and one repeated-use context.

## Refinement Log Format

```markdown
## Refinement Log

### Round 1: Initial Concept
- Draft:
- Weakness:
- Change:

### Round 2: Wedge Sharpening
- Critique:
- Change:

### Final Concept
- Why this version is stronger:
```

## Sharpening Patterns

- Replace broad categories with first workflow language.
- Move internal system benefits behind user-visible value.
- Turn "analysis" into "decision support" or "next artifact".
- Make non-goals sharper than goals.
- Prefer "failed run -> eval case / patch / ADR" over "trace -> insight".
- Preserve useful rejected directions as future concepts or SEEDs.

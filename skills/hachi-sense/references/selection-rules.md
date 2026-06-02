# hachi-sense SEED Selection Rules

Use these rules to prevent broad research reports from becoming noisy SEED lists.

## Output Density

- `quick`: 3-5 SEEDs. Promote at most 2 to `position`.
- `standard`: 5-8 SEEDs. Promote at most 3 to `position`.
- `deep`: 8-12 SEEDs. Promote at most 5 to `position`.

Do not fill the maximum count with weak signals. Fewer strong SEEDs are better than many vague ones.

## Promotion Criteria

Set `next_action: position` only when at least three of these are true:

- The pain is concrete and owned by a clear affected user.
- There is direct evidence from affected users or repeated source support.
- Current workaround is costly, manual, fragile, or disliked.
- The pain connects to a hachiware-labs strength.
- Impact and repeatability are both 4 or higher.
- The SEED can be stated as a product hypothesis without inventing a new market.

## Watch Criteria

Use `watch` when the signal is plausible but:

- Evidence is single-source or indirect.
- The affected user is unclear.
- The timing is interesting but adoption is uncertain.
- The pain may be a temporary hype artifact.

## Merge Criteria

Use `merge` when:

- Two signals share the same affected user and workaround.
- One signal is a narrower example of another.
- A weaker signal only reinforces a stronger SEED.

## Discard Criteria

Use `discard` when:

- The problem is already solved by mature default tooling.
- The pain is too generic, such as "AI is hard".
- The signal is mostly vendor marketing.
- It does not fit hachiware-labs strengths.
- It would require a large platform before proving core value.

## Discarded Signal Notes

For `standard` and `deep`, include a short section:

```markdown
## 破棄・統合したシグナル
- Signal:
- Decision: merge | discard
- Reason:
```

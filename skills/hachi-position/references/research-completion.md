# hachi-position Research Completion

Use this before final scoring and recommendation.

## Depth Targets

`quick`:

- Big vendor check: 1-2 adjacent vendors.
- OSS alternatives: 1-2 likely repositories or frameworks.
- Commercial alternatives: 1-2 tools if obvious.
- Manual workaround: at least 1.

`standard`:

- Big vendor check: at least 3 vendors or platforms.
- OSS alternatives: at least 3 repositories, frameworks, extensions, or relevant docs.
- Commercial alternatives: at least 3 tools or SaaS categories.
- Manual workarounds: at least 2.
- Evidence from source SEED must be preserved.

`deep`:

- Big vendor check: 5+ vendors or platforms.
- OSS alternatives: 5+ repositories/frameworks with maturity notes.
- Commercial alternatives: 5+ tools with category differences.
- Manual workarounds: 3+.
- Include explicit rejected/merged positioning paths.

If the requested depth cannot be met, say so and lower confidence.

## Score Direction

- Pain-to-product fit: higher is better.
- Differentiation: higher is better.
- Vendor risk: higher is worse.
- OSS competition risk: higher is worse.
- Wedge clarity: higher is better.
- Buildability: higher is better.
- Moat score: higher is better.

## Promote to Concept Gate

Use `promote_to_concept` only when:

- Pain-to-product fit is 4+.
- Wedge clarity is 4+.
- Buildability is 3+.
- Differentiation is 3+.
- Vendor risk and OSS competition risk are either acceptable or mitigated by a clear wedge.
- The next hachi-concept input can be written in 3-7 concrete bullets.

Use `watch` if the evidence or wedge is not strong enough. Use `discard` if vendor/OSS risk eliminates the wedge.

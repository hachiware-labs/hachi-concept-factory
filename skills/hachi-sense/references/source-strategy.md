# hachi-sense Source Strategy

Choose sources based on the focus area and requested depth.

## Default Source Mix

For a standard run, prefer:

- User-provided notes or URLs
- GitHub Issues and Discussions
- Official release notes and documentation
- Technical blogs and community posts
- Product directories or reviews
- Hacker News, Reddit, X, or Hatena Bookmark when accessible

## Source Types

Developer pain:

- GitHub Issues
- GitHub Discussions
- Stack Overflow
- OSS docs, examples, release notes
- Discord or Slack exports if the user provides them

Product and market:

- Product Hunt
- GitHub Trending
- Show HN / Launch HN
- Chrome Web Store / VS Code Marketplace
- App stores
- G2 / Capterra

Demand and change:

- Google Trends and search suggestions
- Jobs and hiring pages
- Conference topics
- Vendor release notes
- Standards, regulation, or pricing changes
- arXiv and Papers with Code

## Evidence Handling

- Record `source_url`, `source_name`, `source_type`, and `observed_at`.
- Prefer summaries over long quotes.
- Keep exact quotes short and only when the wording itself matters.
- If browsing is incomplete or a source is inaccessible, say so in the report and lower confidence.

## Depth

- `quick`: 3-5 SEEDs, few sources, explicit uncertainty.
- `standard`: up to 10 SEEDs, multiple source types, scoring and next actions.
- `deep`: broader source coverage, stronger clustering, more explicit discarded/merged signals.

## Source Count Targets

- `quick`: 2-4 sources across at least 2 source types.
- `standard`: 5-8 sources across at least 3 source types.
- `deep`: 9-15 sources across at least 4 source types.

If these targets cannot be met, state the gap and lower confidence. Do not pretend the run is stronger than the evidence.

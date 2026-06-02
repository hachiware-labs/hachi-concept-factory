# Mini Example: hachi-adr ADR

```markdown
# ADR: Store generated factory artifacts as local Markdown

## 1. メタデータ
- ADR ID: adr-YYYYMMDD-001
- Status: proposed
- Related PRD: prd-YYYYMMDD-001

## 2. 背景
The PRD requires generated SEED, Concept, PRD, and ADR artifacts to be reusable by humans and agents without a hosted viewer.

## 3. 前提台帳
- 仮定: The repository uses npm / JavaScript tooling.
- 推測: Human review and future agent handoff are more important than complex querying for MVP.
- デフォルト採用: Store durable artifacts under `factory/`.
- 確認が必要: Whether YAML frontmatter is required in every generated artifact.
- 安全側の代替: If Markdown becomes hard to parse, add structured frontmatter before introducing a database.

## 4. 決定
Store generated factory artifacts as local Markdown files under stage-specific `factory/` directories.

Non-decision scope: this ADR does not choose the CLI package structure, schema validator, or hosted sync behavior.

## 5. 理由
Markdown is readable, diffable, local-first, and easy for future agents to consume. It supports hachiware-labs strengths around lightweight Skill / OSS distribution and PRD / ADR handoff.

## 6. 検討した代替案
### JSON only
- 利点: easier machine parsing
- 欠点: worse human review and less natural long-form rationale
- 却下理由: the PRD values human-agent shared review for MVP

### SQLite
- 利点: stronger querying and indexing
- 欠点: heavier migration, less transparent diffs, more implementation work
- 却下理由: too heavy before artifact workflow proves value

### Hosted records
- 利点: easier multi-device sync
- 欠点: privacy and local-first risk
- 却下理由: contradicts default no-hosted-transfer boundary

## 7. 結果
- Positive: artifacts are readable, portable, and easy to review in Git.
- Negative: structured queries are limited.
- Operational: file naming and heading stability matter.
- Future implications: frontmatter can be added without abandoning Markdown.

## 10. 実装メモ
- Affected paths: `factory/seeds/`, `factory/concepts/`, `factory/prds/`, `factory/adrs/`
- Use stable filenames: `YYYY-MM-DD_slug.md`
- Keep stable IDs inside the document body or frontmatter.
- Redact secrets before writing logs or traces.

## 11. 検証メモ
- 必須テスト: npm validation checks generated artifact path and required headings.
- 受け入れ確認: humans can read the artifact without a custom viewer.
- 回帰確認: Japanese headings remain localized while stable IDs remain unchanged.
- 手動レビュー観点: confirm no sensitive pasted trace is written unexpectedly.

## 14. ADR判断
Decision: accept_adr
```

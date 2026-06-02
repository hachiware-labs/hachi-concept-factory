# Mini Example: hachi-concept Concept Brief

```markdown
# hachi-concept コンセプトブリーフ

## 1. 対象範囲
- 入力: positioning report for local agent memory lint
- モード: refine
- 出力ロケール: ja-JP

## 2. コンセプト概要
- タイトル: Memory Garden Lint
- 一言説明: agent memoryを古い事実、矛盾、privacy riskの観点でレビューするlocal-first Skill。
- タグライン: Keep agent memory useful without letting it rot.
- 対象ユーザー: long-running agentを運用する開発者。
- 提供形態: Vercel Skill first, CLI later.

## 3. 課題と文脈
agent memoryは継続性を改善するが、蓄積後にどのentryが危険か分からず、future runへ悪い前提を渡してしまう。

## 4. シグネチャーワークフローと体験
- シグネチャーワークフロー: memory exportとproject notesを読み、entryをfact / assumption / decision / stale / contradiction / privacy riskに分類し、修正候補をMarkdownで返す。
- 初回利用体験: ユーザーがmemory exportを貼ると、5分以内に危険entry top 5と削除/修正案を受け取る。
- 継続利用体験: 3回目以降は過去のrejected entriesとmemory policyが蓄積し、project固有のlint基準が安定する。
- 入力例: `memory.yaml`, recent run summary, project ADR links.
- 出力例: memory-risk-report.md with risky entries, suggested policy patch, ADR candidate.
- 価値を実感する瞬間: 古い意思決定を参照しているentryが指摘され、次run前に削除できる。
- 最も鋭い非目標: memory storageそのものは作らない。
- 単なるプロンプトではない理由: local artifacts, repeat review history, policy patch, and ADR handoff compound over time.

## 5. 提案コンセプト
The Skill reviews exported memory and local project context, then produces a durable memory risk report and policy patch.

## 6. 差別化
It does not compete with memory stores. It reviews memory hygiene and connects findings to Wiki and ADR artifacts.

## 7. Moat
Workflow and context moat compound through project-specific policy, rejected entries, and recurring review history.

## 8. WedgeとMVP方向性
Start with one local project and Markdown/YAML memory exports.

## 9. 根拠とソーストレース
Source SEED and positioning notes.

## 10. 洗練ログ
### Round 1: Initial Concept
- Draft: Review agent memory for risky entries.
- Weakness: Too close to a prompt over pasted notes.
- Change: Require structured local report, policy patch, and ADR candidate.

### Final Concept
- Why this version is stronger: It creates durable project policy, not a one-off summary.

## 11. リスクと前提
- リスク: memory formats vary.
- 前提: users can export or paste memory entries.

## 12. PRD準備度
High. Required experience fields are concrete enough for PRD use cases.

## 13. 推奨判断
Decision: promote_to_prd
Next step: Write an MVP PRD for local memory linting.
```

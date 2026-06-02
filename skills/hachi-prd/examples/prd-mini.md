# Mini Example: hachi-prd PRD

```markdown
# PRD: Agent Trace Lens MVP

## 1. メタデータ
- PRD ID: prd-YYYYMMDD-001
- Status: draft
- Source Concept: concept-YYYYMMDD-001
- Density: mvp

## 2. 要約
Failed multi-agent runを、eval case、workflow patch、ADR候補へ変換するSkillを定義する。

## 5. 対象ユーザー
- Primary user: multi-agent workflowを運用する開発者
- Reader: future implementation agent and reviewer
- Maintainer: hachiware-labs skill maintainer

## 6. ユーザー分析
### Primary User
- 役割: multi-agent workflowを運用する開発者
- 文脈: 失敗runのtraceはあるが、再発防止策へ落とせていない
- 現在のワークフロー: trace UIを見て、手作業で原因メモと修正案を書く
- 技術レベル: advanced developer
- 制約: logs may include sensitive local paths or prompts
- 成功条件: 次に追加するeval caseと直すhandoff contractが分かる
- 失敗時の影響: 同じhandoff failureが再発する

## 7. ペインポイント
### Pain 1: traceはあるが次の修正に変換できない
- Situation: failed run after tool-call or agent handoff
- Trigger: agent returns wrong artifact, misses a constraint, or loops
- Current workaround: trace UI and manual notes
- Why existing alternatives fail: observability tools show events but not the next agent-ready artifact
- Frequency: weekly in active multi-agent work
- Severity: high
- Emotional tone: frustration
- Business / workflow impact: repeated review and regression cost
- Willingness to pay or adopt: medium for local-first developer tooling
- Evidence: source concept and run notes

## 12. ユースケースと操作イメージ
### UC-001: failed runをレビューする
- 実行者: developer
- Goal: failed runからeval caseとworkflow patchを得る
- Preconditions: user has pasted run log and expected behavior
- 入力: pasted run log, expected behavior, relevant file path
- ユーザー操作: Skillにログを貼り、期待結果を指定する
- システム反応: failure hypotheses, eval case, workflow patch, ADR candidateを返す
- 出力: Markdown review report
- 次アクション: eval caseを追加し、handoff contractを修正する
- Success state: 再発防止に必要な最小patchが分かる
- Failure or edge cases: empty log, sensitive secret-like token, mixed Japanese/English trace
- 受け入れ基準: 出力に3つ以内の失敗原因候補、1つ以上のeval case、1つ以上のworkflow patchが含まれる

## 13. 機能要件
- FR-001: pasted run logを観察事実、推測、判断に分ける
- FR-002: 失敗原因候補を最大3つに絞る
- FR-003: eval case案を1つ以上生成する
- FR-004: workflow patchまたはhandoff contract patchを生成する
- FR-005: ADR候補を必要時に抽出する

## 18. 受け入れ基準
- Given a failed run log, when the Skill runs, then it returns failure hypotheses, eval case, and workflow patch.
- Given a secret-like token, when the Skill summarizes logs, then it redacts or flags the token.
- Given mixed Japanese/English logs, when the Skill outputs in Japanese, then headings and explanations are Japanese while stable IDs remain unchanged.

## 19. 要件トレーサビリティ
| Requirement | Source pain / use case / concept constraint | Acceptance check |
|---|---|---|
| FR-001 | Pain 1 / UC-001 | fact, inference, judgment are separated |
| FR-003 | UC-001 | output includes at least one eval case |
| FR-005 | hachi-concept handoff | ADR candidate includes decision boundary |

## 24. ADR候補
- Title: Trace input schema decision
  - Reason: affects parsing, fixtures, privacy checks, and future CLI compatibility
  - Urgency: high
  - Decision needed by: before_mvp

## 25. 準備度判断
Decision: promote_to_adr
Reason: user, pain, use case, requirements, acceptance checks, and ADR boundary are concrete.
```

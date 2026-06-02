# Mini Example: hachi-position Report

```markdown
# hachi-position レポート

## 1. 対象範囲
- 入力SEED: seed-YYYYMMDD-001
- 注目領域: agent memory audit
- 期間: last_30_days
- ソース: Source SEED, GitHub Issues, official docs
- 出力ロケール: ja-JP

## 2. 製品仮説
### 仮説
local-first Skillがagent memoryをlintし、古い事実、矛盾、privacy-sensitive entryをfuture runの前に検出する。

### 対象ユーザー
long-running agentまたはmulti-session agentを運用する開発者。

### 課題
memoryは継続性を改善するが、蓄積後に信頼できるか判断しにくい。

### 想定製品カテゴリ
Local-first agent memory lint and review Skill.

### Job-to-be-Done
When my agent memory grows across sessions, I want to review risky entries, so that future agent runs do not inherit bad context.

## 3. 市場・ベンダー環境
### 大手ベンダーの動向
Vendors are adding memory and durable execution. Generic memory management has medium absorption risk.

### 商用代替
Observability and eval platforms can show traces but do not usually own local project memory policy.

### OSS代替
Memory stores and agent frameworks provide storage mechanisms, but policy review remains uneven.

### 手作業での回避策
Manual pruning, project notes, summaries, and ad hoc scripts.

## 4. 差別化分析
Strongest wedge: memory storageではなく、local policy lintingをWiki/ADRに接続する。

## 5. Moat分析
Workflow moat and context moat compound as rejected entries and project-specific memory rules accumulate.

## 6. ポジショニング案
1. Local memory linter for individual developers.
2. Team memory review workflow for regulated projects.

## 7. 推奨判断
Decision: promote_to_concept
Reason: pain-to-product fit and wedge clarity are high enough, while vendor risk is mitigated by local-first policy review.

## 8. スコア
- Pain-to-product fit: 4
- Differentiation: 4
- Vendor risk: 3
- OSS competition risk: 2
- Wedge clarity: 4
- Buildability: 4
- Moat score: 4

## 9. 調査ギャップと判断変更条件
- 調査ギャップ: commercial memory governance tools should be checked in a standard-depth run.
- 判断変更条件: discard if a major vendor ships local project memory policy review with portable artifacts.

## 10. 次のステップ
Create a hachi-concept Concept Brief with first input, first output, activation moment, and not-a-prompt rationale.
```

# Mini Example: hachi-position Report

```markdown
# hachi-position レポート

## 1. 対象範囲
- 入力SEED: seed-YYYYMMDD-001
- 入力課題の種レポート: factory/seeds/example.md
- 注目領域: agent memory audit
- 期間: last_30_days
- ソース: Source SEED, GitHub Issues, official docs
- 出力ロケール: ja-JP

## 2. 候補選抜
### 選抜方針
`top` + `coverage`。ユーザーペインの強さ、既存解決の不足、課題の独自性、最初の切り口、hachiware-labsとの相性を重視した。

### 候補一覧
| SEED | ペイン強度 | 既存解決ギャップ | 独自性 | hachiware-labs適合 | 役割 |
|---|---:|---:|---:|---:|---|
| seed-YYYYMMDD-001 | 4 | 4 | 4 | 5 | primary |
| seed-YYYYMMDD-002 | 5 | 3 | 3 | 4 | secondary |
| seed-YYYYMMDD-003 | 3 | 5 | 5 | 4 | secondary |

### 選抜した候補
seed-YYYYMMDD-001を主候補にする。痛みが繰り返され、既存ツールがstorageやtraceに寄りがちで、local policy lintingという切り口に未解決領域がある。

### 却下または保留した候補
seed-YYYYMMDD-002は痛みは強いが、既存SaaS吸収リスクが高いため保留。seed-YYYYMMDD-003は独自性は高いが、ユーザーの支払い動機がまだ弱い。

## 3. 製品仮説
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

## 4. 市場・ベンダー環境
### 大手ベンダーの動向
Vendors are adding memory and durable execution. Generic memory management has medium absorption risk.

### 商用代替
Observability and eval platforms can show traces but do not usually own local project memory policy.

### OSS代替
Memory stores and agent frameworks provide storage mechanisms, but policy review remains uneven.

### 手作業での回避策
Manual pruning, project notes, summaries, and ad hoc scripts.

## 5. 差別化分析
Strongest wedge: memory storageではなく、local policy lintingをWiki/ADRに接続する。

## 6. 守りの強さの分析
Workflow moat and context moat compound as rejected entries and project-specific memory rules accumulate.

## 7. ポジショニング案
1. Local memory linter for individual developers.
2. Team memory review workflow for regulated projects.

## 8. 推奨判断
Decision: promote_to_concept
Reason: pain-to-product fit and wedge clarity are high enough, while vendor risk is mitigated by local-first policy review.

## 9. スコア
- Pain-to-product fit: 4
- Differentiation: 4
- Vendor risk: 3
- OSS competition risk: 2
- Wedge clarity: 4
- Buildability: 4
- Moat score: 4

## 10. 調査ギャップと判断変更条件
- 調査ギャップ: commercial memory governance tools should be checked in a standard-depth run.
- 判断変更条件: discard if a major vendor ships local project memory policy review with portable artifacts.

## 11. 次のステップ
Create a hachi-concept Concept Brief with first input, first output, activation moment, and not-a-prompt rationale.
```

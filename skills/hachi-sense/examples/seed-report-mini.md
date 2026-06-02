# Mini Example: hachi-sense SEED Report

```markdown
# hachi-sense SEEDレポート

## 対象範囲
- 注目領域: local-first agent memory
- 期間: last_30_days
- ソース: GitHub Issues, release notes, user notes
- 深さ: quick
- 出力ロケール: ja-JP

## 要約

開発者はagent memoryの継続性を求めているが、古い事実、矛盾、privacy leakage、retrievalの説明不能性に不安を持っている。

## シグナル整理
- 観察された事実: 複数のメモとIssueで、memory persistence、retrieval quality、privacyが繰り返し言及されている。
- 推測: 単なるvector storageではなく、policy、lifecycle、auditが必要になっている。
- 判断: local-firstな開発者向けmemory lintingは hachiware-labs に合う。

## SEED候補

### SEED 1: Agent memoryが古くなり監査しにくい
- Seed ID: seed-YYYYMMDD-001
- 課題: 長期運用agentが古いcontextや矛盾した前提を再利用する。
- 影響を受けるユーザー: multi-session agentを運用する開発者。
- 根拠:
  - Source URL: user note or issue summary.
- 現在の回避策: 手動summary、vector DB pruning、project notes。
- スコア: impact=4, urgency=3, novelty=3, repeatability=4
- 確度: medium
- hachiware-labs fit: local-first memory linting can connect to Wiki and ADR.
- Product hint: memoryを保存するのではなく、memory policyと危険なentryをレビューするSkill。
- 次アクション: position

## 推奨される次のステップ

このSEEDを hachi-position に進め、memory store、trace tool、local knowledge-base workflowと比較する。

## 根拠ギャップと引き継ぎ事項
- 根拠ギャップ: direct user evidenceは限定的。commercial alternative coverageは未確認。
- 引き継ぎ事項: hachi-positionでは、vendor memory機能への吸収リスクとOSS memory frameworkで解けないaudit painを確認する。
```

# hachi-concept-factory 実運用ゲートテスト: Agent Trace Lens

## 1. 対象範囲

- テスト日: 2026-06-02
- テーマ: Agent Trace Lens
- 入力成果物:
  - `factory/seeds/2026-06-01_multi-agent-small-company.md`
  - `factory/positioning/2026-06-01_agent-trace-lens.md`
  - `factory/concepts/2026-06-01_agent-trace-lens.md`
- 今回追加した成果物:
  - `factory/prds/2026-06-02_agent-trace-lens-mvp.md`
  - `factory/adrs/2026-06-02_agent-trace-lens-run-review-schema.md`
- 出力ロケール: ja-JP

## 2. 実行サマリー

既存の `SEED -> Positioning -> Concept` は、PRDへ進めるだけの具体性があった。今回、`hachi-prd` の実装準備ゲートに沿ってMVP PRDを作成し、`hachi-adr` のacceptance gateに沿って最初のADRを1本に絞った。

結論:

- `hachi-sense`: pass
- `hachi-position`: pass
- `hachi-concept`: pass
- `hachi-prd`: pass
- `hachi-adr`: pass

## 3. パイプライン検証

| Stage | 入力 | 出力 | 判断 | 評価 |
|---|---|---|---|---|
| hachi-sense | multi-agent / small company research | SEED report | `position` for seed-20260601-001 | pass |
| hachi-position | seed-20260601-001 | Agent Trace Lens positioning | `promote_to_concept` | pass |
| hachi-concept | positioning report | Agent Trace Lens Concept Brief | `promote_to_prd` | pass |
| hachi-prd | Concept Brief | Agent Trace Lens MVP PRD | `promote_to_adr` | pass |
| hachi-adr | PRD ADR candidate | run review schema ADR | `accept_adr` | pass |

## 4. 良かった点

- `hachi-sense` は、multi-agentの広い話題から「失敗原因が3ホップ前に埋もれる」という具体的な痛みを抽出できていた。
- `hachi-position` は、trace collection / dashboard競争を避け、local run-review and documentation handoffへWedgeを絞れていた。
- `hachi-concept` は、example input/output、activation moment、sharpest non-goal、not-a-prompt rationaleがあり、PRDへ進めやすかった。
- `hachi-prd` は、user analysis、pain points、operation-image use cases、edge cases、requirement traceabilityを定義できた。
- `hachi-adr` は、storage / redaction / vendor adapter / CLI structureを混ぜず、内部schemaの1判断に絞れた。

## 5. bad caseゲート検証

### Case A: 広すぎるConcept

入力:

```text
Agent observabilityを全部まとめるdashboardを作りたい。
trace、eval、monitoring、alert、root cause analysis、PR作成まで全部やる。
```

期待されるSkill判断:

- hachi-concept: `refine` または `discard`
- 理由: dashboard-like conceptであり、first input/output、activation moment、sharpest non-goal、not-a-prompt rationaleが弱い

結果:

- 現行 `experience-gates.md` なら、dashboard-like conceptは「ユーザーが出力を見て何を決めるか」を要求する。
- Agent Trace Lens Conceptでは、trace dashboardを非目標にしており、`failed run -> eval case / workflow patch / ADR candidate` に絞れている。
- 判定: pass

### Case B: vendor吸収リスクの高いPositioning

入力:

```text
OpenAI Agents SDKのtrace UIより見やすいtrace UIを作る。
```

期待されるSkill判断:

- hachi-position: `watch` または `discard`
- 理由: big vendor / observability vendorが吸収しやすく、Wedgeが弱い

結果:

- 現行Positioningでは「trace collectionやUIでは勝たない」と明示している。
- Vendor riskは4と高く評価しつつ、local run-review and documentation handoffならpromotion可能としている。
- 判定: pass

### Case C: 薄いPRD

入力:

```text
Agent Trace Lensはログを読んで原因を教える。要件はログ入力、原因出力、保存。
```

期待されるSkill判断:

- hachi-prd: `refine_prd`
- 理由: user analysis、pain point、operation image、acceptance criteria、requirement traceabilityが不足

結果:

- 今回作成したPRDは、3つのpain point、3つのuse case、FR/NFR、edge cases、traceability、ADR candidatesを含む。
- 現行 `implementation-readiness.md` なら、薄い入力だけでは `promote_to_adr` できない。
- 判定: pass

### Case D: 混ざったADR

入力:

```text
Agent Trace LensはMarkdownに保存し、JSON schemaを決め、secretをredactし、LangSmith adapterを作る。
```

期待されるSkill判断:

- hachi-adr: `split_adr`
- 理由: storage、schema、privacy、vendor adapterが独立判断として混ざっている

結果:

- 今回作成したADRは、内部 `run_review` schemaの1判断だけに絞った。
- storage、secret redaction、vendor adapter、CLI structureはNon-decision scopeとFollow-up Tasksに分離した。
- 判定: pass

## 6. 残った改善余地

- `hachi-prd` のPRDはMVP densityでも長くなりやすい。今後はPRD mini / standard / fullの出力例をもう1段増やしてもよい。
- `hachi-adr` は良いが、schema skeletonの具体性が高いため、実装タスクへ寄りすぎないレビューが必要。
- bad caseは文書上の検証であり、将来はfixtureとしてvalidatorやgolden outputに近づけたい。

## 7. 次アクション

1. `factory/adrs/2026-06-02_agent-trace-lens-run-review-schema.md` を起点に、storage path ADRとsecret redaction ADRを追加する。
2. Agent Trace Lens専用Skillを作るなら、`run_review` schema fixtureを2件用意する。
3. `hachi-concept-factory` のREADMEに、実運用サンプルとしてこのAgent Trace Lens flowへのリンクを追加する。

## 8. 最終判断

この1周では、5つのSkillの品質ゲートは期待どおり機能した。

特に重要だったのは、以下の4点である。

- 広すぎるdashboard案をConcept側で絞れる
- vendor absorption riskをPositioning側で正しく扱える
- PRD側でoperation imageとtraceabilityまで落とせる
- ADR側で複数判断を混ぜず1 decisionに絞れる

Decision: pass

# ADR: Agent Trace Lens MVPの内部run review schemaを定義する

## 1. メタデータ

- ADR ID: adr-20260602-001
- Status: proposed
- Date: 2026-06-02
- Related PRD: `prd-20260602-001`
- Related Concept: `concept-20260601-001`
- Output locale: ja-JP

## 2. 背景

Agent Trace Lens MVPは、Markdown run logとgeneric JSON traceを入力として受け取り、failure hypotheses、eval cases、workflow patches、ADR candidatesへ変換する。

MVP前に必要な設計判断は、入力形式ごとの差異をどう正規化するかである。ここでschemaを決めないと、各出力がlog summaryに寄り、PRDで求める「再発防止artifact」へ安定して変換できない。

関連要件:

- FR-001: Markdown run logを入力として受け取れる
- FR-002: Generic JSON traceを入力として受け取れる
- FR-004: 観察事実、推測、判断を分けて出力する
- FR-005: logをagent / handoff / state / tool / guardrail / human approvalの観点で分類する
- FR-006: 失敗原因候補を最大3つに絞る
- FR-008: eval case候補を1つ以上出す
- FR-010: ADR candidateを必要時に出す

## 3. 前提台帳

- Assumed: MVPはVercel Skill firstであり、後続でnpm CLI化できる構造を保つ。
- Inferred: ユーザーは最初から完全なvendor trace exportを持たず、Markdown logやcopied span treeを貼ることが多い。
- Defaulted: npm / Node.js / JavaScript toolingを前提に、JSONとして扱いやすい中間schemaを採用する。
- Needs confirmation: vendor-specific adapterをいつ追加するかは未決。MVPではgeneric schemaに寄せる。
- Conservative fallback: trace JSON parseに失敗した場合は、Markdown/log observationとして扱い、parse gapを記録する。

## 4. 決定

Agent Trace Lens MVPは、入力形式に関わらず `run_review` 中間schemaへ正規化してから、failure hypotheses、eval cases、workflow patches、ADR candidatesを生成する。

Non-decision scope:

- このADRではartifact保存pathを決めない。
- このADRではsecret redaction policyを決めない。
- このADRではvendor-specific trace adapter実装を決めない。
- このADRではCLI package structureを決めない。

## 5. 理由

Markdown run logとJSON traceを直接それぞれ処理すると、出力が入力形式に引きずられる。`run_review` schemaへ正規化すれば、MVPの価値である「failed run -> eval case / workflow patch / ADR candidate」を安定して出せる。

特に、PRDが要求する `agent / handoff / state / tool / guardrail / human approval` の観点をschema上に持つことで、単なる時系列要約ではなく、Agent workflowの設計改善へ接続できる。

## 6. 検討した代替案

### Option A: Markdownだけで処理する

- Pros:
  - MVPが最も軽い
  - human-readable
  - Skillだけで始めやすい
- Cons:
  - CLI化やfixture testが弱い
  - trace JSON入力との対応が曖昧
  - eval / patch / ADR candidate生成の安定性が低い
- Reason rejected:
  - PRDはMarkdown logとgeneric JSON traceの両方を扱うため、Markdownだけでは将来の実装・検証が弱い。

### Option B: vendor-specific trace schemaを最初から採用する

- Pros:
  - LangSmithやOpenAI Agents SDKなど特定traceでは精度を上げやすい
  - 実データのfieldをそのまま使える
- Cons:
  - vendor lock-inが強い
  - MVP scopeが膨らむ
  - other trace sourceや手書きlogへの対応が弱い
- Reason rejected:
  - hachi-positionで確認した通り、trace collection / vendor dashboard競争は吸収リスクが高い。MVPはvendor-neutralなrun reviewに絞る。

### Option C: SQLiteなど永続DB schemaを最初に作る

- Pros:
  - 履歴検索やfailure pattern catalogに拡張しやすい
  - repeated-use moatを作りやすい
- Cons:
  - MVPに対して重い
  - local Markdown handoffの単純さが失われる
  - storage decisionとschema decisionが混ざる
- Reason rejected:
  - 履歴DBは将来価値だが、MVP前の判断としては過剰。保存方式は別ADRに分ける。

## 7. 結果

### Positive

- Markdown logとJSON traceを同じ出力pipelineに乗せられる
- fixture-based testsを作りやすい
- failure hypothesis、eval case、workflow patch、ADR candidateの関係が追いやすい
- future CLI化に備えられる

### Negative

- 最初にschema設計の手間が増える
- 入力をschemaへ正規化する段階で情報を落とすリスクがある
- vendor-specificなrich metadataはMVPでは一部使い切れない

### Operational

- schema fieldの命名とrequired/optionalの線引きが重要
- malformed input時のfallback behaviorを実装・テストする必要がある
- privacy warningやredaction policyとは接点があるが、別ADRの判断を待つ

### Future implications

- vendor adapterは `raw_input -> run_review` 変換として追加できる
- future failure pattern catalogは `run_review.failure_hypotheses` を蓄積対象にできる
- artifact保存ADRと組み合わせれば、Markdown artifact内にschema blockを含められる

## 8. リスク

- Schemaが抽象的すぎて、実際のtraceを十分に表現できない
- Schemaが細かすぎて、Skill実行時の出力が重くなる
- privacy-sensitiveなraw valuesをschemaに残しすぎる
- ADR candidate生成がschemaに引きずられて実装詳細化する

## 9. 緩和策

- MVP schemaはrequired fieldsを少なくし、raw excerptはsummary中心にする
- `observed_facts`, `inferences`, `judgments` を分けて、断定を避ける
- sensitive raw valuesは別ADRのredaction policyに従い、schema上ではplaceholder化できるようにする
- vendor adapterはMVPではfuture scopeにし、generic mappingから始める
- schema fixtureを2件以上作る: Markdown log fixtureとmalformed JSON fallback fixture

## 10. 実装メモ

影響する想定ファイル:

- `factory/prds/2026-06-02_agent-trace-lens-mvp.md`
- future: `skills/agent-trace-lens/references/run-review-schema.md`
- future: `skills/agent-trace-lens/examples/run-review-mini.md`
- future: `scripts/validate-run-review.mjs`

採用schema skeleton:

```yaml
run_review:
  review_id: "run-review-YYYYMMDD-001"
  source:
    input_type: markdown_log | json_trace | mixed
    parser_status: parsed | partial | fallback
  expected_behavior: ""
  observations:
    agent: []
    handoff: []
    state: []
    tool: []
    guardrail: []
    human_approval: []
  failure_hypotheses:
    - id: "FH-001"
      summary: ""
      evidence: []
      confidence: low | medium | high
  eval_cases: []
  workflow_patches: []
  adr_candidates: []
  privacy_warnings: []
  gaps: []
```

Edge cases:

- Empty log: return gap and `refine_prd` or low-confidence review behavior
- Missing expected behavior: lower confidence and ask for expected behavior in open questions
- Malformed JSON: fallback to text interpretation
- Secret-like token: add privacy warning and avoid repeating full value
- Mixed Japanese/English: output headings follow requested locale

## 11. 検証メモ

- Required tests:
  - Markdown fixture maps to `observations.handoff`, `failure_hypotheses`, `eval_cases`
  - Malformed JSON fixture sets `parser_status: fallback`
  - Missing expected behavior produces a gap and lower confidence
- Acceptance checks:
  - AC-001, AC-002, AC-004, AC-007 from PRD are covered
  - At least one eval case is produced for the sample missing customer ID handoff
- Regression checks:
  - stable IDs such as `FH-001` and `EVAL-001` remain stable
  - Japanese headings remain localized
- Manual review points:
  - reviewer confirms failure hypotheses are not overclaimed as final root cause
  - reviewer confirms ADR candidates remain decision boundaries, not implementation tasks

## 12. フォローアップタスク

- Create a separate ADR for local Markdown artifact path and naming.
- Create a separate ADR for secret flag/redaction behavior.
- Add two run review fixtures before implementation.
- Decide whether `eval_cases` should include YAML block, Markdown Given/When/Then, or both.

## 13. 関連文書

- `factory/prds/2026-06-02_agent-trace-lens-mvp.md`
- `factory/concepts/2026-06-01_agent-trace-lens.md`
- `factory/positioning/2026-06-01_agent-trace-lens.md`
- `factory/seeds/2026-06-01_multi-agent-small-company.md`

## 14. ADR判断

Decision: accept_adr

Reason:

- 1つの判断、すなわちMVP内部schemaの採用に絞れている
- storage、redaction、vendor adapter、CLI structureは非決定範囲へ分離した
- PRD要件と受け入れ基準に直接接続している
- 代替案と却下理由が明確
- 実装者がfixtureとschema skeletonから初期実装へ進める

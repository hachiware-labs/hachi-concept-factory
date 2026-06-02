# hachi-concept コンセプトブリーフ

## 1. 対象範囲

- 入力: `factory/positioning/2026-06-01_agent-trace-lens.md`
- モード: refine
- 出力ロケール: ja-JP
- 入力SEED: `seed-20260601-001`
- 入力ポジショニング: `agent-trace-lens`, 判断 `promote_to_concept`
- コンセプトID: concept-20260601-001

## 2. コンセプト概要

- タイトル: Agent Trace Lens
- 一言説明: Failed multi-agent runを、再発防止のためのeval case、workflow patch、ADR候補へ変換するローカルrun-review Skill。
- タグライン: 失敗runを、次の修正判断に変える。
- 対象ユーザー: multi-agent workflowを運用する個人開発者、小規模チーム、AI導入支援者。
- 提供形態: Vercel Skill first, npm CLI later.

## 3. 課題と文脈

Multi-agent workflowは、失敗時に「何が起きたか」はtraceやログで見えることが増えている。一方で、「なぜ失敗したか」「どのhandoffやstate changeが怪しいか」「次に何を直すべきか」までは人間が読み解く必要がある。

この痛みは、以下のような場面で強く出る。

- LangGraph / AutoGen / CrewAI / OpenAI Agents SDK / custom loopで複数Agentを連携させている。
- trace UIにはspan、tool call、handoff、LLM callが並ぶが、root cause候補が整理されていない。
- 失敗原因のメモがSlack、Notion、GitHub Issue、手元メモに散らばる。
- 同じ失敗が再発しても、過去のrun review、ADR、eval caseに接続されていない。
- 顧客データや業務ログを外部SaaSに送れないため、ローカルでレビューしたい。

現在の代替手段は、LangSmith、Langfuse、Phoenix、Braintrustなどのobservability platform、OpenTelemetry / OpenInference、手書きログ、LLMへのログ貼り付け、独自run review checklistである。これらはtrace収集や可視化には強いが、hachiware-labsが狙うのは「traceを改善文書へ変換する」部分である。

## 4. 提案コンセプト

Agent Trace Lensは、multi-agent runのtraceやログを入力し、Agentの失敗をレビュー可能な改善ブリーフへ変換するSkillである。価値の中心は「traceを読む」ことではなく、「再発防止に必要な次のartifactを作る」ことに置く。

最初の入力:

- exported trace JSON
- markdown run log
- copied span tree
- GitHub Issueに貼られた失敗ログ
- agent workflowの簡単な説明

最初の出力:

- failure hypothesis list
- suggested eval cases
- workflow patch notes
- ADR candidates
- suspicious handoff / state / memory / tool-call points
- missing context and approval gaps
- optional SEED candidates

Agent Trace Lensは、trace collection platformではない。LangSmithやLangfuseのようなdashboardを作るのではなく、それらのtraceや手元ログを材料にして、次の改善行動へ変換する。

シグネチャーワークフロー:

1. ユーザーが失敗したrun log、trace JSON、またはspan treeを貼る。
2. 任意で「このrunで期待していた結果」を1-3行で書く。
3. Skillがログを `agent / handoff / state / tool / guardrail / human approval` に分けて読む。
4. 3つ以内の失敗原因候補、次に追加すべきeval case、workflow patch、ADR候補を返す。
5. ユーザーはそのままGitHub Issue、PRD、ADR、または次回runの検証項目へ移せる。
6. 次回以降は、過去のrun reviewやADR候補と照合し、同じ失敗の再発か、新しいfailure patternかを判断する。

入力例:

```markdown
Expected:
The planner should pass a validated customer ID to the billing agent.

Run log:
- Planner found customer by company name but did not include customer_id.
- Billing agent called create_invoice with customer_id=null.
- Guardrail passed because invoice total was below approval threshold.
- Final response said invoice was created, but tool returned validation_error.
```

出力例:

```markdown
Likely failure points:
1. Handoff contract missing required customer_id.
2. Tool result validation did not block final success message.
3. Guardrail checked amount risk but not identifier validity.

Suggested eval case:
- Given a customer lookup without customer_id, billing agent must stop and request disambiguation.

Workflow patch:
- Add handoff contract: billing agent requires customer_id and source evidence.

ADR candidate:
- Decide whether final responses must be derived from tool success state rather than agent intent.
```

想定ワークフロー:

```text
failed multi-agent run
  -> exported trace or pasted run log
  -> Agent Trace Lens review
  -> failure hypotheses
  -> eval cases / workflow patch / ADR candidates
  -> hachi-concept-factory artifacts
```

## 5. 差別化

主な差別化:

- Trace observabilityではなく、failed-run preventionに集中する。つまり、次に増やすeval case、直すworkflow patch、残すADR候補を出す。

副次的な差別化:

- ローカルファーストで、機密性の高いtraceや業務ログを手元で扱いやすい。
- 既存observability platformの補完レイヤーとして使える。
- 出力が `SEED`, `PRD`, `ADR`, `Wiki`, `GitHub Issue` に接続される。
- Agent failureを単なる技術ログではなく、workflow設計・承認点・評価ケースの問題として扱う。
- 日本語の業務Agent運用メモ、SOP、受託開発、スモールカンパニー文脈を扱える。
- 最初の出力が「洞察」ではなく、再発防止のための実行可能なartifactである。

弱い差別化として避けるべきもの:

- より見やすいtrace UI。
- 汎用Agent observability platform。
- 完全自動root cause analysis。
- 特定SDKだけに閉じたdebug assistant。
- ログをLLMに貼るだけのprompt集。

単なるプロンプトではない理由:

- 入力ログを一定の観点に正規化する: agent、handoff、state、tool、guardrail、approval。
- 出力を必ず再利用可能なartifactに分ける: eval case、workflow patch、ADR candidate、optional SEED。
- 過去のrun reviewやADRと照合する前提を持つ。
- 後続工程でPRD/ADR/Wikiへ渡せる構造を守る。

## 6. Moat

Moat種別:

- workflow
- context
- data
- integration
- local_first
- japanese_context
- process
- agentable

説明:

初期Moatは強くない。単発のtrace要約なら簡単にコピーされる。Agent Trace LensのMoatは、繰り返し使うことでプロジェクト固有の失敗パターン、handoffの癖、危険なtool、必要なapproval、再発防止eval、過去ADRが蓄積される点にある。

積み上がる理由:

- run review履歴が増えるほど、同じ失敗を見つけやすくなる。
- workflow patchとADR候補が残るほど、設計判断の理由が追える。
- SEED化された失敗が、後続のconcept / PRD / ADRにつながる。
- Wikiやローカル知識ベースと接続すると、チーム固有のAgent運用知になる。

強化方法:

- review outputを毎回同じ構造にする。
- failure pattern catalogを育てる。
- `hachi-sense`, `hachi-position`, `hachi-prd`, `hachi-adr`, `wiki-garden` への接続を明示する。
- local file firstで、traceを外部に出さずに扱える設計を守る。

## 7. WedgeとMVP方向性

Wedge:

最初のユーザーは、multi-agent workflowを作っている個人開発者または小規模チームの技術担当。最初の痛みは、「traceはあるが、失敗原因候補と改善タスクへ落とせない」こと。

MVP方向性:

1. MarkdownまたはJSONのtrace / run logを入力できる。
2. Agent、handoff、tool call、state / memory、guardrail、human approvalの観点で失敗候補を抽出する。
3. 失敗原因候補を確度つきで並べる。
4. 次に追加すべきeval caseを提案する。
5. workflow patch notesを出す。
6. ADR候補を出す。
7. 出力をMarkdownで保存し、後続のhachi-concept-factory工程に渡せる。

非目標:

- trace collection platformを作らない。
- hosted SaaS dashboardを作らない。
- real-time monitoringやalertingを作らない。
- 完全自動root cause判定を約束しない。
- 初期MVPで全observability platformのexport形式に対応しない。
- 初期MVPでSEED生成を主価値にしない。SEEDは副産物として扱う。

主要ユースケース:

- LangGraph workflowの失敗runをレビューする。
- customer support agentのhandoff失敗を再発防止メモにする。
- tool call hallucinationをeval caseへ変換する。
- Agent workflow変更のADR候補を作る。

## 8. 根拠とソーストレース

入力成果物:

- `factory/seeds/2026-06-01_multi-agent-small-company.md`
- `factory/positioning/2026-06-01_agent-trace-lens.md`

根拠要約:

- OpenAI Agents SDKは、LLM generations、tool calls、handoffs、guardrails、custom eventsを含むbuilt-in tracingを持つ。
- LangSmith、Langfuse、Phoenix、Braintrustなどは、trace、eval、debug、monitoringを強化している。
- RedditやIssue由来のシグナルでは、traceはあっても原因が分からない、handoff tracingが難しい、state transitionが見えにくい、という痛みが繰り返し出ている。
- hachi-positionでは、trace収集ではなくtrace-to-improvement文書化に絞れば、既存toolと補完関係を取れると判断した。

代表的なソース:

- OpenAI Agents SDK tracing: https://openai.github.io/openai-agents-js/guides/tracing
- LangSmith observability docs: https://docs.langchain.com/oss/javascript/langchain/observability
- Langfuse Agent Graphs: https://langfuse.com/docs/observability/features/agent-graphs
- Arize Phoenix docs: https://arize.com/docs/phoenix/
- OpenTelemetry GenAI semantic conventions: https://opentelemetry.io/docs/specs/semconv/gen-ai/

## 9. 洗練ログ

### Round 1: 初期コンセプト

- 初期案: Multi-agent traceやrun logを、失敗原因候補、workflow patch、SEED、ADR候補へ変換するローカルファーストSkill。
- 弱点: 価値の中心が広く、`trace summary` や `observability assistant` に見えやすい。SEEDを前面に出すと、ユーザーが失敗runから得たい即時価値がぼやける。
- 変更: 中心価値を `failed run -> eval case / workflow patch / ADR candidate` に絞り、SEEDは副産物に下げた。

### Round 2: Wedgeの絞り込み

- 批評: 代表的な利用体験、example input/output、activation momentが足りず、「良い分析文書」止まりだった。
- 変更: Signature Workflow、Example input、Example output、Why this is not just a promptを追加し、初回だけでなく継続利用時の再発判定まで含めた。

### 最終コンセプト

- この版が強くなった理由: 失敗traceを眺めるツールではなく、再発防止のためのartifactを作るSkillとして焦点が合った。PRDでは入力形式、出力artifact、受け入れ基準をそのまま要件化できる。

## 10. リスクと前提

リスク:

- 既存observability platformがrun reviewやroot cause suggestionを実装する。
- trace formatごとのadapter対応が膨らむ。
- 原因仮説の精度が低いと信用されない。
- 入力ログに機密情報が含まれ、取り扱い設計が甘いと使えない。
- `traceを読むSkill` に留まり、eval case / workflow patch / ADR接続が弱いと差別化が消える。

前提:

- 初期ユーザーはtraceやrun logをMarkdown/JSONとして提供できる。
- 完全自動判定より、原因候補と次アクションの構造化に価値を感じる。
- ローカルファースト性は、小規模チームや受託開発、国内業務文脈で価値になる。
- hachi-concept-factoryの後続工程に接続することで、単発レビュー以上の価値が出る。
- 最初のactivation momentは、ユーザーが「次に足すeval case」と「直すhandoff契約」を得た瞬間に来る。

未解決の問い:

- 最初に対応すべきtrace形式は、OpenAI Agents SDK、LangSmith export、Langfuse export、手書きMarkdownのどれか。
- CLIをMVPに含めるか、最初はVercel Skillだけにするか。
- review outputに確度スコアを入れるか。
- eval case出力の形式をどこまで決めるか。

## 11. PRD準備度

PRD準備度: high

評価:

- Clarity: high。対象ユーザー、入力、出力、Signature Workflow、非目標が明確。
- Pain Alignment: high。source SEEDの「失敗原因が追えない」痛みに直結している。
- Differentiation: high。trace collectionではなく、failed-run prevention artifact生成に絞れている。
- Moat Strength: medium。初期は弱いが、run review履歴、ADR、Wiki接続で育つ。
- Wedge: high。個人開発者・小規模チーム向けのMarkdown/JSON trace reviewから始められる。
- PRD Readiness: high。MVP機能要件、example input/output、受け入れ基準、非目標をすぐ定義できる。

シグネチャーワークフロー評価:

- Representative: high。失敗runを貼り、失敗原因候補、eval case、workflow patch、ADR候補を得る流れは、この製品固有の体験になっている。
- Repeatable: high。初回だけでなく、継続利用時に過去run reviewやADR候補と照合できるため、再発防止の運用に乗りやすい。
- Activation moment: high。ユーザーが「次に足すeval case」と「直すhandoff契約」を得た瞬間に価値が出る。
- リスク: medium。過去run reviewとの照合をMVPにどこまで含めるかをPRDで切らないと、scopeが膨らむ。

PRDでの調整:

- MVPでは「過去run reviewとの照合」は手動参照または同一Markdown内の履歴参照までに制限する。
- 自動的な履歴DB、横断検索、failure pattern catalogはPRDのfuture scopeまたはADR候補に送る。

## 12. 推奨判断

判断: promote_to_prd

次のステップ:

`hachi-prd` で、Agent Trace LensのMVP PRDを作る。

PRDで特に決めるべきこと:

- 入力形式: Markdown run log / generic JSON trace / OpenAI Agents SDK trace exportの扱い。
- 出力形式: diagnosis brief、eval case候補、workflow patch、ADR候補、optional SEED候補。
- MVP範囲: trace collectionやdashboardを明確に除外する。
- 受け入れ基準: サンプルtraceから失敗候補、workflow patch、SEED/ADR候補が出ること。
- ADR候補: trace schemaの内部表現、ローカル保存方式、adapter設計、機密情報マスキング。

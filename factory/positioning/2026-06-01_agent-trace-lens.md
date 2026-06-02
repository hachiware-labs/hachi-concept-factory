# hachi-position レポート

## 1. 対象範囲

- 入力SEED: seed-20260601-001
- 入力ファイル: `factory/seeds/2026-06-01_multi-agent-small-company.md`
- 注目領域: マルチAgent実行の失敗原因分析、trace review、Agentable改善ループ
- 期間: 2025-12-01 to 2026-06-01
- ソース: hachi-sense SEED, OpenAI Agents SDK docs, LangSmith docs, Langfuse docs, Arize Phoenix docs, Braintrust docs, OpenTelemetry docs, arXiv, Reddit
- 出力ロケール: ja-JP

## 2. 製品仮説

### 仮説

マルチAgentの実行traceを、単なる可視化ログではなく「失敗原因候補、handoffの破綻、state diff、改善SEED、ADR候補」に変換するローカルファーストのSkill / CLIには、既存observability製品と補完関係で成立する余地がある。

仮称: `agent-trace-lens`

### 対象ユーザー

- LangGraph / AutoGen / CrewAI / OpenAI Agents SDK / custom loop でmulti-agent workflowを組む個人開発者・小規模チーム
- Agent導入支援を行うAI consultant / fractional CTO
- 自社内で業務Agentを試している1-20人規模のスモールカンパニーの技術担当

購入者と利用者は初期はほぼ同じ。チーム向けSaaSより先に、ローカルCLI / Skillとして開発者が自分のtraceやrun logを読む用途が自然。

### 課題

複数Agentの出力が失敗したとき、traceやログは存在しても、なぜ失敗したかを人間が読み解く負荷が高い。特に以下が詰まりやすい。

- どのAgentの判断が後続失敗を誘発したか
- handoff時に何の前提が失われたか
- shared state / memory / tool result のどこで矛盾が入ったか
- traceはあるが、改善タスクや設計判断に変換されない
- ローカル再現、手元レビュー、PRD/ADRへの接続が弱い

### 想定製品カテゴリ

Agent trace diagnosis and run-review Skill.

既存observability platformを置き換えるのではなく、LangSmith、Langfuse、Phoenix、OpenAI Agents SDK tracing、OpenTelemetry logsなどから出力されたtraceを入力として、原因仮説と改善文書へ変換する補助レイヤー。

### Job-to-be-Done

When a multi-agent workflow fails or behaves oddly, I want to turn the trace into a concise diagnosis and improvement brief, so that I can identify the likely root cause and update my Agent workflow, tests, PRD, or ADR without rereading the entire run manually.

## 3. 市場・ベンダー環境

### 大手ベンダーの動向

OpenAI Agents SDKはbuilt-in tracingを提供し、LLM generation、tool call、handoff、guardrail、custom eventを含む実行記録を扱う。さらにsnapshotting / rehydrationなど長時間Agent実行の基盤を強化している。

Google ADKやGemini Enterprise Agent Platformは、multi-agent orchestration、persistent context、Agent Identity / Gateway / Registryなど、企業向けAgent運用の部品を拡張している。

Microsoft / GitHub周辺もAutoGen系、GitHub上のAgent開発、Actions / Copilot文脈でAgent運用基盤を押さえにくる可能性がある。

判断:

- 汎用tracing基盤は大手・既存SaaSに吸収されやすい。
- `agent-trace-lens` がtrace収集基盤そのものを作るとvendor riskは高い。
- ただし「既存traceをローカルで読み、失敗原因候補、改善SEED、ADR候補、Agentable SOP修正へ変換する」補完レイヤーなら参入余地がある。

### 商用代替

- LangSmith: LangChain / LangGraphとの親和性が強く、trace、debug、eval、monitoringを提供する。
- Langfuse: OSS寄りのLLM observabilityで、agent graphなど複雑なAgent workflowの可視化を強めている。
- Arize Phoenix: OpenTelemetry / OpenInferenceベースのAI observability and evaluation。ローカル開発やOSS利用とも相性が良い。
- Braintrust: tracing、eval、production trace scoringなど、品質改善ループ寄りのAI observabilityを提供する。
- Datadog / broader APM: LLM observabilityを既存monitoringに統合する方向。

これらは強力だが、主戦場は「trace収集、可視化、評価、monitoring」。hachiware-labsが狙うなら「traceから設計・改善文書へ落とす」部分に寄せるべき。

### OSS代替

- OpenTelemetry GenAI semantic conventions: GenAI / agent / framework spanの共通語彙が整備されつつある。
- OpenInference: Phoenixなどで利用されるAI observability instrumentation。
- AgentOps / AgentTrace / AgentSight系の研究・OSS: Agent lifecycle、structured logging、system-level tracing、root cause analysisに近い。
- LangGraph / AutoGen / CrewAI周辺のframework固有instrumentation。

OSS競合は多いが、多くはinstrumentation、trace schema、dashboard、runtime monitoring寄り。`hachi-position` 観点では、trace dataをhachiware-labsのSEED / PRD / ADR / Wikiへ接続する領域はまだ薄い。

### 手作業での回避策

- console logsを読む
- trace UIでspanを手で追う
- Slack / Notion / GitHub Issueに失敗原因を手書きする
- 実行ログをLLMに貼って要約させる
- 独自のrun review checklistを作る
- 失敗再現用のfixtureやevalを手で追加する

この手作業は高頻度で起きるが、標準化されにくい。ここにSkill化の余地がある。

## 4. 差別化分析

### 強い差別化

- Trace collectionではなく、trace diagnosis and documentationに絞る。
- SaaS dashboardではなく、ローカルファイル / exported trace / copied logsを扱える。
- 出力先を `SEED`, `PRD`, `ADR`, `Wiki`, `GitHub Issue` に接続する。
- Agent failureを「技術ログ」ではなく「workflow設計上の改善点」として扱う。
- 日本語の業務Agent運用メモ、SOP、国内小規模会社の業務文脈を扱える。

### 弱い差別化

- 「より見やすいtrace UI」は弱い。LangSmith、Langfuse、Phoenixが強い。
- 「Agent observability platform」は広すぎる。
- 「自動root cause analysisを完全に行う」は精度保証が難しく、過大な約束になりやすい。

### 推奨する差別化

`agent-trace-lens` は、traceの正解診断ツールではなく、失敗原因候補を構造化し、改善作業へ渡す `run review compiler` として位置づける。

具体的には以下を出す。

- likely failure points
- missing handoff context
- suspicious state changes
- tool-call mismatch
- guardrail / approval gaps
- next eval cases
- SEED candidates
- ADR candidates
- suggested workflow patch notes

## 5. Moat分析

### Moat候補

- Workflow moat: Agent run reviewが、失敗時の定例手順になると強い。
- Context moat: プロジェクト固有のAgent構成、SOP、過去失敗、ADR、Wikiとの接続が蓄積する。
- Data moat: 失敗trace、原因仮説、修正結果、再発有無が蓄積する。
- Integration moat: GitHub Issues、PRD、ADR、Wiki、Skill改善履歴につながるほど価値が増す。
- Community moat: 失敗パターン集、review checklist、trace schema adapterを共有できると強くなる。
- Local-first moat: 機密ログや顧客データをSaaSに送れないチームに効く。
- Japanese-context moat: 日本語の業務SOP、議事録、問い合わせ、受託開発文脈を扱うと差別化になる。
- Agentable moat: 出力がAgentの次アクション、テスト、ADR候補としてそのまま使える。

### Moat強度

medium

初期は弱い。traceを要約するだけなら簡単にコピーされる。強くなるのは、run reviewの履歴、project policy、過去ADR、失敗パターン、ローカルWikiとの接続が溜まった後。

### このMoatが積み上がる理由

利用するほど、プロジェクト固有の「壊れやすいhandoff」「危険なtool」「必要なapproval」「よくあるstate drift」「再発防止eval」が蓄積される。これがWiki、ADR、Skill改善履歴に接続されると、単発のtrace要約ではなくAgent運用知識ベースになる。

### このMoatが失敗しうる理由

- 既存observability platformが同じrun review機能を実装する。
- trace formatごとのadapter保守が重くなる。
- 原因仮説の精度が低く、ユーザーが信用しない。
- hachiware-labs文脈への接続が弱く、ただのログ要約になる。

### 競合がコピーする方法

LangSmith、Langfuse、Phoenix、Braintrustは、既にtraceやevalを持っているため、trace-to-diagnosis、run review、root cause suggestionをダッシュボード内に追加できる。特にhosted SaaSはユーザーのtrace dataを直接持つため、診断UIの実装は速い。

### 大手ベンダーに吸収される経路

OpenAI / Google / MicrosoftはSDKやAgent platformにtrace analysis、debug assistant、workflow repair suggestionを内蔵できる。したがって、SDK固有のtrace診断だけで勝負すると吸収リスクが高い。

### 強化すべきMoat

`trace -> diagnosis -> SEED/ADR/Wiki/GitHub Issue` の変換を中核にする。trace UIやmonitoringではなく、設計判断と改善履歴を残すプロセスMoatを強める。

## 6. ポジショニング案

### Option A: Local-first Agent Run Review Skill

- First user: multi-agent workflowを作る個人開発者・小規模チーム
- First pain: traceはあるが、原因仮説と改善タスクへ落とせない
- MVP form: Vercel Skill + CLI later
- 入力: exported trace JSON, markdown run log, copied span tree, GitHub Issue
- 出力: diagnosis brief, SEED candidates, ADR candidates, eval suggestions
- リスク: trace format対応が散る
- 適合性: high

### Option B: LangGraph / LangSmith Trace Companion

- First user: LangGraph利用者
- First pain: state transition、conditional edge、sub-agent handoffの失敗を読み解きたい
- MVP form: Skill with LangGraph-specific checklist
- 入力: LangSmith trace URL / export, LangGraph state log
- 出力: failure map and workflow patch recommendations
- リスク: LangChain ecosystemに依存し、LangSmith本体に吸収されやすい
- 適合性: medium

### Option C: Small Company Agent Incident Review

- First user: founder / ops leadが業務Agentを運用する小規模会社
- First pain: Agentが顧客対応や請求処理で失敗したとき、再発防止が文書化されない
- MVP form: Japanese Skill template
- 入力: incident note, chat log, tool result, human correction
- 出力: incident report, SOP patch, approval rule, ADR candidate
- リスク: traceが構造化されていないため入力品質に左右される
- 適合性: high, but hachi-sense seed-20260601-004と統合したほうが強い

## 7. 推奨判断

判断: promote_to_concept

理由:

`agent-trace-lens` は、既存observability platformと競合する「traceを取る製品」としては弱い。一方で、既存traceやrun logを読み、原因仮説と改善文書へ変換するSkillとしては、hachiware-labsの強みと合う。特に `SEED / PRD / ADR / Wiki` への接続が明確で、hachi-concept-factory自体の利用ループにもなる。

推奨ポジショニング:

> A local-first Agent run-review Skill that turns multi-agent traces into failure hypotheses, workflow patches, SEEDs, and ADR candidates.

## 8. スコア

- Pain-to-product fit: 5
- Differentiation: 4
- Vendor risk: 4
- OSS competition risk: 3
- Wedge clarity: 4
- Buildability: 4
- Moat score: 4

注記:

- Vendor risk is high because OpenAI, Google, LangChain, and observability vendors are moving quickly.
- The idea still promotes because the wedge is not data capture or dashboarding. It is local run-review and documentation handoff.

## 9. 次のステップ

Create a `hachi-concept` Concept Brief for Option A:

- タイトル: Agent Trace Lens
- 一言説明: Multi-agent traceを失敗原因候補、改善SEED、ADR候補へ変換するローカルファーストSkill。
- 対象ユーザー: multi-agent workflowを運用する開発者・小規模チーム
- 提供形態: Vercel Skill first, CLI later
- MVP:
  - Markdown / JSON trace input
  - Handoff / state / tool-call / guardrail risk extraction
  - Failure hypothesis list
  - Suggested eval cases
  - SEED and ADR candidate output
- 非目標:
  - Trace collection platformを作らない
  - Real-time monitoringを作らない
  - 完全自動root cause判定を約束しない

## 根拠トレース

- Source SEED report: `factory/seeds/2026-06-01_multi-agent-small-company.md`
- OpenAI Agents SDK tracing: https://openai.github.io/openai-agents-js/guides/tracing
- OpenAI Agents SDK evolution: https://openai.com/index/the-next-evolution-of-the-agents-sdk/
- OpenAI Agents SDK guide: https://platform.openai.com/docs/guides/agents-sdk/
- LangSmith observability docs: https://docs.langchain.com/oss/javascript/langchain/observability
- Langfuse Agent Graphs: https://langfuse.com/docs/observability/features/agent-graphs
- Arize Phoenix docs: https://arize.com/docs/phoenix/
- Arize Phoenix tracing: https://arize.com/docs/phoenix/learn/tracing/how-tracing-works
- Braintrust tracing docs: https://www.braintrust.dev/docs/observability
- OpenTelemetry GenAI semantic conventions: https://opentelemetry.io/docs/specs/semconv/gen-ai/
- OpenInference: https://arize-ai.github.io/openinference/
- AgentTrace root cause analysis paper: https://arxiv.org/abs/2603.14688
- AgentSight paper: https://arxiv.org/abs/2508.02736
- AgentOps paper: https://arxiv.org/abs/2411.05285
- Multi-agent debugging Reddit thread: https://www.reddit.com/r/AI_Agents/comments/1stws79/people_building_multiagent_systems_whats_the/
- Langfuse trace diagnosis Reddit thread: https://www.reddit.com/r/AI_Agents/comments/1s2czsg/langfuse_traces_told_us_the_agent_failed_still/
- OpenTelemetry / agent telemetry Reddit thread: https://www.reddit.com/r/OpenTelemetry/comments/1rvu4x2/agent_telemetry_semantic_conventions_atsc_draft/

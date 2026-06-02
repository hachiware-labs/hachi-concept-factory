# PRD: Agent Trace Lens MVP

## 1. メタデータ

- PRD ID: prd-20260602-001
- Status: draft
- Source Concept: `concept-20260601-001`
- Source Concept file: `factory/concepts/2026-06-01_agent-trace-lens.md`
- Source Positioning file: `factory/positioning/2026-06-01_agent-trace-lens.md`
- Source SEED file: `factory/seeds/2026-06-01_multi-agent-small-company.md`
- Density: mvp
- Output locale: ja-JP

## 2. 要約

Agent Trace Lens MVPは、failed multi-agent runのtraceやrun logを、再発防止に使える `failure hypotheses`、`eval cases`、`workflow patch notes`、`ADR candidates` へ変換するローカルファーストSkillである。

MVPではtrace収集基盤、dashboard、real-time monitoringは作らない。既存のtrace export、Markdown run log、copied span treeを入力として受け取り、次の改善判断に必要なMarkdown成果物を返す。

## 3. 背景

Multi-agent workflowでは、LangGraph、AutoGen、CrewAI、OpenAI Agents SDK、custom loopなどにより、複数Agent、tool call、handoff、state、guardrailが絡む。traceやログは残っていても、どのhandoffで前提が抜けたか、どのtool resultをfinal responseが誤読したか、次にどのeval caseを足すべきかは人間が読み解く必要がある。

既存observability platformはtrace収集・可視化・monitoringに強い。一方、hachiware-labsが狙う価値は、traceを「次に直すartifact」へ変換することにある。

## 4. 課題定義

failed runのtraceはあるが、再発防止のための修正判断に変換されない。

具体的には、ユーザーは以下で詰まる。

- spanやログが多く、失敗原因候補を絞れない
- handoff contractの欠落が最終出力の失敗として表面化する
- tool callのvalidation errorをAgentが成功扱いする
- guardrailが金額や安全性だけを見て、識別子や状態整合性を見ない
- trace review結果がGitHub Issue、eval、PRD、ADRへ残らず、同じ失敗が再発する

## 5. 対象ユーザー

- Primary user: multi-agent workflowを運用する個人開発者・小規模チームの技術担当
- Secondary user: AI導入支援者、fractional CTO、agent workflow reviewer
- Reader: future implementation agent、reviewer、PRD/ADR writer
- Maintainer: hachiware-labs skill maintainer

## 6. ユーザー分析

### Primary User

- 役割: multi-agent workflowを設計・運用・改善する開発者
- 文脈: failed runのtraceやrun logは持っているが、原因候補と修正artifactへ落とす作業が手作業
- 現在のワークフロー: trace UI、console log、GitHub Issue、Slackメモを読み、LLMに貼るか手で原因メモを書く
- 技術レベル: advanced developer
- 制約: 顧客データ、業務ログ、local path、prompt、tool resultが含まれる可能性があり、hosted SaaSへ送れない場合がある
- 成功条件: 次に追加するeval case、直すhandoff contract、残すADR候補が分かる
- 失敗時の影響: 同じhandoff failure、tool-result mismatch、guardrail gapが再発する

### Secondary Users / Stakeholders

- Reader: run review結果を読む実装Agentまたはhuman reviewer
- Approver: workflow変更やguardrail変更を承認するtech lead
- Operator: traceやrun logをSkillに渡す開発者
- Maintainer: trace format、output schema、privacy handlingを保守するhachiware-labs maintainer

### User Journey

- Before: failed runが発生し、traceやログはあるが長くて読みにくい
- Trigger: final outputが期待と違う、toolがvalidation errorを返した、handoff後のAgentが必要情報を失った
- During: ユーザーがrun log、期待結果、任意のworkflow説明をSkillに渡す
- After: failure hypotheses、eval case、workflow patch、ADR candidateを得る
- Repeated use: 過去のrun reviewと照合し、同じfailure patternか、新しい設計判断が必要かを判断する

## 7. ペインポイント

### Pain 1: traceはあるが失敗原因候補に絞れない

- Situation: multi-agent runが失敗し、trace UIやlogには多数のspan、tool call、handoffが並ぶ
- Trigger: final outputが期待と違う、またはtool resultと矛盾した成功メッセージが返る
- Current workaround: traceを手で読み、Slack/Notion/GitHub Issueにメモを書く
- Why existing alternatives fail: observability platformはtraceを見る場所を提供するが、hachi-concept-factory向けのeval caseやADR候補までは作らない
- Frequency: active multi-agent developmentではweeklyからdaily
- Severity: high
- Emotional tone: frustration, uncertainty
- Business / workflow impact: 同じrun failureが再発し、reviewとdebugの時間が増える
- Willingness to pay or adopt: medium。CLI/Skillとして小さく導入できるなら採用しやすい
- Evidence: `seed-20260601-001`, positioning reportのmarket/vendor landscape

### Pain 2: handoff contractやtool resultの欠落が文書化されない

- Situation: planner、researcher、executor、reviewerなどのAgentが前提を受け渡す
- Trigger: 後続Agentが必要なID、source evidence、approval stateを受け取らず、誤ったtool callやfinal responseを作る
- Current workaround: prompt修正、role description修正、手書きチェックリスト
- Why existing alternatives fail: prompt修正だけでは、なぜその契約が必要かというADR/PRD上の理由が残りにくい
- Frequency: multi-agent workflow設計時に反復発生
- Severity: high
- Emotional tone: caution, distrust
- Business / workflow impact: workflow変更の理由が残らず、Agentや開発者が同じ設計ミスを繰り返す
- Willingness to pay or adopt: medium-high。再発防止artifactが出るなら価値がある
- Evidence: concept briefのSignature Workflow、Positioningのdifferentiation analysis

### Pain 3: 機密traceを外部に出せず、ローカルでレビューしたい

- Situation: run logに顧客名、local path、prompt、tool arguments、業務データが含まれる
- Trigger: hosted observabilityや外部LLMへの貼り付けに抵抗がある
- Current workaround: 手元でマスキングしてから要約、またはレビューを諦める
- Why existing alternatives fail: hosted SaaS前提だと、機密情報を含むtraceを扱いづらい
- Frequency: 受託開発、社内業務Agent、顧客対応Agentでは継続的
- Severity: medium-high
- Emotional tone: risk aversion
- Business / workflow impact: review対象が減り、失敗学習が蓄積しない
- Willingness to pay or adopt: medium。local-firstなら採用障壁が下がる
- Evidence: hachiware-labs local-first方針、concept briefのrisk / assumptions

## 8. 目標

- failed runを、再発防止に必要なMarkdown artifactへ変換する
- 失敗原因候補を最大3つに絞る
- eval case候補を1つ以上出す
- workflow patch noteを1つ以上出す
- ADR candidateを必要時に出す
- 機密情報・local path・secret-like tokenを検出または注意喚起する
- 日本語依頼では日本語見出しで出力する

## 9. 非目標

- trace collection platformを作らない
- hosted SaaS dashboardを作らない
- real-time monitoringやalertingを作らない
- 完全自動root cause判定を約束しない
- 初期MVPで全observability platformのexport形式に対応しない
- 初期MVPで履歴DBや横断検索を作らない
- 初期MVPで自動PR作成まで行わない

## 10. 製品スコープ

### Product Type

- Vercel Skill first
- npm CLI later
- Local-first Markdown artifact generator

### Target Environment

- Agent session with installed hachi skills
- Local repository containing `factory/`
- Node.js / JavaScript ecosystem for future CLI or validator extensions

### In Scope

- Markdown run log input
- Generic JSON trace input
- Expected behavior text
- Optional workflow description
- Failure hypothesis extraction
- Eval case suggestion
- Workflow patch note
- ADR candidate extraction
- Privacy / secret / local path caution
- Markdown output for `factory/runs/` or `factory/prds/` handoff

### Out of Scope

- Hosted trace storage
- Browser dashboard
- Real-time ingestion
- Vendor-specific API integration
- Full adapter coverage for LangSmith / Langfuse / Phoenix
- Automated code patch generation

## 11. ユーザーストーリー

- As a developer, I want to paste a failed run log and expected behavior, so that I can get the likely failure points and next eval case.
- As a workflow maintainer, I want to see missing handoff contracts, so that I can update Agent instructions or workflow docs.
- As a local-first user, I want sensitive log elements flagged, so that I can avoid leaking customer data or secrets.
- As a PRD/ADR writer, I want ADR candidates extracted from run failures, so that design decisions are not lost in debug notes.

## 12. ユースケースと操作イメージ

### UC-001: failed runをレビューする

- Actor: developer
- Goal: failed runから原因候補、eval case、workflow patchを得る
- Preconditions:
  - user has a failed run log or trace excerpt
  - user can describe expected behavior in 1-3 lines
- Input:
  - required: run log or trace excerpt, expected behavior
  - optional: workflow description, related PRD/ADR links, output locale
- User operation:
  - step: 1
    user_action: `hachi-prd` or agent sessionにAgent Trace Lens concept / logを渡す
    system_response: input scope and assumptions are normalized
  - step: 2
    user_action: expected behavior and run logを貼る
    system_response: log is segmented into agent, handoff, state, tool, guardrail, approval observations
  - step: 3
    user_action: output locale and artifact destinationを指定する
    system_response: diagnosis brief is generated
- Output:
  - primary: failed-run review Markdown
  - secondary: eval case, workflow patch note, ADR candidate
- Next action: eval case追加、handoff contract修正、ADR作成
- Success state: user can name the next concrete fix without rereading the whole trace
- Failure or edge cases:
  - empty log
  - malformed JSON trace
  - secret-like token in log
  - tool result missing
  - expected behavior not provided
  - mixed Japanese/English log
- Acceptance criteria:
  - output has at most 3 likely failure points
  - output includes at least 1 eval case candidate
  - output includes at least 1 workflow patch note
  - output flags sensitive or secret-like content when present

### UC-002: handoff contract gapをADR候補へ変換する

- Actor: workflow maintainer
- Goal: repeated handoff failureから設計判断を抽出する
- Preconditions:
  - failed run includes missing or ambiguous cross-agent handoff
  - user wants design rationale preserved
- Input:
  - required: failure summary, current handoff behavior
  - optional: current Agent instruction, related PRD requirement
- User operation:
  - step: 1
    user_action: repeated handoff failureのreview outputを渡す
    system_response: missing contract and affected requirement are identified
  - step: 2
    user_action: ADR candidate extractionを依頼する
    system_response: one-decision ADR candidate is proposed
- Output:
  - primary: ADR candidate with decision boundary
  - secondary: rejected adjacent decisions
- Next action: `hachi-adr`でADR化する
- Success state: architecture decision is scoped to one decision
- Failure or edge cases:
  - candidate mixes schema, runtime, storage, and privacy decisions
  - PRD requirement is too vague
- Acceptance criteria:
  - ADR candidate states one decision boundary
  - mixed decisions are marked for `split_adr`

### UC-003: local-first privacy reviewを行う

- Actor: local-first developer
- Goal: run review前にsensitive data handlingを明示する
- Preconditions:
  - run log may include customer data, local path, prompt, token-like strings
- Input:
  - required: run log
  - optional: privacy policy, redaction preference
- User operation:
  - step: 1
    user_action: run logを貼る
    system_response: possible sensitive items are flagged
  - step: 2
    user_action: redaction behaviorを選ぶ、またはデフォルトを使う
    system_response: review output avoids reproducing sensitive raw values unnecessarily
- Output:
  - primary: privacy-aware run review
  - secondary: privacy ADR candidate if a policy decision is needed
- Next action: decide redaction/storage policy through `hachi-adr`
- Success state: user can review failed run without leaking raw sensitive data into durable artifacts
- Failure or edge cases:
  - false positive secret detection
  - user explicitly wants verbatim log excerpts
  - hosted transfer is requested
- Acceptance criteria:
  - secret-like tokens are flagged or redacted
  - hosted transfer is not assumed
  - durable artifact does not include unnecessary sensitive raw values

## 13. 機能要件

- FR-001: Markdown run logを入力として受け取れる
- FR-002: Generic JSON traceを入力として受け取れる
- FR-003: expected behaviorを任意または必須不足として扱い、ない場合は不足を明示する
- FR-004: 観察事実、推測、判断を分けて出力する
- FR-005: logをagent / handoff / state / tool / guardrail / human approvalの観点で分類する
- FR-006: 失敗原因候補を最大3つに絞る
- FR-007: 各失敗原因候補に根拠traceまたはlog excerpt summaryを付ける
- FR-008: eval case候補を1つ以上出す
- FR-009: workflow patch noteを1つ以上出す
- FR-010: ADR candidateを必要時に出す
- FR-011: secret-like token、customer data、local path、prompt leakage riskを検出または注意喚起する
- FR-012: 日本語依頼では日本語見出しで出力する

## 14. 非機能要件

- NFR-001: local-firstを前提とし、hosted transferをデフォルトにしない
- NFR-002: 出力はMarkdownで、人間とAgentが読める
- NFR-003: stable IDsやdecision valuesは英語のまま保持できる
- NFR-004: 入力が不完全な場合も、仮定と不足を明示して進める
- NFR-005: 失敗原因を断定せず、候補と確度で表現する
- NFR-006: MVPではvendor-specific API dependencyを持たない

## 15. 入力 / 出力

### 入力

```yaml
input:
  expected_behavior: ""
  run_log_markdown: ""
  trace_json: {}
  workflow_description: ""
  related_documents: []
  output_locale: "ja-JP | en-US"
  privacy_preference: "flag | redact | summarize"
```

### 出力

```yaml
output:
  diagnosis_brief: ""
  observed_facts: []
  inferences: []
  judgments: []
  likely_failure_points: []
  suggested_eval_cases: []
  workflow_patch_notes: []
  adr_candidates: []
  privacy_warnings: []
  open_questions: []
  next_actions: []
```

## 16. データモデル

```yaml
run_review:
  review_id: "run-review-YYYYMMDD-001"
  source:
    concept_id: "concept-20260601-001"
    prd_id: "prd-20260602-001"
    input_type: markdown_log | json_trace | mixed
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
      affected_requirements: []
  eval_cases:
    - id: "EVAL-001"
      given: ""
      when: ""
      then: ""
  workflow_patches:
    - id: "PATCH-001"
      target: ""
      change: ""
      rationale: ""
  adr_candidates:
    - title: ""
      reason: ""
      urgency: high | medium | low
      decision_needed_by: before_mvp | before_release | later
  privacy_warnings: []
```

## 17. ワークフロー

```text
failed run occurs
  -> user exports trace or copies run log
  -> user supplies expected behavior
  -> Agent Trace Lens segments observations
  -> Agent Trace Lens proposes failure hypotheses
  -> Agent Trace Lens emits eval case and workflow patch
  -> Agent Trace Lens extracts ADR candidates
  -> user applies eval / patch / ADR flow
```

## 18. 受け入れ基準

- AC-001: Given a failed run log with a missing customer ID handoff, when the Skill reviews it, then it identifies missing handoff contract as a likely failure point.
- AC-002: Given a tool validation error followed by a success final response, when reviewed, then the output flags tool-result/final-response mismatch.
- AC-003: Given a log containing a secret-like token, when reviewed, then the output flags or redacts it according to privacy preference.
- AC-004: Given no expected behavior, when reviewed, then the output states the missing expectation and lowers confidence.
- AC-005: Given a Japanese request with English trace logs, when reviewed, then section headings and explanations are Japanese while stable IDs remain unchanged.
- AC-006: Given a repeated handoff failure, when ADR candidates are generated, then at least one candidate states a one-decision boundary.
- AC-007: Given malformed JSON trace but readable text, when reviewed, then the Skill falls back to Markdown/log interpretation and records the parsing gap.

## 19. 要件トレーサビリティ

| Requirement | Source pain / use case / concept constraint | Acceptance check |
|---|---|---|
| FR-001 | UC-001 / MVP input constraint | AC-001 |
| FR-002 | UC-001 / future CLI compatibility | AC-007 |
| FR-004 | hachi-sense/hachi-prd fact-inference-judgment rule | AC-001 |
| FR-005 | Concept Signature Workflow | AC-001, AC-002 |
| FR-006 | Pain 1 / decision usability | AC-001 |
| FR-008 | Pain 1 / UC-001 | AC-001, AC-002 |
| FR-009 | Pain 2 / UC-002 | AC-006 |
| FR-010 | hachi-adr handoff | AC-006 |
| FR-011 | Pain 3 / UC-003 | AC-003 |
| FR-012 | locale requirement | AC-005 |

## 20. 成功指標

- 80%以上のsample run reviewで、失敗原因候補が3つ以内に絞られる
- 80%以上のsample run reviewで、eval case候補が1つ以上出る
- 70%以上のsample run reviewで、workflow patch noteが実装者にとってactionableと評価される
- secret-like tokenを含むfixtureでprivacy warningが出る
- PRD/ADR writerがADR候補のdecision boundaryを再利用できる

## 21. リスク

- 失敗原因候補が浅く、単なるlog summaryになる
- vendor-specific trace形式の対応範囲が膨らむ
- hosted observability platformが同様のdiagnosis機能を実装する
- 機密情報をdurable artifactへ残してしまう
- eval case形式が曖昧で実装に使いにくい
- ADR candidateが複数判断を混ぜる

## 22. 前提

- ユーザーは最初のMVPでMarkdown run logまたはgeneric JSON traceを提供できる
- Skillの出力はMarkdown artifactとして保存・レビューされる
- 初期MVPでは自動trace ingestionをしない
- npm / JavaScript toolingを前提に将来CLI化できる
- root causeを断定するより、候補と次アクションを出すことに価値がある

## 23. 未解決の問い

- 最初に正式対応するtrace JSON shapeをどう定義するか
- redaction policyをflag-onlyにするか、default redactにするか
- eval case出力をMarkdownだけにするか、YAML blockも含めるか
- run review履歴との照合をMVPに含めるか
- outputを `factory/runs/` に保存する命名規則をどうするか

## 24. ADR候補

```yaml
adr_candidates:
  - title: "Agent Trace Lens MVPの内部run review schemaをどう定義するか"
    reason: "Markdown logとJSON traceの両方を同じfailure hypothesis / eval / patch / ADR候補に変換するため"
    urgency: high
    related_requirements: [FR-001, FR-002, FR-004, FR-005, FR-006]
    decision_needed_by: before_mvp
  - title: "run review artifactをどのlocal Markdown pathに保存するか"
    reason: "local-first handoff、Git diff、future agent reuseに影響するため"
    urgency: high
    related_requirements: [NFR-001, NFR-002, FR-010]
    decision_needed_by: before_mvp
  - title: "secret-like contentをflagするかredactするか"
    reason: "privacy warning、durable artifact、user trustに影響するため"
    urgency: high
    related_requirements: [FR-011, NFR-001]
    decision_needed_by: before_mvp
  - title: "vendor-specific trace adaptersをMVPに含めるか"
    reason: "scope、buildability、maintenance costに影響するため"
    urgency: medium
    related_requirements: [FR-002, NFR-006]
    decision_needed_by: before_release
```

## 25. 準備度判断

Decision: promote_to_adr

Reason:

- 対象ユーザー、痛み、最初の入力、最初の出力、非目標が明確
- operation-image use casesがあり、MVP要件へ変換できている
- 主要FRはpain / use case / concept constraintへtraceできる
- privacy / local-first / locale edge casesが明示されている
- 実装前に必要な設計判断がADR候補として分離されている

Recommended next skill: hachi-adr

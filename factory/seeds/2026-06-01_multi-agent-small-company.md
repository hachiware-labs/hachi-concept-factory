# hachi-sense SEEDレポート

## 対象範囲

- 注目領域: マルチAgent、自己改善型エージェント、スモールカンパニーを構成するエージェント
- 期間: 2025-12-01 to 2026-06-01
- ソース: arXiv, OpenAI / Google / Microsoft公式・準公式情報, GitHub Issues, Reddit, McKinsey, 小規模事業者向けAI運用記事
- 深さ: standard
- 出力ロケール: ja-JP
- 生成日: 2026-06-01

## 要約

今回の探索では、マルチAgent自体の需要よりも、「複数Agentを業務に入れた後の運用の痛み」が強く出ている。

観察された大きな流れは3つ。

1. マルチAgentは構築フレームワークが増えているが、状態、記憶、handoff、guardrail、デバッグの扱いが難しい。
2. 自己改善型エージェントは研究・実装が進んでいるが、改善の監査、再現性、スキル昇格基準、メモリ汚染が未成熟。
3. スモールカンパニーでは「AI社員」よりも、請求、フォローアップ、CRM更新、予定調整など、 founder / back-office の判断軽めな反復業務が現実的な導入点になっている。

判断として、hachiware-labs が狙いやすいのは「大規模なAgent実行基盤」そのものではなく、ローカルファーストで小さく導入できる `Agent workflow design / trace / seed-to-skill / SOP化` の周辺である。特に、非技術者や小規模チームが「業務手順をAgentableな形に分解し、失敗時に追跡し、改善を蓄積する」領域は、`hachi-concept-factory` と相性が良い。

## シグナル整理

### 観察された事実

- Agentic frameworkの研究では、CrewAIやAutoGenなどの現代的Agentic frameworkに特有の信頼性課題として、予期しない実行順序、設定無視、認知的コンテキスト管理、オーケストレーション障害が挙げられている。
- Multi-Agent AI Systemsの大規模研究では、8つの主要システム、42K超のcommit、4.7K超のresolved issuesが分析され、2023年以降Issue報告が急増したこと、テスト基盤・文書品質・保守性の改善が必要とされている。
- OpenAI Agents SDKは、MCP、Skills、AGENTS.md、shell、apply patch、snapshot / rehydrationなど、長時間・複数段階のAgent実行に必要な実行基盤を強化している。
- Google ADK / Gemini Enterprise Agent Platformは、multi-agent orchestration、graph-based workflows、persistent context、Agent Identity / Gateway / Registryなど、企業向けAgent運用の部品を前面に出している。
- GitHub Issuesでは、LangGraphに sub-agent stream visibility、parallel graph execution、checkpoint / persistence、cold-start performance などの論点が出ている。AutoGenでは cross-agent shared memory のRFCが出ている。
- Reddit上の実利用メモでは、6-agent pipelineが2-agent構成より遅く不安定、debugging storyがrough、共有状態・handoff・token cost・human-in-the-loopが実運用の詰まりとして語られている。
- 小規模事業者の実利用メモでは、請求書処理、CRM更新、フォローアップ、予定調整など、地味なback-office loopの自動化が最も効いている一方、複数業務を一度に自動化しようとすると半端に壊れるという声がある。

### 推測

- マルチAgentの次の痛みは「作れるか」ではなく「何が起きたか説明できるか」「どこで壊れたか追跡できるか」「安全に改善できるか」に移っている。
- 自己改善型Agentは、単なる自動プロンプト改善ではなく、改善候補をSkill、SOP、評価、証跡、再生可能な実行ログとして管理する必要がある。
- スモールカンパニー向けAgentは、汎用AI社員という表現よりも、業務手順を小さくAgentable化し、承認点と責任範囲を明示するほうが現実的。
- hachiware-labs の強みは、Agent実行基盤の正面競争よりも、SEED / Concept / PRD / ADR / Wiki とつながる「Agent導入前後の設計・観察・改善の文書化」にある。

### 判断

- すぐ `hachi-position` に渡せる候補は、SEED 1, 2, 3, 4。
- SEED 5, 6 は watch 寄りだが、hachiware-labs のプロセスMoatと相性が良い。
- SEED 7 は市場が広く、競合も多いため、単独プロダクトではなく他SEEDの補助機能として扱うのがよい。

## SEED候補

### SEED 1: マルチAgentの失敗原因が3ホップ前に埋もれる

- SEED ID: seed-20260601-001
- 課題: 複数Agentが状態やコンテキストを渡し合うと、最終出力の失敗原因がどのAgent、どのhandoff、どの状態変更にあったのか追えない。
- 影響を受けるユーザー: LangGraph / CrewAI / AutoGen / custom loop で業務Agentや開発Agentを運用する開発者、小規模チームの技術責任者。
- 根拠:
  - arXivのagentic framework bug研究は、予期しない実行順序、設定無視、認知的コンテキスト管理、オーケストレーション障害を特有の課題として整理している。https://arxiv.org/abs/2604.08906
  - Redditのmulti-agent debugging投稿では、bad context passing、hard-to-trace loops、どのAgentが悪い出力を引き起こしたか不明、debug logsが noisy という痛みが挙がっている。https://www.reddit.com/r/AI_Agents/comments/1stws79/people_building_multiagent_systems_whats_the/
  - LangGraph Issuesには、sub-agent stream visibility、parallel execution、checkpointなど実行状態・観測性に関わるIssueが並ぶ。https://github.com/langchain-ai/langgraph/issues
- 現在の回避策: 独自ログ、手書きtrace、LangSmith等の既存observability、実行ステップのconsole出力。
- スコア:
  - impact_score: 5
  - urgency_score: 4
  - novelty_score: 3
  - repeatability_score: 5
- 確度: high
- hachiware-labs適合性: 高い。Agentable設計、ローカルログ、PRD/ADRへの接続、開発者向けCLI/Skill化と相性が良い。
- 次アクション: position
- プロダクト仮説: `agent-trace-lens`。Agent実行ログを、handoff、state diff、tool call、human approval、final output へ分解し、失敗原因候補をSEED化するローカルCLI/Skill。

### SEED 2: 自己改善型Agentの改善が監査不能になる

- SEED ID: seed-20260601-002
- 課題: Agentが自己改善するほど、何が改善されたのか、なぜ昇格されたのか、再現できるのか、reward hackingやbehavioral driftが起きていないかが分からなくなる。
- 影響を受けるユーザー: 自己改善Agent、Skill生成、Agent memory、eval pipelineを扱う研究者・開発者・Agent platform運用者。
- 根拠:
  - ASG-SI論文は、deployed self-improving agentsの未解決課題として reward hacking、behavioral drift、opaque parameter updates を挙げ、auditable skill graph を提案している。https://arxiv.org/abs/2512.23760
  - CoEvoSkillsは、Skillは単一toolより複雑なmulti-file artifactであり、自動生成・自己進化には検証が必要だと述べている。https://arxiv.org/abs/2604.01687
  - Swarm Skillsは、multi-agent coordination protocolがフレームワーク内部コードや静的configに閉じており、共有・改善しにくいことを課題としている。https://arxiv.org/abs/2605.10052
- 現在の回避策: evalスクリプト、手動レビュー、Git diff、単発benchmark、prompt versioning。
- スコア:
  - impact_score: 5
  - urgency_score: 3
  - novelty_score: 5
  - repeatability_score: 4
- 確度: medium
- hachiware-labs適合性: 非常に高い。Skill、ADR、Wiki、履歴化、ローカルファースト、Agentable設計に直結する。
- 次アクション: position
- プロダクト仮説: `skill-evolution-audit`。Skill改善候補を、根拠trace、replay条件、昇格基準、却下理由、ADR候補として保存するSkill。

### SEED 3: Agent memory は便利だが、汚染・矛盾・忘却・プライバシーが怖い

- SEED ID: seed-20260601-003
- 課題: 長期記憶や共有memoryを導入すると、古い情報、矛盾、不要な個人情報、誤ったreflectionが後続行動に混入する。
- 影響を受けるユーザー: 長時間Agent、multi-session assistant、team memory、shared memory storeを運用する開発者。
- 根拠:
  - Agent memory surveyは、write-path filtering、contradiction handling、latency budgets、privacy governance、continual consolidation、trustworthy reflectionなどを未解決課題として挙げている。https://arxiv.org/abs/2603.07670
  - Microsoft AutoGen Issuesには cross-agent shared memory store with agent/group/global scopes のRFCが出ている。https://github.com/microsoft/autogen/issues
  - OpenAI Agents SDKは、snapshotting and rehydration によるdurable executionを打ち出している。https://openai.com/index/the-next-evolution-of-the-agents-sdk/
- 現在の回避策: vector DB、手動memory pruning、session summary、project notes、AGENTS.md。
- スコア:
  - impact_score: 5
  - urgency_score: 4
  - novelty_score: 4
  - repeatability_score: 4
- 確度: high
- hachiware-labs適合性: 高い。wiki-garden、ローカル知識ベース、Agentable memory policy、ADR化と接続できる。
- 次アクション: position
- プロダクト仮説: `memory-garden-lint`。Agent memoryを「事実 / 推測 / 判断 / 期限切れ / 個人情報 / 矛盾」に分けてlintし、WikiやSEEDへ戻す。

### SEED 4: スモールカンパニーはAI社員より先に「founder back-office loop」を描けていない

- SEED ID: seed-20260601-004
- 課題: 小規模事業者は、請求、商談後フォロー、CRM更新、議事録、予定調整などの反復業務に困っているが、そもそも手順がend-to-endで描かれていないためAgent化できない。
- 影響を受けるユーザー: 1-10人規模のコンサル、受託、士業、EC、サービス業の創業者・事務担当。
- 根拠:
  - RedditのUK SME実利用メモでは、solo / boutique firms が invoicing after a call、follow-up、CRM updates、weekly pipeline email などで週10-15時間を失っているという観察がある。https://www.reddit.com/r/AiForBusinessesUK/comments/1t3gxrx/whats_actually_working_with_ai_in_uk_smes_in_2026/
  - 小規模事業者の実利用メモでは、invoiceの読み取り、分類、spreadsheet入力、net30 reminderのloopが週6時間から20分程度のreviewへ減ったとされる一方、最初は1つのworkflowを固めるべきだと述べられている。https://www.reddit.com/r/AiForSmallBusiness/comments/1rv7cf4/anyone_here_using_ai_employees_in_their_small/
  - McKinseyはagentic organizationの論点として、workflow、roles、skills、cultureの再設計を挙げ、小規模事業者や個人が自分のAgentを持つ可能性にも触れている。https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/ai-is-everywhere-the-agentic-organization-isnt-yet
- 現在の回避策: Make/Zapier/n8n、スプレッドシート、手作業、ChatGPTへの都度依頼、業務委託。
- スコア:
  - impact_score: 4
  - urgency_score: 4
  - novelty_score: 3
  - repeatability_score: 5
- 確度: medium
- hachiware-labs適合性: 高い。日本語業務文脈、SOP、Wiki、Skill化、スモール導入に合う。
- 次アクション: position
- プロダクト仮説: `founder-loop-mapper`。自然言語で業務の愚痴を入力すると、Agentable SOP、承認点、入力/出力、失敗時処理、最初の1ワークフローMVPへ分解するSkill。

### SEED 5: Agentの数を増やすほど速くなるとは限らない

- SEED ID: seed-20260601-005
- 課題: 役割Agentを増やすと、handoff cost、context passing、retry path、token spend、state drift が増え、2-agent構成より遅く不安定になることがある。
- 影響を受けるユーザー: multi-agent architectureを設計する開発者、AI agent consultant、AI導入支援者。
- 根拠:
  - Reddit実利用投稿では、6-agent pipelineが2-agent構成より遅く不安定になり、failure mid-workflow、HITL、token costが課題として挙げられている。https://www.reddit.com/r/AI_Agents/comments/1t7k4co/at_what_point_does_adding_another_agent_actually/
  - LangGraph Issuesには cold-start tax や parallel graph execution など性能・並列実行に関するIssueが見える。https://github.com/langchain-ai/langgraph/issues
  - Google ADKは、multi-agent orchestrationやperformance evaluationを明示的な機能領域として掲げている。https://adk.dev/
- 現在の回避策: 経験則でAgent数を減らす、pipelineに戻す、planner/executor/reviewer程度に絞る、独自benchmark。
- スコア:
  - impact_score: 4
  - urgency_score: 3
  - novelty_score: 3
  - repeatability_score: 4
- 確度: medium
- hachiware-labs適合性: 中から高。Agent設計レビューSkill、PRD/ADR候補抽出に接続できる。
- 次アクション: watch
- プロダクト仮説: `agent-topology-review`。Agent構成案を読み、不要なAgent、曖昧なhandoff、共有状態リスク、HITL不足、token/costリスクをレビューする。

### SEED 6: Agent guardrail は workflow boundary を越えると抜け漏れが出る

- SEED ID: seed-20260601-006
- 課題: Agent単位、tool単位、handoff単位でguardrailの適用範囲が異なり、開発者が「どの呼び出しに何の制約が効いているか」を誤解しやすい。
- 影響を受けるユーザー: customer-facing agent、browser / shell / API tool を使うAgentを運用する開発者・管理者。
- 根拠:
  - OpenAI Agents SDKのguardrails docsは、input guardrailsはchainの最初、output guardrailsはfinal output、tool guardrailsはfunction-tool invocationに適用される一方、handoffは通常のfunction-tool pipelineではないと説明している。https://openai.github.io/openai-agents-js/guides/guardrails/
  - Google Gemini Enterprise Agent Platformは、Agent Identity、Agent Gateway、Agent Registryでagent identity trackingとguardrail enforcementを扱うと報じられている。https://www.itpro.com/technology/artificial-intelligence/google-expands-gemini-enterprise-consolidates-vertex-ai-services-to-simplify-agent-deployment
- 現在の回避策: 手動チェックリスト、各SDK固有のguardrail設定、API gateway、human approval。
- スコア:
  - impact_score: 5
  - urgency_score: 4
  - novelty_score: 3
  - repeatability_score: 4
- 確度: medium
- hachiware-labs適合性: 中。大手platformと競合しやすいが、ローカル設計レビュー、ADR生成、開発者向けチェックリストなら勝ち筋がある。
- 次アクション: watch
- プロダクト仮説: `agent-guardrail-map`。Agent workflow定義から、guardrail適用箇所、未保護handoff、高リスクtool、human approval候補を可視化する。

### SEED 7: Agentic organization は大企業用語だが、小規模チームには「役割の再設計」が不足している

- SEED ID: seed-20260601-007
- 課題: AI agent導入はツール追加ではなく、誰が判断し、誰が承認し、Agentがどこまで実行し、失敗時に誰が戻すかという役割設計を必要とする。しかし小規模チームにはそれを整理する軽量な型がない。
- 影響を受けるユーザー: 小規模会社の創業者、COO、PM、AI導入担当、業務改善担当。
- 根拠:
  - McKinseyはagentic organizationを、workflow、leadership roles、skills、cultureの再設計として扱っている。https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/ai-is-everywhere-the-agentic-organization-isnt-yet
  - 小規模事業者向けReddit投稿では、AI社員よりも「1つのworkflowを固めてから広げる」ことが実用上のコツとして語られている。https://www.reddit.com/r/AiForSmallBusiness/comments/1rv7cf4/anyone_here_using_ai_employees_in_their_small/
- 現在の回避策: コンサル、Notion/SOP、Zapier/Make/n8nのフロー、手動レビュー。
- スコア:
  - impact_score: 4
  - urgency_score: 3
  - novelty_score: 3
  - repeatability_score: 4
- 確度: medium
- hachiware-labs適合性: 高い。日本語業務文脈、PRD/ADR/Wiki接続、Skill群として展開しやすい。
- 次アクション: watch
- プロダクト仮説: `small-company-agent-org-chart`。人間とAgentの役割、承認、責任、handoff、SOPを小さな組織図として出力する。

## 推奨される次のステップ

最初に `hachi-position` へ渡すなら、以下の順がよい。

1. seed-20260601-001: マルチAgentの失敗原因が3ホップ前に埋もれる
2. seed-20260601-004: スモールカンパニーはAI社員より先に founder back-office loop を描けていない
3. seed-20260601-002: 自己改善型Agentの改善が監査不能になる
4. seed-20260601-003: Agent memory は便利だが、汚染・矛盾・忘却・プライバシーが怖い

この4つは相互に接続できる。

```text
founder / small company workflow pain
  -> Agentable SOP
  -> multi-agent execution
  -> trace and failure analysis
  -> memory / skill improvement
  -> audited reusable skill
  -> back to SEED / Concept / PRD / ADR
```

次の実験としては、`seed-20260601-004` を具体的な小規模会社の1業務に落とし込み、`hachi-position` で競合とMoatを見るのがよい。理由は、抽象的なAgent基盤よりもユーザーの痛みが近く、hachiware-labsの日本語・ローカル・Skill・Wiki接続の強みを出しやすいため。

## 根拠トレース

- Dissecting Bug Triggers and Failure Modes in Modern Agentic Frameworks: https://arxiv.org/abs/2604.08906
- A Large-Scale Study on the Development and Issues of Multi-Agent AI Systems: https://arxiv.org/abs/2601.07136
- Memory for Autonomous LLM Agents: https://arxiv.org/abs/2603.07670
- Audited Skill-Graph Self-Improvement: https://arxiv.org/abs/2512.23760
- CoEvoSkills: https://arxiv.org/abs/2604.01687
- Swarm Skills: https://arxiv.org/abs/2605.10052
- OpenAI Agents SDK evolution: https://openai.com/index/the-next-evolution-of-the-agents-sdk/
- OpenAI Agents SDK guardrails: https://openai.github.io/openai-agents-js/guides/guardrails/
- Google ADK: https://adk.dev/
- Google Gemini Enterprise Agent Platform coverage: https://www.itpro.com/technology/artificial-intelligence/google-expands-gemini-enterprise-consolidates-vertex-ai-services-to-simplify-agent-deployment
- LangGraph Issues: https://github.com/langchain-ai/langgraph/issues
- Microsoft AutoGen Issues: https://github.com/microsoft/autogen/issues
- Multi-agent debugging Reddit thread: https://www.reddit.com/r/AI_Agents/comments/1stws79/people_building_multiagent_systems_whats_the/
- Multi-agent count / reliability Reddit thread: https://www.reddit.com/r/AI_Agents/comments/1t7k4co/at_what_point_does_adding_another_agent_actually/
- UK SME AI workflow Reddit thread: https://www.reddit.com/r/AiForBusinessesUK/comments/1t3gxrx/whats_actually_working_with_ai_in_uk_smes_in_2026/
- Small business AI employee Reddit thread: https://www.reddit.com/r/AiForSmallBusiness/comments/1rv7cf4/anyone_here_using_ai_employees_in_their_small/
- McKinsey agentic organizations: https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/ai-is-everywhere-the-agentic-organization-isnt-yet

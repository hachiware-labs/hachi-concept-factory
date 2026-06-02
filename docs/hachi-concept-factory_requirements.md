# hachi-concept-factory 要件定義

## 1. 概要

`hachi-concept-factory` は、hachiware-labs が提供する Vercel Skills でインストール可能な一連の Skill 群である。

ユーザーの困りごと、違和感、要望、現場の不満、未整理のアイデアを `SEED` として蓄積し、それらを市場性・差別化・Moat・実現性の観点で磨き、製品コンセプト、PRD、ADRへ落とし込む。

単発のアイデア生成ではなく、継続的にSEEDを蓄え、過去のSEED、過去のコンセプト、GitHubリポジトリ、README、Issue、既存OSS、競合製品、大手ベンダー動向を参照しながら、再利用可能なプロダクト発見・仕様化・設計判断の流れを作る。

## 2. 全体コンセプト

### 2.1 一言説明

`hachi-concept-factory` は、ユーザーの困りごとのSEEDを蓄え、製品コンセプト、PRD、ADRへ育てる Vercel Skills 群である。

### 2.2 英語説明

Vercel Skills for turning user pain seeds into product concepts, PRDs, and ADRs.

### 2.3 基本思想

`hachi-concept-factory` は、PRDやADRから始めない。  
最初に扱うのは、まだ要求にも仕様にもなっていない、ユーザーの困りごとの兆しである。

```text
SEED
  ↓
Positioning
  ↓
Concept
  ↓
PRD
  ↓
ADR
```

各段階で得られた学び、却下理由、未成熟な案、追加の疑問、競合情報、Moat候補は、必要に応じて再びSEEDとして蓄積される。

```text
collect SEED
  → position
  → concept
  → PRD
  → ADR
  → learnings / rejected ideas / unresolved needs
  → back to SEED
```

## 3. Skill構成

`hachi-concept-factory` は、以下の5つのSkillで構成される。

```text
hachi-concept-factory
  1. hachi-sense
  2. hachi-position
  3. hachi-concept
  4. hachi-prd
  5. hachi-adr
```

| Skill | 役割 | 主な成果物 |
|---|---|---|
| `hachi-sense` | 困りごと・違和感・兆しを集める | SEED |
| `hachi-position` | 市場・競合・差別化・Moat・勝ち筋を整理する | Positioning Brief |
| `hachi-concept` | 製品コンセプトを抽出・統合・洗練する | Concept Brief |
| `hachi-prd` | コンセプトを要件、MVP、受け入れ基準に落とす | PRD |
| `hachi-adr` | PRDを実現するための設計判断を記録する | ADR |

## 4. 共通要件

### 4.1 Vercel Skillsとしての提供

各Skillは、Vercel Skillsとしてインストール可能な構成にする。

想定構成:

```text
hachi-concept-factory/
  README.md
  skills/
    hachi-sense/
      SKILL.md
      references/
      examples/

    hachi-position/
      SKILL.md
      references/
      examples/

    hachi-concept/
      SKILL.md
      references/
      examples/

    hachi-prd/
      SKILL.md
      references/
      examples/

    hachi-adr/
      SKILL.md
      references/
      examples/
```

### 4.2 出力ロケール要件

すべてのSkillは、ユーザーの入力言語・明示されたロケール指定に従って出力する。

基本ルール:

- ユーザーが日本語で依頼した場合、出力は日本語にする
- ユーザーが英語で依頼した場合、出力は英語にする
- ユーザーが明示的に「英語で」「日本語で」などと指定した場合、その指定を優先する
- 調査対象ソースの言語と、出力言語は分離して扱う
- 英語ソースを読んだ場合でも、日本語で依頼されていれば日本語で要約・分析する
- 原文引用が必要な場合は、原文を短く引用し、要約・解釈は出力ロケールに合わせる

スキーマ例:

```yaml
locale:
  requested: "ja-JP"
  detected_user_language: "ja"
  output_language: "ja"
  source_languages:
    - "ja"
    - "en"
```

### 4.3 事実・推測・判断の分離

各Skillは、以下を明確に分けて記述する。

- 観察された事実
- ソースからの要約
- 推測
- 評価
- 判断
- 次アクション

### 4.4 根拠重視

調査や判断には、可能な限り根拠を付与する。

根拠として扱うもの:

- URL
- GitHubリポジトリ
- Issue
- README
- ドキュメント
- レビュー
- 投稿
- 公式リリース
- ユーザー提供メモ
- 会話ログ
- 過去のSEED / Concept / PRD / ADR

### 4.5 hachiware-labs適合性

各Skillは、hachiware-labs の強みとの適合を評価する。

主な強み:

- AIエージェント開発支援
- ローカルファースト
- CLI / Skill / OSS
- PRD / ADR / Wiki / Deck への接続
- 日本語・国内業務文脈
- TPS / フロー / Agentable設計
- 小さく導入できる開発者向けツール

## 5. hachi-sense 要件

## 5.1 概要

`hachi-sense` は、`hachi-concept-factory` の第1段階である。

ユーザーが指定した注目領域、期間、関心テーマに基づき、X、はてなブックマーク、Reddit、Hacker News、GitHub Issues、Product Hunt、レビューサイト、求人、公式リリース、技術ブログなどから、ユーザーの困りごと・違和感・不満・回避策・新しい需要の兆しを収集し、`SEED` として構造化する。

### 5.2 目的

- ユーザーの困りごとや不満の兆しを継続的に収集する
- 注目領域ごとにSEEDを蓄積する
- 一時的なバズと、継続的な課題を分けて扱う
- 後続工程で分析可能な構造化データにする
- 「ネタ探し」「タネ探し」を短い指示で実行できるようにする
- ユーザーが指定した期間、領域、ソース種別に基づいて調査する
- 収集したSEEDに、根拠、鮮度、頻度、影響範囲、確度を付与する

### 5.3 ショートハンド

```text
{topic}のタネを探して
{topic}のネタを探して
{topic}で困っていることを集めて
{topic}周辺の兆しを拾って
{topic}でプロダクトになりそうな不満を探して
{topic}のSEEDを集めて
```

### 5.4 入力

```yaml
focus_area: ""
period: "last_7_days | last_30_days | last_3_months | custom"
start_date: "YYYY-MM-DD"
end_date: "YYYY-MM-DD"
sources:
  - x
  - hatena_bookmark
  - reddit
  - hacker_news
  - github_issues
  - github_discussions
  - stack_overflow
  - product_hunt
  - g2
  - capterra
  - chrome_web_store
  - vscode_marketplace
  - app_store
  - google_play
  - google_trends
  - search_suggestions
  - jobs
  - official_release_notes
  - technical_blogs
language:
  - ja
  - en
depth: quick | standard | deep
max_seeds: 10
output_format: markdown | yaml | json
```

### 5.5 デフォルト値

```yaml
period: "last_30_days"
sources:
  - x
  - hatena_bookmark
  - reddit
  - hacker_news
  - github_issues
  - product_hunt
  - official_release_notes
language:
  - ja
  - en
depth: standard
max_seeds: 10
output_format: markdown
```

### 5.6 調査対象ソース

#### Social Trend Sources

- X
- はてなブックマーク
- Reddit
- Hacker News
- Zenn
- Qiita
- note

#### Developer Pain Sources

- GitHub Issues
- GitHub Discussions
- Stack Overflow
- OSS Discussions
- Discord / Slack community logs, if user provides access or export

#### Product and Market Sources

- Product Hunt
- GitHub Trending
- Show HN
- Launch HN
- Indie Hackers
- Chrome Web Store
- VS Code Marketplace
- App Store
- Google Play
- G2
- Capterra

#### Demand Sources

- Google Trends
- 検索サジェスト
- LinkedIn Jobs
- Indeed
- Wantedly
- Green
- 企業採用ページ
- カンファレンス採択テーマ

#### Change Sources

- OpenAI release notes
- Anthropic release notes
- GitHub release notes
- Vercel release notes
- Google / Microsoft / AWS / Cloudflare release notes
- 主要OSSのrelease notes
- arXiv
- Papers with Code
- 標準化団体、法規制、クラウド料金変更

### 5.7 SEED定義

`SEED` は、製品コンセプトに発展する可能性のある観察単位である。

SEEDは、以下のいずれかを含む。

- ユーザーの不満
- 繰り返される質問
- 既存ツールへの低評価
- 回避策
- 未充足ニーズ
- 導入や運用の詰まり
- 新しい技術変化
- 新しい規制や制約
- 急増する求人需要
- 話題化しているがまだ解決が弱いテーマ
- 複数ソースで同時に現れている違和感

### 5.8 SEEDスキーマ

```yaml
seed_id: "seed-YYYYMMDD-001"
title: ""
focus_area: ""
source_type: ""
source_name: ""
source_url: ""
observed_at: "YYYY-MM-DD"
period:
  start: "YYYY-MM-DD"
  end: "YYYY-MM-DD"
raw_signal: ""
pain_summary: ""
affected_user: ""
context: ""
current_workaround: ""
emotion:
  - frustration
  - confusion
  - urgency
  - curiosity
  - excitement
frequency_hint: one_off | repeated | rising | unknown
market_hint: ""
competitor_hint: ""
change_hint: ""
evidence:
  - source_url: ""
    quote_or_summary: ""
    observed_at: ""
confidence: low | medium | high
impact_score: 1-5
urgency_score: 1-5
novelty_score: 1-5
repeatability_score: 1-5
monetization_hint: low | medium | high | unknown
next_action: watch | position | merge | discard
notes: ""
```

### 5.9 SEED評価

- Impact
- Urgency
- Novelty
- Repeatability

### 5.10 出力

```markdown
# hachi-sense SEED Report

## Scope
- Focus area:
- Period:
- Sources:
- Depth:
- Output locale:

## Executive Summary
...

## SEED Candidates

### SEED 1: ...
- Pain:
- Affected user:
- Evidence:
- Current workaround:
- Scores:
- Confidence:
- Next action:

## Recommended Next Step
...
```

### 5.11 非目標

`hachi-sense` は以下を目的としない。

- PRDを完成させること
- ADRを作成すること
- 市場規模を厳密に算出すること
- 競合分析を完成させること
- 実装方針を決めること
- 最終的なプロダクトコンセプトを確定すること

## 6. hachi-position 要件

## 6.1 概要

`hachi-position` は、`hachi-concept-factory` の第2段階である。

`hachi-sense` によって収集されたSEED、すなわちユーザーの困りごと、違和感、不満、回避策、未充足ニーズをもとに、製品仮説としてのポジショニング案を検討する。

目的は、単に市場調査を行うことではない。  
困りごとの背景、対象ユーザー、既存解決策、大手ベンダーの製品動向、競合OSS、商用SaaS、技術トレンド、導入障壁、Moat候補を確認し、そのSEEDが独自性ある製品コンセプトへ進める価値があるかを判断する。

### 6.2 目的

- SEEDから製品仮説を立てる
- 困りごとの対象ユーザーを明確にする
- 既存解決策と未充足領域を整理する
- 大手ベンダーの製品動向から見て、参入余地があるか判断する
- 競合OSSや周辺ツールの有無を確認する
- 差別化軸を仮説として定義する
- Moat候補を分析する
- 作るべきでない領域を見極める
- `hachi-concept` に渡す価値のあるポジショニング案を作る

### 6.3 ショートハンド

```text
このSEEDのポジションを見て
このネタの勝ち筋を見て
この案、大手ベンダーに潰されそうか見て
この領域のOSS競合を見て
この困りごとを製品仮説にして
この案のMoatを見て
```

### 6.4 調査観点

#### Pain-to-Product Fit

- 誰が困っているか
- 困りごとは頻繁に起きるか
- 現在はどう回避しているか
- 解決された場合の価値は明確か
- お金または時間を払って解決したい問題か

#### Target User

- 主な利用者は誰か
- 購入者と利用者は同じか
- 個人開発者向けか
- チーム向けか
- 企業向けか
- 管理者向けか
- 初心者向けか熟練者向けか
- 既存ワークフローのどこに入るか

#### Existing Alternatives

- 大手ベンダー製品
- 商用SaaS
- OSS
- CLIツール
- IDE拡張
- GitHub Actions / CI系
- Notion / Slack / Jira / Linear
- 手作業・スプレッドシート・自作スクリプト

#### Big Vendor Direction

確認対象例:

- OpenAI
- Anthropic
- Google
- Microsoft
- GitHub
- Vercel
- AWS
- Cloudflare
- Atlassian
- Notion
- Linear
- Figma
- Datadog
- JetBrains
- Docker

判断観点:

- 大手の既存製品と真正面から競合するか
- 大手のロードマップに吸収されやすい領域か
- プラットフォーム機能として提供されやすいか
- 大手製品の周辺ツールとして成立するか
- 大手が重視しにくいニッチがあるか
- 大手が扱いづらいローカル、オンプレ、個人開発、国内文脈、軽量性、透明性、カスタマイズ性があるか

#### OSS Competition

- 類似OSSがあるか
- GitHub stars、更新頻度、Issue数、PR状況
- 導入の容易さ
- ドキュメント品質
- ライセンス
- 拡張性
- コミュニティの活発さ
- 既存OSSで解決しきれない不満は何か

#### Differentiation

差別化軸の例:

- 軽量である
- ローカルファーストである
- Agent向けに最適化されている
- 日本語・国内業務に強い
- OSSとして透明性がある
- 既存ツールを置き換えず補完する
- PRD/ADR/README/Issueなど成果物までつながる
- 人間とAgentの協働プロセスを扱う
- 大手が狙いにくい小さな摩擦に集中する

#### Moat Analysis

`hachi-position` は、製品仮説ごとにMoat候補を分析する。

Moatは、現時点で強固な参入障壁である必要はない。  
ただし、継続利用によって強くなる要素、ユーザー文脈の蓄積、ワークフローへの定着、データ・知識の蓄積、統合関係、コミュニティ、ローカル/日本語/Agentableなどの独自性を評価する。

Moat候補:

- Workflow Moat
- Data Moat
- Context Moat
- Integration Moat
- Community Moat
- Local-first Moat
- Japanese-context Moat
- Process Moat
- Taste Moat
- Agentable Moat

出力項目:

```markdown
## Moat Analysis

### Moat Candidates
- Workflow moat:
- Context moat:
- Data moat:
- Integration moat:
- Community moat:
- Local-first moat:
- Japanese-context moat:
- Agentable moat:

### Moat Strength
- weak
- medium
- strong

### Why this moat may compound
...

### Why this moat may fail
...

### How competitors could copy this
...

### How big vendors could absorb this
...

### Recommended moat to strengthen
...
```

#### Wedge

- 最初のユーザーは誰か
- どの1つの困りごとに絞るか
- 既存ワークフローのどこに差し込むか
- 最初に出すべきMVPは何か
- CLI、Skill、Web UI、GitHub Action、VS Code拡張のどれがよいか

### 6.5 スコアリング

- Pain-to-Product Fit
- Differentiation
- Vendor Risk
- OSS Competition Risk
- Wedge Clarity
- Buildability
- Moat Score

### 6.6 出力

```markdown
# hachi-position Report

## 1. Scope
- Source SEED:
- Focus area:
- Period:
- Sources:
- Output locale:

## 2. Product Hypothesis
### Hypothesis
...

### Target User
...

### Pain
...

### Proposed Product Category
...

### Job-to-be-Done
When ..., I want to ..., so that ...

## 3. Market and Vendor Landscape
### Big Vendor Direction
...

### Commercial Alternatives
...

### OSS Alternatives
...

### Manual Workarounds
...

## 4. Differentiation Analysis
...

## 5. Moat Analysis
...

## 6. Positioning Options
...

## 7. Recommendation
Decision:
- promote_to_concept
- watch
- merge
- discard

## 8. Scores
...

## 9. Next Step
...
```

### 6.7 非目標

`hachi-position` は以下を目的としない。

- 最終的な製品コンセプトを完成させること
- PRDを作成すること
- ADRを作成すること
- 詳細な事業計画を作ること
- 精密な市場規模推定を行うこと
- 実装方式を確定すること
- ブランド名やUIデザインを決めること

## 7. hachi-concept 要件

## 7.1 概要

`hachi-concept` は、`hachi-concept-factory` の第3段階である。

`hachi-sense` で収集したSEED、`hachi-position` で作成したPositioning Brief、GitHubリポジトリ、README、Issue、既存コード、過去のコンセプトメモ、会話ログなどを入力として、製品コンセプト案を抽出・統合・洗練する。

### 7.2 目的

- Positioning Briefから製品コンセプトを作成する
- GitHubリポジトリやライブラリから潜在的なコンセプト案を抽出する
- 過去のコンセプト案を再評価し、洗練する
- 複数のSEEDやPositioningを統合して、より強いコンセプトにする
- コンセプトの対象ユーザー、提供価値、差別化、MVP方向性を明確化する
- Moatを製品コンセプトの芯として組み込む
- 後続の `hachi-prd` に渡せる Concept Brief を作成する
- 未成熟なコンセプトを捨てず、再検討可能な状態で保存する

### 7.3 3つのモード

#### extract mode

GitHubリポジトリ、README、docs、Issue、Discussion、コード構造、examples、CLI help、package description、過去メモ、会話ログから、まだ言語化されていない製品コンセプトを抽出する。

例:

```text
このGitHubリポジトリから、製品コンセプト案を抽出して
このライブラリが本当は何を解決しようとしているのか、コンセプトとして整理して
このREADMEから、hachi-concept用のConcept Briefを作って
```

#### refine mode

既存のコンセプト案を磨く。

例:

```text
このコンセプトをもっと鋭くして
この案をPRDに進められるレベルまで磨いて
対象ユーザーと差別化をもっと明確にして
```

#### synthesize mode

複数のSEED、Positioning、過去案を統合し、より強いコンセプトを作る。

例:

```text
この3つのSEEDを統合して、1つの製品コンセプトにして
過去のコンセプトと今回のSEEDを合わせて、より強い案にして
hachiware-labsらしい形に再構成して
```

### 7.4 GitHubリポジトリからのコンセプト抽出

確認対象:

- README
- package description
- docs
- examples
- CLI usage
- API surface
- directory structure
- Issue / Discussion
- Release notes
- test examples
- configuration files
- AGENTS.md / CLAUDE.md / SKILL.md などのAgent向け文書

抽出観点:

- このライブラリは何を可能にしているか
- どのユーザーの困りごとを解いているか
- READMEに書かれている表向きの価値
- コード構造から見える実際の価値
- examplesから見える利用シーン
- Issueから見える未解決の困りごと
- 競合や代替手段に対する差分
- OSSとしての強み
- 製品化した場合の対象ユーザー
- Skill化、CLI化、SaaS化、UI化の可能性
- hachiware-labsの他プロジェクトとの接続可能性

### 7.5 Concept Moat

`hachi-concept` は、Positioningで見つかったMoat候補を、製品コンセプトの中核価値としてどう組み込むかを検討する。

重視する観点:

- 単なる機能差ではなく、使い続けるほど価値が増えるか
- SEED、PRD、ADR、Wiki、Deckなどの蓄積が価値になるか
- ワークフローに自然に組み込めるか
- 大手やOSSに真似されても残る文脈・使い心地・蓄積があるか
- hachiware-labsらしい軽量性、ローカル性、Agentable性、日本語文脈があるか

### 7.6 Concept Brief スキーマ

```yaml
concept:
  concept_id: "concept-YYYYMMDD-001"
  title: ""
  one_liner: ""
  tagline: ""
  source:
    seeds: []
    positioning_briefs: []
    repositories: []
    past_concepts: []
  target_user: ""
  target_context: ""
  pain: ""
  current_alternatives: []
  proposed_solution: ""
  product_form: ""
  core_value: ""
  differentiation:
    primary: ""
    secondary: []
  moat:
    type:
      - workflow
      - context
      - data
      - integration
      - community
      - local_first
      - japanese_context
      - process
      - agentable
    description: ""
    how_it_compounds: ""
    how_to_strengthen: ""
  wedge: ""
  mvp_direction: ""
  non_goals: []
  user_story:
    - "As a ..., I want ..., so that ..."
  key_use_cases: []
  success_signals: []
  risks: []
  assumptions: []
  open_questions: []
  prd_readiness: low | medium | high
  next_action: promote_to_prd | refine | merge | watch | discard
  output_locale: ""
```

### 7.7 コンセプト品質ルーブリック

- Clarity
- Pain Alignment
- Differentiation
- Moat Strength
- Wedge
- PRD Readiness

### 7.8 出力

```markdown
# hachi-concept Concept Brief

## 1. Scope
- Input:
- Mode:
- Output locale:

## 2. Concept Summary
- Title:
- One-liner:
- Tagline:
- Target user:
- Product form:

## 3. Pain and Context
...

## 4. Proposed Concept
...

## 5. Differentiation
...

## 6. Moat
...

## 7. Wedge and MVP Direction
...

## 8. Evidence and Source Trace
...

## 9. Risks and Assumptions
...

## 10. PRD Readiness
...

## 11. Recommendation
Decision:
- promote_to_prd
- refine
- merge
- watch
- discard

Next step:
...
```

### 7.9 非目標

`hachi-concept` は以下を目的としない。

- PRDを完成させること
- ADRを作成すること
- 詳細な市場調査を行うこと
- 最終的な実装方式を決めること
- 詳細なUI設計を行うこと
- ブランド名を確定すること
- 事業計画を完成させること

## 8. hachi-prd 要件

## 8.1 概要

`hachi-prd` は、`hachi-concept-factory` の第4段階である。

`hachi-concept` で作成されたConcept Briefを入力として、製品・機能・Skill・ライブラリ・CLI・Webアプリなどを実装可能なPRDへ落とし込む。

PRDは「何を、誰のために、なぜ作るか」を定義する文書である。  
実装方式の詳細や技術選定は、必要最低限の制約として扱い、最終的な設計判断は `hachi-adr` に渡す。

### 8.2 目的

- コンセプトを実装可能な要件に変換する
- 対象ユーザー、課題、価値、MVPを明確にする
- 対象ユーザーを詳細に分析し、誰が、どの文脈で、何に詰まり、何を得ると価値を感じるかを描き切る
- ペインポイントを抽象的な不満ではなく、発生場面、トリガー、現在の回避策、失敗時の影響、頻度、感情、支払い意欲まで含めて具体化する
- ユースケースを、ユーザーの操作イメージ、入力、画面またはCLI/Skill上の行動、出力、次アクションまで含めて記述する
- 機能要件と非機能要件を整理する
- 受け入れ基準を明確にする
- 非目標を明示し、スコープ肥大を防ぐ
- 後続のADRで検討すべき設計判断候補を抽出する
- Agentや開発者が実装タスクへ分解できる粒度にする

### 8.2.1 ユーザー分析・ペインポイント・ユースケース描写方針

`hachi-prd` は、ユーザーを粗い属性だけで扱わない。

PRDでは、以下を徹底して書く。

- Primary user, secondary user, buyer, approver, operator を分ける
- ユーザーの業務文脈、利用環境、技術レベル、既存ワークフロー、制約、成功条件を具体化する
- 誰が実際に操作し、誰が結果を読むかを分ける
- 利用前、利用中、利用後の状態変化を描く
- ペインポイントを「困っている」ではなく、「いつ、どこで、何が詰まり、何が失敗し、どんな損失が出るか」として書く
- ユースケースは `As a ...` だけで終わらせず、操作イメージまで書く
- 主要ユースケースごとに、入力、ユーザー操作、システム反応、出力、成功状態、失敗時の扱いを記述する
- 初回利用と継続利用を分ける
- hachi-concept の `Signature Workflow` を、PRDでは具体的なユースケースと受け入れ基準へ展開する

ユーザー分析は、少なくとも以下の形式で出す。

```markdown
## User Analysis

### Primary User
- Role:
- Context:
- Current workflow:
- Technical level:
- Constraints:
- Success condition:
- Failure consequence:

### Secondary Users / Stakeholders
- Reader:
- Approver:
- Operator:
- Maintainer:

### User Journey
- Before:
- Trigger:
- During:
- After:
- Repeated use:
```

ペインポイントは、少なくとも以下の形式で出す。

```markdown
## Pain Points

### Pain 1: ...
- Situation:
- Trigger:
- Current workaround:
- Why existing alternatives fail:
- Frequency:
- Severity:
- Emotional tone:
- Business / workflow impact:
- Willingness to pay or adopt:
- Evidence:
```

ユースケースは、少なくとも以下の形式で出す。

```markdown
## Use Cases and Operation Image

### Use Case 1: ...
- Actor:
- Goal:
- Preconditions:
- Input:
- User operation:
- System behavior:
- Output:
- Next action:
- Success state:
- Failure / edge cases:
- Acceptance criteria:
```

### 8.3 ショートハンド

```text
このコンセプトをPRDにして
このConcept BriefからPRDを作って
この案をMVP前提のPRDに落として
実装に進められるPRDにして
hachi-prd形式でまとめて
```

### 8.4 入力

```yaml
input:
  concept_brief:
    concept_id: ""
    title: ""
    one_liner: ""
    target_user: ""
    pain: ""
    proposed_solution: ""
    product_form: ""
    differentiation: {}
    moat: {}
    wedge: ""
    mvp_direction: ""
    risks: []
    assumptions: []
    open_questions: []
  constraints:
    platform: ""
    runtime: ""
    distribution: "Vercel Skill | CLI | library | web_app | desktop_app | SaaS | OSS"
    locale: ""
    priority: "mvp | standard | full"
```

### 8.5 PRDに記載すること

`hachi-prd` は、以下をPRDに記載する。

#### 1. Document Metadata

- PRD ID
- タイトル
- 作成日
- ステータス
- 対象バージョン
- 入力元Concept Brief
- 出力ロケール
- 作成者またはSkill名

#### 2. Summary

- 一言説明
- このPRDで定義するもの
- このPRDで定義しないもの

#### 3. Background

- どのSEEDや困りごとから生まれたか
- どのPositioningやConceptに基づくか
- なぜ今作るのか
- 既存の回避策や代替手段

#### 4. Problem Statement

- 対象ユーザーが抱える具体的な困りごと
- 現状の問題
- 放置した場合の影響
- なぜ既存手段では不足するのか
- ペインが発生する具体的な場面
- ペインのトリガー
- ペインの頻度、深刻度、感情的負荷
- 時間、品質、売上、信頼、運用負荷への影響
- 既存回避策の限界
- 採用意欲または支払い意欲につながる理由

#### 5. Target Users

- 主な利用者
- 補助的な利用者
- 購入者または導入判断者
- 利用シーン
- 初期ターゲット
- 実際に操作するユーザー
- 出力を読むユーザー
- 承認するユーザー
- 保守するユーザー
- ユーザーの技術レベル
- ユーザーの既存ワークフロー
- ユーザーの制約
- 成功条件と失敗時の影響

#### 5.5 User Analysis

`hachi-prd` は、対象ユーザーを以下の観点で分析する。

- Primary User
- Secondary Users
- Buyer / Approver
- Operator
- Maintainer
- Usage Context
- Current Workflow
- User Journey
- Motivation
- Constraints
- Adoption Barrier
- Success Condition
- Failure Consequence

分析では、ユーザーが「何を操作するか」と「誰が成果物を読むか」を分ける。

#### 6. Goals

- 達成したいこと
- MVPで達成すること
- 将来達成したいこと

#### 7. Non-Goals

- 今回やらないこと
- MVPに含めないこと
- 将来検討とすること
- 意図的に扱わない領域

#### 8. Product Scope

- 製品種別
- 提供形態
- 対象環境
- 主要ユースケース
- 対象外ユースケース
- 初回利用ユースケース
- 継続利用ユースケース
- 操作対象
- 出力を受け取る対象
- 既存ワークフローへの挿入位置

#### 9. User Stories

形式:

```text
As a {user}, I want {capability}, so that {benefit}.
```

User Story は、必ず対応する操作イメージ付きUse Caseへ接続する。

#### 9.5 Use Cases and Operation Image

`hachi-prd` は、主要ユースケースを操作イメージ込みで記述する。

各ユースケースには以下を含める。

```yaml
use_case_id: "UC-001"
title: ""
actor: ""
goal: ""
preconditions: []
input:
  required: []
  optional: []
user_operation:
  - step: ""
    user_action: ""
    system_response: ""
output:
  primary: ""
  secondary: []
next_action: ""
success_state: ""
failure_or_edge_cases: []
acceptance_criteria: []
notes: ""
```

操作イメージは、Skill / CLI / Web UI / GitHub Action などの提供形態に合わせて具体化する。

例:

- Skill: ユーザーが貼るメモ、指定するファイル、期待する出力、保存先
- CLI: コマンド、引数、入力ファイル、出力ファイル、終了コード
- Web UI: 画面、フォーム、ボタン、一覧、確認状態
- GitHub Action: trigger、入力、生成されるartifact、PR comment

#### 10. Functional Requirements

各機能要件には以下を記載する。

```yaml
requirement_id: "FR-001"
title: ""
description: ""
priority: must | should | could
user_story: ""
acceptance_criteria: []
notes: ""
```

#### 11. Non-Functional Requirements

以下を必要に応じて記載する。

- 出力ロケール
- パフォーマンス
- セキュリティ
- プライバシー
- 信頼性
- 可観測性
- インストール容易性
- 最小依存
- 拡張性
- 保守性
- Agentable性
- ローカルファースト性
- 日本語対応
- Vercel Skills適合性

#### 12. Input / Output

- 入力データ
- 出力データ
- 出力形式
- 保存対象
- 後続Skillへの引き渡し形式

#### 13. Data Model

必要に応じて、主要データモデルを定義する。

例:

- SEED
- Positioning Brief
- Concept Brief
- PRD
- ADR
- Evidence
- Score
- Decision

#### 14. Workflow

ユーザー操作またはSkill実行の流れを定義する。

例:

```text
User request
  → Skill selection
  → Input normalization
  → Analysis
  → Draft generation
  → Review
  → Output
```

Workflow は、内部処理だけでなくユーザー操作を含める。

- Before: 利用前にユーザーが抱えている状態
- Trigger: 何をきっかけに使うか
- Operation: ユーザーが何を入力・選択・実行するか
- System response: システムがどう反応するか
- Output review: ユーザーが何を確認するか
- Next action: 出力をどこへ持っていくか
- Repeated use: 継続利用時に何が蓄積されるか

#### 15. Acceptance Criteria

PRD全体の受け入れ基準を記載する。

- ユーザーが期待するショートハンドで起動できること
- 必須項目が出力されること
- 後続Skillへ渡せること
- 出力ロケールに従うこと
- 根拠・推測・判断が分離されること

#### 16. Success Metrics

製品やSkillが成功しているかを見る指標を記載する。

例:

- SEEDからPRD化された数
- PRDから実装に進んだ数
- 再利用されたSEED数
- ユーザーが手戻りなく使えた割合
- 出力修正回数
- 実装Agentが迷わずタスク化できた割合

#### 17. Risks

- 技術リスク
- 市場リスク
- ユーザー不確実性
- 競合リスク
- 大手ベンダー吸収リスク
- OSS競合リスク
- Moatが弱いリスク
- データ取得・保存リスク
- 運用負荷

#### 18. Assumptions

- 前提としているユーザー行動
- 前提としている技術環境
- 前提としている市場状況
- 前提としている利用頻度

#### 19. Open Questions

- まだ決まっていないこと
- ユーザーに確認すべきこと
- 調査が必要なこと
- ADRに渡すべき判断候補

#### 20. ADR Candidates

PRD作成時点で設計判断が必要だと分かったものを列挙する。

例:

```yaml
adr_candidates:
  - title: "SEED保存形式をMarkdown/YAML/JSONのどれにするか"
    reason: "後続Skill連携と人間可読性に影響するため"
    urgency: high
  - title: "GitHubリポジトリ解析をSkill内で行うか外部スクリプトにするか"
    reason: "依存関係と実行環境に影響するため"
    urgency: medium
```

### 8.6 PRDスキーマ

```yaml
prd:
  prd_id: "prd-YYYYMMDD-001"
  title: ""
  status: draft | review | approved | deprecated
  source_concept_id: ""
  summary: ""
  background: ""
  problem_statement: ""
  target_users: []
  user_analysis:
    primary_user:
      role: ""
      context: ""
      current_workflow: ""
      technical_level: ""
      constraints: []
      success_condition: ""
      failure_consequence: ""
    secondary_users: []
    stakeholders:
      buyer: ""
      approver: ""
      operator: ""
      maintainer: ""
    user_journey:
      before: ""
      trigger: ""
      during: ""
      after: ""
      repeated_use: ""
  pain_points:
    - pain_id: "PAIN-001"
      title: ""
      situation: ""
      trigger: ""
      current_workaround: ""
      why_existing_alternatives_fail: ""
      frequency: ""
      severity: ""
      emotional_tone: ""
      business_or_workflow_impact: ""
      willingness_to_pay_or_adopt: ""
      evidence: []
  goals: []
  non_goals: []
  product_scope:
    product_type: ""
    target_environment: []
    in_scope: []
    out_of_scope: []
  user_stories: []
  use_cases:
    - use_case_id: "UC-001"
      title: ""
      actor: ""
      goal: ""
      preconditions: []
      input:
        required: []
        optional: []
      user_operation:
        - step: ""
          user_action: ""
          system_response: ""
      output:
        primary: ""
        secondary: []
      next_action: ""
      success_state: ""
      failure_or_edge_cases: []
      acceptance_criteria: []
      notes: ""
  functional_requirements: []
  non_functional_requirements: []
  input_output: {}
  data_model: []
  workflow: []
  acceptance_criteria: []
  success_metrics: []
  risks: []
  assumptions: []
  open_questions: []
  adr_candidates: []
  output_locale: ""
```

### 8.7 出力

```markdown
# PRD: {title}

## 1. Metadata
...

## 2. Summary
...

## 3. Background
...

## 4. Problem Statement
...

## 5. Target Users
...

## 6. User Analysis
...

## 7. Pain Points
...

## 8. Goals
...

## 9. Non-Goals
...

## 10. Product Scope
...

## 11. User Stories
...

## 12. Use Cases and Operation Image
...

## 13. Functional Requirements
...

## 14. Non-Functional Requirements
...

## 15. Input / Output
...

## 16. Data Model
...

## 17. Workflow
...

## 18. Acceptance Criteria
...

## 19. Success Metrics
...

## 20. Risks
...

## 21. Assumptions
...

## 22. Open Questions
...

## 23. ADR Candidates
...
```

### 8.8 スコアリング

PRDは以下の観点で評価する。

- Problem Clarity
- Target User Clarity
- User Analysis Depth
- Pain Point Specificity
- Use Case Operational Clarity
- MVP Focus
- Requirement Completeness
- Acceptance Testability
- Non-Goal Clarity
- ADR Candidate Coverage
- Implementation Readiness

### 8.9 判断

```yaml
decision:
  type: promote_to_adr | refine_prd | return_to_concept | watch | discard
  reason: ""
  recommended_next_skill: hachi-adr | hachi-concept | none
```

#### promote_to_adr

- PRDの問題・対象ユーザー・MVP・受け入れ基準が明確
- ユーザー分析、ペインポイント、操作イメージ付きユースケースが十分に具体化されている
- 実装に必要な設計判断候補が列挙されている
- ADRに進める価値がある

#### refine_prd

- コンセプトは良いが、要件や受け入れ基準が弱い
- ユーザー分析が浅い
- ペインポイントが抽象的で、発生場面・頻度・影響・回避策が描けていない
- ユースケースが `As a ...` で止まり、操作イメージ、入力、出力、次アクションが不足している
- 非目標が不足している
- MVPが大きすぎる

#### return_to_concept

- 対象ユーザーや価値が曖昧
- コンセプト自体を再検討すべき

#### watch

- まだ証拠が弱い
- 市場・技術変化を待つべき

#### discard

- PRD化しても実装価値が低い
- hachiware-labsの強みと合わない

### 8.10 非目標

`hachi-prd` は以下を目的としない。

- 技術選定を最終決定すること
- アーキテクチャを確定すること
- 詳細実装タスクをすべて作ること
- ADRを完成させること
- UIデザインを完成させること
- 事業計画を完成させること

## 9. hachi-adr 要件

## 9.1 概要

`hachi-adr` は、`hachi-concept-factory` の第5段階である。

`hachi-prd` によって作成されたPRD、特に `ADR Candidates` を入力として、実装や運用に影響する設計判断をADRとして記録する。

ADRは「なぜその設計を選んだか」を残す文書である。  
PRDが「何を、誰のために、なぜ作るか」を扱うのに対し、ADRは「それを実現するために、なぜこの設計判断をしたか」を扱う。

### 9.2 目的

- PRDを実現するための重要な設計判断を記録する
- 技術選定、アーキテクチャ、データ形式、保存方式、実行環境、依存関係などを明確にする
- 選ばなかった代替案と理由を残す
- 将来のAgentや開発者が設計意図を理解できるようにする
- Moatを守るための設計判断を明確にする
- 後から方針変更が必要になった場合に、判断の履歴を追えるようにする
- ユーザー入力やPRDの情報が不足している場合でも、保守的で明示的な仮定を置き、設計判断に必要な細部を可能な限り補完する
- 曖昧な判断を残さず、採用案、却下案、未決事項、検証条件、後戻り条件まで詰める
- 実装Agentが追加質問なしで初期実装・検証・レビューへ進める粒度まで、判断の前提と影響範囲を具体化する

### 9.2.1 詳細詰め方針

`hachi-adr` は、grill-me 的に設計判断の弱い箇所を徹底して詰める。

基本姿勢:

- 入力が曖昧でも、すぐに質問で止まらない
- 足りない情報は、PRD、Concept、SEED、既存リポジトリ、hachiware-labs の方針、npm / JavaScript 前提、ローカルファースト方針から推測して補う
- 補った内容は、事実としてではなく `Assumed` / `Inferred` / `Defaulted` として明示する
- 重要な判断は、採用案だけでなく、少なくとも2つ以上の代替案と却下理由を出す
- 設計判断の境界、対象外、失敗条件、再評価条件、移行コスト、テスト観点を具体的に書く
- セキュリティ、プライバシー、依存関係、運用、ローカル保存、出力ロケール、Agentable性への影響を必ず確認する
- 曖昧さが残る場合でも、`Open Questions` に逃がすだけでなく、暫定推奨、保守的デフォルト、確認方法を併記する

情報不足時の補完ルール:

```yaml
assumption_handling:
  if_missing_repository_context:
    default: "current repository conventions and npm/JavaScript tooling"
    output: "Assumed repository context"
  if_missing_storage_policy:
    default: "local-first Markdown artifacts under factory/"
    output: "Defaulted storage decision"
  if_missing_runtime:
    default: "npm / Node.js / JavaScript, TypeScript if implementation complexity requires types"
    output: "Defaulted runtime decision"
  if_missing_security_requirements:
    default: "do not send sensitive traces, PRD inputs, or local artifacts to hosted services unless explicitly requested"
    output: "Assumed privacy boundary"
  if_missing_test_strategy:
    default: "fixture-based tests plus golden Markdown output checks"
    output: "Defaulted verification strategy"
```

ADRでは、以下のように不確実性を扱う。

```markdown
## Assumption Ledger

- Assumed:
- Inferred:
- Defaulted:
- Needs confirmation:
- Conservative fallback:
```

質問が必要な場合でも、ADR本文は止めずに暫定案を作る。質問は `Open Questions` と `Follow-up Tasks` に残し、実装を止める条件か、後で確認して修正できる条件かを分ける。

### 9.3 ショートハンド

```text
このPRDからADRを作って
ADR候補を整理して
この設計判断をADRにして
なぜこの技術選定にするかADRで残して
hachi-adr形式でまとめて
```

### 9.4 入力

```yaml
input:
  prd:
    prd_id: ""
    title: ""
    goals: []
    non_goals: []
    functional_requirements: []
    non_functional_requirements: []
    data_model: []
    workflow: []
    risks: []
    assumptions: []
    adr_candidates: []
  additional_context:
    repository: ""
    existing_architecture: ""
    constraints: []
    preferred_stack: []
    rejected_options: []
```

### 9.5 ADRに記載すること

`hachi-adr` は、以下をADRに記載する。

#### 1. ADR Metadata

- ADR ID
- タイトル
- ステータス
- 作成日
- 対象PRD
- 関連Concept
- 出力ロケール

ステータス例:

- proposed
- accepted
- superseded
- deprecated
- rejected

#### 2. Context

- どのPRD要件に関係するか
- どの制約があるか
- なぜ判断が必要か
- 判断しない場合に何が困るか
- 現在の状態
- 入力から確定できる事実
- 入力不足を補うために置いた仮定

#### 2.5 Assumption Ledger

`hachi-adr` は、情報不足時の補完内容を以下の形で明示する。

- Assumed: ユーザーやPRDが明示したわけではないが、作業を進めるために置く前提
- Inferred: 入力文書、既存構成、過去判断から推測した前提
- Defaulted: hachiware-labs方針やリポジトリ標準から採用したデフォルト
- Needs confirmation: 後でユーザー確認または実装中確認が必要な点
- Conservative fallback: 前提が外れた場合の安全側の代替方針

#### 3. Decision

- 採用する判断
- 選択した技術・方式・構成
- 判断の範囲
- 何を決め、何をまだ決めないか
- 判断の粒度
- 影響する入出力、保存先、実行環境、依存関係
- 後戻り可能性

#### 4. Rationale

- なぜその判断にしたか
- PRDのどの目標に効くか
- hachiware-labsの強みとどう接続するか
- Moatをどう支えるか
- トレードオフ
- ユーザー体験、実装容易性、保守性、テスト容易性への影響
- 情報不足時にこの判断を暫定採用する理由

#### 5. Alternatives Considered

各代替案について以下を記載する。

```yaml
alternative:
  name: ""
  description: ""
  pros: []
  cons: []
  reason_rejected: ""
```

#### 6. Consequences

- 良い影響
- 悪い影響
- 運用上の影響
- 将来の拡張への影響
- テストへの影響
- Agentable性への影響
- 移行・変更コスト

#### 7. Risks

- 技術リスク
- 保守リスク
- 依存リスク
- ベンダーロックイン
- セキュリティリスク
- パフォーマンスリスク
- Moat毀損リスク

#### 8. Mitigations

- リスクに対する緩和策
- 後戻り可能にする方法
- 将来の再評価条件

#### 9. Implementation Notes

- 実装時の注意点
- 影響するファイル・モジュール
- 必要なテスト
- 互換性上の注意
- Agentに渡す際の注意
- 入力・出力の具体例
- edge case
- エラー時の扱い
- ローカル保存・機密情報・ログ出力の扱い
- npm / JavaScript 前提での実装メモ

#### 10. Follow-up Tasks

- 追加で実施すること
- 別ADRに分けるべき判断
- PRDへ戻すべき未決事項
- GitHub Issue化すべき作業
- 実装前に確認すべきこと
- 実装後に検証すべきこと
- 前提が外れた場合の再評価トリガー

#### 11. Related Documents

- 関連PRD
- 関連Concept Brief
- 関連SEED
- 関連ADR
- 関連Issue
- 関連Repository

### 9.6 ADR候補カテゴリ

`hachi-adr` は、PRDから以下のようなADR候補を抽出する。

#### Data / Storage

- SEEDをMarkdown/YAML/JSON/SQLiteのどれで保存するか
- PRD/ADR/Conceptをどのディレクトリ構成で保持するか
- Evidenceをどの形式で持つか

#### Runtime / Distribution

- Vercel Skillだけで完結するか
- 補助スクリプトを持つか
- CLIとしても提供するか
- Node.js / JavaScript / TypeScript のどの粒度で実装補助を持つか

#### Integration

- GitHub連携をどう扱うか
- 外部検索をどう扱うか
- wiki-gardenとどう接続するか
- deck生成Skillとどう接続するか

#### Architecture

- Skillごとに独立させるか
- 共通schemaを持つか
- referencesを共有するか
- scriptsを共通化するか

#### Quality / Evaluation

- 出力品質をどのルーブリックで評価するか
- PRD readinessをどう判定するか
- Moat scoreをどこで扱うか
- レビューSkillとどう連携するか

#### Locale / UX

- 出力ロケールをどう判定するか
- 日本語・英語ソースをどう混在処理するか
- ショートハンドをどう解釈するか

#### Moat

- SEED蓄積をどのように継続価値にするか
- Context Moatを支える保存形式は何か
- Process Moatを壊さないSkill分割は何か
- Agentable Moatを実現する出力形式は何か

### 9.7 ADRスキーマ

```yaml
adr:
  adr_id: "adr-YYYYMMDD-001"
  title: ""
  status: proposed | accepted | superseded | deprecated | rejected
  date: "YYYY-MM-DD"
  related_prd_id: ""
  related_concept_id: ""
  context: ""
  assumption_ledger:
    assumed: []
    inferred: []
    defaulted: []
    needs_confirmation: []
    conservative_fallback: []
  decision: ""
  rationale: ""
  alternatives_considered:
    - name: ""
      description: ""
      pros: []
      cons: []
      reason_rejected: ""
  consequences:
    positive: []
    negative: []
    operational: []
    future_implications: []
  risks: []
  mitigations: []
  implementation_notes: []
  verification_notes:
    required_tests: []
    acceptance_checks: []
    regression_checks: []
    manual_review_points: []
  follow_up_tasks: []
  related_documents: []
  output_locale: ""
```

### 9.8 出力

```markdown
# ADR: {title}

## 1. Metadata
- ADR ID:
- Status:
- Date:
- Related PRD:
- Related Concept:
- Output locale:

## 2. Context
...

## 3. Assumption Ledger
...

## 4. Decision
...

## 5. Rationale
...

## 6. Alternatives Considered
...

## 7. Consequences
...

## 8. Risks
...

## 9. Mitigations
...

## 10. Implementation Notes
...

## 11. Verification Notes
...

## 12. Follow-up Tasks
...

## 13. Related Documents
...
```

### 9.9 スコアリング

ADRは以下の観点で評価する。

- Decision Clarity
- PRD Alignment
- Alternative Coverage
- Consequence Clarity
- Reversibility
- Moat Alignment
- Implementation Usefulness
- Future Traceability
- Assumption Explicitness
- Detail Completeness
- Verification Readiness
- Security and Privacy Coverage
- Local-first and npm/JavaScript Alignment

### 9.10 判断

```yaml
decision:
  type: accept_adr | refine_adr | split_adr | return_to_prd | discard
  reason: ""
  recommended_next_action: ""
```

#### accept_adr

- 判断が明確
- PRD要件と接続している
- 代替案が検討されている
- 結果・リスク・緩和策が書かれている
- 実装者やAgentが意図を理解できる

#### refine_adr

- 判断は妥当だが、理由や結果が弱い
- 代替案が不足している
- リスクや緩和策が不足している

#### split_adr

- 1つのADRに複数の判断が混ざっている
- 技術選定、保存形式、実行方式などを分けるべき

#### return_to_prd

- そもそもPRD側の要件や非目標が曖昧
- 設計判断の前に要求を整理すべき

#### discard

- 判断として記録するほど重要ではない
- 実装詳細に過ぎない
- PRDと関係が薄い

### 9.11 非目標

`hachi-adr` は以下を目的としない。

- PRDを書き換えること
- すべての実装詳細を決めること
- コードを書くこと
- UIを設計すること
- 市場調査を行うこと
- コンセプトを再定義すること

## 10. PRDとADRの役割分担

PRDとADRは分ける。

| 文書 | 主な問い | 内容 |
|---|---|---|
| PRD | 何を、誰のために、なぜ作るか | 課題、ユーザー、MVP、要件、受け入れ基準 |
| ADR | なぜその設計判断を選ぶか | 技術選定、方式、代替案、トレードオフ、結果 |

### 10.1 PRDに書くべきこと

- ユーザー課題
- 対象ユーザー
- 価値
- スコープ
- 非目標
- MVP
- 機能要件
- 非機能要件
- 入出力
- データモデル
- ワークフロー
- 受け入れ基準
- 成功指標
- リスク
- 前提
- 未決事項
- ADR候補

### 10.2 ADRに書くべきこと

- 判断が必要な背景
- 採用する設計判断
- 理由
- 代替案
- 却下理由
- 良い影響・悪い影響
- リスク
- 緩和策
- 実装上の注意
- フォローアップ
- 関連PRD/Concept/SEED

### 10.3 PRDに書きすぎないこと

PRDには、以下を書きすぎない。

- 詳細な技術選定
- 詳細アーキテクチャ
- 実装内部の細部
- ライブラリ選定の最終判断
- 保存形式の最終判断
- 複数の技術代替案の詳細比較

これらはADRに送る。

### 10.4 ADRに書きすぎないこと

ADRには、以下を書きすぎない。

- ユーザー課題の詳細
- 市場背景の詳細
- MVPの全体定義
- 機能要件の網羅
- 受け入れ基準の網羅
- ユーザーストーリー全体

これらはPRDに残す。

## 11. 後続連携

`hachi-concept-factory` は、以下のSkillや文書と連携できるようにする。

- `wiki-garden`
- `deck-smith`
- `review-lens`
- `test-scout`
- GitHub Issues
- README
- AGENTS.md
- CLAUDE.md
- SKILL.md
- PRD
- ADR

## 12. 成功条件

`hachi-concept-factory` が成功している状態は以下である。

- ユーザーが短い指示でSEED収集を開始できる
- 注目領域と期間を指定できる
- バズではなく、プロダクト化可能な困りごとを拾える
- SEEDを市場・競合・Moatの観点で評価できる
- GitHubリポジトリや過去メモからコンセプト案を抽出できる
- コンセプトをPRDに進められる粒度まで磨ける
- PRDで「何を、誰のために、なぜ作るか」が明確になる
- ADRで「なぜその設計判断をしたか」が残る
- 出力ロケールがユーザー指示に従う
- 後続のAgentや開発者が迷わず実装・レビューへ進める
- 未成熟なネタも捨てずに、SEEDとして再利用できる
- 使うほど文脈・知識・判断履歴が蓄積され、Moatになる

## 13. README用の短い説明

```markdown
# hachi-concept-factory

Vercel Skills for turning user pain seeds into product concepts, PRDs, and ADRs.

`hachi-concept-factory` is a set of hachiware-labs skills that continuously collect user pain signals as SEEDs, evaluate positioning and moat, refine product concepts, and produce PRDs and ADRs.

## Skills

- `hachi-sense` — collect pain signals and weak signals as SEEDs
- `hachi-position` — evaluate market position, differentiation, OSS/vendor landscape, and moat
- `hachi-concept` — extract, merge, and refine product concepts
- `hachi-prd` — turn concepts into PRDs
- `hachi-adr` — record architectural decisions derived from PRDs
```

## 14. GitHub Description案

```text
Vercel Skills for turning user pain seeds into product concepts, PRDs, and ADRs.
```

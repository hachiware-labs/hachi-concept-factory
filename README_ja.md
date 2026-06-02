# hachi-concept-factory

`hachi-concept-factory` は、ユーザーの困りごとの兆しを `SEED` として集め、Positioning、Concept、PRD、ADRへ育てる Vercel Skills 群です。

単発のアイデア生成ではなく、困りごと、違和感、回避策、競合状況、Moat候補、却下理由、設計判断を継続的に蓄積し、次のAgentや開発者が再利用できるプロダクト発見・仕様化・設計判断の流れを作ります。

```text
SEED
  -> Positioning
  -> Concept
  -> PRD
  -> ADR
```

English guide: [README.md](README.md)

## 何が嬉しいか

- 曖昧な困りごとから、PRD / ADRまで進める再現可能な流れを作れる
- PRDに早く飛びすぎない。弱い案はSEED、Positioning、Concept、準備度ゲートで止められる
- 大手ベンダーリスク、OSS競合、Moat、Wedge、非目標、継続利用価値を明示的に評価できる
- PRDが実装に近づく。ユーザー分析、ペインポイント、操作イメージ、受け入れ基準、要件トレーサビリティまで書ける
- ADRで判断履歴が残る。前提、代替案、トレードオフ、後戻り条件、検証観点を保存できる
- 成果物を `factory/` 以下のMarkdownとして残し、人間レビューと後続Agentのhandoffに使える

## クイックスタート

公開リポジトリから全Skillを入れる:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill '*'
```

ローカルcloneから全Skillを入れる:

```bash
git clone https://github.com/hachiware-labs/hachi-concept-factory.git
cd hachi-concept-factory
npm run validate
npx skills add . --skill '*'
```

その後、Agentにこう依頼します。

```text
「agent memory governance」について hachi-sense でSEEDを集めてください。
最も強いSEEDを hachi-position で評価し、hachi-concept で磨いてください。
```

1つだけ入れたい場合:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-prd
```

リポジトリ単位で共有したい場合はproject install、複数プロジェクトで使いたい場合は `--global` を使います。

## Skill一覧

| Skill | 役割 | 主な成果物 |
|---|---|---|
| `hachi-sense` | 困りごと、弱い市場シグナル、回避策、繰り返される質問、未充足ニーズを集める | SEEDレポート |
| `hachi-position` | SEEDが市場・競合・Moat・Wedgeの観点で進める価値があるか評価する | Positioningレポート |
| `hachi-concept` | SEED、Positioning、リポジトリ、README、Issue、過去メモからConcept Briefを作る | Concept Brief |
| `hachi-prd` | Concept Briefを、ユーザー分析・ユースケース・要件・受け入れ基準・ADR候補つきのPRDにする | PRD |
| `hachi-adr` | PRDのADR候補や設計判断を、1判断1ADRの粒度で詳細に記録する | ADR |

## このリポジトリでできること

- 注目領域からプロダクト化できそうな困りごとを拾う
- バズや一時的な話題と、継続的なユーザー課題を分ける
- 大手ベンダーやOSSに吸収されるリスクを評価する
- Moat、Wedge、差別化、hachiware-labs適合性を検討する
- Conceptを、入力例・出力例・価値を実感する瞬間・非目標まで具体化する
- PRDで、ユーザー分析、ペインポイント、操作イメージ、要件トレーサビリティを描き切る
- ADRで、仮定、代替案、結果、リスク、検証、後戻り条件まで詰める

## ディレクトリ構成

```text
hachi-concept-factory/
  README.md
  README_ja.md
  package.json
  docs/
    hachi-concept-factory_requirements.md
    skill-evaluation-2026-06-02.md
  factory/
    seeds/
    positioning/
    concepts/
    prds/
    adrs/
    runs/
  scripts/
    validate-skills.mjs
  skills/
    hachi-sense/
    hachi-position/
    hachi-concept/
    hachi-prd/
    hachi-adr/
```

## 前提

- Node.js 20以上
- `npx`
- Vercel Skills CLI
- Skillsを読み込めるAgent環境

`skills` CLI は Codex、Claude Code、Cursor、GitHub Copilot、Cline、OpenCode など複数のAgentをサポートしています。

Skill定義を検証するには以下を実行します。

```bash
npm run validate
```

## Vercel Skillsでインストールする

Vercel Skills CLIでは、基本的に以下の形でSkillをインストールします。

```bash
npx skills add <source>
```

複数Skillを含むリポジトリから個別Skillを入れる場合は、`--skill` を使います。

```bash
npx skills add <source> --skill <skill-name>
```

以下のコマンドは、このリポジトリが `hachiware-labs/hachi-concept-factory` として公開される前提です。

### インストール可能なSkillを確認する

```bash
npx skills add hachiware-labs/hachi-concept-factory --list
```

ローカルcloneから確認する場合:

```bash
npx skills add . --list
```

### 全Skillをインストールする

5つすべてのSkillを、現在のproject / 選択したAgentへインストールします。SEED -> Positioning -> Concept -> PRD -> ADR の全体ワークフローを使うなら、この方法が推奨です。

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill '*'
```

ローカルcloneからインストールする場合:

```bash
npx skills add . --skill '*'
```

グローバルにインストールする場合:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill '*' --global
```

Codex向けに明示してインストールする場合:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill '*' --agent codex
```

検出された全Agentへまとめてインストールする場合:

```bash
npx skills add hachiware-labs/hachi-concept-factory --all
```

### 個別Skillをインストールする

途中工程から始める場合は、必要なSkillだけを入れます。たとえばConcept Briefが既にあるなら `hachi-prd`、PRDとADR候補が既にあるなら `hachi-adr` だけでも使えます。

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-sense
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-position
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-concept
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-prd
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-adr
```

ローカルcloneから `hachi-sense` だけを入れる場合:

```bash
npx skills add . --skill hachi-sense
```

グローバルに `hachi-prd` だけを入れる場合:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-prd --global
```

Codexに `hachi-adr` だけを入れる場合:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-adr --agent codex
```

### どのSkillを入れるべきか

| 手元にあるもの | 入れる / 使うSkill |
|---|---|
| テーマ、トレンド、粗い問題領域、市場の違和感 | `hachi-sense` |
| SEED、粗い製品アイデア | `hachi-position` |
| SEED、Positioning Report、リポジトリ、README、粗いConcept | `hachi-concept` |
| PRD化したいConcept Brief | `hachi-prd` |
| PRD、ADR候補、設計判断 | `hachi-adr` |
| 最初から最後まで流したい | 全5Skill |

### インストール後の使い始め方

必要に応じてAgentセッションを新しくする、またはAgent環境を再読み込みします。その後、依頼文でSkill名を明示します。

```text
hachi-prd を使って、このConcept Briefを standard density のPRDにしてください。
```

多くのAgentはインストール済みSkillのmetadataから自動で起動しますが、最初はSkill名を明示するのが確実です。

### 更新・一覧・削除

インストール済みSkillを一覧する:

```bash
npx skills list
```

インストール済みSkillを更新する:

```bash
npx skills update
```

特定Skillだけ更新する:

```bash
npx skills update hachi-prd
```

特定Skillを削除する:

```bash
npx skills remove hachi-adr
```

選択したscopeから全Skillを削除する:

```bash
npx skills remove --skill '*'
```

## 全体ワークフロー

基本は以下の順で使います。

```text
hachi-sense
  -> hachi-position
  -> hachi-concept
  -> hachi-prd
  -> hachi-adr
```

成果物の保存先は以下を推奨します。

| 段階 | 保存先 |
|---|---|
| SEED | `factory/seeds/` |
| Positioning | `factory/positioning/` |
| Concept | `factory/concepts/` |
| PRD | `factory/prds/` |
| ADR | `factory/adrs/` |
| 実行ログ・試行結果 | `factory/runs/` |

全体を一気に進めたい場合の依頼例:

```text
「local-first agent evaluation」について hachi-sense でSEEDを集めてください。
最も強いSEEDを hachi-position で評価し、hachi-concept でConcept Briefへ洗練し、
hachi-prd でMVP PRDを作り、hachi-adr でADR候補を整理してください。
出力は日本語、成果物は factory/ 以下に保存する想定でお願いします。
```

実運用サンプル:

- SEED: [factory/seeds/2026-06-01_multi-agent-small-company.md](factory/seeds/2026-06-01_multi-agent-small-company.md)
- Positioning: [factory/positioning/2026-06-01_agent-trace-lens.md](factory/positioning/2026-06-01_agent-trace-lens.md)
- Concept: [factory/concepts/2026-06-01_agent-trace-lens.md](factory/concepts/2026-06-01_agent-trace-lens.md)
- PRD: [factory/prds/2026-06-02_agent-trace-lens-mvp.md](factory/prds/2026-06-02_agent-trace-lens-mvp.md)
- ADR: [factory/adrs/2026-06-02_agent-trace-lens-run-review-schema.md](factory/adrs/2026-06-02_agent-trace-lens-run-review-schema.md)
- ゲートテスト: [factory/runs/2026-06-02_agent-trace-lens-skill-gate-test.md](factory/runs/2026-06-02_agent-trace-lens-skill-gate-test.md)

## hachi-sense の使い方

`hachi-sense` は、何を作るか決める前に、困りごとの兆しを集めるSkillです。

向いている用途:

- 注目領域のSEEDを集める
- ユーザーの不満や回避策を整理する
- GitHub Issues、Release notes、技術ブログ、レビュー、SNS投稿などから兆しを拾う
- SEEDを `position` / `watch` / `merge` / `discard` に分ける
- 後続の `hachi-position` に渡す材料を作る

依頼例:

```text
hachi-sense を使って、「AI agent handoff failures」周辺のSEEDを過去30日分で集めてください。
```

```text
このメモを hachi-sense で整理してください。
観察された事実、推測、判断を分け、強いSEEDだけを hachi-position に進めてください。
```

主な出力:

- 対象範囲
- 要約
- シグナル整理
- SEED候補
- スコアと確度
- 推奨される次のステップ
- 根拠ギャップと引き継ぎ事項

判断値:

- `position`
- `watch`
- `merge`
- `discard`

## hachi-position の使い方

`hachi-position` は、SEEDを製品仮説として進める価値があるかを判断するSkillです。

向いている用途:

- 大手ベンダーに吸収されるリスクを見る
- OSS競合や商用代替を確認する
- 手作業の回避策を整理する
- 差別化軸を見つける
- MoatとWedgeを評価する
- `hachi-concept` に進めるか判断する

依頼例:

```text
このSEEDを hachi-position で評価してください。
大手ベンダーリスク、OSS競合、手作業の回避策、差別化、Moat、Wedge、Buildabilityを見てください。
```

```text
この案は便利そうですが、大手ベンダーに吸収されそうです。
hachi-position で promote / watch / merge / discard の判断をしてください。
```

主な出力:

- 製品仮説
- 市場・ベンダー環境
- 差別化分析
- Moat分析
- ポジショニング案
- 推奨判断
- スコア
- 調査ギャップと判断変更条件

判断値:

- `promote_to_concept`
- `watch`
- `merge`
- `discard`

## hachi-concept の使い方

`hachi-concept` は、SEED、Positioning、GitHubリポジトリ、README、Issue、既存メモ、粗いアイデアから、PRDに進められるConcept Briefを作るSkillです。

モード:

- `extract`: リポジトリ、README、docs、Issue、examples、CLI help、コード構造、メモから潜在コンセプトを抽出する
- `refine`: 1つのConceptまたはPositioning Briefを磨く
- `synthesize`: 複数のSEED、Positioning、過去案を統合する

依頼例:

```text
このPositioning Reportを hachi-concept の refine mode で磨いてください。
対象ユーザー、最初のワークフロー、入力例、出力例、価値を実感する瞬間、
最も鋭い非目標、PRD準備度を具体化してください。
```

```text
このGitHubリポジトリを hachi-concept の extract mode で見てください。
潜在的な製品コンセプトを抽出し、Skill / CLI / SaaS / library のどれがよいか判断してください。
```

主な出力:

- コンセプト概要
- 課題と文脈
- シグネチャーワークフローと体験
- 提案コンセプト
- 差別化
- Moat
- WedgeとMVP方向性
- 洗練ログ
- PRD準備度
- 推奨判断

判断値:

- `promote_to_prd`
- `refine`
- `merge`
- `watch`
- `discard`

## hachi-prd の使い方

`hachi-prd` は、Concept Briefを実装可能なPRDへ変換するSkillです。

向いている用途:

- 詳細なユーザー分析
- ペインポイント分析
- 操作イメージつきユースケース
- 機能要件・非機能要件
- 受け入れ基準
- 要件トレーサビリティ
- 成功指標
- ADR候補の抽出

出力密度:

- `mvp`: 小さく作れるPRD
- `standard`: 通常のhandoff品質
- `full`: 複数ユーザー・高リスク・詳細分析向け

依頼例:

```text
このConcept Briefから hachi-prd でMVP PRDを作ってください。
ユーザー分析、ペインポイント、操作イメージつきユースケース、
要件トレーサビリティ、受け入れ基準、ADR候補を含めてください。
```

```text
hachi-prd を full density で使ってください。
ユーザー分析とペインポイントを詳細に行い、operator、reader、maintainer、
現在のワークフロー、失敗時の影響、継続利用の行動まで描き切ってください。
```

主な出力:

- メタデータ
- 要約
- 対象ユーザー
- ユーザー分析
- ペインポイント
- 目標・非目標
- ユースケースと操作イメージ
- 機能要件
- 非機能要件
- 要件トレーサビリティ
- 受け入れ基準
- ADR候補
- 準備度判断

判断値:

- `promote_to_adr`
- `refine_prd`
- `return_to_concept`
- `watch`
- `discard`

## hachi-adr の使い方

`hachi-adr` は、PRDのADR候補や設計判断を、1判断1ADRの粒度で記録するSkillです。

向いている用途:

- なぜその設計判断を選んだかを残す
- 複数判断が混ざったADR候補を分割する
- 情報不足時に保守的な仮定を置く
- 代替案を比較する
- 結果、リスク、緩和策、後戻り条件、検証条件を記録する
- local-first、privacy、npm / JavaScript前提を明示する

依頼例:

```text
このPRDのADR候補から hachi-adr でADRを作ってください。
1 ADR = 1 decision を守り、前提、代替案、結果、rollback path、
実装メモ、検証メモを含めてください。
```

```text
このADR候補は保存形式、runtime、privacyが混ざっています。
hachi-adr で split_adr すべきか判断し、最初に書くべきADRを作ってください。
```

主な出力:

- メタデータ
- 背景
- 前提台帳
- 決定
- 理由
- 検討した代替案
- 結果
- リスクと緩和策
- 実装メモ
- 検証メモ
- フォローアップタスク
- ADR判断

判断値:

- `accept_adr`
- `refine_adr`
- `split_adr`
- `return_to_prd`
- `discard`

## よくある使い方

### テーマから始める

```text
「agent memory governance」周辺で hachi-sense を使ってSEEDを集めてください。
その後、最も強いSEEDを hachi-position で評価してください。
```

### 既存アイデアから始める

```text
このアイデアを hachi-position で評価してください。
進める価値があるなら hachi-concept に渡し、最初のワークフローを磨いてください。
```

### GitHubリポジトリから始める

```text
このリポジトリを hachi-concept の extract mode で見てください。
潜在コンセプトを抽出し、PRDに進められるか判断してください。
```

### Conceptから始める

```text
このConcept Briefを hachi-prd で standard density のPRDにしてください。
非目標を守り、ADR候補を抽出してください。
```

### PRDから始める

```text
このPRDのADR Candidatesから hachi-adr でADRを作ってください。
独立した判断は1つのADRにまとめず、split_adrしてください。
```

## 出力ロケール

各Skillはユーザーの指定言語に合わせて出力します。日本語で依頼した場合は、日本語見出し・日本語フィールド名で出力しつつ、`seed_id`、URL、`promote_to_prd` などの安定IDや判断値は保持します。

例:

```text
日本語で hachi-prd を使って、このConcept BriefからMVP PRDを作って。
```

```text
Use hachi-position in English for this SEED.
```

## 品質検証

以下を実行してください。

```bash
npm run validate
```

validatorは以下を確認します。

- 各Skillフォルダに `SKILL.md` がある
- frontmatter の `name` がフォルダ名と一致する
- frontmatter が `name` と `description` のみを持つ
- `agents/openai.yaml` にUIメタデータがある
- `SKILL.md` から参照された `references/` と `examples/` が実在する
- Skill配下にnpm / JavaScript以外の実装前提が混ざっていない

評価レポート:

- [docs/skill-evaluation-2026-06-02.md](docs/skill-evaluation-2026-06-02.md)

## メンテナンス方針

- `SKILL.md` は入口として簡潔に保つ
- 詳細な判断基準は `references/` に置く
- 例は短くても品質ゲートを体現する
- npm / Node.js / JavaScript 前提を守る
- local-firstなMarkdown成果物を `factory/` 以下に残す
- PRDにADRを書きすぎない
- ADRを実装タスク一覧にしない
- 変更後は `npm run validate` を実行する

## 参照

- Vercel Agent Skills documentation: https://vercel.com/docs/agent-resources/skills
- Vercel Skills CLI: https://github.com/vercel-labs/skills
- Skills directory: https://skills.sh

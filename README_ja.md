# hachi-concept-factory

`hachi-concept-factory` は、ユーザーの困りごとの兆しを「課題の種」として集め、位置づけの評価、コンセプトづくり、製品要求、設計判断へ育てる Vercel Skills 群です。

単発のアイデア生成ではなく、困りごと、違和感、回避策、競合状況、守りの強さ、却下理由、設計判断を継続的に蓄積し、次のエージェントや開発者が再利用できるプロダクト発見・仕様化・設計判断の流れを作ります。

```text
課題の種
  -> 位置づけ評価
  -> コンセプト
  -> 製品要求書
  -> 設計判断記録
```

English guide: [README.md](README.md)

## 何が嬉しいか

- 曖昧な困りごとから、製品要求書や設計判断の記録まで進める再現可能な流れを作れる
- 製品要求書に早く飛びすぎない。弱い案は課題の種、位置づけ、コンセプト、準備度の確認で止められる
- 大手ベンダーに吸収されるリスク、OSS競合、守りの強さ、最初の切り口、非目標、継続利用価値を明示的に評価できる
- 製品要求書が実装に近づく。ユーザー分析、ペインポイント、操作イメージ、受け入れ基準、要件の対応関係まで書ける
- 設計判断の記録が残る。前提、代替案、トレードオフ、後戻り条件、検証観点を保存できる
- 成果物を `factory/` 以下のMarkdownとして残し、人間レビューと後続エージェントへの引き継ぎに使える

## クイックスタート

公開リポジトリから全スキルを入れる:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill '*'
```

ローカルに複製してから全スキルを入れる:

```bash
git clone https://github.com/hachiware-labs/hachi-concept-factory.git
cd hachi-concept-factory
npm run validate
npx skills add . --skill '*'
```

その後、エージェントにこう依頼します。

```text
「エージェントの記憶管理」について hachi-sense で課題の種を集めてください。
hachi-position で有望な課題の種、痛みの強い課題の種、特徴的な課題の種を選んで評価し、主候補を hachi-concept で磨いてください。
```

1つだけ入れたい場合:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-prd
```

リポジトリ単位で共有したい場合はプロジェクトへのインストール、複数プロジェクトで使いたい場合は `--global` を使います。

## スキル一覧

| スキル | 役割 | 主な成果物 |
|---|---|---|
| `hachi-sense` | 困りごと、弱い市場シグナル、回避策、繰り返される質問、未充足ニーズを集める | 課題の種レポート |
| `hachi-position` | 有望、痛みが強い、または特徴的な課題の種を選び、市場・競合・守りの強さ・最初の切り口の観点で進める価値があるか評価する | 位置づけ評価レポート |
| `hachi-concept` | 課題の種、位置づけ評価、リポジトリ、README、Issue、過去メモからコンセプト概要を作る | コンセプト概要 |
| `hachi-prd` | コンセプト概要を、ユーザー分析・ユースケース・要件・受け入れ基準・設計判断候補つきの製品要求書にする | 製品要求書 |
| `hachi-adr` | 製品要求書の設計判断候補や設計判断を、1判断1記録の粒度で詳細に残す | 設計判断記録 |

## 作れる成果物

各スキルは、レビュー、編集、`factory/` 以下への保存、次のスキルへの引き継ぎに使える成果物を作ります。

| スキル | 作れる成果物 | 向いている場面 | 推奨保存先 |
|---|---|---|---|
| `hachi-sense` | 課題の種レポート、シグナルマップ、根拠メモ、確度スコア、引き継ぎメモ | 何を作るか決める前に、未解決の困りごとを構造化したい | `factory/seeds/` |
| `hachi-position` | 候補選抜、位置づけ評価レポート、ベンダー / OSSリスク分析、守りの強さ / 最初の切り口のスコア、前進 / 保留 / 統合 / 却下の判断 | どの課題の種を評価すべきか、製品化に進めるべきか判断したい | `factory/positioning/` |
| `hachi-concept` | コンセプト概要、洗練ログ、代表的な利用の流れ、入力例 / 出力例、製品要求書に進める準備度 | 製品要求書に進められる具体的なコンセプトへ磨きたい | `factory/concepts/` |
| `hachi-prd` | 最小版 / 標準版 / 詳細版の製品要求書、ユーザー分析、ペインポイント、操作イメージつきユースケース、要件、受け入れ基準、設計判断候補 | エンジニアやエージェントが実装できる仕様にしたい | `factory/prds/` |
| `hachi-adr` | 設計判断記録、前提台帳、代替案、結果、後戻り条件、検証メモ、フォローアップタスク | 1つの設計判断を後から読める形で残したい | `factory/adrs/` |
| 全体ワークフロー | 発見から設計判断までの一式、製品判断の履歴、コンセプト概要、製品要求書、設計判断記録、実行ログ | 困りごと発見から仕様化・設計判断までを一貫して残したい | `factory/runs/` と各段階の保存先 |

## このリポジトリでできること

- 注目領域からプロダクト化できそうな困りごとを拾う
- バズや一時的な話題と、継続的なユーザー課題を分ける
- 大手ベンダーやOSSに吸収されるリスクを評価する
- 守りの強さ、最初の切り口、差別化、hachiware-labsとの相性を検討する
- コンセプトを、入力例・出力例・価値を実感する瞬間・非目標まで具体化する
- 製品要求書で、ユーザー分析、ペインポイント、操作イメージ、要件の対応関係を描き切る
- 設計判断記録で、仮定、代替案、結果、リスク、検証、後戻り条件まで詰める

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
- スキルを読み込めるエージェント環境

`skills` CLI は Codex、Claude Code、Cursor、GitHub Copilot、Cline、OpenCode など複数のエージェントをサポートしています。

スキル定義を検証するには以下を実行します。

```bash
npm run validate
```

## Vercel Skillsでインストールする

Vercel Skills CLIでは、基本的に以下の形でスキルをインストールします。

```bash
npx skills add <source>
```

複数のスキルを含むリポジトリから個別スキルを入れる場合は、`--skill` を使います。

```bash
npx skills add <source> --skill <skill-name>
```

以下のコマンドは、このリポジトリが `hachiware-labs/hachi-concept-factory` として公開される前提です。

### インストール可能なスキルを確認する

```bash
npx skills add hachiware-labs/hachi-concept-factory --list
```

ローカルcloneから確認する場合:

```bash
npx skills add . --list
```

### 全スキルをインストールする

5つすべてのスキルを、現在のプロジェクトまたは選択したエージェントへインストールします。課題の種 -> 位置づけ評価 -> コンセプト -> 製品要求書 -> 設計判断記録の全体ワークフローを使うなら、この方法が推奨です。

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

検出された全エージェントへまとめてインストールする場合:

```bash
npx skills add hachiware-labs/hachi-concept-factory --all
```

### 個別スキルをインストールする

途中工程から始める場合は、必要なスキルだけを入れます。たとえばコンセプト概要が既にあるなら `hachi-prd`、製品要求書と設計判断候補が既にあるなら `hachi-adr` だけでも使えます。

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

### どのスキルを入れるべきか

| 手元にあるもの | 入れる / 使うスキル |
|---|---|
| テーマ、トレンド、粗い問題領域、市場の違和感 | `hachi-sense` |
| 課題の種、課題の種レポート、粗い製品アイデア | `hachi-position` |
| 課題の種、位置づけ評価レポート、リポジトリ、README、粗いコンセプト | `hachi-concept` |
| 製品要求書にしたいコンセプト概要 | `hachi-prd` |
| 製品要求書、設計判断候補、設計判断 | `hachi-adr` |
| 最初から最後まで流したい | 全5スキル |

### インストール後の使い始め方

必要に応じてエージェントのセッションを新しくする、またはエージェント環境を再読み込みします。その後、依頼文でスキル名を明示します。

```text
hachi-prd を使って、このコンセプト概要を標準の詳しさの製品要求書にしてください。
```

多くのエージェントはインストール済みスキルのメタデータから自動で起動しますが、最初はスキル名を明示するのが確実です。

各スキルに設定されている表示名は、短い呼び出し名としても使えます。呼び出し名から始めて、対象テーマ、成果物、処理モード、出力の詳しさ、出力言語、保存先を続けて指定できます。

| 呼び出し名 | 向いている用途 | 依頼例 |
|---|---|---|
| `hachi-sense` | 困りごとの兆しを見つけ、スコアする | `hachi-sense: 「エージェントの記憶管理」の課題の種を集めてください。`<br>`hachi-sense: このメモを課題の種候補に整理し、factory/seeds/ に保存する想定で出してください。` |
| `hachi-position` | 候補を選び、次に進めるべきか判断する | `hachi-position: この課題の種レポートから上位3件を選び、主候補を詳しく評価してください。`<br>`hachi-position: 痛みが強い課題、特徴的な課題、既存解決で埋まっていない課題を選び、主候補を評価してください。` |
| `hachi-concept` | コンセプトを抽出・洗練する | `hachi-concept: この位置づけ評価レポートを、製品要求書に進められるコンセプト概要へ磨いてください。`<br>`hachi-concept extract: このリポジトリを読み、潜在的な製品コンセプトを抽出してください。` |
| `hachi-prd` | 実装可能な要件を書く | `hachi-prd: このコンセプト概要から、標準の詳しさの製品要求書を作ってください。`<br>`hachi-prd mvp: ユーザー、ペインポイント、操作イメージ、受け入れ基準、設計判断候補を含めてください。` |
| `hachi-adr` | 設計判断を記録する | `hachi-adr: この設計判断候補から、1判断1記録の厳密な設計判断記録を書いてください。`<br>`hachi-adr: 混ざった判断を分割し、最初の設計判断記録に後戻り条件と検証メモを含めてください。` |

複数スキルをまとめて使う場合も、呼び出し名を並べて依頼できます。

```text
hachi-sense -> hachi-position -> hachi-concept.
「エージェントの記憶管理」の課題の種を集め、hachi-position で上位候補、痛みが強い候補、特徴的な候補を選び、主候補をコンセプト概要へ洗練してください。
出力は日本語、成果物は factory/ 以下に保存する想定でお願いします。
```

### 更新・一覧・削除

インストール済みスキルを一覧する:

```bash
npx skills list
```

インストール済みスキルを更新する:

```bash
npx skills update
```

特定スキルだけ更新する:

```bash
npx skills update hachi-prd
```

特定スキルを削除する:

```bash
npx skills remove hachi-adr
```

選択した範囲から全スキルを削除する:

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
| 課題の種 | `factory/seeds/` |
| 位置づけ評価 | `factory/positioning/` |
| コンセプト | `factory/concepts/` |
| 製品要求書 | `factory/prds/` |
| 設計判断記録 | `factory/adrs/` |
| 実行ログ・試行結果 | `factory/runs/` |

### ストーリー: 困りごとの発見から設計判断記録まで

たとえば、小さなプロダクトチームで「AIエージェント同士の引き継ぎで文脈が失われる」という違和感に気づいたとします。まだ製品案ではありません。「エージェントの記憶が続かない」「引き継ぎが壊れる」「実行結果をレビューしづらい」といった不満が散らばっているだけです。

最初に `hachi-sense` を使います。対象領域の課題の種を集め、観察された事実と推測を分け、繰り返される不満をまとめ、確度をスコアし、`factory/seeds/` に課題の種レポートとして残します。この段階では製品要求書を書きません。どの困りごとが調査に値するか、どれが弱いか、何の根拠が足りないかを明らかにします。

次に、課題の種レポート全体を `hachi-position` に渡します。ユーザーペインの強さ、痛みの持ち主の明確さ、根拠の強さ、既存解決で埋まっていない度合い、課題の独自性、最初の切り口の鋭さ、hachiware-labsとの相性、守りの強さ、リスク込みの作りやすさ、学びの大きさで候補を選ばせます。そのうえで主候補について、大手ベンダーに吸収されるリスク、OSS代替、手作業の回避策、差別化、守りの強さ、最初の切り口、作りやすさを評価します。位置づけ評価レポートは `factory/positioning/` に保存します。

進める価値があるなら、`hachi-concept` を使います。課題の種と位置づけ評価レポートがある場合は洗練モード、既存リポジトリを読む場合は抽出モードが向いています。対象ユーザー、最初の利用の流れ、入力例、出力例、価値を実感する瞬間、非目標、継続利用価値、製品要求書に進める準備度を具体化し、コンセプト概要を `factory/concepts/` に保存します。

コンセプトが固まったら、`hachi-prd` を使います。必要な詳しさに応じて、最小版なら `mvp`、標準版なら `standard`、詳細版なら `full` を指定します。製品要求書では、ユーザー分析、ペインポイント、操作イメージつきユースケース、機能要件、非機能要件、受け入れ基準、成功指標、要件の対応関係、設計判断候補まで描き切ります。保存先は `factory/prds/` です。

最後に、製品要求書から出てきた重要な設計判断ごとに `hachi-adr` を使います。1つの記録に1つの判断だけを書くことを守り、情報が足りない場合は保守的な仮定を置き、代替案、結果、後戻り条件、検証メモを残します。設計判断記録は `factory/adrs/` に保存します。ここまで進むと、最初の曖昧な困りごとは、根拠、製品判断、コンセプト、実装仕様、設計判断までつながったレビュー可能な成果物になります。

全体を一気に依頼する場合の短い例:

```text
hachi-sense -> hachi-position -> hachi-concept -> hachi-prd -> hachi-adr.
「小さなプロダクトチームでAIエージェントの引き継ぎが壊れる」という問題領域から始めてください。
課題の種を見つけ、上位候補、痛みが強い候補、特徴的な候補を選び、主候補を評価してコンセプト概要へ洗練し、
最小版の製品要求書を書き、最初の設計判断候補まで作ってください。
成果物は factory/ 以下に保存する想定で、各段階で次へ進める判断も説明してください。
```

全体を一気に進めたい場合の依頼例:

```text
「ローカル優先のエージェント評価」について hachi-sense で課題の種を集めてください。
hachi-position で上位候補、痛みが強い候補、特徴的な候補を選び、主候補を評価して、hachi-concept でコンセプト概要へ洗練し、
hachi-prd で最小版の製品要求書を作り、hachi-adr で設計判断候補を整理してください。
出力は日本語、成果物は factory/ 以下に保存する想定でお願いします。
```

実運用サンプル:

- 課題の種: [factory/seeds/2026-06-01_multi-agent-small-company.md](factory/seeds/2026-06-01_multi-agent-small-company.md)
- 位置づけ評価: [factory/positioning/2026-06-01_agent-trace-lens.md](factory/positioning/2026-06-01_agent-trace-lens.md)
- コンセプト: [factory/concepts/2026-06-01_agent-trace-lens.md](factory/concepts/2026-06-01_agent-trace-lens.md)
- 製品要求書: [factory/prds/2026-06-02_agent-trace-lens-mvp.md](factory/prds/2026-06-02_agent-trace-lens-mvp.md)
- 設計判断記録: [factory/adrs/2026-06-02_agent-trace-lens-run-review-schema.md](factory/adrs/2026-06-02_agent-trace-lens-run-review-schema.md)
- ゲートテスト: [factory/runs/2026-06-02_agent-trace-lens-skill-gate-test.md](factory/runs/2026-06-02_agent-trace-lens-skill-gate-test.md)

## hachi-sense の使い方

`hachi-sense` は、何を作るか決める前に、困りごとの兆しを集めるスキルです。

向いている用途:

- 注目領域の課題の種を集める
- ユーザーの不満や回避策を整理する
- GitHub Issues、Release notes、技術ブログ、レビュー、SNS投稿などから兆しを拾う
- 課題の種を「位置づけ評価へ進める / 保留する / 統合する / 却下する」に分ける
- 後続の `hachi-position` に渡す材料を作る

依頼例:

```text
hachi-sense を使って、「AIエージェントの引き継ぎ失敗」周辺の課題の種を過去30日分で集めてください。
```

```text
このメモを hachi-sense で整理してください。
観察された事実、推測、判断を分け、強い課題の種だけを hachi-position に進めてください。
```

主な出力:

- 対象範囲
- 要約
- シグナル整理
- 課題の種候補
- スコアと確度
- 推奨される次のステップ
- 根拠ギャップと引き継ぎ事項

判断値:

- `position`
- `watch`
- `merge`
- `discard`

## hachi-position の使い方

`hachi-position` は、課題の種レポートから有望または特徴的な候補を選び、製品仮説として進める価値があるかを判断するスキルです。単一の課題の種だけを評価することもできます。

向いている用途:

- 大手ベンダーに吸収されるリスクを見る
- 課題の種レポートから、上位候補、痛みが強い候補、特徴的な候補、安全な候補、リスクはあるが面白い候補を選ぶ
- OSS競合や商用代替を確認する
- 手作業の回避策を整理する
- 差別化軸を見つける
- 守りの強さと最初の切り口を評価する
- `hachi-concept` に進めるか判断する

依頼例:

```text
この hachi-sense の課題の種レポートを hachi-position で見てください。
上位3件、痛みが強い1件、特徴的だがリスクのある1件を選び、主候補を詳しく評価してください。
```

```text
痛み優先で hachi-position を使ってください。
製品形態がまだ曖昧でも、繰り返し起きていて失敗時の影響が大きい課題の種を選んでください。
```

```text
この課題の種を hachi-position で評価してください。
大手ベンダーリスク、OSS競合、手作業の回避策、差別化、守りの強さ、最初の切り口、作りやすさを見てください。
```

```text
この案は便利そうですが、大手ベンダーに吸収されそうです。
hachi-position で前進 / 保留 / 統合 / 却下の判断をしてください。
```

主な出力:

- 複数の課題の種がある場合の候補選抜
- 製品仮説
- 市場・ベンダー環境
- 差別化分析
- 守りの強さの分析
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

`hachi-concept` は、課題の種、位置づけ評価、GitHubリポジトリ、README、Issue、既存メモ、粗いアイデアから、製品要求書に進められるコンセプト概要を作るスキルです。

処理モード:

- `extract`: リポジトリ、README、docs、Issue、examples、CLI help、コード構造、メモから潜在コンセプトを抽出する
- `refine`: 1つのコンセプトまたは位置づけ評価を磨く
- `synthesize`: 複数の課題の種、位置づけ評価、過去案を統合する

依頼例:

```text
この位置づけ評価レポートを hachi-concept の洗練モードで磨いてください。
対象ユーザー、最初のワークフロー、入力例、出力例、価値を実感する瞬間、
最も鋭い非目標、製品要求書に進める準備度を具体化してください。
```

```text
このGitHubリポジトリを hachi-concept の抽出モードで見てください。
潜在的な製品コンセプトを抽出し、スキル、CLI、SaaS、ライブラリのどれがよいか判断してください。
```

主な出力:

- コンセプト概要
- 課題と文脈
- シグネチャーワークフローと体験
- 提案コンセプト
- 差別化
- 守りの強さ
- 最初の切り口と最小版の方向性
- 洗練ログ
- 製品要求書に進める準備度
- 推奨判断

判断値:

- `promote_to_prd`
- `refine`
- `merge`
- `watch`
- `discard`

## hachi-prd の使い方

`hachi-prd` は、コンセプト概要を実装可能な製品要求書へ変換するスキルです。

向いている用途:

- 詳細なユーザー分析
- ペインポイント分析
- 操作イメージつきユースケース
- 機能要件・非機能要件
- 受け入れ基準
- 要件トレーサビリティ
- 成功指標
- 設計判断候補の抽出

出力の詳しさ:

- `mvp`: 小さく作れる製品要求書
- `standard`: 標準版。通常の引き継ぎ品質
- `full`: 詳細版。複数ユーザー・高リスク・詳細分析向け

依頼例:

```text
このコンセプト概要から hachi-prd で最小版の製品要求書を作ってください。
ユーザー分析、ペインポイント、操作イメージつきユースケース、
要件の対応関係、受け入れ基準、設計判断候補を含めてください。
```

```text
hachi-prd を詳細版で使ってください。
ユーザー分析とペインポイントを詳細に行い、操作する人、読む人、保守する人、
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
- 要件の対応関係
- 受け入れ基準
- 設計判断候補
- 準備度判断

判断値:

- `promote_to_adr`
- `refine_prd`
- `return_to_concept`
- `watch`
- `discard`

## hachi-adr の使い方

`hachi-adr` は、製品要求書の設計判断候補や設計判断を、1判断1記録の粒度で記録するスキルです。

向いている用途:

- なぜその設計判断を選んだかを残す
- 複数判断が混ざった設計判断候補を分割する
- 情報不足時に保守的な仮定を置く
- 代替案を比較する
- 結果、リスク、緩和策、後戻り条件、検証条件を記録する
- ローカル優先、プライバシー、npm / JavaScript前提を明示する

依頼例:

```text
この製品要求書の設計判断候補から hachi-adr で設計判断記録を作ってください。
1つの記録に1つの判断だけを書くことを守り、前提、代替案、結果、後戻り条件、
実装メモ、検証メモを含めてください。
```

```text
この設計判断候補は保存形式、実行環境、プライバシーが混ざっています。
hachi-adr で分割すべきか判断し、最初に書くべき設計判断記録を作ってください。
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
- 設計判断記録の判断

判断値:

- `accept_adr`
- `refine_adr`
- `split_adr`
- `return_to_prd`
- `discard`

## よくある使い方

### テーマから始める

```text
「エージェントの記憶管理」周辺で hachi-sense を使って課題の種を集めてください。
その後、hachi-position で上位候補、痛みが強い候補、特徴的な候補を選び、主候補を評価してください。
```

### 既存アイデアから始める

```text
このアイデアを hachi-position で評価してください。
進める価値があるなら hachi-concept に渡し、最初のワークフローを磨いてください。
```

### GitHubリポジトリから始める

```text
このリポジトリを hachi-concept の抽出モードで見てください。
潜在コンセプトを抽出し、製品要求書に進められるか判断してください。
```

### コンセプトから始める

```text
このコンセプト概要を hachi-prd で標準の詳しさの製品要求書にしてください。
非目標を守り、設計判断候補を抽出してください。
```

### 製品要求書から始める

```text
この製品要求書の設計判断候補から hachi-adr で設計判断記録を作ってください。
独立した判断は1つの記録にまとめず、分割してください。
```

## 出力ロケール

各スキルはユーザーの指定言語に合わせて出力します。日本語で依頼した場合は、日本語見出し・日本語フィールド名で出力しつつ、`seed_id`、URL、`promote_to_prd` などの安定IDや判断値は保持します。

例:

```text
日本語で hachi-prd を使って、このコンセプト概要から最小版の製品要求書を作って。
```

```text
hachi-position を英語で使い、この課題の種を評価してください。
```

## 品質検証

以下を実行してください。

```bash
npm run validate
```

検証スクリプトは以下を確認します。

- 各スキルフォルダに `SKILL.md` がある
- frontmatter の `name` がフォルダ名と一致する
- frontmatter が `name` と `description` のみを持つ
- `agents/openai.yaml` に表示用メタデータがある
- `SKILL.md` から参照された `references/` と `examples/` が実在する
- スキル配下にnpm / JavaScript以外の実装前提が混ざっていない

評価レポート:

- [docs/skill-evaluation-2026-06-02.md](docs/skill-evaluation-2026-06-02.md)

## メンテナンス方針

- `SKILL.md` は入口として簡潔に保つ
- 詳細な判断基準は `references/` に置く
- 例は短くても品質ゲートを体現する
- npm / Node.js / JavaScript 前提を守る
- ローカル優先のMarkdown成果物を `factory/` 以下に残す
- 製品要求書に設計判断記録を書きすぎない
- 設計判断記録を実装タスク一覧にしない
- 変更後は `npm run validate` を実行する

## 参照

- Vercel Agent Skills documentation: https://vercel.com/docs/agent-resources/skills
- Vercel Skills CLI: https://github.com/vercel-labs/skills
- Skills directory: https://skills.sh

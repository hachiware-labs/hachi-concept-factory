# hachi-concept-factory Skill Evaluation - 2026-06-02

## 1. 評価目的

5つのSkillを、単一の理想ケースではなく、複数の実運用要件に当てて評価する。

目標は、各Skillが90点相当の実用品質に届いているかを確認し、弱点がある場合はSkill定義・参照資料・例へ反映することである。

## 2. 想定要件シナリオ

| ID | シナリオ | 主に効くSkill |
|---|---|---|
| R1 | 日本語の短い依頼だけで開始する | all |
| R2 | 外部ソースが少ない、またはアクセス不能 | hachi-sense, hachi-position |
| R3 | social trendがノイズだらけ | hachi-sense |
| R4 | GitHub repository / README / Issueから潜在コンセプトを抽出する | hachi-concept |
| R5 | 大手vendorや成熟OSSに吸収されやすい市場を評価する | hachi-position |
| R6 | first-useだけでなく継続利用価値を評価する | hachi-concept, hachi-prd |
| R7 | thin Concept BriefからPRDを作る | hachi-prd |
| R8 | detailed / full PRDでユーザー分析と操作イメージを描き切る | hachi-prd |
| R9 | 1つのADRに複数判断が混ざる | hachi-adr |
| R10 | privacy / local-first / npm JavaScript前提を守る | hachi-prd, hachi-adr |
| R11 | 後続Skillへ迷わず渡せるhandoffを作る | all |
| R12 | 日本語出力で英語見出しを混ぜない | all |

## 3. 評価軸

各Skillを100点満点で評価した。

| 評価軸 | 配点 |
|---|---:|
| Trigger / scope clarity | 10 |
| Workflow completeness | 15 |
| Evidence and traceability | 15 |
| Output schema and handoff | 15 |
| Decision gates and failure handling | 15 |
| hachiware-labs fit / moat alignment | 10 |
| Locale handling | 10 |
| Example quality and progressive disclosure | 10 |

90点の条件は、通常入力だけでなく、情報不足、ノイズ、競合吸収、scope creep、mixed decisionsのような崩れやすい入力でも、適切に止める・下げる・分割する・次工程に渡す判断ができることとした。

## 4. 採点結果

| Skill | 点数 | 評価 |
|---|---:|---|
| hachi-sense | 91 | noisy / sparse sourceでもSEEDを絞り、confidenceとhandoffを明示できる |
| hachi-position | 91 | vendor / OSS riskを踏まえ、promotion条件とdecision triggerを説明できる |
| hachi-concept | 92 | first-use / repeated-use / example input-output / activation momentでPRD前の具体性が上がった |
| hachi-prd | 90 | user analysis、operation image、traceability、ADR候補まで実装readyに近い |
| hachi-adr | 92 | grill-me style、1 ADR = 1 decision、assumption ledger、verificationまで高密度に詰められる |

## 5. Skill別評価

### hachi-sense

強い点:

- SEEDをPRDやConceptと混同しない役割分担が明確。
- facts / inference / judgmentを分けるため、調査結果がそのまま仮説に飛ばない。
- source count target、selection rules、discard / merge rulesにより、ノイズを候補にしすぎない。
- 今回追加した `quality-gates.md` により、user-provided notes only、sparse sources、high-noise social trend、repository mining、vendor release起点を扱いやすくなった。

弱点と補強:

- 弱点: source不足時にどこまで言ってよいかが曖昧だった。
- 補強: `Evidence Gaps and Carry-forward` とsource gap時のconfidence低下を追加。
- 弱点: hachi-positionへのhandoff粒度が不足しやすかった。
- 補強: affected user、pain、workaround、strongest evidence、weakest evidence gap、product hypothesis hintをhandoff bundleとして明示。

残るリスク:

- 実際の外部調査品質はCodex側の検索・閲覧能力に依存する。
- 定量的なtrend validationはまだ手動判断であり、将来はfixtureやsource logで評価できる。

### hachi-position

強い点:

- product hypothesis、market/vendor landscape、OSS alternatives、manual workaround、moat、wedgeが分かれている。
- vendor riskとOSS competition riskが「高いほど悪い」と明示され、採点解釈のブレが小さい。
- `research-completion.md` により、quick / standard / deepの調査完了条件がある。
- 今回追加した `quality-gates.md` により、crowded market、weak evidence、vendor absorption、mature OSS、broad SEEDへの対処が明確になった。

弱点と補強:

- 弱点: promotion後にhachi-conceptへ渡す材料が不足する場合があった。
- 補強: promoted時に3-7 bulletsのhachi-concept inputを求めるgateを維持し、decision triggerも追加。
- 弱点: 調査不足でも強く言い切るリスクがあった。
- 補強: `Research Gaps and Decision Triggers` を出力構造に追加。

残るリスク:

- 市場調査の網羅性は時間と検索可能ソースに依存する。
- vendor roadmapの読み違いは残るため、decision triggerを残す運用が重要。

### hachi-concept

強い点:

- extract / refine / synthesizeのモード分岐が明確。
- self-refinement loopにより、conceptをそのままPRDへ流さず、批判して磨ける。
- example input、example output、activation moment、sharpest non-goal、not-a-prompt rationaleがPRD昇格gateになっている。
- 今回追加した `experience-gates.md` により、first-useだけでなくrepeated-use experienceを評価できる。

弱点と補強:

- 弱点: 「最初の体験」だけに寄り、継続利用価値のあるConceptでMoatが薄くなる可能性があった。
- 補強: first-use experienceとrepeated-use experienceを両方扱うようにした。
- 弱点: ミニ例が新しい必須項目を十分に表現していなかった。
- 補強: mini exampleにSignature Workflow、入力例、出力例、Activation moment、Sharpest non-goalを追加。

残るリスク:

- Conceptの良さはまだ評価者のjudgmentに依存する。
- 将来はbad concept fixturesを作り、promote_to_prdを誤って出さないか確認したい。

### hachi-prd

強い点:

- detailed user analysisとpain point formatが強く、PRDが抽象論で止まりにくい。
- use caseがoperation imageまで要求するため、実装者がユーザー操作を想像しやすい。
- density levelにより、mvp / standard / fullの出力量を調整できる。
- 今回追加した `implementation-readiness.md` により、requirement traceability、edge cases、readiness gateが明確になった。

弱点と補強:

- 弱点: requirementsがpainやuse caseと切れて、実装タスクリスト化するリスクがあった。
- 補強: `Requirement Traceability` を追加し、主要FRをpain / use case / concept constraintへ接続するようにした。
- 弱点: edge caseやprivacy/local-first checksがADRへ先送りされやすかった。
- 補強: PRD時点でmissing input、mixed locale、sensitive data、handoff failureなどを扱うchecklistを追加。

残るリスク:

- 90点に達しているが、5Skill中もっとも情報量が多く、出力が肥大化しやすい。
- `full` densityでは、PRDとADRの境界を守るレビューが必要。

### hachi-adr

強い点:

- grill-me styleで、情報不足時にも止まらず保守的仮定を置ける。
- `decision-splitting.md` により、1 ADR = 1 decisionを守りやすい。
- assumption ledgerとverification notesの上限規律により、細かいが散らかりにくい。
- 今回追加した `acceptance-gates.md` により、accept_adrにしてよい条件と拒否条件が明確になった。

弱点と補強:

- 弱点: 詳細に詰めるほど、複数判断を1本にまとめるリスクがあった。
- 補強: split_adr条件とaccept_adr拒否条件を追加。
- 弱点: mini exampleがgrill-me水準より薄かった。
- 補強: alternatives、consequences、implementation notes、verification notesを具体化した。

残るリスク:

- ADRは詳細化しすぎると実装計画に寄る。
- `Size Discipline` と `acceptance-gates.md` を運用で必ず読む必要がある。

## 6. 今回追加・更新した主な成果物

| 種別 | Path |
|---|---|
| hachi-sense品質ゲート | `skills/hachi-sense/references/quality-gates.md` |
| hachi-position品質ゲート | `skills/hachi-position/references/quality-gates.md` |
| hachi-concept体験ゲート | `skills/hachi-concept/references/experience-gates.md` |
| hachi-prd実装準備ゲート | `skills/hachi-prd/references/implementation-readiness.md` |
| hachi-adr採択ゲート | `skills/hachi-adr/references/acceptance-gates.md` |
| mini examples | `skills/*/examples/*-mini.md` |
| UI metadata | `skills/*/agents/openai.yaml` |

## 7. 検証

実行コマンド:

```text
npm run validate
```

結果:

```text
OK hachi-adr
OK hachi-concept
OK hachi-position
OK hachi-prd
OK hachi-sense
Validated 5 skill(s).
```

追加確認:

- 新しい参照ファイルは各 `SKILL.md` から参照されている。
- 現行validatorは、`SKILL.md` から参照された `references/` / `examples/` の存在も検査する。
- 現行validatorは、Skill配下にnpm / JavaScript以外の実装前提が混ざることも検査する。
- 未処理マーカーやnpm / JavaScript以外の実装前提の混入はスキル本体にはない。
- mini examplesは新しい品質ゲートの要点を含む。

## 8. 次の90点維持条件

- 実際のSEED / Positioning / Concept / PRD / ADRを1件ずつ生成し、bad caseに対して誤ってpromoteしないかを見る。
- 将来のvalidatorで、example内の必須sectionとJapanese heading map coverageも検査する。
- 外部調査を伴うhachi-sense / hachi-positionは、source logを保存して判断の再現性を高める。

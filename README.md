# hachi-concept-factory

Vercel Skills for turning user pain seeds into product concepts, PRDs, and ADRs.

`hachi-concept-factory` is a five-skill workflow for product discovery and specification. It starts from weak user pain signals, evaluates market position and moat, sharpens the product concept, writes an implementation-ready PRD, and records architectural decisions as ADRs.

```text
SEED
  -> Positioning
  -> Concept
  -> PRD
  -> ADR
```

Japanese guide: [README_ja.md](README_ja.md)

## What you get

- A repeatable path from vague product signals to PRDs and ADRs.
- Fewer premature PRDs: weak ideas must pass SEED, positioning, concept, and readiness gates.
- Better product judgment: vendor risk, OSS competition, moat, wedge, non-goals, and repeated-use value are evaluated explicitly.
- More implementable specifications: PRDs include user analysis, pain points, operation-image use cases, acceptance criteria, and requirement traceability.
- Better design memory: ADRs preserve assumptions, alternatives, trade-offs, reversibility, and verification notes.
- Local-first artifacts: outputs can be kept as Markdown under `factory/` for human review and future agent handoff.

## Quick start

Install all skills from a published repository:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill '*'
```

Install all skills from a local clone:

```bash
git clone https://github.com/hachiware-labs/hachi-concept-factory.git
cd hachi-concept-factory
npm run validate
npx skills add . --skill '*'
```

Then ask your agent:

```text
Use hachi-sense to collect SEEDs for "agent memory governance".
Then let hachi-position select promising, painful, or distinctive SEEDs and refine the primary candidate with hachi-concept.
```

If you only want one skill:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-prd
```

Use project installation when the skills should be shared with a repository. Use `--global` when you want them available across projects.

## Skills

| Skill | Purpose | Main output |
|---|---|---|
| `hachi-sense` | Collect user pain signals, weak market signals, workarounds, repeated questions, and unmet needs. | SEED Report |
| `hachi-position` | Select promising, painful, or distinctive SEEDs, then evaluate whether a candidate has defensible market position, wedge, moat, and hachiware-labs fit. | Positioning Report |
| `hachi-concept` | Extract, refine, or synthesize a product concept from SEEDs, positioning reports, repositories, or notes. | Concept Brief |
| `hachi-prd` | Turn a Concept Brief into a detailed, implementation-ready PRD. | PRD |
| `hachi-adr` | Create rigorous one-decision ADRs from PRD ADR candidates or design decisions. | ADR |

## Deliverables

Each skill produces a durable artifact that can be reviewed, edited, saved under `factory/`, and handed to the next skill.

| Skill | Deliverables you can ask for | Useful when you need... | Recommended location |
|---|---|---|---|
| `hachi-sense` | SEED Report, signal map, evidence notes, confidence scores, handoff notes | a structured view of unresolved user pain before choosing a product idea | `factory/seeds/` |
| `hachi-position` | Candidate selection, Positioning Report, vendor / OSS risk analysis, moat and wedge scores, promote / watch / merge / discard decision | a decision on which SEED should be evaluated and whether it is worth productizing | `factory/positioning/` |
| `hachi-concept` | Concept Brief, refinement log, signature workflow, example input / output, PRD readiness check | a concept that is concrete enough to become requirements | `factory/concepts/` |
| `hachi-prd` | MVP / standard / full PRD, user analysis, pain points, operation-image use cases, requirements, acceptance criteria, ADR candidates | a buildable specification that engineers and agents can implement from | `factory/prds/` |
| `hachi-adr` | ADR, assumption ledger, alternatives, consequences, rollback path, verification notes, follow-up tasks | a durable record of one architectural decision | `factory/adrs/` |
| full workflow | Discovery packet, product decision trail, Concept Brief, PRD, ADR set, run log | an end-to-end product discovery and specification handoff | `factory/runs/` plus each stage directory |

## Why this exists

Most product work starts too late, often at the PRD stage. `hachi-concept-factory` starts earlier:

- collect unresolved pain as structured SEEDs
- evaluate vendor risk, OSS competition, differentiation, and moat
- refine concepts until first input, first output, activation moment, non-goals, and repeated-use value are concrete
- write PRDs with user analysis, pain points, operation-image use cases, traceable requirements, and ADR candidates
- record architecture decisions with assumptions, alternatives, consequences, reversibility, and verification notes

The workflow is designed for local-first, agent-friendly product development with Markdown artifacts that humans and agents can both reuse.

## Repository layout

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

## Requirements

- Node.js 20 or later
- `npx` for the Vercel Skills CLI
- An agent that supports installed skills, such as Codex, Claude Code, Cursor, GitHub Copilot, Cline, OpenCode, and others supported by the `skills` CLI

Validate the skill folders:

```bash
npm run validate
```

## Install with Vercel Skills

The Vercel Skills CLI installs skills with:

```bash
npx skills add <source>
```

For repositories that contain multiple skills, install a specific skill with:

```bash
npx skills add <source> --skill <skill-name>
```

The commands below assume this repository is published as `hachiware-labs/hachi-concept-factory`.

### List available skills

```bash
npx skills add hachiware-labs/hachi-concept-factory --list
```

From a local clone:

```bash
npx skills add . --list
```

### Install all skills

Install all five skills into the current project / selected agent. This is the recommended setup when you want the full SEED -> Positioning -> Concept -> PRD -> ADR workflow:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill '*'
```

From a local clone:

```bash
npx skills add . --skill '*'
```

Install all skills globally:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill '*' --global
```

Install all skills for Codex explicitly:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill '*' --agent codex
```

Install all skills for every detected agent:

```bash
npx skills add hachiware-labs/hachi-concept-factory --all
```

### Install individual skills

Install only the skill you need when your workflow starts in the middle. For example, install `hachi-prd` if you already have a Concept Brief, or `hachi-adr` if you already have a PRD with ADR candidates.

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-sense
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-position
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-concept
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-prd
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-adr
```

From a local clone:

```bash
npx skills add . --skill hachi-sense
```

For global installation:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-prd --global
```

For a specific agent:

```bash
npx skills add hachiware-labs/hachi-concept-factory --skill hachi-adr --agent codex
```

### Which skill should I install?

| If you have... | Install / use |
|---|---|
| a topic, trend, rough problem area, or market curiosity | `hachi-sense` |
| a SEED, SEED report, or rough product idea to evaluate or rank | `hachi-position` |
| a SEED, positioning report, repository, README, or rough concept | `hachi-concept` |
| a Concept Brief that should become buildable requirements | `hachi-prd` |
| a PRD, ADR candidate, or architecture decision | `hachi-adr` |
| an end-to-end discovery workflow | all five skills |

### After installation

Start a new agent session or reload your agent environment if needed. Then mention the skill by name in your request, for example:

```text
Use hachi-prd to turn this Concept Brief into a standard-density PRD.
```

Most agents trigger skills from the installed skill metadata. Naming the skill explicitly is the most reliable way to start.

The configured display names also work as shorthand triggers. You can start with the shorthand, then add the topic, artifact, mode, density, output locale, and save location you want:

| Shorthand | Good for | Example requests |
|---|---|---|
| `hachi-sense` | finding and scoring pain signals | `hachi-sense: collect SEEDs for "agent memory governance".`<br>`hachi-sense: turn these notes into SEED candidates and save them under factory/seeds/.` |
| `hachi-position` | selecting candidates and deciding whether a SEED should advance | `hachi-position: select the top 3 SEEDs from this report, then fully evaluate the primary candidate.`<br>`hachi-position: choose SEEDs with sharp pain, distinctive problem framing, or clear solution gaps, then check vendor risk, OSS risk, moat, and hachiware-labs fit.` |
| `hachi-concept` | refining or extracting a concept | `hachi-concept: refine this positioning report into a PRD-ready Concept Brief.`<br>`hachi-concept extract: read this repository and identify the latent product concept.` |
| `hachi-prd` | writing implementation-ready requirements | `hachi-prd: create a standard-density PRD from this Concept Brief.`<br>`hachi-prd mvp: include users, pain points, operation-image use cases, acceptance criteria, and ADR candidates.` |
| `hachi-adr` | recording architecture decisions | `hachi-adr: write one rigorous ADR from this ADR candidate.`<br>`hachi-adr: split mixed decisions, choose the first ADR, and include rollback and verification notes.` |

For longer workflows, combine the shorthand names in one request:

```text
hachi-sense -> hachi-position -> hachi-concept.
Find SEEDs for "agent memory governance", let hachi-position choose the top, painful, and distinctive candidates, then refine the primary one into a Concept Brief.
Use Japanese output and save artifacts under factory/.
```

### Update, list, and remove

List installed skills:

```bash
npx skills list
```

Update installed skills:

```bash
npx skills update
```

Update one skill:

```bash
npx skills update hachi-prd
```

Remove one skill:

```bash
npx skills remove hachi-adr
```

Remove all installed skills from a selected scope:

```bash
npx skills remove --skill '*'
```

## How to use the full workflow

Use the five skills as a pipeline:

```text
hachi-sense
  -> hachi-position
  -> hachi-concept
  -> hachi-prd
  -> hachi-adr
```

Recommended artifact locations:

| Stage | Directory |
|---|---|
| SEED reports | `factory/seeds/` |
| Positioning reports | `factory/positioning/` |
| Concept briefs | `factory/concepts/` |
| PRDs | `factory/prds/` |
| ADRs | `factory/adrs/` |
| Run logs / experiments | `factory/runs/` |

### Story: from pain discovery to ADR

Imagine you notice that small product teams keep losing context when AI agents hand work to each other. The pain is still vague: people complain about "agent memory", "bad handoffs", and "hard-to-review runs", but it is not yet a product.

Start with `hachi-sense`. Ask it to collect SEEDs for the area, separate observed facts from inference, cluster repeated complaints, score confidence, and save a SEED Report under `factory/seeds/`. The output should not be a product spec yet. It should tell you which pain signals are real enough to investigate, which are weak, and what evidence is missing.

Next, pass the whole SEED report to `hachi-position`. Ask it to select candidates by user pain intensity, pain ownership, evidence strength, existing-solution gap, problem distinctiveness, wedge sharpness, hachiware-labs fit, moat potential, risk-adjusted feasibility, and learning value. It can choose top candidates, pain-first candidates, distinctive candidates, solution-gap candidates, safe candidates, or risky-but-interesting candidates before running full positioning on the primary candidate. Save the Positioning Report under `factory/positioning/`.

If the SEED is worth advancing, use `hachi-concept`. Ask for refine mode when you already have a SEED and positioning report, or extract mode when you are reading an existing repository. This skill turns the opportunity into a Concept Brief with a target user, first workflow, example input, example output, activation moment, non-goals, repeated-use value, and PRD readiness. Save it under `factory/concepts/`.

Then use `hachi-prd`. Ask for `mvp`, `standard`, or `full` density depending on how much detail you need. The PRD should draw the user analysis, pain points, operation-image use cases, functional requirements, non-functional requirements, acceptance criteria, success metrics, traceability, and ADR candidates. Save it under `factory/prds/`.

Finally, use `hachi-adr` for each important architecture decision from the PRD. Ask it to keep one decision per ADR, infer conservative defaults when information is missing, compare alternatives, record consequences, define rollback conditions, and include verification notes. Save ADRs under `factory/adrs/`. At this point, the original vague pain has become a reviewable chain of artifacts from evidence to product decision to implementation plan to architecture record.

One compact prompt for the whole story:

```text
hachi-sense -> hachi-position -> hachi-concept -> hachi-prd -> hachi-adr.
Start from the problem area "AI agent handoff failures for small product teams".
Find SEEDs, select the top, painful, and distinctive candidates, evaluate the primary SEED, refine it into a Concept Brief,
write an MVP PRD, then create the first ADR candidate.
Save durable artifacts under factory/ and explain each promotion decision.
```

Example end-to-end prompt:

```text
Use hachi-sense to collect SEEDs for "local-first agent evaluation".
Then use hachi-position to select and evaluate the strongest or most distinctive SEED, refine it with hachi-concept,
turn it into an MVP PRD with hachi-prd, and extract ADR candidates with hachi-adr.
Use Japanese output and save durable artifacts under factory/.
```

Completed sample flow:

- SEED: [factory/seeds/2026-06-01_multi-agent-small-company.md](factory/seeds/2026-06-01_multi-agent-small-company.md)
- Positioning: [factory/positioning/2026-06-01_agent-trace-lens.md](factory/positioning/2026-06-01_agent-trace-lens.md)
- Concept: [factory/concepts/2026-06-01_agent-trace-lens.md](factory/concepts/2026-06-01_agent-trace-lens.md)
- PRD: [factory/prds/2026-06-02_agent-trace-lens-mvp.md](factory/prds/2026-06-02_agent-trace-lens-mvp.md)
- ADR: [factory/adrs/2026-06-02_agent-trace-lens-run-review-schema.md](factory/adrs/2026-06-02_agent-trace-lens-run-review-schema.md)
- Gate test: [factory/runs/2026-06-02_agent-trace-lens-skill-gate-test.md](factory/runs/2026-06-02_agent-trace-lens-skill-gate-test.md)

## hachi-sense

Use `hachi-sense` when you want to collect product opportunity material before deciding what to build.

It is useful for:

- finding user pain signals
- collecting weak market signals
- clustering repeated questions and workarounds
- turning messy notes into structured SEEDs
- deciding whether a signal should advance to `hachi-position`

Example prompts:

```text
Use hachi-sense to collect SEEDs around "AI agent handoff failures" for the last 30 days.
```

```text
Use hachi-sense on these notes. Separate observed facts, inferences, and judgments.
Promote only the strongest SEEDs to hachi-position.
```

Expected output sections include:

- scope
- executive summary
- signal map
- SEED candidates
- scores and confidence
- recommended next step
- evidence gaps and carry-forward notes

Decision values:

- `position`
- `watch`
- `merge`
- `discard`

## hachi-position

Use `hachi-position` to select promising or distinctive SEEDs from a SEED report, or to decide whether one SEED is worth turning into a product concept.

It is useful for:

- checking big vendor absorption risk
- selecting top, pain-first, distinctive, solution-gap, safe, or risky-but-interesting candidates from a hachi-sense report
- checking commercial and OSS alternatives
- identifying manual workarounds
- clarifying differentiation
- evaluating moat and wedge
- deciding whether to promote to `hachi-concept`

Example prompts:

```text
Use hachi-position on this hachi-sense report. Select the top 3 candidates,
identify one distinctive but risky candidate, then fully evaluate the primary SEED.
```

```text
Use hachi-position in pain-first mode. Choose the SEED with the sharpest repeated user pain,
even if the product form is still unclear.
```

```text
Use hachi-position to evaluate this SEED. Check big vendor risk, OSS competition,
manual workarounds, differentiation, moat, wedge clarity, and buildability.
```

```text
This idea sounds useful, but it may be absorbed by a major vendor.
Use hachi-position and tell me whether to promote, watch, merge, or discard.
```

Expected output sections include:

- candidate selection, when multiple SEEDs are provided
- product hypothesis
- market and vendor landscape
- differentiation analysis
- moat analysis
- positioning options
- recommendation
- scores
- research gaps and decision triggers

Decision values:

- `promote_to_concept`
- `watch`
- `merge`
- `discard`

## hachi-concept

Use `hachi-concept` to turn a SEED, positioning report, repository, README, issue set, or rough idea into a PRD-ready concept.

Modes:

- `extract`: infer latent concepts from repositories, README files, docs, issues, examples, CLI help, code structure, or notes
- `refine`: sharpen one concept or positioning brief
- `synthesize`: merge multiple SEEDs, positioning reports, repositories, or past concepts

Example prompts:

```text
Use hachi-concept in refine mode on this positioning report.
Make the target user, first workflow, example input, example output,
activation moment, sharpest non-goal, and PRD readiness concrete.
```

```text
Use hachi-concept in extract mode on this GitHub repository.
Identify the latent product concept and whether it should become a Skill, CLI, SaaS, or library.
```

Expected output sections include:

- concept summary
- pain and context
- signature workflow and experience
- proposed concept
- differentiation
- moat
- wedge and MVP direction
- refinement log
- PRD readiness
- recommendation

Decision values:

- `promote_to_prd`
- `refine`
- `merge`
- `watch`
- `discard`

## hachi-prd

Use `hachi-prd` to turn a Concept Brief into an implementation-ready PRD.

It is useful for:

- detailed user analysis
- pain point analysis
- operation-image use cases
- functional and non-functional requirements
- acceptance criteria
- requirement traceability
- success metrics
- ADR candidate extraction

Density levels:

- `mvp`: compact and buildable
- `standard`: default handoff quality
- `full`: broader analysis for high-stakes or multi-role products

Example prompts:

```text
Use hachi-prd to create an MVP PRD from this Concept Brief.
Include detailed user analysis, pain points, operation-image use cases,
traceable requirements, acceptance criteria, and ADR candidates.
```

```text
Use hachi-prd with full density. Draw the user analysis and pain points in detail,
including operator, reader, maintainer, current workflow, failure consequence,
and repeated-use behavior.
```

Expected output sections include:

- metadata
- summary
- target users
- user analysis
- pain points
- goals and non-goals
- use cases and operation image
- functional requirements
- non-functional requirements
- requirement traceability
- acceptance criteria
- ADR candidates
- readiness decision

Decision values:

- `promote_to_adr`
- `refine_prd`
- `return_to_concept`
- `watch`
- `discard`

## hachi-adr

Use `hachi-adr` to write rigorous ADRs from PRD ADR candidates or design decisions.

It is useful for:

- recording why a design decision was chosen
- splitting mixed decisions into separate ADRs
- inferring conservative defaults when context is incomplete
- comparing alternatives
- documenting consequences, risks, mitigations, reversibility, and verification
- keeping local-first and npm / JavaScript assumptions explicit

Example prompts:

```text
Use hachi-adr to create an ADR from this PRD candidate.
Keep it to one decision, include assumptions, alternatives, consequences,
rollback path, implementation notes, and verification notes.
```

```text
This ADR candidate mixes storage format, runtime, and privacy behavior.
Use hachi-adr to decide whether it should be split, then write the first ADR.
```

Expected output sections include:

- metadata
- context
- assumption ledger
- decision
- rationale
- alternatives considered
- consequences
- risks and mitigations
- implementation notes
- verification notes
- follow-up tasks
- ADR decision

Decision values:

- `accept_adr`
- `refine_adr`
- `split_adr`
- `return_to_prd`
- `discard`

## Common usage patterns

### Start from a topic

```text
Use hachi-sense to find product SEEDs around "agent memory governance".
Then use hachi-position to select the top and distinctive candidates and evaluate the primary one.
```

### Start from an existing idea

```text
Use hachi-position to evaluate this product idea.
If it is viable, pass it to hachi-concept and refine the first workflow.
```

### Start from a repository

```text
Use hachi-concept in extract mode on this repository.
Infer the product concept, then decide whether it is PRD-ready.
```

### Start from a concept

```text
Use hachi-prd to turn this Concept Brief into a standard-density PRD.
Preserve the non-goals and extract ADR candidates.
```

### Start from a PRD

```text
Use hachi-adr to create ADRs from the ADR Candidates section.
Split independent decisions instead of putting them in one ADR.
```

## Output locale

All skills follow the user's requested language. If the user asks in Japanese, the skills should output Japanese headings and field labels while preserving stable IDs, URLs, and decision values such as `promote_to_prd`.

Examples:

```text
日本語で hachi-prd を使って、このConcept BriefからMVP PRDを作って。
```

```text
Use hachi-position in English for this SEED.
```

## Validation and quality

Run:

```bash
npm run validate
```

The validator checks:

- each skill folder has a matching `SKILL.md`
- frontmatter contains only `name` and `description`
- `agents/openai.yaml` includes UI metadata when present
- referenced `references/` and `examples/` files exist
- skill files do not contain unsupported implementation prerequisites

The current evaluation report is available at:

- [docs/skill-evaluation-2026-06-02.md](docs/skill-evaluation-2026-06-02.md)

## Notes for maintainers

- Keep `SKILL.md` concise and put detailed rules in `references/`.
- Keep examples small but representative of the quality gate.
- Prefer npm / Node.js / JavaScript tooling.
- Preserve local-first Markdown artifacts under `factory/`.
- Avoid turning PRDs into ADRs or ADRs into task plans.
- Run `npm run validate` after changing skills.

## References

- Vercel Agent Skills documentation: https://vercel.com/docs/agent-resources/skills
- Vercel Skills CLI: https://github.com/vercel-labs/skills
- Skills directory: https://skills.sh

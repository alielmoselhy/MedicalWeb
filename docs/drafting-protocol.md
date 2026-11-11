# Drafting protocol

This explains how to add diseases to MedicalWeb, step by step. Anyone who follows it, whether a person or a model, should produce files that match the existing ones and pass the validator.

Read it all once before starting. Then work through §3–§9 in order for every batch.

---

## 0. What the project is, and the rules that never bend

MedicalWeb is a graph of diseases built for studying the **LMC Syllabus 2026**. Each disease is a set of nodes: causal **chains** (cause → mechanism → finding), **findings** and **outcomes**. Diseases link to each other by sharing nodes and by `parent` ("is a kind of") relations between nodes. The point is to show what diseases have in common, so **reusing an existing node is the most important skill in this job**.

The owner is a medical student. These rules come from them:

1. **Agree before deciding.** Anything structural needs the owner's approval before you build it: a new system, an umbrella file, a new parent concept, a second system on a disease, renaming or removing an existing node. Propose it, then wait. Routine drafting inside an agreed plan needs no approval.
2. **Only cite what you have read.** Every `source` must point at a page or section you actually opened, and the source must contain the fact. If you can't find a source for a fact, leave the fact out.
3. **Paraphrase.** Never copy sentences from the books. Notes are short and in your own words.
4. **`status: draft`** on every file you create. Only the owner changes it to `reviewed`.
5. **Draft two batches at a time**, then stop, report, and wait for the go-ahead.
6. **British spelling** (haemorrhage, oedema, tumour), and **sentence case** for names.
7. **Never commit to git or publish anything** unless the owner asks. `Resources/` is private and must never leave the machine.

---

## 1. Map of the files

| Path | What it is |
|---|---|
| `syllabus.yaml` | The syllabus sections (= **systems**) and subsections (= **groups**). The only place systems and groups are defined. |
| `nodes.yaml` | The shared vocabulary: every cause, mechanism, finding and outcome. One node per line. |
| `Diseases/<id>.yaml` | One disease per file. |
| `docs/concepts-<system>.md` | The plan for each system, agreed with the owner: disease list, parent concepts, decisions, progress. **Read the one for the system you're working on before every batch.** |
| `docs/open-decisions.md` | Open questions for the owner. Add to it, never resolve items yourself. |
| `README.md` ("Standards") | The data rules. The validator enforces the ones marked ✓. |
| `scripts/build.js` | The validator. It also builds `app/src/graph.json`. |
| `Resources/Kumar_Clark_md/` | Kumar & Clark 10th edition, one Markdown file per chapter (`KC26_Neurology.md`, …). |
| `Resources/Mehlman_md/` | The Mehlman high-yield PDFs as Markdown (`15 HY Neuro.md`, …). |
| `Resources/*.pdf` | The syllabus PDF and the LMC teaching handouts. |

Commands, run from the repo root:

```sh
npm run build:data   # validate the data; prints "ok: N nodes, M edges" or the list of errors
npm test             # validator self-tests (should all pass)
npm run build        # build the app (checks the app still compiles with the new data)
```

---

## 2. Sources and how to cite them

### 2.1 Kumar & Clark (the main source)

**Citations use the printed page number, not the PDF page.**
- The Markdown files contain markers like `<!-- p857 -->`. Each marks the **start** of that PDF page.
- printed page = PDF page − chapter offset

| Chapter | Offset | | Chapter | Offset |
|---|---|---|---|---|
| 3 Immunity | −15 | | 18 Rheumatology | −24 |
| 16 Haematology | −24 | | 17 Haematological oncology | −24 |
| 8 Sepsis | −19 | | 30 Cardiology | −16 |
| 10 Critical care | −19 | | 31 Hypertension | −16 |
| 20 Infectious disease | −22 | | 32 Gastroenterology | −15 |
| 22 Dermatology | −22 | | 6 Malignant disease | −21 |
| 12 Prescribing and toxicology | −18 | | 27 ENT and eye | −19 |
| 24 Lipids | −21 | | 33 Nutrition | −15 |
| 26 Neurology | −20 | | 34 Liver | −14 |
| 28 Respiratory | −18 | | 35 Biliary and pancreas | −14 |
| 29 VTE | −17 | | 36 Kidney | −13 |
| 9 Water and electrolytes | −19 | | 37 STIs and HIV | −13 |
| 21 Endocrinology | −22 | | 40 Men's health | −12 |
| 23 Diabetes mellitus | −22 | | 19 Bone disease | −23 |
| 38 Obstetric medicine | −13 | | 39 Women's health | −13 |

**For any other chapter, work out the offset first and record it:**
1. Near the top of the chapter file is a contents line, e.g. `Brain tumours 874 Hydrocephalus 876`.
2. Find that heading in the file (e.g. `## Brain Tumours`). Note the nearest `<!-- pN -->` marker **above** it.
3. offset = N − printed number. Check two or three headings, which should all agree. Ch.26: the `## Brain Tumours` heading sits after `<!-- p894 -->` and the contents say 874, so the offset is −20.
4. Add the new offset to this table and to the README "Sources" section.
5. Ch.6 (Malignant disease): −21, checked on six contents headings (2026-11-10).

**To find the printed page of any line**, print each matching line with the last marker above it:

```sh
awk '/<!-- p[0-9]+ -->/{p=$0} /Subdural/{print NR" ["p"] "substr($0,1,200)}' Resources/Kumar_Clark_md/KC26_Neurology.md
```

The line `4074 [<!-- p867 -->] Headache, drowsiness…` is on printed page 867 − 20 = **847**.

To read a whole section, list the headings with their line numbers, then read that range:

```sh
grep -nE '^#{1,3} ' Resources/Kumar_Clark_md/KC26_Neurology.md
sed -n '3937,4118p' Resources/Kumar_Clark_md/KC26_Neurology.md
```

**Citation formats** (the validator rejects anything else):
- `K&C 10e p.847`
- `K&C 10e p.845-847`, or `K&C 10e p.836, 845` for pages that aren't consecutive
- `K&C 10e p.1084 (Box 30.28)`

The text's own cross-references ("see p. 848") are sometimes off by a page or two. Always trust the markers instead.

### 2.2 Mehlman high-yield

Cite by book name: `Mehlman HY Neuro`, `Mehlman HY Neuroanatomy`, `Mehlman HY Pathology`, `Mehlman HY Cardio`, `Mehlman HY Pulmonary`, `Mehlman HY Gastro`, `Mehlman HY Renal`, `Mehlman HY Endocrine`, `Mehlman HY Heme-Onc`, `Mehlman HY Immuno`, `Mehlman HY Biochemistry`, `Mehlman HY Repro-OBGYN`, `Mehlman HY Anatomy-MSK-Rheum`, `Mehlman HY Psych`, `Mehlman HY Ophthal`, `Mehlman HY Arrows`.

Two books have a space in their names, which fails the validator. Write them with a hyphen: `Mehlman HY Risk-Factors` and `Mehlman HY USMLE-Genetics`.

Mehlman is written for the USMLE. Use it for:
- high-yield associations (e.g. EGFR → glioblastoma)
- imaging descriptions
- exam clues

Don't use it for UK-specific management. K&C wins where the two differ.

### 2.3 LMC teaching handouts

- Format: `LMC <year> <Title> s.<slide>`, e.g. `LMC 2026 Cirrhosis s.28`. Slide = PDF page.
- List the handouts in use in the README "Sources" section.
- Where a handout and K&C disagree, give both figures in the note.
- At the start of each system, check `Resources/` for new handouts.
- The owner plans to convert all handouts to Markdown later and then run a pass over the existing files. Don't wait for that pass.

### 2.4 Combining citations

- Join several citations on one edge with `; ` (semicolon and a space): `"K&C 10e p.847; Mehlman HY Neuroanatomy"`.
- **Every book cited on an edge must also appear in the file's `sources:` list.** Matching is by book: `K&C 10e`, `Mehlman HY Neuro`, `LMC 2026 Cirrhosis`, and so on. `Mehlman HY Neuro` and `Mehlman HY Neuroanatomy` count as different books.
- `sources:` lists the pages the file draws on, e.g. `["K&C 10e p.874-876", "Mehlman HY Neuro"]`.

---

## 3. Starting a new system (once per system, needs the owner)

Skip this if the system already has an agreed `docs/concepts-<system>.md`.

1. **Read the syllabus section.** Use `pdftotext -layout -f <page> -l <page> "Resources/LMC Syllabus_2026 FINAL.pdf" -` (the syllabus contents give the page numbers). Its subsection headings are already in `syllabus.yaml` as groups. **Don't edit `syllabus.yaml`.**
2. **Check `Resources/` for new handouts** for this system.
3. **List the K&C chapter's headings**, and work out the offset if it isn't in the table (§2.1).
4. **Search `nodes.yaml` and `Diseases/` for concepts the system already touches.** Earlier systems will have created outcome nodes that this system turns into files. For example, cardio had `ischaemic-stroke` as an outcome, and neuro made it a file.

   ```sh
   grep -nE 'stroke|mening|seizure' nodes.yaml
   grep -lw 'ischaemic-stroke' Diseases/*.yaml
   ```
5. **Write `docs/concepts-<system>.md`**, following `docs/concepts-nervous.md` as the model. Sections:
   1. **Disease list:** a table of group, diseases (file ids) and umbrellas. Then: what is *not* a file and why; existing outcome nodes that become files; second systems.
   2. **Cause parents:** organisms, risk factors, genetic causes. Reused `id` in backticks; new **`id`** in bold.
   3. **Mechanism parents**
   4. **Finding parents**
   5. **Outcome parents**
   6. **Questions before drafting:** each with a recommendation and the alternative.
   7. **Batch order**
6. **Stop.** Show the owner the questions and wait. Record their answers in a **Decisions** section.

**Rules of thumb for the disease list:**
- A thing is a **file** if the syllabus lists it as a disease you'd diagnose.
- Investigations, scores, treatments and vaccination are **notes**, or **findings** if they're a test result.
- Complications are **outcomes**.
- If one disease has several organisms that differ only in details, make **one file** with each organism as a cause. Mark organism-specific links with `only:` (see `bacterial-gastroenteritis.yaml`).
- An **umbrella file** (e.g. `stroke`, `brain-tumour`) groups children that set `parent:` to it. It carries only the features the children share.

---

## 4. Per batch: read before you write

1. Open the system's concepts doc. Re-read the **Decisions** and **Progress** sections. Pick the next two batches from the agreed batch order.
2. For each disease in the batch, read:
   - its K&C section in full, noting which printed page each fact is on
   - the matching Mehlman rows (`grep -n -i '<term>' Resources/Mehlman_md/*.md`)
   - any handout
3. Write down, per disease:
   - causes and risk factors
   - mechanism steps, in order
   - findings (symptoms, signs, labs, imaging) and how often each occurs
   - complications
   - each with its page

---

## 5. Vocabulary (`nodes.yaml`)

### 5.1 Format

One node per line, in flow style. Indentation shows the parent for human readers only; the real link is the `parent:` key.

```yaml
- {id: intracranial-bleeding, name: Intracranial bleeding, type: mechanism}
-   {id: bridging-vein-tear, name: Tearing of bridging veins into the subdural space, type: mechanism, parent: intracranial-bleeding}
```

- Keys, in this order: `id, name, type, parent, category`. No other keys.
- `id`: lowercase letters, digits and hyphens (`crescentic-haematoma-ct`). It must be unique across `nodes.yaml` **and** the disease file names.
- `name`: sentence case, British spelling. **If the name contains a comma, quote the whole name**, or YAML breaks the line apart: `name: "Headache, worse lying down"`. Quoting names with colons or parentheses is also safe.
- `type`: `cause | mechanism | finding | outcome`.
- `category`:
  - **required for findings:** `symptom | sign | lab | ECG | imaging | endoscopy | histology` (histology: biopsy and bone marrow, e.g. ring sideroblasts, liver biopsy)
  - **required for causes:** `organism | genetic | risk-factor | drug | condition`
  - `condition` means a disease from another system, used as a cause until that system has its own file.
  - Mechanisms and outcomes take no category.

### 5.2 `parent` rules

- `parent` means "is a kind of". **One parent only.**
- The parent must be the **same type**. The exceptions: an outcome may have a disease file as its parent, and a disease file may have an outcome as its parent (`bone-metastases` → `distant-metastases`).
- Children of the same parent count as **related** in the app, one level only. So pick parents that make clinically meaningful siblings, e.g. the four intracranial bleeds under `intracranial-bleeding`.
- Don't create a parent that would make everything related to everything. The concepts docs record cases deliberately kept apart, such as having no shared parent for all primary tumours.

### 5.3 Reuse first (most important)

Before adding any node:
1. **Search by meaning, not just by word:**
   - `grep -niE 'headache|cephal' nodes.yaml`
   - try synonyms and the abbreviation
   - check the other systems' sections
2. If an existing node means the same thing, **use it**, even if it was written for another system. `hypertension`, `smoking`, `atrial-fibrillation`, `small-vessel-disease` and `metastatic-spread` are reused across systems.
3. If an existing node is the general idea and you need a specific kind, add a **child** of it. For example, `thunderclap-headache` has parent `headache`.
4. An existing node can gain a `parent:` (`transient-focal-neurological-deficit` was moved under `focal-neurological-deficit`), as long as it doesn't already have one.
5. **Don't** rename or remove an existing node, or change its parent, without asking.

### 5.4 Where new nodes go

At the end of the file, in a section for the system:

```yaml
# ================= NERVOUS SYSTEM =================
# Agreed in docs/concepts-nervous.md; added batch by batch.
# --- Causes ---
# --- Mechanisms ---
# --- Findings ---
# --- Outcomes ---
```

Later batches add a sub-heading, e.g. `# --- CNS infection (batches 3–4) ---`.

### 5.5 Things that go wrong

- **An outcome node becomes a disease file.**
  1. Delete its line from `nodes.yaml`.
  2. Create `Diseases/<same id>.yaml`.

  Every file that listed it as an outcome keeps working, because outcomes may be diseases. It loses its old `parent:`, because a file's parent must be a disease. Mention that in the progress notes.
- **Removing a node:** first `grep -lw '<id>' Diseases/*.yaml`, and repoint every user. This happened when `haemorrhagic-stroke` was replaced by `intracerebral-haemorrhage` in `hypertension.yaml`.
- **A stand-in `condition` cause gets its own disease file:** remove the cause node. Every chain that used it now starts from the disease id.
- **The same id can't be both a cause and an outcome.** If you need both, make two nodes. Example: `diabetes-mellitus` (cause) and `pancreatogenic-diabetes` (outcome).
- **The validator warns about unused nodes.** Only add nodes a file in this batch uses. Parents with children count as used.

---

## 6. Disease files (`Diseases/<id>.yaml`)

### 6.1 Format and key order

The keys must appear **in exactly this order**, and no others:

```yaml
id: subdural-haematoma
name: Subdural haematoma
parent: traumatic-brain-injury
group: cns-trauma-stroke
status: draft
systems: [nervous]
sources: ["K&C 10e p.847-848", "Mehlman HY Neuroanatomy"]
chain:
  - {from: head-injury, to: bridging-vein-tear, note: "Sometimes trivial; symptoms may follow days, weeks or months later", source: "K&C 10e p.847"}
  - [bridging-vein-tear, intracranial-haematoma]
findings:
  - {id: fluctuating-consciousness, freq: classic, note: "...", source: "K&C 10e p.847"}
  - {id: confusion, freq: common}
outcomes:
  - {id: brain-herniation, note: "...", source: "K&C 10e p.847-848"}
```

- `id` = the file name without `.yaml`.
- `name`: full name, sentence case. Put the abbreviation in brackets only where it helps, e.g. "Schwannoma (acoustic neuroma)".
- `parent` (optional): a **disease** file id, used only for umbrella children; or an **outcome** node a disease is a kind of (`bone-metastases` → `distant-metastases`).
- `group`: a group id from **the first system's** groups in `syllabus.yaml`.
- `status: draft`.
- `systems`: the home system first. Add a second system **only** if the concepts doc agreed it.
- `sources`: always quoted strings, in a list.
- Omit `findings:` or `outcomes:` entirely if there are none. Don't write `[]`.
- **No file-level `note:`.** The validator rejects it. Notes go on edges.

### 6.2 The chain

The chain is a list of causal links `[from, to]`, starting at the **root cause**.
- **Short form** `[a, b]`: when the link is obvious and needs no note.
- **Long form** `{from, to, note, source}`: when the link needs explaining, or carries a fact from a source.

Rules:
- A disease **can't appear in its own chain**. The chain describes the disease, so it starts at the cause, not at the disease.
- Every id must exist, either in `nodes.yaml` or as a disease file.
- A chain may start from **another disease**: `hypertension`, `lung-cancer` and `infective-endocarditis` all start chains. That's how diseases cause other diseases.
- A chain may also start from an **outcome node**. For example, `atrial-fibrillation` → `intracardiac-thrombus`.
- The chain usually ends in **findings**. A typical shape:

  ```
  cause → mechanism → mechanism → finding
                   ↘ raised-intracranial-pressure → papilloedema
  ```
- **Shared hub mechanisms** are what link diseases. Route through an existing hub wherever it's true:
  - `raised-intracranial-pressure`
  - `intracranial-mass-lesion`
  - `cerebral-ischaemia`
  - `abscess-formation`
  - `dysregulated-host-response`
  - `malignant-transformation` and its kinds
  - `immune-mediated-injury` and its kinds
- Several causes feeding one mechanism is normal, with one line per cause. Put the epidemiology (which cause is commonest, percentages) in the note on the first such line.

### 6.3 Findings

- Each entry is either a bare id or `{id, freq, note, source, only}`. Always give `freq` for findings.
- `freq`:
  - `classic`: the textbook hallmark, or what defines the diagnosis
  - `common`: frequent
  - `occasional`: a minority of cases
  - `rare`: rare
- **Every finding the chain reaches should also appear in `findings:`** with a freq.
- **Reach findings from the chain wherever a mechanism explains them**, e.g. `[dysregulated-host-response, fever]` or `[alveolar-exudate, productive-cough]`. A finding with no chain link is left off the Explore page entirely and shows only on the disease page. Only leave a finding off the chain when no mechanism in the file explains it, or none is sourced.
- Do not invent a direct arrow merely to remove a loose-item warning. Apply the four-case test in §12: some credible findings are conditional, umbrella-level or association-only and should remain loose until the model can represent them honestly.
- Use the most specific finding node that is true (`thunderclap-headache` rather than `headache`). The parent gives "related" matches automatically.

### 6.4 Outcomes

- Each entry is an outcome node or a disease id, either bare or `{id, freq, note, source, only}`.
- Prefer a disease file as the outcome when one exists. For example, `hydrocephalus` and `acute-coronary-syndrome` are files, so link to them. This creates the cross-disease links.
- `freq` is optional on outcomes.
- Where a mechanism in the chain leads to the outcome, also add the chain link, e.g. `[pleural-capillary-leak, parapneumonic-effusion]`. The outcome still goes in `outcomes:`. Only do this when the source says so.
- Distinguish a complication caused by the disease from a prognostic association caused by shared risk. For example, limb atherosclerosis does not directly cause a coronary event even though peripheral arterial disease predicts coronary risk. Keep an association loose rather than encoding a false direction.

### 6.5 `only:`

`only: <cause id>` marks a finding, outcome or chain link that belongs to one cause in a multi-cause file, e.g. one organism. The id must be a **cause** that appears in the same file's chain. The app shows it as "*Campylobacter only*".

### 6.5a Cause groups (`members:`)

Several causes that reach the same step **because of one shared nature** can be written as one link from a class node, with the causes listed as `members`. On Explore the class shows as one bubble ("Inhaled respiratory pathogens (+5)") that opens on click; the disease page shows every member joined to it by a dotted line.

```yaml
  - from: inhaled-respiratory-pathogen
    to: droplet-inhalation
    note: "Each reaches the alveoli the same way: breathed in"
    members:
      - {id: streptococcus-pneumoniae, note: "Commonest cause; …", source: "K&C 10e p.964"}
      - haemophilus-influenzae
```

- **Only group when the shared class is the reason.** Ask: does each member cause the step *because it is a* member of this class? Organisms that all reach the alveoli by being inhaled: yes. Age, smoking, diabetes and immunosuppression feeding alveolar exudate: no. Each acts by its own route, so they stay as separate links, even though all are "risk factors".
- The class is a real node of the same type as its members, named for the shared nature. It is a per-file grouping, not a `parent`: members keep their own parents (one parent only, §5.2), so the validator can't check membership. The author's judgement and the link's note carry it.
- A member is an id, or `{id, note, source}` to keep what is specific to it. Its other links (`legionella-pneumophila → low-serum-sodium`) stay as ordinary chain links.
- Don't also link a member straight to the group's target; the validator rejects that.
- A class that is a whole disease works too: an umbrella file such as `chronic-haemolysis` can start a chain on its own, with no `members:` needed.

### 6.6 Notes

- Short (aim for 25 words or fewer), paraphrased, factual: numbers, distinguishing features, exam clues, key management points that define the disease ("coiling is first-line").
- Use semicolons to join two facts. Don't write full sentences of prose.
- Put the note on the edge it explains.
- Use **source** on any edge whose note states a fact. A bare link with no note may have no source if the link is obvious and the file's sources cover it.

### 6.7 Umbrella files

- An umbrella holds what is common to all its children: shared mechanism hubs, shared findings and shared outcomes. Keep it short. See `stroke.yaml`, `brain-tumour.yaml` and `pneumonia.yaml`.
- Children set `parent: <umbrella id>`, and all have the same `group` unless the concepts doc says otherwise. Example: `vascular-dementia` is under `dementia` but is grouped with stroke.

### 6.8 Linking to existing files (cross-file edits)

Making new links into existing files is part of the job, and the main value of it.
- When a new disease is a **complication** of an existing one, add it to the existing file's `outcomes:` with a source you have read. Example: `sudden-cardiac-death` gained `hypoxic-ischaemic-encephalopathy`.
- When a new disease is **caused** by an existing one, start the new file's chain from the existing disease id. Example: `infective-endocarditis` → `aneurysm-rupture` in SAH.
- If you add to an existing file's edges a book that file doesn't list yet, also add the book to its `sources:`.
- **List every existing file you changed** in the progress notes and in your report.

---

## 7. Validate

Run, in this order:

```sh
npm run build:data
npm test
npm run build
```

- `build:data` must print `ok: …`.
  - Errors name the file and the problem, e.g. `unknown node "haemorrhagic-stroke"`.
  - Fix every error. Never edit `scripts/build.js` to make an error go away.
- New "unused node" warnings mean a node you added isn't used. Either use it or delete it.
- The "findings or outcomes no chain link reaches" warning lists each disease with its count of loose items. A new file should normally disappear from it, but a documented §12 case 2 or case 3 exception is allowed. Record each intentional loose item, why no honest edge can yet be drawn, and what would be needed to resolve it.
- **Common errors:**

| Error | Fix |
|---|---|
| `unknown node "x"` | Typo, a missing node, or a node you removed but that is still referenced. |
| `keys must be in the order …` | Reorder the file's keys. |
| `unknown key(s) …` in nodes.yaml | A name containing a comma isn't quoted. |
| `cites Mehlman HY X, which is missing from the file's sources` | Add the book to `sources:`. |
| `source "…" must look like …` | Wrong citation format (§2). |
| `parent "x" is a mechanism, but this is a finding` | Parents must be the same type. |
| `a disease can't appear in its own chain` | Start the chain at the cause instead. |
| `group "x" must be one of …` | Use a group of the file's **first** system. |

---

## 8. Record progress

1. In `docs/concepts-<system>.md`, add to (or create) the **Progress** section, above "Questions before drafting":
   - which batches are drafted, listing the files
   - **changes to existing files**
   - **changes from the sketch**: anywhere you didn't follow the plan, and why (e.g. "reused `small-vessel-disease` instead of a new node")
   - the thinnest files, where the sources were sparse
   - what comes next
2. Put any new structural question in the concepts doc, or in `docs/open-decisions.md` if it's about the app. Don't decide it yourself.
3. When a system is complete, write a final line saying so. Example: "§10 fully drafted: 64 diseases with GI as their home system."

---

## 9. Report to the owner, then stop

The report should be short and plain:
- what was drafted, grouped by batch
- the existing files you changed
- the new cross-disease links worth looking at
- anything thin or uncertain, plus anything you skipped or couldn't source
- the validator and test results
- the question "next batch?"

Then wait.

---

## 10. Checklist per batch

- [ ] Re-read the concepts doc's Decisions and Progress sections
- [ ] Read the K&C and Mehlman sections, noting printed pages
- [ ] Searched `nodes.yaml` by meaning before adding each node
- [ ] New nodes in the system section; names with commas quoted; categories set
- [ ] Outcome nodes that became files are deleted from `nodes.yaml`, and their users checked
- [ ] Files: key order, `status: draft`, a group from the first system, systems as agreed
- [ ] Every chain starts at a cause; every reached finding is listed with a freq
- [ ] Every listed finding/outcome was assessed with the §12 four-case test; intentional loose items are documented rather than force-linked
- [ ] Every cited book is in `sources:`; every cited page was actually read
- [ ] Cross-file links added, with sources
- [ ] `npm run build:data`, `npm test` and `npm run build` all pass, with no new unused-node warnings
- [ ] Concepts doc Progress section updated
- [ ] Short report, then stop

---

## 11. Where things stand (update this when it changes)

- **Done, all `status: draft`:**
  - Cardiovascular §7: 45 files
  - Respiratory §8: 29 files
  - GI and liver §10: 64 files
  - Nervous §13: 33 files, all five batches (stroke and trauma, tumours and ICP, CNS infection, demyelination, neurodegenerative)
  - Chain-linking pass (§12): done for all four systems
  - Haematology §5: 45 files, all seven batches
  - Immunology §6: 28 files plus Pneumocystis pneumonia, all five batches
- **Next system:** §12 kidney drafted (all 8 batches, 2026-11-10). §11 endocrine drafted (all 6 batches, 28 files, 2026-11-10); awaiting owner review. §14 bone and joints drafted (all 6 batches, 23 files, 2026-11-10; `docs/concepts-bone-joint.md`); awaiting owner review. §3 clinical biochemistry drafted (all 4 batches, 11 files, 2026-11-10; `docs/concepts-biochem.md`); awaiting owner review. §4 infection drafted (all 6 batches, 17 infection-home files plus syphilis, 2026-11-10; `docs/concepts-infection.md`); awaiting owner review. §9 head and neck drafted (all 4 batches, 13 files, 2026-11-11; `docs/concepts-head-neck.md`); awaiting owner review. §15 skin and breast drafted (all 9 batches, 31 files, 2026-11-11; `docs/concepts-skin-breast.md`); awaiting owner review. §16 female genital drafted (all 9 batches, 29 files, 2026-11-11; `docs/concepts-female-genital.md`); awaiting owner review.
- **Systems not started:** §3 biochemistry, §4 infection, §9 head and neck, §11 endocrine, §12 kidney, §14 bone and joint, §15 skin and breast, §16 female genital. Each needs §3 (a concepts doc approved by the owner) first.
- **Later, already agreed:**
  - a pass to work in the teaching handouts once they are converted
  - **cause-group (condensation) pass** (agreed 2026-11-08): go through every existing file and declare `members:` groups where several causes reach a step through one shared nature (§6.5a). Only CAP is done. New files declare their groups as they are drafted.
  - sharing the database with friends (see `docs/open-decisions.md`)

---

## 12. Chain-linking pass (fixing loose findings and outcomes)

**Why.** On the Explore page, a disease's bubbles are joined only by chain links. A finding or outcome that no chain link reaches is not drawn on Explore at all (it still shows on the disease page). Many of these are omitted causal explanations, but not all: some entries are conditional features, umbrella-level associations or prognostic correlations. This pass adds defensible links and identifies the exceptions without pretending that every association is deterministic.

**Status (2026-11-08): done for all four systems.** `community-acquired-pneumonia.yaml` is the worked example.

| System | Audit | Intentional loose items left |
|---|---|---|
| Cardiovascular | `docs/chain-linking-audit-cardio.md` (207 of 223 linked, 3 outcomes corrected) | 13 |
| Respiratory | `docs/chain-linking-audit-resp.md` (205 of 213 linked) | 8 |
| GI and liver | `docs/chain-linking-audit-gi.md` (282 of 300 linked) | 18 |
| Nervous | `docs/chain-linking-audit-nervous.md` (60 of 65 linked) | 5 |
| Haematology | recorded in `docs/concepts-haem.md` Progress | 2 |
| Immunology | recorded in `docs/concepts-immuno.md` Progress | 1 |

The 49 items `node scripts/loose.js` still lists are all documented case 2/3 exceptions. New files must add none, unless they are documented in the same way.

### Tools

```sh
npm run build:data                # rebuilds graph.json; its warning lists every disease with a loose count
node scripts/loose.js             # every disease with loose items
node scripts/loose.js heart-failure stemi   # just these
```

Example output:

```
## cardiac-tamponade
M: pericardial-effusion pericardial-compression reduced-cardiac-output
C: acute-pericarditis active-cancer free-wall-rupture
L: tachycardia cardiomegaly obstructive-shock
```

- `M`: steps already in the chain. These are the usual place to link from.
- `C`: root causes.
- `L`: the loose items to fix.

Here, all three items come from `pericardial-compression` or `reduced-cardiac-output`:
- `[reduced-cardiac-output, tachycardia]`
- `[pericardial-effusion, cardiomegaly]`
- `[pericardial-compression, obstructive-shock]`

### The four-case test

Apply this to every finding or outcome, both when drafting a new disease and during a chain-linking pass.

1. **Direct and defensible.** The existing chain already contains the mechanism that most directly produces the item. Add a bare link when the physiology or definition is uncontroversial, or a sourced long-form link when a student might reasonably question it.

   Examples: `reduced-cardiac-output → fatigue`, `myocyte-necrosis → ck-mb-rise`, `thromboembolism → ischaemic-stroke`.

2. **Missing intermediate mechanism.** The clinical item is credible, but a direct edge would skip a necessary step. Search the vocabulary and insert the intermediate mechanism before linking the item. If the needed concept is new, conditional or structural, propose it to the owner and leave the item loose until agreed.

   Examples: ventricular dysfunction → pulmonary venous congestion → dyspnoea; perivalvular extension → AV block in infective endocarditis; myocardial involvement → troponin rise in pericarditis.

3. **Association-only.** The item belongs in the disease's clinical inventory but is not a universal deterministic result of one chain step. This includes prognostic correlations, shared-risk associations, subtype-dependent features and umbrella diseases whose children reach the item by different routes. Keep it in `findings:` or `outcomes:`, leave it loose, and document why.

   Examples: PAD predicting coronary and cerebral events because atherosclerosis is systemic; an umbrella cardiomyopathy sharing heart failure and arrhythmias whose subtypes have different mechanisms.

4. **Questionable underlying item.** The warning has exposed a problem with the list entry itself: wrong direction, wrong classification, excessive generalisation or a correlation presented as a complication. Re-read the cited source. Correct or remove the item only when the evidence supports doing so, and record the change.

   Examples found in the cardiovascular audit: pulmonary oedema → cardiogenic shock reversed the defensible direction; NSTEMI → STEMI treated parallel MI phenotypes as a routine sequence; weak triglyceride-associated cardiovascular risk was too strong as an outcome.

The objective is a medically honest graph, not an empty warning. Every remaining loose item must be either unresolved work or an explicitly documented case 2/3 exception.

### Method, per file

1. Run `node scripts/loose.js <id>` and open `Diseases/<id>.yaml`.
2. Classify the item with the four-case test. For case 1, pick the **one chain node that most directly causes it**. For case 2, model the necessary intermediate before the item. Work from the end of the chain backwards:
   - A symptom or sign comes from the mechanism that produces it, e.g. `reduced-cardiac-output → fatigue` or `pulmonary-venous-congestion → exertional-dyspnoea`.
   - A lab or imaging finding comes from what it measures, e.g. `myocyte-necrosis → ck-mb-rise` or `concentric-hypertrophy → lvh-voltage`.
   - An outcome comes from the step that leads to it, e.g. `transmural-ischaemia → ventricular-arrhythmia` or `intracardiac-thrombus → thromboembolism → ischaemic-stroke`.
   - An outcome that is another disease can be the `to` of a chain link: `[mitral-regurgitant-flow, mitral-regurgitation]` is valid.
   - A disease can't link to itself. Where the item is the disease's own end-point, link from the last mechanism instead.
3. **Link from a cause only when the cause itself produces the item**, e.g. one organism's own finding (`[legionella-pneumophila, low-serum-sodium]`). If that item has `only: <organism>`, link it from that organism.
4. **If no node in the chain explains the item:**
   - Add the missing mechanism when it's a real, sourced step. Reuse an existing node first, by searching `nodes.yaml`. CAP's `pleural-inflammation` was new, for example.
   - If you can't source it, leave the item loose and list it in your report as case 2. **Don't invent a step.**
   - If the relationship is conditional, umbrella-level or prognostic rather than causal, leave it loose and list it as case 3.
   - If the entry itself looks wrong, re-read its source and treat it as case 4; do not preserve it merely to avoid changing the findings/outcomes list.
5. **How to write the link:**
   - **Obvious physiology or definition:** a bare `[from, to]`, no note. Examples: hypoxaemia → dyspnoea, exudate → productive cough, host response → fever.
   - **Anything a student might question:** the long form, with a short note and a source you have read, e.g. `{from, to, note, source}`.
   - **Add the new links at the end of the chain**, one per line, grouped by the node they come from.
6. **Don't touch the `findings:`/`outcomes:` entries themselves.** Their freq, notes and sources stay as they are. You're only adding chain links.
7. After each file, run `npm run build:data`. The file should disappear from the loose warning unless it has documented case 2/3 exceptions. There must be no validation errors.

### Order

Do one system at a time, working through the files alphabetically, so the owner can review a system as a unit:
1. Cardiovascular (45 files)
2. Respiratory
3. GI and liver (the largest)
4. Nervous

Report and stop after each system.

### Report per system

List:
- the files done
- any new mechanism nodes added
- items left loose, labelled case 2 or case 3, and why
- case 4 findings/outcomes corrected or removed, with their source rationale
- any link you weren't sure of

The owner may spot-check on the Explore page: put a disease on the web and confirm nothing floats.

### When only documented exceptions remain

Decided by the owner (2026-11-08): loose items are **not shown on Explore**. `app/src/Explore.jsx` builds each disease from its causal-chain edges only; the documented exceptions appear on the disease page alone.


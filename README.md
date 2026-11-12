# MedicalWeb

An explorable graph of diseases, their findings, causal mechanism chains and outcomes, showing what diseases share.

```sh
npm install
npm run dev        # http://localhost:5173 — edits to YAML reload live; validation errors show in the browser
npm test           # validator self-tests
npm run build      # static site in dist/ (works on any static host)
```

## Data
- `nodes.yaml` holds the shared vocabulary, one node per line: every cause (organism, gene, risk factor, drug), mechanism, finding and outcome. The parent concepts are explained in `docs/concepts-cardio.md`. A disease file can't use an id that isn't defined here (or as another disease), which keeps names consistent.
- `parent:` means "is a kind of", and the parent must be the same type (an outcome may be a kind of disease, and a disease a kind of outcome, e.g. bone metastases → distant metastases). Disease files can also have a `parent:` disease (STEMI → ACS). Siblings under the same parent count as **related** matches (one level only).
- `Diseases/<id>.yaml` holds one disease: the set of its mechanisms, findings and outcomes. `chain` is a list of `[from, to]` causal links starting at the root cause (a disease never appears in its own chain), or `{from, to, note, source}` when a link needs detail. `findings` and `outcomes` take ids or `{id, freq, note, source, only}`. Outcomes may be other diseases. `only: <cause id>` marks a link that belongs to one cause of several in the file (one organism in bacterial gastroenteritis); the app shows it as "*Campylobacter only*".
- `syllabus.yaml` lists the LMC Syllabus 2026 sections (systems) and subsections (groups) in syllabus order. It is the only place systems and groups are defined; the app takes their names and order from it.
- `freq` is one of `classic | common | occasional | rare`. `status` is `draft` until reviewed.

## Standards
The validator (`npm run build:data`) enforces the rules marked ✓; the rest are for review.

**Disease files**
- ✓ The file name is the id, written in lowercase with hyphens (`small-cell-lung-carcinoma`).
- ✓ Keys only from this list, in this order: `id, name, parent, group, status, systems, syllabi, sources, chain, findings, outcomes`. Anything else, such as a file-level `note`, is rejected, because the app would not show it. Put notes on the edge they explain.
- ✓ `systems` lists every syllabus system the disease belongs to, home system first. ✓ `group` is one of the home system's subsection ids.
- ✓ `status: draft` until you have reviewed the file.
- ✓ `syllabi` (optional) is a list from `lmc, usmle`; no key means `[lmc]`. Files written for the USMLE layer carry `syllabi: [usmle]`.
- ✓ `only` must name a cause in the same file's chain.
- ✓ A chain link may carry `members:` (2+ distinct ids, or `{id, note, source}`), all the same type as its `from` (a disease used as a cause counts as a cause), none also linked straight to its `to`. Use it only when the members cause the step through the shared nature `from` names (drafting protocol §6.5a); Explore shows the group as one bubble that opens on click.
- `name` is the full name in sentence case and British spelling. An abbreviation goes in the vocabulary name only where it is the usual name (SIADH).

**Vocabulary (`nodes.yaml`)**
- ✓ One node per line, lowercase-hyphen ids, keys `id, name, type, parent, category` only. ✓ A name with a comma must be in quotes; otherwise YAML splits the name, and the validator reports it.
- Reuse before adding. Search for the concept by meaning, not only by name. A new node goes in its system's section, indented under its parent.
- When a disease gets its own file, its stand-in `condition` cause is removed and every chain that used it now starts from the disease (COPD replaced "chronic lung disease").
- A finding and an outcome may share a theme when they are different things: the lab value (hypercalcaemia) is a finding; the syndrome (hypercalcaemia of malignancy) is an outcome.

**Citations**
- ✓ Every source has the form `K&C 10e p.975`, `K&C 10e p.975-980, 990`, `K&C 10e p.1084 (Box 30.28)`, `Mehlman HY Pulmonary`, or an LMC teaching handout as `LMC <year> <title> s.<slide>` (`LMC 2026 Cirrhosis s.28`, slide = PDF page). Several sources are joined with `; `.
- ✓ USMLE layer: `FA 2026 p.304` (First Aid Step 1 2026, printed pages), `Pathoma 2023 p.70` (printed pages), `StatPearls NBK430685` (one article, by its NBK id). AnKing cards are quiz material and are never cited.
- ✓ A book cited on an edge must also be listed in the file's `sources`.
- Never cite a page you haven't read, and never cite a book for a fact it doesn't contain.

## Sources
- Citations use **printed** Kumar & Clark 10e page numbers. The converted Markdown's `<!-- pN -->` markers are PDF pages; printed = PDF − offset, checked against each chapter's contents list: ch.3 −15, ch.8 −19, ch.16 −24, ch.17 −24, ch.18 −24, ch.10 −19, ch.20 −22, ch.22 −22, ch.24 −21, ch.26 −20, ch.28 −18, ch.29 −17, ch.30 −16, ch.31 −16, ch.32 −15, ch.33 −15, ch.34 −14, ch.35 −14, ch.36 −13, ch.9 −19, ch.37 −13, ch.40 −12, ch.21 −22, ch.23 −22, ch.19 −23, ch.6 −21, ch.12 −18, ch.27 −19, ch.38 −13, ch.39 −13.
- LMC teaching handouts (in `Resources/`) are cited by slide, where slide = PDF page:
  - `LMC 2026 Cirrhosis`: cirrhosis and liver tumours
  - `LMC 2026 Non-viral liver`: non-viral liver disease
  - `LMC 2025 HPB pathology`: gallbladder, biliary and pancreas pathology
- Where a handout and K&C disagree, the note gives both figures.
- USMLE sources live in `Resources/USMLE/md/` (converted by `md/convert.py`): `first-aid/` and `pathoma/` carry `<!-- p.N -->` markers that are already **printed** page numbers (no offset); `statpearls-index/` maps article titles to vault files, whose front matter gives the NBK id.
- Notes are paraphrased: no copied passages. `Resources/` is gitignored and must never be published.

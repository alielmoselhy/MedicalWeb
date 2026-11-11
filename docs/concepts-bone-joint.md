# Step B1 — Bone and joint parent concepts (draft for review, 2026-11-10)

Same rules and legend as `concepts-nervous.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node or file, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [bone-joint]` unless noted.

Sources (headings listed; offsets checked on two or more headings each):
- K&C ch.18 Rheumatology (−24, in the table): osteoarthritis p.433–437, spondyloarthritis p.447–451 (AS p.448–450, psoriatic p.450, reactive p.450–451, enteropathic p.451), crystal arthritis p.451–454 (gout p.452–453, CPPD p.454), joint infections p.454–456 (septic arthritis and prostheses p.455)
- K&C ch.19 Bone disease (**−23**, new; checked on Clinical skills 471, Osteoporosis 477, Paget's 482, Bone infections 484): calcium and vitamin D physiology p.474–475, investigation p.476, osteoporosis p.477–481, osteonecrosis p.482, Paget's p.482–483, rickets and osteomalacia p.483–484, bone infections p.484, neoplastic disease p.485
- K&C ch.21 Endocrinology (−22): hypercalcaemia and hyperparathyroidism p.644–646, hypocalcaemia p.646–647
- K&C ch.9 Water and electrolytes (−19): magnesium p.191–192, phosphate p.192–195
- K&C ch.23 Diabetes (−22): the diabetic foot p.733–734
- Mehlman HY Anatomy-MSK-Rheum (arthritis, bone tumour table, osteomalacia), HY Endocrine (calcium, PTH), HY Pathology (RB1)
- No LMC bone or joint handouts in `Resources/` yet.

Syllabus §14 has five groups: arthritis (OA, gout, pseudogout, RA, seronegative spondyloarthropathies, reactive), bone and musculoskeletal tumours (metastases; osteoma, osteoid osteoma, osteosarcoma; chondroma, osteochondroma, chondrosarcoma; Ewing's), bone and joint infection (septic arthritis of native and prosthetic joints, acute and chronic osteomyelitis, diabetic foot infection), calcium homeostasis (hyper/hypocalcaemia, hyper/hypophosphataemia, hyper/hypoparathyroidism) and metabolic bone disease (osteoporosis, osteomalacia, vitamin D deficiency, Paget's, bone metastases, bone biochemistry).

---

## 1. Disease list (syllabus §14): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| arthritis | osteoarthritis, gout, chondrocalcinosis (CPPD, pseudogout), spondyloarthritis, ankylosing-spondylitis, psoriatic-arthritis, reactive-arthritis | spondyloarthritis → ankylosing-spondylitis, psoriatic-arthritis, reactive-arthritis |
| bone-tumours | bone-metastases, primary-bone-tumour, osteoma, osteoid-osteoma, osteosarcoma, chondrosarcoma, ewing-sarcoma (chondroma and osteochondroma: Q7) | primary-bone-tumour → the five or seven types |
| bone-joint-infection | septic-arthritis, osteomyelitis, diabetic-foot-infection | none |
| calcium | primary-hyperparathyroidism, hypoparathyroidism | none |
| metabolic-bone | osteoporosis, osteomalacia, vitamin-d-deficiency, pagets-disease | none |

About 22–24 files.
- `rheumatoid-arthritis` already exists (`[immunology, bone-joint]`, immunology group). It stays as it is; §14 links to it.
- Bone metastases sit in bone-tumours; the metabolic-bone bullet about them is covered by the same file.

**Not files here, and why:**
- Hypercalcaemia, hypocalcaemia, hyperphosphataemia and hypophosphataemia: they already exist as **lab findings** used across many files (`hypercalcaemia` alone by myeloma, sarcoidosis, MEN, Addison's...). A file can't be listed as a finding, so making them files would break those links. Their causes and features go into the hyperparathyroidism and hypoparathyroidism files and notes (Q4).
- Secondary and tertiary hyperparathyroidism: `secondary-hyperparathyroidism` stays a mechanism (CKD uses it); tertiary is a note.
- Enteropathic arthritis: a link from `inflammatory-bowel-disease`, not a file (Q3).
- Rickets: inside `osteomalacia` (same defect before growth plates fuse).
- Familial hypocalciuric hypercalcaemia, pseudohypoparathyroidism, hypomagnesaemia: notes.
- Osteonecrosis: `avascular-necrosis` stays an outcome.
- Giant cell tumour, fibrosarcoma: notes (not in the syllabus list).

**Existing nodes that become files (delete the node, same id, §5.5):**
- `osteoporosis` (outcome, no parent; used by 8 files) → file. Every link keeps working.
- `gout` (outcome; used by 5 files: AML, CKD, myelofibrosis, PV, renal calculi) → file.
- `chondrocalcinosis` (outcome; used by haemochromatosis) → the CPPD file, renamed "Calcium pyrophosphate deposition (pseudogout)" — *CPPD ~ haemochromatosis*.
- `reactive-arthritis` (outcome; used by chlamydia) → file.
- `septic-arthritis` (outcome; used by gonorrhoea and RA) → file.
- `osteomalacia` (outcome; used by CKD and RTA) → file.
- `hypoparathyroidism` (a **mechanism**; used by DiGeorge) → file. DiGeorge's two links still work, since a chain may pass through a disease.
- `bone-metastases` (outcome under `distant-metastases`; used by 7 files) → file? See Q5: as a file it loses its `distant-metastases` parent.

**Second systems:**
- psoriatic-arthritis: `[bone-joint, skin-breast]` (psoriasis is §15)
- reactive-arthritis, septic-arthritis, osteomyelitis: `[bone-joint, infection]`?
- diabetic-foot-infection: `[bone-joint, endocrine]`
- primary-hyperparathyroidism, hypoparathyroidism: `[bone-joint, endocrine]`
- See Q8.

---

## 2. Cause parents

**Genetic**
- **hla-b27** under `hla-susceptibility` — *AS ~ reactive ~ psoriatic; beside HLA-DR4 (RA) and B8/DR3*
- **rb1-mutation** (osteosarcoma, with retinoblastoma) and `familial-adenomatous-polyposis` reused for osteoma (Gardner's) — *osteoma ~ colorectal cancer*
- `men1-mutation` and `ret-mutation` reused for primary hyperparathyroidism — *hyperPTH ~ MEN*

**Risk factors and conditions**
- `older-age`, `obesity`, `excess-alcohol`, `smoking` reused (OA, gout, osteoporosis)
- **joint-injury-overuse** (OA)
- **oestrogen-deficiency** (menopause, early menopause; osteoporosis). `hypogonadism` (outcome) reused as a cause — *osteoporosis ~ prolactinoma ~ hypopituitarism*
- `exogenous-glucocorticoid` reused (osteoporosis) — *~ Cushing's*
- **urate-raising-drug** (thiazide and loop diuretics, low-dose aspirin) as a cause group; `chronic-kidney-disease` and `tumour-lysis-syndrome` reused for gout
- **psoriasis** (condition, until §15)
- `inflammatory-bowel-disease`, `chlamydia-infection`, `bacterial-gastroenteritis` reused for reactive and enteropathic arthritis — *reactive arthritis ~ chlamydia ~ Campylobacter/Salmonella*
- `low-vitamin-d-latitude` reused (vitamin D deficiency) — *~ MS*; **low-sunlight-dark-skin** only if the page gives it separately; `malabsorption` reused — *~ coeliac, Crohn's*
- `pagets-disease` (the file) as a cause of osteosarcoma (under 1%)
- `diabetic-foot-ulcer` (outcome) starts the diabetic foot infection chain — *~ diabetes*
- New **prosthetic-joint** (risk-factor). It is not put under `intravascular-device`, which is about the bloodstream

**Organisms**
- `s-aureus` (commonest in septic arthritis and osteomyelitis) — *~ S. aureus bacteraemia, endocarditis*
- `neisseria-gonorrhoeae` (native joints, young adults) — *~ gonorrhoea*
- `coagulase-negative-staphylococci` (prosthetic joints) — *~ line infection, prosthetic valve endocarditis*
- `enterobacteriaceae`, `pseudomonas-aeruginosa` (diabetic foot)
- `mycobacterium-tuberculosis` (TB spine and joints) — *~ TB*

---

## 3. Mechanism parents

**Joints**
- New **`crystal-induced-inflammation`** with kinds **urate-crystal-deposition** (gout) and **cpp-crystal-deposition** (pseudogout) — *gout ~ pseudogout*
- New **`enthesitis`** (inflammation where tendons and ligaments insert): AS, psoriatic, reactive, enteropathic — *the spondyloarthritis family*
- New **`cartilage-degeneration`** (OA), reached from gout, septic arthritis and CPPD as secondary OA — *OA ~ gout ~ septic arthritis*
- `immune-mediated-injury` gains **post-infective-joint-inflammation** (reactive)?, or reactive uses `molecular-mimicry` (reused) — Q6

**Infection**
- `haematogenous-seeding` reused (septic arthritis, acute osteomyelitis) — *~ endocarditis, S. aureus bacteraemia*
- New **contiguous-spread** (diabetic foot, open fracture)
- `biofilm-formation` gains **prosthetic-joint-biofilm** — *prosthetic joint ~ prosthetic valve ~ catheter ~ vascular graft*
- New **bone-infection-necrosis** (dead bone, sequestrum) for chronic osteomyelitis

**Bone**
- New **`bone-loss`** (resorption exceeds formation): osteoporosis
- New **defective-mineralisation** (osteomalacia, rickets)
- The `vitamin-d-deficiency` file starts the chain into osteomalacia and `secondary-hyperparathyroidism` (reused) — *vitamin D ~ CKD*
- `osteoclast-activation` reused (hyperparathyroidism, Paget's, lytic metastases) — *myeloma ~ Paget's ~ hyperPTH ~ bone metastases*
- New **disorganised-bone-remodelling** (Paget's)
- `pth-excess` reused (primary hyperparathyroidism) — *~ MEN*; new **pth-deficiency** (hypoparathyroidism) under the provisional `hormone-deficiency`
- `pthrp-secretion` and `macrophage-vitamin-d-activation` reused for the hypercalcaemia differential in notes — *hyperPTH ~ SCC lung ~ sarcoidosis*

**Tumours** (Q7)
- New parents **`bone-forming-tumour`** (osteoma, osteoid osteoma, osteosarcoma) and **`cartilage-forming-tumour`** (chondroma, osteochondroma, chondrosarcoma) — the syllabus's own classification
- The malignant ones also pass through `malignant-transformation` first, then into their growth step
- `metastatic-spread` reused for bone metastases; the seven primaries already link to `bone-metastases`

---

## 4. Finding parents

- Joint signs: `inflammatory-arthritis` gains **acute-monoarthritis** (gout, CPPD, septic) — *the hot swollen joint differential* — and **asymmetrical-oligoarthritis** (reactive, psoriatic); `symmetrical-small-joint-polyarthritis` stays with RA
- New **synovial-fluid-analysis** (lab) with kinds **negatively-birefringent-needle-crystals**, **positively-birefringent-rhomboid-crystals**, **purulent-synovial-fluid** — *gout ~ CPPD ~ septic arthritis*
- New **joint-x-ray-abnormality** (imaging) with kinds **oa-xray-changes** (narrowing, osteophytes, sclerosis, cysts), **sacroiliitis-bamboo-spine**, **pencil-in-cup-erosions**, **punched-out-erosions**, **chondrocalcinosis-on-x-ray**
- New **bone-imaging-abnormality** (imaging) adopting the existing `lytic-bone-lesions` and `sclerotic-bone-metastases` (both have no parent), plus **low-bone-density-dexa**, **looser-zones**, **pagetic-bone**, **sunburst-codman-triangle**, **onion-skin-periosteal-reaction**, **osteoid-osteoma-nidus**, **osteomyelitis-on-mri** — *myeloma ~ prostate cancer ~ Paget's ~ bone tumours*
- Labs: `hypercalcaemia`, `hypocalcaemia`, `hypophosphataemia`, `hyperphosphataemia`, `hyperuricaemia`, `raised-pth-alp` reused; new **raised-pth-with-high-calcium**, **low-pth-low-calcium**, **low-25-oh-vitamin-d**, **raised-alp** (isolated: Paget's)
- Symptoms and signs: `bone-pain`, `arthralgia`, `constipation`, `polyuria-nocturia`, `confusion`, `proximal-myopathy`, `anterior-uveitis` reused; new **mechanical-joint-pain**, **heberden-bouchard-nodes**, **inflammatory-back-pain**, **dactylitis**, **enthesitis-heel-pain**, **psoriatic-nail-changes**, **tophi**, **tetany-perioral-paraesthesia** (Chvostek, Trousseau), **bowing-skull-enlargement** (Paget's)

---

## 5. Outcome parents

- New **fragility-fracture** (hip, vertebral, wrist) under `pathological-fracture` — *osteoporosis ~ myeloma ~ bone metastases*
- `spinal-cord-compression` and `hypercalcaemia-of-malignancy` reused (bone metastases) — *~ myeloma, lung cancer*
- `renal-calculi-nephrocalcinosis` (file) from hyperparathyroidism and gout — already there for gout
- `osteoarthritis` (the new file) from gout, CPPD, septic arthritis
- `aortic-regurgitation` (file) and `anterior-uveitis` from AS — *AS ~ valve disease*
- `acute-pancreatitis` and `peptic-ulcer-disease` (files) from hypercalcaemia, if the pages say so
- New **joint-destruction**, **chronic-osteomyelitis** (or a note in the file), **amputation** reusing `gangrene-amputation`
- `sepsis` route: `s-aureus-bacteraemia` (file) from septic arthritis and osteomyelitis
- `avascular-necrosis` reused

---

## 6. Questions before drafting

1. **Group and files as listed in §1** (about 22–24 files). Recommended: yes.
2. **Turn the existing outcome nodes into files** with the same ids: `osteoporosis`, `gout`, `chondrocalcinosis` (renamed for CPPD), `reactive-arthritis`, `septic-arthritis`, `osteomalacia`, and the `hypoparathyroidism` mechanism. Every link keeps working. Recommended: yes.
3. **Spondyloarthritis umbrella** with ankylosing spondylitis, psoriatic and reactive arthritis as children; enteropathic arthritis as a link from IBD. Recommended: yes. The other way: no umbrella, three separate files linked only through `enthesitis` and `hla-b27`. (AS isn't named in the syllabus, only "e.g. psoriatic", but it is the type case.)
4. **Calcium and phosphate disorders stay lab findings**, with two files (primary hyperparathyroidism, hypoparathyroidism) carrying the causes. Recommended: yes, because the four findings are used across the graph. The other way: new files with different ids (e.g. `hypercalcaemia-disorder`), so there would be both a finding and a file for each.
5. **Bone metastases as a file.** It's named twice in the syllabus. As a file, its id stays the same and all 7 links keep working, but it loses its `distant-metastases` parent, so it's no longer a sibling of liver, adrenal and ovarian metastases. Recommended: make it a file. The other way: keep the outcome node and put the features (bone pain, hypercalcaemia, cord compression, lytic or sclerotic lesions) in the primary cancers' files.
6. **Reactive arthritis mechanism:** reuse `molecular-mimicry` (also used by Graves') or a new **post-infective-joint-inflammation** under `immune-mediated-injury`. Recommended: reuse `molecular-mimicry` if K&C says so; otherwise the new node.
7. **Bone tumours:**
   - (a) `primary-bone-tumour` umbrella with the types as children, and the syllabus's classification shown by two mechanism parents, `bone-forming-tumour` and `cartilage-forming-tumour`. Recommended: yes.
   - (b) **Chondroma and osteochondroma have no source.** K&C lists primary bone tumours only in a box (p.485), and Mehlman's table covers osteosarcoma, chondrosarcoma, Ewing's, osteoid osteoma and osteoma but not these two. I can't cite what I haven't read, so recommended: leave them out until you add a source (e.g. a pathology handout), with a note in this doc. The others are thin too and will lean on Mehlman.
8. **Second systems** as listed in §1. Recommended: yes for psoriatic (skin), diabetic foot (endocrine) and the two parathyroid files (endocrine). For the infections, `infection` (§4) is a microbiology section about sepsis, HIV and travellers, so recommended: no second system for septic arthritis, osteomyelitis or reactive arthritis.
9. **Bone imaging parent:** `bone-imaging-abnormality` adopts the existing `lytic-bone-lesions` (myeloma) and `sclerotic-bone-metastases` (prostate), which have no parent now. Recommended: yes.
10. **`fragility-fracture` under `pathological-fracture`.** Recommended: yes, so osteoporosis sits beside myeloma's vertebral collapse. The other way: a separate outcome with no parent.
11. **Prosthetic joint infection:** inside `septic-arthritis` with `only: prosthetic-joint` and the new `prosthetic-joint-biofilm`. Recommended: yes. The other way: a separate file.
12. **Diabetic foot infection** as a file starting from the existing `diabetic-foot-ulcer` outcome, with severity in notes. Recommended: yes.

---

## 7. Batch order

1. Degenerative and crystal: osteoarthritis, gout, chondrocalcinosis (3)
2. Spondyloarthritis: spondyloarthritis (umbrella), ankylosing-spondylitis, psoriatic-arthritis, reactive-arthritis (4)
3. Infection: septic-arthritis, osteomyelitis, diabetic-foot-infection (3)
4. Calcium: primary-hyperparathyroidism, hypoparathyroidism, vitamin-d-deficiency, osteomalacia (4)
5. Metabolic bone: osteoporosis, pagets-disease (2)
6. Tumours: bone-metastases, primary-bone-tumour (umbrella), osteoma, osteoid-osteoma, osteosarcoma, chondrosarcoma, ewing-sarcoma (7)

OA comes first so that gout, CPPD and septic arthritis can link to it. Paget's comes before the tumours so osteosarcoma can start from it.

---

## Decisions (owner, 2026-11-10)

- Q1–Q4, Q6, Q7a, Q8–Q12: yes, as recommended.
- Q5: option (a). The validator now lets a disease have an outcome parent, so the `bone-metastases` file keeps `parent: distant-metastases` and stays a sibling of liver, adrenal and ovarian metastases.
- Q7b: **TODO (owner):** chondroma and osteochondroma are left out until the owner adds a source for them (e.g. a pathology handout in `Resources/`). Then add them under `primary-bone-tumour` / `cartilage-forming-tumour`.

## Progress

- **Batches 1–2 drafted** (2026-11-10, all `status: draft`): osteoarthritis, gout, chondrocalcinosis (CPPD, renamed "Calcium pyrophosphate deposition (pseudogout)"); spondyloarthritis (umbrella), ankylosing-spondylitis, psoriatic-arthritis (`[bone-joint, skin-breast]`), reactive-arthritis.
- **Nodes that became files:** `gout`, `chondrocalcinosis` and `reactive-arthritis` deleted from nodes.yaml. Their users (AML, CKD, myelofibrosis, PV, renal calculi; haemochromatosis; chlamydia) work unchanged. None had a parent.
- **Changes to existing files:**
  - `inflammatory-bowel-disease`: `gut-mucosal-immune-dysregulation → spondyloarthritis` (enteropathic arthritis, K&C p.451) and the outcome.
  - `bacterial-gastroenteritis`: `mucosal-invasion → reactive-arthritis` and the outcome (K&C p.450).
  - `acromegaly`: `gh-igf1-excess → osteoarthritis` and the outcome (secondary OA, K&C p.435 Box 18.22).
  - `juxta-articular-erosions` (RA) now sits under the new `joint-x-ray-abnormality` — *RA ~ OA ~ gout ~ AS ~ psoriatic on imaging*.
- **Shared hubs:** `enthesitis` (all four SpA files); `crystal-induced-inflammation` → urate and CPP kinds (*gout ~ CPPD*); `acute-monoarthritis` (gout, CPPD; septic arthritis next); `impaired-urate-excretion` from CKD, diuretics/aspirin, alcohol, hypothyroidism, lead; `high-cell-turnover` reused (*gout ~ MPN*); `molecular-mimicry` reused for reactive arthritis (Q6; K&C p.451 names it) — *~ Graves', rheumatic fever*. `osteoarthritis` is an outcome of gout, CPPD and acromegaly, and its chain starts from `avascular-necrosis` (*OA ~ sickle cell, Cushing's*).
- **Changes from the sketch:**
  - `urate-raising-drug` is one drug node, not a `members:` group: the members would have needed separate diuretic and aspirin nodes that nothing else uses.
  - Extra-articular B27 features (uveitis, aortitis) hang off `hla-b27`, since K&C gives no mechanism beyond the association.
  - New mechanisms not in the sketch: `subchondral-sclerosis-osteophytes` (OA), `impaired-urate-excretion` (gout), `syndesmophyte-ankylosis` and `aortitis` (AS). New findings `dip-arthritis`, `nail-dystrophy` (shared by psoriatic and reactive, so not "psoriatic-nail-changes"), `conjunctivitis`, `reactive-skin-lesions`, `crepitus-restricted-movement`, `spinal-stiffness-kyphosis`.
  - Not added: `purulent-synovial-fluid` (batch 3 will add it under `synovial-fluid-abnormality`); hypermobility, dysplasia and heredity for OA (notes only); AV block in AS (in the aortitis note, no mechanism).
- **Waiting for later batches:** primary hyperparathyroidism → `cpp-crystal-deposition` and → `impaired-urate-excretion` (both in K&C p.452, 454), to be added from that file in batch 4. Septic arthritis → osteoarthritis in batch 3; Paget's → osteoarthritis in batch 5.
- **Loose (documented, case 3):** ankylosing-spondylitis → `osteoporosis` (25%, K&C p.449): no mechanism given. Loose total now 49.
- **Thinnest:** spondyloarthritis umbrella (short by design); psoriatic arthritis pathogenesis is on K&C p.664 (ch.22 not read; §15 will cover psoriasis).
- **Batches 3–4 drafted** (2026-11-10, all `status: draft`, no new loose items): septic-arthritis, osteomyelitis, diabetic-foot-infection (`[bone-joint, endocrine]`); primary-hyperparathyroidism and hypoparathyroidism (both `[bone-joint, endocrine]`), vitamin-d-deficiency, osteomalacia (renamed "Osteomalacia and rickets").
- **Nodes that became files:** `septic-arthritis` (outcome; gonorrhoea, RA), `osteomalacia` (outcome; RTA) and the `hypoparathyroidism` mechanism (DiGeorge, whose chain now passes through the file). All users work unchanged.
- **Changes to existing files:** `chondrocalcinosis` and `gout` gained primary-hyperparathyroidism as a cause (K&C p.454, 452); `multiple-endocrine-neoplasia` gained the primary-hyperparathyroidism outcome (p.644); `renal-calculi-nephrocalcinosis` gained primary-hyperparathyroidism → stone formation (p.645); `diabetes-mellitus` gained `diabetic-foot-ulcer → diabetic-foot-infection` (p.734).
- **Existing nodes given a parent:** `lytic-bone-lesions` and `sclerotic-bone-metastases` under the new `bone-imaging-abnormality` (Q9), beside Looser zones, brown tumours and osteomyelitis on MRI; `raised-pth-alp` (CKD) under the new `raised-alp` (*CKD ~ osteomalacia, Paget's next*).
- **Shared hubs:** `haematogenous-seeding` (septic arthritis, osteomyelitis — *~ S. aureus bacteraemia, gonorrhoea*); `acute-monoarthritis` now gout, CPPD and septic arthritis; `osteoclast-activation` (*hyperPTH ~ myeloma*); `secondary-hyperparathyroidism` (*vitamin D ~ CKD*); `hypocalcaemia → neuromuscular-irritability`; `hypomagnesaemia` feeds both PTH deficiency and CPPD; the `fat-malabsorbing-disease` cause group (coeliac, Crohn's, CF, PBC → vitamin D).
- **Changes from the sketch:**
  - No organisms for diabetic foot infection and no coagulase-negative staphylococci for prosthetic joints: neither K&C nor Mehlman names them on the pages read. `prosthetic-joint-biofilm` was not added (K&C doesn't describe a biofilm); the prosthetic joint links straight to `joint-space-infection`.
  - The bone-spread mechanism is `spread-from-ulcer-or-wound`: `contiguous-spread` already exists under `cns-pathogen-entry` (brain abscess), so reusing it would make bone infection a sibling of CNS entry routes.
  - Chronic osteomyelitis is an outcome node; no separate sequestrum mechanism. TB spine reuses `spinal-tb` (`only: mycobacterium-tuberculosis`).
  - MEN reaches primary hyperparathyroidism through the MEN file, not `men1-mutation`/`ret-mutation` directly. Sporadic adenoma starts from `older-age` (K&C: cause unknown, mostly older women).
  - Idiopathic (autoimmune) hypoparathyroidism, pseudohypoparathyroidism, FHH and tertiary hyperparathyroidism are notes only.
  - Myeloma's renal phosphate wasting → osteomalacia (Box 19.11) left out as too marginal.
- **For the owner:** `osteoclast-activation` is named "without new bone formation" (written for myeloma). That fits hyperPTH, but not Paget's (batch 5), where formation is excessive. Rename it to "Osteoclast activation (bone resorption)" and keep the no-formation point in myeloma's note?
- **Thinnest:** diabetic foot infection (K&C gives no organisms); hypoparathyroidism has no outcomes.
- **Next:** batches 5–6 (osteoporosis, Paget's; bone metastases, primary-bone-tumour umbrella and types).
- **Owner answer (2026-11-10):** `osteoclast-activation` renamed to "Osteoclast activation (bone resorption)"; myeloma's note already says ALP stays normal. K&C ch.6 offset worked out: −21 (protocol table and README updated).
- **Batches 5–6: sources read, not yet drafted.** K&C p.477-479 (osteoporosis, Box 19.4 risk factors), p.482-483 (osteonecrosis, Paget's), p.485 (neoplastic, Box 19.12, which names chondromas but nothing else about them); K&C ch.6 p.100 (bone metastasis figure), p.104 (bone metastasis features), p.105 (hypercalcaemia primaries); Mehlman HY Anatomy-MSK-Rheum rows for osteoporosis, Paget, osteosarcoma (RB1, Paget, Codman/sunburst), Ewing (t(11;22), onion skin, diaphysis), chondrosarcoma, osteoid osteoma (NSAID-relieved pain), osteoma (Gardner/FAP); Mehlman HY Pathology (RB). Primary bone tumour files will be thin (Mehlman-only for chondrosarcoma, osteoid osteoma, osteoma).
- **Batches 5–6 drafted** (2026-11-10, all `status: draft`, no new loose items): osteoporosis, pagets-disease; bone-metastases (`parent: distant-metastases`, Q5 option a), primary-bone-tumour (umbrella), osteoma, osteoid-osteoma, osteosarcoma, chondrosarcoma, ewing-sarcoma.
- **Nodes that became files:** `osteoporosis` (outcome, 8+ users) and `bone-metastases` (outcome under `distant-metastases`, 7 users; the file keeps that parent). All users work unchanged.
- **Tumour mechanisms (Q7a):** `primary-bone-tumour-growth` → kinds `bone-forming-tumour` (→ `benign-bone-formation`: osteoma, osteoid osteoma; `malignant-osteoid-formation`: osteosarcoma), `cartilage-forming-tumour` (→ `malignant-cartilage-formation`: chondrosarcoma) and `small-round-cell-tumour` (Ewing). Malignant ones start at `malignant-transformation`.
- **Cross-disease links:** `osteoclast-activation` now joins myeloma, hyperPTH, Paget's and bone metastases; osteoma ~ colorectal cancer via `familial-adenomatous-polyposis`; Paget's → osteosarcoma, OA, heart failure, hydrocephalus; osteoporosis from hypogonadism (*~ prolactinoma, hypopituitarism*), glucocorticoids (*~ Cushing's*), vitamin D deficiency; `fragility-fracture` sits under `pathological-fracture` (Q10) beside myeloma's collapse.
- **Changes from the sketch:** no `osteoid-osteoma-nidus` (Mehlman gives only NSAID-relieved pain) and no separate `raised-alp`-isolated node (Paget's uses `raised-alp` with the note). `rb1-mutation` starts at `malignant-transformation`, since `tumour-suppressor-loss` is named for benign overgrowth. Smoking and alcohol go straight to `fragility-fracture` (K&C: BMD-independent).
- **Thinnest (Mehlman only):** osteoma, osteoid osteoma, chondrosarcoma. Chondroma and osteochondroma still await the owner's source (Q7b); K&C Box 19.12 names chondromas but gives nothing to cite beyond the name.
- **§14 fully drafted: 23 diseases with bone-joint as their home system** (2026-11-10). Next: owner review; then §3 clinical biochemistry.

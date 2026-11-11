# Step K1 — Kidney and male urogenital parent concepts (draft for review, 2026-11-09)

Same rules and legend as `concepts-nervous.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node or file, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [kidney-urogenital]` unless noted.

Sources (headings listed; offsets checked on two or three headings each):
- K&C ch.36 Kidney and urinary tract disease (printed = PDF − 13): glomerular disease p.1351–1368, kidney in other diseases p.1368–1369, hypertension and the kidney p.1370–1372, calculi p.1373–1376, obstruction p.1376–1379, drugs p.1380, UTI p.1381–1385, TIN p.1385–1387, AKI p.1387–1392, CKD p.1392–1398, cystic disease p.1405–1406, tumours p.1406–1407, prostate p.1407
- K&C ch.40 Men's health (**−12**, new; checked on Prostatitis 1479 and Testicular disease 1483): prostate p.1479–1482, penis p.1482, testis p.1483–1485
- K&C ch.37 STIs and HIV (**−13**, new; checked on STIs 1413 and Specific infections 1416): chlamydia, gonorrhoea, NGU, PID, epididymo-orchitis p.1416–1418
- K&C ch.9 Water, electrolytes and acid–base (**−19**, new; checked on two headings, and ch.36's own "see p.199" lands on RTA): renal tubular acidosis p.199
- Mehlman HY Renal; HY Repro-OBGYN for prostate and testis where K&C is thin
- No LMC kidney handouts in `Resources/` yet.

Note: many K&C boxes in ch.36 (causes of CKD, ATN, stones, obstruction, UTI organisms, TIN) lost their contents in conversion. Where a box is the only source, the link is drafted from the running text or Mehlman, or left out.

---

## 1. Disease list (syllabus §12): what becomes a file

Groups are the four syllabus groups.

| Group | Diseases | Umbrella |
|---|---|---|
| kidney | acute-kidney-injury, chronic-kidney-disease, renal-tubular-acidosis, tubulointerstitial-nephritis, nephrotic-syndrome, minimal-change-disease, focal-segmental-glomerulosclerosis, membranous-nephropathy, diabetic-nephropathy, glomerulonephritis, post-streptococcal-glomerulonephritis, iga-nephropathy, anti-gbm-disease, renal-calculi-nephrocalcinosis, urinary-tract-obstruction | nephrotic-syndrome → MCD, FSGS, membranous, diabetic; glomerulonephritis → PSGN, IgA, anti-GBM (Q2) |
| cystic-neoplastic-renal | adpkd, renal-cell-carcinoma, wilms-tumour | — |
| bladder-prostate-testis | urothelial-carcinoma, benign-prostatic-hyperplasia, prostate-cancer, testicular-torsion, testicular-germ-cell-tumour, penile-cancer | — |
| uti | urinary-tract-infection, cystitis, pyelonephritis, catheter-associated-uti, prostatitis, epididymo-orchitis, chlamydia-infection, gonorrhoea, pelvic-inflammatory-disease | urinary-tract-infection → cystitis, pyelonephritis, CAUTI, prostatitis, epididymo-orchitis (Q6) |

About 33 files, including three umbrellas.

**Existing nodes that become files (same id, so every current link keeps working)**
- `acute-kidney-injury` (outcome; used by 15 files). Its child node `hepatorenal-syndrome` keeps the AKI file as its parent (an outcome may have a disease parent).
- `chronic-kidney-disease` (outcome; used by 9 files, including `secondary-hypertension`'s `chronic-kidney-disease → salt-water-retention`)
- `glomerulonephritis` (outcome "Immune-complex glomerulonephritis"; used by 7 files) → the nephritic umbrella. See Q2.
- `nephrotic-syndrome` (cause; used by AL amyloidosis, secondary hyperlipidaemia and SBP) → the nephrotic umbrella
- `adpkd` (cause; used by subarachnoid haemorrhage)
- `renal-calculi-nephrocalcinosis` (outcome; used by Crohn's, IBD, sarcoidosis, squamous-cell lung cancer). K&C's heading is "Renal calculi and nephrocalcinosis", so the id fits.
- Deleting these nodes drops their old parent: `glomerulonephritis`, AKI and CKD leave `kidney-injury`. `kidney-injury` keeps `pauci-immune-crescentic-gn`, which could move under the glomerulonephritis file instead (Q2).

**Not files**
- **Acute tubular necrosis, rhabdomyolysis, contrast nephropathy, tumour lysis:** mechanisms or causes of AKI (`tumour-lysis-syndrome` already exists as an outcome).
- **Lupus nephritis:** SLE already links to `glomerulonephritis`; the ISN classes go in a note. See Q3.
- **Hypertensive nephropathy:** stays an outcome node (under `hypertensive-end-organ-damage`, beside retinopathy) and gains a link to CKD. See Q4.
- **Mesangiocapillary GN, Alport, thin GBM, cryoglobulinaemia, Fabry, sickle nephropathy:** notes in the umbrella files unless the owner wants files.
- **Simple renal cysts, angiomyolipoma, oncocytoma, bladder SCC and adenocarcinoma, sex cord tumours, hydrocoele:** notes and differentials in the nearest file. K&C gives each a line or two at most. See Q5.
- **RCC, ADPKD's medullary relatives (medullary sponge kidney, nephronophthisis):** notes in ADPKD.
- **Tests of glomerular and tubular function, eGFR, dipstick, PSA testing, dialysis, transplant:** findings or notes.
- **CKD mineral and bone disorder:** an outcome here; §14 may turn it into a file. See Q10.
- **Renal TB, xanthogranulomatous pyelonephritis, renal carbuncle:** notes in pyelonephritis.

**Second systems** (Q9)
- Existing files gaining `kidney-urogenital`: systemic-lupus-erythematosus, granulomatosis-with-polyangiitis, microscopic-polyangiitis, iga-vasculitis (the syllabus's "vasculitis, SLE"), haemolytic-uraemic-syndrome and renal-artery-stenosis (both taught in K&C's kidney chapter)
- diabetic-nephropathy: `[kidney-urogenital, endocrine]`? Recommended: kidney only until §11 is planned.
- pelvic-inflammatory-disease: `[kidney-urogenital, female-genital]`
- chlamydia-infection, gonorrhoea: `[kidney-urogenital, infection]`? Recommended: kidney only until §4 is planned.

---

## 2. Cause parents

**Organisms**
- `enterobacteriaceae` (E. coli, Klebsiella) reused — *UTI ~ SBP ~ cholangitis ~ CAP in the frail*. New child **proteus-mirabilis** (urease, struvite stones) — *UTI ~ staghorn stones*
- `enterococci` reused (UTI, catheter) — *UTI ~ endocarditis ~ cholangitis*
- **staphylococcus-saprophyticus** under `coagulase-negative-staphylococci` — *UTI in young women ~ line infections*
- `pseudomonas-aeruginosa` reused (catheter UTI)
- `group-a-streptococcus` reused (PSGN) — *PSGN ~ rheumatic fever ~ cellulitis*
- **neisseria-gonorrhoeae** under `neisseria` — *gonorrhoea ~ meningococcal disease*
- **chlamydia-trachomatis** (no parent; `atypical-bacteria` is the respiratory group)
- `mycobacterium-tuberculosis` reused only in notes (renal TB)
- **schistosoma-haematobium** (bladder SCC). The existing `schistosoma` is named "(mansoni / japonicum)". See Q8.

**Genetic**
- **pkd-gene-mutation** (PKD1/PKD2, ADPKD)
- **vhl-mutation** (RCC)
- **wt1-mutation** (Wilms), only if the page names it
- `complement-regulator-defect` reused (atypical HUS, already in haematology)

**Risk factors and conditions**
- `diabetes-mellitus` (cause) reused — *diabetic nephropathy ~ CAD ~ stroke*
- `hypertension` (file) reused as a cause of CKD — *CKD ~ every hypertensive outcome*
- `smoking` reused (RCC, urothelial carcinoma) — *bladder ~ lung ~ pancreas*
- `obesity` reused (RCC)
- `female-sex` reused (UTI) — *UTI ~ SLE ~ autoimmune group*
- `immunosuppression` reused (UTI risk; K&C p.1382)
- **urinary-catheter** under `intravascular-device`? No: it isn't intravascular. A plain risk factor, linking to the existing `biofilm-formation` mechanism — *CAUTI ~ line infection ~ prosthetic valve IE*
- **urinary-stasis** (incomplete emptying, stones, obstruction) as a mechanism, not a cause (§3)
- **sexual-activity** (new sexual activity: UTI) and **unprotected-sex-multiple-partners** (STIs)
- **aromatic-amine-exposure** (dyes, rubber: urothelial carcinoma)
- **nephrotoxic-drug** parent: **aminoglycosides**, **iodinated-contrast**, `nsaid-use` reused if its parent allows (it has none) — *AKI ~ peptic ulcer through NSAIDs*. Also **acei-arb** (pre-renal with RAS). **drug-hypersensitivity** for TIN.
- **volume-depletion** (pre-renal AKI, stones)
- **ageing-male** (BPH, prostate cancer), **cryptorchidism** (germ cell tumour), **hpv-infection** (penile cancer; the cervix will reuse it in §16)
- **lithogenic-urine** states (hypercalciuria, hyperoxaluria, hyperuricosuria, cystinuria): kinds under one **stone-forming-urine** cause, with `hypercalcaemia` (finding) not reused as a cause. Crohn's and sarcoidosis already chain into `renal-calculi-nephrocalcinosis`.

---

## 3. Mechanism parents

**Glomerular**
- **`glomerular-injury`** (new parent) — *every glomerular disease side by side*:
  - **podocyte-injury** (nephrotic: MCD, FSGS, membranous, diabetic) — the AL amyloidosis file joins by a link, not a parent
  - **glomerular-hyperfiltration** (diabetic nephropathy, nephron loss in CKD)
  - **glomerular-inflammation** (nephritic: the immune routes below all reach it)
- Immune routes stay under `immune-mediated-injury`, as immunology set them up:
  - `immune-complex-deposition` reused (PSGN, IgA nephropathy, lupus) — *PSGN ~ IE ~ HBV ~ SLE*
  - **anti-gbm-antibody** under `antibody-mediated-cytotoxicity` (type II) — *anti-GBM ~ MG ~ AIHA*
  - `anca-small-vessel-vasculitis` reused (pauci-immune)
- **mesangial-iga-deposition** under `immune-complex-deposition` (IgA nephropathy and IgA vasculitis) — *IgA nephropathy ~ IgA vasculitis*

**Tubular and interstitial**
- **`tubular-injury`** (new parent):
  - **acute-tubular-necrosis** (ischaemic and toxic; myoglobin from rhabdomyolysis, contrast, aminoglycosides)
  - `light-chain-cast-nephropathy` reused (no parent today) — *myeloma ~ ATN*
  - **tubulointerstitial-inflammation** (TIN: drugs, infection, sarcoid)
  - **tubular-acid-secretion-defect** (RTA, with `only:` for types 1, 2 and 4)
- `renal-hypoperfusion` reused (pre-renal AKI) — *AKI ~ renal artery stenosis ~ hepatorenal ~ shock*

**Progressive loss**
- **nephron-loss** (CKD), driving **reduced-epo-production** — *CKD anaemia ~ marrow failure* — and **phosphate-retention-low-calcitriol** → **secondary-hyperparathyroidism**
- `salt-water-retention` reused (CKD, nephrotic, AKI) — *kidney ~ heart failure ~ cirrhosis*

**Stones, obstruction, infection**
- **urinary-stone-formation** — new parent **`stone-formation`** over it and the existing `gallstone-formation`? See Q7.
- `luminal-obstruction` reused, gaining **urinary-outflow-obstruction** — *stones ~ BPH ~ gallstones ~ bowel obstruction*
- **urinary-stasis**
- **ascending-urinary-infection** (bladder → kidney) — *UTI*; obstructed pyelonephritis also reaches `obstructed-viscus-infection` (cholangitis' parent) — *obstructed pyelonephritis ~ cholangitis*
- `biofilm-formation` reused (catheters)
- **ascending-genital-infection** (cervix → tubes in PID; urethra → epididymis)

**Cystic and neoplastic**
- **cyst-formation-expansion** (ADPKD)
- `malignant-transformation` reused, gaining **renal-tubular-malignancy** (RCC), **urothelial-malignancy**, **prostatic-adenocarcinoma**, **germ-cell-malignancy**, **embryonal-renal-malignancy** (Wilms), **penile-squamous-malignancy** — *the GU cancers beside every other primary*
- `ectopic-hormone-secretion` reused (RCC: EPO, PTHrP) — *RCC ~ small-cell lung cancer*
- **androgen-driven-prostatic-growth** (BPH; also prostate cancer)

**Other**
- **spermatic-cord-torsion** → `tissue-ischaemia` reused — *torsion ~ mesenteric ischaemia ~ MI*
- `microvascular-thrombosis` reused (HUS, scleroderma crisis) — already there

---

## 4. Finding parents

- **`urine-abnormality`** (lab) — new parent over the existing `proteinuria` and `haematuria` (both have no parent today), plus:
  - **nephrotic-range-proteinuria** as a child of `proteinuria`
  - **red-cell-casts-dysmorphic-rbc** (nephritic)
  - **pyuria-nitrites** (dipstick) and **significant-bacteriuria** (culture)
  - `bence-jones-proteinuria` reused if moving it is OK (Q8)
- **`renal-function-test`** (lab):
  - **raised-creatinine-low-egfr** — *the whole kidney group*
  - **hyperkalaemia** (new; only `hypokalaemia` exists)
  - **metabolic-acidosis**, with **normal-anion-gap-acidosis** (RTA) as a child
  - **hypoalbuminaemia**
  - **hyperphosphataemia**
  - `hypocalcaemia`, `hypokalaemia`, `hyperuricaemia` and `anaemia` reused — *CKD anaemia ~ ACD*
- **raised-psa** (prostate), **testicular-tumour-markers** (AFP, β-hCG, LDH); `raised-afp` reused — *NSGCT ~ HCC*
- **`renal-biopsy-finding`** (histology): **foot-process-effacement**, **subepithelial-igg-spikes** (membranous), **mesangial-iga-deposits**, **linear-igg-gbm**, **glomerular-crescents**, **kimmelstiel-wilson-nodules**
- **Imaging:** **hydronephrosis-on-imaging**, **enlarged-cystic-kidneys**, **renal-mass-on-imaging**, **calculus-on-ct-kub**; `renal-asymmetry` reused
- **Symptoms and signs:**
  - `peripheral-oedema` reused, and **periorbital-oedema** — *nephrotic ~ heart failure ~ cirrhosis*
  - **frothy-urine**
  - **oliguria-anuria**
  - **loin-pain**; **renal-colic** under `colicky-abdominal-pain` — *renal colic ~ biliary colic ~ bowel obstruction*
  - **lower-urinary-tract-symptoms** (storage and voiding: BPH, prostatitis) with **dysuria-frequency-urgency** (cystitis) and **acute-urinary-retention** as children
  - `fever` reused; `abdominal-mass` reused, gaining **ballotable-renal-mass** (RCC, ADPKD, Wilms)
  - **urethral-discharge** (gonorrhoea, chlamydia) and **pelvic-pain-cervical-excitation** (PID)
  - **acute-scrotal-pain-swelling** (torsion, epididymo-orchitis) and **painless-testicular-lump** (germ cell)
  - `raised-blood-pressure` reused (CKD, nephritic)
  - `pruritus` reused (uraemia) — *CKD ~ cholestasis*

---

## 5. Outcome parents

- `acute-kidney-injury` and `chronic-kidney-disease` (files) as outcomes of most files here
- **end-stage-kidney-disease** as a note in CKD, not a node
- **ckd-mineral-bone-disorder** (outcome) — §14 will meet it
- `ventricular-arrhythmia` reused, reached through hyperkalaemia — *AKI ~ MI*
- **acute-pulmonary-oedema**: reuse cardio's node if one exists; otherwise `heart-failure` (file)
- `acute-pericarditis` (file) already uses CKD (uraemic pericarditis)
- `septic-shock` and `bacteraemia` (file) from pyelonephritis and CAUTI — *urosepsis ~ every septic file*
- `deep-vein-thrombosis` (file) and **renal-vein-thrombosis** from nephrotic syndrome — *nephrotic ~ DVT*
- `secondary-hyperlipidaemia` (file) already links from `nephrotic-syndrome`
- `subarachnoid-haemorrhage` (file) already links from `adpkd`; ADPKD also gets **polycystic-liver** and `hypertension`
- `secondary-polycythaemia` and `hypercalcaemia-of-malignancy` reused from RCC — *RCC ~ PV's differential ~ squamous lung cancer*
- `distant-metastases`, `bone-metastases` reused (prostate, RCC); lung metastases reuse an existing node if one exists
- `urinary-tract-obstruction` (file) as an outcome of stones and BPH; `urinary-tract-infection` (file) from obstruction and stones
- **testicular-infarction** (torsion); `male-infertility` reused (epididymo-orchitis, torsion) — *epididymo-orchitis ~ CF*
- **tubal-infertility-ectopic-pregnancy** and **perihepatitis-fitz-hugh-curtis** (PID)
- `septic-arthritis` reused (disseminated gonococcal infection) — *gonorrhoea ~ the joint infections*
- **reactive-arthritis** from chlamydia, only if the pages say so (it may wait for §14)
- `pulmonary-haemorrhage`-type outcome from anti-GBM: reuse the GPA one if it exists, so *anti-GBM ~ GPA*

---

## Decisions (2026-11-09)

1. Kidney goes before endocrine (Q1).
2. Lupus nephritis is a note in SLE (Q3).
3. Hypertensive nephropathy stays an outcome node under `hypertensive-end-organ-damage`, linked to CKD (Q4).
4. Thin entries are notes (Q5). UTI is an umbrella with five children (Q6).
5. The node changes in Q8 go ahead, including the plain `schistosoma-haematobium` sibling.
6. Second systems as listed in Q9. CKD–MBD is an outcome node (Q10). STIs and PID are drafted here, with PID as `[kidney-urogenital, female-genital]` (Q11).
7. The `glomerulonephritis` node becomes the umbrella file (same id), and `pauci-immune-crescentic-gn` moves under it (Q2).
8. No shared `stone-formation` parent: renal and biliary stones stay apart (Q7).
9. `hiv` gets no parent (immunology Q9, 2026-11-10).

## Progress

- **Batch 1 drafted** (2026-11-10, all `status: draft`, 0 loose items): acute-kidney-injury, chronic-kidney-disease, renal-tubular-acidosis, tubulointerstitial-nephritis.
- **Shared hubs:**
  - New **`excretory-failure`** (falling GFR) is the hub both AKI and CKD reach, carrying creatinine, K+, acidosis and salt–water retention — *AKI ~ CKD*. Not in the sketch.
  - New **`tubular-injury`** with ATN, TIN inflammation and the three RTA defects as kinds; `light-chain-cast-nephropathy` joined it — *myeloma ~ ATN ~ TIN ~ RTA*.
  - New **`urinary-outflow-obstruction`** under `luminal-obstruction`; for now it starts from `renal-calculi-nephrocalcinosis` and a sloughed papilla. BPH and the obstruction file add to it later.
  - `renal-hypoperfusion` now also takes volume depletion, septic shock, heart failure, NSAIDs and ACEi/ARBs — *AKI ~ renal artery stenosis ~ heart failure ~ sepsis*.
  - `intravascular-haemolysis` → ATN — *AKI ~ haemolysis*; `sickle-cell-disease` → papillary necrosis.
  - `erythropoietin-deficiency` (from haematology) now reached from `nephron-loss`.
- **Cause group:** TIN declares `nephritis-causing-drug` (beta-lactams, NSAIDs, PPIs); AKI declares `nephrotoxic-drug` (aminoglycosides, contrast), which is also their parent.
- **Existing nodes changed:**
  - `acute-kidney-injury` and `chronic-kidney-disease` nodes deleted (now files); both lose their old `kidney-injury` parent. `hepatorenal-syndrome` keeps `parent: acute-kidney-injury`, now a disease parent.
  - `proteinuria`, `haematuria` and `bence-jones-proteinuria` now sit under the new `urine-abnormality` (Q8).
  - `light-chain-cast-nephropathy` now sits under `tubular-injury` (Q8).
- **Existing files changed:** none. All existing links to AKI and CKD keep working unchanged.
- **Changes from the sketch:**
  - The finding parent is `renal-function-test` ("Abnormal renal function tests (U&E)"). `hypokalaemia` was left where it is, as it already serves cardio and GI.
  - `papillary-necrosis` sits under `tissue-ischaemia` (K&C calls it ischaemic), not `tubular-injury`.
  - `glomerular-hyperfiltration` is deferred to batch 2; CKD's note carries the hyperfiltration idea for now.
  - RTA types are three mechanisms, not `only:` tags, since `only:` must name a cause.
  - New K&C offset used: ch.9 p.175 (Fanconi causes) and p.199–200.
- **Thin:** RTA (one K&C page). TINU, IgG4 disease, Balkan and Chinese herb nephropathy are left out (one line each).
- **Batches 2–3 drafted** (2026-11-10, all `status: draft`, 0 loose items):
  - Nephrotic: nephrotic-syndrome (umbrella; the old cause node, deleted), minimal-change-disease, focal-segmental-glomerulosclerosis, membranous-nephropathy, diabetic-nephropathy.
  - Nephritic: glomerulonephritis (umbrella, named "Glomerulonephritis (nephritic syndrome)"; the old outcome node, deleted), post-streptococcal-glomerulonephritis, iga-nephropathy, anti-gbm-disease.
- **Shared hubs:**
  - New **`glomerular-injury`** with **podocyte-injury** (all nephrotic files), **glomerular-hyperfiltration** (diabetic, secondary FSGS; fed by `nephron-loss`, so *FSGS ~ CKD*) and **glomerular-inflammation** (all nephritic files) — *every glomerular disease side by side*.
  - New **`urinary-protein-loss`** carries the nephrotic complications: `secondary-hyperlipidaemia`, `hypercoagulability` → `deep-vein-thrombosis` and renal vein thrombosis, and `antibody-deficiency` → `community-acquired-pneumonia` — *nephrotic ~ XLA ~ CVID*.
  - Under `immune-complex-deposition`: new **subepithelial-immune-deposits** (membranous; fed by hepatitis B, SLE, lung cancer, NSAIDs) and **mesangial-iga-deposition** (IgA nephropathy, IgA vasculitis, coeliac) — *IgA nephropathy ~ IgA vasculitis ~ coeliac*.
  - New **anti-gbm-antibody** under `antibody-mediated-cytotoxicity` — *anti-GBM ~ MG ~ AIHA*; it reaches the existing `diffuse-alveolar-haemorrhage` — *anti-GBM ~ GPA ~ MPA*.
  - The umbrella's routes: immune complex, anti-GBM and `anca-small-vessel-vasculitis` all reach `glomerular-inflammation`.
  - PSGN reuses `raised-aso-titre` — *PSGN ~ rheumatic fever*; FSGS takes `hiv`, `sickle-cell-disease`, `obesity`.
- **Existing nodes changed:** `nephrotic-syndrome` (cause) and `glomerulonephritis` (outcome) deleted, now files; `glomerulonephritis` loses its `kidney-injury` parent. `pauci-immune-crescentic-gn` now has the `glomerulonephritis` file as its parent (Q2). `kidney-injury` now has no children but is still used by `pulmonary-oedema` (`kidney-injury → salt-water-retention`); repointing that to the AKI and CKD files would let the node go — not done, as it removes a node.
- **Existing files changed:**
  - `systemic-lupus-erythematosus`, `granulomatosis-with-polyangiitis`, `microscopic-polyangiitis`, `iga-vasculitis`: systems now `[immunology, kidney-urogenital]`; `haemolytic-uraemic-syndrome` `[haematology, kidney-urogenital]`; `renal-artery-stenosis` `[cardiovascular, kidney-urogenital]` (Q9).
  - `systemic-lupus-erythematosus`: lupus nephritis note now gives the classes (IV commonest and worst, V membranous) and 25% ESKD in 10 years; K&C p.1366 added to sources (Q3).
  - `iga-vasculitis`: its GN now goes through `mesangial-iga-deposition`; K&C p.1362 added to sources.
  - `acute-kidney-injury` (batch 1): now also reaches the existing `pulmonary-oedema` file.
- **Changes from the sketch:**
  - Membranous's primary form starts from a new cause **primary-pla2r-autoimmunity**, so the anti-PLA2R finding can be `only:` primary (secondary causes lack it).
  - Lupus nephritis has no new mechanism; SLE's existing immune-complex link to the umbrella carries it.
  - Frothy urine left out (not on the pages read).
- **Thin:** none really; MCD's causes are mostly idiopathic, so its chain is short.
- **Batches 4–5 drafted** (2026-11-10, all `status: draft`, 0 loose items):
  - Stones, obstruction, cysts: renal-calculi-nephrocalcinosis (the old outcome node, deleted), urinary-tract-obstruction (named "Urinary tract obstruction (hydronephrosis)"), adpkd (the old cause node, deleted; group `cystic-neoplastic-renal`).
  - UTI: urinary-tract-infection (umbrella), cystitis, pyelonephritis, catheter-associated-uti, prostatitis, epididymo-orchitis.
- **Shared hubs:**
  - New **urinary-stone-formation** (no shared parent with gallstones, per Q7), fed by volume depletion, idiopathic hypercalciuria, primary hyperoxaluria, `gout` (uric acid), **proteus-mirabilis** (struvite), cystinuria and ADPKD cysts — *stones ~ gout ~ UTI ~ ADPKD*.
  - **renal-colic** sits under `colicky-abdominal-pain` — *renal colic ~ biliary colic ~ bowel obstruction*.
  - `urinary-outflow-obstruction` (batch 1) now also takes PUJ obstruction, retroperitoneal fibrosis and `colorectal-cancer`; new **urinary-stasis** joins obstruction and stones to UTI.
  - UTI umbrella declares a cause group **uropathogen** (E. coli/Enterobacteriaceae, Proteus, S. saprophyticus, enterococci, Pseudomonas) into new **ascending-urinary-infection**.
  - Catheter UTI reuses `catheter-biofilm` — *CAUTI ~ line infection*; it adds `candida`.
  - Pyelonephritis and prostatitis reach `dysregulated-host-response` → `septic-shock` — *urosepsis ~ every septic file*.
  - ADPKD keeps its route to `subarachnoid-haemorrhage` via `berry-aneurysm`, and adds `raas-activation` → `secondary-hypertension`.
  - Epididymo-orchitis reuses `mumps-virus` and `male-infertility`; new **testicular-infarction** is ready for torsion (batch 8).
  - **chlamydia-trachomatis** and **neisseria-gonorrhoeae** (under `neisseria`) created now for prostatitis and epididymo-orchitis; batch 6 builds their files.
- **Existing nodes changed:** `renal-calculi-nephrocalcinosis` (outcome) and `adpkd` (cause) deleted, now files; every existing link to them (Crohn's, IBD, sarcoidosis, squamous lung cancer, RTA, AKI, CKD, SAH) still works.
- **Existing files changed:** none.
- **Changes from the sketch:**
  - LUTS parent created with **voiding-luts** and **dysuria-frequency-urgency**; acute retention waits for BPH (batch 8).
  - BPH can't yet feed obstruction (no file until batch 8); it will be added then.
  - `obstructed-viscus-infection` not used: pyelonephritis's obstructed route goes straight from `urinary-outflow-obstruction`.
  - Mitral valve prolapse in ADPKD is a note (no node).
- **Thin:** prostatitis (one K&C paragraph each in ch.36 and ch.40).
- **Batches 6–7 drafted** (2026-11-10, all `status: draft`, 0 loose items): chlamydia-infection, gonorrhoea, pelvic-inflammatory-disease (`[kidney-urogenital, female-genital]`); renal-cell-carcinoma, wilms-tumour, urothelial-carcinoma.
  - STIs share new **genital-mucosal-infection** → **ascending-genital-infection** → PID and `epididymo-orchitis` — *chlamydia ~ gonorrhoea ~ PID ~ epididymo-orchitis*. New **unprotected-sex-multiple-partners** cause.
  - PID chain starts from the chlamydia and gonorrhoea files, plus `anaerobic-bacteria`; tubo-ovarian abscess reuses `abscess-formation` → `intra-abdominal-abscess` — *PID ~ diverticulitis*.
  - DGI routes through `haematogenous-seeding` → `septic-arthritis` — *gonorrhoea ~ bacteraemia ~ joint infection*. Chlamydia → new **reactive-arthritis** outcome (K&C p.1416).
  - Tumours: new **renal-tubular-malignancy**, **embryonal-renal-malignancy**, **urothelial-malignancy** under `malignant-transformation`; new **epo-secretion** under `ectopic-hormone-secretion`. RCC reuses `pthrp-secretion` (*RCC ~ squamous lung*), `raas-activation` → `secondary-hypertension` (*RCC ~ ADPKD ~ RAS*), `erythropoietin-deficiency` (*RCC ~ CKD anaemia*). New **flank-mass** under `abdominal-mass` (*RCC ~ Wilms*).
  - Bladder SCC is a note plus `schistosoma-haematobium` → `inflammation-driven-transformation` (*bladder SCC ~ HCC ~ IBD cancer*); urothelial tumours feed `urinary-outflow-obstruction`.
  - Not used: `obesity` for RCC (no page read says it); mycoplasma genitalium and NGU are notes only. Wilms is thin (one K&C paragraph; Mehlman for genetics).
- **Existing files changed:** none.
- **Batch 8 drafted** (2026-11-10, all `status: draft`, 0 loose items): benign-prostatic-hyperplasia, prostate-cancer, testicular-torsion, testicular-germ-cell-tumour, penile-cancer. **All 8 kidney batches are now drafted.**
  - BPH: new **androgen-driven-prostatic-growth** → `urinary-outflow-obstruction` → new **storage-luts** and **acute-urinary-retention** (under `lower-urinary-tract-symptoms`), `voiding-luts`, `urinary-incontinence`, AKI — *BPH ~ stones ~ urothelial tumours ~ obstruction*.
  - New **abnormal-prostate-on-dre** parent over new smooth/hard kinds and the existing `tender-swollen-prostate` (moved; it had no parent) — *BPH ~ prostate cancer ~ prostatitis*.
  - Prostate cancer reuses `older-age`, `bone-metastases` → `spinal-cord-compression` — *prostate ~ myeloma*.
  - Torsion: new **spermatic-cord-torsion** under `tissue-ischaemia` → `testicular-infarction` — *torsion ~ mesenteric ischaemia ~ epididymo-orchitis*. New **cryptorchidism** cause links torsion ~ germ cell tumour.
  - Germ cell reuses `raised-afp` (*NSGCT ~ HCC*) and `gynaecomastia` (*~ cirrhosis*). Penile cancer: new **hpv-infection** (ready for cervix in §16).
  - Thin: penile cancer (K&C gives no presenting features; one finding); germ-cell markers come from Mehlman, since K&C's investigation page is in ch.6 (no offset).
- **`kidney-injury` removed** (owner approved, 2026-11-10): `pulmonary-oedema` now starts from the AKI and CKD files instead.
- **Existing files changed:** urinary-tract-obstruction (BPH now feeds `urinary-outflow-obstruction`; p.1480 added to sources).

## Questions before drafting

1. **Is kidney the right next system?** I chose it because it has the most links waiting: lupus nephritis, ANCA GN, myeloma kidney, HUS and the deferred second systems. The other way: endocrine (§11) first, which picks up Graves', Hashimoto's, T1DM and Addison's from immunology and would let `diabetes-mellitus` become a file before diabetic nephropathy needs it.
2. **The nephritic umbrella.** Recommended: turn the `glomerulonephritis` node into the umbrella file (same id, renamed "Glomerulonephritis (nephritic syndrome)"), so its 7 existing users keep working, and move `pauci-immune-crescentic-gn` under it as an outcome with a disease parent. The other way: a new `nephritic-syndrome` umbrella, leaving `glomerulonephritis` as the immune-complex outcome node. That's cleaner in name, but the immune-complex node and the umbrella would then be two separate places for the same idea.
3. **Lupus nephritis.** Recommended: a note in SLE (classes I–VI), since SLE already links to `glomerulonephritis`. The other way: a child file under the glomerulonephritis umbrella.
4. **Hypertensive nephropathy.** Recommended: keep it an outcome node under `hypertensive-end-organ-damage` (beside retinopathy) and link it to CKD. The other way: make it a file, like diabetic nephropathy, at the cost of that parent.
5. **Thin entries as notes:** simple cysts, angiomyolipoma, oncocytoma, bladder SCC and adenocarcinoma, sex cord tumours, hydrocoele. Recommended: notes in RCC, ADPKD, urothelial carcinoma and the testis files. The other way: small files for each, which would be very thin.
6. **UTI as one umbrella with five children** (cystitis, pyelonephritis, catheter UTI, prostatitis, epididymo-orchitis), or one UTI file using `only:` for each syndrome? Recommended: the umbrella, because the syllabus lists them as separate clinical syndromes and they differ in findings and outcomes.
7. **A shared `stone-formation` parent** over the existing `gallstone-formation` and the new `urinary-stone-formation`? Recommended: yes — *gallstones ~ renal stones* — since `gallstone-formation` has no parent today. The other way: keep them apart.
8. **Changes to existing nodes:**
   - `proteinuria` and `haematuria` gain the new `urine-abnormality` parent; `bence-jones-proteinuria` moves under it too. Recommended: yes.
   - `light-chain-cast-nephropathy` gains `tubular-injury` as its parent. Recommended: yes.
   - `schistosoma` ("mansoni / japonicum") becomes "Schistosoma species" with children, so *S. haematobium* sits beside the liver species. Recommended: no, too much change for one note; add **schistosoma-haematobium** as a plain sibling.
9. **Second systems on existing files:** SLE, GPA, MPA, IgA vasculitis, HUS and renal artery stenosis gain `kidney-urogenital`. Recommended: yes. Myeloma and AL amyloidosis stay haematology-only (their kidney links work without it).
10. **CKD–mineral bone disorder:** an outcome node now (recommended), or wait for §14 and make it a file then.
11. **STIs and PID here.** The syllabus lists chlamydia, gonorrhoea and PID under §12's UTI group. Recommended: draft them here, PID as `[kidney-urogenital, female-genital]`. The other way: wait for §4 infection and §16.

## Batch order (proposed)

Two batches at a time, as before.
1. Kidney failure and tubules: acute-kidney-injury, chronic-kidney-disease, renal-tubular-acidosis, tubulointerstitial-nephritis (4)
2. Nephrotic: nephrotic-syndrome (umbrella), minimal-change-disease, focal-segmental-glomerulosclerosis, membranous-nephropathy, diabetic-nephropathy (5)
3. Nephritic: glomerulonephritis (umbrella), post-streptococcal-glomerulonephritis, iga-nephropathy, anti-gbm-disease, plus the second-system edits (4)
4. Stones, obstruction and cysts: renal-calculi-nephrocalcinosis, urinary-tract-obstruction, adpkd (3)
5. UTI: urinary-tract-infection (umbrella), cystitis, pyelonephritis, catheter-associated-uti, prostatitis, epididymo-orchitis (6)
6. STIs: chlamydia-infection, gonorrhoea, pelvic-inflammatory-disease (3)
7. Renal and urothelial tumours: renal-cell-carcinoma, wilms-tumour, urothelial-carcinoma (3)
8. Prostate, testis and penis: benign-prostatic-hyperplasia, prostate-cancer, testicular-torsion, testicular-germ-cell-tumour, penile-cancer (5)

AKI and CKD go first because nearly every later file ends in one of them.

# Step H1 — Haematology parent concepts (draft for review, 2026-11-08)

Same rules and legend as `concepts-nervous.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [haematology]` unless noted.

Sources:
- K&C ch.16 Haematology and ch.17 Haematological oncology (printed page = PDF marker − 24; checked on five headings across both chapters)
- K&C ch.29 VTE (−17, already in the table) for DVT
- Mehlman HY Heme-Onc
- No LMC haematology handouts in `Resources/` yet. Add any before drafting and I'll work them in.

Immunology (§6) is planned alongside in `concepts-immuno.md`. The two share some diseases (ITP, AIHA, pernicious anaemia, mastocytosis, antiphospholipid syndrome) and the new hypersensitivity mechanisms; each disease has one home, given below.

---

## 1. Disease list (syllabus §5): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| anaemia | iron-deficiency-anaemia, anaemia-of-chronic-disease, sideroblastic-anaemia, pernicious-anaemia, folate-deficiency-anaemia, aplastic-anaemia | — (see Q2) |
| haemolysis | hereditary-spherocytosis, g6pd-deficiency, pyruvate-kinase-deficiency, autoimmune-haemolytic-anaemia, haemolytic-disease-of-the-newborn | — |
| globin-disorders | sickle-cell-disease, alpha-thalassaemia, beta-thalassaemia | thalassaemia → alpha, beta |
| transfusion | transfusion-complications | — (one file, like `prosthetic-valve-complications`) |
| aml-mds | myelodysplastic-syndrome, acute-myeloid-leukaemia | — |
| myeloproliferative | polycythaemia-vera, essential-thrombocythaemia, primary-myelofibrosis, chronic-myeloid-leukaemia, systemic-mastocytosis | myeloproliferative-neoplasm → PV, ET, PMF, CML |
| high-grade-lymphoma | diffuse-large-b-cell-lymphoma, burkitt-lymphoma, acute-lymphoblastic-leukaemia, hodgkin-lymphoma | — |
| low-grade-lymphoproliferative | chronic-lymphocytic-leukaemia, follicular-lymphoma, waldenstrom-macroglobulinaemia; `gastric-malt-lymphoma` already exists (GI home, haematology second) | — |
| plasma-cell | mgus, multiple-myeloma, al-amyloidosis | — |
| thrombosis | deep-vein-thrombosis, antiphospholipid-syndrome | — (see Q5) |
| bleeding-disorders | haemophilia, von-willebrand-disease, vitamin-k-deficiency-bleeding | — |
| platelets-tma | immune-thrombocytopenia, disseminated-intravascular-coagulation, thrombotic-thrombocytopenic-purpura, haemolytic-uraemic-syndrome, heparin-induced-thrombocytopenia | — |

About 41 files, including the two umbrellas. That's the biggest system yet after GI.

**Not files**
- **Haematopoiesis, erythropoietin, hepcidin, B12/folate metabolism, haemoglobin structure:** mechanism nodes and notes, not diseases.
- **Sickle cell trait:** a note in `sickle-cell-disease` (protective, usually silent), not a file.
- **Thalassaemia severity** (transfusion-dependent vs not): notes and `only:` edges inside each thalassaemia file, not separate files.
- **Smouldering myeloma:** a note on the MGUS → myeloma edge.
- **Acute promyelocytic leukaemia:** stays inside AML. Its DIC edge carries the note "APL: t(15;17), DIC, ATRA".
- **Haemophilia A and B:** one file, with **f8-mutation** and **f9-mutation** as causes and `only:` where they differ (the gastroenteritis pattern).
- **AIHA warm and cold:** one file, with warm IgG and cold IgM as separate entry mechanisms and `only:` for cold-only features (acrocyanosis, Mycoplasma/EBV triggers).
- **Acquired platelet dysfunction:** causes and a mechanism (aspirin/antiplatelets, uraemia, liver disease), not a file.
- **Inherited thrombophilia:** keeps the existing cause `heritable-thrombophilia` (used by PE), not a file.
- **Anticoagulants, transfusion indications and products, pre-transfusion testing:** notes. `anticoagulant-therapy` stays a cause.
- **Primary vs secondary polycythaemia:** PV is a file. The existing finding `secondary-polycythaemia` (lung disease) stays a finding.
- **"Differential diagnoses in haematology"** (pancytopenia, neutrophilia, etc.) is the Differential page's job. Aplastic anaemia is the only disease it names, so it becomes a file in the anaemia group.

**Existing nodes that become files**
- `iron-deficiency-anaemia` is a **finding** used by six GI files (coeliac, colorectal cancer, Crohn's, gastric cancer, GORD, UC). A finding can't become a disease file the way an outcome can. See **Q1**.
- `haemolytic-uraemic-syndrome` (outcome under `acute-kidney-injury`, used by bacterial gastroenteritis) becomes a file. It loses its `acute-kidney-injury` parent.
- `purpura-fulminans-dic` (outcome, meningococcal) gains `disseminated-intravascular-coagulation` as its parent. An outcome may have a disease parent, so *meningococcal sepsis ~ APL ~ obstetric DIC*.
- `chronic-haemolysis` (a stand-in cause in `gallstone-disease`) is replaced by the three real diseases: hereditary spherocytosis, sickle cell disease and thalassaemia start the pigment-stone chain. See **Q3**.
- `amyloidosis` (a stand-in cause in `restrictive-cardiomyopathy`). See **Q4**.

**Second systems**
- immune-thrombocytopenia, autoimmune-haemolytic-anaemia, pernicious-anaemia: `[haematology, immunology]` (the syllabus lists them under organ-specific autoimmune disease too)
- systemic-mastocytosis: `[haematology, immunology]` (anaphylaxis, raised tryptase)
- antiphospholipid-syndrome: `[haematology, immunology]`
- haemolytic-uraemic-syndrome: `[haematology, kidney-urogenital]`? Only if you agree (Q6). Same question for myeloma.

---

## 2. Cause parents

**Genetic**
- **`red-cell-gene-defect`** → **spectrin-ankyrin-mutation** (HS), **g6pd-gene-mutation**, **pk-gene-mutation**, **hbb-sickle-mutation**, **alpha-globin-deletion**, **beta-globin-mutation**, **alas2-mutation** (X-linked sideroblastic) — *the inherited red-cell disorders side by side*
- **`coagulation-gene-defect`** → **f8-mutation**, **f9-mutation**, **vwf-mutation**, and `heritable-thrombophilia` gains it as a parent — *bleeding and clotting tendencies as siblings*
- `oncogenic-driver` reused (the parent of lung's `egfr-mutation` and `alk-rearrangement`), gaining **jak2-calr-mpl-mutation** (PV, ET, PMF), **bcr-abl-fusion** (CML, Ph+ ALL), **pml-rara-fusion** (APL), **myc-translocation** (Burkitt), **bcl2-translocation** (follicular) and **kit-d816v-mutation** (mastocytosis) — *CML ~ EGFR lung cancer: a single targetable driver*. These feed the existing mechanism `driver-mutation-transformation` where the source supports it.

**Infections and exposures**
- `ebv-infection` reused for Burkitt and Hodgkin — *MS ~ Burkitt ~ Hodgkin*
- `helicobacter-pylori` reused (MALT, already there)
- `parvovirus-b19` reused for aplastic crisis in sickle/HS — *parvovirus myocarditis ~ aplastic crisis*
- `hepatitis-c-virus` reused if the pages link it to B-cell lymphoma
- `ehec` reused as the cause of HUS (already in gastroenteritis) — *E. coli O157 → HUS file*
- **oxidant-trigger** (fava beans, primaquine, dapsone, infection) for G6PD
- **heparin-exposure** (HIT); `anticoagulant-therapy` reused for warfarin-related bleeding
- **prior-chemotherapy-radiation** (MDS, AML, ALL): new; nothing similar exists
- ACD needs no stand-in cause: existing files (`crohns-disease`, `ulcerative-colitis`, `tuberculosis`, the cancers) and immunology's `rheumatoid-arthritis` start its chain directly — *ACD ~ every chronic inflammatory file*.
- `excess-alcohol` reused (folate, sideroblastic)
- `coeliac-disease`, `crohns-disease` reused as chain starts for iron and folate deficiency — *IDA/folate ~ GI*
- **dietary-deficiency** (iron, folate): one risk factor
- `pregnancy-or-oestrogen` reused (VTE). Folate demand, HDFN and obstetric DIC need a plain **pregnancy** cause, because the existing node sits under `vte-provoking-factor`.
- **rhd-sensitisation** (HDFN), **abo-incompatible-transfusion**
- **age-clonal-haematopoiesis**: see mechanisms
- `vte-provoking-factor` and its children (`immobility-or-surgery`, `active-cancer`, `pregnancy-or-oestrogen`), plus `heritable-thrombophilia`, reused for DVT — *DVT ~ PE ~ lung adenocarcinoma*
- `dysregulated-host-response` (as the chain step), `severe-trauma-transfusion` and **pregnancy** for DIC — *DIC ~ every septic file*
- **newborn-vitamin-k-deficit** (no prophylaxis, breast-fed): vitamin K deficiency bleeding

---

## 3. Mechanism parents

**Making red cells**
- **`reduced-red-cell-production`** — *the hypoproliferative anaemias side by side*:
  - **iron-restricted-erythropoiesis** (IDA)
  - **hepcidin-iron-sequestration** (ACD; a sibling of iron-restricted erythropoiesis, so IDA and ACD are related but distinct)
  - **defective-haem-synthesis** (sideroblastic: ring sideroblasts)
  - **impaired-dna-synthesis** (B12/folate: megaloblastic)
  - **globin-chain-imbalance** (thalassaemia: ineffective erythropoiesis)
  - **haematopoietic-stem-cell-failure** (aplastic)
  - **marrow-infiltration** (leukaemia, myeloma, myelofibrosis, metastases) — *every marrow malignancy shares the route to pancytopenia*
- `gastric-atrophy` reused for pernicious anaemia — *gastritis → PA*
- `iron-overload` reused (transfusion, thalassaemia) — *thalassaemia ~ haemochromatosis*

**Destroying red cells**
- **`red-cell-destruction`** (haemolysis):
  - **extravascular-haemolysis** (spleen: HS, warm AIHA, sickle)
  - **intravascular-haemolysis** (G6PD, ABO mismatch, cold AIHA)
  - **microangiopathic-haemolysis** (TTP, HUS, DIC, prosthetic valves) — *TTP ~ HUS ~ DIC ~ valve haemolysis*
- **haemoglobin-s-polymerisation** → **vaso-occlusion**
- **red-cell-membrane-defect**, **oxidative-red-cell-damage** (G6PD: Heinz bodies)

**Clonal and malignant**
- `malignant-transformation` reused, gaining:
  - **clonal-haematopoiesis** (age-related; the pre-leukaemic step)
  - **myeloid-clonal-expansion** (MDS, AML)
  - **myeloproliferative-signalling** (JAK–STAT or BCR-ABL: excess mature cells)
  - **lymphoid-clonal-expansion** (ALL, CLL, lymphomas)
  - **plasma-cell-clonal-expansion** (MGUS, myeloma, Waldenström, AL)
  - `clonal-b-cell-proliferation` (MALT, in gastritis and MALT lymphoma) gains `lymphoid-clonal-expansion` as its parent — *MALT ~ CLL ~ follicular*. It has no parent today, so this is allowed (§5.3.4).
  - `viral-oncogenesis` reused for EBV
- **paraprotein-production** → **light-chain-deposition** (AL amyloid, myeloma kidney), **hyperviscosity** (Waldenström, also PV)
- **osteoclast-activation** (myeloma lytic lesions) — *myeloma ~ bone metastases*

**Haemostasis**
- `thrombosis`, `venous-thrombosis`, `hypercoagulability` reused
  - APS, PV/ET and HIT feed `hypercoagulability` — *APS ~ lung adenocarcinoma ~ PE*
- **`impaired-haemostasis`**:
  - **platelet-destruction** (ITP, HIT)
  - **platelet-consumption** (TTP, DIC)
  - **platelet-dysfunction** (aspirin, uraemia, vWD's adhesion defect)
  - **coagulation-factor-deficiency** (haemophilia, vWD, vitamin K, liver)
- **adamts13-deficiency** → **vwf-multimer-platelet-microthrombi** (TTP)
- **consumptive-coagulopathy** (DIC)
- **shiga-toxin-endothelial-injury** (HUS)
- **platelet-factor-4-antibody** (HIT: an antibody that activates platelets, so it both drops the count and causes thrombosis)

**Immune** (shared with immunology; see `concepts-immuno.md` §3)
- `immune-mediated-injury` gains **antibody-mediated-cytotoxicity** (type II). AIHA, ITP, HDFN, ABO reactions and HIT all route through it — *the type II diseases side by side*.

**Spleen**
- **splenic-sequestration** (HS, sickle, myelofibrosis, portal hypertension) and **functional-asplenia** (sickle autoinfarction) — the latter links to immunology's encapsulated-organism infection.

---

## 4. Finding parents

- `anaemia` (lab, used by nine files) reused, gaining:
  - **microcytic-hypochromic-anaemia** (IDA, thalassaemia, sideroblastic, some ACD)
  - **normocytic-anaemia**
  - **macrocytic-anaemia** (`b12-folate-deficiency` stays its own child; it's the deficiency test, not the red-cell size)
  - `haemolytic-anaemia` already a child
- **`iron-studies-abnormality`** (lab) → **low-ferritin** (IDA), **acd-iron-pattern** (low iron and TIBC, normal or high ferritin); `raised-iron-indices` (haemochromatosis) gains it as its parent — *IDA ~ ACD ~ haemochromatosis on one iron panel*
- **`haemolysis-markers`** (lab: raised LDH, unconjugated bilirubin and reticulocytes; low haptoglobin) — or reuse `haemolytic-anaemia`? See Q2.
- **positive-direct-antiglobulin-test** (AIHA, HDFN, haemolytic transfusion reaction)
- **`blood-film-abnormality`** (lab) — *the film is where haematology meets*:
  - **spherocytes** (HS, warm AIHA)
  - **bite-cells-heinz-bodies** (G6PD)
  - **schistocytes** (TTP, HUS, DIC, MAHA)
  - **sickle-cells**, **target-cells**, **howell-jolly-bodies** (hyposplenism)
  - **hypersegmented-neutrophils** (megaloblastic)
  - **ring-sideroblasts** (marrow)
  - **blasts-auer-rods** (AML), **smear-cells** (CLL), **teardrop-cells** (myelofibrosis), **rouleaux** (myeloma)
- **`cytopenia`** (lab) → **thrombocytopenia**, **neutropenia**, **pancytopenia**; and **`raised-cell-count`** → **raised-haemoglobin-haematocrit**, **thrombocytosis**, **leucocytosis-left-shift**, **lymphocytosis**
- **`haematological-genetic-test`** (lab) → **jak2-calr-mpl-detected**, **bcr-abl-detected**, **pml-rara-detected**, **myc-bcl2-translocation-detected**, **abnormal-haemoglobin-on-hplc** (HbS; raised HbA2/HbF)
- **`clotting-test-abnormality`** (lab) → **prolonged-pt**, **prolonged-aptt**, **low-fibrinogen-raised-d-dimer** (no D-dimer node exists yet, so DVT gets **raised-d-dimer** as a sibling)
- **serum-paraprotein**, **bence-jones-proteinuria**, `hypercalcaemia` reused — *myeloma ~ sarcoidosis ~ squamous cell lung cancer*
- **lytic-bone-lesions** (imaging)
- **reed-sternberg-cells**, **lymph-node-biopsy** findings: category issue, see **Q7**
- **Symptoms and signs:**
  - `fatigue`, `splenomegaly`, `jaundice`, `fever`, `night-sweats`, `weight-loss` reused — *B symptoms in lymphoma ~ TB*
  - **pallor**, **glossitis-angular-stomatitis**, **koilonychia**
  - **`lymphadenopathy`** → `cervical-lymphadenopathy` (sarcoid, lung) gains it as its parent, plus **generalised-lymphadenopathy**
  - **`bleeding-tendency`** → **mucocutaneous-bleeding** (platelets, vWD: epistaxis, menorrhagia, bruising), **haemarthrosis-muscle-bleeding** (haemophilia); `non-blanching-rash` reused for petechiae — *ITP ~ meningococcal rash*
  - **bone-pain**; `pruritus` reused for PV's itch after bathing, **erythromelalgia** (ET), **acrocyanosis** (cold AIHA), **subacute-combined-degeneration** (B12: peripheral neuropathy and dorsal columns)
  - **neonatal-jaundice-hydrops** (HDFN)

---

## 5. Outcome parents

- **`sickle-crisis`** → **vaso-occlusive-crisis**, **acute-chest-syndrome**, **splenic-sequestration-crisis**, **aplastic-crisis**
- From sickle cell disease: `ischaemic-stroke`, `pulmonary-hypertension` and `gallstone-disease` (all files) — *sickle ~ the stroke group ~ the pulmonary vascular group*
- `iron-overload` → `heart-failure`, `cirrhosis` reused for transfusion-dependent thalassaemia — *thalassaemia ~ haemochromatosis*
- `acute-myeloid-leukaemia` (the file) as an outcome of MDS, PV, ET, PMF and CML — *the whole myeloid group converges on AML*
- `diffuse-large-b-cell-lymphoma` (the file) as an outcome of CLL and follicular lymphoma (Richter/high-grade transformation)
- **tumour-lysis-syndrome** → `acute-kidney-injury` (Burkitt, ALL, AML)
- **neutropenic-infection** (outcome) — or reuse immunology's **neutropenic-sepsis** file (see `concepts-immuno.md` Q6) — *every marrow failure ~ chemotherapy*
- `septic-shock`, `bacteraemia` reused
- `pulmonary-embolism` (file) from DVT, APS and PV — and APS/ET/PV → `ischaemic-stroke`, `acute-coronary-syndrome` — *the arterial and venous clotting groups meet here*
- `budd-chiari-syndrome` and `portal-vein-thrombosis` are **causes** in the GI files. PV and APS chains can still end on them, because a chain link may point at a cause node.
- `acute-kidney-injury` (myeloma cast nephropathy, HUS), `chronic-kidney-disease`, `nephrotic-syndrome` (AL amyloid; a cause node today, so as above)
- `restrictive-cardiomyopathy` (file) from AL amyloid — *amyloid ~ restrictive CM*
- `hypercalcaemia-of-malignancy` reused for myeloma
- **haemophilic-arthropathy**, **intracranial-haemorrhage**: `intracerebral-haemorrhage` (file) from haemophilia, ITP and vitamin K deficiency, only where a page says so
- **kernicterus** (HDFN)
- Transfusion complications: **acute-haemolytic-transfusion-reaction**, **febrile-non-haemolytic-reaction**, **allergic-transfusion-reaction** with `anaphylaxis` (immunology file), **transfusion-related-acute-lung-injury** (→ `ards` file if K&C says so), **transfusion-associated-circulatory-overload** (→ `pulmonary-oedema` file), `iron-overload`, and infection: `hepatitis-b`, `hepatitis-c`, `prion-disease` (vCJD), `bacteraemia` — *blood products ~ viral hepatitis ~ prion disease*
- From pernicious anaemia: `gastric-adenocarcinoma` (file) — *PA ~ gastritis ~ gastric cancer*, if the page supports it

---

## Decisions (2026-11-08)

1. **Iron deficiency anaemia:** a disease file with the same id. The finding node goes; the six GI files list it as an outcome.
2. Organ-specific autoimmune split as recommended in `concepts-immuno.md` Q1 (ITP, AIHA, PA here, with immunology second).
3. **`chronic-haemolysis`** becomes an **umbrella file** (same id) over the chronic haemolytic diseases, rather than being replaced. Gallstones keep their single `chronic-haemolysis` start; the umbrella's page shows the specific diseases. Its children cross the haemolysis and globin groups, which the owner accepted.
4. DVT gets its own file, with PE as its outcome (Q5).
5. **`histology`** becomes a finding category with its own Differential tab (Q7).
6. Batch order as proposed; haematology before immunology.
7. Not answered yet, so the recommendation stands until told otherwise: Q2 (reuse `haemolytic-anaemia`), Q4 (AL file plus keep `amyloidosis`), Q6 (no kidney second system yet), Q8 (two umbrellas only).

## Progress

- **Batches 1–2 drafted** (2026-11-08, all `status: draft`, 0 loose items):
  - **Anaemia (6):** iron deficiency, anaemia of chronic disease, sideroblastic, pernicious (`[haematology, immunology]`), folate deficiency, aplastic.
  - **Haemolysis and globin (10):** the `chronic-haemolysis` umbrella over hereditary spherocytosis, pyruvate kinase deficiency, sickle cell disease and the `thalassaemia` umbrella (alpha, beta); G6PD deficiency; AIHA (`[haematology, immunology]`); haemolytic disease of the fetus and newborn.
- **Shared hubs:** every anaemia feeds `anaemic-hypoxia` (low Hb: reduced O2 delivery), which carries fatigue, breathlessness, palpitations, pallor, flow murmur and heart failure. The production defects are siblings under `reduced-red-cell-production`; the haemolyses under `red-cell-destruction`; the type II antibody mechanisms under the new `antibody-mediated-cytotoxicity`.
- **Declared cause groups (§6.5a):**
  - IDA: `chronic-gi-blood-loss` (colorectal cancer, gastric cancer, GORD, UC, hookworm): each bleeds into the gut.
  - ACD: `chronic-inflammatory-disease` (Crohn's, UC, TB, hepatitis B and C, HIV, cancer): each drives IL-6 and hepcidin.
  - Not grouped on purpose: renal anaemia (erythropoietin), the aplastic causes (toxic vs immune), the folate causes (intake vs use vs drugs).
- **Changes to existing files:**
  - `iron-deficiency-anaemia` was a lab finding; now a file. In colorectal cancer, coeliac, Crohn's, GORD, gastric cancer and UC it moved from `findings:` to `outcomes:` (notes kept).
  - `chronic-haemolysis` was a stand-in cause; now the umbrella file (same id), so gallstones' chain is unchanged.
  - Gastritis gains pernicious anaemia as an outcome (K&C p.334).
  - Folate deficiency starts a chain from chronic haemolysis (excess use).
  - `raised-iron-indices` (haemochromatosis) now sits under `iron-studies-abnormality`, beside low ferritin and the ACD pattern.
  - Liver biopsy findings moved from `endoscopy` to the new `histology` category; the Differential page has a "Histology and marrow" tab.
- **Changed from the sketch:**
  - No separate `haemolysis-markers` node: `haemolytic-anaemia` is reused (Q2).
  - B12 neuropathy is `b12-neural-damage` under the nervous `demyelination` parent, so pernicious anaemia, MS and GBS are related.
  - G6PD's triggers are one cause node (`oxidant-trigger`), not a group.
  - Primary acquired sideroblastic anaemia is a myelodysplastic syndrome: link it when MDS is drafted (batch 5). AIHA's CLL/lymphoma causes likewise wait for batch 6.
  - AIHA's warm/cold split in the K&C conversion is garbled, so no percentage is given.
  - Neutropenic sepsis and overwhelming post-splenectomy infection are outcome nodes for now; they become immunology files later, with their links kept.
- **Thinnest:** pyruvate kinase deficiency (a short K&C paragraph).
- **Batches 3–4 drafted** (2026-11-08, all `status: draft`):
  - **Platelets and TMA (5):** immune thrombocytopenia (`[haematology, immunology]`), TTP, haemolytic uraemic syndrome, heparin-induced thrombocytopenia, DIC.
  - **Bleeding disorders (3):** haemophilia (A and B in one file, `only:` for factor VIII vs IX), von Willebrand disease, vitamin K deficiency bleeding.
  - **Thrombosis (2):** deep vein thrombosis, antiphospholipid syndrome (`[haematology, immunology]`).
  - **Transfusion (1):** transfusion complications (one file, like `prosthetic-valve-complications`).
- **Shared hubs (batches 3–4):**
  - `impaired-haemostasis` now has six kinds: reduced production (aplastic), destruction (ITP), consumption (TTP, HUS), adhesion defect (vWD), factor deficiency (haemophilia, vWD, vitamin K) and consumptive coagulopathy (DIC), plus dilutional coagulopathy (massive transfusion).
  - `microvascular-thrombosis` (under `thrombosis`) joins TTP, HUS and DIC; `microangiopathic-haemolysis` sits under `red-cell-destruction`, beside the other haemolyses.
  - `hypercoagulability` gains HIT, APS and DIC's `systemic-coagulation-activation`, so *HIT ~ APS ~ DVT ~ PE ~ cancer*.
  - `antibody-mediated-cytotoxicity` now holds ITP, HIT and the three transfusion antibody routes beside AIHA and HDFN.
  - `isolated-prolonged-aptt` links haemophilia, vWD and APS (lupus anticoagulant).
- **Changes to existing files and nodes:**
  - `haemolytic-uraemic-syndrome` was an outcome under `acute-kidney-injury`; now a file (same id), so it lost that parent. Bacterial gastroenteritis still lists it (EHEC only).
  - `purpura-fulminans-dic` (meningococcal) gains `disseminated-intravascular-coagulation` as its parent.
  - `heritable-thrombophilia` (PE) gains the new `coagulation-gene-defect` parent, beside the factor VIII, IX, VWF and ADAMTS13 genes.
- **Changed from the sketch:**
  - No `platelet-dysfunction` node: vWD uses `platelet-adhesion-defect`. Acquired platelet dysfunction (aspirin, uraemia) has no file to sit in yet.
  - HIT's antibody is under `antibody-mediated-cytotoxicity` (Mehlman calls it type II) and feeds `hypercoagulability`; no separate `platelet-factor-4-antibody` mechanism name.
  - DIC causes are not a declared group: sepsis acts through cytokines, cancer and obstetric emergencies through tissue factor (§6.5a).
  - `anaphylaxis` is an outcome node for now; it becomes the immunology file later (§5.5).
  - TRALI is its own outcome, not linked to `ards`: K&C doesn't call it ARDS.
  - Haemophilia's viral legacy (HIV, HCV) left out; the transfusion file carries blood-borne hepatitis and vCJD.
- **Intentional loose items (2):**
  - `haemophilia` → `factor-viii-inhibitor`: caused by treatment (factor VIII concentrate), and the model has no treatment cause node. Would need one.
  - `thrombotic-thrombocytopenic-purpura` → `fever`: part of the classic pentad, but K&C and Mehlman give no mechanism for it.
- **Thinnest:** vitamin K deficiency bleeding and HIT (one K&C paragraph each).
- **Deferred:** APL → DIC (batch 5); CLL → ITP and AIHA (batch 6); aplastic anaemia → PNH, MDS and AML (batch 5).
- **Batches 5–6 drafted** (2026-11-08, all `status: draft`, 0 loose items):
  - **AML and MDS (2):** myelodysplastic syndrome, acute myeloid leukaemia (APL inside it, `only: pml-rara-fusion` for DIC).
  - **Myeloproliferative (6):** the `myeloproliferative-neoplasm` umbrella over polycythaemia vera, essential thrombocythaemia, myelofibrosis and CML; systemic mastocytosis (`[haematology, immunology]`, no umbrella parent).
  - **High-grade lymphoma (4):** ALL, Hodgkin lymphoma, DLBCL, Burkitt lymphoma.
  - **Low-grade lymphoproliferative (3):** CLL, follicular lymphoma, Waldenström macroglobulinaemia.
- **Shared hubs (batches 5–6):**
  - Under `malignant-transformation`: `myeloid-clonal-expansion` (MDS, AML), `myeloproliferative-signalling` (the MPNs), `lymphoid-clonal-expansion` (ALL, the lymphomas, CLL; MALT's `clonal-b-cell-proliferation` now sits under it) and `mast-cell-expansion`.
  - `marrow-infiltration` and `dysplastic-haemopoiesis` sit under `reduced-red-cell-production`, beside aplastic, megaloblastic and sideroblastic routes; all marrow failures share `anaemic-hypoxia`, `neutrophil-deficit` → neutropenic sepsis and `reduced-platelet-production`.
  - New genetic drivers under `oncogenic-driver` (beside EGFR and ALK): JAK2/CALR/MPL, BCR-ABL, PML-RARA, MYC, BCL2; `kit-mutation` (GIST) gained the same parent and also drives mastocytosis — *GIST ~ mastocytosis ~ EGFR lung cancer*.
  - `extramedullary-haemopoiesis` links myelofibrosis to thalassaemia; `hyperviscosity` links PV and Waldenström, with `leucostasis` (AML, CML) as its child.
  - Convergence on AML: MDS, PV, ET, myelofibrosis and CML all list it as an outcome. CLL and follicular lymphoma both transform to DLBCL.
- **Changes to existing files and nodes:**
  - `kit-mutation`, `clonal-b-cell-proliferation`, `secondary-polycythaemia` (under the new `raised-cell-count`) and `cervical-lymphadenopathy` (under the new `lymphadenopathy`) each gained a parent. No disease file was edited.
  - CLL now leads to AIHA and ITP (the deferred link from batch 2–3).
- **Changed from the sketch:**
  - The myelofibrosis file is `myelofibrosis`, not `primary-myelofibrosis`: K&C treats primary and post-PV/ET together, and PV and ET chain into it.
  - No `clonal-haematopoiesis` mechanism: K&C mentions CHIP only in passing, so it is a note on `older-age`.
  - No `jak2`-specific `driver-mutation-transformation` step: the drivers feed the new expansion mechanisms directly.
  - Tumour lysis syndrome is an outcome node leading to `acute-kidney-injury`; K&C's own page on it is in ch.6, which has no offset, so it is cited from Box 17.5.
  - New K&C offset: ch.22 Dermatology −22 (three headings agree), for mastocytosis.
- **Thinnest:** systemic mastocytosis (one K&C paragraph on cutaneous disease, nothing in Mehlman: no tryptase, no D816V), Waldenström (K&C only).
- **Deferred:** aplastic anaemia → PNH/MDS/AML (not on pages read); Waldenström ← IgM MGUS (batch 7).
- **Batch 7 drafted** (2026-11-09, all `status: draft`, 0 loose items):
  - **Plasma cell (3):** MGUS, multiple myeloma, AL amyloidosis.
- **Shared hubs (batch 7):**
  - `plasma-cell-clonal-expansion` joins the other kinds of `malignant-transformation`; `paraprotein-production` is shared by all three files.
  - `amyloid-fibril-deposition` sits under the nervous `protein-misfolding-aggregation`, so *AL amyloid ~ Alzheimer's ~ Parkinson's ~ prion disease*.
  - Myeloma reuses `marrow-infiltration`, `antibody-deficiency` → `recurrent-infection` (*myeloma ~ CLL*), `hyperviscosity` (*myeloma ~ Waldenström ~ PV*), and `hypercalcaemia` / `hypercalcaemia-of-malignancy` (*myeloma ~ squamous cell lung cancer ~ sarcoidosis*).
  - AL amyloidosis → `myocardial-infiltration` → `restrictive-cardiomyopathy`.
- **Changes to existing files:**
  - `restrictive-cardiomyopathy` now starts a chain from `al-amyloidosis` as well. The `amyloidosis` stand-in stays for ATTR and AA (Q4).
  - Waldenström is now an outcome of MGUS (IgM MGUS), the link deferred from batch 6. The Waldenström file itself is unchanged.
- **Changed from the sketch:**
  - There is no single `light-chain-deposition` mechanism. Myeloma kidney is `light-chain-cast-nephropathy`, and AL is `amyloid-fibril-deposition`.
  - Smouldering myeloma is a note on myeloma's first edge.
  - MGUS's chain starts at `plasma-cell-clonal-expansion` with no cause, because K&C gives none (the MND pattern).
  - `hypercalcaemia-of-malignancy` is reused even though its parent is `paraneoplastic-syndrome`. In myeloma the cause is bone lysis, not a hormone, so this may need revisiting.
  - New outcomes `pathological-fracture` and `spinal-cord-compression`, which bone metastases can reuse later.
  - No kidney second system for myeloma (Q6).
- **Thinnest:** MGUS (one K&C paragraph).
- **§5 fully drafted: 45 diseases with haematology as their home system.** Still deferred: aplastic anaemia → PNH/MDS/AML (not on the pages read).

## Questions before drafting

1. **Iron deficiency anaemia: finding or file?** `iron-deficiency-anaemia` is a lab **finding** in six GI files. The syllabus wants it as a disease.
   - Recommended: **make it a file with the same id.** Delete the finding node, and in the six GI files move the entry from `findings:` to `outcomes:`. Their chain links into it keep working, because a chain may end on a disease. This reads honestly: chronic GI blood loss *causes* IDA. The file's own findings become `microcytic-hypochromic-anaemia` and `low-ferritin`.
   - The other way: keep the finding, and name the file something else (e.g. `iron-deficiency`). Nothing in GI changes, but there would be two nodes for one idea.
   - The same question applies to `b12-folate-deficiency` (a finding in four GI files). Recommended: **leave it as a finding** (it's the blood test), and have the pernicious-anaemia and folate-deficiency files list it.
2. **Haemolysis markers.** Use the existing finding `haemolytic-anaemia` (CAP's Mycoplasma, Wilson's) as the shared "LDH up, haptoglobin down, reticulocytes up" finding, so *Mycoplasma ~ HS ~ AIHA ~ TTP* match directly? Recommended: yes, reuse it, and don't add a separate `haemolysis-markers` node. There is no `anaemia` or `haemolytic-anaemia` **umbrella file**, because those ids are findings.
3. **`chronic-haemolysis` in gallstones.** Recommended: replace the stand-in cause with chains from hereditary-spherocytosis, sickle-cell-disease and beta-thalassaemia into the existing pigment-stone step, then delete the stand-in. The other way: keep it, and give the three files `gallstone-disease` as an outcome only.
4. **`amyloidosis` in restrictive cardiomyopathy.** The stand-in covers AL and the other types (ATTR, AA). Recommended: start that chain from the new `al-amyloidosis` file and **keep** the stand-in for the non-AL types, renaming nothing. The other way: replace it entirely, which would lose ATTR.
5. **DVT: a file?** VTE sits in syllabus §5. Today `pulmonary-embolism` (cardio home) holds the whole VTE chain through the mechanism `venous-thrombosis`.
   - Recommended: a **deep-vein-thrombosis** file (haematology home), with `pulmonary-embolism` as its outcome. PE keeps its own chain unchanged.
   - The other way: no DVT file. VTE stays in PE, and the thrombosis group holds only APS.
6. **Kidney as a second system** for HUS and myeloma? The kidney section (§12) isn't started. Recommended: no for now; revisit when §12 is planned.
7. **Biopsy and marrow findings** (Reed–Sternberg cells, ring sideroblasts, marrow blasts, amyloid apple-green birefringence). GI used category `endoscopy` for liver biopsy findings. Recommended: add a **`histology`** category with its own Differential tab (a small app change, like `endoscopy` was), and later move the GI biopsy findings into it. The other way: keep using `lab` for marrow and `endoscopy` for tissue, with no app change.
8. **Umbrellas.** Recommended: only `thalassaemia` and `myeloproliferative-neoplasm`. No lymphoma or leukaemia umbrella, because the syllabus splits lymphomas across two groups and an umbrella's children should share a group. The `lymphoid-clonal-expansion` and `myeloid-clonal-expansion` mechanisms make them related anyway.
9. **Batch order (proposed)**, two batches at a time:
   1. anaemia (6)
   2. haemolysis and globin (8, plus the thalassaemia umbrella)
   3. platelets and TMA, and bleeding disorders (8)
   4. thrombosis and transfusion (3)
   5. AML/MDS and myeloproliferative (7, plus the MPN umbrella)
   6. lymphomas (7)
   7. plasma cell (3)

   Anaemia first because it settles Q1 and the red-cell vocabulary everything else uses.

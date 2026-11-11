# Step I1 — Immunology and immunocompromise parent concepts (draft for review, 2026-11-08)

Same rules and legend as `concepts-nervous.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [immunology]` unless noted.

Sources:
- K&C ch.3 Immunity (printed page = PDF marker − 15; checked on three headings): immunodeficiency p.59–62, allergy and anaphylaxis p.62–64, autoimmunity p.64–66
- K&C ch.18 Rheumatology (−24; checked on two headings): RA p.437, SLE p.457, APS p.459, systemic sclerosis p.460, Sjögren's p.463, vasculitis p.464–466
- Mehlman HY Immuno, HY Anatomy-MSK-Rheum
- No LMC immunology handouts in `Resources/` yet.

Haematology (§5) is planned alongside in `concepts-haem.md`. ITP, AIHA, pernicious anaemia, systemic mastocytosis and antiphospholipid syndrome are **haematology-home** files with immunology as their second system.

---

## 1. Disease list (syllabus §6): what becomes a file

The syllabus's organ-specific list says "see organ-specific teaching", and most of those diseases are taught again in a later section. That decides where each one lives (**Q1**).

| Group | Diseases (immunology home) | Umbrella |
|---|---|---|
| hypersensitivity | anaphylaxis, allergic-rhinitis | — |
| organ-specific-autoimmune | myasthenia-gravis | — |
| vasculitis | giant-cell-arteritis, takayasu-arteritis, polyarteritis-nodosa, kawasaki-disease, granulomatosis-with-polyangiitis, eosinophilic-granulomatosis-with-polyangiitis, microscopic-polyangiitis, iga-vasculitis | vasculitis → all eight |
| systemic-autoimmune | systemic-lupus-erythematosus, sjogrens-syndrome, systemic-sclerosis, rheumatoid-arthritis | — |
| immunodeficiency | x-linked-agammaglobulinaemia, common-variable-immunodeficiency, severe-combined-immunodeficiency, digeorge-syndrome, hyper-igm-syndrome, chronic-granulomatous-disease, leucocyte-adhesion-deficiency, hereditary-angioedema, complement-deficiency | — |
| immunocompromised-infection | neutropenic-sepsis, overwhelming-post-splenectomy-infection, pneumocystis-pneumonia | — (see Q6) |

About 28 files, including the vasculitis umbrella.

**Organ-specific diseases that live elsewhere**
- **Already files, gaining nothing:** `autoimmune-hepatitis`, `primary-biliary-cholangitis` (both already `[gastrointestinal, immunology]`)
- **Haematology home** (`concepts-haem.md`): immune-thrombocytopenia, autoimmune-haemolytic-anaemia, pernicious-anaemia
- **Deferred to their own section**, each to get immunology as its second system then:
  - Graves' disease, Hashimoto's thyroiditis, type 1 diabetes, Addison's disease → §11 endocrine
  - anti-GBM disease → §12 kidney (the syllabus's glomerular teaching)
  - pemphigus vulgaris, bullous pemphigoid → §15 skin
- **Allergic asthma** is the existing `asthma` file. **Allergic contact dermatitis** waits for §15 skin. See Q2.

**Not files**
- **Hypersensitivity types I–IV:** mechanism nodes (§3), the backbone of the system.
- **Systemic mastocytosis:** a haematology file; here it's a cause of anaphylaxis and the source of a raised baseline tryptase.
- **Mixed connective tissue disease:** a note in the SLE file (anti-U1 RNP; overlap features), unless K&C gives it enough for a file. See Q4.
- **Polymyalgia rheumatica:** a note and finding in giant cell arteritis (K&C covers it beside GCA; the syllabus doesn't list it).
- **Complement deficiency:** one file, with classical, alternative and terminal (MAC) defects as causes and `only:` where they differ (classical → SLE-like disease; terminal → recurrent Neisseria). C1-inhibitor deficiency is its own file, hereditary-angioedema, because its features are different.
- **Secondary immunodeficiency** (prematurity, antibody loss, splenectomy, malignancy, ageing, malnutrition, drugs): **causes**, not files. See §2.
- **Transplant infections and prophylaxis; vaccination in the immunocompromised:** notes.

**Existing nodes that change**
- `autoimmune-rheumatic-disease` (a stand-in cause in `nsip`: "RA, SLE, systemic sclerosis") is replaced by the three files starting NSIP's chain, then deleted.
- `lambert-eaton-syndrome` (a paraneoplastic outcome of small-cell lung cancer) stays as it is. See Q5.
- `immunosuppression` (cause, used by seven files) gains children for the secondary immunodeficiencies (§2). The seven files keep pointing at the parent.

**Second systems**
- rheumatoid-arthritis: `[immunology, bone-joint]` (the syllabus teaches RA again in §14)
- systemic-lupus-erythematosus and the ANCA vasculitides: `[immunology, kidney-urogenital]`? Recommended: wait for §12 (as for haematology's Q6).
- myasthenia-gravis: `[immunology, nervous]`
- pneumocystis-pneumonia: see Q6
- `asthma`: gains `immunology`? See Q2.

---

## 2. Cause parents

**Genetic**
- `hla-dq2-dq8` (coeliac) reused for the HLA pattern. New siblings under a new parent **`hla-susceptibility`**: **hla-dr4** (RA), **hla-dr3** (SLE, also T1DM/Graves later), and `hla-dq2-dq8` gains it as its parent — *RA ~ SLE ~ coeliac by HLA*
- **`primary-immunodeficiency-gene`** → **btk-mutation** (XLA), **cd40l-mutation** (hyper-IgM), **scid-gene-defect** (γc / ADA), **del-22q11** (DiGeorge), **nadph-oxidase-defect** (CGD), **cd18-integrin-defect** (LAD), **serping1-mutation** (C1-INH), **complement-component-defect** — *the inherited immunodeficiencies side by side*
- No cause node for CVID: most cases have no single gene, so its chain starts at its mechanism, as MND's did.
- `autoimmune-predisposition` reused (family history of autoimmunity)

**Exposures and triggers**
- **allergen-exposure** (food, venom, drugs, latex) and `inhaled-allergen` (asthma) reused — new **`allergen`** parent? See Q3.
- `atopy` reused (asthma's first cause) for allergic rhinitis and anaphylaxis — *rhinitis ~ asthma*
- `smoking` reused (RA: smoking and citrullination) — *RA ~ the atherosclerotic group ~ MS*
- `hepatitis-b-virus` reused for PAN — *HBV ~ PAN*
- **preceding-infection** (IgA vasculitis after URTI, Kawasaki trigger unknown): only where a page says so; `streptococcus-pyogenes` reused if K&C names it
- **uv-light**, **drug-induced-lupus** (hydralazine, procainamide, isoniazid): added only if the pages I read name them
- **Secondary immunodeficiency**, all under `immunosuppression`:
  - **asplenia-hyposplenism** (splenectomy; sickle cell's functional asplenia also routes here) — *sickle cell ~ OPSI*
  - **iatrogenic-immunosuppression** (steroids, chemotherapy, transplant drugs, biologics)
  - **haematological-malignancy-immune-defect** (CLL, myeloma: hypogammaglobulinaemia) — or chain directly from the haem files; see Q7
  - **protein-losing-state** (nephrotic, protein-losing enteropathy)
  - `hiv` (cause, cryptococcal meningitis) gains `immunosuppression` as its parent? Recommended, so HIV joins the other immune-suppressing states. It's a `condition` and `immunosuppression` is a `risk-factor`, but both are causes, which is all the parent rule asks.
  - **prematurity**, **malnutrition**, **ageing**: only those the pages give

---

## 3. Mechanism parents

**Hypersensitivity: the system's backbone**
- `immune-mediated-injury` (used across cardio, GI and nervous) reused, gaining the four Gell–Coombs types:
  - **ige-mast-cell-degranulation** (type I: anaphylaxis, rhinitis, allergic asthma; mastocytosis feeds it directly) — *anaphylaxis ~ asthma ~ ABPA ~ transfusion allergy*
  - **antibody-mediated-cytotoxicity** (type II: AIHA, ITP, HDFN, ABO reactions, anti-GBM)
    - **receptor-autoantibody** (a type II variant: myasthenia's blocking anti-AChR; Graves' later, stimulating TSH receptor) — a child, so MG and Graves are siblings
  - `immune-complex-deposition` (type III: SLE, PAN, IgA vasculitis; already used by HBV, HCV, IE and hypersensitivity pneumonitis) — *SLE ~ IE ~ HBV ~ HP*
  - **t-cell-mediated-injury** (type IV: contact dermatitis, RA synovitis, GCA, MS)
- Existing T-cell children of `immune-mediated-injury` (`gluten-driven-t-cell-injury`, `autoimmune-hepatocyte-injury`, …) stay where they are. See Q8.
- `molecular-mimicry` reused (rheumatic fever, GBS already)

**Autoimmune tissue damage**
- **synovial-pannus** (RA: synovitis eroding cartilage and bone)
- **microvascular-injury-fibrosis** (systemic sclerosis) — sits beside the existing fibrosis nodes; no shared parent (lung, liver and pancreas fibrosis have none either)
- **exocrine-gland-infiltration** (Sjögren's: lymphocytes destroying salivary and lacrimal glands)
- **neuromuscular-junction-blockade** (MG) — the target of `receptor-autoantibody`

**Vasculitis**
- **`vessel-wall-inflammation`** — *the eight vasculitides side by side*:
  - **granulomatous-large-vessel-arteritis** (GCA, Takayasu)
  - **necrotising-medium-vessel-arteritis** (PAN, Kawasaki)
  - **anca-neutrophil-activation** (GPA, EGPA, MPA)
  - small-vessel immune-complex vasculitis (IgA) reuses `immune-complex-deposition`, then `vessel-wall-inflammation`
- `granuloma-formation` reused for GPA and EGPA — *GPA ~ sarcoid ~ TB ~ Crohn's*. Its children (`non-caseating-granuloma`, …) stay.
- **eosinophilic-tissue-infiltration** (EGPA); `raised-eosinophils-ige` reused — *EGPA ~ asthma ~ ABPA*

**Immunodeficiency**
- **`impaired-host-defence`** — *every immunodeficiency side by side, primary and secondary*:
  - **antibody-deficiency** (XLA, CVID, hyper-IgM, CLL, myeloma)
  - **t-cell-deficiency** (DiGeorge, SCID, HIV, transplant drugs)
  - **phagocyte-killing-defect** (CGD) and **leucocyte-migration-defect** (LAD)
  - **neutrophil-deficit** (neutropenia: chemotherapy, marrow failure)
  - **complement-pathway-defect**
  - **loss-of-splenic-function** (asplenia, sickle)
- **bradykinin-excess** (hereditary angioedema): a separate mechanism, not type I — *HAE vs anaphylaxis: both swell, only one responds to adrenaline*
- `dysregulated-host-response` reused for neutropenic sepsis and OPSI — *neutropenic sepsis ~ every septic file*

---

## 4. Finding parents

- **`systemic-autoantibody`** (lab) — the sibling of the existing `gi-autoantibody`:
  - **ana**, **anti-dsdna-anti-smith** (SLE), **anti-ro-la** (Sjögren's, also neonatal lupus), **anti-centromere** (limited SSc), **anti-scl70** (diffuse SSc), **rheumatoid-factor-acpa** (RA), **c-anca-pr3** (GPA), **anti-achr-antibody** (MG), **antiphospholipid-antibodies** (APS, in haematology)
  - `p-anca` (in `gi-autoantibody`: PSC, UC) reused for MPA and EGPA — *MPA ~ PSC ~ UC*. It keeps its GI parent, since a node has one parent.
- **low-complement** (lab: SLE, HAE's low C4, complement deficiency)
- `raised-inflammatory-markers` (CRP/ESR) reused: GCA, PMR, vasculitis, RA
- **raised-mast-cell-tryptase** (anaphylaxis, mastocytosis)
- `raised-eosinophils-ige` reused (allergy, EGPA)
- **low-immunoglobulins** (XLA, CVID); **absent-b-cells** (XLA) and **low-t-cells** (SCID, DiGeorge): under a new **`immune-function-test`** parent (lab), with **abnormal-neutrophil-burst-test** (CGD)
- **Symptoms and signs:**
  - **urticaria-angioedema** (anaphylaxis; HAE gets **angioedema-without-urticaria** as a sibling under **`skin-swelling`**)
  - `wheeze`, `hypotension`, `dyspnoea` reused for anaphylaxis — *anaphylaxis ~ asthma*
  - **rhinorrhoea-sneezing** (allergic rhinitis)
  - **malar-rash**, **photosensitivity**, **oral-ulcers** (SLE)
  - **raynaud-phenomenon** (SSc, SLE, MCTD) — *one sign across the connective tissue group*
  - **sclerodactyly-skin-thickening** (SSc)
  - **sicca-symptoms** (Sjögren's)
  - **symmetrical-small-joint-polyarthritis** (RA) and `arthralgia` reused (SLE); `migratory-polyarthritis` (rheumatic fever) stays separate — new parent **`inflammatory-arthritis`** for the two? See Q3.
  - **rheumatoid-nodules**
  - **palpable-purpura** (IgA vasculitis, small-vessel) as a child of `non-blanching-rash`? See Q3.
  - `headache` reused, gaining **temporal-headache-scalp-tenderness** (GCA); **jaw-claudication** (GCA); **limb-claudication-absent-pulses** (Takayasu)
  - **kawasaki-mucocutaneous-signs** (conjunctivitis, strawberry tongue, extremity changes, rash) with `fever` reused
  - **fatigable-weakness** and **ptosis-diplopia** (MG)
  - **recurrent-sinopulmonary-infection** (antibody deficiency) and **recurrent-deep-abscesses** (CGD) and **delayed-cord-separation** (LAD) and **opportunistic-infection** (T-cell deficiency) — under **`recurrent-infection`** — *the immunodeficiencies by their infection pattern*
  - `hypocalcaemia` (lab, from pancreatitis) reused for DiGeorge's hypoparathyroidism — *DiGeorge ~ acute pancreatitis*; the facial and cardiac features go in notes

---

## 5. Outcome parents

- `shock` reused, gaining **anaphylactic-shock** (beside cardiogenic, septic, obstructive, hypovolaemic) — *every kind of shock in one place*
- **laryngeal-oedema** (anaphylaxis, HAE)
- `glomerulonephritis` (immune complex: IE, HBV, HCV, AIH) reused for SLE and IgA vasculitis; **pauci-immune-crescentic-gn** as a sibling under `kidney-injury` for the ANCA vasculitides — *SLE ~ IE; GPA ~ MPA*
- `interstitial-lung-disease` (file) and `nsip` (file) from RA and SSc — *the connective tissue diseases meet the ILD group*
- `pulmonary-hypertension` (file) from SSc
- `bronchiectasis` (file) from XLA and CVID — *antibody deficiency ~ CF*
- `acute-coronary-syndrome` (file) and a **coronary-artery-aneurysm** outcome from Kawasaki
- **permanent-visual-loss** (GCA) and **aortic-aneurysm** (GCA, Takayasu; cardio has no aortic aneurysm node, so it's new)
- `ischaemic-stroke` (file) from GCA/Takayasu if the page supports it
- `type-2-respiratory-failure` reused for myasthenic crisis — *MG ~ GBS ~ MND*
- **thymoma** (MG)
- **lymphoma-risk** from Sjögren's: `gastric-malt-lymphoma` is gastric only, so a plain **non-hodgkin-lymphoma** outcome — or haematology's `diffuse-large-b-cell-lymphoma` file if the page names a type
- **scleroderma-renal-crisis** → `acute-kidney-injury`
- `antiphospholipid-syndrome` (haem file) as an outcome of SLE
- `autoimmune-haemolytic-anaemia` and `immune-thrombocytopenia` (haem files) as outcomes of SLE and CLL — *SLE ~ CLL ~ ITP*
- Immunocompromise:
  - `septic-shock`, `bacteraemia` reused (neutropenic sepsis, OPSI)
  - `community-acquired-pneumonia`, `bacterial-meningitis` reused from OPSI (encapsulated organisms: `streptococcus-pneumoniae`, `neisseria-meningitidis`, `haemophilus-influenzae` reused) — *OPSI ~ pneumococcal meningitis ~ CAP*
  - `cryptococcal-meningitis`, `tuberculosis`, `pneumocystis-pneumonia` from T-cell deficiency — *HIV ~ transplant drugs ~ DiGeorge*

---

## Decisions (2026-11-08)

1. **Organ-specific autoimmune:** only myasthenia gravis here; ITP, AIHA and PA in haematology; the endocrine, kidney and skin ones wait for their sections (Q1).
2. **Immunocompromised infection:** neutropenic sepsis, OPSI and pneumocystis pneumonia (Q6).
3. **`autoimmune-rheumatic-disease`** becomes an **umbrella file** (same id) following K&C p.456: SLE, systemic sclerosis and Sjögren's. RA stays separate. NSIP's chain starts from the umbrella and from RA.
4. Haematology goes first (Q10).
5. Not answered yet, so the recommendation stands until told otherwise: Q2, Q3, Q4, Q5, Q7, Q8, Q9.

## Progress

- **Batch 1 drafted** (2026-11-09, all `status: draft`, 0 loose items): anaphylaxis, allergic rhinitis (group `hypersensitivity`), myasthenia gravis (`[immunology, nervous]`).
- **Shared hubs:**
  - The new `ige-mast-cell-degranulation` (type I, under `immune-mediated-injury`) feeds the existing `mast-cell-mediator-release`, so *anaphylaxis ~ allergic rhinitis ~ systemic mastocytosis*.
  - Both files reach `reversible-bronchoconstriction` → wheeze, so *anaphylaxis ~ rhinitis ~ asthma*.
  - `anaphylactic-shock` sits under `shock`.
  - Myasthenia reuses `respiratory-muscle-weakness` → `type-2-respiratory-failure` (*MG ~ GBS ~ MND*). `receptor-autoantibody` sits under `antibody-mediated-cytotoxicity`, beside AIHA, ITP and HIT.
- **Changes to existing files and nodes:**
  - `anaphylaxis` was an outcome node and is now this file (same id). Systemic mastocytosis and transfusion complications still list it.
  - `asthma` gains `immunology` as its second system (Q2 recommendation).
  - The new `seasonal-pollen` cause sits under the existing `inhaled-allergen`.
- **Changed from the sketch:**
  - Thymoma is a **cause** of MG (paraneoplastic), not an outcome.
  - Urticaria and angio-oedema are separate findings: `urticaria` already existed from the transfusion file. No `skin-swelling` parent yet; revisit with HAE.
  - The MG mechanism is `achr-loss`, kept apart from botulism's `neuromuscular-blockade`. A shared "neuromuscular junction failure" parent would make MG, botulism and LEMS related. That is a structural question for the owner.
  - `systemic-autoantibody` (lab parent) was created now, with `anti-achr-antibody` as its first child.
  - No allergen cause parent (Q3). Allergic rhinitis stays immunology-only, with no respiratory second system.
- **Thinnest:** allergic rhinitis (K&C p.945–946 only; nothing specific in Mehlman).
- **Owner decisions (2026-11-09):**
  - Yes to a shared NMJ parent. The new `neuromuscular-junction-failure` holds `achr-loss` (MG), `neuromuscular-blockade` (botulism) and the new `presynaptic-calcium-channel-block` (LEMS). Small-cell lung cancer now routes `paraneoplastic-autoimmunity` → `presynaptic-calcium-channel-block` → `lambert-eaton-syndrome` (K&C p.895 added to its sources).
  - Myeloma's use of `hypercalcaemia-of-malignancy` is fine as it is.
- **Batch 2 drafted** (2026-11-09, all `status: draft`): the `autoimmune-rheumatic-disease` umbrella (same id as the old stand-in cause, which is deleted) over SLE, systemic sclerosis and Sjögren's syndrome; rheumatoid arthritis (`[immunology, bone-joint]`, not under the umbrella).
- **Batch 3 drafted** (2026-11-09, all `status: draft`, 0 loose items): the `vasculitis` umbrella over giant cell arteritis, Takayasu, PAN, Kawasaki, GPA, MPA, EGPA and IgA vasculitis.
- **Shared hubs (batches 2–3):**
  - `systemic-autoimmunity` (under `immune-mediated-injury`) with kinds `rheumatoid-autoimmunity` and `lupus-autoimmunity`; SSc and Sjögren's use the parent directly.
  - SLE, PAN and IgA vasculitis route through `immune-complex-deposition` (type III), so *SLE ~ PAN ~ HSP ~ hepatitis B ~ infective endocarditis*.
  - `vessel-wall-inflammation` has four kinds: large-vessel granulomatous (GCA, Takayasu), medium-vessel necrotising (PAN, Kawasaki), ANCA small-vessel (GPA, MPA, EGPA) and IgA small-vessel.
  - `granuloma-formation` is reused for GPA (*GPA ~ sarcoid ~ TB ~ Crohn's*). EGPA starts from asthma's `type-2-eosinophilic-inflammation` and lists asthma and allergic rhinitis as outcomes.
  - The new `inflammatory-arthritis` parent holds RA's arthritis and rheumatic fever's `migratory-polyarthritis` (Q3). The new `hla-susceptibility` holds HLA-DR4, HLA-B8/DR3 and coeliac's `hla-dq2-dq8`. `palpable-purpura` sits under `non-blanching-rash` (Q3): *IgA vasculitis ~ meningococcal rash ~ ITP*.
  - The new `pauci-immune-crescentic-gn` sits under `kidney-injury`, beside the immune-complex `glomerulonephritis`.
- **Changes to existing files and nodes:**
  - `autoimmune-rheumatic-disease` was a cause node and is now the umbrella file. NSIP, APS, AIHA and ITP still start chains from it.
  - NSIP also starts from `rheumatoid-arthritis` (K&C p.992).
  - Anaemia of chronic disease adds RA and SLE as members of its `chronic-inflammatory-disease` group (K&C p.332).
  - `polyarteritis-nodosa` was an outcome node used by hepatitis B and is now the file (same id).
  - `hla-dq2-dq8` and `migratory-polyarthritis` gained parents; their files are unchanged.
- **Changed from the sketch:**
  - No separate `t-cell-mediated-injury` (type IV) node yet: RA uses its own `rheumatoid-synovitis`, and GCA its own granulomatous arteritis. It can be added as a parent when contact dermatitis or similar arrives.
  - Polymyalgia rheumatica is a note on GCA's first edge, not a finding: it is an association, not something the arteritis causes.
  - MCTD is not a file (Q4): K&C gives only a sentence on overlap syndromes.
  - `female-sex` is a new plain risk factor. The existing `non-modifiable-risk-factor` is cardiovascular-specific, so it isn't used as a parent.
  - Takayasu → heart failure goes through `hypertension`. K&C says only "eventually heart failure", so this route is my inference; please check it.
- **Intentional loose item (1):** `sjogrens-syndrome` → `non-hodgkin-lymphoma`. K&C gives a raised risk but no mechanism (case 3).
- **Thinnest:** Takayasu (one K&C paragraph), Kawasaki and IgA vasculitis (short K&C entries). Kawasaki's chain starts at its mechanism because no cause is known.
- **Batch 4 drafted** (2026-11-09, all `status: draft`, 0 loose items): XLA, CVID, SCID, DiGeorge, hyper-IgM, CGD, LAD, hereditary angio-oedema, complement deficiency.
- **Batch 5 drafted** (2026-11-09, all `status: draft`, 0 loose items): neutropenic sepsis, overwhelming post-splenectomy infection (OPSI), Pneumocystis pneumonia (`parent: pneumonia`, `[respiratory, immunology]`).
- **Shared hubs (batches 4–5):**
  - `impaired-host-defence` now has seven kinds: antibody deficiency, T-cell deficiency, phagocyte killing, leucocyte migration, complement, neutropenia and loss of splenic function. So *XLA ~ CVID ~ CLL ~ myeloma*, *SCID ~ DiGeorge ~ hyper-IgM ~ PCP* and *sickle cell ~ OPSI*.
  - `recurrent-infection` (CLL, myeloma) gains four kinds: sinopulmonary, deep pyogenic abscesses, opportunistic and Neisserial infection.
  - `primary-immunodeficiency-gene` holds the eight inherited defects. SLE's `early-complement-deficiency` now sits under `complement-component-defect`, beside the terminal (C5–C9) defect.
  - `granuloma-formation` is reused by CVID and CGD. `bronchiectasis` (file) is an outcome of XLA and CVID (*antibody deficiency ~ CF*). `angioedema` and `laryngeal-oedema` are shared by HAE and anaphylaxis, through different mechanisms.
  - OPSI declares one cause group: `asplenia-hyposplenism` with members splenectomy, sickle cell disease, coeliac disease and UC. Each loses splenic function. `encapsulated-bacteria` is a single class cause.
- **Changes to existing files and nodes:**
  - `neutropenic-sepsis` and `overwhelming-post-splenectomy-infection` were outcome nodes and are now files (same ids). The haem files that list them (AML, ALL, MDS, aplastic anaemia, sickle cell) are unchanged.
  - `early-complement-deficiency` gained a parent.
  - `immunosuppression` gains two children (`iatrogenic-immunosuppression`, `asplenia-hyposplenism`). The seven files using it are unchanged.
- **Changed from the sketch:**
  - **`hiv` gets no parent (Q9):** owner agreed 2026-11-10; the cryptococcal chain link already covers it.
  - No `haematological-malignancy-immune-defect` cause (Q7): CLL and myeloma already reach `antibody-deficiency` in their own chains.
  - No `skin-swelling` parent: HAE reuses `angioedema`, with a note that it is not itchy and has no weals.
  - The recurrent-infection kinds are outcomes, not findings, because the existing `recurrent-infection` is an outcome.
  - Not drafted as files (all are named in K&C but not in the syllabus): selective IgA deficiency (already a cause in transfusion), Wiskott–Aldrich, ataxia telangiectasia.
- **Thinnest:** OPSI (K&C gives one paragraph plus the prophylaxis box), LAD and hyper-IgM (one K&C paragraph each).
- **§6 fully drafted: 28 diseases with immunology as their home system, plus Pneumocystis pneumonia (respiratory home).**

## Questions before drafting

1. **Organ-specific autoimmune diseases: where do they live?** The syllabus lists 13 under §6 but says to see the organ teaching, and 9 of them are taught again in §11, §12 or §15.
   - Recommended: **draft only myasthenia gravis now** (the one not taught elsewhere), plus the three blood ones in haematology. The endocrine, kidney and skin ones wait for their sections, then get `[<organ>, immunology]`. AIH and PBC are already done.
   - The other way: draft all of them now with immunology as their home. That's faster to see, but their group would be `organ-specific-autoimmune` forever, and §11 would have no Graves' or T1DM in its own groups.
2. **Allergic asthma and contact dermatitis.** Recommended: give the existing `asthma` file `immunology` as a second system (it already has the allergen route), and wait for §15 for contact dermatitis. The other way: draft contact dermatitis now, immunology home.
3. **New finding and cause parents that pull in existing nodes:**
   - `palpable-purpura` as a child of `non-blanching-rash` (meningococcal) — *IgA vasculitis ~ meningococcal ~ ITP petechiae*. Recommended: yes.
   - **`inflammatory-arthritis`** over the new RA arthritis and the existing `migratory-polyarthritis` (rheumatic fever). Recommended: yes; `migratory-polyarthritis` has no parent today.
   - **`allergen`** cause parent over the new allergen-exposure and the existing `inhaled-allergen`. `inhaled-allergen` already has `asthma-trigger` as its parent, so it **can't** move without changing that. Recommended: leave `inhaled-allergen` where it is; the type I mechanism links asthma and anaphylaxis anyway.
4. **Mixed connective tissue disease**: a note in SLE (recommended), or its own file if K&C has enough?
5. **Lambert–Eaton** (outcome of small-cell lung cancer) is reached through `paraneoplastic-autoimmunity`, which sits under `immune-mediated-injury` and also covers the anti-Hu/Yo cerebellar syndrome. Moving it under `receptor-autoantibody` would wrongly make the cerebellar syndrome a receptor disease. Recommended: **leave it**. LEMS and MG still both reach `immune-mediated-injury` one level up, and a note on MG can name LEMS as its differential.
6. **Infection in the immunocompromised: which files?**
   - Recommended: **neutropenic-sepsis**, **overwhelming-post-splenectomy-infection** and **pneumocystis-pneumonia**. PCP sits under the existing `pneumonia` umbrella with group `respiratory-infection` and systems `[respiratory, immunology]`, like the other pneumonias. Transplant infections (CMV, etc.) wait for §4 infection.
   - The other way: notes only, with no files in this group.
7. **Secondary immunodeficiency from CLL and myeloma.** Recommended: chain directly from the haematology files (`chronic-lymphocytic-leukaemia` → `antibody-deficiency`), not a stand-in cause. That means immunology's batch on immunodeficiency comes after haematology's lymphoma and plasma cell batches, or adds the link later.
8. **Existing T-cell mechanisms and type IV.** `gluten-driven-t-cell-injury`, `autoimmune-hepatocyte-injury` and others sit directly under `immune-mediated-injury`. Moving them under the new `t-cell-mediated-injury` makes them siblings of RA and GCA but no longer siblings of the type II and III diseases. Recommended: **leave them**; the new type nodes are siblings of them anyway.
9. **The `immunosuppression` cause gains children**, and `hiv` gains it as its parent (§2). OK?
10. **Order between the two systems (proposed):** haematology first, then immunology. Immunology's batches:
    1. hypersensitivity and myasthenia gravis (3)
    2. systemic autoimmune (4)
    3. vasculitis (9, including the umbrella)
    4. immunodeficiency (9)
    5. immunocompromised infection (3)

    Two batches at a time, as before. Haematology goes first because AIHA, ITP, APS and the CLL/myeloma links are needed by immunology's SLE and immunodeficiency files.

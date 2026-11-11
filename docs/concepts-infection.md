# Step B1 — Microbiology and infection parent concepts (draft for review, 2026-11-10)

Same rules and legend as `concepts-nervous.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node or file, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [infection]` unless noted.

Sources (headings listed; offsets from the protocol table):
- K&C ch.8 Sepsis (−19): definition and pathophysiology p.154, recognition p.154–156, management p.157–158, stewardship p.159, antibiotic classes p.161–166
- K&C ch.20 Infectious disease (−22): healthcare-associated infection p.507, travel protection p.509, HSV p.513–515, VZV p.515–517, dengue p.521–522, EBV (infectious mononucleosis) and CMV p.524, EBV and malignancy p.530, Kaposi's sarcoma and HHV-8 p.531, viral haemorrhagic fevers p.531–533, anti-herpes drugs p.533–534, *C. difficile* p.542, enteric fever p.554, candidiasis p.559, malaria p.563–566, toxoplasmosis p.570
- K&C ch.37 STIs and HIV (−13): HIV epidemiology p.1425–1426, untreated HIV p.1429–1432, testing p.1432–1433, management p.1434–1441, PEP p.1441, opportunistic infections p.1441–1448 (cryptococcus p.1443, candida and toxoplasma p.1444, CMV p.1445–1446, VZV p.1446, Kaposi p.1448), prevention and PrEP p.1449
- Mehlman HY Immuno, HY Pulmonary, HY Neuro, HY Heme-Onc, HY Gastro (to be searched batch by batch)
- No LMC infection handouts in `Resources/` yet.

Syllabus §4 has five groups: **sepsis**, **herpes virus infection** (HSV 1/2, VZV, EBV, CMV), **HIV infection** (testing; PCP, cryptococcus, candida, TB, MAC, HSV, CMV, VZV, HHV-8/Kaposi, toxoplasmosis; ART principles, consent, PrEP/PEP), **healthcare-associated infection** (MRSA, resistant Gram-negatives, norovirus, *C. difficile*, influenza; spread and control) and **febrile returning traveller** (malaria, dengue, typhoid; viral haemorrhagic fever and MERS-CoV risk; travel vaccination). The "approach to antimicrobial therapy" subsection has no group: it is prescribing knowledge (notes).

**Much of this already exists.** Files: `pneumocystis-pneumonia`, `cryptococcal-meningitis`, `tuberculosis`, `ntm-infection` (MAC), `influenza`, `viral-gastroenteritis` (norovirus), `encephalitis` (HSV, VZV), `bacteraemia`, `s-aureus-bacteraemia`, `neutropenic-sepsis`, `catheter-associated-bacteraemia`, the HAP/VAP files. Nodes: `hiv` (a **cause**, condition; 8 users), `dysregulated-host-response` (the sepsis hub, ~20 files), `septic-shock`, `t-cell-deficiency`, `opportunistic-infection`, `herpes-simplex-virus`, `varicella-zoster-virus`, `ebv-infection` (risk factor; Hodgkin, Burkitt, MS), `candida`, `cryptococcus-neoformans`, `norovirus`, `immunosuppression`.

---

## 1. Disease list (syllabus §4): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| sepsis | sepsis | none (Q3) |
| herpes-virus | herpesvirus-infection (umbrella), herpes-simplex-infection, varicella-zoster-infection (chickenpox and shingles), infectious-mononucleosis (EBV), cmv-infection | herpesvirus-infection (Q4) |
| hiv | hiv, candidiasis (oral and oesophageal), cerebral-toxoplasmosis, kaposi-sarcoma | none |
| healthcare-associated-infection | c-difficile-infection | none |
| returning-traveller | malaria, dengue, enteric-fever (typhoid and paratyphoid), viral-haemorrhagic-fever | none |

About 15 files.
- PCP, cryptococcal meningitis, TB and MAC (`ntm-infection`) already exist; HIV links to them (Q5).
- CMV, HSV and VZV in HIV are the herpes-group files, with HIV as a cause.

**Not files here, and why:**
- MRSA, ESBL and carbapenemase-producing Enterobacteriaceae: resistant **organisms** (cause nodes), not diseases (Q6). Norovirus stays in `viral-gastroenteritis`; influenza is already a file.
- MERS-CoV: a note in the traveller files (only named for risk assessment).
- Antibiotic classes, stewardship, allergy, gentamicin levels, sepsis-6, infection control, notification, travel vaccines: notes, plus one new cause `antibiotic-exposure` (Q8).
- HHV-6/7: not in the syllabus.

**Existing nodes that become files (same id, §5.5):**
- `hiv` (cause, condition) → file. All 8 users (PCP, cryptococcal meningitis, ITP, aplastic anaemia, FSGS, Burkitt, DLBCL, ACD) keep starting chains from it. It had no parent (immunology decision), and stays without one.

**Second systems (Q9):**
- hiv: `[infection, immunology]`
- kaposi-sarcoma: `[infection, skin-breast]`; cerebral-toxoplasmosis: `[infection, nervous]`
- malaria: `[infection, haematology]`; infectious-mononucleosis: `[infection, haematology]`?
- c-difficile-infection and enteric-fever: `[infection, gastrointestinal]`
- varicella-zoster-infection and herpes-simplex-infection: `[infection, skin-breast]`?

---

## 2. Cause parents

**Organisms**
- Herpesviruses: `herpes-simplex-virus`, `varicella-zoster-virus` (reused; under `neurotropic-virus`); new **epstein-barr-virus** and **cytomegalovirus** and **hhv-8**. A new parent **herpesvirus** would be the natural home, but the first two already sit under `neurotropic-virus` (one parent only) — Q4.
- `ebv-infection` (risk factor, "previous EBV") stays for Hodgkin, Burkitt and MS; the new `infectious-mononucleosis` file can become their root instead? (Q4)
- New **plasmodium-falciparum** (and **non-falciparum-plasmodium**), **dengue-virus**, **salmonella-typhi** (under `enterobacteriaceae`, beside `salmonella`) — *typhoid ~ gastroenteritis*
- New **haemorrhagic-fever-virus** (Ebola, Marburg, Lassa, CCHF; `only:` in one file)
- New **clostridioides-difficile**; `norovirus` reused
- New resistant organisms (Q6): **mrsa** under `s-aureus`, **esbl-enterobacteriaceae** and **cpe** under `enterobacteriaceae` — *MRSA ~ S. aureus bacteraemia, HAP, line infection*
- `candida`, `cryptococcus-neoformans`, `mycobacterium-tuberculosis` reused; new **toxoplasma-gondii**

**Risk factors and exposures**
- **antibiotic-exposure** (C. diff, resistant organisms) — *~ every antibiotic-treated infection*
- `immunosuppression`, `central-venous-catheter`, urinary catheter (`catheter-associated-uti`) reused for HAI
- **mosquito-exposure** (malaria, dengue); for typhoid a new **faecal-oral-exposure** (contaminated food or water), since the existing `contaminated-food` is about toxins and spores — *typhoid ~ gastroenteritis via `salmonella`'s parent*
- HIV transmission: `parenteral-exposure` (reused: injecting, transfusion, needlestick, sex) and **sexual-exposure**? (Q2)

---

## 3. Mechanism parents

- Sepsis: `dysregulated-host-response` (reused hub) → organ dysfunction: `septic-shock`, `acute-kidney-injury`, `ards`, `disseminated-intravascular-coagulation`, `lactic-acidosis` (all files or outcomes) — *the sepsis file joins everything that already reaches the hub*
- HIV: new **cd4-depletion** → `t-cell-deficiency` (reused) — *HIV ~ SCID ~ DiGeorge ~ hyper-IgM*; → `opportunistic-infection` (reused outcome)
- Herpes: new **herpesvirus-latency** (lifelong latency, reactivation when immunity falls) — *HSV ~ VZV ~ EBV ~ CMV*; reactivation fed by `immunosuppression` and `hiv`
- EBV: new **b-cell-infection-lymphocytosis** (atypical lymphocytes); reuse the existing EBV → lymphoma links
- Malaria: new **red-cell-parasitisation** → reuse `intravascular-haemolysis`/haemolysis nodes, **cytoadherence** (cerebral malaria) — *malaria ~ haemolytic anaemias*
- Dengue: new **dengue-capillary-leak** (severe dengue); the only existing leak node is `alveolar-capillary-leak` (lung)
- Typhoid: reuse `mucosal-invasion` (Peyer's patches) → `bacteraemia` (file) — *typhoid ~ gastroenteritis ~ bacteraemia*
- C. diff: new **toxin-mediated-colitis** (toxins A/B, pseudomembranes) — *~ colitis files*
- Resistance (Q6): **beta-lactamase-production**, **altered-penicillin-binding-protein**? Only if a resistant organism needs a mechanism step; otherwise notes.

---

## 4. Finding parents

- Reuse `fever`, `positive-blood-cultures`, `raised-inflammatory-markers`, `hypotension`, `tachycardia`, `tachypnoea`, `confusion`, `raised-lactate`, `diarrhoea`, `splenomegaly`, `jaundice`, `thrombocytopenia`, `lymphadenopathy` / `generalised-lymphadenopathy`
- New lab tests: **hiv-test-positive** (4th-generation antigen/antibody), **low-cd4-count**, **malaria-film-positive**, **c-difficile-toxin-positive**, **atypical-lymphocytes-monospot**, **dengue-ns1-serology**
- New signs: **vesicular-rash** (HSV; chickenpox), **dermatomal-vesicular-rash** (shingles), **purple-skin-lesions** (Kaposi), **oral-thrush**, **rose-spots** (typhoid), **haemorrhagic-manifestations** (dengue, VHF), toxoplasmosis reuses `ring-enhancing-lesion` (brain abscess) — *toxo ~ brain abscess*
- Sepsis criteria: reuse `hypotension` etc.; a **sepsis-red-flags** finding only if it adds something (Q3)

---

## 5. Outcome parents

- `opportunistic-infection` (exists) → linked to PCP, cryptococcal meningitis, TB, NTM, candidiasis, toxoplasmosis, CMV — *HIV ~ every OI*
- `septic-shock`, `ards`, `acute-kidney-injury`, `disseminated-intravascular-coagulation` from sepsis
- New **post-herpetic-neuralgia** (shingles), **cmv-retinitis**, **cerebral-malaria**, **severe-dengue** (or `shock`), `toxic-megacolon` (reused, *C. diff ~ UC*) from C. diff, `gi-perforation` (reused) from typhoid
- Lymphoma links: `burkitt-lymphoma`, `hodgkin-lymphoma` (EBV), `kaposi-sarcoma` (HHV-8); `encephalitis` (HSV, VZV)

---

## 6. Questions before drafting

1. **Disease list as in §1** (about 15 files). Recommended: yes.
2. **`hiv` becomes a file** (same id; all 8 users keep working; no parent). Its chain runs exposure → `cd4-depletion` → `t-cell-deficiency` → `opportunistic-infection`, with outcomes into the existing OI files. Transmission: reuse `parenteral-exposure` (which already includes sex) rather than a new sexual-exposure node. Recommended: yes.
3. **A `sepsis` file** built on the existing `dysregulated-host-response` hub, with sources of infection (pneumonia, UTI, intra-abdominal, meningitis) as a cause group and organ dysfunction as outcomes. Existing files keep their own chains; they don't gain `sepsis` as an outcome except where a page says so. Recommended: yes. The other way: make `neutropenic-sepsis` and `overwhelming-post-splenectomy-infection` children of `sepsis` (a structural change to two existing files).
4. **Herpes umbrella:** `herpesvirus-infection` with four children (HSV, VZV covering chickenpox and shingles, EBV infectious mononucleosis, CMV) and a shared `herpesvirus-latency` mechanism. HSV and VZV keep their `neurotropic-virus` parent; EBV and CMV get no organism parent. `ebv-infection` (risk factor) stays for the lymphoma and MS links. Recommended: yes. The other way: no umbrella; or split VZV into chickenpox and shingles.
5. **Opportunistic infections:** reuse PCP, cryptococcal meningitis, TB and `ntm-infection`; new files candidiasis, cerebral toxoplasmosis and Kaposi's sarcoma; CMV/HSV/VZV via the herpes files. HIV links to all of them. Recommended: yes.
6. **Resistant organisms as cause nodes, not files:** `mrsa` (child of `s-aureus`), `esbl-enterobacteriaceae` and `cpe` (children of `enterobacteriaceae`), added to existing files where pages name them (S. aureus bacteraemia, HAP, catheter infections, UTI). Recommended: yes. The other way: an "MRSA infection" file.
7. **Traveller files:** malaria, dengue, enteric fever, and one viral haemorrhagic fever file (Ebola, Marburg, Lassa, CCHF marked `only:`); MERS-CoV as a note. Recommended: yes.
8. **Antimicrobial therapy:** notes only, plus a new `antibiotic-exposure` cause (feeding C. diff and resistant organisms). Recommended: yes. The other way: drug-toxicity links (gentamicin → AKI and ototoxicity, etc.) as a later pass.
9. **Second systems** as listed in §1. Recommended: yes for hiv (immunology), kaposi (skin), toxoplasmosis (nervous), malaria (haematology), C. diff and enteric fever (GI); no for infectious mononucleosis and the HSV/VZV files (skin is §15, not yet started — they can gain it then).
10. **Existing OI files gain `infection` as a second system** (PCP, cryptococcal meningitis, NTM; TB?) so they show under §4. Recommended: yes for PCP and cryptococcal meningitis (HIV-defining); no for TB and NTM (respiratory first, not HIV-specific).

---

## 7. Batch order

1. Sepsis and HIV: sepsis, hiv (2) — HIV first so the OI files can start from it
2. HIV opportunistic infections: candidiasis, cerebral-toxoplasmosis, kaposi-sarcoma (3)
3. Herpes: herpesvirus-infection (umbrella), herpes-simplex-infection, varicella-zoster-infection, infectious-mononucleosis, cmv-infection (5)
4. Healthcare-associated: c-difficile-infection, plus the resistant-organism nodes in existing files (1)
5. Returning traveller: malaria, dengue, enteric-fever, viral-haemorrhagic-fever (4)

---

## Decisions (owner, 2026-11-10)

- Q1–Q10: yes, as recommended.
- **Spirochaetes added** (owner, 2026-11-10): the syllabus's core organism list (general section "Introduction to the diagnosis/treatment of infection", p.4) names *Treponema pallidum*, *Borrelia burgdorferi* and *Leptospira*. New **batch 6**: syphilis (`[kidney-urogenital, infection]`, group `uti` beside chlamydia and gonorrhoea), lyme-disease and leptospirosis (`[infection]`, group `returning-traveller`, the nearest §4 group; Lyme is not travel-specific, so the owner may move it).

## Progress

- **Batches 1–2 drafted** (2026-11-10, all `status: draft`, 0 loose items): sepsis, hiv (`[infection, immunology]`); candidiasis, cerebral-toxoplasmosis (`[infection, nervous]`), kaposi-sarcoma (`[infection, skin-breast]`).
- **Node that became a file:** `hiv` (cause). Its 8 users (PCP, cryptococcal meningitis, ITP, aplastic anaemia, FSGS, Burkitt, DLBCL, ACD) work unchanged.
- **Changes to existing files:** `pneumocystis-pneumonia` and `cryptococcal-meningitis` gained `infection` as a third system (Q10).
- **Shared hubs:** sepsis is built on the existing `dysregulated-host-response` (≈20 files) with a new `vasoplegia-capillary-leak` → hypotension, lactate, septic shock; its cause group `infection-source` has UTI, cholangitis, pneumonia, endocarditis and meningitis as members (K&C p.155). HIV runs `hiv-replication` → `cd4-depletion` → `t-cell-deficiency` (*~ SCID, DiGeorge, hyper-IgM*) → `opportunistic-infection` and the OI files. `kaposi-spindle-cell-proliferation` sits under `malignant-transformation`. Toxoplasmosis reuses `ring-enhancing-lesion` (*~ brain abscess*). `antibiotic-exposure` (planned for batch 4) is already used by candidiasis.
- **Changes from the sketch:** HIV's transmission reuses `parenteral-exposure` (Q2). `hhv-8` has no organism parent, like EBV and CMV will (Q4). No new sepsis-red-flags finding: qSOFA and NEWS2 go in a note. `vasoplegia-capillary-leak` is separate from anaphylaxis's `vasodilation-vascular-leak` (different mediators); a shared parent could be proposed later.
- **For batch 4:** look for a K&C page naming diabetic foot organisms and prosthetic-joint biofilm (the §14 gaps the syllabus expects).
- **Batches 3–4 drafted** (2026-11-10, all `status: draft`, 0 loose items): herpesvirus-infection (umbrella), herpes-simplex-infection, varicella-zoster-infection, infectious-mononucleosis, cmv-infection; c-difficile-infection (`[infection, gastrointestinal]`).
- **Resistant organisms (Q6):** `mrsa` (under `s-aureus`), `esbl-enterobacteriaceae` and `cpe` (under `enterobacteriaceae`), from K&C ch.8 p.156, 159, 167-168.
- **Changes to existing files:** `urinary-tract-infection` gained ESBL and CPE as members of its organism group; `catheter-associated-bacteraemia` gained `mrsa → catheter-biofilm`; `s-aureus-bacteraemia` gained `mrsa → injection-drug-use`; `hiv` gained `cmv-infection` and `varicella-zoster-infection` as outcomes (K&C p.1445, 1429).
- **Shared hubs:** `herpesvirus-latency` → `herpesvirus-reactivation` (all four herpes files; reactivation fed by `immunosuppression`, `hiv`, `older-age`) → `opportunistic-infection`; `herpesvirus-dna-pcr` (HSV, VZV, CMV); `atypical-lymphocytes` under `lymphocytosis` (*EBV ~ CMV*); C. diff reuses EHEC's `cytotoxin-mucosal-damage` (*C. diff ~ EHEC*) and IBD's `toxic-megacolon` (*~ UC*); `antibiotic-exposure` feeds both candidiasis and C. diff. EBV's latency links to Burkitt and Hodgkin (the old `ebv-infection` cause node stays for them and MS, Q4).
- **Changes from the sketch:** HSV and VZV keep their `neurotropic-virus` parent; EBV and CMV have none. No `beta-lactamase` mechanism nodes: the resistance mechanisms are in the notes. Chickenpox and shingles are one file (Q4). Ophthalmic shingles, VII palsy and neonatal herpes are notes.
- **§14 gaps still open:** K&C ch.8 and ch.20 don't name diabetic foot organisms or describe prosthetic-joint biofilm on the pages read.
- **Batches 5–6 drafted** (2026-11-10, all `status: draft`, 0 loose items): malaria (`[infection, haematology]`), dengue, enteric-fever (`[infection, gastrointestinal]`), viral-haemorrhagic-fever (Ebola/Marburg, Lassa, CCHF; `only:` where they differ); syphilis (`[kidney-urogenital, infection]`, group `uti`), lyme-disease, leptospirosis.
- **New organism parents:** `plasmodium` (falciparum; vivax/ovale), `haemorrhagic-fever-virus` (three kinds), and **`spirochaete`** over *Treponema*, *Borrelia* and *Leptospira* — *syphilis ~ Lyme ~ leptospirosis*. The spirochaete parent was not in the agreed sketch (it follows the syllabus's own grouping); the owner can drop it. `salmonella-typhi` sits under `enterobacteriaceae` beside `salmonella`.
- **Shared hubs and links:** malaria reuses `intravascular-haemolysis` (*~ G6PD, PNH-type haemolysis*) and reaches AKI, pulmonary oedema and hypoglycaemia (files); dengue's capillary leak reaches DIC and hypovolaemic shock; enteric fever runs `mucosal-invasion` (*~ bacterial gastroenteritis*) → `bacteraemia` (file) → osteomyelitis, meningitis, GI perforation and bleeding; syphilis reuses `aortitis` (*~ ankylosing spondylitis*) → `aortic-regurgitation`; Lyme reuses `asymmetrical-oligoarthritis` (*~ reactive arthritis*) and `av-block`; leptospirosis reuses `conjunctivitis` and `meningism`. `maculopapular-rash` is a new parent over rose spots and the secondary-syphilis rash (also dengue, Ebola).
- **Changes from the sketch:** no `faecal-oral-exposure` node (the typhoid route is in the note); MERS-CoV is a note on the VHF fever finding; P. malariae, primaquine/G6PD and sickle-trait protection are notes. Leptospirosis treatment wasn't on the pages read, so it has none.
- **§4 fully drafted: 17 diseases with infection as their home system, plus syphilis (kidney home)** (2026-11-10). Next: owner review; then §9 head and neck, §15 skin and breast or §16 female genital.

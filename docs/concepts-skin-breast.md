# Step S1 — Skin and breast parent concepts (draft for review, 2026-11-11)

Same rules and legend as `concepts-nervous.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node or file, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [skin-breast]` unless noted.

Sources (headings listed; offsets checked):
- K&C ch.22 Dermatology (−22, rechecked on "HIV and the skin 676"): eczema p.660–664, psoriasis p.664–666, impetigo, cellulitis and erysipelas, necrotising fasciitis p.669, viral exanthem p.671, fungal p.672–674, scabies p.674–676, drug rashes and erythema multiforme p.676–678 (Box: EM–SJS–TEN spectrum), Paget's of the nipple as a skin sign of cancer p.685, pemphigus and pemphigoid p.686, naevi and seborrhoeic keratosis p.688, keratoacanthoma and pre-malignant lesions p.689, BCC and SCC p.690, melanoma p.691, congenital naevi p.696, drug eruptions and SJS/TEN p.696–698
- K&C ch.20 Infectious disease (−22): infections with a rash p.497, vesicular viral rashes p.513, maculopapular viral rashes p.517, pyomyositis (named in a list only) p.512, bacterial skin and soft-tissue infection p.535–536, hookworm p.577, cutaneous larva migrans p.578
- K&C ch.6 Malignant disease (−21): breast screening and BRCA p.103, **breast cancer p.121–123** (histology box lists DCIS, LCIS, ductal, lobular, Paget's of the nipple, phyllodes)
- Mehlman HY Repro-OBGYN (breast table: DCIS, invasive ductal/lobular, LCIS, intraductal papilloma, inflammatory carcinoma, fibroadenoma, phyllodes, BRCA, fibrocystic change, cysts, mastitis, abscess, duct ectasia, fat necrosis), HY Pathology, HY Immuno (pemphigus/pemphigoid, eczema), HY Anatomy-MSK-Rheum (psoriasis)
- **No source at all for radial scar** (Q10), adnexal tumours or metastatic skin tumours (Q8). K&C has **no benign breast text**; Mehlman is the only source there.
- No LMC skin or breast handouts in `Resources/` yet.

Syllabus §15 has four groups: **inflammatory skin disease** (eczema, psoriasis, pemphigus and pemphigoid, drug reactions, erythema multiforme, SJS/TEN), **skin and soft tissue infection** (S. aureus, GAS, dermatophytes and intertrigo, scabies and hookworm; cellulitis, necrotising fasciitis, viral rashes, myositis; empirical therapy and source control), **skin tumours** (seborrhoeic keratosis, viral wart, keratoacanthoma, BCC, SCC; acquired, congenital and dysplastic naevi, melanoma; adnexal and metastatic tumours) and **breast disease** (mastitis, fat necrosis, duct ectasia, fibrocystic change, radial scar; fibroadenoma, phyllodes; intraductal papilloma, DCIS, invasive carcinoma, Paget's of the nipple; BRCA, ER/PR/HER2, screening).

**What already exists:** `psoriasis` (a cause node feeding `psoriatic-arthritis`, which already has `skin-breast` as its second system), `varicella-zoster-infection`, `herpes-simplex-infection`, `kaposi-sarcoma`, `candidiasis`, `syphilis`, `lyme-disease`, `diabetic-foot-infection`, `s-aureus-bacteraemia`; organisms `s-aureus`, `mrsa`, `group-a-streptococcus`, `hookworm`, `hpv-infection`; `uv-light`, `atopy`, `drug-rash`, `pruritus`, `urticaria`, `maculopapular-rash`, `chickenpox-rash`, `dermatomal-vesicular-rash`. Breast appears only inside other nodes' names (`extracranial-primary-cancer`, notes in bone and brain metastases).

---

## 1. Disease list (syllabus §15): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| inflammatory-skin | eczema, psoriasis, pemphigus-vulgaris, bullous-pemphigoid, drug-eruption, erythema-multiforme, sjs-ten | none (Q2–Q4) |
| skin-soft-tissue-infection | impetigo, cellulitis, necrotising-fasciitis, dermatophyte-infection, scabies, cutaneous-larva-migrans | none |
| skin-tumours | seborrhoeic-keratosis, viral-wart, keratoacanthoma, basal-cell-carcinoma, cutaneous-squamous-cell-carcinoma, melanocytic-naevus, malignant-melanoma | none (Q8) |
| breast | mastitis, fat-necrosis-breast, duct-ectasia, fibrocystic-change, fibroadenoma, phyllodes-tumour, intraductal-papilloma, breast-cancer (umbrella), ductal-carcinoma-in-situ, invasive-breast-carcinoma, pagets-disease-of-the-nipple | breast-cancer (Q9) |

About 31 files.

**Not files here, and why:**
- Viral rashes: VZV, HSV, HIV seroconversion, syphilis, dengue, IM already have files and rash findings (Q7).
- Myositis: K&C only names pyomyositis in a list (Q5).
- Intertrigo: a **finding** on the existing `candidiasis` (Q6).
- Radial scar, adnexal tumours, skin metastases: no source (Q8, Q10).
- Breast abscess, crusted scabies, eczema herpeticum, SCC metastasis: **outcomes**.
- Actinic keratosis and Bowen's disease: **cause** nodes for SCC. Dysplastic naevus: a cause for melanoma.
- Empirical antibiotics, source control, ER/PR/HER2 treatment, screening (mammography 50–70): notes.

**Existing nodes that become files (same id, §5.5):** `psoriasis` (cause) → file. `psoriatic-arthritis` keeps starting from it.

**Second systems:** none new (Q11). `psoriatic-arthritis` already lists `skin-breast`.

---

## 2. Cause parents

- Organisms: reuse `s-aureus`, `mrsa`, `group-a-streptococcus` (*impetigo ~ cellulitis ~ NF ~ tonsillitis ~ rheumatic fever ~ PSGN ~ SAB*), `hookworm` (*CLM ~ IDA*), `hpv-infection` (*wart ~ HNSCC ~ penile*), `herpes-simplex-virus` if present (EM trigger); new **dermatophyte** (Trichophyton etc.), **sarcoptes-scabiei**
- Risk factors: reuse `atopy` (*eczema ~ asthma ~ allergic rhinitis*), `uv-light` (*BCC ~ SCC ~ melanoma ~ SLE photosensitivity*), `immunosuppression`, `diabetes-mellitus`; new **skin-barrier-breach** (wounds, ulcers, tinea pedis; cellulitis and NF)
- Drugs: reuse existing `category: drug` nodes where they fit; new **culprit-drug** (allopurinol, anticonvulsants, sulfonamides, NSAIDs) for drug eruption and SJS/TEN
- Genetic: new **brca-mutation** (*breast ~ ovary in §16 ~ prostate*); new **filaggrin-mutation**? (only if K&C p.660 names it)
- Premalignant: new **actinic-keratosis** (condition; SCC), **dysplastic-naevus** (melanoma)

## 3. Mechanism parents

- New **skin-barrier-dysfunction** (eczema)
- New **keratinocyte-hyperproliferation** (psoriasis)
- New **intraepidermal-autoantibody-blistering** (pemphigus: anti-desmoglein) and **subepidermal-autoantibody-blistering** (pemphigoid: anti-BP180/230), both under a new parent **immunobullous-blistering** under `immune-mediated-injury`
- New **keratinocyte-necrosis** (SJS/TEN; EM)
- New **skin-soft-tissue-infection** parent with **superficial-epidermal-infection** (impetigo), **dermal-subcutaneous-infection** (cellulitis), **fascial-plane-infection** (NF). Reuse `dysregulated-host-response` → `sepsis`
- Tumours: reuse `uv-light → malignant-transformation` children: new **keratinocyte-malignant-transformation** (BCC, SCC), **melanocyte-malignant-transformation** (melanoma); new **benign-melanocyte-proliferation** (naevus), **benign-keratinocyte-proliferation** (seborrhoeic keratosis, keratoacanthoma)
- Breast: new **breast-epithelial-transformation** under `malignant-transformation`; new **fibroepithelial-proliferation** (fibroadenoma, phyllodes); reuse `lymphatic-spread` (from §9: axillary nodes) and `metastatic-spread`

## 4. Finding parents

- New **skin-lesion** parent? Recommended **no** (it would relate every skin disease to every other one). Group instead: new **blisters** (sign) with children **flaccid-blisters-erosions** (pemphigus), **tense-blisters** (pemphigoid); reuse `chickenpox-rash`, `dermatomal-vesicular-rash` as children? (Q3)
- New **target-lesions** (EM), **mucosal-erosions-skin-detachment** (SJS/TEN), **nikolsky-sign**
- New **itchy-flexural-eczema**, **silvery-scaly-plaques**, **nail-pitting**; reuse `pruritus`
- New **spreading-erythema** (cellulitis), **golden-crusted-lesions** (impetigo), **pain-out-of-proportion** (NF), **burrows** (scabies), **serpiginous-track** (CLM), **annular-scaly-rash** (tinea)
- Tumours: new **pearly-nodule-telangiectasia** (BCC), **keratotic-nodule-ulcer** (SCC), **changing-pigmented-lesion** (melanoma; ABCDE), **stuck-on-warty-lesion** (seb K), **rapid-crater-nodule** (KA)
- Breast: new **breast-lump** (sign) as the hub, with children **mobile-rubbery-breast-lump** (fibroadenoma), **hard-irregular-breast-lump** (cancer), **cyclical-tender-lumpiness** (fibrocystic); new **nipple-discharge** with child **bloody-nipple-discharge** (papilloma); **nipple-inversion**, **eczematous-nipple** (Paget's), **peau-d-orange**; imaging **microcalcifications**; histology **er-pr-positive**, **her2-amplified**
- Reuse `fever`, `weight-loss`, `lymphatic-spread → axillary` (new **axillary-lymphadenopathy** under `lymphadenopathy`)

## 5. Outcome parents

- Reuse `sepsis` (file), `septic-shock`?, `toxic-shock`? (only if sourced); new **breast-abscess**, **crusted-scabies**, **eczema-herpeticum**, **post-streptococcal-glomerulonephritis** (file; impetigo, K&C p.1360)
- Tumour spread: reuse `bone-metastases`, `brain-metastases`, `liver-metastases`, `lung-metastases`, `malignant-pleural-effusion`, `hypercalcaemia-of-malignancy` (*breast ~ lung ~ myeloma*)
- `phyllodes` malignant form → `distant-metastases`

---

## 6. Questions before drafting

1. **`psoriasis` becomes a file** with the same id; `psoriatic-arthritis` keeps working. Recommended: yes.
2. **Eczema as one file** (atopic as the main form; contact, seborrhoeic and others as notes and cause nodes). Recommended: yes. The other way: an `eczema` umbrella with atopic, contact and seborrhoeic children.
3. **Pemphigus and pemphigoid:** two files with no umbrella, linked by the new `immunobullous-blistering` mechanism parent and a new `blisters` finding parent. Should the chickenpox and shingles vesicle findings also move under `blisters`? Recommended: no, keep them where they are (vesicles from a virus are a different story). The other way: an umbrella file `immunobullous-disease`.
4. **Drug reactions:** three files, `drug-eruption` (maculopapular, fixed, urticarial and other common reactions), `erythema-multiforme` (mostly HSV-triggered) and `sjs-ten` (one file for the spectrum, drug-triggered). EM and SJS/TEN share `keratinocyte-necrosis` but no parent. Recommended: yes. The other way: an umbrella `cutaneous-drug-reaction` with SJS/TEN under it (EM doesn't fit, as it's usually infective).
5. **Myositis:** K&C only names pyomyositis in a list, and Mehlman has nothing. Recommended: leave it out until you add a source (as with chondroma). The other way: a thin `pyomyositis` file from the list alone.
6. **Fungal and parasitic:** files `dermatophyte-infection` (tinea), `scabies`, and `cutaneous-larva-migrans` (animal hookworm larvae in the skin; reuses `hookworm`). Intertrigo becomes a finding on the existing `candidiasis` file. Recommended: yes.
7. **Viral rashes:** no new files; the existing VZV, HSV, HIV, syphilis, dengue and IM files already carry rash findings. Recommended: yes. The other way: add `measles`, `rubella` and `parvovirus-b19` files (K&C p.517–518).
8. **Skin tumours:** seven files with no umbrella; BCC, SCC and melanoma linked by `uv-light` and their transformation mechanisms. Adnexal tumours and skin metastases have no source, so they're left out until you add one. Recommended: yes. The other way: a `skin-cancer` umbrella over BCC, SCC and melanoma.
9. **Breast cancer:** a `breast-cancer` umbrella (shared: BRCA and hormone risk, the breast-lump hub, axillary spread, metastases) with children `ductal-carcinoma-in-situ`, `invasive-breast-carcinoma` (ductal and lobular as notes; ER/PR/HER2 findings) and `pagets-disease-of-the-nipple`. Phyllodes sits beside fibroadenoma (fibroepithelial), not under the umbrella. Recommended: yes. The other way: no umbrella, three siblings.
10. **Benign breast disease rests on Mehlman alone**, and **radial scar has no source at all**. Recommended: draft the seven benign files from Mehlman, and leave radial scar out until you add a source (TODO). The other way: wait for a breast pathology handout before any benign file.
11. **Second systems:** none new. The SSTI files stay skin-only (the infection section's groups don't fit them). Recommended: yes.
12. **New hubs:** `breast-lump` (finding parent), `brca-mutation` (genetic cause, reusable in §16), `axillary-lymphadenopathy` under `lymphadenopathy`, `skin-soft-tissue-infection` (mechanism parent). Recommended: yes.

---

## 7. Batch order

1. Eczema and psoriasis (2) — with the Q1 conversion
2. Immunobullous: pemphigus-vulgaris, bullous-pemphigoid (2)
3. Drug and target lesions: drug-eruption, erythema-multiforme, sjs-ten (3)
4. Bacterial SSTI: impetigo, cellulitis, necrotising-fasciitis (3)
5. Fungal and parasitic: dermatophyte-infection, scabies, cutaneous-larva-migrans (3), plus intertrigo on candidiasis
6. Epidermal tumours: seborrhoeic-keratosis, viral-wart, keratoacanthoma, basal-cell-carcinoma, cutaneous-squamous-cell-carcinoma (5)
7. Melanocytic: melanocytic-naevus, malignant-melanoma (2)
8. Benign breast: mastitis, fat-necrosis-breast, duct-ectasia, fibrocystic-change, fibroadenoma, phyllodes-tumour, intraductal-papilloma (7)
9. Breast cancer: breast-cancer, ductal-carcinoma-in-situ, invasive-breast-carcinoma, pagets-disease-of-the-nipple (4)

---

## Decisions (owner, 2026-11-11)

- Q1–Q12: all agreed as recommended.
- Q5: myositis (pyomyositis) is left out. **TODO (owner): add a source for myositis** (e.g. a handout in `Resources/`); then draft it in the skin-soft-tissue-infection group.
- Q8/Q10 TODOs carried over: **radial scar**, **adnexal tumours** and **skin metastases** wait for a source from the owner. Benign breast files rest on Mehlman HY Repro-OBGYN alone.

---

## Progress

**Batches 1–2 drafted (2026-11-11):**
- Batch 1: `eczema`, `psoriasis` (cause node → file, Q1)
- Batch 2: `pemphigus-vulgaris`, `bullous-pemphigoid`

**Changes to existing files and nodes:** the `psoriasis` cause node was deleted and replaced by the file; `psoriatic-arthritis` still starts its chain from it, and `psoriasis` now lists it as an outcome. No existing disease files edited.

**Changes from the sketch:**
- `immunobullous-blistering` sits under `antibody-mediated-cytotoxicity` (type II, per Mehlman), one level below `immune-mediated-injury`, so it is related to the other type II antibody diseases.
- Psoriasis uses `psoriatic-skin-inflammation` (K&C describes a Th17–dendritic cell–keratinocyte loop) in place of `keratinocyte-hyperproliferation`, which no page I read states.
- Psoriasis reuses `nail-dystrophy` (from psoriatic arthritis) in place of a new `nail-pitting`. Eczema reuses `raised-eosinophils-ige` (from asthma).
- New `skin-immunofluorescence` parent over the pemphigus (intercellular IgG) and pemphigoid (linear BMZ IgG/C3) patterns.
- Eczema's contact form uses a new `contact-hypersensitivity` mechanism (under `immune-mediated-injury`) and a `contact-allergen` cause; `contact-site-eczema` is marked `only: contact-allergen`.
- Psoriasis's cardiovascular, metabolic and depression associations are left out (association-only, §12 case 3).

**Loose items:** none added.

**Batches 3–4 drafted (2026-11-11):**
- Batch 3: `drug-eruption` (named "Cutaneous drug eruption"), `erythema-multiforme`, `sjs-ten`
- Batch 4: `impetigo`, `cellulitis` (with erysipelas), `necrotising-fasciitis`

**Changes to existing files:** `eczema` gained `impetigo` as an outcome (chain `skin-barrier-dysfunction → impetigo`, K&C p.661).

**Changes from the sketch:**
- No `keratinocyte-necrosis` shared by EM and SJS/TEN: K&C gives no mechanism for EM. EM has its own `erythema-multiforme-reaction` (HSV, Mycoplasma, drugs); drug eruption and SJS/TEN share the new `drug-hypersensitivity` hub, and SJS/TEN goes on to `epidermal-detachment`. EM and SJS/TEN are linked through `target-lesions` and `oral-mucosal-erosions` (shared with pemphigus).
- DRESS is an outcome node of the drug eruption file (K&C p.698), not a file; AGEP left out.
- One `culprit-drug` cause node for all three drug files; the note on each edge names the drugs for that reaction.
- Impetigo has no PSGN link: the K&C page I read (p.1360) names throat, ear and cellulitis, not impetigo. Cellulitis carries it (GAS only).
- Cellulitis also reaches `s-aureus-bacteraemia` through the existing `skin-soft-tissue-entry` (S. aureus only, K&C p.536).
- Gas gangrene, folliculitis, boils, ecthyma, SSSS and toxic shock: left out (not named in the syllabus).

**Loose items:** none added.

**Batches 5–6 drafted (2026-11-11):**
- Batch 5: `dermatophyte-infection`, `scabies`, `cutaneous-larva-migrans`
- Batch 6: `seborrhoeic-keratosis`, `viral-wart`, `keratoacanthoma`, `basal-cell-carcinoma`, `cutaneous-squamous-cell-carcinoma`

**Changes to existing files and nodes:**
- `candidiasis` renamed "Candidiasis (oral, oesophageal and skin)"; new `candida-skin-overgrowth` chain from `candida`, `obesity` and `diabetes-mellitus` to the new `candidal-intertrigo` finding (Q6); K&C p.674 and p.679 added to its sources.
- `laryngeal-wart-growth` (§9) gained the new parent `hpv-wart-growth`, beside `cutaneous-wart-growth`, so viral wart and laryngeal papillomatosis are related.

**Changes from the sketch:**
- CLM uses a new `animal-hookworm` organism under `hookworm` (K&C: non-human Ancylostoma species), so it stays related to hookworm in iron deficiency without claiming the human worm causes it.
- BCC and SCC have their own transformation nodes (`basal-cell-transformation`, `squamous-keratinocyte-transformation`) under a shared `keratinocyte-malignant-transformation`.
- Keratoacanthoma uses `self-regressing-epidermal-tumour`, not `benign-keratinocyte-proliferation` (K&C doesn't call it benign and says it's hard to tell from SCC). Its `uv-light` link rests on "sun-exposed skin in later life".
- Scabies reaches PSGN and rheumatic fever directly from the infestation (K&C p.674 lists them as complications without naming the route), not through impetigo.
- Tinea links to `cellulitis` as an outcome (toe-web tinea as a risk factor, K&C p.669).
- Left out (not named in the syllabus): molluscum, orf, pityriasis versicolor, lice, dermatofibroma, cysts, keloids.

**Loose items:** none added.

**Batches 7–8 drafted (2026-11-11):**
- Batch 7: `melanocytic-naevus`, `malignant-melanoma`
- Batch 8: `mastitis`, `fat-necrosis-breast`, `duct-ectasia`, `fibrocystic-change`, `fibroadenoma`, `phyllodes-tumour`, `intraductal-papilloma` (all from Mehlman HY Repro-OBGYN; phyllodes also K&C p.121)

**Changes to existing files:** none.

**Changes from the sketch:**
- No `dysplastic-naevus` cause node: the `melanocytic-naevus` file (acquired, congenital and atypical in one) starts melanoma's chain and lists melanoma as its outcome.
- Melanoma's spread uses `lymphatic-spread → lymphadenopathy` and `metastatic-spread → distant-metastases`; no specific organ metastases (K&C p.691 names none).
- `breast-lump` hub children so far: mobile rubbery (fibroadenoma), tender red (mastitis), cyst (fibrocystic), fast-growing (phyllodes), post-traumatic (fat necrosis). The cancer lump comes in batch 9. `nipple-discharge` parent with `bloody-nipple-discharge` (papilloma).
- Fibroadenoma and phyllodes share `fibroepithelial-proliferation` directly (no separate phyllodes mechanism); the phyllodes note says benign or malignant. No spread outcome for phyllodes: no source names one.
- The benign breast files without a named cause (duct ectasia, fibrocystic change, fibroadenoma, phyllodes, papilloma) start from their mechanism, as `primary-bone-tumour` does.
- Left out: large congenital naevi's neurological complications (epilepsy), galactocele, simple cysts as a file, gynaecomastia, LCIS (batch 9 note).

**Thinnest:** the seven benign breast files (one Mehlman row each).

**Loose items:** none added.

**Batch 9 drafted (2026-11-11):** `breast-cancer` (umbrella), `ductal-carcinoma-in-situ`, `invasive-breast-carcinoma`, `pagets-disease-of-the-nipple`.

**Changes to existing files:** none. New links into existing files from the new side only: invasive breast carcinoma → `bone-metastases` (K&C p.485), `brain-metastases` (p.874), `lung-metastases` (p.980–981).

**Changes from the sketch:**
- The umbrella carries only the shared causes (`brca-mutation`, `long-oestrogen-exposure` → `breast-epithelial-transformation`); it has no findings, as DCIS (screen-detected) and invasive cancer (lump) present differently.
- DCIS links on to `invasive-breast-carcinoma` and `pagets-disease-of-the-nipple` as outcomes; Paget's chain starts from the DCIS file (Mehlman: often its skin extension; K&C p.685: a sign of ductal carcinoma).
- Receptor status is a `breast-receptor-status` histology parent with `er-pr-positive` and `her2-amplified`; triple-negative is a note.
- LCIS, inflammatory carcinoma and the rarer histological types are notes, not files. `axillary-lymphadenopathy` is new under `lymphadenopathy`; `hard-irregular-breast-lump` completes the `breast-lump` hub.
- Hypercalcaemia of malignancy is not linked (no page I read ties it to breast cancer here).

§15 fully drafted: 31 files with skin and breast as their home system (plus intertrigo on `candidiasis`). Owner TODOs: sources for myositis, radial scar, adnexal tumours, skin metastases, and better sources for the benign breast files.

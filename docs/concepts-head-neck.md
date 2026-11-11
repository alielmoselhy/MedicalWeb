# Step H1 — Head and neck parent concepts (draft for review, 2026-11-10)

Same rules and legend as `concepts-nervous.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node or file, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [head-neck]` and `group: head-neck-disease` (the section's only group) unless noted.

Sources (headings listed; offsets checked):
- K&C ch.6 Malignant disease (−21): HPV/EBV and cancer p.101, **head and neck cancer p.133** (risk factors, nodal spread, red flags, staging, treatment), cancer of unknown primary p.134 (squamous cervical nodes: 80% occult head and neck primary)
- K&C ch.27 ENT and eye (**−19**, new; checked on "Disorders of the ear 901", "nose 907", "throat 909"): throat symptoms p.901 (dysphonia, odynophagia), nasal tumours in the nasal-obstruction list p.908, laryngeal SCC p.910, tonsillitis, glandular fever and quinsy p.911
- K&C ch.3 Immunity (−15): **IgG4 disease p.65** (Th2-driven fibro-inflammation, sites; Box 3.24 is a figure, not in the text)
- K&C ch.35 Biliary and pancreas (−14): IgG4 cholangitis p.1321, type 1 autoimmune pancreatitis p.1330
- Mehlman HY Gastro (pleomorphic adenoma, Warthin, mucoepidermoid carcinoma; leukoplakia), HY Pulmonary (nasopharyngeal carcinoma, laryngeal cancer, quinsy), HY Pathology (EBV, HPV 16/18), HY Anatomy-MSK-Rheum and HY Endocrine (branchial and thyroglossal cysts)
- **No K&C text at all on salivary gland tumours.** Mehlman is the only source (Q3).
- No LMC head and neck handouts in `Resources/` yet.

Syllabus §9 has one group, **head and neck disease**: a differential for a neck mass (infection, lymphoproliferative disease, metastatic disease, salivary gland tumours incl. pleomorphic adenoma and Warthin's tumour, granulomatous disease, IgG4 disease), and the classification of head and neck tumours with the role of HPV (squamous cell carcinoma, nasopharyngeal carcinoma).

**This section is mostly a differential.** Most of the neck-mass causes already have files: `infectious-mononucleosis`, `tuberculosis` (outcome `lymph-node-tb`), `hiv`, `hodgkin-lymphoma`, `follicular-lymphoma`, `diffuse-large-b-cell-lymphoma`, `chronic-lymphocytic-leukaemia`, `sarcoidosis`, `papillary-thyroid-carcinoma`, `sjogrens-syndrome`. So §9 is a few new files plus a shared neck-lump finding that ties the differential together (Q2).

---

## 1. Disease list (syllabus §9): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| head-neck-disease | head-neck-squamous-cell-carcinoma, nasopharyngeal-carcinoma | none (Q1) |
| head-neck-disease | salivary-gland-tumour (umbrella), pleomorphic-adenoma, warthin-tumour, mucoepidermoid-carcinoma | salivary-gland-tumour (Q3) |
| head-neck-disease | igg4-related-disease | none |
| head-neck-disease | tonsillitis (Q5) | none |

About 8 files.

**Not files here, and why:**
- Neck mass: a presentation, so a **finding** (`neck-lump`, Q2) that every cause lists.
- Lymphoproliferative, granulomatous and metastatic causes: existing files; §9 adds the neck-lump findings to them where a source says so (Q6).
- Cancer of unknown primary: a note on the HNSCC nodal-spread edge (K&C p.134), not a file.
- Quinsy: an **outcome** of tonsillitis (new **`peritonsillar-abscess`**, reached through the `abscess-formation` mechanism).
- Leukoplakia, oral lichen planus: **cause** nodes (premalignant conditions) for HNSCC.
- Laryngeal papillomatosis, thyroglossal and branchial cysts: not in the syllabus; left out (Q7).
- Staging (TNM, PET, MRI), cetuximab, cisplatin, nivolumab: notes.

**Existing nodes that become files:** none.

**Second systems:** `igg4-related-disease` → `[head-neck, immunology]` (Q8). The rest head-neck only.

---

## 2. Cause parents

- Reuse `smoking`, `excess-alcohol` (*HNSCC ~ oesophageal SCC ~ squamous lung cancer*)
- Reuse `hpv-infection` (*HNSCC ~ penile cancer*; cervix later in §16), `ebv-infection` (*NPC ~ Burkitt ~ Hodgkin ~ MS*)
- New **oral-premalignant-lesion** (condition) with children **leukoplakia** and **oral-lichen-planus**? Or one node for both. K&C p.133 names lichen planus; Mehlman names leukoplakia.
- New **chronic-mucosal-irritation** (risk-factor): poor oral hygiene, sharp teeth, spices (K&C p.133)
- Reuse `group-a-streptococcus` (tonsillitis; *~ rheumatic fever, cellulitis*), `epstein-barr-virus` (glandular-fever tonsillitis)
- IgG4: K&C names no trigger, so the chain starts from a new cause node **igg4-autoimmunity** (condition), the way other autoimmune files start from their own autoimmunity node.

## 3. Mechanism parents

- Reuse `carcinogen-induced-transformation` (HNSCC from tobacco and alcohol, as oesophageal SCC does) and `viral-oncogenesis` (HPV in HNSCC, EBV in NPC)
- New **lymphatic-spread** under `metastatic-spread`: cancer cells reaching the regional (cervical) nodes first. Reusable later for breast, cervix, melanoma.
- New **benign-salivary-neoplasm** (no parent, as `benign-thyroid-neoplasm` and `benign-liver-tumour` have none). Mucoepidermoid carcinoma reaches **salivary-malignant-transformation** under `malignant-transformation`.
- New **igg4-plasma-cell-infiltration** under `immune-mediated-injury` (Th2 cells → macrophage and myofibroblast activation → fibrosis and IgG4 plasma cells, K&C p.65); reuse a fibrosis node if one fits
- Reuse `abscess-formation` (quinsy), new **tonsillar-infection** (or reuse `pharyngeal`-type node if one exists; none found)

## 4. Finding parents

- New **neck-lump** (sign), the hub for the whole differential (Q2), with children:
  - `cervical-lymphadenopathy` (moved here from `lymphadenopathy`, Q2)
  - new **tender-cervical-lymphadenopathy** (infection: tonsillitis, glandular fever)
  - new **salivary-gland-swelling** (salivary tumours, IgG4, Sjögren's?)
- New **persistent-hoarseness** (symptom; laryngeal SCC red flag, K&C p.133, p.901)
- New **persistent-oral-ulcer-or-lump** (sign; oral cancer red flag, K&C p.133)
- New **nasal-obstruction-epistaxis**? K&C only lists nasopharyngeal tumours among causes of nasal obstruction (p.908). Reuse `nasal-blockage`.
- Reuse `dysphagia`, `weight-loss`, `sore-throat`, `fever`
- Histology: new **mixed-epithelial-stroma** (pleomorphic adenoma), **lymphoid-stroma-oncocytes**? (Warthin: Mehlman says only "lymphoid stroma"), **igg4-rich-infiltrate** (K&C p.1321); lab: new **raised-serum-igg4** (K&C p.65, p.1330)
- Quinsy signs: new **trismus-uvular-deviation** (K&C p.911)

## 5. Outcome parents

- Reuse `distant-metastases`; new **lung-metastases** under it (K&C p.133: lungs and bones commonest after nodes); reuse `bone-metastases` (file) (*~ prostate, breast, lung*)
- New **peritonsillar-abscess** (quinsy) from tonsillitis
- IgG4: reuse `chronic-pancreatitis` (type 1 autoimmune pancreatitis, K&C p.1330) and a new **igg4-sclerosing-cholangitis** outcome (K&C p.1321), or link `primary-sclerosing-cholangitis` only as a mimic in a note
- Reuse `rheumatic-fever`/`post-streptococcal-glomerulonephritis` for tonsillitis only if a page I read says so (K&C p.911 doesn't)

---

## 6. Questions before drafting

1. **HNSCC and nasopharyngeal carcinoma: two sibling files, no umbrella.** HNSCC holds oral, oropharyngeal and laryngeal SCC in one file, with `only: hpv-infection` marking the HPV (oropharyngeal) route. NPC is its own file because the syllabus names it and its cause (EBV) differs. They link through `lymphatic-spread`, `neck-lump` and `viral-oncogenesis`. Recommended: yes. The other way: a `head-neck-cancer` umbrella with HNSCC and NPC as children (sources are too thin to give the umbrella much of its own).
2. **The neck-lump hub.** New finding `neck-lump`, and **move `cervical-lymphadenopathy` under it** (it is now under `lymphadenopathy`; 5 users: Hodgkin, Kawasaki, papillary thyroid, thyroid cancer, TB). Then every neck-mass cause becomes "related" on the Differential page. Cost: cervical lymphadenopathy stops being a sibling of `generalised-lymphadenopathy`. Recommended: yes. The other way: leave the tree and add `neck-lump` as a separate finding that each file lists beside its lymphadenopathy.
3. **Salivary gland tumours:** umbrella `salivary-gland-tumour` with `pleomorphic-adenoma`, `warthin-tumour` and `mucoepidermoid-carcinoma`. **Mehlman HY Gastro is the only source** (three short rows; no K&C text), so these will be the thinnest files in the graph. Recommended: draft them from Mehlman now and mark them, as with chondroma, for a source you add later. The other way: wait for a handout, or skip mucoepidermoid (the syllabus names only the two benign ones).
4. **IgG4-related disease as one file**, with outcomes `chronic-pancreatitis` (type 1 AIP) and a new IgG4 cholangitis outcome. Recommended: yes. Should `chronic-pancreatitis` also gain a chain line starting from `igg4-related-disease`? Recommended: yes, since K&C p.1330 says so.
5. **Infection in the neck:** one new file `tonsillitis` (group A strep, with glandular fever as an `epstein-barr-virus` route), quinsy as its outcome. Recommended: yes. The other way: no new infection file; only add neck-lump findings to IM, TB and HIV.
6. **Cross-file links into the existing neck-mass causes** (only where a page I read says so): IM (tender nodes), TB (`lymph-node-tb` → neck-lump), Hodgkin and follicular lymphoma (already cervical), sarcoidosis, toxoplasmosis (K&C p.593: lymphadenopathy). Recommended: yes, as part of batch 3.
7. **Leave out** laryngeal papillomatosis, thyroglossal and branchial cysts (not in the syllabus; Mehlman only). Recommended: yes.
8. **Second systems:** `igg4-related-disease` → `[head-neck, immunology]`. Recommended: yes. Tonsillitis → `[head-neck, infection]`? Recommended: no (the infection section's groups don't fit it).

---

## 7. Batch order

1. Tumours: head-neck-squamous-cell-carcinoma, nasopharyngeal-carcinoma (2) — plus the Q2 neck-lump hub
2. Salivary: salivary-gland-tumour, pleomorphic-adenoma, warthin-tumour, mucoepidermoid-carcinoma (4)
3. Inflammatory and infective: igg4-related-disease, tonsillitis (2), with the Q6 cross-links into existing files
4. Congenital and benign (added by Q7): thyroglossal-duct-cyst, branchial-cyst, laryngeal-papillomatosis (3)

The neck-lump hub comes first so every later file can use it.

---

## Decisions (owner, 2026-11-11)

- Q1–Q6 and Q8: agreed as recommended.
- **Q7: not agreed.** Thyroglossal duct cyst, branchial cyst and laryngeal papillomatosis **become files** (batch 4). Mehlman is the only source (HY Endocrine, HY Anatomy-MSK-Rheum, HY Pulmonary); K&C has nothing on them except that HPV 6/11 warts don't turn malignant (ch.37).
- **TODO (owner):** salivary tumour files rest on Mehlman HY Gastro alone; add a source (e.g. a pathology handout) when you have one.

---

## Progress

**Batches 1–2 drafted (2026-11-11):**
- Batch 1: `head-neck-squamous-cell-carcinoma`, `nasopharyngeal-carcinoma`
- Batch 2: `salivary-gland-tumour` (umbrella), `pleomorphic-adenoma`, `warthin-tumour`, `mucoepidermoid-carcinoma`

**Changes to existing nodes:** `cervical-lymphadenopathy` moved from parent `lymphadenopathy` to the new `neck-lump` (Q2). Its 5 users (Hodgkin, Kawasaki, papillary thyroid, thyroid cancer, TB) are unchanged. No existing disease files edited.

**Changes from the sketch:**
- One cause node `oral-premalignant-lesion` (leukoplakia or lichen planus), not a parent with two children. It and `chronic-mucosal-irritation` feed the existing `inflammation-driven-transformation`.
- New `head-neck-primary-tumour` and `nasopharyngeal-tumour` mechanisms (as `oesophageal-tumour`) between transformation and the findings.
- New `salivary-gland-neoplasm` mechanism for the umbrella (as `primary-bone-tumour-growth`), with `benign-salivary-neoplasm` under it; `salivary-malignant-transformation` sits under `malignant-transformation` instead.
- `hoarseness` is a general symptom (not "persistent"), so later files can reuse it. New `epistaxis` has no parent (`mucocutaneous-bleeding` is a bleeding-tendency sign).
- Mehlman doesn't say parotid, so the finding is `salivary-gland-swelling`, not parotid.
- No IgG4 or tonsillitis nodes yet (batch 3).

**Thinnest:** the four salivary files (three short Mehlman rows); nasopharyngeal carcinoma (EBV, neck nodes, epistaxis only; K&C's unilateral serous otitis line is about sinonasal malignancy, so not used).

**Loose items:** none added.

**Batches 3–4 drafted (2026-11-11):**
- Batch 3: `igg4-related-disease` (`[head-neck, immunology]`), `tonsillitis`
- Batch 4: `thyroglossal-duct-cyst`, `branchial-cyst`, `laryngeal-papillomatosis`

**Changes to existing files and nodes (batches 3–4):**
- `chronic-pancreatitis`: new chain line `igg4-related-disease → pancreatic-fibrosis` (type 1 AIP, K&C p.1330) (Q4).
- `infectious-mononucleosis`: `lymphadenopathy` replaced by the more specific `reactive-cervical-lymphadenopathy` (chain and findings; note and source unchanged).
- `follicular-lymphoma`: new `cervical-lymphadenopathy` link and finding (Mehlman HY Pathology: painless lateral neck lump waxing and waning); Mehlman HY Pathology added to its sources.
- `stridor-tracheal-compression` (endocrine) gained the new parent `stridor`.

**Changes from the sketch:**
- `tender-cervical-lymphadenopathy` became `reactive-cervical-lymphadenopathy` ("enlarged neck nodes with a sore throat"): no page I read says the nodes are tender (K&C p.495 pairs neck nodes with big tonsils).
- IgG4 also links to existing `tubulointerstitial-nephritis` (K&C p.1386), `urinary-tract-obstruction` via retroperitoneal fibrosis (p.1379) and `goitre` (Riedel's, p.621). `retroperitoneal-fibrosis` stays a cause node in urinary-tract-obstruction.
- Tonsillitis gained `rheumatic-fever` (K&C p.544) and `post-streptococcal-glomerulonephritis` (p.1360) as GAS-only outcomes.
- **Q6 cross-links not made:** sarcoidosis (K&C lists only "lymphadenopathy", not neck nodes), toxoplasmosis (the only file is cerebral toxoplasmosis in HIV, not acute nodal toxo), DLBCL and CLL (generalised nodes only), HIV (generalised). TB, Hodgkin and papillary thyroid already had `cervical-lymphadenopathy`.

**Thinnest:** thyroglossal duct cyst and branchial cyst (one Mehlman row each, one finding each).

§9 fully drafted: 13 files with head and neck as their home system. Loose items unchanged (none added).

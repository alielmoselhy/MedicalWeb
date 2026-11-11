# Step E1 — Endocrine parent concepts (draft for review, 2026-11-10)

Same rules and legend as `concepts-nervous.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node or file, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [endocrine]` unless noted.

Sources (headings listed; offsets checked on two headings each):
- K&C ch.21 Endocrinology (**−22**, new; checked on Clinical skills 584 and Introduction 586): dynamic tests p.584–586, pituitary p.591–597, adrenal p.598–609, thyroid p.609–622, MEN and polyglandular p.648–650, insulinoma and hypoglycaemia p.647–648, acromegaly p.637–638, prolactinoma p.639–641
- K&C ch.23 Diabetes mellitus (**−22**, new; checked on Clinical skills 699 and Introduction 702): classification and aetiology p.704–709, presentation and diagnosis p.710–711, hypoglycaemia p.716–717, DKA and HHS p.722–725, complications p.725–735, pregnancy and gestational diabetes p.739–740
- Mehlman HY Endocrine (thyroid, adrenal, pituitary, islet cell, MEN tables); HY Pathology for tumour genes and histology
- No LMC endocrine handouts in `Resources/` yet.

Syllabus §11 has four groups: endocrine biochemistry (Cushing's, Addison's, Conn's, hyper- and hypothyroidism, acromegaly, hypopituitarism, dynamic tests), adrenal and pituitary neoplasia (phaeochromocytoma, adrenocortical adenoma/carcinoma, pituitary adenoma, MEN), thyroid (multinodular goitre, follicular adenoma, the four thyroid cancers, the thyroid nodule, Hashimoto's, Graves'), and glucose homeostasis (type 1, type 2, insulin resistance, MODY, gestational diabetes, hypoglycaemia, insulinoma).

---

## 1. Disease list (syllabus §11): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| endocrine-biochemistry | cushings-syndrome, adrenal-insufficiency, primary-hyperaldosteronism, hyperthyroidism, hypothyroidism, hypopituitarism | hyperthyroidism → graves-disease; hypothyroidism → hashimotos-thyroiditis |
| adrenal-pituitary | phaeochromocytoma, adrenocortical-tumour, pituitary-adenoma, prolactinoma, acromegaly, multiple-endocrine-neoplasia | pituitary-adenoma → prolactinoma, acromegaly |
| thyroid | graves-disease, hashimotos-thyroiditis, multinodular-goitre, follicular-adenoma, thyroid-cancer, papillary-thyroid-carcinoma, follicular-thyroid-carcinoma, medullary-thyroid-carcinoma, anaplastic-thyroid-carcinoma | thyroid-cancer → the four types |
| glucose | diabetes-mellitus, type-1-diabetes, type-2-diabetes, mody, gestational-diabetes, hypoglycaemia, insulinoma | diabetes-mellitus → type 1, type 2, MODY, gestational |

About 28 files. Group exceptions (like `vascular-dementia`):
- graves-disease and hashimotos-thyroiditis sit in **thyroid** (where the syllabus names them), under umbrellas in endocrine-biochemistry.
- acromegaly sits under `pituitary-adenoma` but in **endocrine-biochemistry**, where the syllabus lists it.

**Not files here, and why:**
- Cushing's disease: a cause inside `cushings-syndrome` (its chain starts from the `pituitary-adenoma` file), not its own file (Q5).
- Toxic multinodular goitre and toxic adenoma: links from `multinodular-goitre` and `follicular-adenoma` to `hyperthyroidism`.
- De Quervain's, postpartum and amiodarone thyroiditis: causes in `hyperthyroidism` and `hypothyroidism`.
- Thyroid nodule work-up (ultrasound, FNA): findings in the thyroid files.
- Dynamic tests (dexamethasone suppression, Synacthen, glucose tolerance): findings.
- Insulin resistance: a mechanism hub shared by many files, not a file (Q10).
- DKA, HHS, retinopathy, neuropathy, diabetic foot: outcome nodes (Q11). `diabetic-nephropathy` stays a file.
- Hyperparathyroidism and calcium: syllabus §14 "Calcium homeostasis". SIADH and DI: §3. CAH, PCOS, hypogonadism, Sheehan's, apoplexy: not in §11's list, so notes (Q12).
- Thyroid lymphoma, Nelson's syndrome, Kallmann's: notes.

**Existing nodes that become files (delete the node, same id, §5.5):**
- `diabetes-mellitus` (cause, under `modifiable-risk-factor`; used by 24 files) → the umbrella file. Every link keeps working; it leaves `modifiable-risk-factor` (Q1).
- `hypothyroidism` (cause; used by `secondary-hyperlipidaemia`) → the umbrella file.
- `primary-hyperaldosteronism` and `phaeochromocytoma` (causes under `endocrine-hypertension-cause`; used by `secondary-hypertension`, RCC) → files. `endocrine-hypertension-cause` is then left with no children and would be deleted (Q3).
- `adrenal-insufficiency` (outcome; used by TB) → the file (Q4).
- Outcome nodes that can take a disease file as parent: `pancreatogenic-diabetes` and `cf-related-diabetes` → parent `diabetes-mellitus`; `ectopic-cushing` → parent `cushings-syndrome` — *pancreatitis ~ CF ~ diabetes; SCLC ~ Cushing's*.

**Second systems (Q8):**
- graves-disease, hashimotos-thyroiditis, type-1-diabetes, adrenal-insufficiency: `[endocrine, immunology]` (immunology Q1 deferred them here)
- gestational-diabetes: `[endocrine, female-genital]`
- pituitary-adenoma: `[endocrine, nervous]`

---

## 2. Cause parents

**Genetic**
- `hla-b8-dr3` reused (T1DM, Graves', Addison's, Hashimoto's) — *T1DM ~ SLE ~ coeliac*; `hla-dq2-dq8` reused for T1DM if the page names it
- **beta-cell-gene-defect** (MODY: HNF1A, GCK, HNF4A)
- **men1-mutation** and **ret-mutation** (MEN2A/2B, familial medullary)
- `vhl-mutation` reused for phaeochromocytoma — *phaeo ~ RCC*; NF1 in a note

**Risk factors and conditions**
- `obesity`, `older-age`, `pregnancy` reused (T2DM, gestational) — *T2DM ~ CAD ~ MASLD*
- **physical-inactivity**, **family-history-t2dm**, **south-asian-african-ethnicity** only if the pages give them separately; otherwise notes
- `autoimmune-predisposition` reused (polyglandular autoimmunity) — *Addison's ~ AIH ~ PBC*
- **iodine-deficiency** (endemic goitre, hypothyroidism)
- **exogenous-glucocorticoid** (drug: commonest Cushing's; adrenal suppression) — new or reuse `iatrogenic-immunosuppression` if the owner prefers (Q9)
- **thyroid-affecting-drug** (amiodarone, lithium, immune checkpoint inhibitors) as a cause group
- **head-neck-irradiation** (papillary carcinoma)
- **hypoglycaemic-drug** (insulin, sulphonylureas) as a cause group; `alcohol-excess` reused if it exists under that id
- `mycobacterium-tuberculosis` reused (Addison's) — *Addison's ~ TB*; `adrenal-metastases` and `waterhouse-friderichsen-syndrome` already exist as outcomes and feed adrenal-insufficiency by a chain link

---

## 3. Mechanism parents

**Hormone excess and deficiency** (the syllabus's own framing; Q2)
- New parent **`hormone-excess`** with kinds: **cortisol-excess**, **aldosterone-excess**, **thyroid-hormone-excess**, **gh-igf1-excess**, **prolactin-excess**, **insulin-excess** (insulinoma, drugs). `catecholamine-excess` already exists under `neurohormonal-activation`; it keeps that parent (one parent only) — *phaeo ~ heart failure*.
- New parent **`hormone-deficiency`** with kinds: **cortisol-deficiency**, **mineralocorticoid-deficiency**, **thyroid-hormone-deficiency**, **insulin-deficiency**, **anterior-pituitary-hormone-deficiency**
- *Cushing's ~ Conn's ~ Graves' ~ acromegaly; Addison's ~ hypothyroidism ~ T1DM ~ hypopituitarism*

**Autoimmune**
- `receptor-autoantibody` reused: Graves' stimulating TSH-receptor antibody — *Graves' ~ myasthenia gravis*
- New **`autoimmune-gland-destruction`** under `immune-mediated-injury`, with kinds **autoimmune-thyroid-destruction** (Hashimoto's), **autoimmune-beta-cell-destruction** (T1DM), **autoimmune-adrenalitis** (Addison's) — *Hashimoto's ~ T1DM ~ Addison's*

**Glucose**
- **insulin-resistance** (T2DM, gestational, Cushing's, acromegaly) — the hub; *T2DM ~ MASLD ~ gestational ~ Cushing's*
- **beta-cell-failure** (T2DM progression, MODY)
- **hyperglycaemia** → **osmotic-diuresis** → `polyuria-nocturia` and new **polydipsia**
- **ketogenesis** (insulin deficiency) → DKA
- **microvascular-glycation-damage** (AGEs, polyol pathway) → retinopathy, neuropathy, and the existing `diabetic-nephropathy` file
- Macrovascular disease reuses the existing atherosclerosis hubs from `diabetes-mellitus` — already linked in 24 files
- **neuroglycopenia** and **adrenergic-hypoglycaemia-response** (hypoglycaemia symptoms)

**Tumours**
- `malignant-transformation` gains **thyroid-follicular-cell-malignancy** (papillary, follicular, anaplastic) and **c-cell-malignancy** (medullary) — *the thyroid cancers beside every other primary*
- New **`hormone-secreting-adenoma`** (benign functioning tumour): pituitary, adrenocortical, phaeochromocytoma, insulinoma, toxic adenoma — *every functioning endocrine tumour side by side*. The alternative is to go straight from cause to the hormone-excess kind (Q6).
- `intracranial-tumour-growth` reused for pituitary mass effect, plus new **optic-chiasm-compression** — *pituitary adenoma ~ brain tumours*
- `acth-secretion` (ectopic, SCLC) reused as a Cushing's cause — *Cushing's ~ SCLC*
- **thyroid-follicular-hyperplasia** (multinodular goitre: iodine deficiency, TSH drive)

---

## 4. Finding parents

- **`thyroid-function-test`** (lab): **suppressed-tsh-raised-t4**, **raised-tsh-low-t4**, **anti-tpo-antibodies**, **tsh-receptor-antibodies**
- **`adrenal-function-test`** (lab): **failed-dexamethasone-suppression**, **low-cortisol-failed-synacthen**, **raised-aldosterone-renin-ratio**, **raised-metanephrines**
- Glucose labs: **diabetic-glucose-hba1c** (fasting ≥7, random ≥11.1, HbA1c ≥48), **ketonaemia-ketonuria**, **low-blood-glucose**, **raised-insulin-c-peptide**, **islet-autoantibodies**. `metabolic-acidosis` reused, gaining **high-anion-gap-acidosis** as a sibling of `normal-anion-gap-acidosis` — *DKA ~ RTA ~ AKI*
- Other labs reused: `hyponatraemia`, `hyperkalaemia` (Addison's) — *Addison's ~ AKI ~ type 4 RTA*; `hypokalaemia` (Conn's, Cushing's); `hypercalcaemia`; `raised-triglycerides`
- **raised-igf1-failed-gh-suppression**, **raised-prolactin**, **raised-calcitonin**
- Imaging: **pituitary-mass-on-mri** under `brain-mass-lesion` — *pituitary ~ brain tumours*; **adrenal-mass-on-ct**; **thyroid-nodule-on-ultrasound**
- Histology: **thyroid-fna-cytology**, **papillary-nuclear-features** (psammoma bodies), **follicular-capsular-invasion**, **medullary-amyloid-stroma**
- Signs and symptoms:
  - **goitre** (sign) with kinds **diffuse-goitre** and **nodular-goitre**; **thyroid-nodule**
  - Hyperthyroid: `weight-loss`, `tachycardia`, `palpitations`, `diaphoresis` reused; new **heat-intolerance**, **fine-tremor**, **lid-lag-retraction**; Graves' only **graves-orbitopathy** and **pretibial-myxoedema**
  - Hypothyroid: `fatigue`, `constipation` reused; new **cold-intolerance-weight-gain**, **dry-skin-hair-loss**, **bradycardia** (if no cardio node exists)
  - Cushing's: **central-obesity-striae**, **proximal-myopathy**, `raised-blood-pressure`, bruising
  - Addison's: **hyperpigmentation**, `hypotension` reused
  - Phaeo: **paroxysmal-headache-sweating-palpitations**
  - Acromegaly: **acral-enlargement-coarse-facies**; prolactinoma: **galactorrhoea-amenorrhoea**
  - Pituitary mass: **bitemporal-hemianopia** under `focal-neurological-deficit` — *pituitary ~ stroke*; `headache` reused
  - Diabetes: `polyuria-nocturia`, **polydipsia**, `weight-loss`, `peripheral-neuropathy` reused
  - Hypoglycaemia: `diaphoresis`, `palpitations` reused; **neuroglycopenic-symptoms** (confusion, seizures, coma)

---

## 5. Outcome parents

- **thyroid-storm**, **myxoedema-coma**, **adrenal-crisis** (parent: the `adrenal-insufficiency` file)
- `atrial-fibrillation` (hyperthyroidism), `osteoporosis` (Cushing's, hyperthyroidism) reused — *Graves' ~ AF ~ stroke*
- `secondary-hypertension` (file) from Conn's, phaeo, Cushing's, acromegaly — already the hub
- `secondary-hyperlipidaemia` (file) already links from `hypothyroidism`
- **diabetic-ketoacidosis**, **hyperosmolar-hyperglycaemic-state** (Q11); `hypovolaemic-shock` reused from DKA if the page says so
- **diabetic-retinopathy**, **diabetic-neuropathy**, **diabetic-foot-ulcer**; `diabetic-nephropathy` (file); `acute-coronary-syndrome`, `ischaemic-stroke`, `peripheral-arterial-disease` (files) already link from `diabetes-mellitus`
- `masld` (file) from insulin resistance — *T2DM ~ MASLD*
- **fetal-macrosomia-neonatal-hypoglycaemia** (gestational); `type-2-diabetes` (file) from gestational
- `hypoglycaemia` (file) from insulinoma, `adrenal-insufficiency`, hypopituitarism
- **pituitary-apoplexy**; `hypopituitarism` (file) from pituitary adenoma
- MEN: links to `pituitary-adenoma`, `insulinoma`, `medullary-thyroid-carcinoma`, `phaeochromocytoma` and `hypercalcaemia` — *MEN ties the tumour files together*

---

## 6. Questions before drafting

1. **`diabetes-mellitus` becomes the umbrella file** (same id). Every one of its 24 links keeps working, and `pancreatogenic-diabetes` and `cf-related-diabetes` get it as their parent. It leaves `modifiable-risk-factor`, so it is no longer a sibling of smoking and obesity. Recommended: yes. The other way: keep the cause node and give the umbrella a new id (e.g. `diabetes`), leaving two diabetes ids.
2. **`hormone-excess` and `hormone-deficiency` parents** over the specific hormone states. Recommended: yes, since the syllabus asks for "mechanisms of hormone excess and deficiency" and it puts Cushing's beside Conn's and Addison's beside hypothyroidism. The other way: the specific states with no shared parent.
3. **Phaeochromocytoma and primary hyperaldosteronism become files** with the same ids, and `endocrine-hypertension-cause` (left empty) is deleted. Recommended: yes. Secondary hypertension keeps both links.
4. **`adrenal-insufficiency` as one file** ("Adrenal insufficiency (Addison's disease)"), with primary causes (autoimmune, TB, metastases, haemorrhage) and secondary ones (pituitary, stopping steroids) marked with `only:`. Recommended: one file. The other way: an umbrella with Addison's and secondary hypoadrenalism as children.
5. **Cushing's: one file** with four causes (exogenous steroids, pituitary adenoma, adrenal adenoma, ectopic ACTH). Recommended: one file. The other way: a separate Cushing's disease file under `pituitary-adenoma`.
6. **A shared `hormone-secreting-adenoma` mechanism** over the functioning endocrine tumours. Recommended: yes. The other way: no shared tumour step, linked only through hormone excess.
7. **Thyroid cancer as an umbrella with four children**, or one file using `only:`. Recommended: the umbrella, since cell of origin, spread, markers and prognosis all differ.
8. **Second systems** as listed in §1. Recommended: as listed.
9. **Steroid drug cause:** new `exogenous-glucocorticoid`, or reuse `iatrogenic-immunosuppression` (long-term steroids and other immunosuppressants). Recommended: a new node, since Cushing's and adrenal suppression are about the steroid, not immunosuppression.
10. **Insulin resistance as a mechanism hub**, not a file. Recommended: hub, with metabolic syndrome in notes. The other way: a small file.
11. **DKA and HHS as outcome nodes** now. Recommended: outcomes; §3 acid–base can make DKA a file later (the outcome-to-file move keeps links). The other way: files now.
12. **Out of scope:** hyperparathyroidism and calcium (§14), SIADH and DI (§3), CAH, PCOS, hypogonadism. Recommended: leave for those sections, with notes here.

---

## 7. Batch order

1. Diabetes: diabetes-mellitus (umbrella), type-1-diabetes, type-2-diabetes, mody, gestational-diabetes (5)
2. Hypoglycaemia: hypoglycaemia, insulinoma (2)
3. Thyroid function: hyperthyroidism (umbrella), graves-disease, hypothyroidism (umbrella), hashimotos-thyroiditis (4)
4. Thyroid nodules and cancer: multinodular-goitre, follicular-adenoma, thyroid-cancer (umbrella), papillary-, follicular-, medullary- and anaplastic-thyroid-carcinoma (7)
5. Pituitary: pituitary-adenoma (umbrella), prolactinoma, acromegaly, hypopituitarism (4)
6. Adrenal and MEN: cushings-syndrome, adrenal-insufficiency, primary-hyperaldosteronism, phaeochromocytoma, adrenocortical-tumour, multiple-endocrine-neoplasia (6)

Pituitary comes before adrenal so that Cushing's can start from the `pituitary-adenoma` file, and MEN comes last so that all the tumours it links to already exist.

---

## Decisions (2026-11-10)

1. `diabetes-mellitus` becomes the umbrella file, keeping the same id (Q1).
2. `hormone-excess` and `hormone-deficiency` parents go ahead (Q2), **provisionally**: the owner is cautious that "shares a hormone excess" is not a strongly clinical connection. They can be removed at any time; removing them only drops the shared parent, and the hormone kinds and every chain stay as they are. The nodes.yaml comment says so too.
   - New parent **`tumour-hormone-secretion`** ("Hormone secretion by a tumour") over the new `hormone-secreting-adenoma` and the existing `ectopic-hormone-secretion`, which gains it as its parent — *endocrine adenomas ~ paraneoplastic secretion*. Ectopic secretion steps (ACTH, PTHrP, ADH) also feed the same hormone-excess kinds where the pages say so — *Cushing's ~ SCLC*.
3. Phaeochromocytoma and primary hyperaldosteronism become files with the same ids; `endocrine-hypertension-cause` is deleted (Q3).
4. Adrenal insufficiency is one file (Q4). Cushing's is one file (Q5).
5. A shared `hormone-secreting-adenoma` goes ahead (Q6). The owner would like it linked to paraneoplastic syndromes; see the proposal in the report. **Correction to §1:** `ectopic-cushing` keeps its `paraneoplastic-syndrome` parent rather than moving under `cushings-syndrome`, so that paraneoplastic link isn't lost.
6. Thyroid cancer is an umbrella with four children (Q7). Second systems as listed (Q8). Steroids get a new `exogenous-glucocorticoid` cause (Q9). Insulin resistance is a mechanism hub (Q10). DKA and HHS are outcomes (Q11).
7. Q12, checked against the syllabus:
   - Hyperparathyroidism and calcium have their own section (§14 "Calcium homeostasis"), so they wait.
   - SIADH and AVP deficiency/resistance (DI) are in §3 "Sodium and water balance", so they wait.
   - CAH, PCOS and hypogonadism appear in no syllabus section, so they are notes only.

## Progress

- **Batches 1–2 drafted** (2026-11-10, all `status: draft`, 0 loose items): diabetes-mellitus (umbrella), type-1-diabetes, type-2-diabetes, mody, gestational-diabetes; hypoglycaemia, insulinoma.
- **Existing nodes changed:**
  - The `diabetes-mellitus` cause node was deleted (it is now the umbrella file) and so leaves `modifiable-risk-factor`. All 24 files that start a chain from it work unchanged.
  - `pancreatogenic-diabetes` now has `parent: diabetes-mellitus` (the file). `cf-related-diabetes` keeps its parent `pancreatogenic-diabetes`.
  - `ectopic-hormone-secretion` now sits under the new `tumour-hormone-secretion`, beside the new `hormone-secreting-adenoma` (used by insulinoma).
- **Shared hubs:**
  - `insulin-deficiency` (under the provisional `hormone-deficiency`) → `hyperglycaemia`, reached by all four types — *T1 ~ T2 ~ MODY ~ gestational*.
  - `insulin-resistance`: from obesity and pregnancy; leads to `masld`, `acanthosis-nigricans` (*T2DM ~ gastric cancer's paraneoplastic sign*) and dyslipidaemia.
  - `beta-cell-failure`: T2, MODY and gestational.
  - `microvascular-glycation-damage` → retinopathy, neuropathy and the existing `diabetic-nephropathy` file.
  - `hyperglycaemia` → `atherosclerosis` → ACS, stroke, PAD (all files).
  - `impaired-innate-immunity` → UTI and TB.
- **Reused:** `hla-dq2-dq8` (*T1DM ~ coeliac*), `coxsackie-b-virus` (*T1DM ~ myocarditis*), `cerebral-oedema`, `dehydration-signs`, `coma`. `high-anion-gap-acidosis` is new under `metabolic-acidosis`, beside `normal-anion-gap-acidosis` (*DKA ~ RTA*).
- **Hypoglycaemia:**
  - Its causes reach `low-plasma-glucose` by three routes: `insulin-excess` (drug group: insulin and sulphonylureas, plus insulinoma), `impaired-gluconeogenesis` (alcohol, `acute-liver-failure`), and `cortisol-deficiency` from the `adrenal-insufficiency` outcome node — *hypoglycaemia ~ Addison's*, ready for batch 6.
  - From there it splits into the adrenergic and neuroglycopenic responses.
- **DKA and HHS** are outcomes (Q11). DKA carries the anion gap, Kussmaul breathing, potassium and cerebral oedema links.
- **Not used:** heart failure (K&C p.735 gives it as an association with no mechanism) and hypertension in T2DM (no mechanism given). The type 2 risk factors physical inactivity and diet are in a note, not nodes.
- **Batches 3–4 drafted** (2026-11-10, all `status: draft`, 0 loose items): hyperthyroidism (umbrella), graves-disease, hypothyroidism (umbrella), hashimotos-thyroiditis; multinodular-goitre, follicular-adenoma, thyroid-cancer (umbrella), papillary-, follicular-, medullary- and anaplastic-thyroid-carcinoma.
  - **Existing nodes changed:** the `hypothyroidism` cause node was deleted (now the umbrella file); `secondary-hyperlipidaemia` keeps its link and is now also reached from `thyroid-hormone-deficiency`.
  - **Graves'** reuses `receptor-autoantibody` (*Graves' ~ myasthenia gravis*), `hla-b8-dr3` (*~ SLE*), `molecular-mimicry` and `smoking` (orbitopathy). **Hashimoto's** is the second kind under `autoimmune-gland-destruction` (*~ T1DM*) and links to `non-hodgkin-lymphoma` (Mehlman).
  - New kinds `thyroid-hormone-excess` and `thyroid-hormone-deficiency` (provisional parents). Hyperthyroidism reaches `atrial-fibrillation`, `heart-failure` and `osteoporosis`; hypothyroidism reaches lipids, `hyponatraemia`, `normocytic-anaemia`, `carpal-tunnel-syndrome` (*~ AL amyloidosis*) and `proximal-myopathy`.
  - Thyroiditis (de Quervain's, postpartum, drug group: amiodarone, lithium, checkpoint inhibitors) sits in the umbrellas through `thyroiditis-hormone-leak`, with `only:` for de Quervain's tenderness and ESR.
  - New finding parents: **`thyroid-function-test`** (five kinds), **`thyroid-isotope-scan`** (diffuse, hot nodule, minimal, cold) and **`goitre`** (diffuse, nodular, solitary nodule, tender).
  - Toxic MNG and toxic adenoma reuse `hormone-secreting-adenoma` → `thyroid-hormone-excess` → `hyperthyroidism` — *toxic nodules ~ insulinoma*.
  - Cancers share the new hub `thyroid-malignant-nodule`; papillary, follicular and anaplastic share **thyroid-follicular-cell-malignancy**, and medullary has **c-cell-malignancy** with `congo-red-amyloid` (*medullary ~ AL amyloidosis*) and `ret-mutation` (ready for MEN). Papillary reuses `ionising-radiation`.
  - Thin: follicular adenoma (K&C covers adenomas only in lists and as the toxic nodule; there was no source for the adenoma–carcinoma distinction by capsular invasion, so it's left out). Laryngeal nerve palsy from goitre is left out because the only existing node is the lung-cancer "left recurrent laryngeal" one.
- **Batches 5–6 drafted** (2026-11-10, all `status: draft`): pituitary-adenoma (umbrella), prolactinoma, acromegaly, hypopituitarism; cushings-syndrome, adrenal-insufficiency, primary-hyperaldosteronism, phaeochromocytoma, adrenocortical-tumour, multiple-endocrine-neoplasia. **All 28 endocrine files are drafted.**
  - **Nodes deleted:** `adrenal-insufficiency` (outcome; now the file, so it loses no parent), `primary-hyperaldosteronism` and `phaeochromocytoma` (causes; now files), and `endocrine-hypertension-cause` (left empty). `secondary-hypertension`, `tuberculosis`, `hypoglycaemia` and RCC keep every link unchanged. No existing disease files were edited.
  - **Reuse instead of a new node:** Conn's uses the existing `mineralocorticoid-excess` (under `neurohormonal-activation`) instead of a new `aldosterone-excess`, so it links to secondary hypertension, SCLC and Cushing's. Phaeo uses the existing `catecholamine-excess` (*~ heart failure*).
  - **New hormone kinds** (provisional parents): `prolactin-excess`, `gh-igf1-excess`, `cortisol-excess`, `pth-excess` (MEN parathyroid; ready for §14), `anterior-pituitary-hormone-deficiency`, `mineralocorticoid-deficiency`. `autoimmune-adrenalitis` is the third kind under `autoimmune-gland-destruction` (*Addison's ~ Hashimoto's ~ T1DM*).
  - **Pituitary:** `intracranial-tumour-growth` reused (*~ brain tumours*); new `optic-chiasm-compression` → `bitemporal-hemianopia` and `cavernous-sinus-palsy` (both under `focal-neurological-deficit`, *~ stroke*); `pituitary-mass-on-mri` under `brain-mass-lesion`; stalk compression → `prolactin-excess`. Reaches `hydrocephalus` and `csf-leak`. New outcome `pituitary-apoplexy`.
  - **Hypopituitarism** starts from `pituitary-adenoma`, `ionising-radiation`, `sarcoidosis`, `haemochromatosis` and `immune-checkpoint-inhibitor` (*~ thyroid drug group*), plus `postpartum-haemorrhage` and `pituitary-apoplexy` through `pituitary-infarction` (under `tissue-ischaemia`). It reaches `hypogonadism` (*~ haemochromatosis, prolactinoma*), `hypothyroidism`, `adrenal-crisis` and `hypoglycaemia`.
  - **Cushing's** starts from `exogenous-glucocorticoid`, `pituitary-adenoma`, the existing ectopic `acth-secretion` (*~ SCLC*) and `adrenocortical-tumour`; ACTH-dependent causes share `raised-acth` with Addison's (pigmentation). `ectopic-cushing` keeps its paraneoplastic parent. Reaches `insulin-resistance` → `diabetes-mellitus`, `osteoporosis`, `avascular-necrosis` (*~ sickle cell*), `opportunistic-infection` and `deep-vein-thrombosis`.
  - **Addison's** starts from `autoimmune-predisposition`, `mycobacterium-tuberculosis`, `waterhouse-friderichsen-syndrome`, `adrenal-metastases`, `exogenous-glucocorticoid` (via `hpa-axis-suppression`) and `hypopituitarism`. Reaches `hyperkalaemia` and `normal-anion-gap-acidosis` (*~ type 4 RTA, AKI*). New outcome `adrenal-crisis` has the file as parent.
  - **MEN** links to `pituitary-adenoma`, `insulinoma`, `phaeochromocytoma`, `medullary-thyroid-carcinoma` and, through the existing `hypergastrinaemia`, `peptic-ulcer-disease` (gastrinoma), with `only:` for MEN 1 vs MEN 2.
  - **Intentional loose item (§12):** acromegaly → `colorectal-cancer`. K&C gives more large-bowel cancer deaths and advises colonoscopy but no mechanism, so it stays an association. Loose items are now 48.
  - **Left out:** sleep apnoea in acromegaly (`obstructive-sleep-apnoea` is a cause node, so it can't be an outcome); drug-induced hyperprolactinaemia (no file for it; named in a note); craniopharyngioma, Kallmann's, Nelson's, glucocorticoid-remediable aldosteronism, liquorice, SDH genes (notes only); hypercalcaemia and anaemia in Addison's (no mechanism given). The acromegaly and Cushing's symptom figures were lost in conversion, so the appearance findings come from Mehlman.
- **Next:** owner review of the endocrine drafts, then the next system.

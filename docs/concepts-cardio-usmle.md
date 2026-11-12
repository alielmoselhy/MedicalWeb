# Cardiovascular, USMLE layer: concepts

This is the plan for adding USMLE Step 1 cardiovascular content on top of the v1 LMC cardio files (45 files, `docs/concepts-cardio.md`). Agreed with the owner on 2026-11-12:
- The work lives in `~/Goofy/MedicalWeb`.
- It **extends** the v1 graph: v1 files and nodes stay as they are.
- Systems come from the LMC sections, plus USMLE add-on systems and groups where LMC has none.

**Sources read for this doc:**
- First Aid Step 1 2026, cardio pathology, p.300–327 (`Resources/USMLE/md/first-aid/09-cardiovascular.md`)
- Pathoma 2023 ch.7 (Vascular, p.65–72) and ch.8 (Cardiac, p.73–84), headings only so far
- StatPearls index: an article exists for every new file below except multifocal atrial tachycardia, sick sinus syndrome and subclavian steal

**Not used as a source:**
- AnKing (1,706 Step 1 cardio cards). It is a derivative of First Aid, so it goes to the quiz feature and isn't cited.

Legend: `id` = existing node or file · **`id`** = new · (node→file) = an existing node becomes a disease file (protocol §5.5).

---

## 1. Disease list: what USMLE adds

### 1a. New groups (needs Q1)

LMC §7 has no group for arrhythmias, congenital heart disease, aortic disease or cardiac tumours. Proposed new groups under `cardiovascular` in `syllabus.yaml`:

| New group id | Name |
|---|---|
| `arrhythmia-conduction` | Arrhythmias and conduction disease |
| `congenital-heart` | Congenital heart disease |
| `aortic-vascular` | Aortic and peripheral vascular disease |
| `cardiac-vascular-tumours` | Cardiac and vascular tumours |

### 1b. New files

| Group | New files | Umbrella? |
|---|---|---|
| arrhythmia-conduction | `atrial-fibrillation` (node→file), **atrial-flutter**, **multifocal-atrial-tachycardia**, **paroxysmal-svt**, **wolff-parkinson-white**, **ventricular-tachycardia**, **torsades-de-pointes**, **ventricular-fibrillation**, **brugada-syndrome**, **congenital-long-qt**, **sick-sinus-syndrome**, `av-block` (node→file) | Q2 |
| congenital-heart | **tetralogy-of-fallot**, **transposition-of-great-arteries**, **truncus-arteriosus**, **tricuspid-atresia**, **tapvr**, **ebstein-anomaly**, **ventricular-septal-defect**, **atrial-septal-defect**, **patent-ductus-arteriosus**, **eisenmenger-syndrome**, `aortic-coarctation` (cause→file), **pphn** (persistent pulmonary hypertension of the newborn) | Q3 |
| aortic-vascular | **aortic-dissection**, **thoracic-aortic-aneurysm**, **abdominal-aortic-aneurysm**, **traumatic-aortic-rupture**, **cholesterol-emboli-syndrome**, **subclavian-steal**, **hereditary-haemorrhagic-telangiectasia**, **hypertensive-emergency** | Q4 (aortic-aneurysm umbrella) |
| cardiac-vascular-tumours | **cardiac-myxoma**, **cardiac-rhabdomyoma**, **haemangioma**, **angiosarcoma** (`kaposi-sarcoma` already exists in infection) | — |
| existing LMC groups | **vasospastic-angina** (ischaemic), `constrictive-pericarditis` (node→file, pericardial), **takotsubo-cardiomyopathy** (child of `cardiomyopathy`), **mitral-valve-prolapse** (valvular), **nonbacterial-thrombotic-endocarditis** (endovascular-infection; Libman–Sacks as a note), **high-output-heart-failure** (Q5) | — |

That is about 42 new files.

**Not files** (notes or findings instead):
- premature atrial and ventricular contractions, and bundle branch block (ECG findings)
- coronary steal, myocardial hibernation and stunning (notes on the ischaemic files)
- chronic ischaemic heart disease (it is `heart-failure` reached from `myocardial-scar`)
- arteriolosclerosis and Mönckeberg medial sclerosis (mechanisms)
- syphilitic heart disease (an outcome of `syphilis`, which is already a file)
- shock and its types (they stay outcomes: Q6)
- drug classes, p.321–327 (a separate decision: Q9)

### 1c. Nodes that become files (protocol §5.5)

| Node | Its users keep working | What it loses |
|---|---|---|
| `atrial-fibrillation` (outcome) | 18 files | Nothing if Q2 = keep the parent: a disease may have an outcome parent (`arrhythmia`) |
| `av-block` (outcome) | 5 files | The same |
| `constrictive-pericarditis` (outcome) | acute-pericarditis, portal-hypertension, tuberculosis | — |
| `aortic-coarctation` (cause, parent `congenital-heart-defect`) | secondary-hypertension's chain then starts from the file | Its parent, because a cause can't be a disease's parent (Q3) |

### 1d. New cross-file links worth having

| Existing file | Gains (as outcome or chain start) | Source |
|---|---|---|
| `hypertension` | → aortic-dissection, thoracic-aortic-aneurysm, hypertensive-emergency | FA p.302, 304–305 |
| `syphilis` | → thoracic-aortic-aneurysm (vasa vasorum) | FA p.304, 319 |
| `stemi` / `acute-coronary-syndrome` | → ventricular-fibrillation; existing `av-block` and AF links become file links | FA p.313 |
| `systemic-lupus-erythematosus` | → nonbacterial-thrombotic-endocarditis (Libman–Sacks) | FA p.318 |
| `pancreatic-adenocarcinoma` | → NBTE | FA p.318 |
| `digeorge-syndrome` | `conotruncal-heart-defect` finding → tetralogy and truncus files | FA p.302 |
| `trisomy-21` (cause) | starts the ASD and VSD chains | FA p.301–302 |
| `lyme-disease` | the existing `av-block` outcome becomes a file link | FA p.312 |
| `takayasu-arteritis` | → subclavian-steal | FA p.305 |
| `aortic-stenosis`, `aortic-regurgitation` | `bicuspid-aortic-valve` stays a cause; Turner gains a link | FA p.302 |

### 1e. Enrichment of existing v1 files (Q7)

First Aid and Pathoma add Step 1 facts to files that already exist. Examples:
- MI: histology timeline, troponin and CK-MB kinetics, ECG leads by artery, the complication time windows (FA p.308–313)
- DCM: causes such as Chagas, beriberi, doxorubicin and TTN (FA p.314)
- HCM: sarcomere genes; findings that change with manoeuvres
- IE: organisms by setting (FA p.318)
- Rheumatic fever: Aschoff bodies and Anitschkow cells (FA p.319)
- Myocarditis: the cause list (FA p.320)
- Tamponade: electrical alternans (FA p.317)

These would be new edges and findings with FA or Pathoma sources, added to existing files.

---

## 2. Cause parents

- `congenital-heart-defect`: existing. Its fate depends on Q3.
- `ion-channel-mutation`: existing. It gains children **long-qt-k-channel-mutation** and **brugada-na-channel-mutation**, or the channelopathy files replace it as the root of `sudden-cardiac-death` (Q8).
- **congenital-heart-risk** (risk-factor): a class node for a cause group (`members:`), with members fetal alcohol, congenital rubella, maternal diabetes, prenatal lithium, Turner, Williams, 22q11. **Not recommended** under the owner's rule: each acts by its own route. They stay separate causes, and only the ones a file needs get added. The existing `trisomy-21`, `del-22q11` and `lithium` nodes are reused.
- **qt-prolonging-drug** (drug): class 1A/3 antiarrhythmics, macrolides, fluoroquinolones, haloperidol, TCAs, ondansetron, fluconazole, methadone. A real shared nature (each blocks repolarising K⁺ current), so a cause group is justified.
- Reused: `hypertension`, `smoking`, `marfan-syndrome`, `bicuspid-aortic-valve`, `atherosclerosis` (mechanism), `syphilis`, **tuberous-sclerosis** (genetic; not in v1).

## 3. Mechanism parents

**Arrhythmia mechanisms** (new parent **abnormal-cardiac-conduction**):
- **re-entry-circuit** (flutter, AVNRT, WPW, VT around scar)
- **ectopic-focus** (AF at the pulmonary veins, MAT, premature beats)
- **accessory-pathway** (WPW; child of re-entry-circuit)
- **delayed-repolarisation** (long QT → torsades; with low K⁺, Mg²⁺ or Ca²⁺)
- **conduction-system-degeneration** (sick sinus, AV block, BBB)

The existing `arrhythmogenic-substrate` children (`myocardial-scar`, `myocyte-disarray`, `atrial-dilatation`) feed into these. *This links MI, HCM and mitral stenosis to the rhythm they produce.*

**Shunts** (new parent **intracardiac-shunt**):
- **left-to-right-shunt** (VSD, ASD, PDA)
- **right-to-left-shunt** (the 5 Ts, Eisenmenger, PPHN)
- **shunt-reversal**: L→R becomes R→L. This is the Eisenmenger step: pulmonary vascular remodelling is reused from `pulmonary-hypertension`.
- *This gives early cyanosis vs late cyanosis as sibling mechanisms.*

**Aortic wall** (new parent **aortic-wall-weakening**):
- **cystic-medial-degeneration** (TAA, dissection, Marfan, bicuspid valve)
- **transmural-aortic-inflammation** (AAA)
- **vasa-vasorum-endarteritis** (syphilis)
- Plus **intimal-tear-false-lumen** (dissection), a sibling under it
- *Dissection, TAA and AAA share a root but differ in where they start.*

**Reused:**
- `atheroembolism` (cholesterol emboli)
- `arterial-stenosis` (gains **subclavian-stenosis**)
- `catecholamine-excess` (takotsubo)
- `outflow-obstruction` (myxoma ball-valve: a new child **atrial-inflow-obstruction**, or reuse `mitral-inflow-obstruction`, which is closer)
- `malignant-transformation` (angiosarcoma)

## 4. Finding parents

- **ECG** (all children of existing ECG nodes where possible):
  - **delta-wave-short-pr**
  - **sawtooth-flutter-waves**
  - **absent-p-waves** (AF)
  - **polymorphic-twisting-qrs** (torsades)
  - **brugada-pattern** (pseudo-RBBB with ST elevation V1–V3)
  - **prolonged-pr**
  - **dropped-beats** (Mobitz)
  - **av-dissociation**
  - `prolonged-qt` (reused)
  - `irregularly-irregular-pulse` (reused)
- **Cyanosis:**
  - `central-cyanosis` (reused)
  - **differential-cyanosis** (PDA, PPHN, child of it)
  - **tet-spell-squatting**
- **Imaging:**
  - **boot-shaped-heart**
  - **egg-on-a-string**
  - **rib-notching**
  - `mediastinal-widening` (reused for dissection and traumatic rupture)
- **Signs:**
  - **wide-fixed-split-s2** (ASD)
  - **continuous-machinery-murmur** (PDA, under `murmur`)
  - **mid-systolic-click** (MVP)
  - **tumour-plop**
  - **radiofemoral-delay**
  - **arm-bp-difference** (dissection and subclavian steal share it)
  - **pulsatile-abdominal-mass**
  - **tearing-chest-pain-to-back**
  - **kussmaul-sign** (constrictive pericarditis, RCM)

## 5. Outcome parents

- `arrhythmia` (existing): AF, AV block, VT and VF files sit under it as disease-with-outcome-parent (Q2).
- **aortic-rupture**: a new outcome shared by dissection, TAA, AAA and traumatic rupture.
- **paradoxical-embolism**: reuses `patent-foramen-ovale`'s idea. ASD and Eisenmenger reach `ischaemic-stroke`.
- `shock` children: reused as outcomes (Q6).

---

## Decisions (owner, 2026-11-12)

All of Q1–Q10 were approved as recommended:
- Q1: four new groups
- Q2: each arrhythmia file has parent `arrhythmia` (outcome)
- Q2b: `ventricular-arrhythmia` stays; VT and VF go under it
- Q3: no congenital umbrella
- Q4: `aortic-aneurysm` umbrella
- Q5: `high-output-heart-failure` is a child of `heart-failure`
- Q6: shock stays as outcomes
- Q7: enrichment is the last batch
- Q8: channelopathy files replace `ion-channel-mutation`
- Q9: FA, Pathoma and StatPearls citations; British spelling; pharmacology deferred
- Q10: `syllabi: [usmle]`

## Progress

- **Batch 0 done:**
  - `syllabus.yaml` has the four groups.
  - `scripts/build.js` accepts the FA, Pathoma and StatPearls citations and the optional `syllabi` key; 4 new tests.
  - README "Standards" and drafting protocol §2.3a are updated.

## 6. Questions before drafting

**Q1. New groups.** Add the four groups in §1a to `cardiovascular` in `syllabus.yaml`?
- *Recommend yes.* Arrhythmias and congenital disease don't fit any LMC group.
- *Alternative:* squeeze them into `ischaemic-myocardial-pericardial` and `valvular`. That would mislead.

**Q2. Arrhythmias: umbrella or outcome parent?**
- *Recommend:* each arrhythmia is a file whose `parent` is the existing `arrhythmia` outcome (as with `bone-metastases` → `distant-metastases`). All 20+ existing users keep working, and the arrhythmias count as related.
- *Alternative:* an `arrhythmia` umbrella file. That means deleting the outcome and repointing 25 files.
- **Q2b.** VF becomes its own file, separate from VT. The existing `ventricular-arrhythmia` outcome (VT/VF, used by 14 files) stays as it is, with VT and VF filed under it? *Recommend yes;* repointing 14 files buys little.

**Q3. Congenital heart disease structure.**
- *Recommend:* no umbrella. The shunt mechanism parents (§3) carry "cyanotic vs acyanotic". `aortic-coarctation` becomes a file with no parent. `congenital-heart-defect` stays a cause node for the v1 files that use it loosely (IE, pulmonary stenosis and regurgitation).
- *Alternative:* `congenital-heart-defect` becomes an umbrella file. Then `bicuspid-aortic-valve` loses its parent, and the IE chain changes.

**Q4. Aortic aneurysm umbrella?**
- *Recommend yes:* **aortic-aneurysm** as an umbrella over TAA and AAA (FA treats them together on p.304). Dissection stays a sibling file, not a child, because it is a tear, not a dilatation.
- *Alternative:* two plain files.

**Q5. High-output heart failure.** Make it a child file of `heart-failure` (causes: anaemia, thyrotoxicosis, AV shunts, Paget, beriberi, cirrhosis)?
- *Recommend yes.* It links `hereditary-haemorrhagic-telangiectasia`, `pagets-disease` and `hyperthyroidism`.
- *Alternative:* a mechanism node in `heart-failure`.

**Q6. Shock.** USMLE teaches shock types with haemodynamics (PCWP, SvO₂, skin).
- *Recommend:* they stay outcomes. The haemodynamic profiles become notes on the shock outcome entries, as diagnosed states rather than diseases.
- *Alternative:* a `shock` umbrella file with four children.

**Q7. Enrichment of v1 files.** Add the First Aid and Pathoma facts in §1e to the existing 45 cardio files?
- *Recommend:* yes, as the **last batch**, so new files exist first and the enrichment can link to them.
- *Alternative:* enrich each file in the batch where it is touched.

**Q8. Channelopathies.** The existing `ion-channel-mutation` cause is the root of `sudden-cardiac-death`.
- *Recommend:* Brugada and congenital long QT become files, and `sudden-cardiac-death` starts chains from them. `ion-channel-mutation` is deleted once unused.
- *Alternative:* keep the cause node and give it two children.

**Q9. Citations and validator.** The validator only accepts K&C, Mehlman and LMC. Proposed new formats, to be added to `CITE` in `scripts/build.js` and the README:
- `FA 2026 p.304` (and `p.304-305`): First Aid printed pages, the `<!-- p.N -->` markers in `md/first-aid/`
- `Pathoma 2023 p.70`: printed pages, same markers
- `StatPearls NBK430685`: the article's NBK id, from its front matter

AnKing is not cited. *Recommend yes to all three formats.*
- **Q9b.** USMLE uses American terms. Keep British spelling (protocol rule 6)? *Recommend yes.*
- **Q9c.** Pharmacology (FA p.321–327: nitrates, CCBs, antiarrhythmic classes, lipid drugs) is out of scope for disease files. Keep it for a later structural decision on drugs as nodes or files? *Recommend yes.*

**Q10. Marking USMLE-only content.** Should files and nodes added in this layer be tagged so the app can show or filter "USMLE-only" (for example, a v1-only view or quiz filters)?
- *Recommend:* a new optional file key `syllabi: [usmle]`. v1 files default to `[lmc]`. This needs a validator change.
- *Alternative:* no tag. The new groups imply it, but files added to existing LMC groups (MVP, constrictive pericarditis, takotsubo) would be indistinguishable.

---

## 7. Batch order (two at a time, then stop)

| Batch | Files |
|---|---|
| 0 | Validator and citation changes (Q9, Q10), new groups (Q1). No disease files. |
| 1 | Supraventricular arrhythmias: atrial-fibrillation, atrial-flutter, multifocal-atrial-tachycardia, paroxysmal-svt, wolff-parkinson-white |
| 2 | Ventricular and conduction: ventricular-tachycardia, torsades-de-pointes, ventricular-fibrillation, brugada-syndrome, congenital-long-qt, sick-sinus-syndrome, av-block |
| 3 | Right-to-left congenital: tetralogy, TGA, truncus, tricuspid atresia, TAPVR, Ebstein, PPHN |
| 4 | Left-to-right congenital: VSD, ASD, PDA, Eisenmenger, aortic-coarctation |
| 5 | Aorta: aortic-aneurysm umbrella, TAA, AAA, aortic-dissection, traumatic-aortic-rupture |
| 6 | Vascular: cholesterol-emboli-syndrome, subclavian-steal, HHT, hypertensive-emergency, vasospastic-angina |
| 7 | Myocardial, pericardial and valve: constrictive-pericarditis, takotsubo, MVP, NBTE, high-output-heart-failure |
| 8 | Tumours: cardiac-myxoma, cardiac-rhabdomyoma, haemangioma, angiosarcoma |
| 9 | Enrichment of the v1 cardio files (§1e), if Q7 = yes |

Before each batch, read the matching FA pages and Pathoma section in full, plus the StatPearls article where FA is thin.

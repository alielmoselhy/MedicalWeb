# Step 5a — Cardiovascular parent concepts (agreed 2026-11-06, now in nodes.yaml)

Parents are the "is a kind of" groups that make two different nodes count as **related**.
Rule of thumb used here: **mechanism parents carry cross-disease similarity** (e.g. myocardial vs limb ischaemia),
**finding parents carry bedside similarity** (e.g. all systolic murmurs), and **outcome parents group complications** (e.g. all kinds of shock).
Each node has one parent, and matching rolls up one level only.

Legend: `id` = existing node · **`id`** = new · (→ D) = will become a disease file · *why* = the link it creates.

---

## 1. Disease list (syllabus §7) — what becomes a file

| Group | Diseases | Umbrella (if Q1 = yes) |
|---|---|---|
| ischaemic | stable-angina ✓, unstable-angina, nstemi ✓, stemi ✓, sudden-cardiac-death | acute-coronary-syndrome → UA, NSTEMI, STEMI |
| atherosclerotic | carotid-artery-stenosis, renal-artery-stenosis, chronic-mesenteric-ischaemia, peripheral-arterial-disease | — |
| myocardial | dilated-, hypertrophic-, restrictive-cardiomyopathy, myocarditis | cardiomyopathy → DCM, HCM, RCM |
| pericardial | acute-pericarditis, cardiac-tamponade | — |
| lipids | familial-hypercholesterolaemia, familial-combined-hyperlipidaemia, familial-hypertriglyceridaemia, secondary-hyperlipidaemia | hyperlipidaemia → all four |
| valvular | aortic-stenosis, aortic-regurgitation, mitral-stenosis, mitral-regurgitation, tricuspid-regurgitation, pulmonary-stenosis, pulmonary-regurgitation, rheumatic-fever, rheumatic-heart-disease, infective-endocarditis, prosthetic-valve-complications | — |
| infection | bacteraemia, catheter-associated-bacteraemia, s-aureus-bacteraemia, prosthetic-valve-and-graft-infection | bacteraemia → CRBSI, SAB |
| HTN/HF/pulmonary | essential-hypertension, secondary-hypertension, heart-failure, pulmonary-oedema, pulmonary-hypertension, pulmonary-embolism, cor-pulmonale | hypertension → essential, secondary |

~40 diseases. Cardiac markers (troponin, NT-proBNP) are **findings**, not diseases.
Existing outcomes that become disease files: `heart-failure`, `sudden-cardiac-death`, `cardiac-tamponade`, `pulmonary-oedema`, `pericarditis` (→ acute-pericarditis). Their children keep working: outcomes can have a disease as their parent.
Left out (rare in the syllabus): tricuspid and pulmonary-valve stenosis as separate files. They're folded into the regurgitation/stenosis files for those valves.

---

## 2. Mechanism parents (~20)

**Vascular / ischaemic**
- **`atherosclerosis`** → `coronary-atherosclerosis`, **carotid-**, **renal-artery-**, **mesenteric-**, **peripheral-atherosclerosis** — *the whole atherosclerotic group shares one root*
- **`arterial-stenosis`** → `fixed-coronary-stenosis`, **carotid-stenosis**, **renal-artery-narrowing**, **mesenteric-stenosis**, **limb-artery-stenosis**
- **`tissue-ischaemia`** → `myocardial-ischaemia`, **cerebral-ischaemia**, **mesenteric-ischaemia**, **limb-ischaemia**, **renal-hypoperfusion** — *angina ~ claudication ~ mesenteric angina*
- **`thrombosis`** → `coronary-thrombosis`, **venous-thrombosis** (DVT → PE), **intracardiac-thrombus** (LV mural, left atrial in AF/MS)
- **`embolism`** → **thromboembolism**, **septic-embolism** (IE), **atheroembolism** (carotid) — *AF, MI, IE and carotid disease all reach stroke*

**Load and remodelling**
- **`pressure-overload`** → **lv-pressure-overload** (AS, HTN), **rv-pressure-overload** (pulmonary HTN, PE, PS, MS)
- **`volume-overload`** → **lv-volume-overload** (AR, MR), **rv-volume-overload** (TR, PR)
- **`ventricular-hypertrophy`** → **concentric-hypertrophy** (pressure overload, HCM), **eccentric-hypertrophy** (volume overload)
- **`outflow-obstruction`** → **fixed-lvot-obstruction** (AS), **dynamic-lvot-obstruction** (HOCM) — *the classic AS vs HOCM comparison*
- **`impaired-ventricular-filling`** → **diastolic-dysfunction** (HCM, RCM, HTN), **pericardial-compression** (tamponade, constriction), **mitral-inflow-obstruction** (MS) — *RCM vs tamponade vs constriction*
- **`impaired-contractility`** → **systolic-dysfunction**; plus its causes as siblings: `myocyte-necrosis`(MI), **myocardial-inflammation**, **myocyte-loss-dilated** (DCM)

**Responses**
- **`neurohormonal-activation`** → **raas-activation** (HF, renal artery stenosis → hypertension), **sympathetic-activation**
- **`venous-congestion`** → **pulmonary-venous-congestion** (left-sided), **systemic-venous-congestion** (right-sided)
- **`arrhythmogenic-substrate`** → **myocardial-scar** (MI, DCM, myocarditis), **myocyte-disarray** (HCM), **atrial-dilatation** (MS, MR, HF → AF) — *the routes into sudden cardiac death*
- **`cardiac-inflammation`** → **myocardial-inflammation**, **pericardial-inflammation**, **endocardial-inflammation** — *rheumatic pancarditis touches all three*
- **`immune-mediated-injury`** → `post-infarct-autoimmunity`, **molecular-mimicry** (rheumatic fever), **immune-complex-deposition** (IE: Osler nodes, Roth spots, GN)

**Valves**
- **`valve-damage`** → **calcific-degeneration** (senile AS), **rheumatic-scarring** (commissural fusion), **leaflet-destruction** (IE), **myxomatous-degeneration** (prolapse), **annular-dilatation** (functional MR/TR, aortic root AR)

**Lipids**
- **`impaired-ldl-clearance`** → **ldl-receptor-defect** (FH), **apob-defect**, **reduced-receptor-expression** (hypothyroidism — secondary)
- **`lipoprotein-overproduction`** → **hepatic-vldl-overproduction** (FCH, diabetes, obesity, alcohol)

**Infection**
- **`bloodstream-entry`** → **catheter-entry**, **mucosal-dental-entry** (transient), **skin-soft-tissue-entry**, **injection-drug-use**, **endovascular-focus** (persistent)
- **`biofilm-formation`** → **catheter-biofilm**, **prosthetic-valve-biofilm**, **graft-biofilm** — *CRBSI ~ PVE ~ graft infection*

**Pulmonary circulation**
- **`raised-pulmonary-pressure`** → **pulmonary-venous-hypertension** (left heart), **hypoxic-vasoconstriction** (lung disease), **pulmonary-arterial-obstruction** (PE/CTEPH), **pulmonary-vascular-remodelling** (PAH)

## 3. Finding parents (~14)

- `chest-pain` → existing 3 + **pleuritic-chest-pain** (pericarditis, PE)
- `dyspnoea` → **exertional-dyspnoea**, **orthopnoea**, **paroxysmal-nocturnal-dyspnoea**
- **`syncope`** → **exertional-syncope** (AS, HCM), **arrhythmic-syncope**
- **`ischaemic-limb-gut-pain`** → **intermittent-claudication**, **rest-pain**, **post-prandial-abdominal-pain**
- **`murmur`** → **ejection-systolic** (AS, HOCM, PS), **pansystolic** (MR, TR, VSD), **early-diastolic** (AR, PR), **mid-diastolic** (MS), **new-or-changed-murmur** (IE)
- **`added-heart-sound`** → **s3**, **s4**, **opening-snap**, **mid-systolic-click**, **pericardial-rub**
- **`abnormal-pulse`** → **slow-rising**, **collapsing**, **jerky**, **pulsus-paradoxus**, **pulsus-alternans**, **irregularly-irregular**, **reduced-peripheral-pulses**
- **`raised-jvp`** → **kussmaul-sign**, **giant-v-waves** (TR), **steep-y-descent** (constriction)
- **`bruit`** → **carotid-bruit**, **renal-bruit**, **femoral-bruit**
- **`oedema`** → **peripheral-oedema**, **pulmonary-crackles**
- **`endocarditis-stigmata`** → **splinter-haemorrhages**, **janeway-lesions**, **osler-nodes**, **roth-spots**
- **`st-elevation`** → **territorial-st-elevation** (STEMI), **diffuse-saddle-st-elevation** (pericarditis) — *see Q4*
- **`ecg-chamber-enlargement`** → **lvh-voltage**, **rv-strain**, **p-mitrale**, plus **low-voltage-alternans** (tamponade) as a separate node
- **`cardiac-biomarker`** → `troponin-rise`, **ck-mb-rise**, **bnp-rise** (wall stress, not injury)
- **`dyslipidaemia-lab`** → **raised-ldl**, **raised-triglycerides**, **low-hdl**
- **`lipid-deposits`** → **tendon-xanthoma**, **xanthelasma**, **corneal-arcus**, **eruptive-xanthoma**
- No parent: **fever**, **positive-blood-cultures**, **raised-aso-titre**, **raised-crp**, **cardiomegaly**, **pericardial-effusion-echo**, **vegetation-on-echo**

## 4. Outcome parents (~10)

- **`shock`** → `cardiogenic-shock` (moved from heart-failure, see Q3), **septic-shock**, **obstructive-shock** (tamponade, massive PE)
- `arrhythmia` → existing 3 + **bradyarrhythmia**
- **`stroke`** → **ischaemic-stroke**, **haemorrhagic-stroke**, **transient-ischaemic-attack**
- **`metastatic-infection`** → **septic-emboli-abscess**, **vertebral-osteomyelitis**, **mycotic-aneurysm** — *S. aureus bacteraemia ~ IE ~ CRBSI*
- **`kidney-injury`** → **acute-kidney-injury**, **chronic-kidney-disease**, **glomerulonephritis** (IE)
- **`hypertensive-end-organ-damage`** → **hypertensive-retinopathy**, **hypertensive-nephropathy**, plus LVH (via the hypertrophy mechanism)
- **`prosthetic-valve-failure`** → **valve-thrombosis**, **paravalvular-leak**, **structural-valve-degeneration**, **haemolysis**, **anticoagulant-bleeding**
- **`critical-ischaemia-outcome`** → **acute-limb-ischaemia**, **gangrene-amputation**, **bowel-infarction**
- `mechanical-complication-of-mi`, `pericarditis` → kept as they are
- `acute-mitral-regurgitation` → parent becomes the disease **mitral-regurgitation**

---

## Decisions (2026-11-06)

- **Q1 yes.** Disease files take an optional `parent:` naming another disease. Umbrella files (ACS, cardiomyopathy, bacteraemia, hypertension, hyperlipidaemia) get created in their batches.
- **Q2 yes.** A new `cause` type with categories `organism | genetic | risk-factor | drug`, used at the roots of chains. `diabetes-mellitus` stays a cause until endocrine diseases exist.
- **Q3 yes.** `cardiogenic-shock` now sits under `shock`.
- **Q4 yes.** `st-elevation` has been split into territorial vs diffuse/saddle, and STEMI now uses the territorial node.
  **Future — fuzziness:** this is exactly where matching tolerance needs sorting out. Right now any two siblings count equally as "related", whether they're near-identical (transmural vs subendocardial ischaemia) or a key discriminator (territorial vs saddle ST elevation). A later design pass should be able to weight or label these differently.
- Change from the draft: `impaired-contractility` was dropped (its children already had other parents). `systolic-dysfunction` stands alone.

## Chain-linking progress (2026-11-07)

- Audited all 223 findings/outcomes that were listed but absent from their disease chain.
- Added defensible direct links and existing intermediate mechanisms for 207 items.
- Removed three misleading outcome entries: weak cardiovascular risk in familial hypertriglyceridaemia, STEMI as an outcome of NSTEMI, and cardiogenic shock as an outcome of pulmonary oedema.
- Left 13 items deliberately loose: seven need a conditional or missing intermediate, while six are umbrella/prognostic associations that should not be forced into a deterministic path.
- No vocabulary nodes were added. Full reasoning and the four-case classification are in `docs/chain-linking-audit-cardio.md`.

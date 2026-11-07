# Step N1 — Nervous system parent concepts (draft for review, 2026-11-07)

Same rules and legend as `concepts-resp.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [nervous]` unless noted.

Sources:
- K&C ch.26 Neurology (printed page = PDF marker − 20)
- Mehlman HY Neuro and HY Neuroanatomy
- No LMC neuro handouts in `Resources/` yet. Add any before drafting and I'll work them in.

---

## 1. Disease list (syllabus §13): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| cns-trauma-stroke | ischaemic-stroke, transient-ischaemic-attack, intracerebral-haemorrhage, subarachnoid-haemorrhage, traumatic-brain-injury, extradural-haematoma, subdural-haematoma, vascular-dementia | stroke → ischaemic, TIA, ICH, SAH; traumatic-brain-injury → EDH, SDH (see Q1) |
| nervous-tumours-icp | glioblastoma, medulloblastoma, meningioma, brain-metastases, neurofibroma, schwannoma, hydrocephalus | brain-tumour → the first four; nerve-sheath-tumour → neurofibroma, schwannoma |
| neurodegenerative | parkinsons-disease, dementia-with-lewy-bodies, alzheimers-disease, motor-neurone-disease, huntingtons-disease, prion-disease | dementia → AD, DLB, vascular dementia (see Q3) |
| demyelination | multiple-sclerosis, guillain-barre-syndrome | — |
| cns-infection | bacterial-meningitis, viral-meningitis, cryptococcal-meningitis, encephalitis, brain-abscess | meningitis → bacterial, viral, cryptococcal (TB: see Q4) |

That's about 33 files, including umbrellas. It's about the size of respiratory.

**Not files**
- **Contusion, laceration and diffuse axonal injury** are the syllabus's *mechanisms* of trauma. They become mechanism nodes inside the TBI file.
- **Raised ICP** becomes the hub mechanism, and **brain herniation** becomes an outcome (see §3, §5).
- **Cerebral oedema** stays an outcome node, gaining vasogenic and cytotoxic kinds.
- **Hypoxic-ischaemic injury** becomes an outcome under `encephalopathy` (see Q2).
- Teaching points go in `note`s or become test-result findings:
  - CSF interpretation
  - empirical antibiotics
  - meningococcal vaccination
  - the "acute headache" differential, which is the Differential page's job
- **Prion disease** is one file. Sporadic, variant, familial and iatrogenic CJD are its causes, with `only:` on the edges that differ (the GI gastroenteritis pattern).
- **Bacterial meningitis** is one file. The four syllabus organisms plus H. influenzae are its causes, with `only:` for organism-specific links (meningococcal rash and Waterhouse–Friderichsen, Listeria in the old and pregnant).

**Outcome nodes that become files.** These ids already exist as outcomes, so every existing link keeps working:
- `ischaemic-stroke`, from 12 cardio files (carotid stenosis, AF valves, IE, DCM, hypertension and others)
- `transient-ischaemic-attack`, from carotid stenosis
- `guillain-barre-syndrome`, from bacterial gastroenteritis (Campylobacter)
- `brain-metastases`, from the three lung cancer files. It loses its `distant-metastases` parent, because a file's parent must be a disease.

**Existing nodes that change**
- `stroke` ("Stroke / TIA", an outcome used by 4 files) becomes the umbrella file.
- `haemorrhagic-stroke` (used only by hypertension) is removed, and hypertension now points at `intracerebral-haemorrhage`.

**Second systems**
- multiple-sclerosis, guillain-barre-syndrome: `[nervous, immunology]`
- cryptococcal-meningitis: `[nervous, immunology]` (immunocompromise)
- Already tagged nervous: `wilsons-disease`

---

## 2. Cause parents

**Organisms**
- `streptococci` gains **streptococcus-agalactiae** (group B strep). `streptococcus-pneumoniae` is reused, so *CAP and pneumococcal meningitis share it*.
- **`neisseria`** → **neisseria-meningitidis**. N. gonorrhoeae joins at §14, septic arthritis.
- **listeria-monocytogenes**: standalone, since it is the only Gram-positive bacillus so far
- `haemophilus-influenzae` and `mycobacterium-tuberculosis` reused
- **`neurotropic-virus`** → **enterovirus**, **herpes-simplex-virus**, **varicella-zoster-virus**, **mumps-virus**
  - Coxsackie B stays under `cardiotropic-virus`, because a node has one parent, so it doesn't match enterovirus (see Q6).
- **cryptococcus-neoformans**: standalone
- **hiv** (a new cause). `immunosuppression` is reused, so *cryptococcal meningitis, Listeria and NTM share it*.

**Vascular and structural**
- `hypertension` (a disease) reused as a chain start: *ICH, lacunar stroke, vascular dementia ~ the whole cardio group*
- `atrial-fibrillation`, `carotid-artery-stenosis` and `infective-endocarditis` already feed ischaemic stroke. That stays as it is.
- **berry-aneurysm**, **arteriovenous-malformation**, **cerebral-amyloid-angiopathy**: standalone conditions
- **adpkd** (a cause until the kidney section)
- `marfan-syndrome` reused for berry aneurysm
- `anticoagulant-therapy` reused: *ICH, SDH ~ prosthetic valves*
- `excess-alcohol` reused (SDH, Wernicke's)
- **head-injury**: standalone risk factor
- **brain-atrophy-in-elderly**: stretched bridging veins, a risk factor for SDH

**Genetic**
- **`neurodegeneration-gene`** → **htt-cag-repeat**, **app-psen-mutation**, **apoe-e4**, **snca-lrrk2-mutation**, **sod1-c9orf72-mutation**, **prnp-mutation** — *the inherited neurodegenerations side by side*
- **trisomy-21**: early AD
- **nf1-mutation**, **nf2-mutation** — *NF1 → neurofibroma; NF2 → schwannoma and meningioma*

**Exposures**
- MS gets **ebv-infection**, **low-vitamin-d-latitude** and `smoking` reused — *smoking links MS to the atherosclerotic group*
- `campylobacter-jejuni` reused for GBS
- **prion-exposure** (BSE beef, contaminated instruments or grafts)
- **parameningeal-infection** (sinusitis, otitis media, mastoiditis, dental): leads to brain abscess

---

## 3. Mechanism parents

**Vascular**
- `cerebral-ischaemia` reused, gaining **small-vessel-occlusion** (lacunar: lipohyalinosis from hypertension) and **global-cerebral-hypoperfusion** (cardiac arrest, shock: watershed and HIE)
  - `thromboembolism` and `atheroembolism` already feed it — *AF stroke ~ PE; carotid stroke ~ PAD*
- **`intracranial-bleeding`** — *the four haemorrhages side by side, exactly the syllabus list*:
  - **microaneurysm-rupture** (ICH: hypertensive Charcot–Bouchard, amyloid angiopathy)
  - **aneurysm-rupture** (SAH)
  - **bridging-vein-tear** (SDH)
  - **middle-meningeal-artery-tear** (EDH)
- **cerebral-vasospasm** (SAH): delayed ischaemia

**Trauma**
- **`traumatic-brain-damage`** → **contusion**, **laceration**, **diffuse-axonal-injury** (rotational shear)

**Pressure and CSF**
- **raised-intracranial-pressure**: the hub. Haemorrhages, tumours, abscess, oedema, hydrocephalus and meningitis all feed it — *every mass lesion in the section links through one node*.
- **`csf-flow-disturbance`** → **obstructed-csf-pathway** (non-communicating: posterior fossa tumour, aqueduct stenosis), **impaired-csf-absorption** (communicating: after SAH or meningitis)

**Neurodegeneration**
- **`protein-misfolding-aggregation`** — *the unifying idea across the group*:
  - **amyloid-plaques-tau-tangles** (AD)
  - **alpha-synuclein-lewy-bodies** (PD, DLB)
  - **huntingtin-aggregates**
  - **tdp43-sod1-aggregates** (MND)
  - **prion-propagation** (PrP^Sc converting normal PrP)
- **`selective-neuronal-loss`**:
  - **nigrostriatal-dopamine-loss** (PD, DLB)
  - **cholinergic-neurone-loss** (AD, DLB)
  - **caudate-striatal-loss** (HD)
  - **upper-and-lower-motor-neurone-loss** (MND)
  - **spongiform-change** (prion)
  - *PD ~ DLB match twice, as they should*

**Demyelination**
- **`demyelination`** → **cns-demyelinating-plaques** (MS: T-cell and antibody attack on myelin), **peripheral-demyelination** (GBS)
- `molecular-mimicry` reused: *Campylobacter → GBS ~ GAS → rheumatic fever*

**Infection**
- **`cns-pathogen-entry`**:
  - **nasopharynx-to-bloodstream** (meningococcus, pneumococcus, Hib)
  - `haematogenous-seeding` reused (IE → brain abscess)
  - **contiguous-spread** (from a parameningeal infection)
  - **retrograde-neural-spread** (HSV via the trigeminal or olfactory nerve)
  - **direct-inoculation** (skull fracture, neurosurgery)
- **leptomeningeal-inflammation** (meningitis) and **brain-parenchymal-inflammation** (encephalitis)
- `abscess-formation` reused — *brain abscess ~ lung, liver and intra-abdominal abscess*
- `dysregulated-host-response` reused: *meningococcal sepsis ~ every septic disease*

**Tumours**
- `malignant-transformation` reused. GBM, medulloblastoma and metastases hang off it.
- **haematogenous-tumour-spread** (metastases, typically lung, breast, melanoma, kidney, colon)
- **tumour-suppressor-loss** (NF1, NF2): benign nerve-sheath tumours and meningioma

---

## 4. Finding parents

- `headache` reused, gaining:
  - **thunderclap-headache** (SAH)
  - **raised-icp-headache** (worse lying down and in the morning, with vomiting)
- **`meningism`** → **neck-stiffness**, **photophobia**, **kernig-sign**
- **non-blanching-rash** (meningococcal; `only: neisseria-meningitidis`)
- **`focal-neurological-deficit`**:
  - `transient-focal-neurological-deficit` moves under it
  - **hemiparesis**, **dysphasia**, **homonymous-hemianopia**, **cerebellar-ataxia**
  - **third-nerve-palsy** (PCom aneurysm, uncal herniation)
- **`impaired-consciousness`** → **lucid-interval** (EDH), **fluctuating-consciousness** (SDH)
  - Not `reduced-consciousness`, which is already the aspiration-risk cause.
- `confusion`, `fever` and `vomiting` reused
- **seizures**: tumour, encephalitis, abscess, stroke
- **papilloedema** and **cushing-response** (bradycardia with hypertension): signs of raised ICP
- **`cognitive-decline`**:
  - **episodic-memory-loss** (AD)
  - **fluctuating-cognition-hallucinations** (DLB)
  - **stepwise-decline** (vascular)
  - **rapidly-progressive-dementia** (CJD)
- **`parkinsonism`** → **bradykinesia**, **resting-tremor**, **rigidity**, **postural-instability**
- **chorea** (HD) and **myoclonus** (CJD): standalone
- **`motor-neurone-sign`**:
  - **umn-signs**
  - **lmn-signs**
  - **bulbar-palsy**
  - *MND has both; GBS is LMN; MS and stroke are UMN*
- **ascending-flaccid-weakness** with **areflexia** (GBS)
- **MS signs**: **optic-neuritis**, **internuclear-ophthalmoplegia**, **lhermitte-uhthoff**
- **`csf-abnormality`** (category `lab`, see Q5):
  - **csf-bacterial-pattern**
  - **csf-viral-pattern**
  - **csf-tb-fungal-pattern**
  - **xanthochromia**
  - **oligoclonal-bands**
  - **albuminocytological-dissociation**
  - **csf-hsv-pcr-positive**
  - **csf-cryptococcal-antigen**
  - **csf-rt-quic-positive**
- **`brain-imaging-abnormality`** (category `imaging`):
  - **lentiform-haematoma** (EDH)
  - **crescentic-haematoma** (SDH)
  - **subarachnoid-blood-on-ct**
  - **ring-enhancing-lesion** (GBM, abscess, metastases) — *the classic differential*
  - **periventricular-white-matter-lesions** (MS)
  - **dural-based-enhancing-mass** (meningioma)
  - **dilated-ventricles**
  - **caudate-atrophy**
  - **temporal-lobe-change** (HSV)
  - **reduced-dat-scan**
- **demyelinating-nerve-conduction** (GBS) and **denervation-on-emg** (MND)

---

## 5. Outcome parents

- **`brain-herniation`** → **subfalcine-herniation**, **uncal-herniation**, **tonsillar-herniation** (coning)
- `cerebral-oedema` reused, gaining **vasogenic-oedema** (tumour, abscess) and **cytotoxic-oedema** (ischaemia, HIE)
- `encephalopathy` gains **hypoxic-ischaemic-encephalopathy**
  - fed by `sudden-cardiac-death`, `cardiogenic-shock` and `septic-shock`
  - *HIE ~ hepatic encephalopathy ~ Wernicke's*
- `hydrocephalus` (a file) works as an outcome of SAH, meningitis and posterior fossa tumours
- **symptomatic-epilepsy**: after stroke, trauma, tumour, encephalitis or abscess
- `type-2-respiratory-failure` reused: *GBS ~ MND ~ botulism ~ COPD*
- **autonomic-dysfunction**: GBS, PD
- **aspiration pneumonia**: `community-acquired-pneumonia` reused as an outcome of stroke, PD and MND, with a note
- **Reused:**
  - `siadh`: *meningitis, SAH, TB meningitis ~ small-cell lung cancer*
  - `septic-shock`
  - **purpura-fulminans-dic** (new)
  - **waterhouse-friderichsen-syndrome** (adrenal haemorrhage)
  - **sensorineural-hearing-loss** (after meningitis)
- `dementia` (the umbrella file) is an outcome of PD, HD and late MS (see Q3)
- IE and SAB keep `septic-emboli-abscess`, and also gain `brain-abscess` (the file). IE's `mycotic-aneurysm` gains a chain into `intracerebral-haemorrhage`.

---

## Decisions (2026-11-07)

1. **Stroke and trauma:** `stroke` → ischaemic, TIA, ICH, SAH. `traumatic-brain-injury` → EDH, SDH.
2. **Hypoxic-ischaemic injury:** an outcome under `encephalopathy` (option A). It is reached from sudden cardiac death, cardiogenic shock and septic shock.
3. **Dementia:** an umbrella file over AD, DLB and vascular dementia.
4. **TB meningitis:** stays an outcome inside the TB file.
5. **CSF findings:** category `lab`, under `csf-abnormality`.
6. **Clashes:** both are accepted as they are.
7. **Batch order:** as proposed, two batches at a time.

## Progress

### Chain-linking audit (2026-11-07)

- Audited all 65 findings/outcomes absent from the chains of the currently implemented nervous-system diseases.
- Added defensible direct links and existing intermediate mechanisms for 60 items.
- Left five prognostic/shared-risk or NF2 co-occurrence associations deliberately loose.
- Added no vocabulary nodes and removed no findings/outcomes.
- Full reasoning is in `docs/chain-linking-audit-nervous.md`.

- **Batches 1–2 drafted** (2026-11-07, all `status: draft`):
  - **Stroke and trauma (9):**
    - the stroke umbrella, with ischaemic stroke, TIA, ICH and SAH under it
    - the TBI umbrella, with EDH and SDH under it
    - vascular dementia
  - **Tumours and ICP (9):**
    - the brain tumour umbrella, with glioblastoma, medulloblastoma, meningioma and brain metastases under it
    - the nerve sheath tumour umbrella, with neurofibroma and schwannoma under it
    - hydrocephalus
  - **Dementia umbrella**, drafted early because vascular dementia needs it as its parent. AD, DLB and the others join it in the neurodegenerative batch.
- **Changes to existing files:**
  - `stroke`, `ischaemic-stroke`, `transient-ischaemic-attack` and `brain-metastases` were outcome nodes and are now files, so the cardio and lung links still work.
  - `haemorrhagic-stroke` is removed, and hypertension now points at `intracerebral-haemorrhage`.
  - Sudden cardiac death gains the outcome `hypoxic-ischaemic-encephalopathy`. It's the only existing file with that link, because shock is an outcome node and can't carry outcomes of its own.
  - `transient-focal-neurological-deficit` now sits under `focal-neurological-deficit`.
  - `cerebral-oedema` gains vasogenic and cytotoxic kinds.
- **Changed from the sketch:**
  - Lacunar disease reuses the cardio node `small-vessel-disease` (lipohyalinosis) rather than a new node.
  - `intracranial-mass-lesion` (haematoma, tumour) is the shared step into raised ICP. Abscess will join it in the infection batch.
  - SAH vasospasm is the outcome `delayed-cerebral-ischaemia`, not a mechanism.
  - Subfalcine herniation is left out because K&C doesn't name it.
  - Ring-enhancing lesions are split by tumour type (necrotic GBM mass, multiple grey–white metastases). Abscess comes with the infection batch.
  - GBM links to lung adenocarcinoma through `egfr-mutation`, which only Mehlman cites.
  - The thinnest files are medulloblastoma, nerve sheath tumours and meningioma. K&C has a line or two on each, so they rely mostly on Mehlman.
- **Batches 3–4 drafted** (2026-11-07, all `status: draft`):
  - **CNS infection (6):**
    - the meningitis umbrella, with bacterial, viral and cryptococcal meningitis beneath it
    - encephalitis
    - brain abscess
  - **Demyelination (2):**
    - multiple sclerosis
    - Guillain–Barré syndrome
- **Four-case audit:**
  - Every finding and outcome in the eight new files is reached by its disease chain: **0 loose items**.
  - Direct disease manifestations use a defensible pathological step rather than disease → finding shortcuts where a shared intermediate exists.
  - Subtype-only claims are constrained: the temporal-lobe/PCR findings are HSV-specific, and the rash, DIC and Waterhouse–Friderichsen pathways are meningococcal-specific.
  - Risk associations such as EBV, low sunlight/vitamin D and smoking in MS remain upstream of immune-mediated injury rather than being presented as sufficient causes.
  - No questionable proposed finding or outcome had to be retained as an unconnected item.
- **Changes to existing files:**
  - `guillain-barre-syndrome` was an outcome node and is now a disease file; existing post-infectious links still resolve to it.
  - Infective endocarditis and S. aureus bacteraemia now reach `brain-abscess`; infective endocarditis also links mycotic aneurysm rupture to intracerebral haemorrhage.
  - TB meningitis remains inside the tuberculosis file as agreed. It now reaches SIADH as well as its TB-specific CSF pattern.
- **Changed or clarified from the sketch:**
  - The shared lymphocytic/high-protein/low-glucose CSF pattern is `csf-tb-fungal-pattern`; the older, more extreme `csf-tb-pattern` is retained as its TB-specific child rather than duplicated.
  - Brain abscess reuses `intracranial-mass-lesion`, `vasogenic-oedema`, `raised-intracranial-pressure` and `symptomatic-epilepsy`, keeping tumour, haemorrhage and infection paths comparable.
  - Viral meningitis remains deliberately thin because the sources support a compact, usually self-limiting syndrome rather than extra speculative outcomes.
  - The meningitis umbrella is also deliberately compact; subtype-specific CSF and complications live in its children.
- **Batch 5 drafted** (2026-11-07, all `status: draft`):
  - **Neurodegenerative (6):**
    - Alzheimer's disease and dementia with Lewy bodies, both under the existing `dementia` umbrella
    - Parkinson's disease
    - Huntington's disease
    - motor neurone disease
    - prion disease
- **Four-case audit:**
  - Every finding and outcome in the six new files is reached by its disease chain: **0 loose items**.
  - Direct manifestations are routed through the relevant selective neuronal loss: cholinergic, nigrostriatal, caudate/striatal, motor-neurone or spongiform degeneration.
  - Claims needing an intermediate use the shared protein-misfolding family rather than treating a gene or exposure as the immediate cause of a clinical sign.
  - Genetic associations remain upstream of their protein pathology. The MND file also starts from the protein mechanism because most disease is sporadic and should not be presented as genetically caused.
  - Late MS was **not** given a `dementia` outcome: K&C supports cognitive impairment in late disease, but not the broader diagnosis of dementia. This removes an overstatement from the original sketch under case 4.
- **Cross-disease reuse:**
  - Parkinson's disease and DLB share alpha-synuclein/Lewy-body pathology and nigrostriatal loss, while AD and DLB share cholinergic neuronal loss.
  - Parkinson's disease, Huntington's disease and the dementia children connect through the existing `dementia` file without making all neurodegenerative diseases dementia subtypes.
  - Late dysphagia in AD, Parkinson's disease and MND reaches the existing community-acquired pneumonia file through aspiration.
  - MND reuses respiratory muscle weakness and type 2 respiratory failure from GBS and the respiratory system.
- **Changed or clarified from the sketch:**
  - Prion disease includes sporadic, inherited and acquired entry routes in one file, as agreed; they converge on prion propagation and spongiform change.
  - Alzheimer's disease gains hippocampal atrophy because the source supports it as the characteristic structural imaging pattern.
  - DLB's cognitive fluctuation and formed visual hallucinations are represented as one discriminating finding, while parkinsonism and REM sleep behaviour disorder remain separate.
  - No separate cause was invented for sporadic MND; its shared TDP-43/SOD1 aggregation step is the mechanism-level entry point.
- **Nervous-system drafting complete:** all five agreed batches are now drafted. There was no second batch remaining after neurodegeneration, so work stops here rather than starting an unagreed system.

## Resolved planning questions (retained for rationale)

1. **Stroke and haemorrhage grouping.** A node has one parent, so ICH and SAH can't sit under both "stroke" and "intracranial haemorrhage".
   - Recommended: `stroke` → ischaemic, TIA, ICH, SAH, which follows K&C's definition. `traumatic-brain-injury` → EDH, SDH. All four bleeds still match through the `intracranial-bleeding` mechanism parent.
   - The other way: an `intracranial-haemorrhage` umbrella over all four bleeds, with stroke only over ischaemic and TIA.
2. **Hypoxic-ischaemic injury: outcome or file?**
   - Recommended: an outcome under `encephalopathy`, reached from cardiac arrest and shock. It's a consequence, not a disease you diagnose on its own.
   - A file would give it its own page, but would lose the `encephalopathy` parent.
3. **A `dementia` umbrella file** over AD, DLB and vascular dementia?
   - Recommended: yes. The syllabus puts "multi-infarct dementia" under stroke, so vascular dementia keeps the `cns-trauma-stroke` group but has `dementia` as its parent.
   - Prion disease, PD and HD reach `dementia` as an outcome rather than sitting under it.
4. **TB meningitis.** It's an outcome node inside the TB file today, under `extrapulmonary-tb`.
   - Recommended: keep it there, and give it its CSF pattern and SIADH through the TB file. Meningitis then has three children, not four.
   - The other way is to make it a file under `meningitis`. That means one more file, but it loses the `extrapulmonary-tb` sibling links.
5. **CSF findings.** Should they be `lab` with a `csf-abnormality` parent (recommended: no app change), or a new `csf` category with its own Differential tab, like `endoscopy` was for GI?
6. **Clashes**:
   - Coxsackie B is under `cardiotropic-virus`, so it won't match enterovirus meningitis. Leave it, or move Coxsackie under `enterovirus` and lose its cardiotropic siblings? Recommended: leave it, and add a note.
   - `brain-metastases` loses `distant-metastases` as its parent, so lung cancer → brain mets no longer counts as related to other metastases. Fine?
7. **Batch order (proposed):**
   - stroke and trauma (the hubs: raised ICP, haemorrhage)
   - tumours and ICP
   - CNS infection
   - demyelination
   - neurodegenerative

   Two batches at a time, as for GI.

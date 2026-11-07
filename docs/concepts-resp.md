# Step R1 — Respiratory parent concepts (agreed 2026-11-06; nodes go into nodes.yaml batch by batch)

Same rules as `concepts-cardio.md`:
- A parent means "is a kind of". Siblings under one parent count as **related**, and matching rolls up one level only.
- **Mechanism parents** carry cross-disease similarity.
- **Finding parents** carry bedside similarity.
- **Outcome parents** group complications.

Legend:
- `id`: an existing node, reused
- **`id`**: a new node
- (→ D): will become a disease file
- *italic*: the link it creates

Every new disease gets `systems: [respiratory]`. Diseases already tagged both cardiovascular and respiratory: PE, pulmonary hypertension, cor pulmonale, pulmonary oedema.

---

## 1. Disease list (syllabus §8): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| infection | influenza, rsv-infection, covid-19, community-acquired-pneumonia, hospital-acquired-pneumonia, ventilator-associated-pneumonia, ards | pneumonia → CAP, HAP, VAP (aspiration is a route, see decisions) |
| airways | asthma, copd, bronchiectasis, cystic-fibrosis, alpha-1-antitrypsin-deficiency | — |
| interstitial | idiopathic-pulmonary-fibrosis, hypersensitivity-pneumonitis, nsip, asbestosis, pneumoconiosis, sarcoidosis | interstitial-lung-disease → all except sarcoidosis (which also hits other systems) |
| mycobacterial | tuberculosis, ntm-infection | — (latent, pulmonary, extrapulmonary, meningitis are nodes inside the TB file) |
| tumours | lung-adenocarcinoma, squamous-cell-lung-carcinoma, large-cell-lung-carcinoma, small-cell-lung-carcinoma, mesothelioma | lung-cancer → the four; nsclc → the first three |

That's about 25 files.
- **Not diseases:**
  - CURB-65, vaccination, TB drug resistance and molecular testing are management and investigation. They go in a disease's `note`.
  - Paraneoplastic syndromes become **outcomes** of the cancers.
- **Pleural effusion** stays a finding (it already is one, under `fluid-overload-sign`) and gains transudate and exudate children (see Q4).
- **Systems:**
  - ARDS gets `[respiratory]`.
  - Sarcoidosis gets `[respiratory, immunology]` because it is multi-system.
  - TB gets `[respiratory]` (its meningitis is an outcome node).

---

## 2. Cause parents

**Organisms**
- `streptococci` → **streptococcus-pneumoniae** — *pneumococcus joins viridans strep and GAS*
- `gram-negative-bacilli` → **haemophilus-influenzae**, **pseudomonas-aeruginosa**, **enterobacteriaceae** (incl. Klebsiella) — *HAP ~ catheter bacteraemia*
- **`atypical-bacteria`** → **mycoplasma-pneumoniae**, **legionella-pneumophila**
- **`respiratory-virus`** → **influenza-virus**, **rsv**, **sars-cov-2**
- **`mycobacteria`** → `mycobacterium-tuberculosis` (moves under it), **non-tuberculous-mycobacteria**
- `s-aureus` reused — *SAB, IE, HAP and post-influenza pneumonia share it*

**Exposures and risk factors**
- `smoking` reused — *links COPD, lung cancer, IPF to the whole atherosclerotic group*
- **`inhaled-exposure`** → **asbestos**, **coal-dust**, **silica**, **organic-antigen** (birds, moulds: HP)
- **`aspiration-risk`** → **reduced-consciousness**, **dysphagia**
- **mechanical-ventilation**, **immunosuppression** (HIV and drugs): standalone risk factors
- **atopy**: a risk factor for asthma

**Genetic**
- **cftr-mutation**, **serpina1-mutation** (A1AT): standalone
- **`oncogenic-driver`** → **egfr-mutation**, **alk-rearrangement**, **ros1-rearrangement** — *the syllabus's molecular testing list*

---

## 3. Mechanism parents

**Airways**
- **`airflow-obstruction`** → **reversible-bronchoconstriction** (asthma), **small-airway-narrowing** (COPD), **airway-dilatation-and-plugging** (bronchiectasis, CF) — *the three obstructive diseases side by side*
- **`airway-inflammation`** → **type-2-eosinophilic-inflammation** (asthma), **neutrophilic-airway-inflammation** (COPD, bronchiectasis, CF)
- **`impaired-mucus-clearance`** → **cftr-dysfunction** (CF), **ciliary-damage** (smoking, post-infection) — *the vicious cycle into bronchiectasis*
- **`protease-antiprotease-imbalance`** → **a1at-deficiency-state**, **smoking-protease-excess** → feeds **alveolar-wall-destruction** (emphysema)

**Alveoli and interstitium**
- **`alveolar-filling`** → `alveolar-flooding` (moves under it: pulmonary oedema), **alveolar-exudate** (pneumonia), **diffuse-alveolar-damage** (ARDS) — *cardiogenic oedema vs ARDS vs pneumonia: the classic "white lungs" comparison*
- **`lung-scarring`** → **interstitial-fibrosis** (IPF, asbestosis, chronic HP, NSIP), **progressive-massive-fibrosis** (pneumoconiosis)
- **`granuloma-formation`** → **caseating-granuloma** (TB), **non-caseating-granuloma** (sarcoid), **poorly-formed-granuloma** (HP) — *exactly the syllabus's "differential for granulomatous lung disease"*

**Gas exchange**
- **`impaired-gas-exchange`** → `ventilation-perfusion-mismatch` (moves under it), **diffusion-impairment** (ILD), **alveolar-hypoventilation** (COPD, type 2 failure), **intrapulmonary-shunt** (pneumonia, ARDS)
- `hypoxic-vasoconstriction` reused — *COPD and ILD reach pulmonary hypertension and cor pulmonale, already drawn*

**Infection**
- **`lung-pathogen-entry`** → **droplet-inhalation**, **aspiration-of-oropharyngeal-flora**, **ventilator-circuit-entry**, and `haematogenous-seeding` (moves under it: septic emboli to the lung)
- `dysregulated-host-response` reused — *pneumonia → sepsis → ARDS*
- **`tb-host-response`** → **contained-infection** (latent), **reactivation**, **haematogenous-dissemination** (miliary, meningitis)

**Tumours**
- **`malignant-transformation`** → **carcinogen-induced** (smoking, asbestos), **driver-mutation-induced** (EGFR and the others)
- **`ectopic-hormone-secretion`** → **adh-secretion**, **pthrp-secretion**, **acth-secretion** — *SCLC vs squamous*
- `immune-mediated-injury` gains **paraneoplastic-autoimmunity** (Lambert–Eaton)
- **`pleural-fluid-accumulation`** → **raised-capillary-hydrostatic-pressure** (HF: transudate), **low-oncotic-pressure** (nephrotic, cirrhosis), **pleural-capillary-leak** (infection, cancer: exudate), **lymphatic-obstruction** (cancer) — *links HF, nephrotic syndrome, pneumonia and cancer through one finding*

---

## 4. Finding parents

- **`cough`** → **dry-cough**, **productive-cough**, **purulent-sputum**. `haemoptysis` stays standalone.
- `dyspnoea` reused, gaining **episodic-dyspnoea** (asthma)
- **`added-lung-sound`** → **wheeze**, **fine-end-inspiratory-crackles** (ILD), **coarse-crackles** (bronchiectasis, pneumonia), **bronchial-breathing**, **pleural-rub**. `pulmonary-crackles` stays under fluid overload — *HF crackles vs ILD crackles stays a discriminator, not a match*
- **`abnormal-lung-function`** → **obstructive-spirometry**, **restrictive-spirometry**, **reduced-tlco**, **bronchodilator-reversibility**
- **`lung-imaging-abnormality`** → **consolidation**, **reticular-honeycombing**, **bilateral-diffuse-infiltrates** (ARDS), **cavitation**, **hyperinflation**, **bilateral-hilar-lymphadenopathy**, **pleural-plaques**, **lung-mass**, **bronchial-wall-thickening** (tram tracks). `pulmonary-congestion-cxr` stays where it is.
- `pleural-effusion` stays under `fluid-overload-sign` and gains children **transudative-effusion** and **exudative-effusion**. A node can be a parent and a child at once, so the HF link stays.
- **`tb-test-positive`** → **positive-tst**, **positive-igra**, **afb-smear-positive**, **mtb-culture-or-pcr-positive**
- **Standalone:**
  - **finger-clubbing**, **night-sweats**, **confusion**, **hypercapnia**, **raised-eosinophils-ige**
  - **hypercalcaemia**: *sarcoid ~ squamous lung cancer*
  - **hyponatraemia**: *SCLC SIADH, pneumonia, Legionella*
  - **raised-serum-ace**, **low-a1at-level**, **raised-sweat-chloride**

---

## 5. Outcome parents

- `respiratory-failure` reused → **type-1-respiratory-failure**, **type-2-respiratory-failure**
- **`pleural-infection`** → **parapneumonic-effusion**, **empyema**. **lung-abscess** is standalone.
- **`acute-exacerbation`** → **asthma-exacerbation**, **copd-exacerbation**, **infective-bronchiectasis-exacerbation**
- **`paraneoplastic-syndrome`** → **siadh**, **hypercalcaemia-of-malignancy**, **ectopic-cushing**, **lambert-eaton-syndrome**
- **`local-tumour-spread`** → **malignant-pleural-effusion**, **superior-vena-cava-obstruction**, **recurrent-laryngeal-nerve-palsy**. **distant-metastases** is standalone.
- **pneumothorax** (COPD bullae, CF), **miliary-tb**: standalone
- **Reused as outcomes:**
  - `septic-shock`
  - the diseases `ards`, `bronchiectasis` (*after severe infection*), `pulmonary-hypertension` and `cor-pulmonale`; **tb-meningitis**, **latent-tb-infection** and **extrapulmonary-tb** are outcome nodes of the TB file

---

## Decisions (2026-11-06)

1. **Pneumonia by setting.**
   - There are three files: CAP, HAP and VAP, each fed by its own organisms as cause nodes. Each organism's differences go in the edge `note`.
   - Influenza, RSV and COVID-19 have their own files.
   - Aspiration is a route (`aspiration-of-oropharyngeal-flora`) that feeds CAP and HAP, not a file of its own.
2. **Lung cancer:** one file per histological type, under `lung-cancer`, with `nsclc` as a middle umbrella.
3. **TB:** a single `tuberculosis` file.
   - Its stages are nodes inside the file: latent infection, reactivation, haematogenous spread, and the outcomes (miliary TB, TB meningitis, extrapulmonary TB).
   - Its causes are also nodes: HIV and immunosuppression.
4. **Pleural effusion:** stays under `fluid-overload-sign`, with transudate and exudate children (see §4).
5. **Batch order:** airways → infection → interstitial → mycobacterial → tumours.

## Progress and pending links

### Chain-linking audit (2026-11-07)

- Audited all 213 findings/outcomes that were listed but absent from their disease chain.
- Added defensible direct links and existing intermediate mechanisms for 205 items.
- Left eight items deliberately loose: three need missing systemic/cachexia mechanisms and five are phenotype, thromboembolic or paraneoplastic associations that should not be force-linked.
- No vocabulary nodes or disease-list entries were added or removed. One provisional malignant-effusion edge was corrected to restore the causal direction.
- Full reasoning is in `docs/chain-linking-audit-resp.md`.

- Done (all `status: draft`):
  - airways (5)
  - infection (8: pneumonia umbrella, CAP, HAP, VAP, influenza, RSV, COVID-19, ARDS)
  - interstitial (7: ILD umbrella, IPF, NSIP, HP, pneumoconiosis → asbestosis, sarcoidosis)
  - mycobacterial (2: tuberculosis, NTM)
  - tumours (7: lung-cancer umbrella → nsclc → squamous, adenocarcinoma, large-cell; small-cell; mesothelioma)
- Done: silicosis → TB, caseating granuloma, bronchiectasis and CF → NTM, asbestosis → lung cancer and mesothelioma.
- Changed from the sketch:
  - `ros1-rearrangement` was left out because neither source mentions it.
  - `cavitation` was renamed "Cavitating lung lesion" so TB and squamous carcinoma match exactly.
  - Malignant pleural effusion is an outcome only; the `pleural-fluid-accumulation` mechanisms wait on the transudate question.
- Respiratory §8 is fully drafted.

# Step B1 — Clinical biochemistry parent concepts (draft for review, 2026-11-10)

Same rules and legend as `concepts-nervous.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node or file, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [biochemistry]` unless noted.

Sources (headings listed; offsets checked):
- K&C ch.9 Water balance, fluids and electrolytes (−19): volume regulation p.172–177, decreased ECF volume p.181–183, hyponatraemia p.183–185 (SIADH p.184, osmotic demyelination p.185), hypernatraemia p.186–187, hypokalaemia p.187–189, hyperkalaemia p.189–190, magnesium p.191–192, acid–base p.197–202 (anion gap p.199, lactic acidosis p.200, ketoacidosis p.201, metabolic alkalosis p.202)
- K&C ch.21 Endocrinology (−22): posterior pituitary p.592, diabetes insipidus p.641–643, SIADH p.643
- K&C ch.12 Prescribing and toxicology (**−18**, new; checked on Introduction 252, The dose 253, Special populations 256, Poisoning 260): salicylates p.271, ethylene glycol p.273, methanol p.274
- K&C ch.25 Liaison psychiatry: hyperventilation syndrome box (offset not yet worked out)
- K&C ch.28 Respiratory (−18): hyperventilation p.937; obesity hypoventilation only named in a list
- Mehlman HY Renal, HY Endocrine and HY Pulmonary: to be searched batch by batch (not yet read for §3)
- No LMC biochemistry handouts in `Resources/` yet.

Syllabus §3 has three groups: **sodium and water** (body water, osmolality, ADH and aldosterone, dehydration, hypo- and hypernatraemia, fluid balance, SIADH, AVP deficiency and resistance), **potassium** (sources, distribution, renal handling, acid–base effects, hypo- and hyperkalaemia with ECG features, magnesium and potassium wasting) and **acid–base and blood gases** (buffering and compensation; metabolic acidosis with normal and raised anion gap, including cardiorespiratory arrest, lactic acidosis, DKA and alcohol and salicylate poisoning; metabolic alkalosis, e.g. pyloric stenosis; respiratory acidosis, e.g. severe asthma, decompensated COPD, obesity hypoventilation, neuromuscular disease; respiratory alkalosis from hyperventilation).

**This section is unlike the others.** It is mostly physiology and lab disturbances rather than diseases, and the key lab values already exist as findings used across the graph:
- `hyponatraemia` (6 files), `hypokalaemia` (6), `hyperkalaemia` (5), `metabolic-acidosis` with `high-anion-gap-acidosis` and `normal-anion-gap-acidosis` (5), `hypokalaemic-alkalosis` (2), `hypomagnesaemia` (3)
- `siadh` (outcome under `paraneoplastic-syndrome`; SCLC, meningitis, TB), `adh-secretion` (ectopic, SCLC)
- `volume-depletion` (cause; AKI, renal stones), `dehydration-signs` (6 files)
- `diabetic-ketoacidosis` (outcome, T1DM; agreed as an outcome in endocrine Q11), `type-2-respiratory-failure` (asthma, COPD, MG, GBS, MND, botulism), `alveolar-hypoventilation`

So the main question (Q1) is how the electrolyte disturbances become files at all.

---

## 1. Disease list (syllabus §3): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| sodium-water | volume-depletion ("Dehydration and volume depletion"), hyponatraemia, hypernatraemia, siadh, avp-deficiency, avp-resistance | none (Q4) |
| potassium | hypokalaemia, hyperkalaemia | none |
| acid-base | lactic-acidosis, salicylate-poisoning, toxic-alcohol-poisoning (methanol, ethylene glycol) | none |

About 11 files (if Q1 goes as recommended).

**Not files here, and why:**
- Metabolic acidosis, metabolic alkalosis, respiratory acidosis and alkalosis: lab patterns, kept as **findings** (the acidosis tree exists; respiratory ones are new, Q6). Their causes are the files that produce them.
- DKA: stays an outcome of T1DM, as agreed in endocrine Q11 (Q5).
- Pyloric stenosis, severe asthma, COPD, MG, GBS, MND, cardiac arrest: existing files; §3 adds the blood-gas links to them.
- Obesity hypoventilation: K&C only names it in a list, so a note (or a cause node from `obesity`) rather than a file.
- Hyperventilation syndrome: a cause node feeding respiratory alkalosis (Q6), not a file.
- Body water, osmolality, fluid balance charts, buffering: physiology, in notes.
- Hypermagnesaemia, hyper/hypophosphataemia: findings already (phosphate was handled in §14).

**Existing nodes that become files (same id, §5.5):**
- `volume-depletion` (cause) → file. AKI and renal stones keep starting chains from it.
- `siadh` (outcome under `paraneoplastic-syndrome`) → file. With the Q5 rule from §14, it **keeps its paraneoplastic parent**, beside ectopic Cushing's, hypercalcaemia of malignancy and LEMS. Its 3 users work unchanged.

**Second systems:**
- avp-deficiency, avp-resistance: `[biochemistry, endocrine]`?
- salicylate-poisoning, toxic-alcohol-poisoning: none (there is no toxicology section).
- See Q7.

---

## 2. Cause parents

**Sodium and water**
- `volume-depletion` (the file) as a cause of hypernatraemia and of `aki`; its own causes: `vomiting` and `diarrhoea` (findings, as roots), haemorrhage, burns, **diuretic** (new drug node; also feeds hyponatraemia and hypokalaemia) — *volume depletion ~ gastroenteritis ~ GI bleed*
- Hyponatraemia causes, by volume status (K&C's approach): hypovolaemic (diuretics, `adrenal-insufficiency`, vomiting), euvolaemic (`siadh`, `hypothyroidism`, `hypopituitarism`), hypervolaemic (`heart-failure`, `cirrhosis`, `nephrotic-syndrome`) — all existing files *~ the hyponatraemia differential*
- SIADH causes: `small-cell-lung-carcinoma`, `bacterial-meningitis`, `pneumonia`, `tuberculosis`, `ischaemic-stroke`/`subarachnoid-haemorrhage` if the pages list them, **siadh-drug** (carbamazepine, SSRIs, others; a drug node) — *SIADH ~ SCLC ~ CNS disease*
- AVP deficiency: `traumatic-brain-injury`, `pituitary-adenoma` / neurosurgery, idiopathic; AVP resistance: `lithium` (reused), `hypercalcaemia`, `hypokalaemia` as roots — *nephrogenic DI ~ hyperPTH ~ lithium*

**Potassium**
- Hypokalaemia: `diuretic`, vomiting, diarrhoea, `primary-hyperaldosteronism`, `cushings-syndrome`, `renal-tubular-acidosis`, `refeeding-syndrome`, insulin/β-agonists (shift) — *hypokalaemia ~ Conn's ~ Cushing's ~ RTA*
- `hypomagnesaemia` → renal potassium wasting — *~ refeeding, CPPD, hypoPTH*
- Hyperkalaemia: `acute-kidney-injury`, `chronic-kidney-disease`, `adrenal-insufficiency`, `rhabdomyolysis` (reused), **potassium-retaining-drug** (ACE inhibitors, ARBs, spironolactone; new), acidosis (shift), DKA (via T1DM)

**Acid–base**
- Lactic acidosis: `shock`, `sudden-cardiac-death` (arrest), `sepsis`/`septic-shock`, **metformin** (new drug node, if the page says so)
- Salicylate and toxic alcohols: new **salicylate-overdose** and **toxic-alcohol-ingestion** (risk-factor/drug) as roots
- Respiratory acidosis: `alveolar-hypoventilation` (reused) from asthma, COPD and `respiratory-muscle-weakness` (reused; MG, GBS, MND) — *already shared*
- Respiratory alkalosis: **hyperventilation** (new cause: anxiety/panic, early salicylate, hypoxaemia, PE)

---

## 3. Mechanism parents

- New **`water-imbalance`** parent (Q3), kinds:
  - **free-water-excess** (more water than sodium retained: SIADH, hypervolaemic states)
  - **free-water-deficit** (water lost or not taken in: DI, volume depletion with poor intake)
- New **`adh-excess`** under the provisional `hormone-excess`, with the existing ectopic `adh-secretion` gaining it as parent? (`adh-secretion` already sits under `ectopic-hormone-secretion`; one parent only, so instead `adh-secretion` stays and SIADH's non-tumour causes use **adh-excess**) — Q3
- New **`adh-deficiency`** under `hormone-deficiency` (AVP deficiency) — *~ hypopituitarism*
- New **renal-adh-resistance** (AVP resistance)
- New **cerebral-oedema-from-hyponatraemia**? Reuse `cerebral-oedema` (exists, DKA) — *hyponatraemic encephalopathy ~ DKA*; **osmotic-demyelination** as an outcome of over-rapid correction
- New **renal-potassium-loss** and **transcellular-potassium-shift** (both directions: insulin/alkalosis into cells; acidosis/cell lysis out) — *hypokalaemia ~ hyperkalaemia ~ DKA ~ refeeding*
- New **myocardial-membrane-instability** (hyper- and hypokalaemia → arrhythmia)
- Acid–base: new **lactate-accumulation** (tissue hypoxia), reuse `ketogenesis` (DKA); new **toxic-acid-metabolites** (formate, glycolate/oxalate); new **salicylate-uncoupling** (respiratory centre stimulation then metabolic acidosis)
- `alveolar-hypoventilation` → **co2-retention**? (or straight to the respiratory acidosis finding)

---

## 4. Finding parents

- `hyponatraemia`, `hypokalaemia`, `hyperkalaemia` (the lab values; Q1 decides their ids), new **hypernatraemia**
- New **urine-osmolality-pattern** (lab) with kinds **inappropriately-concentrated-urine** (SIADH: urine osm > 100, urine Na > 30, euvolaemic) and **dilute-polyuria** (DI: low urine osm, rises after desmopressin in AVP deficiency only)
- Reuse `polyuria-nocturia`, `polydipsia` (*DI ~ diabetes ~ hyperPTH*), `dehydration-signs`, `postural-hypotension`, `tachycardia`, `confusion`, `seizures`, `reduced-consciousness`?
- ECG: new **hyperkalaemia-ecg** (peaked T, wide QRS, sine wave) and **hypokalaemia-ecg** (flat T, U waves, ST depression), both ECG category; reuse `ventricular-arrhythmia` (outcome)
- New **muscle-weakness-cramps** (hypokalaemia; also paralysis)
- Acid–base: reuse `metabolic-acidosis` tree and `kussmaul-breathing`; new **raised-lactate**, **raised-osmolar-gap** (toxic alcohols), **visual-loss** (methanol), **oxalate-crystals-aki** (ethylene glycol → reuse `acute-kidney-injury`), **tinnitus-vomiting-hyperventilation** (salicylate); new **blood-gas-abnormality** (lab) parent over **respiratory-acidosis** and **respiratory-alkalosis** (Q6)

---

## 5. Outcome parents

- `acute-kidney-injury` (file) from volume depletion, ethylene glycol, salicylate — *already used*
- `hypovolaemic-shock` (exists) from volume depletion
- `ventricular-arrhythmia` / `sudden-cardiac-death` from hyper- and hypokalaemia
- New **hyponatraemic-encephalopathy** under `encephalopathy` (beside hepatic, uraemic, Wernicke's) — *~ cirrhosis, CKD*
- New **osmotic-demyelination-syndrome** (outcome of over-rapid correction)
- `seizures`, `coma` (reused)

---

## 6. Questions before drafting

1. **How the electrolyte disorders become files.** `hyponatraemia`, `hypokalaemia` and `hyperkalaemia` are lab findings used by 17 files, so a file can't take those ids.
   - **(a) Recommended:** rename the three lab findings to plain lab ids (`low-serum-sodium`, `low-serum-potassium`, `high-serum-potassium`) in a mechanical pass over the 17 files, and give the clean ids to four new files (hyponatraemia, hypernatraemia, hypokalaemia, hyperkalaemia). Each file then holds its causes (the "approach to hyponatraemia" as chain links from Addison's, SIADH, cirrhosis…) and its consequences (encephalopathy, ECG, arrhythmia). This is unlike §14 Q4, where the parathyroid files could carry the calcium features; here there's no such disease, and the potassium group would otherwise be empty.
   - (b) As §14 Q4: keep the findings and make no electrolyte files. Consequences (ECG changes, encephalopathy) are added to each cause file instead (AKI, CKD, Addison's… each gain `[hyperkalaemia, myocardial-membrane-instability]`), and the potassium group has no files.
   - (c) Files with different ids (`hyponatraemia-disorder`), keeping the findings: both a finding and a file for each.
2. **`volume-depletion` and `siadh` become files** with the same ids; SIADH keeps `paraneoplastic-syndrome` as its parent (the §14 rule). Recommended: yes.
3. **ADH mechanisms:** new `water-imbalance` parent (free-water excess / deficit) and `adh-excess`, `adh-deficiency`, `renal-adh-resistance`. Recommended: yes. The other way: no `water-imbalance` parent, so SIADH and DI are linked only through findings.
4. **AVP deficiency and resistance:** two files, no umbrella (the syllabus has retired "diabetes insipidus"). Recommended: yes, linked by `dilute-polyuria` and `free-water-deficit`. The other way: a `diabetes-insipidus`-style umbrella.
5. **DKA stays an outcome** of T1DM (endocrine Q11); §3 links lactic acidosis, salicylate and toxic alcohols beside it under `high-anion-gap-acidosis`. Recommended: yes. The other way: DKA becomes a file now.
6. **Blood gases as findings:** a new `blood-gas-abnormality` parent with `respiratory-acidosis` and `respiratory-alkalosis`; asthma, COPD, MG, GBS and MND each gain `type-2-respiratory-failure → respiratory-acidosis`, and pyloric stenosis gains `hypokalaemic-alkalosis`. Hyperventilation and obesity hypoventilation as causes, not files. Recommended: yes.
7. **Second systems:** `[biochemistry, endocrine]` for avp-deficiency, avp-resistance and siadh; none for the rest. Recommended: yes.
8. **Poisoning files:** salicylate-poisoning and toxic-alcohol-poisoning (methanol and ethylene glycol in one file, marked `only:`). Recommended: yes, as the syllabus names them under acidosis. The other way: notes on the acidosis finding only.

---

## 7. Batch order

1. Sodium: volume-depletion, hyponatraemia, hypernatraemia (3) — plus the Q1 rename pass, if (a)
2. ADH: siadh, avp-deficiency, avp-resistance (3)
3. Potassium: hypokalaemia, hyperkalaemia (2)
4. Acid–base: lactic-acidosis, salicylate-poisoning, toxic-alcohol-poisoning (3), with the blood-gas links into existing files

Volume depletion comes first so the sodium files can start from it; SIADH and the AVP files (batch 2) then add their own links into hyponatraemia and hypernatraemia. Potassium comes before acid–base so lactic acidosis and the poisonings can reach the potassium shift.

---

## Decisions (owner, 2026-11-10)

- Q1 (a): the lab findings are renamed `hyponatraemia` → `low-serum-sodium`, `hypokalaemia` → `low-serum-potassium`, `hyperkalaemia` → `high-serum-potassium`; the clean ids go to files.
- Q2–Q8: yes, as recommended.

## Progress

- **Q1 rename done** (2026-11-10): `hyponatraemia` → `low-serum-sodium`, `hypokalaemia` → `low-serum-potassium`, `hyperkalaemia` → `high-serum-potassium` in nodes.yaml, 14 disease files and `scripts/bundles.test.js`; names now "Low serum sodium" etc. Two notes that used the words as prose (adrenal insufficiency, CAP) were left as they were. `hypokalaemic-alkalosis` keeps its parent, now `low-serum-potassium`. Old concepts docs and audits still mention the old ids as history.
- **Batches 1–2 drafted** (2026-11-10, all `status: draft`, 0 loose items): volume-depletion ("Dehydration and volume depletion"), hyponatraemia, hypernatraemia; siadh (`parent: paraneoplastic-syndrome`), avp-deficiency, avp-resistance (all three `[biochemistry, endocrine]`).
- **Nodes that became files:** `volume-depletion` (cause; AKI and renal stones start from it unchanged) and `siadh` (outcome; SCLC, bacterial meningitis and TB unchanged; keeps its paraneoplastic parent under the §14 rule).
- **Changes to existing files:** `primary-hyperparathyroidism` gained `hypercalcaemia → avp-resistance` and the outcome (K&C p.642-643).
- **Shared hubs:** `water-imbalance` → `free-water-excess` (hyponatraemia, SIADH) and `free-water-deficit` (hypernatraemia, both AVP files); `adh-excess` under `hormone-excess` (volume depletion, Addison's, hypothyroidism, SIADH) beside the existing ectopic `adh-secretion` (*SIADH ~ SCLC*); `adh-deficiency` under `hormone-deficiency` (*~ hypopituitarism, Addison's*); `urine-osmolality-pattern` → `inappropriately-concentrated-urine` and `dilute-polyuria`. `hyponatraemic-encephalopathy` sits under `encephalopathy` (*~ hepatic, uraemic, Wernicke's*).
- **Cause groups (§6.5a):** `oedematous-state` (heart failure, cirrhosis, nephrotic syndrome, AKI → hyponatraemia), `cns-insult` (meningitis, head injury, subdural, abscess → SIADH), `pulmonary-lesion` (pneumonia, TB → SIADH), `hypothalamic-stalk-lesion` (brain metastases, sarcoid, TB, meningitis → AVP deficiency).
- **Changes from the sketch:** `concentrated-low-sodium-urine` already existed (kidney, AKI) and is reused instead of a new kind under `urine-osmolality-pattern`. No `siadh-drug` group split; one drug node. SIADH causes from the sketch I couldn't source (stroke, SAH) were left out; Box 21.54 lists meningitis, tumours, head injury, subdural, abscess, SLE, vasculitis.
- **Batches 3–4 drafted** (2026-11-10, all `status: draft`, 0 loose items): hypokalaemia, hyperkalaemia; lactic-acidosis, salicylate-poisoning, toxic-alcohol-poisoning (`only:` methanol / ethylene glycol).
- **Changes to existing files:** asthma, COPD, myasthenia gravis, GBS and MND each gained `type-2-respiratory-failure → respiratory-acidosis` and the finding (K&C p.198); congenital-pyloric-stenosis gained `gastric-outlet-obstruction → hypokalaemic-alkalosis` (K&C p.187, 202).
- **Existing node given a parent:** `hypercapnia` (COPD) under the new `blood-gas-abnormality`, beside `respiratory-acidosis` and `respiratory-alkalosis` (Q6).
- **Shared hubs:** `transcellular-potassium-shift` → `potassium-into-cells` (insulin, β2-agonists; *~ refeeding*) and `potassium-out-of-cells` (acidosis, rhabdomyolysis, tumour lysis; *~ DKA, AKI*); `myocardial-membrane-instability` (both potassium files → arrhythmia, sudden cardiac death); `renal-potassium-loss` from diuretics, Conn's, Cushing's, RTA, volume depletion and hypomagnesaemia (*~ refeeding, CPPD, hypoPTH*); `high-anion-gap-acidosis` now reached by DKA, lactic acidosis, salicylate and toxic alcohols (GOLD MARK); `low-serum-potassium → avp-resistance`.
- **Changes from the sketch:** no `hyperventilation` cause node (no file in this batch needs it; respiratory alkalosis is reached from salicylate) and no obesity-hypoventilation node (K&C only names it). No `raised-osmolar-gap` or `visual-loss` nodes: K&C ch.12 doesn't mention the osmolar gap, and methanol reuses `blurred-vision`. Lactic acidosis reaches `tachypnoea` rather than `kussmaul-breathing`, whose name includes the ketotic breath of DKA.
- **Thinnest:** lactic acidosis (one K&C page); the hyperventilation syndrome box (K&C ch.25) is unread, as its offset isn't known.
- **§3 fully drafted: 11 diseases with biochemistry as their home system** (2026-11-10). Next: owner review; then choose the next system (§4 infection, §9 head and neck, §15 skin and breast, §16 female genital remain).

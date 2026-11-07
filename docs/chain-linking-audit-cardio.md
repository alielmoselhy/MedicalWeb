# Cardiovascular chain-linking audit

This records the first causal audit of findings and outcomes that were listed for a disease but absent from its `chain`. The aim is not to force the warning to zero. A remaining loose item is preferable to a false causal arrow.

## Classification

1. **Direct and defensible:** the existing chain already contained the mechanism that most directly explains the item. A bare causal edge was added.
2. **Missing intermediate mechanism:** the item is credible, but the original chain skipped a necessary step. Existing vocabulary was added where it was adequate. Items needing a new or conditional concept remain loose.
3. **Association-only:** the item is clinically associated with the disease, but a universal deterministic edge would overstate causality. It remains in `findings` or `outcomes` and intentionally stays loose.
4. **Questionable underlying item:** the problem was not merely a missing edge; the item was misleading as an outcome. These entries were removed, with the reason recorded below.

## Case 1 — direct links added

The majority of the 223 original loose cardiovascular items fell here. Examples include:

- valve flow → its murmur; stenosis → its bruit or pressure finding
- venous congestion → oedema, effusion or raised JVP
- reduced cardiac output → fatigue, tachycardia or shock
- thromboembolism → ischaemic stroke
- myocardial necrosis → CK-MB rise
- dysregulated host response → fever, rigors or tachycardia
- ventricular arrhythmia → sudden cardiac death

These additions use concepts already present in each disease and make explicit physiology that the file already implied.

## Case 2 — intermediate mechanisms

Existing vocabulary was sufficient and was inserted for:

- aortic regurgitation and stenosis: ventricular dysfunction → pulmonary venous congestion → exertional dyspnoea
- aortic stenosis: demand ischaemia → ventricular arrhythmia → sudden cardiac death
- heart failure and hypertension: remodelling/dysfunction → atrial dilatation → atrial fibrillation
- NSTEMI: necrosis → systolic dysfunction → heart failure
- pulmonary hypertension: RV pressure overload → reduced output; annular dilatation → tricuspid regurgitant flow; pulmonary regurgitant flow → early diastolic murmur
- prosthetic valves: thrombosis, structural degeneration or paravalvular leak → murmur/heart failure
- stable and unstable angina: plaque rupture and thrombus branches now explain progression to NSTEMI, STEMI and sudden death
- rheumatic heart disease: mitral obstruction → atrial dilatation → AF; rheumatic damage → endocardial damage → infective endocarditis

Still loose because the necessary intermediate is absent or conditional:

- `acute-pericarditis → troponin-rise`: requires myocardial involvement (myopericarditis), not pericardial inflammation alone
- infective endocarditis → `av-block`: requires perivalvular extension/abscess
- infective endocarditis → `splenomegaly`: needs a defensible chronic immune/reticuloendothelial step
- the adverse heart-failure signs in the ACS umbrella (`hypotension`, `pulmonary-crackles`, `fourth-heart-sound`, `heart-failure`) need subtype-specific ventricular dysfunction/congestion rather than one universal ACS edge

No new vocabulary nodes were introduced in this pass.

## Case 3 — association-only, deliberately loose

- `cardiomyopathy`: dyspnoea, heart failure, AF and sudden death are credible umbrella associations, but its children reach them through different systolic, diastolic and arrhythmic paths. `myocardial-scar` is not a valid universal shortcut.
- `peripheral-arterial-disease`: ACS and ischaemic stroke reflect diffuse atherosclerotic risk; limb atherosclerosis does not directly cause coronary or cerebral events.

These items remain visible in the disease lists, comparisons and Explore cloud, but are not presented as deterministic causal arrows.

## Case 4 — underlying item corrected

- Familial hypertriglyceridaemia → ACS was removed from `outcomes`. The cited source describes only a weak additional cardiovascular risk from triglyceride-rich particles; this was too strong as a disease outcome. Acute pancreatitis remains.
- NSTEMI → STEMI was removed from `outcomes`. They are parallel myocardial-infarction phenotypes defined by the pattern/extent of ischaemia and ECG findings, not a routine causal sequence.
- Pulmonary oedema → cardiogenic shock was removed from `outcomes`. Severe LV failure/cardiogenic shock can produce or coexist with pulmonary oedema; making shock an outcome of alveolar flooding reversed the defensible causal direction.

## Remaining warning

Of the 223 original loose cardiovascular items, 207 now have a defensible causal route and three misleading outcome entries were removed. The remaining 13 loose items are the explicitly documented case 2 and case 3 items above; they are intentional audit flags, not forgotten work. They should be revisited only if the owner approves new intermediate concepts or a clearer schema for non-causal associations.

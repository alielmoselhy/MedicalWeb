# Respiratory chain-linking audit

This applies the four-case test in `docs/drafting-protocol.md` to the respiratory system. A loose association is retained when a causal arrow would be less accurate than the original clinical inventory.

## Result

- Starting loose items: 213.
- Defensible causal routes added: 205.
- New vocabulary nodes: none.
- Intentional loose items: 8.
- Findings/outcomes removed: none.

## Case 1 — direct and defensible

Most items were endpoints of mechanisms already present:

- diffusion impairment or intrapulmonary shunt → dyspnoea and type 1 respiratory failure
- alveolar hypoventilation → type 2 respiratory failure
- airway narrowing/plugging → wheeze, cough, haemoptysis or respiratory failure
- dysregulated host response → fever, shock, ARDS or multi-organ dysfunction
- local tumour invasion → obstruction, effusion, nerve compression or haemoptysis
- metastatic spread → named distant metastases
- ectopic hormone secretion/paraneoplastic autoimmunity → their named syndromes

## Case 2 — intermediate mechanisms

Existing vocabulary was inserted where the first patch skipped necessary physiology:

- asthma: bronchoconstriction → air trapping/alveolar hypoventilation → hyperinflation, pneumothorax or type 2 respiratory failure
- cystic fibrosis: respiratory failure → hypoxic vasoconstriction → pulmonary hypertension → cor pulmonale
- ILD: fibrosis → hypoxic vasoconstriction → pulmonary hypertension
- pneumonia: alveolar exudate → pleural inflammation or abscess formation → pleural complications/lung abscess
- lung tumours: primary tumour → local invasion → local complications; metastases remain downstream of metastatic spread
- sarcoidosis: granulomatous cardiac involvement is represented through myocardial inflammation before arrhythmia, heart failure or sudden death
- tuberculosis: haematogenous spread reaches disseminated disease; TB meningitis then reaches its CSF pattern

Still loose because the intermediate is absent or the feature is conditional:

- COPD `weight-loss`: needs a systemic catabolic/increased-work-of-breathing mechanism
- COPD `osteoporosis`: multifactorial systemic disease, inactivity, smoking and corticosteroid exposure are not modelled in this chain
- mesothelioma `weight-loss`: needs a malignancy/cachexia mechanism rather than `pleural-thickening → weight-loss`

## Case 3 — association-only, deliberately loose

- Asthma `nasal-polyps`: particularly associated with an NSAID-sensitive phenotype; asthma or bronchoconstriction does not directly cause the polyps.
- IPF `pulmonary-embolism`: recorded as a complication/stepwise deterioration risk, but no defensible direct IPF mechanism is currently modelled.
- Lung adenocarcinoma `hypertrophic-pulmonary-osteoarthropathy`: a strong classic association whose mediator is not represented.
- Lung cancer `finger-clubbing` and `hypertrophic-pulmonary-osteoarthropathy`: important clinical associations, but `primary-lung-tumour → finding` would conceal the unknown/paraneoplastic mechanism.

## Case 4 — underlying item/direction review

No respiratory finding or outcome was removed in this pass. One provisional edge was corrected: mesothelioma now reaches `malignant-pleural-effusion` from the pleural tumour/thickening process. The earlier attempted `exudative-effusion → malignant-pleural-effusion` direction confused a fluid classification with its malignant cause.

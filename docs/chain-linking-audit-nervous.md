# Nervous-system chain-linking audit

This applies the four-case test in `docs/drafting-protocol.md` to the currently implemented nervous-system diseases.

## Result

- Starting loose items: 65.
- Defensible causal routes added: 60.
- New vocabulary nodes: none.
- Intentional loose items: 5.
- Findings/outcomes removed: none.

## Case 1 — direct and defensible

Most items followed anatomy already present in the chain:

- intracranial tumour/haematoma → vasogenic oedema
- raised intracranial pressure → vomiting or brain herniation
- CSF obstruction/failed absorption → hydrocephalus
- cerebral infarction → cytotoxic oedema, haemorrhagic transformation or symptomatic epilepsy
- traumatic vessel injury → extradural/subdural haematoma
- metastatic spread/tumour growth → mass effect and its complications

## Case 2 — intermediate mechanisms

Existing vocabulary was inserted where needed:

- tumour growth or infarct swelling → obstructed CSF pathway → hydrocephalus
- infarction → impaired swallow → aspiration → hospital-acquired pneumonia
- infarction → cytotoxic oedema → herniation
- traumatic brain damage → impaired CSF absorption → hydrocephalus
- nerve-sheath tumour suppressor loss → malignant transformation → malignant peripheral nerve-sheath tumour

No unresolved case 2 item required a new vocabulary concept in the existing files.

## Case 3 — association-only, deliberately loose

- Ischaemic stroke and the stroke umbrella → ACS: important later vascular risk/shared atherosclerotic burden, not a consequence of the brain infarct.
- TIA → ischaemic stroke and ACS: TIA is a warning marker of the same vascular process; it does not itself cause the later event.
- Schwannoma → meningioma: co-occurrence in NF2, not a causal progression from one tumour to the other.

## Case 4 — underlying item/direction review

No finding or outcome was removed. The audit specifically avoided encoding TIA as the cause of stroke or one NF2-associated tumour as the cause of another.

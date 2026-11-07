# Gastrointestinal and liver chain-linking audit

This applies the four-case test in `docs/drafting-protocol.md` to all diseases whose home system is gastrointestinal and liver. The warning is treated as an audit queue, not a target that overrides causal accuracy.

## Result

- Starting loose items: 300.
- Defensible causal routes added: 282.
- New vocabulary nodes: none.
- Intentional loose items: 18.
- Findings/outcomes removed: none.

## Case 1 — direct and defensible

Most items could be attached to mechanisms already present:

- obstruction → pain, cholangitis, pancreatitis or upstream dilatation
- mucosal injury/inflammation → pain, bleeding, diarrhoea or perforation
- malabsorption → nutritional deficiency, anaemia or osteoporosis
- portal hypertension/liver failure → varices, ascites, encephalopathy or hepatorenal syndrome
- tumour mass/invasion → obstruction, mass findings or local symptoms
- metastatic spread → named metastatic sites
- infection/host response → fever, bacteraemia, shock or abscess
- organism-specific gastroenteritis effects were linked from the relevant cause with `only:`

## Case 2 — intermediate mechanisms

Existing vocabulary was used to preserve necessary steps, including:

- pancreatitis: pancreatic autodigestion → islet destruction → pancreatogenic diabetes
- appendicitis/diverticulitis: bowel infection/perforation → portal seeding, abscess or peritonitis
- chronic pancreatitis: fibrosis → inflammation-driven transformation → pancreatic adenocarcinoma
- cirrhosis: impaired hepatic function → hyperammonaemia → encephalopathy
- portal hypertension: collaterals → oesophageal varices → variceal bleeding
- PBC: cholestasis → fat-soluble vitamin deficiency → osteoporosis
- gastric cancer: tumour → paraneoplastic autoimmunity → dermatomyositis
- spontaneous bacterial peritonitis: bacterial translocation → dysregulated host response → renal/neurological decompensation

Still loose because a necessary mechanism is absent or conditional:

- achalasia → oesophageal SCC: chronic stasis/inflammation–dysplasia pathway not represented
- cholangiocarcinoma `night-sweats`: needs a systemic inflammatory/cancer-response mechanism
- cirrhosis → hepatopulmonary syndrome: intrapulmonary vascular dilatation is not represented
- cirrhosis → gallstone disease: altered bile composition/gallbladder motility is not represented
- colorectal adenoma `watery-diarrhoea` and `hypokalaemia`: apply particularly to secretory villous adenomas, not every adenomatous polyp
- gallstone ileus: needs chronic inflammation → biliary–enteric fistula → mechanical obstruction
- Meckel diverticulum → obstruction/intussusception: needs the diverticulum/lead-point mechanism; ectopic gastric mucosa is not the cause
- portal hypertension → pulmonary hypertension: needs a portopulmonary vascular-remodelling mechanism
- IBD → renal calculi: enteric hyperoxaluria/dehydration is not represented at umbrella level

## Case 3 — association-only, deliberately loose

- Autoimmune hepatitis `glomerulonephritis`: extrahepatic autoimmune association; hepatocyte injury is not its direct cause.
- Cirrhosis and PBC `finger-clubbing`: recognised clinical associations without a represented causal mediator.
- Coeliac disease `finger-clubbing` and PBC: clinical/autoimmune associations that should not be drawn as consequences of villous atrophy.
- Gastric adenocarcinoma `acanthosis-nigricans`: paraneoplastic association whose growth-factor mechanism is not represented.
- Gallbladder carcinoma in gallstone disease: long-term inflammation/risk association, not `gallstone-formation → cancer`.

## Case 4 — underlying item/direction review

No finding or outcome was removed in this pass. Several provisional edges were rejected before validation because they encoded the wrong mechanism: ectopic gastric mucosa did not cause Meckel obstruction, a generic adenoma did not automatically cause secretory diarrhoea, and exudative risk associations were not converted into deterministic arrows.

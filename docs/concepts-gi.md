# Step G1 — Gastrointestinal and liver parent concepts (draft for review, 2026-11-07)

Same rules and legend as `concepts-resp.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [gastrointestinal]` unless noted.

Sources:
- K&C ch.32 Gastroenterology (printed page = PDF marker − 15)
- ch.33 Nutrition (−15)
- ch.34 Liver (−14)
- ch.35 Biliary and pancreas (−14)
- ch.20 Infectious disease (−22) for the gastroenteritis organisms
- Mehlman HY Gastro

---

## 1. Disease list (syllabus §10): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| oesophagus-stomach | achalasia, gord, eosinophilic-oesophagitis, barretts-oesophagus, oesophageal-adenocarcinoma, oesophageal-squamous-cell-carcinoma, gastritis, peptic-ulcer-disease, gastric-adenocarcinoma, gastrointestinal-stromal-tumour, gastric-malt-lymphoma, congenital-pyloric-stenosis | oesophageal-cancer → the two oesophageal cancers |
| small-intestine | coeliac-disease, acute-mesenteric-ischaemia, ischaemic-colitis, meckels-diverticulum, small-intestinal-bacterial-overgrowth | — |
| ibd | ulcerative-colitis, crohns-disease | inflammatory-bowel-disease → both |
| gi-nutrition | refeeding-syndrome | — (malabsorption is a mechanism, see §3) |
| large-bowel-peritoneum | colorectal-adenoma, colorectal-cancer, diverticular-disease, intestinal-obstruction | — |
| intra-abdominal-infection | appendicitis, diverticulitis, acute-cholecystitis, acute-cholangitis, pyogenic-liver-abscess, spontaneous-bacterial-peritonitis, secondary-peritonitis | peritonitis → SBP, secondary |
| gastroenteritis | viral-gastroenteritis, staphylococcal-food-poisoning, botulism, salmonella-enteritis, campylobacter-enteritis, shigellosis, e-coli-diarrhoea, cholera, amoebiasis, giardiasis | infective-gastroenteritis → all |
| liver-biochemistry | gilberts-syndrome | — |
| viral-liver | hepatitis-a, hepatitis-b, hepatitis-c, hepatitis-e | viral-hepatitis → all four |
| non-viral-liver | alcohol-related-liver-disease, masld, haemochromatosis, wilsons-disease, primary-biliary-cholangitis, primary-sclerosing-cholangitis, autoimmune-hepatitis | — |
| cirrhosis-liver-tumours | cirrhosis, portal-hypertension, acute-liver-failure, hepatocellular-carcinoma, hepatocellular-adenoma, hepatic-haemangioma | — |
| biliary-pancreas | gallstone-disease, acute-pancreatitis, chronic-pancreatitis, gallbladder-carcinoma, cholangiocarcinoma, pancreatic-adenocarcinoma | — |

That's about 70 files, twice the size of respiratory.

**Existing files**
- `alpha-1-antitrypsin-deficiency` gains `gastrointestinal` as a second system. It already leads to `cirrhosis`.
- `chronic-mesenteric-ischaemia` gains `gastrointestinal` as a second system, beside the new acute file.

**Outcome nodes that become files.** These ids are already outcome nodes, so every existing link keeps working:
- `cirrhosis`, from A1AT and CF
- `acute-pancreatitis`, from hypertriglyceridaemia and as an ARDS cause

**Not files**
- Oesophageal varices, hepatic encephalopathy, hepatorenal syndrome, toxic megacolon and similar become **outcomes** (see §5).
- FAP and Lynch syndrome are **cause** nodes, as Marfan's already is.
- Gastric acid control, nutritional assessment, faecal immunochemical testing, screening, MMR/KRAS testing, hepatitis serology interpretation, needlestick and vaccination are teaching points. They go in `note`s, or become findings where they are a test result.

**Second systems**
- botulism: `[gastrointestinal, nervous]`
- gastric-malt-lymphoma: `[gastrointestinal, haematology]`
- wilsons-disease: `[gastrointestinal, nervous]`
- coeliac-disease: `[gastrointestinal, immunology]`
- autoimmune-hepatitis and PBC: `[gastrointestinal, immunology]`

---

## 2. Cause parents

**Organisms** (most already exist)
- `enterobacteriaceae`, `enterococci`, `anaerobic-bacteria`: reused. *The syllabus's intra-abdominal sepsis organisms are the same nodes as HAP and IE.*
- `gram-negative-bacilli` gains **salmonella**, **shigella**, **campylobacter**, **escherichia-coli**, **vibrio-cholerae**, **helicobacter-pylori**.
- `s-aureus` reused (preformed toxin food poisoning). **clostridium-botulinum** is new.
- **`enteric-virus`** → **norovirus**, **rotavirus**
- **`hepatitis-virus`** → **hepatitis-a-virus**, **hepatitis-b-virus**, **hepatitis-c-virus**, **hepatitis-e-virus**
- **`gut-protozoa`** → **entamoeba-histolytica**, **giardia-lamblia**

**Exposures and risk factors**
- `excess-alcohol` reused. *It becomes the big hub: ARLD, both pancreatitides, oesophageal SCC, DCM, hypertension, CAP.*
- `smoking` reused. *Links oesophageal SCC, pancreatic cancer and Crohn's to the lung and atherosclerotic diseases.*
- `obesity` and `diabetes-mellitus` reused, with **metabolic-syndrome**. *MASLD joins the cardiovascular risk web.*
- **nsaid-use**: peptic ulcer. Reuses the asthma trigger node if we rename it, see Q6.
- **gluten-exposure** + **hla-dq2-dq8**: coeliac
- `pregnancy-or-oestrogen` reused for hepatic adenoma and gallstones
- **injection-drug-use** exists as a mechanism (IE). Hepatitis B and C need a *cause*, so they get **blood-or-sexual-exposure**, and **faecal-oral-exposure** covers hepatitis A and E and the gastroenteritides.
- **contaminated-food-or-water**: food poisoning and traveller's diarrhoea
- **prolonged-starvation**: refeeding
- **paracetamol-overdose** and **hepatotoxic-drug**: acute liver failure

**Genetic**
- **`inherited-crc-syndrome`** → **familial-adenomatous-polyposis** (APC), **lynch-syndrome** (MMR genes)
- **hfe-mutation** (haemochromatosis), **atp7b-mutation** (Wilson's), **ugt1a1-variant** (Gilbert's)
- `serpina1-mutation` and `cftr-mutation` reused

**Conditions** (diseases used as causes, as the cardio files already do)
- gallstone-disease → acute-pancreatitis, cholecystitis, cholangitis, gallbladder carcinoma
- primary-sclerosing-cholangitis → cholangiocarcinoma
- ulcerative-colitis → PSC, colorectal cancer
- `heart-failure` and `constrictive-pericarditis` → portal hypertension (post-hepatic). *A new cardio–liver bridge.*

---

## 3. Mechanism parents

**Oesophagus and stomach**
- **`acid-mucosal-injury`** → **acid-reflux** (GORD), **gastroduodenal-mucosal-breakdown** (PUD: H. pylori or NSAIDs)
- **`impaired-oesophageal-motility`** → **failed-les-relaxation** (achalasia). Also **les-incompetence**, which is GORD's root.
- **chronic-gastric-inflammation**: H. pylori and autoimmune gastritis. It feeds atrophy, PUD, gastric cancer and MALT lymphoma. *One organism links four diseases.*

**Malignancy** (`malignant-transformation` gains kinds alongside carcinogen and driver)
- **metaplasia-dysplasia-sequence**: Barrett's → adenocarcinoma, atrophic gastritis → gastric cancer
- **adenoma-carcinoma-sequence**: colorectal adenoma → CRC (APC, then KRAS)
- **inflammation-driven-transformation**: UC → CRC, PSC → cholangiocarcinoma, cirrhosis → HCC. *Three diseases, one mechanism.*

**Small bowel and malabsorption**
- **`malabsorption`** → **mucosal-malabsorption** (coeliac, Crohn's, Giardia), `exocrine-pancreatic-insufficiency` (moves under it: CF, chronic pancreatitis, pancreatic cancer), **bile-acid-malabsorption** (terminal ileal Crohn's), **bacterial-overgrowth**. *Exactly the syllabus's malabsorption question.*
- **villous-atrophy**: coeliac
- `mesenteric-ischaemia` reused for the acute form, with **mesenteric-embolism** (AF) and `thromboembolism` reused. *AF → acute mesenteric ischaemia, the same as stroke.*

**Inflammatory bowel disease**
- `immune-mediated-injury` gains **gut-mucosal-immune-dysregulation** (UC, Crohn's) and **gluten-driven-t-cell-injury** (coeliac).
- `granuloma-formation` gains Crohn's via `non-caseating-granuloma`. *Crohn's ~ sarcoid ~ TB: intestinal TB vs Crohn's is a classic differential.*
- **transmural-inflammation** (Crohn's) vs **mucosal-inflammation** (UC)

**Infective diarrhoea** (the syllabus's own split)
- **`infective-diarrhoea`** has three kinds:
  - **preformed-toxin-ingestion**: S. aureus, botulinum
  - **enterotoxin-secretion**: cholera, ETEC, norovirus and rotavirus (non-inflammatory)
  - **mucosal-invasion**: Shigella, Campylobacter, Salmonella, EHEC, Entamoeba (inflammatory)

**Obstruction, perforation and infection**
- **luminal-obstruction**: appendicitis, gallstone in the cystic duct, obstruction. **bowel-perforation** leads to secondary peritonitis.
- **diverticulum-formation**: low fibre, raised colonic pressure
- **biliary-obstruction** and **cholestasis** (also intrahepatic: PBC, PSC, drugs)
- `bloodstream-entry` gains **portal-venous-seeding**, for liver abscess from appendicitis or diverticulitis.
- **bacterial-translocation**: SBP in cirrhosis

**Liver**
- **`hepatocyte-injury`** → **viral-hepatocyte-injury**, **toxic-hepatocyte-injury** (alcohol, paracetamol), **autoimmune-hepatocyte-injury**, **metal-overload** (iron, copper)
- **hepatic-steatosis** → **steatohepatitis** → **liver-fibrosis** → `cirrhosis`. *ARLD and MASLD follow the same steps.*
- **chronic-viral-infection**: HBV and HCV carriage
- **`portal-venous-hypertension`**, split into three like `raised-pulmonary-pressure`:
  - **pre-hepatic** (portal vein thrombosis)
  - **intrahepatic** (cirrhosis)
  - **post-hepatic** (Budd–Chiari, right heart failure)
- **portosystemic-shunting** → varices, encephalopathy
- **impaired-hepatic-synthesis** → low albumin, coagulopathy
- **impaired-bilirubin-conjugation** (Gilbert's)
- `salt-water-retention` and `raas-activation` reused for ascites. *Cirrhotic ascites and heart failure share the same mechanism.*

**Pancreas**
- **premature-enzyme-activation** (acute pancreatitis) → `dysregulated-host-response` reused. *Pancreatitis → SIRS → ARDS, already linked.*
- **pancreatic-fibrosis** (chronic)

---

## 4. Finding parents

**History**
- **`abdominal-pain`**:
  - **epigastric-pain**
  - **ruq-pain**
  - **rif-pain**
  - **lif-pain**
  - **colicky-abdominal-pain**
  - **pain-radiating-to-back**
  - **heartburn**
  - `post-prandial-abdominal-pain` stays under ischaemic pain, since a node has one parent.
- **`dysphagia`**, a new *finding*, with:
  - **progressive-solid-dysphagia** (cancer)
  - **solid-and-liquid-dysphagia** (achalasia)
  - Clashes with the existing cause, see Q6.
- **`altered-bowel-habit`** → **watery-diarrhoea**, **bloody-diarrhoea**, **constipation**. **vomiting** is separate. `steatorrhoea` reused. See Q6 for `diarrhoea-vomiting`.
- **`gi-bleeding`** → **haematemesis**, **melaena**, **rectal-bleeding**
- `weight-loss`, `fever`, `rigors` reused. *Charcot's triad: fever, jaundice, RUQ pain.*
- **pruritus**: cholestasis

**Examination**
- **jaundice**
- **`chronic-liver-disease-stigmata`** → **spider-naevi**, **palmar-erythema**, **gynaecomastia**, **caput-medusae**, **asterixis**
- `finger-clubbing` reused (cirrhosis, IBD, coeliac)
- `hepatomegaly`, `splenomegaly`, `ascites` reused
- **kayser-fleischer-rings**, **skin-pigmentation** (haemochromatosis)
- **`peritonism`** → **murphys-sign**, **guarding-rebound**
- **abdominal-distension**, **abdominal-mass** (RIF mass, palpable gallbladder)
- **mouth-ulcers**
- `erythema-nodosum` and `anterior-uveitis` reused. *IBD ~ sarcoid ~ TB.* **pyoderma-gangrenosum** is new.
- **dermatitis-herpetiformis**: coeliac

**Tests**
- **`hyperbilirubinaemia`** → **unconjugated-hyperbilirubinaemia**, **conjugated-hyperbilirubinaemia**
- `raised-liver-enzymes` gains **hepatitic-pattern** (ALT/AST) and **cholestatic-pattern** (ALP/GGT). The AST:ALT ratio > 2 in alcohol goes in a note.
- **low-albumin**, **prolonged-inr**
- **`hepatitis-serology`** → **hbsag-positive**, **anti-hbc-igm**, **anti-hcv-hcv-rna**, **anti-hav-igm**, **anti-hev-igm**. *Same pattern as `tb-test-positive`.*
- **`gut-or-liver-autoantibody`** → **anti-ttg-ema** (coeliac), **anti-mitochondrial-antibody** (PBC), **anti-smooth-muscle-lkm** (AIH), **p-anca** (PSC/UC)
- **raised-ferritin-transferrin-saturation**, **low-caeruloplasmin**
- **raised-amylase-lipase**
- **raised-faecal-calprotectin**
- **iron-deficiency-anaemia**, **b12-or-folate-deficiency**. *These are hubs for §5 haematology later.*
- **raised-afp** (HCC), **raised-ca19-9** (pancreas)
- **positive-stool-culture-or-pcr**
- `hypokalaemia` and `hyponatraemia` reused (vomiting, diarrhoea, refeeding). **hypophosphataemia** and **hypomagnesaemia** are new.

**Imaging and endoscopy**
- **`gi-imaging-abnormality`**:
  - **gallstones-on-ultrasound**
  - **dilated-bile-ducts**
  - **dilated-bowel-loops**
  - **pneumoperitoneum**
  - **liver-lesion**
  - **bird-beak-oesophagus**
  - **pancreatic-calcification**
- Endoscopy and biopsy findings have no category today, see Q5:
  - villous atrophy
  - columnar metaplasia
  - crypt abscesses
  - skip lesions or cobblestoning

---

## 5. Outcome parents

- **`gi-haemorrhage`** → **variceal-haemorrhage**, **peptic-ulcer-bleed**. Lower-GI bleeding is a finding only.
- **`gi-perforation`** → **perforated-peptic-ulcer**, **perforated-appendix**, **perforated-diverticulum**. All lead to `secondary-peritonitis`.
- **`hepatic-decompensation`**:
  - `ascites` (finding)
  - **hepatic-encephalopathy**
  - **hepatorenal-syndrome**, under `acute-kidney-injury`
  - **variceal-haemorrhage**, under gi-haemorrhage, since a node has one parent
- **oesophageal-varices**
- **stricture**, **fistula**, **toxic-megacolon**, **abscess**
- **malnutrition**
- Disease outcomes:
  - `cirrhosis`
  - `hepatocellular-carcinoma`
  - `acute-pancreatitis`
  - `colorectal-cancer`
  - `cholangiocarcinoma`
  - `spontaneous-bacterial-peritonitis`
  - `pyogenic-liver-abscess`
  - `ards`
  - `septic-shock`
- Reused outcomes:
  - `distant-metastases` and `liver-metastases`
  - `local-tumour-spread`
  - `paraneoplastic-syndrome`, which gains **trousseau** links (pancreatic cancer → `migratory-thrombophlebitis`, already a node)
  - `osteoporosis` (coeliac, PBC)
  - `diabetes-mellitus`, an outcome of chronic pancreatitis and haemochromatosis. This is a cause today, see Q6.
  - `restrictive-cardiomyopathy` (haemochromatosis)
  - **haemolytic-uraemic-syndrome** (EHEC), under `acute-kidney-injury`
  - **guillain-barre-syndrome** (Campylobacter)
  - **reactive-arthritis**
  - **gallstone-ileus**

---

## Decisions (2026-11-07)

1. **Gastroenteritis:** three files, viral, bacterial and protozoal, under `infective-gastroenteritis`. They replace the 10 per-organism files.
   - Each organism is a cause in its file's chain.
   - A finding or outcome that belongs to one organism carries `only: <organism id>` (e.g. HUS `only: escherichia-coli`). The app shows it as "*E. coli only*", and the validator checks that the id is a cause in that file.
2. **Home groups:** as proposed. The infection-type diseases sit under intra-abdominal infection; pancreatitis and cholangiocarcinoma under biliary and pancreas.
3. **Ascites:** gains `high-saag-ascites` and `low-saag-ascites` children. The right-heart files (heart failure, TR, cor pulmonale, pulmonary hypertension, restrictive cardiomyopathy) now point at high-SAAG.
4. **Bile duct adenoma:** waiting on sources from you. CMV and EBV hepatitis wait for §4.
5. **New finding category `endoscopy`** ("Endoscopy and biopsy"), with a sixth tab on the Differential page.
6. **All of item 6 done:**
   - The cause `dysphagia` is now `impaired-swallow`, leaving the id free for the GI symptom.
   - `diarrhoea-vomiting` is split into `vomiting` and `diarrhoea` (under `altered-bowel-habit`). Influenza and Legionella CAP now point at these.
   - `nsaid-use` and `pancreatogenic-diabetes` are added when first used.
7. **Two batches at a time.**

## Progress

### Chain-linking audit (2026-11-07)

- Audited all 300 findings/outcomes that were listed but absent from their disease chain.
- Added defensible direct links and existing intermediate mechanisms for 282 items.
- Left 18 items deliberately loose because they need missing/conditional mechanisms or are autoimmune, paraneoplastic, umbrella-level or long-term risk associations.
- Added no vocabulary nodes and removed no findings/outcomes.
- Full four-case reasoning is in `docs/chain-linking-audit-gi.md`.

- **Batches 1–2 drafted** (all `status: draft`):
  - **Liver (19):**
    - Gilbert's
    - the viral hepatitis umbrella with A, B, C, E
    - ARLD, MASLD, haemochromatosis, Wilson's, PBC, PSC, AIH
    - cirrhosis, portal hypertension, acute liver failure, HCC, hepatocellular adenoma, haemangioma
  - **Biliary and pancreas (6):** gallstone disease, acute and chronic pancreatitis, gallbladder carcinoma, cholangiocarcinoma, pancreatic adenocarcinoma
  - **Infections drafted early** because the biliary files point at them (4): acute cholecystitis, acute cholangitis, pyogenic liver abscess, SBP
- **Changed from the sketch:**
  - One `hepatocyte-injury` parent, with viral, toxic and autoimmune kinds. Metals sit under their own `metal-overload` parent (iron, copper), so haemochromatosis and Wilson's match as related.
  - Duct disease uses `biliary-epithelial-injury` (PBC, PSC) and `cholestasis` (intrahepatic, extrahepatic obstruction).
  - Raised portal pressure has pre-hepatic, intrahepatic and post-hepatic kinds. Heart failure and constrictive pericarditis feed the post-hepatic kind.
  - `inflammation-driven-transformation` links HCC (cirrhosis, HCV), cholangiocarcinoma (PSC, flukes), gallbladder cancer (chronic cholecystitis) and pancreatic cancer (chronic pancreatitis). `viral-oncogenesis` covers HBV.
  - IBD is a stand-in `condition` cause (for PSC) until the IBD files exist.
  - The thinnest file is gallbladder carcinoma, because K&C has one paragraph and Mehlman one line.
- **LMC handouts added** (2026-11-07): bile duct adenoma drafted. The three handouts are worked into the 29 liver and biliary files. New links:
  - sarcoid and miliary TB → portal hypertension
  - HCV, cirrhosis, alcohol and obesity → cholangiocarcinoma
  - alcohol and obesity → pancreatic cancer
  - A1AT and PBC → HCC
  - haemochromatosis → cardiomyopathy
  - CF → pigment stones
  - sepsis → acalculous cholecystitis
- **Batches 3–4 drafted** (2026-11-07, all `status: draft`):
  - **Oesophagus and stomach (13):**
    - GORD, Barrett's, achalasia, eosinophilic oesophagitis
    - oesophageal cancer, with adenocarcinoma and SCC under it
    - gastritis, peptic ulcer, gastric adenocarcinoma, GIST, gastric MALT lymphoma
    - congenital pyloric stenosis
  - **Small intestine and IBD (8):**
    - coeliac, SIBO, Meckel's
    - acute mesenteric ischaemia, ischaemic colitis
    - IBD, with Crohn's and UC under it
  - Chronic mesenteric ischaemia now also has `gastrointestinal`.
- **Changed from the sketch:**
  - `inflammatory-bowel-disease` is now the umbrella file, and its stand-in cause node is gone. PSC's link still points at it.
  - `colorectal-cancer` is an outcome node until batch 5 makes it a file, the same way cirrhosis was handled.
  - `heartburn` sits under `chest-pain`, so reflux vs cardiac pain counts as a related match.
  - `exocrine-pancreatic-insufficiency` moved under the new `malabsorption` parent, alongside mucosal, bile acid and bacterial overgrowth.
  - Pyloric stenosis is sourced from Mehlman only, because K&C has just a line in the genetics table.
- **Batches 5–6 drafted** (2026-11-07, all `status: draft`):
  - **Large bowel (4):** colorectal adenoma, colorectal cancer (outcome node converted to a file), diverticular disease, intestinal obstruction.
  - **Intra-abdominal infection (4):** appendicitis, diverticulitis, and the peritonitis umbrella, with secondary peritonitis and SBP (re-parented) under it.
  - **Gastroenteritis (4):** the infective gastroenteritis umbrella, with viral, bacterial (incl. food poisoning and botulism) and protozoal under it. Organism-specific edges carry `only:`.
  - **Changes to existing files:**
    - TB gains `tb-peritonitis`.
    - Crohn's and Meckel's now point at the intestinal obstruction file.
    - `intestinal-stricture` is renamed to a stricture only.
- **Changed from the sketch:**
  - E. coli is split into ETEC and EHEC under `enterobacteriaceae`, as are Salmonella and Shigella. Campylobacter and Vibrio sit under `gram-negative-bacilli`.
  - The syllabus's mechanisms (pre-formed toxin, enterotoxin, invasion, cytotoxin, viral) are kinds of `infective-diarrhoea`.
- **Batch 7 drafted:** refeeding syndrome, with `[gastrointestinal, biochemistry]`.
  - TPN complications are covered by a new `parenteral-nutrition` cause.
  - It leads into refeeding and, through a central venous catheter, into catheter bacteraemia (K&C p.1255-1256).
- **GI and liver §10 fully drafted** (2026-11-07): 64 diseases with GI as their home system, 67 with GI as any system. All `status: draft`, waiting for review. The duplicate check found only intended parent/child families.

## Questions before drafting (answered above)

1. **Gastroenteritis: one file per organism?**
   - Recommended: yes, 10 files under `infective-gastroenteritis`, sorted by the syllabus's toxin / non-inflammatory / inflammatory mechanisms.
   - The other way is one file per mechanism, with organisms as causes. It's shorter, but loses the per-organism outcomes (HUS, Guillain–Barré, amoebic liver abscess).
2. **Diseases the syllabus lists twice.** Proposed home groups:
   - **Infection-type** (appendicitis, diverticulitis, cholecystitis, cholangitis, peritonitis, liver abscess) go under **intra-abdominal infection**.
   - **Pancreatitis** and **cholangiocarcinoma** go under **biliary and pancreas**.
   - This leaves "GI biochemistry and nutrition" with only refeeding syndrome, because malabsorption is a mechanism.
3. **Ascites.** It stays under `fluid-overload-sign` and gains **high-SAAG** and **low-SAAG** children, mirroring pleural effusion. Heart failure and cirrhosis then share high-SAAG ascites, while peritoneal cancer and TB give low-SAAG.
4. **Thin sources.**
   - Bile duct adenoma: neither book covers it. I'll leave it out, unless you have a source.
   - CMV and EBV hepatitis: one short K&C paragraph. I'll add them when §4 herpes viruses arrive, as outcomes of those files.
   - TPN complications: line sepsis reuses `catheter-associated-bacteraemia`. The rest go in refeeding and nutrition notes, with no file.
5. **A new finding category for endoscopy and biopsy** (villous atrophy, Barrett's mucosa, crypt abscesses, granulomas on biopsy).
   - Recommended: add `endoscopy` (shown as "Endoscopy and biopsy"). It becomes a sixth tab on the Differential page and a one-line validator change.
   - The other way is to file these under `lab`.
6. **Clashes with existing nodes** (proposed fixes):
   - `dysphagia` is a *cause* today (aspiration risk). Rename it to `impaired-swallow` and make `dysphagia` the GI symptom. Achalasia then also reaches aspiration pneumonia.
   - `diarrhoea-vomiting`: split it into `vomiting` plus the diarrhoea kinds, and repoint influenza and Legionella CAP.
   - `nsaid-or-beta-blocker` (asthma trigger): add a separate `nsaid-use` cause for PUD, and leave the asthma node alone. A cause has one parent.
   - `diabetes-mellitus` as an outcome: an id can't be both a cause and an outcome. For now, pancreatitis and haemochromatosis get a new outcome **pancreatogenic-diabetes** (type 3c). Endocrine §11 can revisit when diabetes gets a file.
7. **Batch order (proposed):**
   - liver: biochemistry, viral, non-viral, cirrhosis and tumours
   - biliary and pancreas
   - oesophagus and stomach
   - small intestine and IBD
   - large bowel and intra-abdominal infection
   - gastroenteritis
   - nutrition

   Liver comes first because cirrhosis and portal hypertension are the hubs everything else points at.

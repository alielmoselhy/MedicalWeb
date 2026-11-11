# Step S1 — Female genital parent concepts (draft for review, 2026-11-11)

Same rules and legend as `concepts-nervous.md`:
- A parent means "is a kind of". Siblings count as **related**, rolled up one level only.
- `id`: an existing node or file, reused
- **`id`**: a new node
- *italic*: the cross-disease link it creates

Every new disease gets `systems: [female-genital]` unless noted.

Sources (headings listed; offsets checked):
- **K&C ch.39 Women's health (−13**, new; checked on Miscarriage 1470, Abortion 1472, Urinary incontinence 1473, Gynaecological cancers 1474): menstrual definitions, postmenopausal bleeding and tamoxifen p.1467–1468, miscarriage and recurrent miscarriage p.1470–1471, heavy menstrual bleeding and fibroids (with the sarcoma-in-fibroid line) p.1471–1472, gynaecological cancers and Box 39.8 (cervix, endometrium, ovary side by side; subtypes include uterine sarcoma, borderline and primary peritoneal tumours) p.1474–1475
- **K&C ch.38 Obstetric medicine (−13**, new; checked on five contents headings): pre-eclampsia, its risk factors (Box 38.3, includes hydatidiform mole) and HELLP p.1454–1455
- K&C ch.6 Malignant disease (−21): ovarian germ cell tumours and dermoid p.129, cervical cancer and CIN p.130, endometrial cancer p.130, epithelial ovarian cancer and BRCA p.130–132
- K&C ch.37 STIs (−13): chlamydia and gonorrhoea cervicitis p.1416–1417, PID p.1418, genital herpes in pregnancy p.1422, vertical HIV transmission p.1426; K&C ch.22 Dermatology (−22): lichen sclerosus p.667, VIN (Bowen's of the genital mucosa) p.689; K&C ch.32 (−15): ruptured ectopic and ovarian cysts p.1222; K&C ch.21 (−22): PCOS p.628–631; K&C ch.20 (−22): congenital rubella p.519, neonatal herpes p.515
- Mehlman HY Repro-OBGYN: moles and choriocarcinoma, ovarian neoplasms, other ovarian conditions (ruptured cyst, torsion, theca-lutein, endometrioma, dermoid), endometrial cancer and fibroid points, vulvovaginal lesions (carcinoma, lichen sclerosus, clear cell/DES, Bartholin), cervical cancer and screening, TORCH, hypertensive disorders, miscarriage types, endometritis, peripartum bleeding (praevia, abruption, accreta spectrum), dysmenorrhoea/endometriosis/adenomyosis, Asherman; HY Pathology and HY Endocrine (unopposed oestrogen)
- **No source at all for endometrial polyps or extramammary Paget's disease** (Q3, Q10). K&C has no text on endometriosis, adenomyosis, placentation, moles, Bartholin's cyst or benign ovarian tumours; Mehlman is the only source there.
- No LMC gynaecology handouts in `Resources/` yet.

Syllabus §16 has three groups: **uterus and pregnancy** (menstrual abnormalities; endometrial hyperplasia, carcinoma, polyps, endometritis, adenomyosis, drug effects; leiomyoma and leiomyosarcoma; abnormal placentation, miscarriage, pre-eclampsia and eclampsia; mole and choriocarcinoma; vertical transmission), **vulva, vagina and cervix** (Bartholin's cyst, lichen sclerosus; VIN, carcinoma, extramammary Paget's, melanoma; vaginal SCC and adenocarcinoma; cervicitis, HPV change, CIN, SCC, adenocarcinoma; HPV vaccine; screening) and **ovaries and tubes** (salpingitis and PID; ovarian and peritoneal serous carcinoma; ectopic pregnancy; follicular cysts; benign, borderline and malignant serous and mucinous tumours; dermoid; sex-cord stromal and metastatic tumours; endometriosis).

**What already exists:** `pelvic-inflammatory-disease` (file, `[kidney-urogenital, female-genital]`), `gestational-diabetes` (`[endocrine, female-genital]`), `chlamydia-infection`, `gonorrhoea`, `antiphospholipid-syndrome` (outcome `recurrent-pregnancy-loss`), `haemolytic-disease-of-the-newborn`, `testicular-germ-cell-tumour`, `malignant-melanoma`, `viral-wart`, `candidiasis`, `hiv`, `syphilis`, `cmv-infection`, `herpes-simplex-infection`, `hepatitis-b`. Nodes: `pre-eclampsia` (outcome of gestational diabetes), `tubal-infertility-ectopic-pregnancy` (outcome of PID), `ovarian-metastases` (Krukenberg, outcome of gastric cancer), `hpv-infection`, `brca-mutation`, `long-oestrogen-exposure`, `lynch-syndrome`, `obesity`, `smoking`, `immunosuppression`, `vertical-transmission`, `raised-beta-hcg`, `raised-afp`, `raised-ldh`, `oligo-amenorrhoea`, `hirsutism-virilisation`, `intermenstrual-postcoital-bleeding`, `vaginal-discharge`, `mucopurulent-cervicitis`, `lower-abdominal-pain`, `deep-dyspareunia`, `chronic-pelvic-pain`, `heavy-menstrual-loss` (cause feeding iron deficiency), `abdominal-mass`, `ascites`, `proteinuria`, `seizures`, `thrombocytopenia`, `microangiopathic-haemolysis`, `lymphatic-spread`, `lung-metastases`, `liver-metastases`.

---

## 1. Disease list (syllabus §16): what becomes a file

| Group | Diseases | Umbrella |
|---|---|---|
| uterus-pregnancy | primary-dysmenorrhoea, endometrial-hyperplasia, endometrial-carcinoma, endometritis, adenomyosis, uterine-leiomyoma, miscarriage, placenta-praevia, placental-abruption, placenta-accreta-spectrum, pre-eclampsia, gestational-trophoblastic-disease (umbrella), hydatidiform-mole, choriocarcinoma | gestational-trophoblastic-disease (Q8) |
| vulva-vagina-cervix | bartholin-cyst, lichen-sclerosus, vulval-carcinoma, vaginal-carcinoma, cervical-intraepithelial-neoplasia, cervical-cancer | none |
| ovaries-tubes | ectopic-pregnancy, polycystic-ovary-syndrome, functional-ovarian-cyst, endometriosis, ovarian-tumour (umbrella), benign-epithelial-ovarian-tumour, epithelial-ovarian-cancer, mature-cystic-teratoma, sex-cord-stromal-tumour | ovarian-tumour (Q14) |

About 29 files (primary dysmenorrhoea added after Q1; GTD umbrella after Q8).

**Not files here, and why:**
- Menstrual abnormalities (heavy, absent, intermenstrual, postmenopausal bleeding; dysmenorrhoea): **findings** on the diseases that cause them (Q1).
- Endometrial polyps, extramammary Paget's: no source (Q3, Q10).
- Leiomyosarcoma: one K&C line only (Q5).
- Effect of drugs on the endometrium (tamoxifen, unopposed HRT, progestogen coil): **cause nodes** and notes (Q3).
- Salpingitis and PID: the existing `pelvic-inflammatory-disease` file.
- Cervicitis: a **finding** of chlamydia and gonorrhoea (already there). HPV-associated change: a note on CIN (Q12).
- Vulval melanoma: a note on `malignant-melanoma`. VIN: a **cause** node for vulval carcinoma.
- Eclampsia, HELLP, tubo-ovarian abscess, ovarian torsion, cyst rupture, pseudomyxoma peritonei: **outcomes**.
- Malignant ovarian germ cell tumours (dysgerminoma, yolk sac), Krukenberg tumours, peritoneal serous carcinoma, borderline tumours, invasive mole: notes (Q14, Q8).
- Vertical transmission: links on existing infection files, not a file (Q9).
- Screening (cervical cytology and HPV testing; no ovarian screening), HPV vaccine, RMI, CA125 follow-up: notes.

**Existing nodes that become files (same id, §5.5):** `pre-eclampsia` (outcome) → file; `gestational-diabetes` keeps it as an outcome.

**Existing nodes split:** `tubal-infertility-ectopic-pregnancy` → **`tubal-infertility`** (outcome) and the `ectopic-pregnancy` file (Q13). Cross-file edit to PID.

**Second systems:** `polycystic-ovary-syndrome` `[female-genital, endocrine]`; `lichen-sclerosus` `[female-genital, skin-breast]` (Q15).

---

## 2. Cause parents

- Organisms: reuse `hpv-infection` (*CIN ~ cervical ~ vulval ~ vaginal ~ HNSCC ~ penile ~ wart*), `chlamydia-infection` and `gonorrhoea` files (*PID ~ ectopic*), `herpes-simplex-virus`, `cytomegalovirus` etc. for vertical transmission; new **polymicrobial-genital-flora** (Bartholin abscess, postpartum endometritis; Mehlman says "polymicrobial")
- Risk factors: reuse `obesity` (*endometrial ~ PCOS ~ pre-eclampsia ~ T2DM*), `smoking`, `immunosuppression`, `unprotected-sex-multiple-partners`, `long-oestrogen-exposure` (*breast ~ endometrial*); new **advanced-maternal-age** (miscarriage, pre-eclampsia over 40), **previous-uterine-surgery** (praevia, accreta; Caesarean, myomectomy), **frequent-ovulation**? (EOC: only if a node earns its keep — else a note)
- Drugs: new **tamoxifen** (`category: drug`; endometrial hyperplasia), **unopposed-oestrogen-therapy** (HRT without progestogen), **in-utero-des-exposure** (clear cell vaginal adenocarcinoma)
- Genetic: reuse `brca-mutation` (*breast ~ ovary*), `lynch-syndrome` (*colorectal ~ endometrial*); new **fetal-chromosomal-abnormality** (miscarriage; K&C "random genetic abnormalities")
- Conditions: reuse `antiphospholipid-syndrome` (recurrent miscarriage, pre-eclampsia), `diabetes-mellitus`, `hypertension`; new **vulval-intraepithelial-neoplasia** (vulval carcinoma, K&C p.689); `polycystic-ovary-syndrome` and `lichen-sclerosus` are files that start other chains (*PCOS → endometrial*, *LS → vulval SCC*)

## 3. Mechanism parents

- New **unopposed-oestrogen** hub (endometrium driven without progesterone): fed by PCOS (anovulation), obesity (peripheral oestrone), tamoxifen, unopposed HRT, granulosa cell tumour. Leads to new **endometrial-proliferation** (hyperplasia) → endometrial carcinoma (*PCOS ~ granulosa ~ hyperplasia ~ carcinoma*)
- Gynaecological cancers under `malignant-transformation`: new **endometrial-transformation**, **cervical-squamous-transformation** (via new **hpv-epithelial-dysplasia**, shared by CIN and VIN), **vulvovaginal-squamous-transformation**, **ovarian-epithelial-transformation**, **trophoblast-malignant-transformation** (choriocarcinoma)
- Spread: reuse `lymphatic-spread` (pelvic nodes), `metastatic-spread`; new **transcoelomic-spread** under `metastatic-spread` (ovary: peritoneal seeding → ascites)
- Ectopic endometrium: new **ectopic-endometrial-tissue** parent with **endometrium-in-myometrium** (adenomyosis) and **endometrium-outside-uterus** (endometriosis; retrograde menstruation)
- Benign growth: new **myometrial-smooth-muscle-tumour** (leiomyoma), **benign-ovarian-neoplasm** (cystadenoma, dermoid)
- Placenta: new **abnormal-placental-implantation** parent with **low-placental-implantation** (praevia), **invasive-placental-attachment** (accreta spectrum); **placental-separation** (abruption); new **uteroplacental-insufficiency** (pre-eclampsia, per Mehlman) → reuse `endothelial-dysfunction` (K&C: a multisystem endothelial disorder)
- Trophoblast: new **abnormal-fertilisation** → **trophoblastic-proliferation** (mole)
- Ovulation: new **anovulation** (PCOS); reuse `insulin-resistance` (*PCOS ~ T2DM ~ metabolic syndrome*); new **ovarian-hyperandrogenism**
- Infection: reuse `ascending-genital-infection` (PID); new **postpartum-uterine-infection** (endometritis); new **bartholin-duct-obstruction**
- Pregnancy loss: new **early-pregnancy-failure** (miscarriage), **tubal-implantation** (ectopic)

## 4. Finding parents

- New **abnormal-uterine-bleeding** hub with children **heavy-menstrual-bleeding** (fibroids, adenomyosis), **postmenopausal-bleeding** (endometrial; the red-flag symptom), reuse `intermenstrual-postcoital-bleeding` (move under it; cervix, PID, chlamydia), `oligo-amenorrhoea` (move under it? Q16)
- New **pregnancy-bleeding** hub: **first-trimester-bleeding** (miscarriage, ectopic, mole), **painless-third-trimester-bleeding** (praevia), **painful-third-trimester-bleeding** (abruption), **postpartum-haemorrhage** (accreta; outcome rather than finding?)
- New **adnexal-mass** (under `abdominal-mass`): ovarian tumours, functional cyst, endometrioma; new **enlarged-uterus** (fibroids "pelvic mass", adenomyosis "globular", mole "large for dates")
- New **dysmenorrhoea**, reuse `deep-dyspareunia` (*endometriosis ~ PID*), `chronic-pelvic-pain`
- Ovarian cancer: reuse `abdominal-distension`, `ascites`; new **early-satiety-bloating**, **raised-ca125**
- Pregnancy: reuse `proteinuria`, `seizures` (eclampsia), `thrombocytopenia`, `peripheral-oedema`, `headache`; new **pregnancy-hypertension** (new after 20 weeks) under the existing `raised-blood-pressure`; reuse `raised-beta-hcg` (*mole ~ choriocarcinoma ~ testicular GCT ~ ectopic*); new **snowstorm-ultrasound**
- Endocrine: reuse `hirsutism-virilisation` (*PCOS ~ Sertoli–Leydig ~ adrenocortical*), `oligo-amenorrhoea`; new **polycystic-ovaries-on-ultrasound**
- Vulva and cervix: new **white-vulval-plaques** (LS), **vulval-lump-ulcer**, **tender-vulval-swelling** (Bartholin); reuse `pruritus`; new **abnormal-cervical-cytology** (CIN; lab)
- Histology/lab: reuse `raised-afp` (dermoid? no; only yolk sac — note), `raised-ldh` (dysgerminoma note only)

## 5. Outcome parents

- Reuse `iron-deficiency-anaemia` (file; *HMB from fibroids*), `hypovolaemic-shock` (ruptured ectopic, abruption), `disseminated-intravascular-coagulation` (file; abruption — the existing `obstetric-emergency` cause stays), `acute-kidney-injury` (pre-eclampsia), `ischaemic-stroke`/`stroke` (pre-eclampsia later life? only if sourced), `infertility` (new **female-infertility** beside `male-infertility`; PCOS, endometriosis, `tubal-infertility` under it)
- New **eclampsia**, **hellp-syndrome** (pre-eclampsia), **fetal-growth-restriction**
- New **ovarian-torsion**, **ovarian-cyst-rupture** (functional cyst, dermoid), **endometrioma**, **pelvic-adhesions**?
- New **choriocarcinoma** is a file → outcome of mole; **bartholin-abscess**; **vulval-scarring**
- Tumour spread: reuse `lung-metastases`, `brain-metastases` (choriocarcinoma), `liver-metastases`; new **peritoneal-metastases** (ovary), **pseudomyxoma-peritonei** (mucinous), **malignant-bowel-obstruction** (ovary, K&C p.132), **hydronephrosis** (cervix; reuse `hydronephrosis-on-imaging` as a finding)
- `pre-eclampsia` file gains later cardiovascular risk only if a page links it (K&C p.1455 does: hypertension, IHD, stroke, CKD)

---

## Progress

**Batches 1–2 drafted (2026-11-11), 7 files:** polycystic-ovary-syndrome, endometrial-hyperplasia, endometrial-carcinoma; uterine-leiomyoma, adenomyosis, endometriosis, primary-dysmenorrhoea.

**Changes to existing files/nodes:** `intermenstrual-postcoital-bleeding` gained the parent `abnormal-uterine-bleeding` (Q16). No existing disease file edited.

**Changes from the sketch:**
- `androgen-excess` (under `hormone-excess`) instead of a separate ovarian-hyperandrogenism node, so adrenal causes can share it later. Added `abnormal-gnrh-pulsatility` (K&C p.630 and Mehlman both give it).
- Hyperplasia sits in the carcinoma chain as the disease itself (`unopposed-oestrogen → endometrial-hyperplasia → endometrial-transformation`), not a separate mechanism.
- Fibroids start from `older-age`; Afro-Caribbean ethnicity is a note (no ethnicity node exists). Adenomyosis and primary dysmenorrhoea start at a mechanism (no cause given in the sources), as `sarcoidosis` does.
- Not added (no mechanism or not worth a node): acanthosis nigricans (existing node is a paraneoplastic outcome; a note on PCOS), mild hyperprolactinaemia, metabolic-syndrome risk in PCOS, leiomyosarcoma (a note on fibroids, Q5).
- Fibroid → `iron-deficiency-anaemia` via `heavy-menstrual-bleeding` (K&C p.1471); PCOS → `type-2-diabetes`; PCOS → `endometrial-hyperplasia`; endometrial carcinoma ← `lynch-syndrome` (K&C p.1216), `diabetes-mellitus`.

**Thinnest:** adenomyosis, endometriosis and primary dysmenorrhoea rest on Mehlman alone (K&C only lists endometriosis). No source found for infertility or chronic pelvic pain in endometriosis, so neither is linked.

**Batches 3–4 drafted (2026-11-11), 7 files:** miscarriage, ectopic-pregnancy, endometritis; pre-eclampsia, placenta-praevia, placental-abruption, placenta-accreta-spectrum.

**Changes to existing files/nodes:**
- `pre-eclampsia` outcome node deleted; now a file (§5.5). `gestational-diabetes` keeps it as an outcome. It had no parent.
- `tubal-infertility-ectopic-pregnancy` deleted (Q13). `pelvic-inflammatory-disease.yaml` now links `tubal-scarring` to `tubal-infertility` (new outcome under `female-infertility`) and to `ectopic-pregnancy`, each with its own note. PID was its only user.

**Changes from the sketch:**
- `advanced-maternal-age` is a child of the existing `older-age`.
- Postpartum haemorrhage: `postpartum-haemorrhage` already exists as a **cause** (Sheehan's, in hypopituitarism), so accreta uses a new **outcome** `postpartum-bleeding` (§5.5: one id can't be both). Linking them so accreta reaches Sheehan's needs a source. Owner may prefer one renamed.
- New `uteroplacental-insufficiency` hub shared by miscarriage (APS) and pre-eclampsia (all Box 38.3 risks feed it, per Mehlman's mechanism). Hydatidiform mole joins as a pre-eclampsia cause in batch 5. Smoking is not linked: Mehlman lists it but it is not in K&C Box 38.3.
- Placental abruption and pre-eclampsia → `disseminated-intravascular-coagulation` (K&C p.377). DIC's own `obstetric-emergency` cause (abruption, AF embolism, pre-eclampsia) is left as is; it could later be split into the two files plus amniotic fluid embolism. Owner's call.
- Placenta accreta spectrum starts at a mechanism (Mehlman gives no cause for it) and has no findings, only `postpartum-bleeding`.
- Not linked: Rh sensitisation after miscarriage, ectopic or abruption (K&C p.378, Mehlman), which could feed `haemolytic-disease-of-the-newborn` later; septic and recurrent miscarriage are notes or not used.

**Intentional loose item:** pre-eclampsia → `stroke` (later in life; K&C p.1455). Case 3: an association with long-term risk, not a chain step. (Later hypertension and CKD are not loose only because they are also chain causes.)

**Thinnest:** the three placentation files rest on Mehlman alone (Q6), and so does endometritis, apart from the PID note. All are marked "Mehlman only" where it matters, ready to remove.

**Batches 5–6 drafted (2026-11-11), 7 files:** gestational-trophoblastic-disease (umbrella), hydatidiform-mole, choriocarcinoma; bartholin-cyst, lichen-sclerosus, vulval-carcinoma, vaginal-carcinoma.

**Changes to existing files (Q9 and new links):**
- `vertical-transmission` link added to `hiv` (K&C p.1426, 1440), `herpes-simplex-infection` (K&C p.1422; Mehlman), `syphilis` (K&C p.1423; Mehlman), `cmv-infection` (K&C p.525), `hepatitis-c` (K&C p.1282). `hepatitis-b` already had it.
- `brain-metastases`: `choriocarcinoma → brain-metastatic-seeding` (Mehlman).
- `pre-eclampsia`: `hydatidiform-mole → uteroplacental-insufficiency` (K&C Box 38.3).

**Changes from the sketch:**
- VIN is a **mechanism** (`vulval-intraepithelial-neoplasia`, fed by `hpv-infection` and `immunosuppression`), not a cause node, so the HPV chain runs through it.
- The vulval and vaginal SCCs share one `vulvovaginal-squamous-transformation` (Mehlman treats them as one lesion); clear cell has its own `vaginal-clear-cell-transformation`. `only:` marks the two routes in vaginal-carcinoma.
- `very-high-beta-hcg` is a child of `raised-beta-hcg`, a sibling of ectopic's `slow-rising-beta-hcg`; testicular germ cell tumour stays related via the parent.
- The GTD umbrella, mole, Bartholin cyst and lichen sclerosus start at a mechanism (no cause given in the sources).
- Malignant ovarian/testicular choriocarcinoma, invasive mole and sarcoma botryoides: notes only.

**Thinnest:** vaginal-carcinoma has **no findings or outcomes** (neither book describes how it presents); vulval-carcinoma's only finding is VIN's red patches or warty papules (K&C p.689). No source for vulval lump or ulcer, node spread or vulval melanoma yet. GTD files and Bartholin rest mainly on Mehlman.

**Batches 7–8 drafted (2026-11-11), 6 files:** cervical-intraepithelial-neoplasia, cervical-cancer; functional-ovarian-cyst, ovarian-tumour (umbrella), benign-epithelial-ovarian-tumour, mature-cystic-teratoma.

**Changes to existing files:** `urinary-tract-obstruction` gains `cervical-cancer → urinary-outflow-obstruction` (Mehlman HY Arrows: ureteric compression, postrenal failure); "Mehlman HY Arrows" added to its sources.

**Changes from the sketch:**
- CIN uses its own `cervical-dysplasia` mechanism rather than a shared HPV-dysplasia hub (VIN was already a mechanism in batch 6); HPV links CIN, VIN, vaginal, penile and HNSCC through `hpv-infection` instead.
- Cervical cancer reaches `urinary-tract-obstruction` (a file), and through it `hydronephrosis-on-imaging` and `acute-kidney-injury`, rather than a new hydronephrosis outcome.
- `ovarian-neoplasm` mechanism with children `benign-ovarian-neoplasm` (cystadenomas, Brenner) and `ovarian-teratoma-growth` (dermoid); epithelial cancer and sex cord-stromal mechanisms join it in batch 9.
- `ovarian-torsion` and `ovarian-cyst-rupture` are outcomes of the functional cyst; torsion also of the umbrella (Mehlman: any adnexal mass raises the risk).
- Not modelled: struma ovarii hyperthyroidism (note only), theca-lutein cysts (on the GTD files), malignant change in dermoid (note: low).

**Thinnest:** benign-epithelial-ovarian-tumour is one link (Mehlman histology types plus K&C's mention of borderline tumours); functional-ovarian-cyst rests mainly on Mehlman. No source for CA125 in benign masses or for pseudomyxoma beyond the mucinous carcinoma line (batch 9).

**Batch 9 drafted (2026-11-11), 2 files:** epithelial-ovarian-cancer, sex-cord-stromal-tumour.

**Changes to existing files:** `endometrial-hyperplasia` gains `sex-cord-stromal-tumour → unopposed-oestrogen` (granulosa cell, Mehlman); `urinary-tract-obstruction` gains `epithelial-ovarian-cancer → urinary-outflow-obstruction` (Mehlman HY Arrows; its note now names both cancers).

**Changes from the sketch:**
- New `transcoelomic-spread` under `metastatic-spread` (Q16) drives ascites, omental caking and `malignant-bowel-obstruction` (new outcome; K&C p.132).
- New cause `many-ovulatory-cycles` (K&C p.131), not just a note, since it is the stated mechanism for the pill and pregnancy protecting.
- Reused `paraneoplastic-dermatomyositis` (Mehlman) and `storage-luts` (urinary urgency, Box 6.36).
- Sex cord-stromal is one file with `sex-cord-stromal-growth` (under `ovarian-neoplasm`) reaching three routes: granulosa → `unopposed-oestrogen` → endometrium (*PCOS ~ granulosa ~ hyperplasia ~ carcinoma*), Sertoli–Leydig → `androgen-excess` (*PCOS ~ adrenocortical*), fibroma → ascites and `pleural-effusion` (Meigs). `only:` can't mark these (they are subtypes, not causes), so notes say which tumour does what.
- Pseudomyxoma peritonei, borderline and primary peritoneal tumours, malignant germ cell tumours (dysgerminoma, yolk sac) and Krukenberg: notes only, as agreed (Q14).

**Thinnest:** sex-cord-stromal-tumour rests on Mehlman alone apart from K&C's lists.

**§16 fully drafted (2026-11-11): 29 files with female genital as their home system** (plus `pelvic-inflammatory-disease` and `gestational-diabetes`, which list it second). One intentional loose item (pre-eclampsia → later-life stroke, case 3). Open for the owner: the `postpartum-haemorrhage` cause vs `postpartum-bleeding` outcome pair; splitting DIC's `obstetric-emergency`; sources for endometrial polyps, leiomyosarcoma and extramammary Paget's (Q3, Q5, Q10); whether to keep the Mehlman-only placentation files (Q6).

---

## 6. Questions before drafting

1. **Menstrual abnormalities as findings, not files.** New `abnormal-uterine-bleeding` hub (heavy, intermenstrual/postcoital, postmenopausal) and `dysmenorrhoea`, carried by fibroids, adenomyosis, endometrial cancer, cervical cancer, endometriosis and PCOS. Primary dysmenorrhoea, premenstrual syndrome and premature ovarian insufficiency stay notes. Recommended: yes. The other way: a `heavy-menstrual-bleeding` file with fibroids, adenomyosis and coagulopathy as causes.
2. **PCOS becomes a file here** (the endocrine doc left it as a note because no section named it). It is the commonest cause of oligo/amenorrhoea and the main unopposed-oestrogen cause of endometrial hyperplasia (K&C p.628–631, Mehlman). `[female-genital, endocrine]`, group ovaries-tubes. Recommended: yes. The other way: a cause node only.
3. **Endometrium:** `endometrial-hyperplasia` and `endometrial-carcinoma` as two files, no umbrella, joined by the new `unopposed-oestrogen` hub (PCOS, obesity, tamoxifen, unopposed HRT, granulosa tumour) and `lynch-syndrome`. "Effect of drugs on endometrium" becomes cause nodes (`tamoxifen`, `unopposed-oestrogen-therapy`) plus a note on the progestogen coil. **Endometrial polyps have no source**: leave out with a TODO. Recommended: yes.
4. **Endometritis:** one file, mainly postpartum (Mehlman: fever, tender uterus, foul lochia after delivery, polymicrobial; → septic pelvic thrombophlebitis, puerperal sepsis); the PID form is a note pointing to the PID file. Recommended: yes. The other way: no file; endometritis only inside PID.
5. **Leiomyosarcoma:** K&C gives one line (sarcoma in 0.05–0.29% of fibroids) and Box 39.8 lists uterine sarcoma; Mehlman says progression is negligible. Recommended: a note on `uterine-leiomyoma` and a TODO for a source; no file. The other way: a thin file from those two lines.
6. **Abnormal placentation:** three files, `placenta-praevia`, `placental-abruption`, `placenta-accreta-spectrum` (accreta, increta, percreta), from Mehlman only, linked by a new `pregnancy-bleeding` finding hub and `previous-uterine-surgery`. Abruption reaches the existing DIC file. Recommended: yes. The other way: one `abnormal-placentation` file with the three as notes.
7. **Pre-eclampsia** becomes a file (same id). Eclampsia and HELLP are **outcomes**; HELLP reuses `microangiopathic-haemolysis` and `thrombocytopenia`. Gestational and chronic hypertension stay notes. Links: APS, diabetes, obesity, mole, age > 40 as causes (K&C Box 38.3); later hypertension, IHD, stroke and CKD as outcomes (K&C p.1455). Recommended: yes.
8. **Gestational trophoblastic disease:** two files, `hydatidiform-mole` (complete and partial in one; invasive mole a note) and `choriocarcinoma` (mole → choriocarcinoma; lung and brain metastases; very high β-hCG). No umbrella. Recommended: yes. The other way: a `gestational-trophoblastic-disease` umbrella.
9. **Vertical transmission:** no new files. Add `vertical-transmission` links (cross-file edits, pages I've read) to `hiv` (p.1426), `herpes-simplex-infection` (neonatal herpes, p.1422), `syphilis` and `cmv-infection` (where they already have congenital outcomes); rubella, toxoplasmosis, parvovirus and GBS stay notes. Recommended: yes. The other way: new files `congenital-rubella` etc.
10. **Vulva:** files `bartholin-cyst` (Mehlman only; abscess outcome), `lichen-sclerosus` (K&C p.667; → vulval SCC) and `vulval-carcinoma` (HPV and lichen sclerosus routes; VIN a cause node, K&C p.689). **Extramammary Paget's has no source**: TODO. Vulval melanoma: a note on `malignant-melanoma`. Recommended: yes.
11. **Vagina:** one `vaginal-carcinoma` file covering SCC (HPV) and clear cell adenocarcinoma (in-utero DES), the two marked with `only:`. Mehlman only. Recommended: yes. The other way: fold vulval and vaginal into one `vulvovaginal-carcinoma` file, as Mehlman does.
12. **Cervix:** files `cervical-intraepithelial-neoplasia` (CIN 1–3; abnormal cytology; HPV-associated change and koilocytes as a note) and `cervical-cancer` (SCC and adenocarcinoma in one file; hydronephrosis, pelvic node spread). Cervicitis stays a finding of chlamydia and gonorrhoea. Screening and vaccination are notes. Recommended: yes. The other way: add a `cervicitis` file with the STI organisms as causes.
13. **Ectopic pregnancy** becomes a file, and PID's combined outcome `tubal-infertility-ectopic-pregnancy` is split: PID gets `ectopic-pregnancy` (file) and a new `tubal-infertility` outcome. Recommended: yes.
14. **Ovary:** a `ovarian-tumour` umbrella (shared: adnexal mass, torsion) with children `benign-epithelial-ovarian-tumour` (serous and mucinous cystadenoma; borderline as a note), `epithelial-ovarian-cancer` (serous incl. tubal and peritoneal origin, mucinous → pseudomyxoma, others as notes; BRCA; CA125; transcoelomic spread → ascites), `mature-cystic-teratoma` and `sex-cord-stromal-tumour` (granulosa → unopposed oestrogen; Sertoli–Leydig → virilisation). Malignant germ cell tumours and Krukenberg stay notes (`ovarian-metastases` remains gastric cancer's outcome). `functional-ovarian-cyst` and `endometriosis` sit outside the umbrella. Recommended: yes. The other way: no umbrella; or separate serous and mucinous files each spanning benign → malignant.
15. **Second systems:** PCOS `[female-genital, endocrine]`, lichen sclerosus `[female-genital, skin-breast]`; PID stays `[kidney-urogenital, female-genital]`. Recommended: yes.
16. **New hubs and moves:** `abnormal-uterine-bleeding` (with `intermenstrual-postcoital-bleeding` moved under it; `oligo-amenorrhoea` left where it is), `pregnancy-bleeding`, `adnexal-mass` under `abdominal-mass`, `unopposed-oestrogen`, `ectopic-endometrial-tissue`, `transcoelomic-spread` under `metastatic-spread`, `female-infertility` (beside `male-infertility`). Recommended: yes.

---

## 7. Batch order

1. Unopposed oestrogen: polycystic-ovary-syndrome, endometrial-hyperplasia, endometrial-carcinoma (3)
2. Uterine wall and ectopic endometrium: uterine-leiomyoma, adenomyosis, endometriosis (3)
3. Early pregnancy: miscarriage, ectopic-pregnancy (with the PID split), endometritis (3)
4. Late pregnancy: pre-eclampsia (node → file), placenta-praevia, placental-abruption, placenta-accreta-spectrum (4)
5. Trophoblast and vertical transmission: gestational-trophoblastic-disease (umbrella), hydatidiform-mole, choriocarcinoma (3), plus the Q9 cross-file edits
6. Vulva and vagina: bartholin-cyst, lichen-sclerosus, vulval-carcinoma, vaginal-carcinoma (4)
7. Cervix: cervical-intraepithelial-neoplasia, cervical-cancer (2)
8. Benign ovary: functional-ovarian-cyst, ovarian-tumour (umbrella), benign-epithelial-ovarian-tumour, mature-cystic-teratoma (4)
9. Malignant ovary: epithelial-ovarian-cancer, sex-cord-stromal-tumour (2)

---

## Decisions (owner, 2026-11-11)

- **Q1:** agreed, except **primary dysmenorrhoea becomes a file** (group uterus-pregnancy; Mehlman HY Repro-OBGYN: PGF2α hypersecretion, period pain under 20 with a normal examination). The other menstrual abnormalities stay findings.
- **Q2:** agreed. PCOS is a file, `[female-genital, endocrine]`.
- **Q3, Q5, Q10:** agreed. **TODO (owner): sources for endometrial polyps, leiomyosarcoma and extramammary Paget's disease**; draft each once a source is added.
- **Q6:** agreed: three placentation files from Mehlman alone. Mark each file's notes as Mehlman-only, **ready to remove** if the owner decides against them.
- **Q7:** agreed.
- **Q9:** agreed. Owner asked about hepatitis: `hepatitis-b` already starts from `vertical-transmission` (no edit needed). `hepatitis-c` gains a `vertical-transmission` link too (K&C p.1282: possible but rare, about 5%). So the cross-file edits are HIV, herpes simplex, syphilis, CMV and hepatitis C.
- **Q13:** agreed. **Q14:** agreed.
- **Q4:** agreed. Endometritis is one file, mainly postpartum; the PID form is a note.
- **Q8:** the alternative: a **`gestational-trophoblastic-disease` umbrella** (shared: abnormal trophoblast, very high β-hCG) with children `hydatidiform-mole` (complete and partial; invasive mole a note) and `choriocarcinoma`. Mole still lists choriocarcinoma as an outcome.
- **Q11, Q12, Q15, Q16:** agreed as recommended.
- All questions answered; ready to draft batch 1.

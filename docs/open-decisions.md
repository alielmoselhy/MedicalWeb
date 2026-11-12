# Open decisions

Things to decide together. Nothing here is built yet. Strike an item out, or move it to the README, once it is settled.

## Visualize (grow-your-own web, rebuilt 2026-11-12)

Agreed with the owner and built:
- You grow the web one step at a time. Search for a starting point (a disease starts from the roots of its chain and follows that chain). Clicking a node shows faint "ghost" options around it: what leads to it, what it leads to, what it is a kind of, its kinds. Up to 6 per direction are drawn; the side panel lists the rest, with counts of diseases, "Show all" and "Add all".
- Clicking a ghost adds it. Links to anything already on the web are drawn as soon as both ends are there.
- Follow all diseases (optionally one body system), or one disease's chain.
- Lens: "Light up a disease" highlights that disease's path through what is on the web. No disease clouds.
- The map holds still: only a first web is laid out by WebCola; later nodes are slotted into free room above (causes, parents) or below (effects, kinds) their neighbour. Dragging still wakes the layout.
- Trail of steps, undo, remove, clear. The whole web (trail, mode, system, lens) lives in the address, so Back undoes a step and a link reopens the web; named webs can also be saved in this browser.
- Visualize is a subtab of Explore, not in the main nav.

Still open:
1. Phone width and dark mode not checked.
2. Cause groups are no longer folded on this page: a group is one node, and its members appear under "What leads to it".

## Cause bundles (decided 2026-11-08)

- Bundles are **declared**, never inferred: a chain link from a class node with `members:` (`drafting-protocol.md` §6.5a). The owner's rule: only group causes whose shared nature is the reason they cause the step.
- Visualize (rebuilt 2026-11-12) no longer folds groups: the group is one node you can add, and its members are offered under "What leads to it". The old "(+N)" fold code (`bundles.js`) is gone.
- The disease page always shows everything.
- Done so far: CAP's five inhaled organisms. Agreed: a pass over every existing file to declare its groups, each judged on the rule above (to-do in `drafting-protocol.md` §11).

## Spacing

- Nodes and labels sit too close: long labels overlap their neighbours, and edges cross through labels.
- Today the layout treats each node as a 14px dot and ignores its label. Options: count labels as part of the node's size, a longer ideal edge length, or a minimum zoom after fitting so labels stay readable (scroll/pan instead of shrinking).
- Same question on the disease page chain diagram, which grows very tall.

## Bubble dynamics

The coloured outline ("cloud") drawn around everything one disease has.

- Explore no longer draws clouds. Should each disease on the web get one again?
- Known behaviour today (Compare, and the old Explore):
  - An outline breaks into separate pieces when one of its nodes sits far from the rest (Aortic stenosis in Compare). The code peels far nodes off into small outlines of the same colour.
  - Shared nodes sit inside two or more outlines at once, which gets hard to read past three diseases.
  - Outlines are redrawn while a node is dragged. This is what caused the runaway drag bug fixed earlier.
- To decide:
  - should outlines follow nodes live while dragging, or redraw after the drop?
  - should a cloud pull its own nodes together, so it stays in one piece?
  - how should overlap look where diseases share nodes?

## Area allocation

How canvas space is shared between the diseases on the web.

- Today a new disease lands next to the nodes it shares with the web. If it shares none, it lands to the right of the web. The rest of the web never moves.
- Problems: a disease that shares a lot lands on top of the existing one, so the two tangle together. The web also grows lopsided as more are added.
- Options:
  - give each disease its own region (sectors around a centre, or a grid), with shared nodes placed between the regions that use them. This is the Venn idea Compare already uses for 2–3 diseases.
  - allow a "re-tidy" button that re-lays out everything on request, so additions stay stable but the user can clean up.
  - cap or scale a region by how many nodes the disease has.

## Diseases page

- Done (2026-11-07): a rail of systems on the left that filters the list, plus search. On a phone the rail becomes chips. The chosen system is not kept in the link, so pressing Back resets it to "All systems".
- **Later, agreed: "Browse by concept".** A second way into the diseases: list the big shared parent concepts that cross systems (granuloma formation, ectopic hormone secretion, airflow obstruction, shock, paraneoplastic syndrome…), with the diseases under each. This is the cross-system view the project is for.
- Not done yet, for when the list grows:
  - show umbrella diseases as a tree (pneumonia → HAP → VAP)
  - show draft or reviewed status per disease

## Data tidy (2026-11-07)

- Groups now come from `syllabus.yaml` (in syllabus order). The cardio sub-groups ischaemic, atherosclerotic, myocardial and pericardial became one syllabus group, "Ischaemic, myocardial and pericardial disease" (17 diseases). If that is too big, umbrella trees or sub-groups are the fix.
- Added systems for syllabus §3 (biochemistry) and §4 (microbiology and infection), for future diseases such as hyponatraemia, sepsis and HIV.
- Kept apart on purpose, review if you disagree:
  - heart-failure crackles vs ILD crackles
  - hypercalcaemia (finding) vs hypercalcaemia of malignancy (outcome)
  - spinal TB vs vertebral osteomyelitis: Pott's disease *is* a vertebral osteomyelitis, but a node has one parent, so it sits under extrapulmonary TB
  - malignant and parapneumonic effusions (outcomes) don't link to the pleural-effusion finding, because a parent must be the same type

## GI and liver (2026-11-07)

- ~~**Bile duct adenoma**~~ Done: drafted from the LMC cirrhosis handout. The handouts are now cited throughout the liver and biliary files.
- **Focal nodular hyperplasia** is in the cirrhosis handout but not in the syllabus. Add it as a file?
- **Check the cardio ascites change:** heart failure, TR, cor pulmonale, pulmonary hypertension and restrictive cardiomyopathy now give *high-gradient* ascites. K&C Box 34.20 lists right-sided failure and TR; the other three are included because their ascites also comes from right-sided venous congestion.

## Redundancy check after GI (2026-11-07)

- **Merged or regrouped:**
  - CF-related diabetes → a kind of pancreatogenic (type 3c) diabetes
  - meconium ileus, gallstone ileus and intussusception → kinds of intestinal obstruction
  - hypokalaemic alkalosis → a kind of hypokalaemia
  - iron deficiency, B12/folate and haemolytic anaemia → under a new `anaemia` parent
  - coeliac and pernicious-anaemia antibodies → under `gi-autoantibody` (was liver-only)
  - oesophageal and intestinal strictures → under `gi-stricture`
  - appendicitis, diverticulitis, cholecystitis and cholangitis → their infection steps now share `obstructed-viscus-infection`, the same obstruction-then-infection pattern
- **Renamed to remove overlap:**
  - "Anorexia and nausea" → "Loss of appetite", since nausea was also in vomiting
  - faecal–oral spread vs badly stored food
  - GI bleeding (symptom) vs major GI haemorrhage (complication)
- **Kept apart on purpose:**
  - a mechanism next to its finding (non-caseating granuloma vs granulomas on biopsy; villous atrophy; steatosis): the mechanism links diseases, and the finding is what you pick on the Differential page
  - bowel perforation (mechanism) vs perforated-ulcer/appendix/diverticulum (outcomes): one is a step, the others are complications
  - amoebic vs pyogenic liver abscess: a parent must be the same type, and pyogenic is a disease file
  - the primary tumour nodes (lung, liver, oesophagus, stomach, bowel, pancreas, biliary) have no shared parent. One would make every cancer "related" to every other; they already link through the kinds of `malignant-transformation`
  - chronic mesenteric ischaemia's post-prandial pain stays under ischaemic pain (one parent only)
- **Done:** hepatic encephalopathy and Wernicke's now share an `encephalopathy` parent (agreed 2026-11-07).
- **Done:** lung, intra-abdominal and amoebic liver abscesses share an `abscess` parent (agreed 2026-11-07).

## Later, agreed: teaching handouts pass (noted 2026-11-07)

You'll collect all the LMC teaching handouts and convert them to Markdown in `Resources/`. Then we go back through the existing disease files and work them in, citing them as `LMC <year> <title> s.<slide>`. Until then, drafting uses K&C and Mehlman.

## Later, agreed: share the database with friends and let them query it (noted 2026-11-07)

Once the content is done, friends should be able to get the data and ask it specific questions. Nothing is built yet. Questions to settle then:
- **How they get it:** a hosted copy of the app (it's already static, so free static hosting works), a downloadable file, or both.
- **What "query" means:** saved question types in the app, e.g.
  - "diseases with finding X and outcome Y"
  - "everything caused by alcohol"
  - "what links disease A to disease B"

  The other option is raw access (`graph.json`, or a SQLite file they can run SQL against).
- **Before sharing:**
  - finish reviewing the drafts, or mark draft content clearly
  - add a "study aid, not medical advice" note
  - check that only paraphrased notes go out (`Resources/` stays private)



- ~~**Organ-system tags on diseases.**~~ Done (2026-11-06): `systems: [...]`, one or more per disease. The Diseases list now filters by them; Explore doesn't use them yet.
- **Drafts to reviewed.** Every disease is still `status: draft` until you review it.
- **Review findings 1–6** (from the earlier code review), unapplied. 1 and 2 were recommended: the as-outcome label shown for causes, and the highlight that sticks.
- **Compare layout.** The aortic stenosis vs HCM Venn looks irregular (see bubble dynamics above).

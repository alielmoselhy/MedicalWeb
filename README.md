# MedicalWeb

An explorable graph of diseases, their findings, causal mechanism chains and outcomes, showing what diseases share.

```sh
npm install
npm run dev        # http://localhost:5173 — edits to YAML reload live; validation errors show in the browser
npm test           # validator self-tests
npm run build      # static site in dist/ (works on any static host)
```

## Data
- `nodes.yaml` holds the shared vocabulary, one node per line: every cause (organism, gene, risk factor, drug), mechanism, finding and outcome. The parent concepts are explained in `docs/concepts-cardio.md`. A disease file can't use an id that isn't defined here (or as another disease), which keeps names consistent.
- `parent:` means "is a kind of", and the parent must be the same type (an outcome may be a kind of disease). Disease files can also have a `parent:` disease (STEMI → ACS). Siblings under the same parent count as **related** matches (one level only).
- `Diseases/<id>.yaml` holds one disease: the set of its mechanisms, findings and outcomes. `chain` is a list of `[from, to]` causal links starting at the root cause (a disease never appears in its own chain), or `{from, to, note, source}` when a link needs detail. `findings` and `outcomes` take ids or `{id, freq, note, source}`. Outcomes may be other diseases.
- `freq` is one of `classic | common | occasional | rare`. `status` is `draft` until reviewed.

## Sources
- Citations use **printed** Kumar & Clark 10e page numbers. The converted Markdown's `<!-- pN -->` markers are PDF pages; printed = PDF − offset, checked against each chapter's contents list: ch.8 −19, ch.20 −22, ch.24 −21, ch.26 −20, ch.28 −18, ch.29 −17, ch.30 −16, ch.31 −16, ch.32 −15, ch.36 −13.
- Notes are paraphrased: no copied passages. `Resources/` is gitignored and must never be published.

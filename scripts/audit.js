// Finds possible missing similarity links: in-use nodes (any type) whose names share a word root but sit in
// different is-a families, so no view counts them as related. Each hit is a prompt to check, not a verdict.
// Usage: npm run build:data && node scripts/audit.js [word …]   e.g. node scripts/audit.js granuloma
//   With no words, lists only roots shared by 2–4 families: a word in many families is usually too general to mean much.
//   ## root (n families)
//   one line per family: its nodes as id [type], with the disease count that uses each
import { readFileSync } from 'node:fs';

const g = JSON.parse(readFileSync(new URL('../app/src/graph.json', import.meta.url)));
const by = Object.fromEntries(g.nodes.map(n => [n.id, n]));
const users = {};
for (const [d, ids] of Object.entries(g.touches)) for (const id of ids) (users[id] ??= new Set()).add(d);
const inUse = g.nodes.filter(n => n.type !== 'disease' && users[n.id]);

// Families: nodes joined through any chain of is-a links (union-find).
const up = {};
const find = id => (up[id] ??= id) === id ? id : (up[id] = find(up[id]));
for (const n of g.nodes) for (const p of n.parents) up[find(n.id)] = find(p);

// Words too general to suggest a link on their own. shortcut: hand-picked list, extend it when noise shows up.
const STOP = new Set(['finding', 'findings', 'raised', 'reduced', 'increased', 'decreased', 'chronic', 'acute', 'disease',
  'injury', 'damage', 'failure', 'abnormality', 'abnormal', 'serum', 'blood', 'level', 'levels', 'without', 'within',
  'their', 'other', 'often', 'small', 'large', 'lower', 'upper', 'cells', 'through', 'causing', 'caused', 'change', 'changes',
  'biopsy', 'imaging', 'endoscopy', 'severe', 'mild', 'loss', 'formation', 'syndrome', 'pressure', 'tissue', 'from', 'into']);
const root = w => w.slice(0, 7); // granuloma/granulomatous match, granular does not
const roots = {};
for (const n of inUse)
  for (const w of new Set(n.name.toLowerCase().match(/[a-z]{5,}/g) ?? []))
    if (!STOP.has(w)) (roots[root(w)] ??= new Set()).add(n.id);

const only = process.argv.slice(2);
const hits = Object.entries(roots)
  .filter(([r]) => !only.length || only.some(o => r.startsWith(root(o))))
  .map(([r, ids]) => {
    const fams = {};
    for (const id of ids) (fams[find(id)] ??= []).push(id);
    return [r, Object.values(fams)];
  })
  .filter(([, fams]) => fams.length > 1 && (only.length || fams.length <= 4))
  .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

for (const [r, fams] of hits) {
  console.log(`## ${r} (${fams.length} families)`);
  for (const f of fams) console.log(`  ${f.map(id => `${id} [${by[id].type}] ×${users[id].size}`).join('  ')}`);
}
console.log(`\n${hits.length} word root(s) shared across families`);

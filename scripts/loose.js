// Lists, per disease, the findings and outcomes no chain link reaches, beside the chain nodes that could explain them.
// Usage: npm run build:data && node scripts/loose.js [disease-id …]
//   M: mechanisms (and diseases used as steps) already in the chain, the usual place to link from
//   C: root causes in the chain (link from these only when the cause itself produces the item)
//   L: loose items to link
import { readFileSync } from 'node:fs';

const g = JSON.parse(readFileSync(new URL('../app/src/graph.json', import.meta.url)));
const by = Object.fromEntries(g.nodes.map(n => [n.id, n]));
const only = process.argv.slice(2);
let total = 0;
for (const d of g.nodes.filter(n => n.type === 'disease' && (!only.length || only.includes(n.id))).sort((a, b) => a.id.localeCompare(b.id))) {
  const chain = g.edges.filter(e => e.kind === 'causal' && e.disease === d.id);
  const inChain = new Set(chain.flatMap(e => [e.from, e.to]));
  const items = g.edges.filter(e => e.disease === d.id && (e.kind === 'finding' || e.kind === 'outcome')).map(e => e.to);
  const loose = [...new Set(items.filter(x => !inChain.has(x)))];
  if (!loose.length) continue;
  total += loose.length;
  const reached = new Set(chain.map(e => e.to));
  const steps = [...inChain].filter(x => reached.has(x) && !items.includes(x) && by[x].type !== 'finding');
  const roots = [...inChain].filter(x => !reached.has(x));
  console.log(`## ${d.id}\nM: ${steps.join(' ')}\nC: ${roots.join(' ')}\nL: ${loose.join(' ')}`);
}
console.log(`\n${total} loose item(s)`);

// Graph data plus the matching logic shared by all views.
import data from './graph.json';

export const { nodes, edges, touches, syllabus } = data;
export const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
export const diseases = nodes.filter(n => n.type === 'disease').sort((a, b) => a.name.localeCompare(b.name));
// Syllabus subsections in syllabus order; every disease's group is one of these (the validator checks).
export const groups = syllabus.flatMap(s => s.groups);
export const groupName = id => groups.find(g => g.id === id).name;
export const TYPES = ['disease', 'cause', 'mechanism', 'finding', 'outcome'];

// Nodes some disease uses, plus their parents; unused vocabulary stays out of the views.
const touched = new Set(diseases.flatMap(d => [d.id, ...touches[d.id]]));
export const inUse = new Set([...touched, ...[...touched].map(id => byId[id].parent).filter(Boolean)]);

const childMap = {};
nodes.forEach(n => n.parent && (childMap[n.parent] ??= []).push(n.id));
export const children = id => childMap[id] ?? [];

// The is-a families a node belongs to, one level only: its parent, and itself if it has children.
export const familiesOf = id => [byId[id]?.parent, children(id).length ? id : null].filter(Boolean);
export const related = (a, b) => a !== b && familiesOf(a).some(k => familiesOf(b).includes(k));

// Exact / related / unique overlap between 2+ diseases.
export function compare(ids) {
  const sets = ids.map(d => (touches[d] ?? []).filter(n => !ids.includes(n)));
  const exact = sets[0].filter(n => sets.every(s => s.includes(n)));
  const rest = sets.map(s => s.filter(n => !exact.includes(n)));
  const relatedRows = [];
  for (const key of new Set(rest.flat().flatMap(familiesOf))) {
    const per = rest.map(list => list.filter(n => familiesOf(n).includes(key)));
    if (per.every(l => l.length)) relatedRows.push({ key, per });
  }
  const inRelated = new Set(relatedRows.flatMap(r => r.per.flat()));
  return { exact, related: relatedRows, unique: rest.map(list => list.filter(n => !inRelated.has(n))) };
}

const FREQ_WEIGHT = { classic: 3, common: 2, occasional: 1, rare: 0.5 };
export const freqOf = (d, n) => edges.find(e => e.from === d && e.to === n && e.kind === 'finding')?.freq;

// Diseases ranked by how many selected findings they explain: exact first, then related, then frequency.
export function differential(selected) {
  return diseases.map(d => {
    const t = touches[d.id];
    const exact = selected.filter(s => t.includes(s));
    const rel = selected.filter(s => !exact.includes(s))
      .map(s => [s, t.filter(n => related(s, n))]).filter(([, m]) => m.length);
    const weight = exact.reduce((w, s) => w + (FREQ_WEIGHT[freqOf(d.id, s)] ?? 1), 0);
    return { disease: d, exact, related: rel, weight };
  }).filter(r => r.exact.length || r.related.length)
    .sort((a, b) => b.exact.length - a.exact.length || b.related.length - a.related.length || b.weight - a.weight);
}

export function toElements(ids, edgeList) {
  const seen = new Set();
  return [
    ...[...ids].map(id => ({ data: { id, label: byId[id].name, type: byId[id].type } })),
    ...edgeList.flatMap(e => {
      const id = `${e.from}>${e.to}>${e.kind}`;
      if (seen.has(id) || e.from === e.to) return [];
      seen.add(id);
      // An outcome that is itself a disease reads as "progresses to", so it keeps its arrow.
      const kind = e.kind === 'outcome' && byId[e.to].type === 'disease' ? 'progresses' : e.kind;
      return [{ data: { id, source: e.from, target: e.to, kind } }];
    }),
  ];
}

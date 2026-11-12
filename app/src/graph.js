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
export const inUse = new Set([...touched, ...[...touched].flatMap(id => byId[id].parents)]);

const childMap = {};
nodes.forEach(n => n.parents.forEach(p => (childMap[p] ??= []).push(n.id)));
export const children = id => childMap[id] ?? [];

// The is-a families a node belongs to, one level only: its parents, and itself if it has children.
export const familiesOf = id => [...(byId[id]?.parents ?? []), ...(children(id).length ? [id] : [])];
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
      return [{ data: { id, source: e.from, target: e.to, kind, ...((e.note || e.source || e.only) && { noted: 1 }) } }];
    }),
  ];
}

// Everything Explore shows about one node. Lists of { id, diseases } are sorted by how many diseases use each.
const causalOnly = edges.filter(e => e.kind === 'causal');
const tally = (list, key) => Object.entries(list.reduce((t, e) => ((t[e[key]] ??= new Set()).add(e.disease), t), {}))
  .map(([id, ds]) => ({ id, diseases: [...ds] })).sort((a, b) => b.diseases.length - a.diseases.length || byId[a.id].name.localeCompare(byId[b.id].name));
const ancestors = id => { const out = new Set(), stack = [...byId[id].parents]; while (stack.length) { const p = stack.pop(); if (!out.has(p)) { out.add(p); stack.push(...byId[p].parents); } } return out; };

// One disease's causal chain from a starting cause down to id (shortest), or null when its chain doesn't reach id.
export function pathTo(disease, id) {
  const into = {};
  for (const e of causalOnly) if (e.disease === disease) (into[e.to] ??= []).push(e.from);
  if (!into[id]) return null;
  const next = { [id]: null }, queue = [id];
  while (queue.length) {
    const n = queue.shift();
    if (!into[n]) { const path = [n]; for (let m = next[n]; m; m = next[m]) path.push(m); return path; }
    for (const f of into[n]) if (!(f in next)) { next[f] = n; queue.push(f); }
  }
  return null; // only reached through a loop
}

export function profile(id) {
  const from = tally(causalOnly.filter(e => e.to === id), 'from');
  const to = tally(causalOnly.filter(e => e.from === id), 'to');
  // General mechanisms: ancestors shared by 2+ of the direct causes, e.g. many infections feeding fever.
  const shared = {};
  for (const f of from) for (const a of ancestors(f.id)) (shared[a] ??= { id: a, via: [], diseases: new Set() }).via.push(f.id), f.diseases.forEach(d => shared[a].diseases.add(d));
  const general = Object.values(shared).filter(g => g.via.length > 1).map(g => ({ ...g, diseases: [...g.diseases] }))
    .sort((a, b) => b.via.length - a.via.length);
  const ds = diseases.filter(d => touches[d.id].includes(id)).map(d => ({ id: d.id, path: pathTo(d.id, id), freq: freqOf(d.id, id) }))
    .sort((a, b) => (b.path ? 1 : 0) - (a.path ? 1 : 0) || byId[a.id].name.localeCompare(byId[b.id].name));
  const parents = byId[id].parents, kinds = children(id);
  const siblings = [...new Set(parents.flatMap(children))].filter(s => s !== id && inUse.has(s));
  // Diseases that reach it only through one of its kinds (TB reaches granuloma formation via caseating granulomas).
  const below = nodes.filter(n => ancestors(n.id).has(id)).map(n => n.id);
  const throughKinds = diseases.filter(d => !touches[d.id].includes(id))
    .map(d => ({ id: d.id, kinds: below.filter(k => touches[d.id].includes(k)) })).filter(d => d.kinds.length);
  // Opposites: its own, then those of what it is a kind of (splanchnic vasodilation inherits vasodilation's).
  const oppositesOf = n => edges.filter(e => e.kind === 'opposite' && (e.from === n || e.to === n)).map(e => (e.from === n ? e.to : e.from));
  const opposites = [{ via: null, ids: oppositesOf(id) }, ...[...ancestors(id)].map(a => ({ via: a, ids: oppositesOf(a) }))].filter(o => o.ids.length);
  // Diseases whose causal chain links this node and n (either way), for grouping neighbours by system.
  const diseasesOf = n => [...new Set(causalOnly.filter(e => (e.from === id && e.to === n) || (e.to === id && e.from === n)).map(e => e.disease))];
  return { diseasesOf, from, to, general, diseases: ds, throughKinds, parents, kinds: kinds.filter(k => inUse.has(k)), siblings, opposites };
}

// A disease at a glance: where its chain starts, the mechanism most of the chain runs through, its most typical
// findings, and where it leads.
export function glance(id) {
  const chain = causalOnly.filter(e => e.disease === id);
  const into = new Set(chain.map(e => e.to));
  const roots = [...new Set(chain.map(e => e.from).filter(f => !into.has(f)))];
  const degree = {};
  for (const e of chain) for (const n of [e.from, e.to]) if (byId[n].type === 'mechanism') degree[n] = (degree[n] ?? 0) + 1;
  const central = Object.entries(degree).sort((a, b) => b[1] - a[1])[0]?.[0];
  const rank = { classic: 0, common: 1, occasional: 2, rare: 3 };
  const findings = edges.filter(e => e.disease === id && e.kind === 'finding').sort((a, b) => (rank[a.freq] ?? 4) - (rank[b.freq] ?? 4));
  const typical = findings.filter(e => e.freq === 'classic');
  return { roots, central, classic: (typical.length ? typical : findings).slice(0, 4).map(e => e.to),
    outcomes: edges.filter(e => e.disease === id && e.kind === 'outcome').slice(0, 4).map(e => e.to) };
}

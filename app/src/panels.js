// Home-page panels, generated from the graph. Each generator scans the whole database and returns every example
// that passes its rules, so new diseases feed the panels without anyone writing slides. Rules prefer examples that
// teach: chains that reach the same finding from different systems, families whose kinds really differ, and so on.
import { byId, edges, diseases, touches, syllabus, children, profile, freqOf } from './graph.js';

const homeOf = d => byId[d].systems[0];
const systemName = s => syllabus.find(x => x.id === s).name;
const causal = edges.filter(e => e.kind === 'causal');
const kindsOf = id => children(id).filter(c => byId[c].type === 'disease');
const countBy = list => list.reduce((t, x) => ((t[x] = (t[x] ?? 0) + 1), t), {});
const top = counts => Object.entries(counts).sort((a, b) => b[1] - a[1]);
// Shared across many systems, so too general to characterise one (fever, weight loss, metastatic spread).
const everywhere = new Set(Object.entries(countBy(diseases.flatMap(d => [...new Set(touches[d.id])])))
  .filter(([id]) => new Set(diseases.filter(d => touches[d.id].includes(id)).map(d => homeOf(d.id))).size >= 6).map(([id]) => id));

// One body system: its size and its most shared mechanisms and findings, with how many of its diseases use each.
export function systemSpotlights() {
  return syllabus.map(s => {
    const ds = diseases.filter(d => homeOf(d.id) === s.id);
    if (ds.length < 4) return null;
    const counts = top(countBy(ds.flatMap(d => [...new Set(touches[d.id])]).filter(id => !everywhere.has(id))));
    const best = type => counts.filter(([id, n]) => byId[id]?.type === type && n >= 2).slice(0, 5).map(([id, n]) => ({ id, n }));
    const mechanisms = best('mechanism'), findings = best('finding');
    return mechanisms.length >= 2 && findings.length >= 2 && { system: s.id, name: s.name, count: ds.length, mechanisms, findings };
  }).filter(Boolean);
}

// One finding reached by chains from 3 different systems: the same sign, different pathology.
export function differentRoads() {
  const findings = Object.entries(countBy(causal.filter(e => byId[e.to].type === 'finding').map(e => e.to)))
    .filter(([, n]) => n >= 3).map(([id]) => id);
  return findings.map(id => {
    const roads = [], seen = new Set(), via = new Set();
    for (const d of profile(id).diseases) {
      // Only chains of 3+ steps, each through a different last mechanism and system, so the roads really differ.
      if (!d.path || d.path.length < 3 || seen.has(homeOf(d.id)) || via.has(d.path.at(-2))) continue;
      seen.add(homeOf(d.id)); via.add(d.path.at(-2));
      roads.push({ disease: d.id, system: systemName(homeOf(d.id)), path: d.path.slice(-3, -1) }); // the finding itself is the title
    }
    return roads.length >= 3 && { finding: id, roads: roads.slice(0, 3) };
  }).filter(Boolean);
}

// One opposite pair with a disease on each side (a disease using the node or one of its kinds).
export function oppositePairs() {
  // Prefer a disease whose chain produces it, then one whose chain starts from it, then any that lists it.
  const user = id => {
    const ids = new Set([id, ...children(id)]);
    return causal.find(e => ids.has(e.to))?.disease ?? causal.find(e => ids.has(e.from))?.disease ?? diseases.find(d => touches[d.id].some(t => ids.has(t)))?.id;
  };
  return edges.filter(e => e.kind === 'opposite').map(e => ({ a: e.from, b: e.to, da: user(e.from), db: user(e.to) }))
    .filter(p => p.da && p.db && p.da !== p.db);
}

// Which disease? A starting cause, a mechanism on the way, and two findings, none naming the disease itself.
export function quizzes() {
  const words = s => new Set(s.toLowerCase().match(/[a-z]{5,}/g) ?? []);
  return diseases.map(d => {
    const name = words(d.name), gives = id => [...words(byId[id].name)].some(w => name.has(w));
    const chain = causal.filter(e => e.disease === d.id);
    const into = new Set(chain.map(e => e.to));
    const cause = chain.map(e => e.from).find(id => !into.has(id) && !gives(id) && byId[id].type === 'cause');
    const mechanism = chain.map(e => e.to).find(id => byId[id].type === 'mechanism' && !gives(id) && !everywhere.has(id));
    const rank = { classic: 0, common: 1 };
    const findings = touches[d.id].filter(id => byId[id].type === 'finding' && !gives(id) && !everywhere.has(id) && freqOf(d.id, id) in rank)
      .sort((a, b) => rank[freqOf(d.id, a)] - rank[freqOf(d.id, b)]).slice(0, 2);
    return cause && mechanism && findings.length === 2 && { disease: d.id, clues: [cause, mechanism, ...findings] };
  }).filter(Boolean);
}

// A disease family: the parent, what all its kinds share, and one thing distinctive to each kind.
export function families() {
  return diseases.filter(d => kindsOf(d.id).length >= 2).map(d => {
    const kinds = kindsOf(d.id);
    const shared = touches[kinds[0]].filter(id => kinds.every(k => touches[k].includes(id)) && !everywhere.has(id));
    const own = kinds.map(k => ({ kind: k, mark: touches[k].find(id => byId[id].type !== 'disease' && !everywhere.has(id)
      && kinds.every(o => o === k || !touches[o].includes(id))) }));
    return shared.length && own.every(o => o.mark) && { family: d.id, shared: shared.slice(0, 3), kinds: own.slice(0, 4) };
  }).filter(Boolean);
}

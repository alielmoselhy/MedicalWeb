// Cause bundles for the Explore web. Pure functions over the graph's edges, so node tests can run them.
// A bundle is declared in a disease file: a chain link from a class (e.g. inhaled respiratory pathogens) with
// `members`. The author has judged that the shared class is the reason they cause the step, so it is never inferred.

// [{ id: class node, disease, target, ids: members }] for the diseases on the web.
export const bundlesFor = (onWeb, edges) => edges
  .filter(e => e.kind === 'causal' && e.members && onWeb.includes(e.disease))
  .map(e => ({ id: e.from, disease: e.disease, target: e.to, ids: e.members }));

// What closed bundles fold away: their members, then anything whose every arrow in came from something folded,
// repeating until nothing else loses its last arrow in. A member another disease on the web also uses stays,
// because cross-disease links are the point of the web; so does anything the user seeded directly.
export function hiddenBy(closed, onWeb, keep, edges) {
  const inWeb = edges.filter(e => (e.kind === 'causal' || e.kind === 'bundled') && onWeb.includes(e.disease));
  const usedBy = id => new Set(inWeb.filter(e => e.from === id || e.to === id).map(e => e.disease));
  const kept = new Set(keep);
  const gone = new Set(closed.flatMap(b => b.ids.filter(id => !kept.has(id) && usedBy(id).size === 1)));
  const causal = inWeb.filter(e => e.kind === 'causal');
  for (let changed = true; changed;) {
    changed = false;
    for (const n of new Set(causal.map(e => e.to))) {
      if (gone.has(n) || kept.has(n)) continue;
      if (causal.filter(e => e.to === n).every(e => gone.has(e.from))) { gone.add(n); changed = true; }
    }
  }
  return gone;
}

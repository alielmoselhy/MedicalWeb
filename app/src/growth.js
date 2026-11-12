// The grow-your-own web on Visualize. Pure functions over the graph's edges, so node tests can run them.

// The lines a step can follow: causal links, and a cause group's members feeding the group.
export const LINKS = ['causal', 'bundled'];

// The address holds the whole web: #/visualize/?w=fever;a,b;c&m=<disease>&s=<system>&l=<disease>
// w: the trail, steps split by ";" and each step's nodes by ","; m: follow one disease's chain; s: follow one body
// system's diseases; l: the disease lit up. An old #/visualize/a,b address reads as a one-step trail.
export function parseWeb(raw = '') {
  const q = new URLSearchParams(raw.startsWith('?') ? raw.slice(1) : `w=${raw}`);
  return { steps: (q.get('w') ?? '').split(';').map(s => s.split(',').filter(Boolean)).filter(s => s.length),
    m: q.get('m') ?? '', s: q.get('s') ?? '', l: q.get('l') ?? '' };
}
export const webQuery = ({ steps, m, s, l }) => '?' + [['w', steps.map(x => x.join(',')).join(';')], ['m', m], ['s', s], ['l', l]]
  .filter(([, x]) => x).map(([k, x]) => `${k}=${x}`).join('&');

// What could join the web next to id: its causes and effects among `links` (each with how many diseases use that
// link, most shared first), and its is-a parents and kinds among `isa` (child → parent edges).
export function options(id, links, isa) {
  const tally = (list, key) => Object.entries(list.reduce((t, e) => ((t[e[key]] ??= new Set()).add(e.disease), t), {}))
    .map(([x, ds]) => ({ id: x, n: ds.size })).sort((a, b) => b.n - a.n || a.id.localeCompare(b.id));
  return { from: tally(links.filter(e => e.to === id), 'from'), to: tally(links.filter(e => e.from === id), 'to'),
    parents: isa.filter(e => e.from === id).map(e => ({ id: e.to })), kinds: isa.filter(e => e.to === id).map(e => ({ id: e.from })) };
}

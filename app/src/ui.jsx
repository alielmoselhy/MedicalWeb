import { byId, TYPES } from './graph.js';

export const go = (view, ids = []) => { location.hash = `/${view}${ids.length ? '/' + ids.join(',') : ''}`; };

// A node name that links to its disease page, or to its focus in Explore.
export function NodeLink({ id, dashed }) {
  const n = byId[id];
  const href = n.type === 'disease' ? `#/disease/${id}` : `#/explore/${id}`;
  return <a className={`chip ${n.type}${dashed ? ' related' : ''}`} href={href}>{n.name}</a>;
}

export const Legend = () => (
  <div className="legend">
    {TYPES.map(t => <span key={t} className={`chip ${t}`}>{t}</span>)}
    <span>→ leads to · — plain line: belongs to the disease · ⇢ dashed: is a kind of · dashed chip: related match</span>
  </div>
);

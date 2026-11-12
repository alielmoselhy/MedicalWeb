import { byId, TYPES } from './graph.js';

export const go = (view, ids = []) => { location.hash = `/${view}${ids.length ? '/' + ids.join(',') : ''}`; };

// A node name that links to its disease page, or to its page on Explore.
export function NodeLink({ id, dashed, ...rest }) {
  const n = byId[id];
  const href = n.type === 'disease' ? `#/disease/${id}` : `#/explore/${id}`;
  return <a className={`chip ${n.type}${dashed ? ' related' : ''}`} href={href} {...rest}>{n.name}</a>;
}

export const Legend = () => (
  <div className="legend">
    {TYPES.map(t => <span key={t} className={`chip ${t}`}>{t}</span>)}
    <span>→ leads to · ⇢ dashed: is a kind of · ⊢┄⊣ dotted with bars: works against · ┄ dotted, no arrow: one of a cause group · coloured cloud: one disease · double border: a disease reached as an outcome · dashed chip: related match</span>
  </div>
);

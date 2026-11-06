import { useMemo } from 'react';
import { byId, edges, touches, diseases, compare, toElements } from './graph.js';
import Graph from './Graph.jsx';
import { NodeLink, Legend, go } from './ui.jsx';

export default function Compare({ ids }) {
  const picked = ids.filter(id => byId[id].type === 'disease').slice(0, 3);
  const set = (i, value) => {
    const next = [...picked];
    next[i] = value;
    go('compare', next.filter(Boolean));
  };
  const result = picked.length >= 2 && compare(picked);
  const key = picked.join(',');
  const { elements, clouds } = useMemo(() => {
    const clouds = picked.map(d => [d, ...touches[d]]);
    // Parents of related matches are drawn too, so their dashed is-a links show why they count as related.
    const ids = new Set([...clouds.flat(), ...(result ? result.related.map(r => r.key) : [])]);
    const es = edges.filter(e => ids.has(e.from) && ids.has(e.to));
    return { elements: toElements(ids, es), clouds };
  }, [key]);

  return (
    <>
      <h1>Compare</h1>
      <div className="controls">
        {[0, 1, 2].map(i => (
          <select key={i} aria-label={`Disease ${i + 1}`} value={picked[i] ?? ''} onChange={e => set(i, e.target.value)}
            disabled={i > picked.length}>
            <option value="">{i < 2 ? 'Choose a disease…' : 'Optional third…'}</option>
            {diseases.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        ))}
      </div>
      {!result ? <p className="muted">Pick at least two diseases.</p> : (<>
        <Graph elements={elements} clouds={clouds} onTap={n => go(byId[n].type === 'disease' ? 'disease' : 'explore', [n])}
          label={`Overlap of ${picked.map(d => byId[d].name).join(', ')}`} />
        <div className="legend">
          {picked.map((d, i) => <span key={d}><span className="cloud-key" style={{ background: `var(--cloud-${i + 1})` }} /> {byId[d].name}</span>)}
        </div>
        <Legend />
        <div className="cols">
          <section className="card">
            <h2>Shared exactly</h2>
            {result.exact.map(n => <NodeLink key={n} id={n} />)}
            {!result.exact.length && <p className="muted">None</p>}
          </section>
          <section className="card">
            <h2>Shared via related concepts</h2>
            <ul className="plain">
              {result.related.map(r => (
                <li key={r.key}>
                  <NodeLink id={r.key} dashed />
                  {r.per.map((ns, i) => (
                    <div key={i} className="muted">{byId[picked[i]].name}: {ns.map(n => byId[n].name).join(', ')}</div>
                  ))}
                </li>
              ))}
              {!result.related.length && <li className="muted">None</li>}
            </ul>
          </section>
          {picked.map((d, i) => (
            <section key={d} className="card">
              <h2>Only in {byId[d].name}</h2>
              {result.unique[i].map(n => <NodeLink key={n} id={n} />)}
              {!result.unique[i].length && <p className="muted">None</p>}
            </section>
          ))}
        </div>
      </>)}
    </>
  );
}

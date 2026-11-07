import { useMemo, useState } from 'react';
import { byId, edges, touches, diseases, compare, toElements } from './graph.js';
import { cloudPositions } from './layout.js';
import Graph from './Graph.jsx';
import { NodeLink, Legend, go } from './ui.jsx';

export default function Compare({ ids }) {
  const picked = ids.filter(id => byId[id].type === 'disease').slice(0, 3);
  const set = (i, value) => {
    const next = [...picked];
    next[i] = value;
    go('compare', next.filter(Boolean));
  };
  const [showRelated, setShowRelated] = useState(false);
  const result = picked.length >= 2 && compare(picked);
  const key = picked.join(',');
  const view = useMemo(() => {
    // Each disease is its cloud, so its own box is not drawn; a disease that is an outcome stays as an outcome node.
    const clouds = picked.map((d, i) => ({ ids: touches[d].filter(n => !picked.includes(n)), label: byId[d].name, colour: `--cloud-${i + 1}` }));
    // Parents of related matches are drawn too, so their dashed is-a links show why they count as related.
    const ids = new Set([...clouds.flatMap(c => c.ids), ...(result && showRelated ? result.related.map(r => r.key) : [])]);
    const es = edges.filter(e => ids.has(e.from) && ids.has(e.to));
    const elements = toElements(ids, es).map(el => el.data.type === 'disease' ? { ...el, classes: 'as-outcome' } : el);
    return { elements, clouds, positions: cloudPositions(clouds.map(c => c.ids), ids, es) };
  }, [key, showRelated]);
  const tip = id => {
    const ins = picked.filter(d => touches[d].includes(id)).map(d => byId[d].name);
    return ins.length ? `In: ${ins.join(', ')}` : 'Related concept: groups matches from different diseases';
  };
  // With related matches off, those nodes count as unique to their disease.
  const unique = result && result.unique.map((u, i) => showRelated ? u : [...new Set([...u, ...result.related.flatMap(r => r.per[i])])]);

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
        <label><input type="checkbox" checked={showRelated} onChange={() => setShowRelated(!showRelated)} /> show related matches</label>
      </div>
      {!result ? <p className="muted">Pick at least two diseases.</p> : (<>
        <Graph {...view} tip={tip} onTap={n => go(byId[n].type === 'disease' ? 'disease' : 'explore', [n])}
          label={`Overlap of ${picked.map(d => byId[d].name).join(', ')}`} />
        <Legend />
        <div className="cols">
          <section className="card">
            <h2>Shared exactly</h2>
            {result.exact.map(n => <NodeLink key={n} id={n} />)}
            {!result.exact.length && <p className="muted">None</p>}
          </section>
          {showRelated && <section className="card">
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
          </section>}
          {picked.map((d, i) => (
            <section key={d} className="card">
              <h2>Only in {byId[d].name}</h2>
              {unique[i].map(n => <NodeLink key={n} id={n} />)}
              {!unique[i].length && <p className="muted">None</p>}
            </section>
          ))}
        </div>
      </>)}
    </>
  );
}

import { useMemo, useState } from 'react';
import { edges, byId, diseases, toElements } from './graph.js';
import Web from './Web.jsx';
import { bundlesFor, hiddenBy } from './bundles.js';
import { NodeLink, go } from './ui.jsx';

const chainByDisease = Object.fromEntries(diseases.map(d => [d.id, [...new Set(edges
  .filter(e => (e.kind === 'causal' || e.kind === 'bundled') && e.disease === d.id).flatMap(e => [e.from, e.to]))]]));
const hasIt = id => diseases.filter(d => chainByDisease[d.id].includes(id));
// Seeds (from the URL) are what the user put on the web. A disease brings only nodes reached by its audited
// causal chain; deliberately disease-page-only findings/outcomes stay on the disease page. Any other node seeded
// directly stands alone until diseases whose chains contain it are added.
export default function Explore({ seeds }) {
  const [query, setQuery] = useState('');
  const [hidden, setHidden] = useState([]);
  const [selected, setSelected] = useState(() => seeds.find(id => byId[id].type !== 'disease'));
  const [lit, setLit] = useState(null);
  const [open, setOpen] = useState([]); // bundle ids the user has opened
  const onWeb = seeds.filter(id => byId[id].type === 'disease');
  const add = ids => go('visualize', [...new Set([...seeds, ...ids])]);
  const remove = id => { go('visualize', seeds.filter(s => s !== id)); if (lit === id) setLit(null); };
  const toggleLit = id => setLit(lit === id ? null : id);
  const hide = id => {
    if (seeds.includes(id)) remove(id); else setHidden([...hidden, id]);
    setSelected(null);
    if (lit === id) setLit(null);
  };

  const key = seeds.join();
  const chainNodes = useMemo(() => new Set(onWeb.flatMap(d => chainByDisease[d])), [key]);
  // A disease on the web is drawn as a cloud around its chain nodes, not as a node itself. A disease still appears
  // as a bubble where another disease's causal chain reaches it.
  const all = useMemo(() => new Set([...chainNodes, ...seeds.filter(id => byId[id].type !== 'disease')]), [chainNodes, key]);
  const removedHere = hidden.filter(id => all.has(id));
  // Declared bundles start closed: the class bubble stands in for its members until clicked.
  const bundles = useMemo(() => bundlesFor(onWeb, edges), [key]);
  const { elements, clouds } = useMemo(() => {
    const closed = bundles.filter(b => !open.includes(b.id));
    const folded = hiddenBy(closed, onWeb, seeds, edges);
    const shown = new Set([...all].filter(id => !hidden.includes(id) && !folded.has(id)));
    // A parent whose kinds come from 2+ diseases is drawn even if no chain uses it, so its dashed is-a lines show
    // the similarity (caseating and non-caseating granulomas meet at granuloma formation).
    const diseasesWith = id => onWeb.filter(d => chainByDisease[d].includes(id));
    for (const n of [...shown]) for (const p of byId[n].parents)
      if (!shown.has(p) && !hidden.includes(p)
        && new Set([...shown].filter(c => byId[c].parents.includes(p)).flatMap(diseasesWith)).size > 1) shown.add(p);
    // Only the causal chain (with bundle membership) and is-a links are lines; what a disease "has" is shown by its cloud.
    const es = edges.filter(e => (e.kind === 'is-a' || ((e.kind === 'causal' || e.kind === 'bundled') && onWeb.includes(e.disease)))
      && shown.has(e.from) && shown.has(e.to));
    const tucked = Object.fromEntries(closed.map(b => [b.id, b.ids.filter(m => folded.has(m)).length]));
    const els = toElements(shown, es).map(el => el.data.source ? el
      : tucked[el.data.id] ? { ...el, data: { ...el.data, label: `${el.data.label} (+${tucked[el.data.id]})` }, classes: 'bundle' }
      : el.data.type === 'disease' && !onWeb.includes(el.data.id) ? { ...el, classes: 'as-outcome' } : el);
    const clouds = onWeb.map((d, i) => ({ id: d, label: byId[d].name, ids: chainByDisease[d].filter(n => shown.has(n)), colour: `--cloud-${i % 6 + 1}` }));
    return { elements: els, clouds };
  }, [all, hidden, open, bundles]);
  const isBundle = id => bundles.some(b => b.id === id);
  const openBundle = selected && bundles.find(b => open.includes(b.id) && (b.id === selected || b.ids.includes(selected)));
  const highlight = useMemo(() => !lit ? []
    : byId[lit].type === 'disease' && onWeb.includes(lit) ? [lit, ...chainByDisease[lit]]
    : [lit, ...onWeb.filter(d => chainByDisease[d].includes(lit))], [lit, key]);

  const matches = query.trim() ? diseases.filter(d => !onWeb.includes(d.id) && d.name.toLowerCase().includes(query.trim().toLowerCase())) : [];
  const pick = id => { add([id]); setQuery(''); };
  const withSel = selected ? hasIt(selected) : [];
  const missing = withSel.filter(d => !onWeb.includes(d.id)).map(d => d.id);

  return (
    <>
      <form className="controls" onSubmit={e => { e.preventDefault(); if (matches[0]) pick(matches[0].id); }}>
        <input type="search" className="big" placeholder="Add a disease to the web" aria-label="Add a disease" value={query}
          onChange={e => setQuery(e.target.value)} />
        {query.trim().toLowerCase() === 'everything' && <button type="button" onClick={() => { add(diseases.map(d => d.id)); setQuery(''); }}>Fork Bomb</button>}
        {seeds.length > 0 && <button type="button" onClick={() => { go('visualize'); setHidden([]); setSelected(null); setLit(null); }}>Clear the web</button>}
      </form>
      {matches.length > 0 && (
        <div className="card picks">
          {matches.slice(0, 12).map(d => <button key={d.id} className="chip disease" onClick={() => pick(d.id)}>{d.name}</button>)}
        </div>
      )}
      <div className="explore">
        <Web elements={elements} clouds={clouds} highlight={highlight} selected={selected} label="Disease web"
          empty={!elements.length && 'Add a disease above. Its audited causal chain floats in a cloud under its name, in causal order from top to bottom. Anything connected across diseases is drawn once, between their clouds.'}
          onTap={n => { if (isBundle(n) && !open.includes(n)) setOpen([...open, n]); byId[n].type === 'disease' ? go('disease', [n]) : setSelected(n); }} />
        <aside className="card">
          <h2>On the web</h2>
          {!onWeb.length && <p className="muted">No diseases yet.</p>}
          <ul className="plain web-list">
            {onWeb.map(d => (
              <li key={d}>
                <NodeLink id={d} />{' '}
                <button aria-pressed={lit === d} onClick={() => toggleLit(d)}>Highlight</button>{' '}
                <button onClick={() => remove(d)} aria-label={`Remove ${byId[d].name}`}>Remove</button>
              </li>
            ))}
          </ul>
          {removedHere.length > 0 && <p><button onClick={() => setHidden([])}>Put back {removedHere.length} removed {removedHere.length === 1 ? 'node' : 'nodes'}</button></p>}
          {selected ? (
            <>
              <h2>{byId[selected].name}</h2>
              <div className="muted">{byId[selected].type}{byId[selected].category && `, ${byId[selected].category}`}</div>
              <p>
                <button aria-pressed={lit === selected} onClick={() => toggleLit(selected)}>Highlight</button>{' '}
                <button onClick={() => hide(selected)}>Remove from the web</button>
                {openBundle && <>{' '}<button onClick={() => { setOpen(open.filter(o => o !== openBundle.id)); setSelected(null); }}>
                  Fold back into “{byId[openBundle.id].name}”</button></>}
              </p>
              <h3>Diseases with this</h3>
              <ul className="plain web-list">
                {withSel.map(d => (
                  <li key={d.id}>
                    <NodeLink id={d.id} />{' '}
                    {onWeb.includes(d.id) ? <span className="muted">on the web</span> : <button onClick={() => add([d.id])}>Add</button>}
                  </li>
                ))}
                {!withSel.length && <li className="muted">None</li>}
              </ul>
              {missing.length > 1 && <p><button onClick={() => add(missing)}>Add all {missing.length}</button></p>}
            </>
          ) : onWeb.length > 0 && <p className="muted">Click a cause, mechanism, finding or outcome to see which diseases have it and add them. A double-bordered bubble marked “(+N)” is a group of causes that act the same way; click it to open the group. Click a cloud's title to open that disease's page. Drag bubbles around; the others make room.</p>}
        </aside>
      </div>
    </>
  );
}

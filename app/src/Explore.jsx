import { useMemo, useState } from 'react';
import { edges, touches, byId, diseases, groups, children, inUse, TYPES, toElements } from './graph.js';
import Graph from './Graph.jsx';
import { NodeLink, Legend, go } from './ui.jsx';

// The focused node plus its one-level is-a family (parent and children).
const familyOf = id => new Set([id, byId[id].parent, ...children(id)].filter(Boolean));

export default function Explore({ focus }) {
  const [types, setTypes] = useState(Object.fromEntries(TYPES.map(t => [t, true])));
  const [group, setGroup] = useState('');
  const [collapse, setCollapse] = useState(false);
  const fam = focus && familyOf(focus);

  const elements = useMemo(() => {
    let ids = new Set(inUse);
    let list = edges;
    if (group) ids = new Set(diseases.filter(d => d.group === group).flatMap(d => [d.id, ...touches[d.id]]));
    if (fam) {
      const keep = new Set(fam);
      if (byId[focus].type === 'disease') touches[focus].forEach(n => keep.add(n));
      edges.forEach(e => { if (e.from === focus) keep.add(e.to); if (e.to === focus) keep.add(e.from); });
      // Diseases whose chains pass through the family get a dotted "involves" link to it.
      const involves = diseases.flatMap(d => touches[d.id].filter(n => fam.has(n)).map(n => ({ from: d.id, to: n, kind: 'involves' })));
      involves.forEach(e => keep.add(e.from));
      ids = new Set([...ids].filter(i => keep.has(i)));
      list = [...edges, ...involves];
    }
    const up = id => (collapse && byId[id].parent) || id;
    const shown = new Set([...ids].filter(i => types[byId[i].type]).map(up));
    const es = list.map(e => ({ ...e, from: up(e.from), to: up(e.to) }))
      .filter(e => shown.has(e.from) && shown.has(e.to) && (!collapse || e.kind !== 'is-a'));
    return toElements(shown, es);
  }, [focus, types, group, collapse]);

  const clouds = useMemo(() => byId[focus]?.type === 'disease' ? [[focus, ...touches[focus]]] : undefined, [focus]);
  const involved = fam && diseases.filter(d => touches[d.id].some(n => fam.has(n)));

  return (
    <>
      <div className="controls">
        {TYPES.map(t => (
          <label key={t}>
            <input type="checkbox" checked={types[t]} onChange={() => setTypes({ ...types, [t]: !types[t] })} /> {t}
          </label>
        ))}
        <select aria-label="Syllabus group" value={group} onChange={e => setGroup(e.target.value)}>
          <option value="">All groups</option>
          {groups.map(g => <option key={g}>{g}</option>)}
        </select>
        <label><input type="checkbox" checked={collapse} onChange={() => setCollapse(!collapse)} /> collapse to parent concepts</label>
        {focus && <button onClick={() => go('explore')}>Show everything</button>}
      </div>
      <div className="explore">
        <Graph elements={elements} clouds={clouds} selected={focus} onTap={n => go('explore', [n])} label="Disease network" />
        <aside className="card">
          {!focus ? (
            <>
              <h2>Explore</h2>
              <p className="muted">Click any node to focus on it and see which diseases share it.</p>
              <Legend />
            </>
          ) : (
            <>
              <h2>{byId[focus].name}</h2>
              <div className="muted">{byId[focus].type}{byId[focus].category && ` · ${byId[focus].category}`}</div>
              {byId[focus].type === 'disease' && <p><a href={`#/disease/${focus}`}>Open disease page →</a></p>}
              {byId[focus].parent && <p>Kind of: <NodeLink id={byId[focus].parent} /></p>}
              {children(focus).length > 0 && <p>Kinds: {children(focus).map(c => <NodeLink key={c} id={c} />)}</p>}
              <h2>Diseases involving this</h2>
              {involved.map(d => <NodeLink key={d.id} id={d.id} dashed={!touches[d.id].includes(focus)} />)}
              {!involved.length && <p className="muted">None</p>}
              {involved.length > 1 && <p><a href={`#/compare/${involved.slice(0, 3).map(d => d.id).join(',')}`}>Compare these →</a></p>}
            </>
          )}
        </aside>
      </div>
    </>
  );
}

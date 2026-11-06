import { useMemo } from 'react';
import { byId, edges, diseases, groups, children, compare, toElements } from './graph.js';
import Graph from './Graph.jsx';
import { NodeLink, Legend, go } from './ui.jsx';

export function DiseaseList() {
  const byGroup = [...groups, undefined].map(g => [g, diseases.filter(d => d.group === g)]).filter(([, ds]) => ds.length);
  return (
    <>
      <h1>Diseases</h1>
      {byGroup.map(([g, ds]) => (
        <section key={g ?? 'other'}>
          <h2>{g ?? 'Ungrouped'}</h2>
          {ds.map(d => <NodeLink key={d.id} id={d.id} />)}
        </section>
      ))}
    </>
  );
}

const Detail = ({ e }) => (e.freq || e.note || e.source) && (
  <span className="muted"> {[e.freq, e.note, e.source && `(${e.source})`].filter(Boolean).join(' · ')}</span>
);

export default function Disease({ id }) {
  const d = byId[id];
  const mine = edges.filter(e => e.disease === id);
  const chain = mine.filter(e => e.kind === 'causal');
  const elements = useMemo(() => toElements(new Set(chain.flatMap(e => [e.from, e.to])), chain), [id]);
  const shares = diseases.filter(o => o.id !== id)
    .map(o => ({ o, ...compare([id, o.id]) }))
    .filter(s => s.exact.length || s.related.length)
    .sort((a, b) => b.exact.length - a.exact.length || b.related.length - a.related.length);

  return (
    <>
      <h1>{d.name}{d.status === 'draft' && <span className="badge">draft</span>}</h1>
      <div className="muted">{d.group} · Sources: {d.sources.join('; ') || 'none yet'}</div>
      {d.parent && <p>Kind of: <NodeLink id={d.parent} /></p>}
      {children(id).length > 0 && <p>Kinds: {children(id).map(c => <NodeLink key={c} id={c} />)}</p>}

      <h2>Mechanism chain</h2>
      {chain.length
        ? <Graph elements={elements} flow selected={id} label={`Causal chain for ${d.name}`}
            onTap={n => n !== id && (byId[n].type === 'disease' ? go('disease', [n]) : go('explore', [n]))} />
        : <p className="muted">No chain yet.</p>}
      <Legend />

      <div className="cols">
        {['finding', 'outcome'].map(kind => (
          <section key={kind}>
            <h2>{kind === 'finding' ? 'Findings' : 'Outcomes'}</h2>
            <ul className="plain">
              {mine.filter(e => e.kind === kind).map(e => <li key={e.to}><NodeLink id={e.to} /><Detail e={e} /></li>)}
            </ul>
          </section>
        ))}
      </div>

      {chain.some(e => e.note || e.source) && (
        <>
          <h2>Chain notes</h2>
          <ul className="plain">
            {chain.filter(e => e.note || e.source).map(e => (
              <li key={e.from + e.to}>{byId[e.from].name} → {byId[e.to].name}<Detail e={e} /></li>
            ))}
          </ul>
        </>
      )}

      <h2>Shares with</h2>
      <ul className="plain">
        {shares.map(({ o, exact, related }) => (
          <li key={o.id}>
            <NodeLink id={o.id} /> <span className="muted">{exact.length} exact, {related.length} related · </span>
            <a href={`#/compare/${id},${o.id}`}>compare</a>
            <div>
              {exact.map(n => <NodeLink key={n} id={n} />)}
              {related.map(r => <NodeLink key={r.key} id={r.key} dashed />)}
            </div>
          </li>
        ))}
        {!shares.length && <li className="muted">Nothing shared yet.</li>}
      </ul>
    </>
  );
}

import { useMemo, useState } from 'react';
import { byId, edges, diseases, groups, groupName, syllabus, children, compare, toElements } from './graph.js';
import Graph from './Graph.jsx';
import { NodeLink, Legend, go } from './ui.jsx';

// Diseases by syllabus group; only: the subset to show (e.g. search matches).
export function DiseaseList({ only = diseases }) {
  const byGroup = groups.map(g => [g, only.filter(d => d.group === g.id)]).filter(([, ds]) => ds.length);
  return (
    <div className="directory">
      {byGroup.map(([g, ds]) => (
        <section key={g.id}>
          <h2>{g.name} <span className="muted">{ds.length}</span></h2>
          <ul className="plain">{ds.map(d => <li key={d.id}><a href={`#/disease/${d.id}`}>{d.name}</a></li>)}</ul>
        </section>
      ))}
    </div>
  );
}

// The Diseases page: a rail of body systems (filter) plus a search box over the directory.
export function DiseaseIndex() {
  const [system, setSystem] = useState(null);
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const inSystem = s => diseases.filter(d => d.systems.includes(s.id));
  const shown = (system ? inSystem(system) : diseases).filter(d => d.name.toLowerCase().includes(q));
  const pick = (s, n) => (
    <li key={s?.id ?? 'all'}>
      <button aria-pressed={system === s} disabled={!n} onClick={() => setSystem(s)}>
        {s ? s.name : 'All systems'} <span className="muted">{n}</span>
      </button>
    </li>
  );
  return (
    <div className="index">
      <nav className="rail" aria-label="Body systems">
        <ul className="plain">{pick(null, diseases.length)}{syllabus.map(s => pick(s, inSystem(s).length))}</ul>
      </nav>
      <div>
        <input type="search" className="big" placeholder={`Find a disease${system ? ` in ${system.name.toLowerCase()}` : ''}`}
          aria-label="Find a disease" value={query} onChange={e => setQuery(e.target.value)} />
        {shown.length ? <DiseaseList only={shown} /> : <p className="muted">No disease matches "{query}"{system && ' in this system'}.</p>}
      </div>
    </div>
  );
}

const Detail = ({ e }) => (e.freq || e.note || e.source || e.only) && (
  <span className="muted"> {e.only && <em>{byId[e.only].name} only{(e.freq || e.note || e.source) && ' · '}</em>}{[e.freq, e.note, e.source && `(${e.source})`].filter(Boolean).join(' · ')}</span>
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
      <div className="muted">{groupName(d.group)} · Sources: {d.sources.join('; ') || 'none yet'}</div>
      {d.parent && <p>Kind of: <NodeLink id={d.parent} /></p>}
      {children(id).length > 0 && <p>Kinds: {children(id).map(c => <NodeLink key={c} id={c} />)}</p>}

      <h2>Mechanism chain</h2>
      {chain.length
        ? <Graph elements={elements} flow selected={id} label={`Causal chain for ${d.name}`}
            onTap={n => n !== id && (byId[n].type === 'disease' ? go('disease', [n]) : go('visualize', [n]))} />
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

      {chain.some(e => e.note || e.source || e.only) && (
        <>
          <h2>Chain notes</h2>
          <ul className="plain">
            {chain.filter(e => e.note || e.source || e.only).map(e => (
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

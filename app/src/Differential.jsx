import { useState } from 'react';
import { nodes, byId, inUse, differential, freqOf } from './graph.js';
import { NodeLink, go } from './ui.jsx';

const findings = nodes.filter(n => n.type === 'finding' && inUse.has(n.id)).sort((a, b) => a.name.localeCompare(b.name));

export default function Differential({ selected }) {
  const [query, setQuery] = useState('');
  const picked = selected.filter(id => byId[id].type === 'finding');
  const toggle = id => go('differential', picked.includes(id) ? picked.filter(s => s !== id) : [...picked, id]);
  const matches = findings.filter(f => !picked.includes(f.id) && f.name.toLowerCase().includes(query.toLowerCase()));
  const results = differential(picked);

  return (
    <>
      <h1>Differential</h1>
      <p className="muted">Pick findings; diseases are ranked by exact matches, then related matches, then how typical the findings are.</p>
      <div className="controls">
        <input type="search" placeholder="Search findings…" aria-label="Search findings" value={query} onChange={e => setQuery(e.target.value)} />
        {picked.map(id => <button key={id} onClick={() => toggle(id)} aria-label={`Remove ${byId[id].name}`}>{byId[id].name} ✕</button>)}
      </div>
      <div className="card">
        {matches.map(f => (
          <button key={f.id} className="chip finding" onClick={() => toggle(f.id)}>
            {f.name} <span className="muted">{f.category}</span>
          </button>
        ))}
      </div>

      <h2>Ranked diseases</h2>
      <ul className="plain">
        {results.map(({ disease, exact, related }) => (
          <li key={disease.id}>
            <NodeLink id={disease.id} /> <span className="muted">{exact.length}/{picked.length} exact{related.length ? `, ${related.length} related` : ''}</span>
            <div>
              {exact.map(s => <span key={s} className="chip finding">{byId[s].name}{freqOf(disease.id, s) && <span className="muted"> · {freqOf(disease.id, s)}</span>}</span>)}
              {related.map(([s, via]) => <span key={s} className="chip finding related">{byId[s].name} <span className="muted">via {via.map(v => byId[v].name).join(', ')}</span></span>)}
            </div>
          </li>
        ))}
        {!picked.length && <li className="muted">No findings picked yet.</li>}
        {picked.length > 0 && !results.length && <li className="muted">No disease matches these findings.</li>}
      </ul>
    </>
  );
}

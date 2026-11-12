import { useState, useEffect } from 'react';
import { nodes, byId, inUse, diseases, touches, syllabus, children, differential, freqOf } from './graph.js';
import { NodeLink, go } from './ui.jsx';

const findings = nodes.filter(n => n.type === 'finding' && inUse.has(n.id)).sort((a, b) => a.name.localeCompare(b.name));
const EXAMS = [['symptom', 'History'], ['sign', 'Examination'], ['lab', 'Tests'], ['ECG', 'ECG'], ['imaging', 'Imaging'], ['endoscopy', 'Endoscopy'], ['histology', 'Histology and marrow']];
const family = id => [id, ...children(id).flatMap(family)];
// A finding belongs to every system of the diseases that have it or one of its kinds.
const systemsOf = Object.fromEntries(findings.map(f => {
  const ids = family(f.id);
  return [f.id, new Set(diseases.filter(d => ids.some(i => touches[d.id].includes(i))).flatMap(d => d.systems))];
}));
// Tabs and system buttons appear only when they'd show something, so new data makes them appear on its own.
const has = (exam, system) => findings.some(f => f.category === exam && (!system || systemsOf[f.id].has(system)));

export default function Differential({ selected }) {
  const [query, setQuery] = useState('');
  const [exam, setExam] = useState('symptom');
  const [system, setSystem] = useState(null);
  const picked = selected.filter(id => byId[id].type === 'finding');
  const toggle = id => go('differential', picked.includes(id) ? picked.filter(s => s !== id) : [...picked, id]);
  // Jump the finder to a chosen finding: its tab, a system that has it, then scroll to and mark its chip.
  const [focus, setFocus] = useState(null);
  const open = id => {
    setQuery('');
    setExam(byId[id].category);
    if (system && !systemsOf[id]?.has(system)) setSystem(null);
    setFocus(id);
  };
  useEffect(() => {
    if (focus) document.querySelector(`.finder [data-id="${focus}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [focus, exam, system]);
  const matches = findings.filter(f => !picked.includes(f.id) && f.name.toLowerCase().includes(query.trim().toLowerCase()));
  // Browsing (no search): one exam at a time, optionally one system, each parent concept on its own row with its kinds.
  const browse = findings.filter(f => f.category === exam && (!system || systemsOf[f.id].has(system)));
  const shown = new Set(browse.map(f => f.id));
  const rows = browse.filter(f => !f.parents.some(p => shown.has(p))).map(r => family(r.id).filter(id => shown.has(id)));
  const families = rows.filter(r => r.length > 1);
  const singles = rows.filter(r => r.length === 1).flat();
  const chip = id => (
    <button key={id} data-id={id} className={`chip finding${focus === id ? ' focus' : ''}`} aria-pressed={picked.includes(id)} onClick={() => toggle(id)}>{byId[id].name}</button>
  );
  const results = differential(picked);

  return (
    <div className="differential">
      <h1>Differential</h1>
      <p className="muted">Pick findings; diseases are ranked by exact matches, then related matches, then how typical the findings are.</p>
      <div className="controls">
        <input type="search" placeholder="Search findings…" aria-label="Search findings" value={query} onChange={e => setQuery(e.target.value)} />
      </div>
      {picked.length > 0 && (
        <div className="card picked" aria-label="Chosen findings">
          {picked.map(id => (
            <span key={id} className="chip finding">
              <button onClick={() => open(id)} title="Show where this finding sits">{byId[id].name}</button>
              <button className="remove" onClick={() => toggle(id)} aria-label={`Remove ${byId[id].name}`}>✕</button>
            </span>
          ))}
        </div>
      )}
      {query.trim() ? (
        <div className="card">
          {matches.map(f => (
            <button key={f.id} className="chip finding" onClick={() => toggle(f.id)}>
              {f.name} <span className="muted">{EXAMS.find(([c]) => c === f.category)[1]}</span>
            </button>
          ))}
          {!matches.length && <span className="muted">No finding matches "{query}".</span>}
        </div>
      ) : (
        <div className="card finder">
          <div className="tabs" role="group" aria-label="Kind of finding">
            {EXAMS.filter(([c]) => has(c, system)).map(([c, label]) => <button key={c} aria-pressed={exam === c} onClick={() => { setExam(c); setFocus(null); }}>{label}</button>)}
          </div>
          <div className="systems" role="group" aria-label="Body system">
            <button aria-pressed={!system} onClick={() => { setSystem(null); setFocus(null); }}>All systems</button>
            {syllabus.filter(s => has(exam, s.id)).map(s => (
              <button key={s.id} aria-pressed={system === s.id} onClick={() => { setSystem(s.id); setFocus(null); }}>{s.name}</button>
            ))}
          </div>
          {families.map(([root, ...kinds]) => (
            <div key={root} className="family">{chip(root)}<span className="kinds">{kinds.map(chip)}</span></div>
          ))}
          {singles.length > 0 && <div className="family">{families.length > 0 && <span className="muted">Other</span>}<span className="kinds">{singles.map(chip)}</span></div>}
          {!browse.length && <p className="muted">No findings of this kind in this system yet.</p>}
        </div>
      )}

      <h2>Ranked diseases</h2>
      <ul className="plain">
        {results.map(({ disease, exact, related }) => (
          <li key={disease.id}>
            <NodeLink id={disease.id} /> <span className="muted">{exact.length}/{picked.length} exact{related.length ? `, ${related.length} related` : ''}</span>
            <div className="bar" role="img" aria-label={`${exact.length} exact and ${related.length} related of ${picked.length}`}>
              <span className="exact" style={{ width: `${100 * exact.length / picked.length}%` }} />
              <span className="rel" style={{ width: `${100 * related.length / picked.length}%` }} />
            </div>
            <div>
              {exact.map(s => <span key={s} className="chip finding">{byId[s].name}{freqOf(disease.id, s) && <span className="muted"> · {freqOf(disease.id, s)}</span>}</span>)}
              {related.map(([s, via]) => <span key={s} className="chip finding related">{byId[s].name} <span className="muted">via {via.map(v => byId[v].name).join(', ')}</span></span>)}
            </div>
          </li>
        ))}
        {!picked.length && <li className="muted">No findings picked yet.</li>}
        {picked.length > 0 && !results.length && <li className="muted">No disease matches these findings.</li>}
      </ul>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { byId, edges, diseases, groups, groupName, syllabus, children, compare, toElements, touches, inUse, nodes, glance } from './graph.js';
import Graph from './Graph.jsx';
import { NodeLink, Legend, go } from './ui.jsx';
import { Excerpt } from './Explore.jsx';

const systemOf = id => syllabus.find(s => s.id === id);
const FREQ = { classic: 4, common: 3, occasional: 2, rare: 1 };
// How often a finding occurs, as filled dots out of four; the word stays for screen readers and on hover.
const Dots = ({ freq }) => freq ? (
  <span className="freq" title={freq} aria-label={freq}>{[1, 2, 3, 4].map(k => <i key={k} className={k <= FREQ[freq] ? 'on' : ''} />)}</span>
) : null;

// A small card of a disease at a glance, shown when a list entry is hovered or focused.
function Preview({ id }) {
  const g = glance(id);
  return (
    <div className="preview" role="tooltip">
      <strong>{byId[id].name}</strong>
      {g.central && <p><span className="muted">Runs through </span>{byId[g.central].name}</p>}
      {g.classic.length > 0 && <p><span className="muted">Typically </span>{g.classic.map(f => byId[f].name).join(', ')}</p>}
    </div>
  );
}

function Entry({ d }) {
  const [hover, setHover] = useState(false);
  return (
    <li onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
      <a href={`#/disease/${d.id}`}>{d.name}</a>
      {hover && <Preview id={d.id} />}
    </li>
  );
}

// Diseases by syllabus group, or A–Z; only: the subset to show (e.g. search matches). open: whether the groups start
// unfolded (undefined: plain headings, not foldable); changing it re-folds every group.
export function DiseaseList({ only = diseases, az = false, open }) {
  const sections = az
    ? [...new Set(only.map(d => d.name[0].toUpperCase()))].sort().map(l => [{ id: l, name: l }, only.filter(d => d.name[0].toUpperCase() === l)])
    : groups.map(g => [g, only.filter(d => d.group === g.id)]).filter(([, ds]) => ds.length);
  return (
    <div className={`directory${az ? ' az' : ''}`}>
      {sections.map(([g, ds]) => open === undefined || az ? (
        <section key={g.id}>
          <h2>{g.name} {!az && <span className="muted">{ds.length}</span>}</h2>
          <ul className="plain">{ds.map(d => <Entry key={d.id} d={d} />)}</ul>
        </section>
      ) : (
        <details key={`${g.id}-${open}`} className="fold" open={open}>
          <summary><span className="fold-name">{g.name}</span> <span className="muted">{ds.length}</span></summary>
          <ul className="plain">{ds.map(d => <Entry key={d.id} d={d} />)}</ul>
        </details>
      ))}
    </div>
  );
}

// Findings and causes whose names match the search, with the diseases that have each.
const searchable = nodes.filter(n => n.type !== 'disease' && inUse.has(n.id));
const usersOf = id => diseases.filter(d => touches[d.id].includes(id));

// The Diseases page: a rail of body systems (kept in the address), a search over names and findings, A–Z or by section.
export function DiseaseIndex({ system: systemId }) {
  const system = systemOf(systemId) ?? null;
  const [query, setQuery] = useState('');
  const [az, setAz] = useState(false);
  const [unfold, setUnfold] = useState(null); // null: the default for this view; true/false: expand or collapse all
  const q = query.trim().toLowerCase();
  const inSystem = s => diseases.filter(d => d.systems.includes(s.id));
  const pool = system ? inSystem(system) : diseases;
  const shown = pool.filter(d => d.name.toLowerCase().includes(q));
  const byFinding = q.length >= 3 ? searchable.filter(n => n.name.toLowerCase().includes(q))
    .map(n => ({ n, ds: usersOf(n.id).filter(d => pool.includes(d)) })).filter(x => x.ds.length)
    .sort((a, b) => b.ds.length - a.ds.length).slice(0, 8) : [];
  const pick = (s, n) => (
    <li key={s?.id ?? 'all'}>
      <button aria-pressed={system === s} disabled={!n} onClick={() => go('disease', s ? [s.id] : [])}>
        {s ? s.name : 'All systems'} <span className="muted">{n}</span>
      </button>
    </li>
  );
  return (
    <>
      <h1>{system ? system.name : 'Diseases'}</h1>
      <div className="index">
        <nav className="rail" aria-label="Body systems">
          <ul className="plain">{pick(null, diseases.length)}{syllabus.map(s => pick(s, inSystem(s).length))}</ul>
        </nav>
        <div>
          <div className="index-tools">
            <input type="search" className="big" placeholder={`Find a disease, finding or cause${system ? ` in ${system.name.toLowerCase()}` : ''}`}
              aria-label="Find a disease, finding or cause" value={query} onChange={e => setQuery(e.target.value)} />
            {!az && (
              <div className="segmented" role="group" aria-label="Fold the groups">
                <button aria-pressed={unfold === true} onClick={() => setUnfold(true)}>Expand all</button>
                <button aria-pressed={unfold === false} onClick={() => setUnfold(false)}>Collapse all</button>
              </div>
            )}
            <div className="segmented" role="group" aria-label="Order">
              <button aria-pressed={!az} onClick={() => setAz(false)}>By section</button>
              <button aria-pressed={az} onClick={() => setAz(true)}>A–Z</button>
            </div>
          </div>
          {byFinding.length > 0 && (
            <section className="card by-finding">
              <h2>Diseases with a matching finding or cause</h2>
              <ul className="plain">
                {byFinding.map(({ n, ds }) => (
                  <li key={n.id}><NodeLink id={n.id} />{' '}
                    {ds.slice(0, 8).map(d => <a key={d.id} className="inline-disease" href={`#/disease/${d.id}`}>{d.name}</a>)}
                    {ds.length > 8 && <a className="muted" href={`#/explore/${n.id}`}> and {ds.length - 8} more</a>}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {!system && !q && !az ? (
            // Everything: one fold per body system (diseases under their home system), each holding its groups.
            <div className="system-folds">
              {syllabus.map(sys => {
                const own = diseases.filter(d => d.systems[0] === sys.id);
                return own.length > 0 && (
                  <details key={`${sys.id}-${unfold}`} className="fold system-fold" open={unfold ?? false}>
                    <summary><span className="fold-name">{sys.name}</span> <span className="muted">{own.length}</span></summary>
                    <DiseaseList only={own} />
                  </details>
                );
              })}
            </div>
          ) : shown.length ? <DiseaseList only={shown} az={az} open={q ? true : unfold ?? true} />
            : !byFinding.length && <p className="muted">Nothing matches "{query}"{system && ' in this system'}. Try part of a name, such as "stenosis", or a finding, such as "haemoptysis".</p>}
        </div>
      </div>
    </>
  );
}

const Note = ({ e }) => (e.note || e.source || e.only) && (
  <span className="note">{e.only && <em>{byId[e.only].name} only. </em>}{e.note}{e.source && <span className="muted"> ({e.source})</span>}</span>
);

const CATEGORY_ORDER = ['symptom', 'sign', 'lab', 'ECG', 'imaging', 'endoscopy', 'histology'];
const CATEGORY_NAME = { symptom: 'Symptoms', sign: 'Signs', lab: 'Labs', ECG: 'ECG', imaging: 'Imaging', endoscopy: 'Endoscopy', histology: 'Histology' };
const SIMILAR_FIRST = 6;

export default function Disease({ id }) {
  const d = byId[id];
  const mine = edges.filter(e => e.disease === id);
  const chain = mine.filter(e => e.kind === 'causal' || e.kind === 'bundled'); // bundled: a member of a declared cause group
  const elements = useMemo(() => toElements(new Set(chain.flatMap(e => [e.from, e.to])), chain), [id]);
  const g = useMemo(() => glance(id), [id]);
  const [step, setStep] = useState(null); // a node on the chain map whose notes are showing
  const [allSimilar, setAllSimilar] = useState(false);
  const shares = useMemo(() => diseases.filter(o => o.id !== id)
    .map(o => ({ o, ...compare([id, o.id]) }))
    .filter(s => s.exact.length || s.related.length)
    .sort((a, b) => b.exact.length - a.exact.length || b.related.length - a.related.length), [id]);

  const home = systemOf(d.systems[0]);
  const siblings = [...new Set(d.parents.flatMap(children))].filter(s => s !== id && byId[s].type === 'disease');
  const inGroup = diseases.filter(x => x.group === d.group);
  const at = inGroup.findIndex(x => x.id === id);
  const prev = inGroup[at - 1], next = inGroup[at + 1];
  const findings = mine.filter(e => e.kind === 'finding');
  const byCategory = CATEGORY_ORDER.map(c => [c, findings.filter(e => byId[e.to].category === c)]).filter(([, es]) => es.length);
  const uncategorised = findings.filter(e => !CATEGORY_ORDER.includes(byId[e.to].category));
  const stepNotes = step ? chain.filter(e => (e.from === step || e.to === step) && (e.note || e.source || e.only)) : [];
  const total = touches[id].length || 1;

  return (
    <>
      <div className="disease-head paper">
        <div className="trail" role="navigation" aria-label="Where this sits">
          <a href={`#/disease/${home.id}`}>{home.name}</a><span aria-hidden="true"> › </span><span>{groupName(d.group)}</span>
          {d.systems.slice(1).map(s => <span key={s} className="also"> also in <a href={`#/disease/${s}`}>{systemOf(s).name}</a></span>)}
        </div>
        <h1>{d.name}{d.status === 'draft' && <span className="badge">draft</span>}</h1>
        {(d.parents.length > 0 || children(id).length > 0) && (
          <p className="kin">
            {d.parents.length > 0 && <>A kind of {d.parents.map(p => <NodeLink key={p} id={p} />)}</>}
            {siblings.length > 0 && <> <span className="muted">alongside</span> {siblings.map(s => <NodeLink key={s} id={s} dashed />)}</>}
            {children(id).length > 0 && <> <span className="muted">Its kinds:</span> {children(id).map(c => <NodeLink key={c} id={c} />)}</>}
          </p>
        )}
        <div className="actions">
          {g.central && <a className="button" href={`#/explore/${g.central}`}>Explore its central mechanism</a>}
          {shares[0] && <a className="button" href={`#/compare/${id},${shares[0].o.id}`}>Compare with {shares[0].o.name}</a>}
        </div>
        <dl className="glance">
          <div><dt>Starts with</dt><dd>{g.roots.length ? g.roots.slice(0, 4).map(r => <NodeLink key={r} id={r} />) : <span className="muted">No chain yet</span>}</dd></div>
          <div><dt>Runs through</dt><dd>{g.central ? <NodeLink id={g.central} /> : <span className="muted">No chain yet</span>}</dd></div>
          <div><dt>Typically shows</dt><dd>{g.classic.length ? g.classic.map(f => <NodeLink key={f} id={f} />) : <span className="muted">None listed</span>}</dd></div>
          <div><dt>Can lead to</dt><dd>{g.outcomes.length ? g.outcomes.map(o => <NodeLink key={o} id={o} />) : <span className="muted">None listed</span>}</dd></div>
        </dl>
      </div>

      <div className="jump" role="navigation" aria-label="On this page">
        <a href="#chain" onClick={e => { e.preventDefault(); document.getElementById('chain')?.scrollIntoView({ behavior: 'smooth' }); }}>Chain</a>
        <a href="#findings" onClick={e => { e.preventDefault(); document.getElementById('findings')?.scrollIntoView({ behavior: 'smooth' }); }}>Findings</a>
        <a href="#outcomes" onClick={e => { e.preventDefault(); document.getElementById('outcomes')?.scrollIntoView({ behavior: 'smooth' }); }}>Outcomes</a>
        <a href="#similar" onClick={e => { e.preventDefault(); document.getElementById('similar')?.scrollIntoView({ behavior: 'smooth' }); }}>Similar diseases</a>
      </div>

      <section id="chain" className="section">
        <h2>Mechanism chain</h2>
        {chain.length ? (
          <div className="chain-view">
            <div>
              <Graph elements={elements} flow selected={id} label={`Causal chain for ${d.name}`}
                onTap={n => n !== id && (byId[n].type === 'disease' ? go('disease', [n]) : n === step ? go('explore', [n]) : setStep(n))} />
              <Legend />
            </div>
            <aside className="card step-notes" aria-live="polite">
              {step ? (
                <>
                  <Excerpt id={step} />
                  <p className="muted">Click it again on the map to open its Explore page.</p>
                  <h3>Notes at this step</h3>
                  {stepNotes.length ? (
                    <ul className="plain">
                      {stepNotes.map(e => <li key={e.from + e.to}><div className="muted">{byId[e.from].name} → {byId[e.to].name}</div><Note e={e} /></li>)}
                    </ul>
                  ) : <p className="muted">No note on the links at this step.</p>}
                </>
              ) : <p className="muted">Click a step on the map to see where else it appears and read the notes on its links.</p>}
              <details>
                <summary>All {chain.filter(e => e.note || e.source || e.only).length} chain notes</summary>
                <ul className="plain">
                  {chain.filter(e => e.note || e.source || e.only).map(e => (
                    <li key={e.from + e.to}><div className="muted">{byId[e.from].name} → {byId[e.to].name}</div><Note e={e} /></li>
                  ))}
                </ul>
              </details>
            </aside>
          </div>
        ) : <p className="muted">No chain yet.</p>}
      </section>

      <div className="cols">
        <section id="findings" className="section">
          <h2>Findings</h2>
          <p className="muted freq-key">Dots show how often: <Dots freq="classic" /> classic · <Dots freq="common" /> common · <Dots freq="occasional" /> occasional · <Dots freq="rare" /> rare</p>
          {[...byCategory, ...(uncategorised.length ? [['other', uncategorised]] : [])].map(([c, es]) => (
            <div key={c}>
              <h3 className="system">{CATEGORY_NAME[c] ?? 'Other'}</h3>
              <ul className="plain">{es.map(e => <li key={e.to}><Dots freq={e.freq} /><NodeLink id={e.to} /><Note e={e} /></li>)}</ul>
            </div>
          ))}
          {!findings.length && <p className="muted">None listed yet.</p>}
        </section>
        <section id="outcomes" className="section">
          <h2>Outcomes</h2>
          <ul className="plain">{mine.filter(e => e.kind === 'outcome').map(e => <li key={e.to}><Dots freq={e.freq} /><NodeLink id={e.to} /><Note e={e} /></li>)}</ul>
          {!mine.some(e => e.kind === 'outcome') && <p className="muted">None listed yet.</p>}
        </section>
      </div>

      <section id="similar" className="section">
        <h2>Similar diseases</h2>
        {shares.length ? (
          <>
            <div className="similar">
              {shares.slice(0, SIMILAR_FIRST).map(({ o, exact, related }) => (
                <article key={o.id} className="card">
                  <a className="similar-name" href={`#/disease/${o.id}`}>{o.name}</a>
                  <div className="overlap" title={`${exact.length} shared, ${related.length} related`}>
                    <span style={{ '--w': `${Math.min(100, (exact.length / total) * 100)}%` }} />
                  </div>
                  <div className="muted">{exact.length} shared{related.length > 0 && `, ${related.length} related`}</div>
                  <div>{exact.slice(0, 4).map(n => <NodeLink key={n} id={n} />)}{exact.length > 4 && <span className="muted"> +{exact.length - 4}</span>}</div>
                  <a href={`#/compare/${id},${o.id}`}>Compare side by side</a>
                </article>
              ))}
            </div>
            {shares.length > SIMILAR_FIRST && (
              <>
                <button onClick={() => setAllSimilar(!allSimilar)}>{allSimilar ? 'Show fewer' : `Show all ${shares.length}`}</button>
                {allSimilar && (
                  <ul className="plain more-similar">
                    {shares.slice(SIMILAR_FIRST).map(({ o, exact, related }) => (
                      <li key={o.id}><NodeLink id={o.id} /> <span className="muted">{exact.length} shared, {related.length} related · </span>
                        <a href={`#/compare/${id},${o.id}`}>compare</a></li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </>
        ) : <p className="muted">Nothing shared yet.</p>}
      </section>

      <div className="disease-foot">
        <p className="muted">Sources: {d.sources.join('; ') || 'none yet'}</p>
        <div className="neighbours" role="navigation" aria-label={`Other diseases in ${groupName(d.group)}`}>
          {prev ? <a href={`#/disease/${prev.id}`}><span className="muted">Previous in {groupName(d.group)}</span>{prev.name}</a> : <span />}
          {next && <a className="next" href={`#/disease/${next.id}`}><span className="muted">Next in {groupName(d.group)}</span>{next.name}</a>}
        </div>
      </div>
    </>
  );
}

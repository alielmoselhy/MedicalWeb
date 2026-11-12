import { useMemo, useState } from 'react';
import { byId, edges, nodes, inUse, touches, diseases, syllabus, profile, toElements } from './graph.js';
import Graph from './Graph.jsx';
import { NodeLink, Legend, go } from './ui.jsx';

// Explore: one cause, mechanism, finding or outcome at a time. Where it comes from across diseases, the general
// mechanisms behind those causes, what it leads to, its family, and the chain that reaches it in each disease.
// Every name is a link, so the page is walked from item to item.
// Map grid: causes in rows above the item, effects in rows below, both in body-system order.
const COLS = 7, COL_W = 190, ROW_H = 70;
const WEB_MAX = 6;    // diseases sent to Visualize at once
// Each disease counts under its home system (its first), so nothing is listed twice.
const homeOf = d => byId[d].systems[0];
const bySystem = (items, diseasesOf) => syllabus.map(s => ({ s, items: items.map(diseasesOf(s.id)).filter(Boolean) })).filter(g => g.items.length);

const explorable = nodes.filter(n => n.type !== 'disease' && inUse.has(n.id));
const diseaseCount = Object.fromEntries(explorable.map(n => [n.id, diseases.filter(d => touches[d.id].includes(n.id)).length]));
const STARTS = ['mechanism', 'finding', 'outcome', 'cause'].map(t => [t,
  explorable.filter(n => n.type === t).sort((a, b) => diseaseCount[b.id] - diseaseCount[a.id]).slice(0, 8)]);

function Search({ autoFocus }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const matches = q ? explorable.filter(n => n.name.toLowerCase().includes(q)).sort((a, b) => diseaseCount[b.id] - diseaseCount[a.id]) : [];
  return (
    <form onSubmit={e => { e.preventDefault(); if (matches[0]) { go('explore', [matches[0].id]); setQuery(''); } }}>
      <input type="search" className="big" autoFocus={autoFocus} placeholder="Find a cause, mechanism, finding or outcome"
        aria-label="Find a cause, mechanism, finding or outcome" value={query} onChange={e => setQuery(e.target.value)} />
      {q && (
        <div className="card picks">
          {matches.slice(0, 15).map(n => <NodeLink key={n.id} id={n.id} onClick={() => setQuery('')} />)}
          {!matches.length && <span className="muted">Nothing matches "{query}".</span>}
          {matches.length > 15 && <span className="muted"> and {matches.length - 15} more; keep typing.</span>}
        </div>
      )}
    </form>
  );
}

// Rows of { id, diseases } grouped by body system, every row shown; within a system, most-shared first.
function Ranked({ rows, empty }) {
  if (!rows.length) return <p className="muted">{empty}</p>;
  const groups = bySystem(rows, sys => r => { const ds = r.diseases.filter(d => homeOf(d) === sys); return ds.length && { id: r.id, diseases: ds }; });
  return <div className="by-system">{groups.map(({ s, items }) => (
    <div key={s.id}>
      <h3 className="system">{s.name}</h3>
      <ul className="plain">
        {items.sort((x, y) => y.diseases.length - x.diseases.length).map(r => (
          <li key={r.id}><NodeLink id={r.id} />{' '}
            <span className="muted">{r.diseases.length > 2 ? `${r.diseases.length} diseases` : r.diseases.map(d => byId[d].name).join(', ')}</span></li>
        ))}
      </ul>
    </div>
  ))}</div>;
}

const Chain = ({ path }) => path.map((n, i) => <span key={n}>{i > 0 && <span className="muted"> → </span>}<NodeLink id={n} /></span>);

function Start() {
  return (
    <>
      <h1>Explore</h1>
      <p className="muted">Pick any cause, mechanism, finding or outcome to see where it comes from, what it leads to, which diseases share it, and what it is a kind of. Every name links on, so you can follow the pathology wherever it goes.</p>
      <Search autoFocus />
      <h2>Good places to start</h2>
      <p className="muted">The most widely shared items of each kind.</p>
      <div className="cols">
        {STARTS.map(([t, ns]) => (
          <section key={t} className="card">
            <h3>{t[0].toUpperCase() + t.slice(1)}s</h3>
            <ul className="plain">{ns.map(n => <li key={n.id}><NodeLink id={n.id} /> <span className="muted">{diseaseCount[n.id]} diseases</span></li>)}</ul>
          </section>
        ))}
      </div>
    </>
  );
}

export default function Explore({ id }) {
  const p = useMemo(() => id && byId[id]?.type !== 'disease' && profile(id), [id]);
  if (!p) return <Start />;
  const n = byId[id];
  const reached = p.diseases.filter(d => d.path);

  // The map: the item, its most-shared causes and effects, and its family.
  const own = p.opposites.find(o => !o.via)?.ids ?? [];
  const shown = new Set([id, ...p.from.map(r => r.id), ...p.to.map(r => r.id), ...p.parents, ...p.kinds, ...own]);
  // Placed by hand, after a throwaway grid layout: a preset layout skips measuring label-sized boxes, and Cytoscape
  // then caches them as 0×0 and hidden.
  const positions = { [id]: { x: 0, y: 0 } };
  // Rows of ids in body-system order, centred and stacked away from the item (dir -1 above, +1 below); every other
  // row shifts half a column so lines from far rows pass between the boxes of near ones.
  const stack = (rows, dir) => {
    const order = [...new Set(bySystem(rows, sys => r => p.diseasesOf(r.id).some(d => homeOf(d) === sys) && r.id).flatMap(g => g.items))]
      .filter(x => !positions[x]);
    order.forEach((x, i) => {
      const r = Math.floor(i / COLS), inRow = Math.min(COLS, order.length - r * COLS), c = i % COLS;
      positions[x] = { x: (c - (inRow - 1) / 2 + (r % 2) / 2) * COL_W, y: dir * (r + 1.4) * ROW_H };
    });
  };
  stack(p.from, -1);
  stack(p.to, 1);
  p.parents.filter(x => !positions[x]).forEach((x, i) => { positions[x] = { x: -(i + 1.4) * COL_W, y: 0 }; });
  [...p.kinds, ...own].filter(x => !positions[x]).forEach((x, i) => { positions[x] = { x: (i + 1.4) * COL_W, y: 0 }; });
  const mapEdges = edges.filter(e => shown.has(e.from) && shown.has(e.to) && (e.from === id || e.to === id) && ['causal', 'is-a', 'opposite'].includes(e.kind));
  const elements = toElements(shown, mapEdges);

  return (
    <>
      <Search />
      <h1>{n.name}</h1>
      <p>
        <span className={`chip ${n.type}`}>{n.type}{n.category && `, ${n.category}`}</span>{' '}
        <span className="muted">in {p.diseases.length} {p.diseases.length === 1 ? 'disease' : 'diseases'}
          {p.from.length > 0 && `, reached from ${p.from.length} ${p.from.length === 1 ? 'cause' : 'causes'}`}
          {p.to.length > 0 && `, leading to ${p.to.length} ${p.to.length === 1 ? 'thing' : 'things'}`}</span>
        {reached.length > 0 && <>{' '}<button onClick={() => go('visualize', reached.slice(0, WEB_MAX).map(d => d.id))}>
          See {reached.length > WEB_MAX ? `the first ${WEB_MAX} of its diseases` : reached.length === 1 ? 'its disease' : `its ${reached.length} diseases`} as a web</button></>}
      </p>
      {shown.size > 1 && <div className="explore-map"><Graph key={id} elements={elements} flow layout={{ name: 'grid', fit: false, stop: e => { e.cy.nodes().positions(x => positions[x.id()]); e.cy.fit(undefined, 30); } }} selected={id} label={`${n.name} and its neighbours`}
        onTap={t => go(byId[t].type === 'disease' ? 'disease' : 'explore', [t])} /></div>}
      {shown.size > 1 && <Legend />}

      <section className="card wide">
        <h2>What leads to it</h2>
        <Ranked rows={p.from} empty="Nothing in the chains leads to it: it is where chains start, or it is only listed on disease pages." />
      </section>
      <section className="card wide">
        <h2>What it leads to</h2>
        <Ranked rows={p.to} empty="Nothing further in the chains: it is an end point." />
      </section>
      <div className="cols">
        {p.general.length > 0 && (
          <section className="card">
            <h2>General mechanisms behind it</h2>
            <p className="muted">Broader processes that several of its causes are kinds of.</p>
            <ul className="plain">
              {p.general.map(g => (
                <li key={g.id}><NodeLink id={g.id} /> <span className="muted">covers {g.via.length} of its causes, in {g.diseases.length} diseases:</span>{' '}
                  {g.via.map(v => <NodeLink key={v} id={v} />)}</li>
              ))}
            </ul>
          </section>
        )}
        {p.opposites.length > 0 && (
          <section className="card">
            <h2>Works against</h2>
            {p.opposites.map(o => (
              <p key={o.via ?? 'own'}>{o.ids.map(x => <NodeLink key={x} id={x} />)}
                {o.via && <span className="muted"> (as a kind of <NodeLink id={o.via} />)</span>}</p>
            ))}
          </section>
        )}
        <section className="card">
          <h2>Its family</h2>
          {p.parents.length > 0 && <p>A kind of: {p.parents.map(x => <NodeLink key={x} id={x} />)}</p>}
          {p.kinds.length > 0 && <p>Its kinds: {p.kinds.map(x => <NodeLink key={x} id={x} />)}</p>}
          {p.siblings.length > 0 && <p>Same family: {p.siblings.map(x => <NodeLink key={x} id={x} dashed />)}</p>}
          {!p.parents.length && !p.kinds.length && <p className="muted">Not grouped with anything yet.</p>}
        </section>
      </div>

      <h2>Diseases it appears in</h2>
      {bySystem(p.diseases, sys => d => homeOf(d.id) === sys && d).map(({ s: sys, items }) => (
        <div key={sys.id}>
          <h3 className="system">{sys.name}</h3>
          <ul className="plain">
            {items.map(d => (
              <li key={d.id}>
                <NodeLink id={d.id} />{d.freq && <span className="muted"> {d.freq}</span>}
                <div className="muted">{d.path ? <Chain path={d.path} /> : 'Listed on the disease page; no chain link reaches it.'}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {p.throughKinds.length > 0 && (
        <>
          <h2>Diseases with one of its kinds</h2>
          <ul className="plain">
            {p.throughKinds.map(d => <li key={d.id}><NodeLink id={d.id} /> <span className="muted">through</span> {d.kinds.map(k => <NodeLink key={k} id={k} />)}</li>)}
          </ul>
        </>
      )}
    </>
  );
}

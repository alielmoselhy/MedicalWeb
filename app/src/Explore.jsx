import { useMemo, useState } from 'react';
import { byId, edges, nodes, inUse, touches, diseases, syllabus, profile, toElements } from './graph.js';
import Graph from './Graph.jsx';
import { NodeLink, Legend, go } from './ui.jsx';

// Explore: one cause, mechanism, finding or outcome at a time. Where it comes from across diseases, the general
// mechanisms behind those causes, what it leads to, its family, and the chain that reaches it in each disease.
// Every name is a link, so the page is walked from item to item.
// Map grid: causes in rows above the item, effects in rows below, both in body-system order.
const COLS = 7, COL_W = 190, ROW_H = 70;
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
  // Diseases first (they open their own page), then items, most shared first.
  const matches = q ? [...diseases.filter(d => d.name.toLowerCase().includes(q)),
    ...explorable.filter(n => n.name.toLowerCase().includes(q)).sort((a, b) => diseaseCount[b.id] - diseaseCount[a.id])] : [];
  return (
    <form onSubmit={e => { e.preventDefault(); if (matches[0]) { go(matches[0].type === 'disease' ? 'disease' : 'explore', [matches[0].id]); setQuery(''); } }}>
      <input type="search" className="big" autoFocus={autoFocus} placeholder="Find a disease, cause, mechanism, finding or outcome"
        aria-label="Find a disease, cause, mechanism, finding or outcome" value={query} onChange={e => setQuery(e.target.value)} />
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

// One folded section of the side panel; the count shows what's inside before opening it.
const Fold = ({ title, count, children }) => (
  <details className={`side-fold${count ? '' : ' empty'}`}>
    <summary><span>{title}</span><span className="count">{count}</span></summary>
    <div className="side-fold-body">{children}</div>
  </details>
);

// Its family, above the map: what it is a kind of, its own kinds, and others of the same kind.
const Family = ({ parents, kinds, siblings }) => (parents.length > 0 || kinds.length > 0 || siblings.length > 0) && (
  <div className="explore-family">
    {parents.length > 0 && <div><span className="explore-family-label">A kind of</span>{parents.map(x => <NodeLink key={x} id={x} />)}</div>}
    {kinds.length > 0 && <div><span className="explore-family-label">Its kinds</span>{kinds.map(x => <NodeLink key={x} id={x} />)}</div>}
    {siblings.length > 0 && <div><span className="explore-family-label">Same family</span>{siblings.map(x => <NodeLink key={x} id={x} dashed />)}</div>}
  </div>
);

const Chain = ({ path }) => path.map((n, i) => <span key={n}>{i > 0 && <span className="muted"> → </span>}<NodeLink id={n} /></span>);

function Start() {
  return (
    <>
      <h1>Explore</h1>
      <p className="muted">Search for a disease to open its page, or pick any cause, mechanism, finding or outcome to see where it comes from, what it leads to, which diseases share it, and what it is a kind of. Every name links on, so you can follow the pathology wherever it goes.</p>
      <Search autoFocus />
      <p className="muted">The most widely shared items of each kind; bars show how many diseases share each one.</p>
      <div className="cols">
        {STARTS.map(([t, ns]) => (
          <section key={t} className="start-card" style={{ '--c': `var(--${t})` }}>
            <h3><span className={`chip ${t}`} aria-hidden="true" />{t[0].toUpperCase() + t.slice(1)}s</h3>
            <ul className="atlas-bars">
              {ns.map(n => (
                <li key={n.id}>
                  <a href={`#/explore/${n.id}`}>{n.name}</a>
                  <span className="atlas-bar" style={{ '--w': `${(diseaseCount[n.id] / diseaseCount[ns[0].id]) * 100}%` }} />
                  <span className="muted" title="diseases">{diseaseCount[n.id]}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

// A big neighbourhood fits at a scale too small to read; open close up on the item instead, the rest a pan or scroll away.
const READABLE = 0.9;
const zoomIn = cy => {
  if (cy.zoom() >= READABLE) return;
  const near = cy.nodes().filter(n => Math.abs(n.position('y')) <= 2.5 * ROW_H); // the item and the first two rows each side
  cy.fit(near, 30);
  if (cy.zoom() < READABLE) { cy.zoom(READABLE); cy.center(near); }
};

function ItemPage({ id }) {
  const p = useMemo(() => profile(id), [id]);
  const n = byId[id];

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
    <div className="explore-page" style={{ '--c': `var(--${n.type})` }}>
      <Search />
      <h1>{n.name}</h1>
      <p>
        <span className={`chip ${n.type}`}>{n.type}{n.category && `, ${n.category}`}</span>{' '}
        <span className="muted">in {p.diseases.length} {p.diseases.length === 1 ? 'disease' : 'diseases'}
          {p.from.length > 0 && `, reached from ${p.from.length} ${p.from.length === 1 ? 'cause' : 'causes'}`}
          {p.to.length > 0 && `, leading to ${p.to.length} ${p.to.length === 1 ? 'thing' : 'things'}`}</span>
      </p>
      <div className="explore-layout">
        <div className="explore-main">
          <Family parents={p.parents} kinds={p.kinds} siblings={p.siblings} />
          {shown.size > 1 && <div className="explore-map"><Graph key={id} elements={elements} flow layout={{ name: 'grid', fit: false, stop: e => { e.cy.nodes().positions(x => positions[x.id()]); e.cy.fit(undefined, 30); zoomIn(e.cy); } }} selected={id} label={`${n.name} and its neighbours`}
            onTap={t => go(byId[t].type === 'disease' ? 'disease' : 'explore', [t])} /></div>}
          {shown.size > 1 && <Legend />}
        </div>
        {/* The details, folded: each section opens on its own, so the map stays in view beside them. */}
        <aside className="explore-side" aria-label={`About ${n.name}`}>
          <Fold title="What leads to it" count={p.from.length}>
            <Ranked rows={p.from} empty="Nothing in the chains leads to it: it is where chains start, or it is only listed on disease pages." />
          </Fold>
          <Fold title="What it leads to" count={p.to.length}>
            <Ranked rows={p.to} empty="Nothing further in the chains: it is an end point." />
          </Fold>
          {p.general.length > 0 && (
            <Fold title="Broad mechanisms behind it" count={p.general.length}>
              <p className="muted">Broader processes that several of its causes are kinds of.</p>
              <ul className="plain">
                {p.general.map(g => (
                  <li key={g.id}><NodeLink id={g.id} /> <span className="muted">covers {g.via.length} of its causes, in {g.diseases.length} diseases:</span>{' '}
                    {g.via.map(v => <NodeLink key={v} id={v} />)}</li>
                ))}
              </ul>
            </Fold>
          )}
          {p.opposites.length > 0 && (
            <Fold title="Works against" count={p.opposites.reduce((t, o) => t + o.ids.length, 0)}>
              {p.opposites.map(o => (
                <p key={o.via ?? 'own'}>{o.ids.map(x => <NodeLink key={x} id={x} />)}
                  {o.via && <span className="muted"> (as a kind of <NodeLink id={o.via} />)</span>}</p>
              ))}
            </Fold>
          )}
          <Fold title="Diseases" count={p.diseases.length + p.throughKinds.length}>
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
                <h3 className="system">Through one of its kinds</h3>
                <ul className="plain">
                  {p.throughKinds.map(d => <li key={d.id}><NodeLink id={d.id} /> <span className="muted">through</span> {d.kinds.map(k => <NodeLink key={k} id={k} />)}</li>)}
                </ul>
              </>
            )}
          </Fold>
        </aside>
      </div>
    </div>
  );
}

// A quick look at an item while hovering (or focusing) its name: what it is, and its most-shared links each way.
const peeks = new Map();
const peekOf = id => peeks.get(id) ?? peeks.set(id, profile(id)).get(id);

// A short excerpt of an item's Explore page: what it is, and its most-shared links each way.
export function Excerpt({ id, brief }) {
  const n = byId[id], p = peekOf(id);
  const row = (title, list) => list.length > 0 && (
    <div className="excerpt-row"><span className="muted">{title}</span> {list.slice(0, 3).map(r => <NodeLink key={r.id} id={r.id} />)}{list.length > 3 && <span className="muted">+{list.length - 3}</span>}</div>
  );
  return (
    <div className="excerpt">
      <strong>{n.name}</strong>
      <div className="muted">{n.type[0].toUpperCase() + n.type.slice(1)}{p.parents.length > 0 && `, a kind of ${p.parents.map(x => byId[x].name).join(', ')}`} · in {diseaseCount[id] ?? 0} diseases</div>
      {!brief && row('From', p.from)}
      {!brief && row('Leads to', p.to)}
      {!brief && !p.from.length && !p.to.length && <div className="muted">No chain links yet.</div>}
    </div>
  );
}

// The excerpt while hovering (or focusing) a name.
const Peek = ({ peek }) => peek && (
  <div className="peek" role="tooltip" style={peek.up ? { left: Math.min(peek.x, window.innerWidth - 300), top: peek.up, transform: 'translateY(-100%)', animation: 'none' } : { left: Math.min(peek.x, window.innerWidth - 300), top: peek.y }}>
    <Excerpt id={peek.id} />
  </div>
);

export default function Explore({ id }) {
  const [peek, setPeek] = useState(null);
  const onPeek = e => {
    const a = e.target.closest?.('a[href^="#/explore/"]');
    const pid = a && decodeURIComponent(a.getAttribute('href').slice('#/explore/'.length));
    if (!byId[pid]) return setPeek(null);
    const r = a.getBoundingClientRect();
    setPeek({ id: pid, x: r.left, y: r.bottom + 6, up: r.bottom > window.innerHeight - 180 && r.top - 6 });
  };
  // Peeks only on the Explore home page; item pages already show the links in full.
  if (byId[id]) return <div className="explore-root"><ItemPage id={id} /></div>;
  return (
    <div className="explore-root" onMouseOver={onPeek} onFocus={onPeek} onMouseLeave={() => setPeek(null)} onBlur={() => setPeek(null)}>
      <Start />
      <Peek peek={peek} />
    </div>
  );
}

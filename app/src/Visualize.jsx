import { useMemo, useState } from 'react';
import { edges, byId, diseases, nodes, inUse, touches, syllabus, glance, toElements } from './graph.js';
import Web from './Web.jsx';
import { go } from './ui.jsx';
import { Excerpt } from './Explore.jsx';
import { LINKS, parseWeb, webQuery, options } from './growth.js';

// Visualize: grow a web one step at a time. Click a node to see faint options around it (what leads to it, what it
// leads to, what it is a kind of, its kinds), click an option to add it. Links to anything already on the web are
// drawn as soon as both ends are there. The whole web, the trail and the settings live in the address.
const SHOWN = 6; // options drawn on the web per direction; the panel lists the rest
const allLinks = edges.filter(e => LINKS.includes(e.kind));
const isa = edges.filter(e => e.kind === 'is-a');
const chainOf = Object.fromEntries(diseases.map(d => [d.id, new Set(allLinks.filter(e => e.disease === d.id).flatMap(e => [e.from, e.to]))]));
// Diseases are searchable only if they have a chain to start from.
const findable = [...diseases.filter(d => chainOf[d.id].size), ...nodes.filter(n => n.type !== 'disease' && inUse.has(n.id))];
const DIRS = [['from', 'What leads to it'], ['to', 'What it leads to'], ['parents', 'A kind of'], ['kinds', 'Its kinds']];

// Saved webs are kept in this browser only.
const SAVED = 'medicalweb:webs';
const loadSaved = () => { try { return JSON.parse(localStorage.getItem(SAVED)) ?? []; } catch { return []; } };
const storeSaved = list => { try { localStorage.setItem(SAVED, JSON.stringify(list)); } catch { /* private window: the address still holds the web */ } };

export default function Visualize({ raw }) {
  const web = parseWeb(raw);
  const { m, s, l } = web;
  const steps = web.steps.map(st => st.filter(id => byId[id])).filter(st => st.length);
  const set = change => { const q = webQuery({ ...web, steps, ...change }); go('visualize', q === '?' ? [] : [q]); };
  const onWeb = [...new Set(steps.flat())];
  const onWebSet = new Set(onWeb);
  const add = ids => ids.length && set({ steps: [...steps, ids] });
  const remove = id => set({ steps: steps.map(st => st.filter(x => x !== id)).filter(st => st.length) });

  const [picked, setPicked] = useState(null);
  const selected = onWebSet.has(picked) ? picked : null;
  const [more, setMore] = useState([]); // directions listed in full
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(loadSaved);
  const [name, setName] = useState('');

  // What is being followed: one disease's chain, one body system's diseases, or every disease.
  const scope = m && byId[m] ? [m] : s ? diseases.filter(d => d.systems.includes(s)).map(d => d.id) : null;
  const links = useMemo(() => (scope ? allLinks.filter(e => scope.includes(e.disease)) : allLinks), [m, s]);
  const scopeNodes = useMemo(() => scope && new Set(scope.flatMap(d => touches[d]).flatMap(n => [n, ...byId[n].parents])), [m, s]);
  const okNode = id => inUse.has(id) && (!scopeNodes || scopeNodes.has(id));
  const count = id => (scope ?? diseases.map(d => d.id)).filter(d => touches[d].includes(id)).length;

  const opts = useMemo(() => {
    if (!selected) return null;
    const o = options(selected, links, isa);
    return { ...o, parents: o.parents.filter(x => okNode(x.id)).map(x => ({ ...x, n: count(x.id) })),
      kinds: o.kinds.filter(x => okNode(x.id)).map(x => ({ ...x, n: count(x.id) })) };
  }, [selected, links]);
  const ghosts = opts ? [...new Set(DIRS.flatMap(([k]) => opts[k].filter(o => !onWebSet.has(o.id)).slice(0, SHOWN).map(o => o.id)))] : [];

  const key = onWeb.join();
  const elements = useMemo(() => {
    const ghostSet = new Set(ghosts), shown = new Set([...onWeb, ...ghosts]);
    // Lines between nodes on the web, plus the selected node's lines to its options.
    const es = [...links, ...isa].filter(e => shown.has(e.from) && shown.has(e.to)
      && ((onWebSet.has(e.from) && onWebSet.has(e.to)) || e.from === selected || e.to === selected));
    return toElements(shown, es).map(el => ((el.data.source ? ghostSet.has(el.data.source) || ghostSet.has(el.data.target) : ghostSet.has(el.data.id))
      ? { ...el, classes: 'ghost' } : el));
  }, [key, selected, links, ghosts.join()]);

  // The lens: one disease's path through what is on the web.
  const here = useMemo(() => diseases.map(d => ({ id: d.id, n: onWeb.filter(x => chainOf[d.id].has(x)).length }))
    .filter(x => x.n).sort((a, b) => b.n - a.n), [key]);
  const highlight = useMemo(() => (l && chainOf[l] ? onWeb.filter(x => chainOf[l].has(x)) : []), [key, l]);

  const q = query.trim().toLowerCase();
  const matches = q ? findable.filter(n => n.name.toLowerCase().includes(q)).slice(0, 12) : [];
  // A disease starts from the roots of its chain, and the web follows that chain.
  const start = n => {
    setQuery('');
    if (n.type === 'disease') set({ steps: [...steps, glance(n.id).roots.filter(r => !onWebSet.has(r))], m: n.id, s: '' });
    else { if (!onWebSet.has(n.id)) add([n.id]); setPicked(n.id); }
  };
  const save = e => {
    e.preventDefault();
    const nm = name.trim() || onWeb.slice(0, 2).map(id => byId[id].name).join(', ');
    const list = [{ name: nm, raw: webQuery({ ...web, steps }) }, ...saved.filter(x => x.name !== nm)];
    storeSaved(list); setSaved(list); setName('');
  };
  const forget = nm => { const list = saved.filter(x => x.name !== nm); storeSaved(list); setSaved(list); };

  return (
    <>
      <form className="controls" onSubmit={e => { e.preventDefault(); if (matches[0]) start(matches[0]); }}>
        <input type="search" className="big" placeholder={onWeb.length ? 'Add another starting point' : 'Start from a disease, cause, mechanism, finding or outcome'}
          aria-label="Start from" value={query} onChange={e => setQuery(e.target.value)} />
        <div className="segmented" role="group" aria-label="What to follow">
          <button type="button" aria-pressed={!m} onClick={() => set({ m: '' })}>All diseases</button>
          <button type="button" aria-pressed={!!m} onClick={() => !m && set({ m: here[0]?.id ?? diseases[0].id, s: '' })}>One disease's chain</button>
        </div>
        {m ? (
          <select aria-label="Disease to follow" value={m} onChange={e => set({ m: e.target.value })}>
            {here.length > 0 && <optgroup label="On this web">{here.map(d => <option key={d.id} value={d.id}>{byId[d.id].name}</option>)}</optgroup>}
            <optgroup label="All diseases">{diseases.filter(d => !here.some(h => h.id === d.id)).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</optgroup>
          </select>
        ) : (
          <select aria-label="Body system to follow" value={s} onChange={e => set({ s: e.target.value })}>
            <option value="">Every body system</option>
            {syllabus.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        )}
      </form>
      {matches.length > 0 && (
        <div className="card picks">
          {matches.map(n => <button key={n.id} className={`chip ${n.type}`} onClick={() => start(n)}>{n.name}</button>)}
        </div>
      )}
      <div className="explore">
        <Web elements={elements} highlight={highlight} selected={selected} label="Your web"
          empty={!onWeb.length && 'Search above for somewhere to start. Click a node to see faint options for where it could go next, then click an option to add it. Links to anything already on the web appear by themselves.'}
          onTap={id => (ghosts.includes(id) ? add([id]) : setPicked(id === selected ? null : id))} />
        <aside className="card web-panel">
          {selected ? (
            <>
              <Excerpt id={selected} brief />
              <p><a href={`#/explore/${selected}`}>Open in Explore</a>{' '}<button onClick={() => remove(selected)}>Remove from the web</button></p>
              {DIRS.map(([k, title]) => {
                const list = opts[k], missing = list.filter(o => !onWebSet.has(o.id)).map(o => o.id);
                return list.length > 0 && (
                  <section key={k}>
                    <h3 className="system">{title} <span className="muted">{list.length}</span></h3>
                    <div>
                      {(more.includes(k) ? list : list.slice(0, SHOWN)).map(o => (onWebSet.has(o.id)
                        ? <span key={o.id} className={`chip ${byId[o.id].type} on-web`} title="On the web">{byId[o.id].name}</span>
                        : <button key={o.id} className={`chip ${byId[o.id].type}`} onClick={() => add([o.id])}>
                          {byId[o.id].name} <span className="muted" title="diseases">{o.n}</span></button>))}
                    </div>
                    <p>
                      {list.length > SHOWN && !more.includes(k) && <button onClick={() => setMore([...more, k])}>Show all {list.length}</button>}{' '}
                      {missing.length > 1 && <button onClick={() => add(missing)}>Add all {missing.length}</button>}
                    </p>
                  </section>
                );
              })}
              {DIRS.every(([k]) => !opts[k].length) && <p className="muted">Nothing links here in what you are following.</p>}
            </>
          ) : onWeb.length > 0 && <p className="muted">Click a node to see where it could go next.</p>}

          {steps.length > 0 && (
            <>
              <h2>Trail</h2>
              <ol className="web-trail">
                {steps.map((st, i) => (
                  <li key={i}>{st.map(id => (
                    <button key={id} className={`chip ${byId[id].type}`} aria-pressed={selected === id} onClick={() => setPicked(id)}>{byId[id].name}</button>
                  ))}</li>
                ))}
              </ol>
              <p>
                <button onClick={() => set({ steps: steps.slice(0, -1) })}>Undo last step</button>{' '}
                <button onClick={() => { set({ steps: [], l: '' }); setPicked(null); }}>Clear the web</button>
              </p>
            </>
          )}

          {here.length > 0 && (
            <>
              <h2>Light up a disease</h2>
              <ul className="plain web-list">
                {(more.includes('lens') ? here : here.slice(0, 8)).map(d => (
                  <li key={d.id}>
                    <button className="chip disease" aria-pressed={l === d.id} onClick={() => set({ l: l === d.id ? '' : d.id })}>{byId[d.id].name}</button>
                    <span className="muted">{d.n} of {onWeb.length}</span>
                  </li>
                ))}
              </ul>
              {here.length > 8 && !more.includes('lens') && <button onClick={() => setMore([...more, 'lens'])}>Show all {here.length}</button>}
            </>
          )}

          <h2>Saved webs</h2>
          {onWeb.length > 0 && (
            <form className="web-save" onSubmit={save}>
              <input type="text" aria-label="Name for this web" placeholder="Name this web" value={name} onChange={e => setName(e.target.value)} />
              <button>Save</button>
            </form>
          )}
          <ul className="plain web-list">
            {saved.map(x => (
              <li key={x.name}><a href={`#/visualize/${x.raw}`}>{x.name}</a> <button onClick={() => forget(x.name)} aria-label={`Forget ${x.name}`}>Forget</button></li>
            ))}
            {!saved.length && <li className="muted">None yet. Saved webs stay in this browser; the address also holds the whole web, so you can bookmark or share it.</li>}
          </ul>
        </aside>
      </div>
    </>
  );
}

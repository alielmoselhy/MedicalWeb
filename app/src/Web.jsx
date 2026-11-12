import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { stylesheet, useFontsReady } from './Graph.jsx'; // also registers the dagre and bubblesets plugins

cytoscape.use(cola);
const v = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// The layout is WebCola (constraint-based force layout): links are springs, bubbles and their labels never overlap,
// and each cause is kept at least GAP above what it causes. That is a minimum, not a row, so the web flows freely.
const LINK_LEN = 80;  // causal link length; is-a links are looser
const GAP = 70;       // a cause sits at least this far above what it causes
const STEP = 110;     // how far from its neighbour a new bubble starts
const DEPTH_GAP = 90; // where a bubble with no neighbour on the web starts, by its causal depth
const MIN_ZOOM = 0.5; // below this labels are unreadable; pan to see the rest
const READABLE = 0.85; // the camera never zooms out past this to show something new
const PAD = 60;
const COLA = { name: 'cola', nodeDimensionsIncludeLabels: true, avoidOverlap: true, nodeSpacing: () => 8, fit: false,
  centerGraph: false, handleDisconnected: true, maxSimulationTime: 3000,
  // Cola's staged start: untangle freely first, then add the causal order, then the no-overlap rule.
  unconstrIter: 60, userConstIter: 30, allConstIter: 40,
  edgeLength: e => (e.data('kind') === 'is-a' ? 130 : LINK_LEN) };

// Causal depth: the number of causal steps on the longest chain above each bubble.
export function depths(ids, links) {
  const has = new Set(ids), d = Object.fromEntries(ids.map(id => [id, 0]));
  const causal = links.filter(l => l.kind !== 'is-a' && has.has(l.source) && has.has(l.target));
  // Bounded passes, so a causal loop can't run forever; it just ends up deep.
  for (let pass = 0, moved = true; moved && pass < 40; pass++) {
    moved = false;
    for (const l of causal) if (d[l.target] < d[l.source] + 1) { d[l.target] = d[l.source] + 1; moved = true; }
  }
  return d;
}

// A live bubble network, first laid out by WebCola. Bubbles already on the web hold still while new ones are slotted in
// beside them. Dragging wakes the layout, so neighbours make room and settle; a dropped bubble stays where it was dropped.
// Elements with the class "ghost" are drawn faint and dashed: options the page offers, not yet part of the web.
export default function Web({ elements, highlight, selected, onTap, label, empty }) {
  const ref = useRef();
  const st = useRef({}); // cy, run (starts a cola layout), gaps (the causal order constraints), placed
  const props = useRef();
  props.current = { onTap, highlight };
  const fontsReady = useFontsReady();

  // Light up the hovered node's neighbours, or else the highlight list.
  const paint = hovered => {
    const { cy } = st.current;
    const els = cy.elements();
    els.removeClass('dim hl');
    const ids = props.current.highlight;
    if (!hovered && !ids.length) return;
    let lit = hovered ? hovered.closedNeighborhood() : cy.nodes().filter(n => ids.includes(n.id()));
    if (!hovered) lit = lit.union(lit.edgesWith(lit));
    els.addClass('dim');
    lit.removeClass('dim').addClass('hl');
  };

  useEffect(() => {
    if (!fontsReady) return;
    const cy = cytoscape({ container: ref.current, style: [...stylesheet(false),
      // Bigger labels than the small graphs, still drawn when zoomed out to see a whole web.
      { selector: 'node', style: { 'font-size': 12, 'text-max-width': 110, 'min-zoomed-font-size': 5 } },
      { selector: '.ghost', style: { opacity: 0.45 } },
      { selector: 'node.ghost', style: { 'border-width': 2, 'border-color': v('--glyph'), 'background-opacity': 0.5 } },
      { selector: 'edge.ghost', style: { 'line-style': 'dashed', 'line-dash-pattern': [4, 4] } },
      { selector: '.ghost.hl', style: { opacity: 0.8 } },
      { selector: 'edge.flowing', style: { 'line-style': 'dashed', 'line-dash-pattern': [10, 8], width: 1.6 } }], minZoom: 0.15, maxZoom: 3 });
    let layout = null;
    const run = (opts, done) => {
      layout?.stop();
      layout = cy.elements().layout({ ...COLA, gapInequalities: st.current.gaps, ...opts });
      if (done) layout.one('layoutstop', done);
      layout.run();
    };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let flowTimer = null, flowOffset = 0, flowing = cy.collection();
    const stopFlow = () => {
      if (flowTimer !== null) clearInterval(flowTimer);
      flowTimer = null;
      flowing.removeClass('flowing').style('line-dash-offset', 0);
      flowing = cy.collection();
    };
    const startFlow = collection => {
      stopFlow();
      flowing = collection.filter('[kind = "causal"]').not('.ghost');
      if (!flowing.length || reducedMotion.matches) return;
      flowing.addClass('flowing');
      flowTimer = setInterval(() => {
        flowOffset = (flowOffset - 1) % 18;
        flowing.style('line-dash-offset', flowOffset);
      }, 100);
    };
    st.current = { cy, run, stopFlow };

    // Grabbing a bubble starts a never-ending cola run, so neighbours make room as it moves. Cola only learns of a
    // grab that happens while it runs, so the grab is replayed once it has started. On drop the bubble is locked
    // (cola treats locked as fixed) while the rest settle round it, then stopped and unlocked: it stays put.
    let replaying = false, settle = 0;
    cy.on('grab', 'node', e => {
      if (replaying || reduced()) return;
      clearTimeout(settle);
      cy.nodes(':locked').unlock();
      run({ infinite: true });
      replaying = true; e.target.emit('grab'); replaying = false;
    });
    cy.on('free', 'node', e => {
      if (reduced()) return;
      e.target.lock();
      settle = setTimeout(() => { layout?.stop(); e.target.unlock(); }, 1500);
    });
    cy.on('tap', 'node', e => props.current.onTap(e.target.id()));
    cy.on('mouseover', 'node', e => { paint(e.target); startFlow(e.target.connectedEdges()); });
    cy.on('mouseout', 'node', () => { stopFlow(); paint(); });
    cy.on('mouseover', 'edge[kind="causal"]', e => startFlow(e.target));
    cy.on('mouseout', 'edge[kind="causal"]', () => stopFlow());
    return () => { stopFlow(); clearTimeout(settle); layout?.stop(); cy.destroy(); };
  }, [fontsReady]);

  // The web changed: a first web is laid out; after that new bubbles take free room beside a neighbour and nothing else moves.
  useEffect(() => {
    if (!fontsReady) return;
    const { cy, run } = st.current;
    st.current.stopFlow();
    const want = new Set(elements.map(el => el.data.id));
    cy.remove(cy.elements().filter(el => !want.has(el.id())));
    cy.add(elements.filter(el => cy.getElementById(el.data.id).empty()));
    elements.forEach(el => cy.getElementById(el.data.id).classes(el.classes ?? ''));

    const nodes = cy.nodes().map(n => n.id());
    const links = elements.filter(el => el.data.source).map(el => ({ source: el.data.source, target: el.data.target, kind: el.data.kind }));
    const placed = st.current.placed ??= new Set();
    [...placed].filter(id => !want.has(id)).forEach(id => placed.delete(id));
    const first = !placed.size;
    const fresh = nodes.filter(id => !placed.has(id));
    const depth = depths(nodes, links);
    // Causal order as constraints: a cause at least GAP above its effect. Links that loop back are left free.
    st.current.gaps = links.filter(l => l.kind !== 'is-a' && depth[l.target] > depth[l.source])
      .map(l => ({ axis: 'y', left: cy.$id(l.source), right: cy.$id(l.target), gap: GAP }));
    // A first web is laid out by cola. After that nothing already placed moves: each new bubble takes the first free
    // slot in a row above its neighbour (a cause, or for is-a, child → parent, the parent) or below it (an effect),
    // spreading outwards from the middle and on to the next row out when a row is full.
    const boxes = first ? [] : cy.nodes().filter(n => placed.has(n.id())).map(n => n.boundingBox({ includeLabels: true }));
    const clear = (a, b) => a.x2 + 12 < b.x1 || b.x2 + 12 < a.x1 || a.y2 + 8 < b.y1 || b.y2 + 8 < a.y1;
    const right = boxes.length ? Math.max(...boxes.map(b => b.x2)) : 0;
    for (const [i, id] of fresh.entries()) {
      const n = cy.$id(id);
      if (first) { n.position({ x: (((i * 7919) % 101) / 100 - 0.5) * 400, y: depth[id] * DEPTH_GAP }); placed.add(id); continue; }
      const l = links.find(x => (x.source === id && placed.has(x.target)) || (x.target === id && placed.has(x.source)));
      // With no neighbour on the web (a new starting point), start to the right of everything.
      const p = l ? cy.$id(l.source === id ? l.target : l.source).position() : { x: right + 160, y: 0 };
      const dir = !l ? 1 : (l.source === id) !== (l.kind === 'is-a') ? -1 : 1;
      slots: for (let row = 1; row <= 12; row++) for (let k = 0; k <= 8; k++) {
        n.position({ x: p.x + (k % 2 ? -1 : 1) * Math.ceil(k / 2) * 75, y: p.y + (l ? dir * row * STEP : (row - 1) * STEP) });
        const box = n.boundingBox({ includeLabels: true });
        if (boxes.every(b => clear(box, b))) break slots;
      }
      boxes.push(n.boundingBox({ includeLabels: true }));
      placed.add(id);
    }
    if (!fresh.length) return;
    // Move the camera only when something new lands out of view.
    const show = () => {
      const { x1, x2, y1, y2 } = cy.extent();
      const out = fresh.some(id => { const p = cy.$id(id).position(); return p.x < x1 || p.x > x2 || p.y < y1 || p.y > y2; });
      if (!first && !out) return;
      // The first view fits the whole web; later ones frame what was just added, zooming out no further than readable.
      const frame = first ? nodes : fresh;
      const xs = frame.map(id => cy.$id(id).position('x')), ys = frame.map(id => cy.$id(id).position('y'));
      const bx1 = Math.min(...xs) - 80, bx2 = Math.max(...xs) + 80, by1 = Math.min(...ys) - 60, by2 = Math.max(...ys) + 50;
      const fit = Math.min(1.4, (cy.width() - 2 * PAD) / (bx2 - bx1), (cy.height() - 2 * PAD) / (by2 - by1));
      const zoom = first ? Math.max(MIN_ZOOM, fit) : Math.max(READABLE, Math.min(cy.zoom(), fit));
      const view = { zoom, pan: { x: cy.width() / 2 - zoom * (bx1 + bx2) / 2, y: cy.height() / 2 - zoom * (by1 + by2) / 2 } };
      if (first) cy.viewport(view); else cy.animate({ ...view, duration: 500 });
    };
    if (!first) return show();
    // Always run frame by frame: cola's non-animated mode loops until it converges, which maxSimulationTime can't cut
    // short, so a web that never settles would freeze the tab. Many steps per frame, so it settles almost at once.
    run({ animate: true, refresh: 30 }, show);
  }, [elements, fontsReady]);

  useEffect(() => {
    if (!fontsReady) return;
    const { cy } = st.current;
    cy.nodes().removeClass('selected');
    if (selected) cy.$id(selected).addClass('selected');
    paint();
  }, [elements, highlight, selected, fontsReady]);

  return (
    <div className="graph-wrap">
      <div className="graph" ref={ref} role="img" aria-label={label} />
      {empty && <p className="web-empty muted">{empty}</p>}
    </div>
  );
}

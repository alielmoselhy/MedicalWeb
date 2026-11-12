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
const SIDE_GAP = 400; // where a new disease's bubbles start, side by side; the layout keeps them roughly there
const DEPTH_GAP = 90; // where a new bubble starts, by its causal depth
const MIN_ZOOM = 0.5; // below this labels are unreadable; pan to see the rest
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
// A broad node halo keeps the contour off each glyph; still broader virtual-edge influence turns the narrow
// connecting tendrils into useful interior space without making separate disease clouds physically attract.
const CLOUD_OUTLINE = {
  pixelGroup: 6,
  nodeR0: 34,
  nodeR1: 78,
  edgeR0: 32,
  edgeR1: 72,
  morphBuffer: 18,
  memberInfluenceFactor: 0.9,
  edgeInfluenceFactor: 1.35,
  virtualEdges: true,
};

// A live bubble network laid out by WebCola. Dragging wakes the layout, so neighbours make room and settle; a
// dropped bubble stays where it was dropped. Any change to the web lays it out again from where everything is.
// clouds: [{ id, label, ids, colour }], one outline per disease, its title tappable (onTap(id)).
export default function Web({ elements, clouds, highlight, selected, onTap, label, empty }) {
  const ref = useRef();
  const st = useRef({}); // cy, bb, run (starts a cola layout), gaps (the causal order constraints)
  const props = useRef();
  props.current = { onTap, highlight };
  const fontsReady = useFontsReady();

  // Light up the hovered node's neighbours, or else the highlight list. Titles never dim.
  const paint = hovered => {
    const { cy } = st.current;
    const els = cy.elements().not('.cloud-title');
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
      // Bigger labels than the small graphs, still drawn when zoomed out to see a whole multi-disease web.
      { selector: 'node', style: { 'font-size': 12, 'text-max-width': 110, 'min-zoomed-font-size': 5 } },
      { selector: 'node.cloud-title', style: { events: 'yes', 'font-size': 15, 'text-valign': 'center' } },
      // A bundle of causes: a cause, drawn bigger with a double border, meaning "click to open".
      { selector: 'node.bundle', style: { width: 20, height: 20, 'border-width': 4, 'border-style': 'double', 'border-color': v('--glyph'),
        'font-weight': 'bold' } },
      { selector: 'edge.flowing', style: { 'line-style': 'dashed', 'line-dash-pattern': [10, 8], width: 1.6 } }], minZoom: 0.15, maxZoom: 3 });
    const bb = cy.bubbleSets();
    // A title sits over the bubbles only its disease has; shared ones lie between clouds.
    const placeTitles = () => (st.current.clouds ?? []).forEach(c => {
      const own = cy.nodes().filter(n => c.ids.includes(n.id()) && !st.current.clouds.some(o => o !== c && o.ids.includes(n.id())));
      const members = own.length ? own : cy.nodes().filter(n => c.ids.includes(n.id()));
      if (!members.length) return;
      const { x1, x2, y1 } = members.boundingBox({ includeLabels: false });
      cy.$id(`title:${c.id}`).position({ x: (x1 + x2) / 2, y: y1 - 55 });
    });
    // Titles follow their clouds, at most once a frame.
    let titleFrame = 0;
    cy.on('position', 'node', e => {
      if (e.target.hasClass('cloud-title') || titleFrame) return;
      titleFrame = requestAnimationFrame(() => { titleFrame = 0; placeTitles(); });
    });
    let layout = null;
    const run = (opts, done) => {
      layout?.stop();
      layout = cy.elements().not('.cloud-title').layout({ ...COLA, gapInequalities: st.current.gaps, ...opts });
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
      flowing = collection.filter('[kind = "causal"]');
      if (!flowing.length || reducedMotion.matches) return;
      flowing.addClass('flowing');
      flowTimer = setInterval(() => {
        flowOffset = (flowOffset - 1) % 18;
        flowing.style('line-dash-offset', flowOffset);
      }, 100);
    };
    st.current = { cy, bb, run, stopFlow, placeTitles };

    // Grabbing a bubble starts a never-ending cola run, so neighbours make room as it moves. Cola only learns of a
    // grab that happens while it runs, so the grab is replayed once it has started. On drop the bubble is locked
    // (cola treats locked as fixed) while the rest settle round it, then stopped and unlocked: it stays put.
    let replaying = false, settle = 0;
    cy.on('grab', 'node', e => {
      if (replaying || e.target.hasClass('cloud-title') || reduced()) return;
      clearTimeout(settle);
      cy.nodes(':locked').not('.cloud-title').unlock();
      run({ infinite: true });
      replaying = true; e.target.emit('grab'); replaying = false;
    });
    cy.on('free', 'node', e => {
      if (e.target.hasClass('cloud-title') || reduced()) return;
      e.target.lock();
      settle = setTimeout(() => { layout?.stop(); e.target.unlock(); }, 1500);
    });
    cy.on('tap', 'node', e => { const id = e.target.id(); props.current.onTap(id.startsWith('title:') ? id.slice(6) : id); });
    cy.on('mouseover', 'node', e => {
      if (e.target.hasClass('cloud-title')) return;
      paint(e.target);
      startFlow(e.target.connectedEdges());
    });
    cy.on('mouseout', 'node', () => { stopFlow(); paint(); });
    cy.on('mouseover', 'edge[kind="causal"]', e => startFlow(e.target));
    cy.on('mouseout', 'edge[kind="causal"]', () => stopFlow());
    return () => { stopFlow(); clearTimeout(settle); cancelAnimationFrame(titleFrame); layout?.stop(); cy.destroy(); };
  }, [fontsReady]);

  // The web changed: re-plan all of it, then let every bubble glide to its new home.
  useEffect(() => {
    if (!fontsReady) return;
    const { cy, bb, run, placeTitles } = st.current;
    st.current.stopFlow();
    st.current.clouds = clouds;
    const titles = clouds.map(c => ({ data: { id: `title:${c.id}`, label: c.label }, classes: 'cloud-title', grabbable: false }));
    const all = [...elements, ...titles];
    const want = new Set(all.map(el => el.data.id));
    cy.remove(cy.elements().filter(el => !want.has(el.id())));
    cy.add(all.filter(el => cy.getElementById(el.data.id).empty()));
    elements.forEach(el => {
      const e = cy.getElementById(el.data.id);
      e.classes(el.classes ?? '');
      if (!el.data.source) e.data('label', el.data.label); // a cause group's "(+N)" changes as it opens and closes
    });
    clouds.forEach(c => cy.$id(`title:${c.id}`).classes('cloud-label cloud-title').style('color', v(c.colour)));

    // Real bubble-plus-label boxes, measured by Cytoscape, for the plan and for collisions.
    const boxes = {};
    const web = cy.nodes().not('.cloud-title');
    web.forEach(n => {
      const p = n.position(), r = n.boundingBox({ includeLabels: true });
      boxes[n.id()] = { hw: Math.max(p.x - r.x1, r.x2 - p.x) + 6, top: r.y1 - p.y - 4, bottom: r.y2 - p.y + 4 };
    });
    const nodes = web.map(n => n.id());
    const links = elements.filter(el => el.data.source).map(el => ({ source: el.data.source, target: el.data.target, kind: el.data.kind }));
    // How the web sits in the canvas, title space included: the zoom that shows all of it, and its centre.
    const frame = () => {
      const xs = nodes.map(id => cy.$id(id).position('x')), ys = nodes.map(id => cy.$id(id).position('y'));
      const x1 = Math.min(...xs) - 80, x2 = Math.max(...xs) + 80, y1 = Math.min(...ys) - 90, y2 = Math.max(...ys) + 50;
      return { zoom: Math.min(1.4, (cy.width() - 2 * PAD) / (x2 - x1), (cy.height() - 2 * PAD) / (y2 - y1)), cx: (x1 + x2) / 2, cy: (y1 + y2) / 2 };
    };

    // New bubbles start next to a neighbour already on the web, else on their disease's side at their causal depth.
    const placed = st.current.placed ??= new Set();
    [...placed].filter(id => !want.has(id)).forEach(id => placed.delete(id));
    const first = !placed.size;
    const fresh = nodes.filter(id => !placed.has(id));
    const depth = depths(nodes, links);
    for (const [i, id] of fresh.entries()) {
      const spread = ((i * 7919) % 101) / 100 - 0.5; // a fixed scatter in -0.5..0.5, so the layout is repeatable
      const near = links.flatMap(l => (l.source === id ? [l.target] : l.target === id ? [l.source] : [])).find(n => placed.has(n));
      const side = Math.max(0, clouds.findIndex(c => c.ids.includes(id)));
      cy.$id(id).position(near
        ? { x: cy.$id(near).position('x') + 70 * Math.cos(i * 2.4), y: cy.$id(near).position('y') + 70 * Math.sin(i * 2.4) }
        : { x: (side - (clouds.length - 1) / 2) * SIDE_GAP + spread * SIDE_GAP * 0.8, y: depth[id] * DEPTH_GAP + spread * 60 });
      placed.add(id);
    }
    cy.nodes(':locked').not('.cloud-title').unlock(); // a re-layout lets go of dropped bubbles
    // Causal order as constraints: a cause at least GAP above its effect. Links that loop back are left free.
    st.current.gaps = links.filter(l => l.kind !== 'is-a' && depth[l.target] > depth[l.source])
      .map(l => ({ axis: 'y', left: cy.$id(l.source), right: cy.$id(l.target), gap: GAP }));
    const show = () => {
      placeTitles();
      if (!fresh.length || !nodes.length) return;
      const f = frame(), zoom = Math.max(MIN_ZOOM, f.zoom);
      const view = { zoom, pan: { x: cy.width() / 2 - zoom * f.cx, y: cy.height() / 2 - zoom * f.cy } };
      if (first) cy.viewport(view); else cy.animate({ ...view, duration: 500 });
    };
    // Always run frame by frame: cola's non-animated mode loops until it converges, which maxSimulationTime can't cut
    // short, so a web that never settles would freeze the tab. A fresh web (or reduced motion) takes many steps
    // per frame, so it settles almost at once; a changed one moves into place on screen.
    if (nodes.length) run({ animate: true, refresh: first || reduced() ? 30 : 1 }, show);

    // Redraw the outlines when the set of clouds or members changes; the plugin then follows node moves by itself.
    bb.getPaths().forEach(p => bb.removePath(p));
    clouds.forEach(c => {
      const members = cy.nodes().filter(n => c.ids.includes(n.id()));
      if (!members.length) return;
      const colour = v(c.colour);
      // No edges (removing an edged path leaves a cache that breaks later redraws) and no avoided nodes
      // (an outline fails outright when another disease's bubbles sit inside its area).
      bb.addPath(members, cy.collection(), cy.collection(), {
        ...CLOUD_OUTLINE,
        style: { fill: colour, fillOpacity: '0.12', stroke: colour, strokeWidth: '2.5' },
      });
    });
  }, [elements, clouds, fontsReady]);

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

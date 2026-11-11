import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { forceSimulation, forceManyBody, forceLink, forceX, forceY } from 'd3-force';
import { stylesheet, useFontsReady } from './Graph.jsx'; // also registers the bubblesets plugin
import { crossingReducedX } from './layout.js';

const v = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const CLOUD_GAP = 560; // horizontal distance between disease homes
const BAND = 110;      // vertical distance between causal bands, including room for wrapped labels
const SPRING = {
  causal: { distance: 112, strength: 0.34 },
  'is-a': { distance: 125, strength: 0.28 },
};
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

// Cytoscape hangs a wrapped label (max 110px wide, ~12px a line) under a 14px glyph. This is that whole footprint,
// as a box around the glyph centre: half-width, and the top/bottom offsets.
export function footprint(label) {
  const w = Math.min(110, label.length * 5.2);
  const lines = Math.max(1, Math.ceil(label.length * 5.2 / 110));
  return { hw: w / 2 + 8, top: -11, bottom: 14 + lines * 12 };
}

// Box collision: circles let a wide label slide under its neighbour's. Overlapping boxes are pushed apart along
// the axis that needs the smaller move, through velocity like d3's own forceCollide.
export function forceBoxCollide(box, strength = 0.7) {
  let nodes = [];
  const force = () => {
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j], A = box(a.id), B = box(b.id);
      const dx = b.x + b.vx - a.x - a.vx;
      const dy = (b.y + b.vy + (B.top + B.bottom) / 2) - (a.y + a.vy + (A.top + A.bottom) / 2);
      const ox = A.hw + B.hw - Math.abs(dx);
      const oy = (A.bottom - A.top + B.bottom - B.top) / 2 - Math.abs(dy);
      if (ox <= 0 || oy <= 0) continue;
      if (ox < oy) { const m = ox / 2 * strength * (dx < 0 ? -1 : 1); a.vx -= m; b.vx += m; }
      else { const m = oy / 2 * strength * (dy < 0 ? -1 : 1); a.vy -= m; b.vy += m; }
    }
  };
  force.initialize = n => { nodes = n; };
  return force;
}

// Edge clearance: a line passing through a bubble it doesn't belong to pushes that bubble off it sideways (and the
// line's ends the other way), so arrows stop running through unrelated nodes and labels. Line ends are ignored.
export function forceEdgeClearance(links, box, strength = 0.5) {
  let nodes = [];
  const force = alpha => {
    for (const l of links) {
      const s = l.source, t = l.target;
      if (typeof s !== 'object' || typeof t !== 'object') continue;
      const ex = t.x - s.x, ey = t.y - s.y, len2 = ex * ex + ey * ey;
      if (len2 < 1) continue;
      for (const n of nodes) {
        if (n === s || n === t) continue;
        const B = box(n.id), cy = n.y + (B.top + B.bottom) / 2;
        const u = ((n.x - s.x) * ex + (cy - s.y) * ey) / len2;
        if (u < 0.08 || u > 0.92) continue;
        const px = s.x + u * ex - n.x, py = s.y + u * ey - cy, d = Math.hypot(px, py) || 0.01;
        const need = Math.min(B.hw, (B.bottom - B.top) / 2) + 6;
        if (d >= need) continue;
        const k = (need - d) / d * strength * alpha;
        n.vx -= px * k; n.vy -= py * k;
        s.vx += px * k / 2; s.vy += py * k / 2; t.vx += px * k / 2; t.vy += py * k / 2;
      }
    }
  };
  force.initialize = n => { nodes = n; };
  return force;
}

// A live bubble network: nodes are bodies in a physics simulation that collide, push apart and spring back.
// clouds: [{ id, label, ids, colour }], one outline per disease, its title tappable (onTap(id)).
// band: id → causal band (0 = root cause, then mechanisms, then one loose-node area), pulling bubbles into rough story order.
export default function Web({ elements, clouds, band, highlight, selected, onTap, label, empty }) {
  const ref = useRef();
  const st = useRef({}); // cy, sim, bb, bodies (id → simulation node), titles
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
      { selector: 'node.cloud-title', style: { events: 'yes', 'font-size': 15, 'text-valign': 'center' } },
      // A bundle of causes: a cause, drawn bigger with a double border, meaning "click to open".
      { selector: 'node.bundle', style: { width: 20, height: 20, 'border-width': 4, 'border-style': 'double', 'border-color': v('--glyph'),
        'font-weight': 'bold' } },
      { selector: 'edge.flowing', style: { 'line-style': 'dashed', 'line-dash-pattern': [10, 8], width: 1.6 } }], minZoom: 0.15, maxZoom: 3 });
    const bb = cy.bubbleSets();
    const bodies = new Map();
    const placeTitles = () => (st.current.clouds ?? []).forEach(c => {
      const members = cy.nodes().filter(n => c.ids.includes(n.id()));
      if (!members.length) return;
      const { x1, x2, y1 } = members.boundingBox({ includeLabels: false });
      cy.$id(`title:${c.id}`).position({ x: (x1 + x2) / 2, y: y1 - 55 });
    });
    const apply = () => cy.batch(() => { bodies.forEach((b, id) => cy.$id(id).position({ x: b.x, y: b.y })); placeTitles(); });
    const sim = forceSimulation().velocityDecay(0.3).alphaDecay(0.025).stop().on('tick', apply).on('end', () => {
      if (st.current.fit) { st.current.fit = false; cy.animate({ fit: { eles: cy.elements(), padding: 40 }, duration: 400 }); }
    });
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
    st.current = { cy, sim, bb, bodies, apply, stopFlow };

    // Dragging pins the bubble under the pointer and keeps the simulation warm, so neighbours get shoved and bounce back.
    const body = e => bodies.get(e.target.id());
    cy.on('grab', 'node', e => { const b = body(e); if (!b) return; b.fx = b.x; b.fy = b.y; sim.alphaTarget(0.3).restart(); });
    cy.on('drag', 'node', e => { const b = body(e); if (!b) return; const p = e.target.position(); b.fx = p.x; b.fy = p.y; });
    cy.on('free', 'node', e => { const b = body(e); if (!b) return; b.fx = b.fy = null; sim.alphaTarget(0); });
    cy.on('tap', 'node', e => { const id = e.target.id(); props.current.onTap(id.startsWith('title:') ? id.slice(6) : id); });
    cy.on('mouseover', 'node', e => {
      if (e.target.hasClass('cloud-title')) return;
      paint(e.target);
      startFlow(e.target.connectedEdges());
    });
    cy.on('mouseout', 'node', () => { stopFlow(); paint(); });
    cy.on('mouseover', 'edge[kind="causal"]', e => startFlow(e.target));
    cy.on('mouseout', 'edge[kind="causal"]', () => stopFlow());
    return () => { stopFlow(); sim.stop(); cy.destroy(); };
  }, [fontsReady]);

  useEffect(() => {
    if (!fontsReady) return;
    const { cy, sim, bb, bodies } = st.current;
    st.current.stopFlow();
    st.current.clouds = clouds;
    const titles = clouds.map(c => ({ data: { id: `title:${c.id}`, label: c.label }, classes: 'cloud-title', grabbable: false }));
    // D3's spring is physically symmetrical, so either endpoint pulls the other. Keeping the relationship kind lets
    // causal successors and is-a family links use different, deliberately limited attraction strengths.
    const links = elements.filter(el => el.data.source)
      .map(el => ({ source: el.data.source, target: el.data.target, kind: el.data.kind }));
    const degree = {};
    links.forEach(l => { degree[l.source] = (degree[l.source] ?? 0) + 1; degree[l.target] = (degree[l.target] ?? 0) + 1; });

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

    // Each disease has a home column; a bubble shared by several sits between their homes.
    const home = {};
    const nodes = elements.filter(el => !el.data.source).map(el => el.data.id);
    const labels = Object.fromEntries(elements.filter(el => !el.data.source).map(el => [el.data.id, el.data.label ?? '']));
    for (const id of nodes) {
      const mine = clouds.map((c, i) => c.ids.includes(id) ? i : -1).filter(i => i >= 0);
      home[id] = mine.length ? CLOUD_GAP * mine.reduce((s, i) => s + i, 0) / mine.length : -CLOUD_GAP / 2;
    }
    // Cytoscape draws labels outside the 14px glyph. Give long/wrapped labels a larger physical footprint so
    // the simulation does not consider two visually overlapping nodes to be clear of one another.
    const radius = Object.fromEntries(nodes.map(id => [id, 46 + Math.min(20, labels[id].length * 0.55)]));
    const boxes = Object.fromEntries(nodes.map(id => [id, footprint(labels[id])]));
    const box = id => boxes[id] ?? footprint('');
    const targetX = crossingReducedX(nodes, links, band, home, radius);
    const gone = [...bodies.keys()].filter(id => !want.has(id));
    gone.forEach(id => bodies.delete(id));
    const fresh = nodes.filter(id => !bodies.has(id));
    for (const id of fresh) bodies.set(id,
      { id, x: targetX[id], y: band(id) * BAND });

    sim.nodes([...bodies.values()])
      // Nearby bubbles repel one another. Hubs repel a little more strongly, which fans their children around them
      // instead of allowing a large family to collapse into one knot; distanceMax keeps this local to neighbours.
      .force('charge', forceManyBody()
        .strength(b => -105 - Math.min(degree[b.id] ?? 0, 10) * 13)
        .distanceMin(28).distanceMax(360))
      // Springs pull each parent towards its children only to a comfortable radius; repulsion still wins at close range.
      // Set before the clearance force: forceLink swaps each link's ids for the simulation nodes it reads.
      .force('link', forceLink(links).id(b => b.id)
        .distance(l => (SPRING[l.kind] ?? SPRING.causal).distance)
        .strength(l => (SPRING[l.kind] ?? SPRING.causal).strength))
      .force('collide', forceBoxCollide(box))
      .force('clearance', forceEdgeClearance(links, box))
      // Crossing-reduced row positions blend neighbour proximity with disease homes. They are soft anchors, so
      // shared hubs and dragged nodes can still find a locally comfortable arrangement.
      .force('x', forceX(b => targetX[b.id]).strength(0.1))
      // A nudge, not a grid: causal order stays rough and loose findings/outcomes share the trailing space.
      .force('y', forceY(b => band(b.id) * BAND).strength(0.18));
    if (fresh.length) { st.current.fit = true; sim.alpha(bodies.size === fresh.length ? 1 : 0.7).restart(); }
    else if (gone.length) sim.alpha(0.4).restart(); // close the gap left behind

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
    // First disease: pre-settle a little (manual ticks fire no events) so the opening view isn't a random scatter.
    if (fresh.length && bodies.size === fresh.length) { sim.tick(30); st.current.apply(); cy.fit(undefined, 40); }

    cy.nodes().removeClass('selected');
    if (selected) cy.$id(selected).addClass('selected');
    paint();
  }, [elements, clouds, highlight, selected, fontsReady]);

  return (
    <div className="graph-wrap">
      <div className="graph" ref={ref} role="img" aria-label={label} />
      {empty && <p className="web-empty muted">{empty}</p>}
    </div>
  );
}

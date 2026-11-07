import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { forceSimulation, forceManyBody, forceLink, forceCollide, forceX, forceY } from 'd3-force';
import { stylesheet } from './Graph.jsx'; // also registers the bubblesets plugin

const v = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const CLOUD_GAP = 560; // horizontal distance between disease homes
const BAND = 85;       // vertical distance between causal bands
const SPRING = {
  causal: { distance: 88, strength: 0.34 },
  'is-a': { distance: 105, strength: 0.28 },
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

// A live bubble network: nodes are bodies in a physics simulation that collide, push apart and spring back.
// clouds: [{ id, label, ids, colour }], one outline per disease, its title tappable (onTap(id)).
// band: id → causal band (0 = root cause, then mechanisms, then one loose-node area), pulling bubbles into rough story order.
export default function Web({ elements, clouds, band, highlight, selected, onTap, label, empty }) {
  const ref = useRef();
  const st = useRef({}); // cy, sim, bb, bodies (id → simulation node), titles
  const props = useRef();
  props.current = { onTap, highlight };

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
    const cy = cytoscape({ container: ref.current, style: [...stylesheet(false),
      { selector: 'node.cloud-title', style: { events: 'yes', 'font-size': 15, 'text-valign': 'center' } },
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
  }, []);

  useEffect(() => {
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
    elements.forEach(el => cy.getElementById(el.data.id).classes(el.classes ?? ''));
    clouds.forEach(c => cy.$id(`title:${c.id}`).classes('cloud-label cloud-title').style('color', v(c.colour)));

    // Each disease has a home column; a bubble shared by several sits between their homes.
    const home = {};
    const nodes = elements.filter(el => !el.data.source).map(el => el.data.id);
    for (const id of nodes) {
      const mine = clouds.map((c, i) => c.ids.includes(id) ? i : -1).filter(i => i >= 0);
      home[id] = mine.length ? CLOUD_GAP * mine.reduce((s, i) => s + i, 0) / mine.length : -CLOUD_GAP / 2;
    }
    const gone = [...bodies.keys()].filter(id => !want.has(id));
    gone.forEach(id => bodies.delete(id));
    const fresh = nodes.filter(id => !bodies.has(id));
    for (const id of fresh) bodies.set(id,
      { id, x: home[id] + (Math.random() - 0.5) * 200, y: band(id) * BAND + (Math.random() - 0.5) * 60 });

    sim.nodes([...bodies.values()])
      // Nearby bubbles repel one another. Hubs repel a little more strongly, which fans their children around them
      // instead of allowing a large family to collapse into one knot; distanceMax keeps this local to neighbours.
      .force('charge', forceManyBody()
        .strength(b => -105 - Math.min(degree[b.id] ?? 0, 10) * 13)
        .distanceMin(28).distanceMax(360))
      .force('collide', forceCollide(48).strength(0.8).iterations(2)) // roughly a bubble plus its label
      // Springs pull each parent towards its children only to a comfortable radius; repulsion still wins at close range.
      .force('link', forceLink(links).id(b => b.id)
        .distance(l => (SPRING[l.kind] ?? SPRING.causal).distance)
        .strength(l => (SPRING[l.kind] ?? SPRING.causal).strength))
      .force('x', forceX(b => home[b.id]).strength(0.05))
      // A nudge, not a grid: causal order stays rough and loose findings/outcomes share the trailing space.
      .force('y', forceY(b => band(b.id) * BAND).strength(0.12));
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
  }, [elements, clouds, highlight, selected]);

  return (
    <div className="graph-wrap">
      <div className="graph" ref={ref} role="img" aria-label={label} />
      {empty && <p className="web-empty muted">{empty}</p>}
    </div>
  );
}

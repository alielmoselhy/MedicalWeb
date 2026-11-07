import { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import BubbleSets from 'cytoscape-bubblesets';

cytoscape.use(dagre);
cytoscape.use(BubbleSets);

// Type is shown by both colour and shape.
const SHAPES = { disease: 'round-rectangle', cause: 'triangle', mechanism: 'ellipse', finding: 'diamond', outcome: 'hexagon' };
const FLOW_SHAPES = { disease: 'rectangle', cause: 'cut-rectangle', mechanism: 'round-rectangle', finding: 'polygon', outcome: 'polygon' };
// Built-in rhomboid/hexagon slant by a third/quarter of the width and cut into the label; keep the slant inside the padding.
const FLOW_POINTS = { finding: '-0.9 -1 1 -1 0.9 1 -1 1', outcome: '-1 0 -0.92 -1 0.92 -1 1 0 0.92 1 -0.92 1' };
const v = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// shortcut: colours are read from CSS once per render, so a live OS theme switch needs a reload.
export function stylesheet(flow) {
  return [
    { selector: 'node', style: {
      label: 'data(label)', color: v('--text'), 'font-family': v('--sans'), 'font-size': flow ? 11 : 9, 'text-wrap': 'wrap',
      'text-max-width': flow ? 150 : 110, 'border-width': 1, 'border-color': v('--glyph'), 'background-color': v('--node'),
      ...(flow
        ? { width: 'label', height: 'label', padding: 9, 'text-valign': 'center', 'background-color': v('--surface') }
        : { 'text-valign': 'bottom', 'text-margin-y': 3, width: 14, height: 14, 'min-zoomed-font-size': 7,
            'text-background-color': v('--surface'), 'text-background-opacity': 0.8, 'text-background-padding': 1 }),
    } },
    ...Object.keys(SHAPES).map(type => ({ selector: `node[type="${type}"]`, style: {
      shape: (flow ? FLOW_SHAPES : SHAPES)[type],
      ...(flow && FLOW_POINTS[type] && { 'shape-polygon-points': FLOW_POINTS[type], padding: 12 }),
      ...(flow ? { 'border-width': 2, 'border-color': v(`--${type}`) } : { 'background-color': v(`--${type}`) }),
    } })),
    { selector: 'node[type="disease"]', style: flow ? { 'font-weight': 'bold' } : { width: 24, height: 24, 'font-size': 11, 'font-weight': 'bold' } },
    // A disease drawn as another disease's outcome: outcome-sized, with a double border meaning "also a disease".
    { selector: 'node.as-outcome', style: { shape: 'hexagon', width: 16, height: 16, 'font-size': 9, 'font-weight': 'bold',
      'background-color': v('--outcome'), 'border-width': 4, 'border-style': 'double', 'border-color': v('--disease') } },
    { selector: 'node.selected', style: { 'border-width': 4, 'border-color': v('--accent') } },
    { selector: 'node.cloud-label', style: { shape: 'rectangle', width: 1, height: 1, 'background-opacity': 0, 'border-width': 0,
      'font-size': 14, 'font-weight': 'bold', 'text-valign': 'center', 'text-max-width': 260, 'text-background-opacity': 0, events: 'no' } },
    { selector: 'edge', style: {
      width: 1.2, 'line-color': v('--edge'), 'target-arrow-color': v('--edge'),
      'target-arrow-shape': 'triangle', 'arrow-scale': 0.8, 'curve-style': 'bezier',
    } },
    { selector: 'edge[kind="is-a"]', style: { 'line-style': 'dashed', 'target-arrow-shape': 'triangle-backcurve' } },
    // Membership, not causation: a disease "has" these nodes.
    { selector: 'edge[kind="member"], edge[kind="finding"], edge[kind="outcome"]', style: { 'target-arrow-shape': 'none', width: 0.8 } },
    { selector: 'edge[kind="involves"]', style: { 'line-style': 'dotted', 'target-arrow-shape': 'none' } },
    // Outside every cloud: faded, label only on hover.
    { selector: '.outside', style: { opacity: 0.25, label: '' } },
    { selector: '.dim', style: { opacity: 0.12 } },
    { selector: '.hl', style: { opacity: 1, label: 'data(label)' } },
    { selector: 'edge.hl', style: { 'line-color': v('--strong'), 'target-arrow-color': v('--strong'), width: 1.8, label: '' } },
  ];
}

const NONE = [];

// flow: top-down causal-chain layout; positions: preset {id: {x, y}}; layout: any cytoscape layout; otherwise a force-directed network.
// clouds: [{ ids, label?, name?, colour }]: label is drawn on the canvas, name (or label) shows on hovering the outline; colour is a CSS colour or a --custom-property name.
// drop: element ids that shape the layout but are removed before drawing. highlight: ids to light up. tip: id → hover text.
export default function Graph({ elements, flow = false, selected, onTap, label, clouds = NONE, positions, drop = NONE, highlight = NONE, tip, layout }) {
  const ref = useRef();
  const cyRef = useRef();
  const props = useRef();
  props.current = { onTap, tip };
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const cy = cytoscape({
      container: ref.current, elements, style: stylesheet(flow), minZoom: 0.15, maxZoom: 3,
      layout: layout ?? (positions ? { name: 'preset', positions: n => positions[n.id()], padding: 30 }
        : flow ? { name: 'dagre', rankDir: 'TB', nodeSep: 25, rankSep: 35 }
        : { name: 'cose', animate: false, nodeRepulsion: () => 250000, idealEdgeLength: () => 150, nodeOverlap: 60, gravity: 0.2, componentSpacing: 150, numIter: 3000 }),
    });
    cyRef.current = cy;
    const dropped = new Set(drop);
    cy.remove(cy.elements().filter(el => dropped.has(el.id())));
    if (cy.zoom() > 1.2) { cy.zoom(1.2); cy.center(); } // small graphs otherwise fit at giant scale
    if (selected) cy.$id(selected).addClass('selected');
    const outlines = []; // [{ path: SVG path, name }] for hover hit-testing
    if (clouds.length) {
      const bb = cy.bubbleSets();
      const all = cy.nodes().filter(n => clouds.some(c => c.ids.includes(n.id())));
      cy.nodes().difference(all).addClass('outside');
      clouds.forEach((c, i) => {
        const members = all.filter(n => c.ids.includes(n.id()));
        const colour = c.colour.startsWith('--') ? v(c.colour) : c.colour;
        // Wider radii than the defaults (15/50, 10/20) so the outline sits well clear of its nodes.
        const opts = { pixelGroup: clouds.length > 3 ? 8 : 4, nodeR0: 30, nodeR1: 70, edgeR0: 25, edgeR1: 50, morphBuffer: 15,
          style: { fill: colour, fillOpacity: clouds.length > 3 ? '0.07' : '0.16', stroke: colour, strokeWidth: clouds.length > 3 ? '1.5' : '3' } };
        const draw = (ms, avoid) => {
          const path = bb.addPath(ms, ms.edgesWith(ms), avoid, opts);
          if (path.node.getAttribute('d')) { outlines.push({ path: path.node, name: c.name ?? c.label }); return true; }
          bb.removePath(path);
          // removePath leaves an empty {} cache on its edges, which makes other outlines throw on redraw (e.g. mid-drag).
          ms.edgesWith(ms).forEach(e => e.removeScratch('bubbleSets'));
          return false;
        };
        // The outline fails when a member sits far from the rest; peel off the farthest one into its own
        // small outline of the same colour until the main cloud draws.
        // After a few tries, stop avoiding other nodes and draw what is left in one go.
        let rest = members, tries = 0;
        while (rest.length && !draw(rest, cy.nodes().difference(members))) {
          if (++tries > 5) { draw(rest, null); break; }
          const { x1, x2, y1, y2 } = rest.boundingBox({ includeLabels: false });
          const far = rest.max(n => Math.hypot(n.position('x') - (x1 + x2) / 2, n.position('y') - (y1 + y2) / 2)).ele;
          draw(far, null);
          rest = rest.difference(far);
        }
        if (!c.label || !members.length) return;
        // Name the cloud above the part that belongs to it alone.
        const own = members.filter(n => clouds.every((o, j) => j === i || !o.ids.includes(n.id())));
        const box = (own.length ? own : members).boundingBox({ includeLabels: false });
        cy.add({ data: { id: `cloud-label-${i}`, label: c.label }, classes: 'cloud-label', selectable: false, grabbable: false,
          position: { x: (box.x1 + box.x2) / 2, y: box.y1 - 80 } }).style('color', colour);
      });
      if (positions) cy.fit(undefined, 30);
    }
    cy.on('tap', 'node', e => { setHover(null); props.current.onTap?.(e.target.id()); });
    cy.on('mouseover', 'node', e => {
      const n = e.target;
      cy.elements().not('.cloud-label').addClass('dim');
      n.closedNeighborhood().removeClass('dim').addClass('hl');
      const text = props.current.tip?.(n.id());
      if (text) setHover({ text, ...n.renderedPosition() });
    });
    // The outline layer sits under the canvas and gets no mouse events, so hit-test the pointer against each outline.
    cy.on('mousemove', e => {
      if (e.target !== cy || !outlines.length) return;
      const { x, y } = e.position, tol = 6 / cy.zoom();
      const near = (p, dx, dy) => p.isPointInStroke(new DOMPoint(x + dx, y + dy));
      const names = [...new Set(outlines.filter(o => o.name && [[0, 0], [tol, 0], [-tol, 0], [0, tol], [0, -tol]]
        .some(([dx, dy]) => near(o.path, dx, dy))).map(o => o.name))];
      setHover(names.length ? { text: names.join(' · '), ...e.renderedPosition } : null);
    });
    cy.on('mouseout', 'node', () => { cy.elements().removeClass('dim hl'); setHover(null); });
    return () => { cy.destroy(); setHover(null); };
  }, [elements, flow, selected, clouds, positions, drop, layout]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!highlight.length) return;
    cy.elements().not('.cloud-label').addClass('dim');
    cy.nodes().filter(n => highlight.includes(n.id())).removeClass('dim').addClass('hl');
    return () => cy.elements().removeClass('dim hl');
  }, [highlight, elements]);

  return (
    <div className="graph-wrap">
      <div className={flow ? 'graph flow' : 'graph'} ref={ref} role="img" aria-label={label} />
      {hover && <div className="tip" style={{ left: hover.x, top: hover.y }}>{hover.text}</div>}
    </div>
  );
}

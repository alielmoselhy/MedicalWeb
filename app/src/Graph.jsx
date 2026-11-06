import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import BubbleSets from 'cytoscape-bubblesets';

cytoscape.use(dagre);
cytoscape.use(BubbleSets);

const SHAPES = { disease: 'round-rectangle', cause: 'triangle', mechanism: 'ellipse', finding: 'diamond', outcome: 'hexagon' };

// shortcut: colours are read from CSS once per render, so a live OS theme switch needs a reload.
function stylesheet(flow) {
  const v = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return [
    { selector: 'node', style: {
      label: 'data(label)', color: v('--text'), 'font-size': flow ? 11 : 9, 'text-wrap': 'wrap',
      'text-max-width': flow ? 150 : 110, 'border-width': 1, 'border-color': v('--border'),
      ...(flow
        ? { shape: 'round-rectangle', width: 'label', height: 'label', padding: 8, 'text-valign': 'center', 'background-color': v('--surface') }
        : { 'text-valign': 'bottom', 'text-margin-y': 3, width: 14, height: 14, 'min-zoomed-font-size': 7,
            'text-background-color': v('--surface'), 'text-background-opacity': 0.8, 'text-background-padding': 1 }),
    } },
    ...Object.entries(SHAPES).map(([type, shape]) => ({ selector: `node[type="${type}"]`, style: {
      ...(flow ? { 'border-width': 2, 'border-color': v(`--${type}`) } : { shape, 'background-color': v(`--${type}`) }),
    } })),
    { selector: 'node[type="disease"]', style: flow ? { 'font-weight': 'bold' } : { width: 24, height: 24, 'font-size': 11, 'font-weight': 'bold' } },
    { selector: 'node.selected', style: { 'border-width': 4, 'border-color': v('--accent') } },
    { selector: 'edge', style: {
      width: 1.2, 'line-color': v('--edge'), 'target-arrow-color': v('--edge'),
      'target-arrow-shape': 'triangle', 'arrow-scale': 0.8, 'curve-style': 'bezier',
    } },
    { selector: 'edge[kind="is-a"]', style: { 'line-style': 'dashed', 'target-arrow-shape': 'triangle-backcurve' } },
    // Membership, not causation: a disease "has" these nodes.
    { selector: 'edge[kind="member"], edge[kind="finding"], edge[kind="outcome"]', style: { 'target-arrow-shape': 'none', width: 0.8 } },
    { selector: 'edge[kind="involves"]', style: { 'line-style': 'dotted', 'target-arrow-shape': 'none' } },
  ];
}

// flow: top-down causal-chain layout; otherwise a force-directed network.
const NO_CLOUDS = [];

// clouds: [[node ids of disease 1], …], drawn as overlapping outlines coloured --cloud-1, --cloud-2, …
export default function Graph({ elements, flow = false, selected, onTap, label, clouds = NO_CLOUDS }) {
  const ref = useRef();
  const tap = useRef(onTap);
  tap.current = onTap;

  useEffect(() => {
    const cy = cytoscape({
      container: ref.current, elements, style: stylesheet(flow), minZoom: 0.2, maxZoom: 3,
      layout: flow
        ? { name: 'dagre', rankDir: 'TB', nodeSep: 25, rankSep: 35 }
        : { name: 'cose', animate: false, nodeRepulsion: () => 60000, idealEdgeLength: () => 90, nodeOverlap: 40, gravity: 0.4, numIter: 3000 },
    });
    if (cy.zoom() > 1.2) { cy.zoom(1.2); cy.center(); } // small graphs otherwise fit at giant scale
    if (selected) cy.$id(selected).addClass('selected');
    if (clouds.length) {
      const bb = cy.bubbleSets();
      clouds.forEach((ids, i) => {
        const members = cy.nodes().filter(n => ids.includes(n.id()));
        const colour = `var(--cloud-${i + 1})`;
        bb.addPath(members, members.edgesWith(members), cy.nodes().difference(members),
          { style: { fill: colour, fillOpacity: '0.14', stroke: colour, strokeWidth: '1.5' } });
      });
    }
    cy.on('tap', 'node', e => tap.current?.(e.target.id()));
    return () => cy.destroy();
  }, [elements, flow, selected, clouds]);

  return <div className={flow ? 'graph flow' : 'graph'} ref={ref} role="img" aria-label={label} />;
}

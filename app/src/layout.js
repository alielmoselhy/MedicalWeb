// Preset positions for 1–3 disease clouds: one cell per membership pattern (a Venn grid),
// and inside each cell the nodes run in story order: causal-chain depth → one shared loose-node area.
import { byId } from './graph.js';

const DX = 135, DY = 62, GAP = 70;
// [column, row] of each membership pattern; every cloud's cells touch, so its outline stays in one piece.
const CELLS = {
  1: { 0: [0, 0] },
  2: { 0: [0, 0], '01': [1, 0], 1: [2, 0] },
  3: { 0: [0, 0], '01': [1, 0], 1: [2, 0], '02': [0, 1], '012': [1, 1], '12': [2, 1], 2: [1, 2] },
};

// Longest causal path from a root, so a chain reads top to bottom.
function depths(ids, edges) {
  const d = Object.fromEntries(ids.map(i => [i, 0]));
  const causal = edges.filter(e => e.kind === 'causal' && e.from in d && e.to in d);
  for (let pass = 0; pass < ids.length; pass++) {
    let changed = false;
    for (const e of causal) if (d[e.to] < d[e.from] + 1) { d[e.to] = d[e.from] + 1; changed = true; }
    if (!changed) break;
  }
  return d;
}

// Story order as bands: anything in a causal link sits at its chain depth (a disease used as a cause is a root).
// Everything outside the chain shares one trailing band, rather than separate finding/outcome shelves.
export function bands(ids, edges) {
  ids = [...ids];
  const d = depths(ids, edges);
  const linked = new Set(edges.filter(e => e.kind === 'causal').flatMap(e => [e.from, e.to]));
  const chainy = id => linked.has(id) || ['cause', 'mechanism'].includes(byId[id].type);
  const maxD = Math.max(0, ...ids.filter(chainy).map(i => d[i]));
  return { band: id => chainy(id) ? d[id] : maxD + 1, maxD };
}

// clouds: [[ids], …]; ids: every node drawn; edges: graph edges. Nodes in no cloud go in a cell under the rest.
export function cloudPositions(clouds, ids, edges) {
  ids = [...ids];
  const k = clouds.length;
  const { band, maxD } = bands(ids, edges);
  const outside = [k === 1 ? 0 : 1, k === 3 ? 3 : 1];

  const cells = {}; // "col,row" → band → [ids]
  for (const id of ids) {
    const sig = clouds.map((c, i) => (c.includes(id) ? i : '')).join('');
    const key = (CELLS[k][sig] ?? outside).join();
    ((cells[key] ??= {})[band(id)] ??= []).push(id);
  }
  // Big cells grow wider rather than taller, so the grid stays roughly square.
  const per = {};
  for (const [key, bands] of Object.entries(cells))
    per[key] = Math.min(7, Math.max(k === 1 ? 5 : 3, Math.ceil(Math.sqrt(Object.values(bands).flat().length))));
  const colW = {}, bandH = {}; // bandH["row,band"] = sub-rows, shared across a grid row so bands line up
  for (const [key, bands] of Object.entries(cells)) {
    const [col, row] = key.split(',').map(Number);
    const perRow = per[key];
    for (const [b, list] of Object.entries(bands)) {
      colW[col] = Math.max(colW[col] ?? 0, Math.min(list.length, perRow) * DX);
      bandH[`${row},${b}`] = Math.max(bandH[`${row},${b}`] ?? 0, Math.ceil(list.length / perRow));
    }
  }
  const cols = Math.max(...Object.keys(colW).map(Number)) + 1;
  const colX = [0];
  for (let c = 1; c <= cols; c++) colX[c] = colX[c - 1] + (colW[c - 1] ?? 0) + GAP;
  const rowY = {}, bandY = {};
  let y = 0;
  for (let row = 0; row <= 3; row++) {
    rowY[row] = y;
    for (let b = 0; b <= maxD + 1; b++) {
      const h = bandH[`${row},${b}`];
      if (h) { bandY[`${row},${b}`] = y - rowY[row]; y += h * DY; }
    }
    if (y > rowY[row]) y += GAP;
  }

  const pos = {};
  for (const [key, bands] of Object.entries(cells)) {
    const [col, row] = key.split(',').map(Number);
    const perRow = per[key];
    for (const [b, list] of Object.entries(bands)) {
      list.sort((a, z) => byId[a].name.localeCompare(byId[z].name));
      list.forEach((id, i) => {
        const inRow = Math.min(perRow, list.length - Math.floor(i / perRow) * perRow);
        const x0 = colX[col] + ((colW[col] ?? 0) - inRow * DX) / 2;
        pos[id] = { x: x0 + (i % perRow + 0.5) * DX, y: rowY[row] + bandY[`${row},${b}`] + Math.floor(i / perRow) * DY };
      });
    }
  }
  return pos;
}

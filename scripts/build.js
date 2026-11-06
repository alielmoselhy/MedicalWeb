// Validates nodes.yaml + Diseases/*.yaml and writes app/src/graph.json.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const NODE_TYPES = ['cause', 'finding', 'mechanism', 'outcome'];
const CATEGORIES = { finding: ['symptom', 'sign', 'lab', 'ECG', 'imaging'], cause: ['organism', 'genetic', 'risk-factor', 'drug', 'condition'] };
const FREQS = ['classic', 'common', 'occasional', 'rare'];
const STATUSES = ['draft', 'reviewed'];

// vocab: parsed nodes.yaml; diseaseFiles: [{ file, doc }]. Returns { graph, warnings } or throws with every error listed.
export function buildGraph(vocab, diseaseFiles) {
  const errors = [];
  const warnings = [];
  const nodes = new Map();

  if (!Array.isArray(vocab)) throw new Error('nodes.yaml: must be a list of nodes');
  for (const n of vocab) {
    const where = `nodes.yaml (${n?.id ?? 'missing id'})`;
    if (!n?.id || !n.name) { errors.push(`${where}: needs id and name`); continue; }
    if (!NODE_TYPES.includes(n.type)) errors.push(`${where}: type must be one of ${NODE_TYPES.join(', ')}`);
    if (n.category && !CATEGORIES[n.type]?.includes(n.category)) errors.push(`${where}: category must be one of ${CATEGORIES[n.type]?.join(', ') ?? '(none for this type)'}`);
    if (nodes.has(n.id)) errors.push(`${where}: duplicate id`);
    nodes.set(n.id, { id: n.id, name: n.name, type: n.type, parent: n.parent, category: n.category });
  }

  for (const { file, doc } of diseaseFiles) {
    if (!doc?.id || !doc.name) { errors.push(`${file}: needs id and name`); continue; }
    if (doc.id !== basename(file, '.yaml')) errors.push(`${file}: id "${doc.id}" must match filename`);
    if (!STATUSES.includes(doc.status)) errors.push(`${file}: status must be one of ${STATUSES.join(', ')}`);
    if (nodes.has(doc.id)) errors.push(`${file}: id "${doc.id}" is already used in ${nodes.get(doc.id).type === 'disease' ? 'another disease file' : 'nodes.yaml'}`);
    nodes.set(doc.id, { id: doc.id, name: doc.name, type: 'disease', parent: doc.parent, group: doc.group, status: doc.status, sources: doc.sources ?? [], file });
  }

  for (const n of nodes.values()) {
    const where = n.file ?? `nodes.yaml (${n.id})`;
    const parent = nodes.get(n.parent);
    if (n.parent && !parent) errors.push(`${where}: parent "${n.parent}" does not exist`);
    // Same type only, except an outcome may be a kind of disease (acute MR is a kind of mitral regurgitation).
    else if (parent && parent.type !== n.type && !(n.type === 'outcome' && parent.type === 'disease'))
      errors.push(`${where}: parent "${n.parent}" is a ${parent.type}, but this is a ${n.type}`);
    const seen = new Set([n.id]);
    for (let p = n.parent; p && nodes.has(p); p = nodes.get(p).parent) {
      if (seen.has(p)) { errors.push(`${where}: is-a cycle through "${p}"`); break; }
      seen.add(p);
    }
  }

  const edges = [];
  const touches = {};
  const used = new Set();
  const detail = (e, where) => {
    if (e.freq && !FREQS.includes(e.freq)) errors.push(`${where}: freq must be one of ${FREQS.join(', ')}`);
    return { freq: e.freq, note: e.note, source: e.source };
  };
  const check = (id, where, allowed) => {
    const n = nodes.get(id);
    if (!n) { errors.push(`${where}: unknown node "${id}" (add it to nodes.yaml or create Diseases/${id}.yaml)`); return false; }
    if (allowed && !allowed.includes(n.type)) { errors.push(`${where}: "${id}" is a ${n.type}, expected ${allowed.join(' or ')}`); return false; }
    used.add(id);
    return true;
  };

  for (const { file, doc } of diseaseFiles) {
    if (!doc?.id) continue;
    const t = new Set();
    for (const [i, c] of (doc.chain ?? []).entries()) {
      const where = `${file} chain[${i}]`;
      const [from, to] = Array.isArray(c) ? c : [c?.from, c?.to];
      if (!from || !to) { errors.push(`${where}: needs [from, to] or {from, to}`); continue; }
      // A disease is the set of its nodes, not a step in its own chain.
      if (from === doc.id || to === doc.id) { errors.push(`${where}: a disease can't appear in its own chain; start at the root cause`); continue; }
      if (check(from, where) & check(to, where)) { // single & so both ids get reported
        edges.push({ from, to, kind: 'causal', disease: doc.id, ...(Array.isArray(c) ? {} : detail(c, where)) });
        t.add(from).add(to);
      }
    }
    // Membership links from the disease to its chain's root causes, so it attaches to its chain in the network.
    const chainEdges = edges.filter(e => e.disease === doc.id);
    for (const n of t) if (!chainEdges.some(e => e.to === n)) edges.push({ from: doc.id, to: n, kind: 'member', disease: doc.id });
    for (const kind of ['findings', 'outcomes']) {
      for (const [i, f] of (doc[kind] ?? []).entries()) {
        const where = `${file} ${kind}[${i}]`;
        const id = typeof f === 'string' ? f : f?.id;
        const allowed = kind === 'findings' ? ['finding'] : ['outcome', 'disease'];
        if (!id) { errors.push(`${where}: needs an id`); continue; }
        if (check(id, where, allowed)) {
          edges.push({ from: doc.id, to: id, kind: kind.slice(0, -1), disease: doc.id, ...(typeof f === 'string' ? {} : detail(f, where)) });
          t.add(id);
        }
      }
    }
    t.delete(doc.id);
    touches[doc.id] = [...t];
  }

  const unused = [];
  for (const n of nodes.values()) {
    if (n.parent && nodes.has(n.parent)) edges.push({ from: n.id, to: n.parent, kind: 'is-a' });
    // Parents count as used: they exist to group children.
    if (n.type !== 'disease' && !used.has(n.id) && ![...nodes.values()].some(c => c.parent === n.id)) unused.push(n.id);
    delete n.file;
  }
  if (unused.length) warnings.push(`${unused.length} vocabulary node(s) not used by any disease yet: ${unused.join(', ')}`);

  if (errors.length) throw new Error(`${errors.length} error(s):\n  ${errors.join('\n  ')}`);
  return { graph: { nodes: [...nodes.values()], edges, touches }, warnings };
}

export function loadAndBuild(root = ROOT) {
  const vocab = parse(readFileSync(join(root, 'nodes.yaml'), 'utf8'));
  const dir = join(root, 'Diseases');
  const diseaseFiles = readdirSync(dir).filter(f => f.endsWith('.yaml')).sort()
    .map(f => ({ file: `Diseases/${f}`, doc: parse(readFileSync(join(dir, f), 'utf8')) }));
  const result = buildGraph(vocab, diseaseFiles);
  writeFileSync(join(root, 'app/src/graph.json'), JSON.stringify(result.graph));
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const { graph, warnings } = loadAndBuild();
    warnings.forEach(w => console.warn(`warning: ${w}`));
    console.log(`ok: ${graph.nodes.length} nodes, ${graph.edges.length} edges`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

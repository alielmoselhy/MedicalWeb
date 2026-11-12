// Validates nodes.yaml + Diseases/*.yaml and writes app/src/graph.json.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const NODE_TYPES = ['cause', 'finding', 'mechanism', 'outcome'];
const CATEGORIES = { finding: ['symptom', 'sign', 'lab', 'ECG', 'imaging', 'endoscopy', 'histology'], cause: ['organism', 'genetic', 'risk-factor', 'drug', 'condition'] };
const FREQS = ['classic', 'common', 'occasional', 'rare'];
const STATUSES = ['draft', 'reviewed'];
// Disease-file keys, in the order every file writes them (see README, "Standards").
const KEYS = ['id', 'name', 'parent', 'group', 'status', 'systems', 'sources', 'chain', 'findings', 'outcomes'];
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// One citation, several joined by "; ": printed K&C pages (optional box), a Mehlman HY book (optional detail),
// or an LMC teaching handout by year, title and slide numbers.
const CITE = /^(K&C 10e p\.\d+([–-]\d+)?(, \d+([–-]\d+)?)*( \(Box \d+\.\d+\))?|Mehlman HY [A-Za-z-]+( \(.+\))?|LMC 20\d\d [A-Z][A-Za-z -]*? s\.\d+([–-]\d+)?(, \d+([–-]\d+)?)*)$/;
// `parent:` (and `opposite:`) is one id or a list of ids (a node may be a kind of several things).
const idsOf = (key, p, where, errors) => {
  const list = p == null ? [] : Array.isArray(p) ? p : [p];
  if (list.some(x => typeof x !== 'string') || new Set(list).size !== list.length) { errors.push(`${where}: ${key} must be an id or a list of distinct ids`); return []; }
  return list;
};
const parentsOf = (p, where, errors) => idsOf('parent', p, where, errors);
const book = c => c.replace(/ p\..*| \(.*| s\..*/, '');

// vocab: parsed nodes.yaml; diseaseFiles: [{ file, doc }]; syllabus: parsed syllabus.yaml.
// Returns { graph, warnings } or throws with every error listed.
export function buildGraph(vocab, diseaseFiles, syllabus) {
  const errors = [];
  const systems = new Map(syllabus.map(s => [s.id, s]));
  const syllabusIds = syllabus.flatMap(s => [s.id, ...s.groups.map(g => g.id)]);
  for (const x of syllabus.flatMap(s => [s, ...s.groups]))
    if (!ID.test(x.id) || typeof x.name !== 'string' || Object.keys(x).some(k => !['id', 'section', 'name', 'groups'].includes(k)))
      errors.push(`syllabus.yaml (${x.id}): needs a lowercase-with-hyphens id and a name; quote names that contain commas`);
  if (new Set(syllabusIds).size !== syllabusIds.length) errors.push('syllabus.yaml: system and group ids must be unique');
  const warnings = [];
  const nodes = new Map();
  const opposites = [], oppositeEdges = [];

  if (!Array.isArray(vocab)) throw new Error('nodes.yaml: must be a list of nodes');
  for (const n of vocab) {
    const where = `nodes.yaml (${n?.id ?? 'missing id'})`;
    if (!n?.id || !n.name) { errors.push(`${where}: needs id and name`); continue; }
    if (!ID.test(n.id)) errors.push(`${where}: id must be lowercase-with-hyphens`);
    const stray = Object.keys(n).filter(k => !['id', 'name', 'type', 'parent', 'category', 'opposite'].includes(k));
    if (stray.length) errors.push(`${where}: unknown key(s) ${stray.join(', ')}; quote names that contain commas`);
    if (!NODE_TYPES.includes(n.type)) errors.push(`${where}: type must be one of ${NODE_TYPES.join(', ')}`);
    if (n.category && !CATEGORIES[n.type]?.includes(n.category)) errors.push(`${where}: category must be one of ${CATEGORIES[n.type]?.join(', ') ?? '(none for this type)'}`);
    if (nodes.has(n.id)) errors.push(`${where}: duplicate id`);
    nodes.set(n.id, { id: n.id, name: n.name, type: n.type, parents: parentsOf(n.parent, where, errors), category: n.category });
    opposites.push(...idsOf('opposite', n.opposite, where, errors).map(o => [n.id, o, where]));
  }
  // "Works against": written once on either node, stored as one edge per pair. Same type only, never itself.
  const pairs = new Set();
  for (const [a, b, where] of opposites) {
    if (a === b) errors.push(`${where}: can't be its own opposite`);
    else if (!nodes.has(b)) errors.push(`${where}: opposite "${b}" does not exist`);
    else if (nodes.get(b).type !== nodes.get(a).type) errors.push(`${where}: opposite "${b}" is a ${nodes.get(b).type}, but this is a ${nodes.get(a).type}`);
    else if (!pairs.has([a, b].sort().join('|'))) { pairs.add([a, b].sort().join('|')); oppositeEdges.push({ from: a, to: b, kind: 'opposite' }); }
  }

  for (const { file, doc } of diseaseFiles) {
    if (!doc?.id || !doc.name) { errors.push(`${file}: needs id and name`); continue; }
    if (doc.id !== basename(file, '.yaml')) errors.push(`${file}: id "${doc.id}" must match filename`);
    if (!ID.test(doc.id)) errors.push(`${file}: id must be lowercase-with-hyphens`);
    const keys = Object.keys(doc);
    const unknown = keys.filter(k => !KEYS.includes(k));
    if (unknown.length) errors.push(`${file}: unknown key(s) ${unknown.join(', ')}; allowed: ${KEYS.join(', ')}`);
    else if (keys.some((k, i) => i && KEYS.indexOf(k) < KEYS.indexOf(keys[i - 1]))) errors.push(`${file}: keys must be in the order ${KEYS.join(', ')}`);
    if (!STATUSES.includes(doc.status)) errors.push(`${file}: status must be one of ${STATUSES.join(', ')}`);
    if (!Array.isArray(doc.systems) || !doc.systems.length || doc.systems.some(s => !systems.has(s)) || new Set(doc.systems).size !== doc.systems.length)
      errors.push(`${file}: systems must be a list of distinct ids from syllabus.yaml (${[...systems.keys()].join(', ')})`);
    else if (!systems.get(doc.systems[0]).groups.some(g => g.id === doc.group))
      errors.push(`${file}: group "${doc.group}" must be one of ${doc.systems[0]}'s groups in syllabus.yaml (${systems.get(doc.systems[0]).groups.map(g => g.id).join(', ')})`);
    for (const c of doc.sources ?? []) if (!CITE.test(c)) errors.push(`${file}: source "${c}" must look like "K&C 10e p.123", "Mehlman HY Cardio" or "LMC 2026 Cirrhosis s.12"`);
    if (nodes.has(doc.id)) errors.push(`${file}: id "${doc.id}" is already used in ${nodes.get(doc.id).type === 'disease' ? 'another disease file' : 'nodes.yaml'}`);
    nodes.set(doc.id, { id: doc.id, name: doc.name, type: 'disease', parents: parentsOf(doc.parent, file, errors), group: doc.group, systems: doc.systems, status: doc.status, sources: doc.sources ?? [], file });
  }

  for (const n of nodes.values()) {
    const where = n.file ?? `nodes.yaml (${n.id})`;
    for (const id of n.parents) {
      const parent = nodes.get(id);
      if (!parent) errors.push(`${where}: parent "${id}" does not exist`);
      // Same type only, except outcomes and diseases may be kinds of each other (acute MR is a kind of mitral regurgitation; bone metastases is a kind of distant metastases).
      else if (parent.type !== n.type && !([n.type, parent.type].every(t => t === 'outcome' || t === 'disease')))
        errors.push(`${where}: parent "${id}" is a ${parent.type}, but this is a ${n.type}`);
    }
    // Walk every ancestor path; reaching this node again is a cycle.
    const seen = new Set();
    for (const stack = [...n.parents]; stack.length;) {
      const p = stack.pop();
      if (p === n.id) { errors.push(`${where}: is-a cycle`); break; }
      if (seen.has(p) || !nodes.has(p)) continue;
      seen.add(p);
      stack.push(...nodes.get(p).parents);
    }
  }

  const edges = [];
  const touches = {};
  const used = new Set();
  const detail = (e, where, sources) => {
    if (e.freq && !FREQS.includes(e.freq)) errors.push(`${where}: freq must be one of ${FREQS.join(', ')}`);
    for (const c of e.source?.split('; ') ?? []) {
      if (!CITE.test(c)) errors.push(`${where}: source "${c}" must look like "K&C 10e p.123", "Mehlman HY Cardio" or "LMC 2026 Cirrhosis s.12", joined by "; "`);
      else if (!sources.some(s => book(s) === book(c))) errors.push(`${where}: cites ${book(c)}, which is missing from the file's sources`);
    }
    return { freq: e.freq, note: e.note, source: e.source, only: e.only };
  };
  const check = (id, where, allowed) => {
    const n = nodes.get(id);
    if (!n) { errors.push(`${where}: unknown node "${id}" (add it to nodes.yaml or create Diseases/${id}.yaml)`); return false; }
    if (allowed && !allowed.includes(n.type)) { errors.push(`${where}: "${id}" is a ${n.type}, expected ${allowed.join(' or ')}`); return false; }
    used.add(id);
    return true;
  };

  const looseBy = [];
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
        edges.push({ from, to, kind: 'causal', disease: doc.id, ...(Array.isArray(c) ? {} : detail(c, where, doc.sources ?? [])),
          ...(Array.isArray(c.members) && { members: c.members.map(x => x?.id ?? x) }) });
        t.add(from).add(to);
        // A declared bundle: `from` is the class whose shared nature causes `to`; each member is a kind of it here.
        // Only the author can judge that the class is the reason, so bundles are declared, never inferred.
        // A member is an id, or {id, note, source} to keep what is specific to that member.
        if (c.members !== undefined) {
          const m = Array.isArray(c.members) ? c.members : [];
          const ids = m.map(x => typeof x === 'string' ? x : x?.id);
          if (m.length < 2 || ids.some(id => !id) || new Set(ids).size !== ids.length) errors.push(`${where}: members must be a list of 2 or more distinct ids`);
          else for (const [j, x] of m.entries()) {
            const id = ids[j];
            if (id === from || id === to) { errors.push(`${where}: member "${id}" can't be the link's own from or to`); continue; }
            if (!check(id, where)) continue;
            // A disease used as a cause (colorectal cancer in "chronic GI blood loss") counts as a cause here.
            const kind = n => (n.type === 'disease' ? 'cause' : n.type);
            if (kind(nodes.get(id)) !== kind(nodes.get(from))) errors.push(`${where}: member "${id}" is a ${nodes.get(id).type}, but "${from}" is a ${nodes.get(from).type}`);
            edges.push({ from: id, to: from, kind: 'bundled', disease: doc.id, ...(typeof x === 'string' ? {} : detail(x, `${where} members[${j}]`, doc.sources ?? [])) });
            t.add(id);
          }
        }
      }
    }
    // A member that also links straight to its bundle's target says the same thing twice.
    for (const b of edges.filter(e => e.disease === doc.id && e.members))
      for (const id of b.members) if (edges.some(e => e.disease === doc.id && e.kind === 'causal' && e.from === id && e.to === b.to))
        errors.push(`${file}: "${id}" is a member of the ${b.from} bundle, so drop its own link to ${b.to}`);
    // `only` names the cause in this chain that a link applies to (one organism of several).
    const roots = new Set(t);
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
          edges.push({ from: doc.id, to: id, kind: kind.slice(0, -1), disease: doc.id, ...(typeof f === 'string' ? {} : detail(f, where, doc.sources ?? [])) });
          t.add(id);
        }
      }
    }
    for (const e of edges.filter(e => e.disease === doc.id && e.only))
      if (!roots.has(e.only) || nodes.get(e.only).type !== 'cause') errors.push(`${file}: only "${e.only}" on ${e.from} → ${e.to} must be a cause in this file's chain`);
    // Findings and outcomes no chain link reaches float loose on the Explore page; list them until each is linked.
    const loose = [...(doc.findings ?? []), ...(doc.outcomes ?? [])].map(f => typeof f === 'string' ? f : f?.id).filter(id => id && !roots.has(id));
    if (loose.length) looseBy.push(`${doc.id} (${loose.length})`);
    t.delete(doc.id);
    touches[doc.id] = [...t];
  }

  edges.push(...oppositeEdges);
  const unused = [];
  for (const n of nodes.values()) {
    for (const p of n.parents) if (nodes.has(p)) edges.push({ from: n.id, to: p, kind: 'is-a' });
    // Parents count as used: they exist to group children.
    if (n.type !== 'disease' && !used.has(n.id) && ![...nodes.values()].some(c => c.parents.includes(n.id))) unused.push(n.id);
    delete n.file;
  }
  if (looseBy.length) warnings.push(`${looseBy.length} disease(s) have findings or outcomes no chain link reaches: ${looseBy.join(', ')}`);
  if (unused.length) warnings.push(`${unused.length} vocabulary node(s) not used by any disease yet: ${unused.join(', ')}`);

  if (errors.length) throw new Error(`${errors.length} error(s):\n  ${errors.join('\n  ')}`);
  return { graph: { nodes: [...nodes.values()], edges, touches, syllabus }, warnings };
}

export function loadAndBuild(root = ROOT) {
  const vocab = parse(readFileSync(join(root, 'nodes.yaml'), 'utf8'));
  const dir = join(root, 'Diseases');
  const diseaseFiles = readdirSync(dir).filter(f => f.endsWith('.yaml')).sort()
    .map(f => ({ file: `Diseases/${f}`, doc: parse(readFileSync(join(dir, f), 'utf8')) }));
  const result = buildGraph(vocab, diseaseFiles, parse(readFileSync(join(root, 'syllabus.yaml'), 'utf8')));
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

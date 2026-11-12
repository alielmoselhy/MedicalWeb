import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildGraph, loadAndBuild } from './build.js';

const vocab = [
  { id: 'ischaemia', name: 'Ischaemia', type: 'mechanism' },
  { id: 'transmural', name: 'Transmural', type: 'mechanism', parent: 'ischaemia' },
  { id: 'pain', name: 'Pain', type: 'finding', category: 'symptom' },
];
const syllabus = [{ id: 'cardiovascular', name: 'Cardiovascular', groups: [{ id: 'ischaemic', name: 'Ischaemic' }] }, { id: 'respiratory', name: 'Respiratory', groups: [] }];
const KEYS = ['id', 'name', 'parent', 'group', 'status', 'systems', 'syllabi', 'sources', 'chain', 'findings', 'outcomes'];
// A valid disease file with its keys in the standard order; doc overrides the defaults.
const disease = (doc) => ({ file: `Diseases/${doc.id}.yaml`, doc: Object.fromEntries(Object.entries({ name: doc.id, group: 'ischaemic', status: 'draft', systems: ['cardiovascular'], ...doc })
  .sort(([a], [b]) => KEYS.indexOf(a) - KEYS.indexOf(b))) });

test('valid input builds edges and touches', () => {
  const { graph } = buildGraph(vocab, [
    disease({ id: 'mi', chain: [{ from: 'transmural', to: 'pain', note: 'x' }], findings: [{ id: 'pain', freq: 'classic' }], outcomes: ['angina'] }),
    disease({ id: 'angina' }),
  ], syllabus);
  assert.deepEqual(graph.touches.mi.sort(), ['angina', 'pain', 'transmural']);
  assert.ok(graph.edges.some(e => e.kind === 'is-a' && e.from === 'transmural' && e.to === 'ischaemia'));
  assert.equal(graph.edges.find(e => e.kind === 'causal' && e.to === 'pain').note, 'x');
  assert.deepEqual(graph.edges.filter(e => e.kind === 'member').map(e => [e.from, e.to]), [['mi', 'transmural']]); // root only
});

test('diseases can have disease parents and causes can start chains', () => {
  const { graph } = buildGraph([...vocab, { id: 'gene', name: 'Gene', type: 'cause', category: 'genetic' }], [
    disease({ id: 'acs' }),
    disease({ id: 'mi', parent: 'acs', chain: [['gene', 'transmural']] }),
  ], syllabus);
  assert.ok(graph.edges.some(e => e.kind === 'is-a' && e.from === 'mi' && e.to === 'acs'));
  assert.ok(graph.edges.some(e => e.kind === 'member' && e.from === 'mi' && e.to === 'gene'));
});

const rejects = (name, v, files, pattern) =>
  test(`rejects ${name}`, () => assert.throws(() => buildGraph(v, files, syllabus), pattern));

rejects('unknown node id', vocab, [disease({ id: 'mi', chain: [['transmural', 'typo']] })], /unknown node "typo"/);
rejects('missing parent', [{ id: 'a', name: 'A', type: 'mechanism', parent: 'nope' }], [], /parent "nope" does not exist/);
rejects('is-a cycle', [{ id: 'a', name: 'A', type: 'mechanism', parent: 'b' }, { id: 'b', name: 'B', type: 'mechanism', parent: 'a' }], [], /is-a cycle/);
rejects('bad freq', vocab, [disease({ id: 'mi', findings: [{ id: 'pain', freq: 'often' }] })], /freq must be one of/);
rejects('id/filename mismatch', vocab, [{ file: 'Diseases/x.yaml', doc: { id: 'y', name: 'Y', group: 'ischaemic', status: 'draft', systems: ['cardiovascular'] } }], /must match filename/);
rejects('duplicate id across vocab and diseases', vocab, [disease({ id: 'pain' })], /already used in nodes.yaml/);
rejects('wrong type in findings', vocab, [disease({ id: 'mi', findings: ['transmural'] })], /is a mechanism, expected finding/);
rejects('disease in its own chain', vocab, [disease({ id: 'mi', chain: [['mi', 'transmural']] })], /can't appear in its own chain/);
rejects('parent of a different type', [...vocab, { id: 'x', name: 'X', type: 'finding', parent: 'ischaemia' }], [], /is a mechanism, but this is a finding/);
test('a disease may be a kind of an outcome', () => {
  const { graph } = buildGraph([...vocab, { id: 'mets', name: 'Mets', type: 'outcome' }], [disease({ id: 'bone-mets', parent: 'mets' })], syllabus);
  assert.ok(graph.edges.some(e => e.kind === 'is-a' && e.from === 'bone-mets' && e.to === 'mets'));
});
rejects('disease under a mechanism', vocab, [disease({ id: 'mi', parent: 'ischaemia' })], /is a mechanism, but this is a disease/);
rejects('category not allowed for type', [{ id: 'x', name: 'X', type: 'cause', category: 'lab' }], [], /category must be one of organism/);
rejects('unknown system', vocab, [disease({ id: 'mi', systems: ['heart'] })], /systems must be a list/);
rejects('unknown top-level key', vocab, [disease({ id: 'mi', note: 'x' })], /unknown key\(s\) note/);
rejects('keys out of order', vocab, [{ file: 'Diseases/mi.yaml', doc: { id: 'mi', name: 'MI', status: 'draft', group: 'ischaemic', systems: ['cardiovascular'] } }], /keys must be in the order/);
rejects('group not in the home system', vocab, [disease({ id: 'mi', systems: ['respiratory', 'cardiovascular'] })], /group "ischaemic" must be one of respiratory's groups/);
rejects('id not lowercase-with-hyphens', [{ id: 'Bad_id', name: 'X', type: 'mechanism' }], [], /lowercase-with-hyphens/);
rejects('badly formed source', vocab, [disease({ id: 'mi', sources: ['Kumar p.12'] })], /source "Kumar p.12" must look like/);
rejects('edge citing a book missing from sources', vocab, [disease({ id: 'mi', sources: ['K&C 10e p.1'], findings: [{ id: 'pain', source: 'Mehlman HY Cardio' }] })], /cites Mehlman HY Cardio, which is missing/);
test('rejects a syllabus group whose unquoted comma split its name', () => assert.throws(() =>
  buildGraph(vocab, [], [{ id: 'x', name: 'X', groups: [{ id: 'a', name: 'Ischaemic', 'myocardial and pericardial': null }] }]), /quote names that contain commas/));
rejects('vocabulary name split by an unquoted comma', [{ id: 'x', name: 'Soft', 'distant heart sounds': null, type: 'finding' }], [], /unknown key\(s\) distant heart sounds/);
rejects('only naming a node outside the chain', [...vocab, { id: 'bug', name: 'Bug', type: 'cause' }], [disease({ id: 'mi', chain: [['bug', 'transmural']], findings: [{ id: 'pain', only: 'ischaemia' }] })], /only "ischaemia" on mi → pain must be a cause/);
test('only on a finding is kept when it names a chain cause', () => {
  const { graph } = buildGraph([...vocab, { id: 'bug', name: 'Bug', type: 'cause' }], [disease({ id: 'mi', chain: [['bug', 'transmural']], findings: [{ id: 'pain', only: 'bug' }] })], syllabus);
  assert.equal(graph.edges.find(e => e.kind === 'finding').only, 'bug');
});
test('an LMC handout citation is accepted and matched to its book', () => assert.ok(buildGraph(vocab, [disease({ id: 'mi', sources: ['LMC 2026 Cirrhosis s.3-5'], findings: [{ id: 'pain', source: 'LMC 2026 Cirrhosis s.28' }] })], syllabus)));
rejects('bad status', vocab, [disease({ id: 'mi', status: 'done' })], /status must be one of/);

test('warns about findings and outcomes no chain link reaches', () => {
  const { warnings } = buildGraph(vocab, [disease({ id: 'mi', chain: [['ischaemia', 'transmural']], findings: ['pain'] })], syllabus);
  assert.ok(warnings.some(w => w.includes('mi (1)')));
});

const bugs = [...vocab, { id: 'bug', name: 'Bug', type: 'cause' }, { id: 'germ', name: 'Germ', type: 'cause' },
  { id: 'inhaled-bug', name: 'Inhaled bug', type: 'cause' }];
test('a declared bundle links each member to its class', () => {
  const { graph } = buildGraph(bugs, [disease({ id: 'mi', chain: [{ from: 'inhaled-bug', to: 'transmural', members: ['bug', 'germ'] }, ['germ', 'pain']], findings: [{ id: 'pain', only: 'germ' }] })], syllabus);
  assert.deepEqual(graph.edges.find(e => e.kind === 'causal' && e.from === 'inhaled-bug').members, ['bug', 'germ']);
  assert.deepEqual(graph.edges.filter(e => e.kind === 'bundled').map(e => [e.from, e.to]), [['bug', 'inhaled-bug'], ['germ', 'inhaled-bug']]);
  assert.ok(graph.touches.mi.includes('bug'));
});
test('a bundle member can keep its own note', () => {
  const { graph } = buildGraph(bugs, [disease({ id: 'mi', chain: [{ from: 'inhaled-bug', to: 'transmural', members: [{ id: 'bug', note: 'commonest' }, 'germ'] }] })], syllabus);
  assert.equal(graph.edges.find(e => e.kind === 'bundled' && e.from === 'bug').note, 'commonest');
});
test('a disease can be a member of a cause group', () => assert.ok(buildGraph(bugs, [disease({ id: 'ulcer' }),
  disease({ id: 'mi', chain: [{ from: 'inhaled-bug', to: 'transmural', members: ['bug', 'ulcer'] }] })], syllabus)));
rejects('a bundle of one', bugs, [disease({ id: 'mi', chain: [{ from: 'inhaled-bug', to: 'transmural', members: ['bug'] }] })], /2 or more distinct/);
rejects('a member of another type', bugs, [disease({ id: 'mi', chain: [{ from: 'inhaled-bug', to: 'transmural', members: ['bug', 'ischaemia'] }] })], /member "ischaemia" is a mechanism/);
rejects('a member also linked straight to the target', bugs, [disease({ id: 'mi', chain: [{ from: 'inhaled-bug', to: 'transmural', members: ['bug', 'germ'] }, ['bug', 'transmural']] })], /drop its own link/);
test('real data builds', () => assert.ok(loadAndBuild().graph.nodes.length > 0));

test('USMLE citations and syllabi', () => {
  const { graph } = buildGraph(vocab, [disease({ id: 'mi', syllabi: ['usmle'], sources: ['FA 2026 p.306-308', 'Pathoma 2023 p.73', 'StatPearls NBK559016'],
    chain: [{ from: 'ischaemia', to: 'pain', note: 'x', source: 'FA 2026 p.306; StatPearls NBK559016' }], findings: [{ id: 'pain', freq: 'classic' }] }), disease({ id: 'angina' })], syllabus);
  assert.deepEqual(graph.nodes.find(n => n.id === 'mi').syllabi, ['usmle']);
  assert.deepEqual(graph.nodes.find(n => n.id === 'angina').syllabi, ['lmc']);
});
rejects('unknown syllabus', vocab, [disease({ id: 'mi', syllabi: ['step2'] })], /syllabi must be/);
rejects('StatPearls article missing from sources', vocab, [disease({ id: 'mi', sources: ['StatPearls NBK1'], chain: [{ from: 'ischaemia', to: 'pain', source: 'StatPearls NBK2' }] })], /cites StatPearls NBK2/);
rejects('First Aid without a page', vocab, [disease({ id: 'mi', sources: ['FA 2026'] })], /must look like/);

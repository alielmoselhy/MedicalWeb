import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildGraph, loadAndBuild } from './build.js';

const vocab = [
  { id: 'ischaemia', name: 'Ischaemia', type: 'mechanism' },
  { id: 'transmural', name: 'Transmural', type: 'mechanism', parent: 'ischaemia' },
  { id: 'pain', name: 'Pain', type: 'finding', category: 'symptom' },
];
const disease = (doc) => ({ file: `Diseases/${doc.id}.yaml`, doc: { name: doc.id, status: 'draft', ...doc } });

test('valid input builds edges and touches', () => {
  const { graph } = buildGraph(vocab, [
    disease({ id: 'mi', chain: [{ from: 'transmural', to: 'pain', note: 'x' }], findings: [{ id: 'pain', freq: 'classic' }], outcomes: ['angina'] }),
    disease({ id: 'angina' }),
  ]);
  assert.deepEqual(graph.touches.mi.sort(), ['angina', 'pain', 'transmural']);
  assert.ok(graph.edges.some(e => e.kind === 'is-a' && e.from === 'transmural' && e.to === 'ischaemia'));
  assert.equal(graph.edges.find(e => e.kind === 'causal' && e.to === 'pain').note, 'x');
  assert.deepEqual(graph.edges.filter(e => e.kind === 'member').map(e => [e.from, e.to]), [['mi', 'transmural']]); // root only
});

test('diseases can have disease parents and causes can start chains', () => {
  const { graph } = buildGraph([...vocab, { id: 'gene', name: 'Gene', type: 'cause', category: 'genetic' }], [
    disease({ id: 'acs' }),
    disease({ id: 'mi', parent: 'acs', chain: [['gene', 'transmural']] }),
  ]);
  assert.ok(graph.edges.some(e => e.kind === 'is-a' && e.from === 'mi' && e.to === 'acs'));
  assert.ok(graph.edges.some(e => e.kind === 'member' && e.from === 'mi' && e.to === 'gene'));
});

const rejects = (name, v, files, pattern) =>
  test(`rejects ${name}`, () => assert.throws(() => buildGraph(v, files), pattern));

rejects('unknown node id', vocab, [disease({ id: 'mi', chain: [['transmural', 'typo']] })], /unknown node "typo"/);
rejects('missing parent', [{ id: 'a', name: 'A', type: 'mechanism', parent: 'nope' }], [], /parent "nope" does not exist/);
rejects('is-a cycle', [{ id: 'a', name: 'A', type: 'mechanism', parent: 'b' }, { id: 'b', name: 'B', type: 'mechanism', parent: 'a' }], [], /is-a cycle/);
rejects('bad freq', vocab, [disease({ id: 'mi', findings: [{ id: 'pain', freq: 'often' }] })], /freq must be one of/);
rejects('id/filename mismatch', vocab, [{ file: 'Diseases/x.yaml', doc: { id: 'y', name: 'Y', status: 'draft' } }], /must match filename/);
rejects('duplicate id across vocab and diseases', vocab, [disease({ id: 'pain' })], /already used in nodes.yaml/);
rejects('wrong type in findings', vocab, [disease({ id: 'mi', findings: ['transmural'] })], /is a mechanism, expected finding/);
rejects('disease in its own chain', vocab, [disease({ id: 'mi', chain: [['mi', 'transmural']] })], /can't appear in its own chain/);
rejects('parent of a different type', [...vocab, { id: 'x', name: 'X', type: 'finding', parent: 'ischaemia' }], [], /is a mechanism, but this is a finding/);
rejects('category not allowed for type', [{ id: 'x', name: 'X', type: 'cause', category: 'lab' }], [], /category must be one of organism/);
rejects('bad status', vocab, [disease({ id: 'mi', status: 'done' })], /status must be one of/);

test('real data builds', () => assert.ok(loadAndBuild().graph.nodes.length > 0));

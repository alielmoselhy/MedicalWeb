import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LINKS, parseWeb, webQuery, options } from '../app/src/growth.js';

// Real data: run `npm run build:data` first (npm test does not rebuild graph.json).
const { edges } = JSON.parse(readFileSync(new URL('../app/src/graph.json', import.meta.url)));
const links = edges.filter(e => LINKS.includes(e.kind)), isa = edges.filter(e => e.kind === 'is-a');

test('the web round-trips through the address', () => {
  const web = { steps: [['fever'], ['a', 'b'], ['c']], m: 'asthma', s: '', l: 'copd' };
  assert.deepEqual(parseWeb(webQuery(web)), web);
  assert.deepEqual(parseWeb('asthma,copd').steps, [['asthma', 'copd']]);
  assert.deepEqual(parseWeb('').steps, []);
});

test('options rank causes and effects by how many diseases use the link', () => {
  const o = options('fever', links, isa);
  assert.ok(o.from.length > 10);
  assert.ok(o.from.every((x, i) => !i || o.from[i - 1].n >= x.n));
  const used = new Set(links.filter(e => e.to === 'fever').map(e => e.from));
  assert.ok(o.from.every(x => used.has(x.id)));
});

test('following one chain only offers that chain', () => {
  const e = links.find(x => x.to === 'fever');
  const o = options('fever', links.filter(x => x.disease === e.disease), isa);
  assert.ok(o.from.every(x => x.n === 1) && o.from.some(x => x.id === e.from));
});

test('is-a options run both ways', () => {
  assert.deepEqual(options('s-aureus', links, isa).parents.map(x => x.id), ['staphylococci']);
  assert.ok(options('staphylococci', links, isa).kinds.some(x => x.id === 's-aureus'));
});

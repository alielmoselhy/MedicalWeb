import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { bundlesFor, hiddenBy } from '../app/src/bundles.js';

// Real data: run `npm run build:data` first (npm test does not rebuild graph.json).
const { edges } = JSON.parse(readFileSync(new URL('../app/src/graph.json', import.meta.url)));
const CAP = 'community-acquired-pneumonia';

test('bundles come only from declared members', () => {
  const b = bundlesFor([CAP], edges);
  assert.deepEqual(b.map(x => x.id), ['inhaled-respiratory-pathogen']);
  assert.equal(b[0].target, 'droplet-inhalation');
  assert.ok(b[0].ids.includes('legionella-pneumophila'));
  // The risk factors that feed alveolar exudate by different routes are not bundled.
  assert.ok(!b.some(x => x.ids.includes('smoking')));
});

test('closing a bundle folds away its members and what only they lead to', () => {
  const gone = hiddenBy(bundlesFor([CAP], edges), [CAP], [], edges);
  assert.ok(gone.has('legionella-pneumophila'));
  assert.ok(gone.has('low-serum-sodium'), 'Legionella-only finding folds away');
  assert.ok(!gone.has('inhaled-respiratory-pathogen'), 'the class bubble stays');
  assert.ok(!gone.has('droplet-inhalation'));
  assert.ok(!gone.has('fever'), 'reached from the shared chain, so it stays');
  assert.ok(!hiddenBy(bundlesFor([CAP], edges), [CAP], ['low-serum-sodium'], edges).has('low-serum-sodium'), 'seeded nodes stay');
});

test('a member another disease on the web uses stays visible', () => {
  const web = [CAP, 'bacterial-meningitis'];
  const gone = hiddenBy(bundlesFor(web, edges), web, [], edges);
  assert.ok(edges.some(e => e.disease === 'bacterial-meningitis' && e.from === 'streptococcus-pneumoniae'));
  assert.ok(!gone.has('streptococcus-pneumoniae'));
});

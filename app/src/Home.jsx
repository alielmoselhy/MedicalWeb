import { useEffect, useState } from 'react';
import { diseases, edges, inUse, syllabus } from './graph.js';
import { DiseaseList } from './Disease.jsx';
import { go, NodeLink } from './ui.jsx';

// One PQRST beat per 200 units on a baseline of 50, repeated across the strip.
const BEAT = 'h30 q10 -8 20 0 h20 l5 4 l7 -44 l6 52 l7 -12 h25 q15 -14 30 0 h50';
const TRACE = `M0 50 ${Array(8).fill(BEAT).join(' ')}`;

const SHOWCASES = [
  {
    eyebrow: 'Trace a mechanism',
    title: 'See how a cause becomes a clinical finding',
    text: 'Mechanisms are stored as causal steps, not as a flat list. Follow the reasoning in either direction or open the full disease map.',
    stat: '16 causal links in this chain',
    nodes: ['older-age', 'alpha-synuclein-lewy-bodies', 'nigrostriatal-dopamine-loss', 'bradykinesia'],
    join: '→',
    href: '#/disease/parkinsons-disease',
    action: "Follow Parkinson's disease",
  },
  {
    eyebrow: 'Compare diseases',
    title: 'Separate overlap from what is distinctive',
    text: 'Asthma and COPD share important physiology and findings. Their comparison also preserves the causes and mechanisms that distinguish them.',
    stat: '10 exact mapped concepts in common',
    nodes: ['asthma', 'ventilation-perfusion-mismatch', 'copd'],
    join: '↔',
    href: '#/visualize/asthma,copd',
    action: 'Visualize asthma and COPD together',
  },
  {
    eyebrow: 'Reason from a finding',
    title: 'Turn one observation into a structured differential',
    text: 'A finding can lead back to every disease that uses it, ranked by exact and related matches as more observations are added.',
    stat: 'Dyspnoea appears in 19 conditions',
    nodes: ['heart-failure', 'dyspnoea', 'idiopathic-pulmonary-fibrosis'],
    join: '·',
    href: '#/differential/dyspnoea',
    action: 'Start with dyspnoea',
  },
  {
    eyebrow: 'Build the web',
    title: 'Move across systems without losing the thread',
    text: 'Causes, mechanisms, findings and outcomes are reusable concepts. Add diseases to reveal where their pathways meet and where they diverge.',
    stats: [
      [diseases.length, 'diseases'],
      [inUse.size - diseases.length, 'shared concepts'],
      [edges.length.toLocaleString(), 'connections'],
      [syllabus.filter(s => diseases.some(d => d.systems.includes(s.id))).length, 'body systems'],
    ],
    href: '#/visualize',
    action: 'Open the web',
  },
];

function Showcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setActive(i => (i + 1) % SHOWCASES.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = SHOWCASES[active];
  const move = amount => setActive(i => (i + amount + SHOWCASES.length) % SHOWCASES.length);
  return (
    <section className="showcase" aria-label="What MedicalWeb can show"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)} onBlurCapture={e => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}>
      <div className="showcase-copy">
        <div className="eyebrow">{slide.eyebrow}</div>
        <h2>{slide.title}</h2>
        <p>{slide.text}</p>
        <a className="showcase-action" href={slide.href}>{slide.action} <span aria-hidden="true">→</span></a>
      </div>
      <div className="showcase-example" key={active}>
        {slide.nodes && (
          <div className="showcase-path">
            {slide.nodes.map((id, i) => (
              <span className="showcase-step" key={id}>
                {i > 0 && <span className="showcase-join" aria-hidden="true">{slide.join}</span>}
                <NodeLink id={id} />
              </span>
            ))}
          </div>
        )}
        {slide.stat && <strong className="showcase-stat">{slide.stat}</strong>}
        {slide.stats && <div className="showcase-metrics">{slide.stats.map(([value, label]) => (
          <div key={label}><strong>{value}</strong><span>{label}</span></div>
        ))}</div>}
      </div>
      <div className="showcase-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous example">←</button>
        <div className="showcase-dots" role="group" aria-label="Choose an example">
          {SHOWCASES.map((item, i) => <button type="button" key={item.eyebrow} aria-label={`Show: ${item.eyebrow}`}
            aria-pressed={i === active} onClick={() => setActive(i)} />)}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next example">→</button>
      </div>
    </section>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const matches = diseases.filter(d => d.name.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <>
      <section className="hero">
        <svg className="trace" viewBox="0 0 1600 80" preserveAspectRatio="none" aria-hidden="true">
          <path d={TRACE} pathLength="1" />
        </svg>
        <h1>Diseases and what they share</h1>
        <p>Search a condition, then follow its causes, mechanisms, findings and outcomes through a shared map of clinical knowledge.</p>
        <form onSubmit={e => { e.preventDefault(); if (matches[0]) go('disease', [matches[0].id]); }}>
          <input type="search" className="big" placeholder="Find a disease" aria-label="Find a disease" value={query}
            onChange={e => setQuery(e.target.value)} />
        </form>
      </section>
      {query ? (
        <>
          <DiseaseList only={matches} />
          {!matches.length && <p className="muted">No disease matches "{query}". Try part of the name, such as "stenosis".</p>}
        </>
      ) : (
        <Showcase />
      )}
    </>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { byId, diseases, edges, inUse, syllabus } from './graph.js';
import { systemSpotlights, differentRoads, oppositePairs, quizzes, families } from './panels.js';
import { NodeLink } from './ui.jsx';

// The home page's exhibits, shown one at a time on the chart paper. Each starts on a random example (from panels.js)
// and changes only when shuffled. The stage moves to the next slide when the red sweep along its foot runs out;
// a click inside it stops that for good, and without motion (reduced-motion) it never starts.
const pickOther = (n, i) => (n < 2 ? i : (i + 1 + Math.floor(Math.random() * (n - 1))) % n);
function useShuffle(items) {
  const [i, setI] = useState(() => Math.floor(Math.random() * items.length));
  return [items[i], () => setI(j => pickOther(items.length, j))];
}

const ROAD_COLOURS = ['var(--cloud-1)', 'var(--cloud-2)', 'var(--cloud-3)'];

// Three chains from three systems, drawn as lines that converge on one finding.
function Roads({ r }) {
  return (
    <div className="roads">
      <ol className="roads-from">
        {r.roads.map((x, k) => (
          <li key={x.disease} style={{ '--road': ROAD_COLOURS[k] }}>
            <span className="roads-system">{x.system} · <a href={`#/disease/${x.disease}`}>{byId[x.disease].name}</a></span>
            <span className="roads-steps">{x.path.map(id => <NodeLink key={id} id={id} />)}</span>
          </li>
        ))}
      </ol>
      <svg className="roads-lines" viewBox="0 0 100 300" preserveAspectRatio="none" aria-hidden="true">
        {[50, 150, 250].map((y, k) => <path key={y} d={`M0 ${y} C 55 ${y}, 45 150, 100 150`} style={{ stroke: ROAD_COLOURS[k] }} />)}
      </svg>
      <div className="roads-to">
        <a className="roads-finding" href={`#/explore/${r.finding}`}>{byId[r.finding].name}</a>
        <span className="muted">one finding, three mechanisms</span>
      </div>
    </div>
  );
}

// Two opposites at the ends of a balance bar, each pushing outward, with a disease that shows it.
function Balance({ o }) {
  const side = (id, d) => (
    <div className="balance-end">
      <a className="balance-name" href={`#/explore/${id}`}>{byId[id].name}</a>
      <span className="muted">seen in <a href={`#/disease/${d}`}>{byId[d].name}</a></span>
    </div>
  );
  return (
    <div className="balance">
      <svg className="balance-bar draw" viewBox="0 0 400 40" aria-hidden="true">
        <line x1="20" y1="20" x2="380" y2="20" className="balance-axis" />
        <path d="M200 8 V32" className="balance-mid" />
        <path d="M180 20 H40 M52 10 L38 20 L52 30" pathLength="1" />
        <path d="M220 20 H360 M348 10 L362 20 L348 30" pathLength="1" />
      </svg>
      <div className="balance-ends">{side(o.b, o.db)}{side(o.a, o.da)}</div>
    </div>
  );
}

// A disease family as a small tree: the parent, what every kind shares, then one branch per kind with its mark.
function Family({ f }) {
  const n = f.kinds.length;
  return (
    <div className="family-tree">
      <a className="family-root" href={`#/disease/${f.family}`}>{byId[f.family].name}</a>
      <div className="family-shared"><span className="muted">every kind has</span> {f.shared.map(id => <NodeLink key={id} id={id} />)}</div>
      <svg className="family-branches" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true">
        {f.kinds.map((_, k) => <path key={k} d={`M50 0 C 50 30, ${(k + 0.5) * 100 / n} 20, ${(k + 0.5) * 100 / n} 50`} pathLength="1" />)}
      </svg>
      <ul className="family-kinds" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {f.kinds.map(k => (
          <li key={k.kind}>
            <a href={`#/disease/${k.kind}`}>{byId[k.kind].name}</a>
            <NodeLink id={k.mark} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// An index card: the clues on the front, the disease on the back. Turning it is the reader's move.
function Flashcard({ q }) {
  const [turned, setTurned] = useState(false);
  const [cause, mechanism, ...findings] = q.clues;
  return (
    <div className={`flashcard${turned ? ' turned' : ''}`}>
      <div className="flashcard-face front" aria-hidden={turned}>
        <p className="flashcard-prompt">Which disease starts with</p>
        <NodeLink id={cause} tabIndex={turned ? -1 : 0} />
        <p className="flashcard-prompt">works through</p>
        <NodeLink id={mechanism} tabIndex={turned ? -1 : 0} />
        <p className="flashcard-prompt">and shows</p>
        <div>{findings.map(id => <NodeLink key={id} id={id} tabIndex={turned ? -1 : 0} />)}</div>
        <button type="button" onClick={() => setTurned(true)}>Turn the card</button>
      </div>
      <div className="flashcard-face back" aria-hidden={!turned}>
        <p className="flashcard-prompt">It's</p>
        <a className="flashcard-answer" href={`#/disease/${q.disease}`} tabIndex={turned ? 0 : -1}>{byId[q.disease].name}</a>
        <button type="button" onClick={() => setTurned(false)} tabIndex={turned ? 0 : -1}>Turn back</button>
      </div>
    </div>
  );
}

// Every system as a tab; the chosen one shows its most shared mechanisms and findings as bars.
function Atlas({ s, choose, systems }) {
  const bars = (rows, type) => {
    const max = Math.max(...rows.map(r => r.n));
    return (
      <ul className="atlas-bars">
        {rows.map(r => (
          <li key={r.id}>
            <a href={`#/explore/${r.id}`}>{byId[r.id].name}</a>
            <span className="atlas-bar" style={{ '--w': `${(r.n / max) * 100}%`, '--c': `var(--${type})` }} />
            <span className="muted">{r.n}</span>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="atlas">
      <div className="atlas-tabs" role="group" aria-label="Body systems">
        {systems.map(x => <button key={x.system} type="button" aria-pressed={x.system === s.system} onClick={() => choose(x)}>{x.name}</button>)}
      </div>
      <div className="atlas-title"><strong>{s.count}</strong> diseases in {s.name.toLowerCase()}</div>
      <div className="atlas-cols">
        <div><h3>Most shared mechanisms</h3>{bars(s.mechanisms, 'mechanism')}</div>
        <div><h3>Most shared findings</h3>{bars(s.findings, 'finding')}</div>
      </div>
    </div>
  );
}

const SECONDS = 10;
// One PQRST beat per 200 units on a baseline of 50, repeated across the strip.
const BEAT = 'h30 q10 -8 20 0 h20 l5 4 l7 -44 l6 52 l7 -12 h25 q15 -14 30 0 h50';
const TRACE = `M0 50 ${Array(8).fill(BEAT).join(' ')}`;

// The map's size, for the opening slide.
function Size() {
  const n = [[diseases.length, 'diseases'], [(inUse.size - diseases.length).toLocaleString(), 'shared causes, mechanisms, findings and outcomes'],
    [edges.filter(e => e.kind === 'causal').length.toLocaleString(), 'causal links'], [syllabus.filter(x => diseases.some(d => d.systems.includes(x.id))).length, 'body systems']];
  return <dl className="size">{n.map(([v, label]) => <div key={label}><dt>{v}</dt><dd>{label}</dd></div>)}</dl>;
}

// The whole top of the home page: one heading that rotates through the opening line and five exhibits, the search
// box (always there), and the exhibit drawn underneath. While someone searches it rests on the opening slide.
export default function HomeStage({ search, searching }) {
  const data = useMemo(() => ({ roads: differentRoads(), quiz: quizzes(), pairs: oppositePairs(), fams: families(), systems: systemSpotlights() }), []);
  const [road, shuffleRoad] = useShuffle(data.roads);
  const [qi, setQi] = useState(() => Math.floor(Math.random() * data.quiz.length));
  const quiz = data.quiz[qi], stepQuiz = d => setQi(j => (j + d + data.quiz.length) % data.quiz.length);
  const [pair, shufflePair] = useShuffle(data.pairs);
  const [fam, shuffleFam] = useShuffle(data.fams);
  const [sys, shuffleSys] = useShuffle(data.systems);
  const [chosen, setChosen] = useState(null); // a system picked from the atlas buttons
  const slides = [
    { title: 'Diseases and what they share', blurb: 'Search a condition, then follow its causes, mechanisms, findings and outcomes through a shared map of clinical knowledge.', show: <Size /> },
    { title: 'Same finding, different roads', blurb: 'One finding reached through three different mechanisms, from three body systems.', shuffle: shuffleRoad, show: road && <Roads key={road.finding} r={road} /> },
    { title: 'Name the disease', blurb: 'A cause, a mechanism and what it shows. Say your answer, then turn the card.',
      show: quiz && (
        <div className="quiz-deck">
          <button type="button" className="deck-step" onClick={() => stepQuiz(-1)} aria-label="Previous question">‹</button>
          <Flashcard key={quiz.disease} q={quiz} />
          <button type="button" className="deck-step" onClick={() => stepQuiz(1)} aria-label="Next question">›</button>
        </div>
      ) },
    { title: 'Kinds and opposites', blurb: 'What every kind of a disease shares, and two processes that push the same thing opposite ways.',
      shuffle: () => { shufflePair(); shuffleFam(); },
      show: pair && fam && (
        <div className="pairing">
          <div><h3>One family, many kinds</h3><Family key={fam.family} f={fam} /></div>
          <div><h3>Works against</h3><Balance key={pair.a} o={pair} /></div>
        </div>
      ) },
    { title: 'What each system leans on', blurb: 'The mechanisms and findings shared most within one body system.', shuffle: () => { setChosen(null); shuffleSys(); },
      show: sys && <Atlas s={chosen ?? sys} choose={setChosen} systems={data.systems} /> },
  ].filter(x => x.show);
  const [at, setAt] = useState(0);
  const [paused, setPaused] = useState(false);
  // The sweep's progress, 0..1, ticked by a timer that stops while paused, searching, or without motion.
  const [done, setDone] = useState(0);
  useEffect(() => {
    if (paused || searching || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = window.setInterval(() => setDone(d => {
      if (d < 1) return d + 0.1 / SECONDS;
      setAt(k => (k + 1) % slides.length);
      return 0;
    }), 100);
    return () => window.clearInterval(t);
  }, [paused, searching, slides.length]);
  // A click anywhere in the stage stops the rotation for the rest of the visit; hovering doesn't.
  const hold = { onPointerDown: () => setPaused(true) };
  const slide = slides[searching ? 0 : at];
  return (
    <section className="stage" aria-roledescription="carousel" aria-label="MedicalWeb" {...hold}>
      {!searching && (
        <div className="stage-dots" role="group" aria-label="Choose a slide">
          {slides.map((x, k) => <button key={x.title} type="button" aria-label={x.title} title={x.title} aria-pressed={k === at}
            onClick={() => { setAt(k); setDone(0); }} />)}
          {/* Its own press mustn't count as the click that stops the stage. */}
          <button type="button" className={`play${paused ? '' : ' playing'}`} aria-label={paused ? 'Play the slides' : 'Pause the slides'}
            title={paused ? 'Play' : 'Pause'} onPointerDown={e => e.stopPropagation()} onClick={() => setPaused(!paused)} />
        </div>
      )}
      <div className="stage-head" key={`h${searching ? 0 : at}`} aria-live="polite">
        <h1>{slide.title}</h1>
        <p>{slide.blurb}</p>
      </div>
      <div className="stage-search">
        {search}
        {slide.shuffle && <button type="button" className="shuffle" onClick={slide.shuffle}>Shuffle</button>}
      </div>
      <svg className="trace" viewBox="0 0 1600 80" preserveAspectRatio="none" aria-hidden="true"><path d={TRACE} pathLength="1" /></svg>
      {!searching && (
        <>
          <div className="stage-body" key={at}>{slide.show}</div>
          {!paused && <div className="sweep" style={{ transform: `scaleX(${done})` }} aria-hidden="true" />}
        </>
      )}
    </section>
  );
}

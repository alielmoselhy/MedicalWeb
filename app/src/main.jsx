import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { byId } from './graph.js';
import Visualize from './Visualize.jsx';
import Explore from './Explore.jsx';
import Home from './Home.jsx';
import Disease, { DiseaseIndex } from './Disease.jsx';
import Differential from './Differential.jsx';
import Compare from './Compare.jsx';
import './style.css';

// Routes: #/home (default)  #/disease[/disease id or system id]  #/differential[/a,b]  #/visualize[/?w=trail&m=&s=&l=]  #/explore[/node id]
const parseHash = () => {
  const [view = 'home', arg = ''] = location.hash.replace(/^#\/?/, '').split('/');
  const raw = decodeURIComponent(arg);
  // Diseases have one page; an old #/explore/<disease> address opens it.
  if (view === 'explore' && byId[raw]?.type === 'disease') { history.replaceState(null, '', `#/disease/${arg}`); return { view: 'disease', raw, ids: [raw] }; }
  return { view, raw, ids: raw ? raw.split(',').filter(id => byId[id]) : [] };
};

// Not in the main nav: compare is opened from pages; visualize is a subtab of Explore.
const HIDDEN = new Set(['compare', 'visualize']);
const VIEWS = { home: 'Home', disease: 'Diseases', differential: 'Differential', compare: 'Compare', visualize: 'Visualize', explore: 'Explore' };

function App() {
  const [{ view, ids, raw }, setRoute] = useState(parseHash);
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  const page = {
    disease: () => (ids[0] ? <Disease id={ids[0]} key={ids[0]} /> : <DiseaseIndex system={raw} />),
    differential: () => <Differential selected={ids} />,
    compare: () => <Compare ids={ids} />,
    visualize: () => <Visualize raw={raw} />,
    explore: () => <Explore id={ids[0]} key={ids[0]} />,
  }[view] ?? (() => <Home />);

  return (
    <>
      <header>
        <a className="brand" href="#/home">MedicalWeb</a>
        <nav>
          {Object.entries(VIEWS).filter(([v]) => !HIDDEN.has(v)).map(([v, label]) => (
            <a key={v} href={`#/${v}`} aria-current={v === view || (v === 'explore' && view === 'visualize') || (v === 'home' && !VIEWS[view]) ? 'page' : undefined}>{label}</a>
          ))}
        </nav>
      </header>
      <main>
        {(view === 'explore' || view === 'visualize') && (
          <nav className="subtabs" aria-label="Explore views">
            <a href="#/explore" aria-current={view === 'explore' ? 'page' : undefined}>Explore</a>
            <a href="#/visualize" aria-current={view === 'visualize' ? 'page' : undefined}>Visualize</a>
          </nav>
        )}
        {page()}
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

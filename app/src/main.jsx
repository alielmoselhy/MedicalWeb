import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { byId } from './graph.js';
import Visualize from './Explore.jsx';
import Home from './Home.jsx';
import Disease, { DiseaseIndex } from './Disease.jsx';
import Differential from './Differential.jsx';
import Compare from './Compare.jsx';
import './style.css';

// Routes: #/home (default)  #/disease[/id]  #/differential[/a,b]  #/visualize[/ids on the web]  #/explore
const parseHash = () => {
  const [view = 'home', arg = ''] = location.hash.replace(/^#\/?/, '').split('/');
  return { view, ids: arg ? decodeURIComponent(arg).split(',').filter(id => byId[id]) : [] };
};

const VIEWS = { home: 'Home', disease: 'Diseases', differential: 'Differential', compare: 'Compare', visualize: 'Visualize', explore: 'Explore' };

const ExplorePlaceholder = () => (
  <section className="card placeholder">
    <div className="eyebrow">Coming next</div>
    <h1>Explore</h1>
    <p className="muted">This space is ready for the next way of exploring MedicalWeb.</p>
  </section>
);

function App() {
  const [{ view, ids }, setRoute] = useState(parseHash);
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  const page = {
    disease: () => (ids[0] ? <Disease id={ids[0]} key={ids[0]} /> : <><h1>Diseases</h1><DiseaseIndex /></>),
    differential: () => <Differential selected={ids} />,
    compare: () => <Compare ids={ids} />,
    visualize: () => <Visualize seeds={ids} />,
    explore: () => <ExplorePlaceholder />,
  }[view] ?? (() => <Home />);

  return (
    <>
      <header>
        <a className="brand" href="#/home">MedicalWeb</a>
        <nav>
          {Object.entries(VIEWS).filter(([v]) => v !== 'compare').map(([v, label]) => (
            <a key={v} href={`#/${v}`} aria-current={v === view || (v === 'home' && !VIEWS[view]) ? 'page' : undefined}>{label}</a>
          ))}
        </nav>
      </header>
      <main>{page()}</main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

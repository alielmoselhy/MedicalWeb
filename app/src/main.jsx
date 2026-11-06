import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { byId } from './graph.js';
import Explore from './Explore.jsx';
import Disease, { DiseaseList } from './Disease.jsx';
import Differential from './Differential.jsx';
import Compare from './Compare.jsx';
import './style.css';

// Routes: #/explore[/id]  #/disease[/id]  #/differential[/a,b]  #/compare[/a,b,c]
const parseHash = () => {
  const [view = 'explore', arg = ''] = location.hash.replace(/^#\/?/, '').split('/');
  return { view, ids: arg ? decodeURIComponent(arg).split(',').filter(id => byId[id]) : [] };
};

const VIEWS = { explore: 'Explore', disease: 'Diseases', differential: 'Differential', compare: 'Compare' };

function App() {
  const [{ view, ids }, setRoute] = useState(parseHash);
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  const page = {
    disease: () => (ids[0] ? <Disease id={ids[0]} key={ids[0]} /> : <DiseaseList />),
    differential: () => <Differential selected={ids} />,
    compare: () => <Compare ids={ids} />,
  }[view] ?? (() => <Explore focus={ids[0]} />);

  return (
    <>
      <header>
        <strong>MedicalWeb</strong>
        <nav>
          {Object.entries(VIEWS).map(([v, label]) => (
            <a key={v} href={`#/${v}`} aria-current={v === view || (v === 'explore' && !VIEWS[view]) ? 'page' : undefined}>{label}</a>
          ))}
        </nav>
      </header>
      <main>{page()}</main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

import { useState } from 'react';
import { diseases } from './graph.js';
import HomeStage from './HomePanels.jsx';
import { DiseaseList } from './Disease.jsx';
import { go } from './ui.jsx';

// One sheet of chart paper: the rotating stage, with the disease search always in it; results appear below.
export default function Home() {
  const [query, setQuery] = useState('');
  const matches = diseases.filter(d => d.name.toLowerCase().includes(query.trim().toLowerCase()));
  const search = (
    <form onSubmit={e => { e.preventDefault(); if (matches[0]) go('disease', [matches[0].id]); }}>
      <input type="search" className="big" placeholder="Find a disease" aria-label="Find a disease" value={query}
        onChange={e => setQuery(e.target.value)} />
    </form>
  );
  return (
    <>
      <div className="paper"><HomeStage search={search} searching={!!query.trim()} /></div>
      {query.trim() && (
        <>
          <DiseaseList only={matches} />
          {!matches.length && <p className="muted">No disease matches "{query}". Try part of the name, such as "stenosis".</p>}
        </>
      )}
    </>
  );
}

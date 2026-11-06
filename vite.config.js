import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadAndBuild } from './scripts/build.js';

// Rebuilds app/src/graph.json from the YAML data; Vite then hot-reloads it.
function medicalData() {
  const rebuild = (server) => {
    try {
      loadAndBuild().warnings.forEach(w => console.warn(`warning: ${w}`));
    } catch (e) {
      if (!server) throw e;
      console.error(e.message);
      server.ws.send({ type: 'error', err: { message: `Data validation failed\n${e.message}`, stack: '' } });
    }
  };
  return {
    name: 'medical-data',
    buildStart() { rebuild(); },
    configureServer(server) {
      rebuild(server);
      server.watcher.add(['nodes.yaml', 'Diseases']);
      server.watcher.on('all', (_, file) => { if (file.endsWith('.yaml')) rebuild(server); });
    },
  };
}

export default defineConfig({
  root: 'app',
  base: './',
  plugins: [medicalData(), react()],
  build: { outDir: '../dist', emptyOutDir: true },
});

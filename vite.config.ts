import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages : le site est servi sous /<nom-du-repo>/.
// Le workflow de déploiement fournit BASE_PATH ; en local on reste à la racine.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  // Le chunk de la scène (three.js) est lourd mais chargé en différé, après le contenu.
  build: { chunkSizeWarningLimit: 1000 },
  css: {
    modules: { localsConvention: 'camelCaseOnly' },
  },
});

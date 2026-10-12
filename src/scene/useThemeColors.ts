import { useSyncExternalStore } from 'react';

// Les couleurs de la scène viennent des tokens CSS : un seul endroit pour le thème.
const query = '(prefers-color-scheme: light)';

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

function read() {
  const style = getComputedStyle(document.documentElement);
  return ['--color-bg', '--color-accent', '--color-accent-2']
    .map((name) => style.getPropertyValue(name).trim())
    .join('|');
}

export function useThemeColors() {
  // Un snapshot de type string reste stable entre deux lectures identiques.
  const [background, accent, accent2] = useSyncExternalStore(subscribe, read).split('|');
  return { background, accent, accent2 };
}

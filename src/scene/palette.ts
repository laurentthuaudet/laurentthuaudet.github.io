// Couleurs de la plongée, prises dans les jetons Caretta. Elles ne dépendent pas
// du thème clair/sombre : l'océan reste l'océan, seuls les panneaux HTML changent.
export const palette = {
  waterSurface: '#5fb3c7', // lagoon (sombre)
  waterMid: '#1f6378', // lagoon (clair)
  waterDeep: '#0e2a33', // abyss (clair)
  waterAbyss: '#071820', // surface-sunken (sombre)
  glow: '#7fd3c4',
  shallows: '#cfe9e4',
  carapace: '#6b6a2a',
  carapaceLight: '#b0ac52',
  caouanne: '#9a4f22',
  caouanneLight: '#e0925e',
  sand: '#e9e5d9',
  stone: '#4d646b', // ink-muted (clair)
  ink: '#0e2a33',
};

/** Profondeur (unités de scène) parcourue par la caméra entre le haut et le bas de la page. */
export const DIVE_DEPTH = 60;
/** Profondeur affichée par la jauge en bas de page, en mètres. */
export const DIVE_METERS = 40;

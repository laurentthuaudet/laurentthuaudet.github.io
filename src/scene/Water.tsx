import { useLayoutEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Color, Fog, type DirectionalLight, type HemisphereLight } from 'three';
import { DIVE_DEPTH, palette } from './palette';

// Teinte de l'eau selon la profondeur (0 = surface, 1 = fond).
const stops = [
  { at: 0, color: new Color(palette.waterSurface) },
  { at: 0.35, color: new Color(palette.waterMid) },
  { at: 0.7, color: new Color(palette.waterDeep) },
  { at: 1, color: new Color(palette.waterAbyss) },
];

function waterColor(depth: number, target: Color) {
  const t = Math.min(Math.max(depth, 0), 1);
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1];
    const b = stops[i];
    if (t <= b.at) return target.lerpColors(a.color, b.color, (t - a.at) / (b.at - a.at));
  }
  return target.copy(stops[stops.length - 1].color);
}

/** Couleur de fond, brouillard et lumière qui s'assombrissent à mesure qu'on descend. */
export function Water() {
  const scene = useThree((s) => s.scene);
  const [background] = useState(() => new Color(palette.waterSurface));
  const [fog] = useState(() => new Fog(palette.waterSurface, 4, 34));
  const sun = useRef<DirectionalLight>(null);
  const ambient = useRef<HemisphereLight>(null);

  useLayoutEffect(() => {
    scene.background = background;
    scene.fog = fog;
    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [scene, background, fog]);

  useFrame(({ camera }) => {
    const depth = Math.min(Math.max(-camera.position.y / DIVE_DEPTH, 0), 1);
    waterColor(depth, background);
    fog.color.copy(background);
    // La visibilité diminue avec la profondeur.
    fog.far = 34 - depth * 12;
    if (sun.current) sun.current.intensity = 2.4 * (1 - depth) ** 2 + 0.05;
    if (ambient.current) ambient.current.intensity = 1.3 * (1 - depth) + 0.25;
  });

  return (
    <>
      <hemisphereLight ref={ambient} args={[palette.shallows, palette.waterAbyss, 1.3]} />
      <directionalLight ref={sun} position={[3, 20, 5]} color={palette.shallows} intensity={2.4} />
    </>
  );
}

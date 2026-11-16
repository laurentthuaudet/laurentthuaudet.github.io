import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { Bubbles } from './Bubbles';
import { CameraRig } from './CameraRig';
import { FishSchool } from './FishSchool';
import { Jellyfish } from './Jellyfish';
import { Manta } from './Manta';
import { MarineSnow } from './MarineSnow';
import { palette } from './palette';
import { SeaFloor } from './SeaFloor';
import { Surface } from './Surface';
import { Turtle } from './Turtle';
import { useScrollRig } from './useScrollRig';
import { Water } from './Water';
import styles from './Scene.module.css';

const silverFish = [palette.shallows, palette.glow, '#a9c9cf'];
const warmFish = [palette.caouanneLight, '#f0b48a', palette.carapaceLight];

interface SceneProps {
  /** Scène figée (une seule frame rendue) pour `prefers-reduced-motion`. */
  still: boolean;
}

// Export par défaut pour React.lazy : three.js n'est chargé qu'après le contenu HTML.
export default function Scene({ still }: SceneProps) {
  const rig = useScrollRig();
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className={`${styles.scene} no-print`} aria-hidden="true">
      <Canvas
        dpr={dpr}
        frameloop={still ? 'demand' : 'always'}
        camera={{ position: [0, 0, 10], fov: 55, near: 0.1, far: 80 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        {/* Baisse la résolution si le GPU peine, la remonte s'il a de la marge. */}
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
        <AdaptiveDpr />

        <CameraRig rig={rig} />
        <Water />
        <Surface />
        <MarineSnow />
        <Bubbles rig={rig} />

        {/* Faune, de la surface vers le fond */}
        <Turtle y={-7} z={-1} speed={1.3} />
        <FishSchool count={36} y={-17} radius={9} colors={silverFish} size={0.45} />
        <Turtle y={-25} z={-6} scale={0.7} speed={-0.9} offset={12} />
        <Manta y={-31} z={-5} scale={1.4} />
        <FishSchool count={24} y={-38} radius={7} colors={warmFish} size={0.55} speed={-0.22} offset={5} />
        <Jellyfish position={[-4.5, -46, -2]} color={palette.glow} />
        <Jellyfish position={[3.5, -50, -4]} color={palette.shallows} scale={0.8} phase={2} />
        <Jellyfish position={[6, -44, -7]} color={palette.caouanneLight} scale={0.6} phase={4} />
        <Jellyfish position={[-1, -55, -3]} color={palette.glow} scale={1.2} phase={1} />
        <SeaFloor />
      </Canvas>
    </div>
  );
}

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { Background } from './Background';
import { useScrollRig } from './useScrollRig';
import { useThemeColors } from './useThemeColors';
import styles from './Scene.module.css';

interface SceneProps {
  /** Scène figée (une seule frame rendue) pour `prefers-reduced-motion`. */
  still: boolean;
}

// Export par défaut pour React.lazy : three.js n'est chargé qu'après le contenu HTML.
export default function Scene({ still }: SceneProps) {
  const rig = useScrollRig();
  const colors = useThemeColors();
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className={`${styles.scene} no-print`} aria-hidden="true">
      <Canvas
        dpr={dpr}
        frameloop={still ? 'demand' : 'always'}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Baisse la résolution si le GPU peine, la remonte s'il a de la marge. */}
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
        <AdaptiveDpr />
        <Background rig={rig} {...colors} />
      </Canvas>
    </div>
  );
}

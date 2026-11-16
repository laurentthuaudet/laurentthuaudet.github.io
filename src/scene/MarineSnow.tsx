import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Points } from 'three';
import { palette } from './palette';

const COUNT = 2500;

function createPositions() {
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 34;
    positions[i * 3 + 1] = 5 - Math.random() * 72;
    positions[i * 3 + 2] = -14 + Math.random() * 20;
  }
  return positions;
}

/** « Neige marine » : particules en suspension qui donnent la sensation de profondeur. */
export function MarineSnow() {
  const points = useRef<Points>(null);
  const [positions] = useState(createPositions);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={palette.shallows} transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide, type Group } from 'three';

const TENTACLES = 8;

interface JellyfishProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  phase?: number;
}

/** Méduse bioluminescente : ombrelle qui pulse, tentacules qui ondulent. */
export function Jellyfish({ position, color, scale = 1, phase = 0 }: JellyfishProps) {
  const root = useRef<Group>(null);
  const bell = useRef<Group>(null);
  const tentacles = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase;
    const pulse = Math.sin(t * 1.8);
    if (bell.current) bell.current.scale.set(1 + pulse * 0.1, 1 - pulse * 0.12, 1 + pulse * 0.1);
    // Elle remonte un peu à chaque contraction.
    if (root.current) root.current.position.y = position[1] + Math.sin(t * 0.9) * 0.8;
    tentacles.current?.children.forEach((child, i) => {
      child.rotation.x = Math.sin(t * 1.4 + i) * 0.25;
      child.rotation.z = Math.cos(t * 1.1 + i * 0.7) * 0.2;
    });
  });

  return (
    <group ref={root} position={position} scale={scale}>
      <group ref={bell}>
        <mesh>
          <sphereGeometry args={[0.6, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.9}
            transparent
            opacity={0.55}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={0.6}>
          <sphereGeometry args={[0.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.4}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
      <group ref={tentacles}>
        {Array.from({ length: TENTACLES }, (_, i) => {
          const angle = (i / TENTACLES) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(angle) * 0.45, 0, Math.sin(angle) * 0.45]}>
              <mesh position={[0, -0.9, 0]}>
                <cylinderGeometry args={[0.02, 0.005, 1.8, 4]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.5}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

import { useMemo, useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Color, MathUtils, type Group, type Points } from 'three';
import type { RigInput } from './useScrollRig';

const PARTICLE_COUNT = 1800;
/** Profondeur parcourue par la caméra entre le haut et le bas de la page. */
const TRAVEL = 30;

function createParticles(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Un tunnel autour de l'axe Z que la caméra traverse en scrollant.
    const radius = 4 + Math.random() * 10;
    const angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = 5 - Math.random() * (TRAVEL + 15);
  }
  return positions;
}

// Formes flottantes le long du parcours, une par « étape » de scroll.
const shapes = [
  { position: [2.5, 0.5, -2], kind: 'icosahedron' },
  { position: [-3, -1, -9], kind: 'torusKnot' },
  { position: [3, 1.5, -16], kind: 'octahedron' },
  { position: [-2.5, 0, -23], kind: 'torus' },
  { position: [0, -1.5, -30], kind: 'dodecahedron' },
] as const;

interface BackgroundProps {
  rig: RefObject<RigInput>;
  background: string;
  accent: string;
  accent2: string;
}

export function Background({ rig, background, accent, accent2 }: BackgroundProps) {
  const points = useRef<Points>(null);
  const shapesGroup = useRef<Group>(null);
  const positions = useMemo(() => createParticles(PARTICLE_COUNT), []);
  const fogColor = useMemo(() => new Color(background), [background]);

  useFrame((state, delta) => {
    const { scroll, pointerX, pointerY } = rig.current;
    const camera = state.camera;

    // La caméra avance dans le tunnel au fil du scroll, avec un lissage.
    camera.position.z = MathUtils.damp(camera.position.z, 5 - scroll * TRAVEL, 4, delta);
    // Parallaxe : la caméra suit légèrement le pointeur.
    camera.position.x = MathUtils.damp(camera.position.x, pointerX * 0.8, 3, delta);
    camera.position.y = MathUtils.damp(camera.position.y, pointerY * 0.5, 3, delta);
    camera.lookAt(0, 0, camera.position.z - 10);

    if (points.current) points.current.rotation.z += delta * 0.02;
    shapesGroup.current?.children.forEach((child, i) => {
      child.rotation.x += delta * (0.15 + i * 0.03);
      child.rotation.y += delta * 0.2;
    });
  });

  return (
    <>
      <fog attach="fog" args={[fogColor, 6, 26]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={40} color={accent} />
      <pointLight position={[-5, -3, -15]} intensity={40} color={accent2} />

      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color={accent} transparent opacity={0.8} sizeAttenuation depthWrite={false} />
      </points>

      <group ref={shapesGroup}>
        {shapes.map((shape, i) => (
          <Float key={i} position={shape.position} speed={1.5} floatIntensity={1.2} rotationIntensity={0.4}>
            <mesh>
              {shape.kind === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
              {shape.kind === 'torusKnot' && <torusKnotGeometry args={[0.7, 0.22, 96, 12]} />}
              {shape.kind === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
              {shape.kind === 'torus' && <torusGeometry args={[0.8, 0.25, 16, 48]} />}
              {shape.kind === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
              <meshStandardMaterial
                color={i % 2 ? accent2 : accent}
                wireframe={i % 2 === 0}
                roughness={0.35}
                metalness={0.4}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
}

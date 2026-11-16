import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { palette } from './palette';

interface TurtleProps {
  /** Profondeur de nage. */
  y: number;
  z: number;
  scale?: number;
  /** Unités par seconde ; négatif = nage vers la gauche. */
  speed?: number;
  /** Décalage de départ sur le parcours, en secondes. */
  offset?: number;
}

const RANGE = 32;

/** Une caouanne (Caretta caretta) en primitives : carapace à facettes, nageoires animées. */
export function Turtle({ y, z, scale = 1, speed = 1.2, offset = 0 }: TurtleProps) {
  const body = useRef<Group>(null);
  const frontLeft = useRef<Group>(null);
  const frontRight = useRef<Group>(null);
  const rearLeft = useRef<Group>(null);
  const rearRight = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + offset;
    if (!body.current) return;

    // Traverse la scène en boucle, en ondulant doucement.
    const travel = ((t * Math.abs(speed)) % RANGE) - RANGE / 2;
    body.current.position.set(
      speed > 0 ? travel : -travel,
      y + Math.sin(t * 0.6) * 0.6,
      z + Math.sin(t * 0.3) * 1.5,
    );
    body.current.rotation.y = speed > 0 ? Math.PI / 2 : -Math.PI / 2;
    body.current.rotation.z = Math.sin(t * 0.6) * 0.08;
    body.current.rotation.x = -Math.cos(t * 0.6) * 0.1;

    // Battements de nageoires : les avant tirent, les arrière gouvernent.
    const stroke = Math.sin(t * 2.2);
    if (frontLeft.current) frontLeft.current.rotation.z = 0.15 + stroke * 0.55;
    if (frontRight.current) frontRight.current.rotation.z = -0.15 - stroke * 0.55;
    if (rearLeft.current) rearLeft.current.rotation.y = Math.sin(t * 2.2 + 1) * 0.3;
    if (rearRight.current) rearRight.current.rotation.y = -Math.sin(t * 2.2 + 1) * 0.3;
  });

  return (
    <group ref={body} scale={scale}>
      {/* Carapace : icosaèdre aplati, facettes = écailles */}
      <mesh scale={[1, 0.38, 1.25]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={palette.carapace} flatShading roughness={0.75} />
      </mesh>
      {/* Plastron */}
      <mesh position={[0, -0.12, 0]} scale={[0.9, 0.2, 1.12]}>
        <sphereGeometry args={[1, 16, 10]} />
        <meshStandardMaterial color={palette.sand} roughness={0.9} />
      </mesh>
      {/* Tête */}
      <group position={[0, 0.02, 1.35]}>
        <mesh scale={[0.36, 0.3, 0.46]}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color={palette.caouanne} roughness={0.7} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.22, 0.1, 0.22]} scale={0.05}>
            <sphereGeometry args={[1, 8, 6]} />
            <meshStandardMaterial color={palette.ink} />
          </mesh>
        ))}
      </group>
      {/* Nageoires avant (pivot à l'épaule) */}
      <group ref={frontLeft} position={[0.8, -0.05, 0.55]}>
        <mesh position={[0.85, 0, -0.25]} rotation={[0, 0.45, 0]} scale={[0.95, 0.07, 0.3]}>
          <sphereGeometry args={[1, 12, 8]} />
          <meshStandardMaterial color={palette.caouanne} roughness={0.7} />
        </mesh>
      </group>
      <group ref={frontRight} position={[-0.8, -0.05, 0.55]}>
        <mesh position={[-0.85, 0, -0.25]} rotation={[0, -0.45, 0]} scale={[0.95, 0.07, 0.3]}>
          <sphereGeometry args={[1, 12, 8]} />
          <meshStandardMaterial color={palette.caouanne} roughness={0.7} />
        </mesh>
      </group>
      {/* Nageoires arrière */}
      <group ref={rearLeft} position={[0.55, -0.08, -1.0]}>
        <mesh position={[0.2, 0, -0.2]} rotation={[0, 0.6, 0]} scale={[0.32, 0.06, 0.22]}>
          <sphereGeometry args={[1, 10, 6]} />
          <meshStandardMaterial color={palette.caouanne} roughness={0.7} />
        </mesh>
      </group>
      <group ref={rearRight} position={[-0.55, -0.08, -1.0]}>
        <mesh position={[-0.2, 0, -0.2]} rotation={[0, -0.6, 0]} scale={[0.32, 0.06, 0.22]}>
          <sphereGeometry args={[1, 10, 6]} />
          <meshStandardMaterial color={palette.caouanne} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

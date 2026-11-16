import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide, Shape, ShapeGeometry, type Group, type MeshStandardMaterial } from 'three';
import { palette } from './palette';

function createMantaGeometry() {
  const s = new Shape();
  s.moveTo(0, 1.1);
  s.quadraticCurveTo(1.0, 0.9, 2.6, -0.1);
  s.quadraticCurveTo(1.1, -0.3, 0.35, -0.9);
  s.lineTo(0, -1.0);
  s.lineTo(-0.35, -0.9);
  s.quadraticCurveTo(-1.1, -0.3, -2.6, -0.1);
  s.quadraticCurveTo(-1.0, 0.9, 0, 1.1);
  const geometry = new ShapeGeometry(s, 24);
  // À plat, le museau vers +z.
  geometry.rotateX(Math.PI / 2);
  return geometry;
}

const RANGE = 40;

/** Une raie manta qui plane lentement ; le battement des ailes est fait dans le vertex shader. */
export function Manta({
  y,
  z,
  scale = 1,
  speed = 0.9,
}: {
  y: number;
  z: number;
  scale?: number;
  speed?: number;
}) {
  const group = useRef<Group>(null);
  const [geometry] = useState(createMantaGeometry);
  const [time] = useState(() => ({ value: 0 }));

  const onBeforeCompile = (shader: Parameters<MeshStandardMaterial['onBeforeCompile']>[0]) => {
    shader.uniforms.uTime = time;
    shader.vertexShader = `uniform float uTime;\n${shader.vertexShader}`.replace(
      '#include <begin_vertex>',
      /* glsl */ `#include <begin_vertex>
      float span = abs(position.x);
      transformed.y += sin(uTime * 1.4 - span * 0.6) * span * span * 0.12;`,
    );
  };

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    time.value = t;
    if (!group.current) return;
    const travel = ((t * speed) % RANGE) - RANGE / 2;
    group.current.position.set(-travel, y + Math.sin(t * 0.4) * 0.8, z);
    group.current.rotation.set(Math.sin(t * 0.4) * 0.1, -Math.PI / 2, Math.sin(t * 0.3) * 0.12);
  });

  return (
    <group ref={group} scale={scale}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={palette.ink}
          roughness={0.8}
          side={DoubleSide}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
      {/* Queue */}
      <mesh position={[0, 0, -1.9]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.05, 1.8, 5]} />
        <meshStandardMaterial color={palette.ink} />
      </mesh>
    </group>
  );
}

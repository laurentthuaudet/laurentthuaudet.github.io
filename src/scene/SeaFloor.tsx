import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { CylinderGeometry, MeshStandardMaterial, PlaneGeometry } from 'three';
import { palette } from './palette';

const FLOOR_Y = -64;

function createFloor() {
  const geometry = new PlaneGeometry(90, 50, 90, 50);
  geometry.rotateX(-Math.PI / 2);
  const position = geometry.attributes.position;
  // Dunes de sable : quelques sinusoïdes superposées.
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    position.setY(
      i,
      Math.sin(x * 0.18) * 0.8 + Math.sin(z * 0.3 + x * 0.1) * 0.5 + Math.sin(x * 0.9 + z * 0.7) * 0.12,
    );
  }
  geometry.computeVertexNormals();
  return geometry;
}

function createSeaweed(time: { value: number }) {
  const geometry = new CylinderGeometry(0.025, 0.07, 3, 5, 12);
  geometry.translate(0, 1.5, 0); // pied à l'origine
  const material = new MeshStandardMaterial({
    color: palette.carapaceLight,
    emissive: palette.carapace,
    emissiveIntensity: 0.7,
    roughness: 0.8,
  });
  // Ondulation dans le vertex shader, déphasée selon la position de chaque algue.
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = time;
    shader.vertexShader = `uniform float uTime;\n${shader.vertexShader}`.replace(
      '#include <begin_vertex>',
      /* glsl */ `#include <begin_vertex>
      vec4 root = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
      float h = position.y;
      transformed.x += sin(uTime * 1.1 + h * 0.9 + root.x * 0.7) * 0.06 * h * h;
      transformed.z += cos(uTime * 0.8 + h * 0.6 + root.z) * 0.04 * h * h;`,
    );
  };
  return { geometry, material };
}

const seaweed = Array.from({ length: 22 }, (_, i) => ({
  x: -16 + ((i * 37) % 32) + Math.sin(i * 1.7),
  z: -14 + ((i * 13) % 10),
  height: 0.8 + ((i * 7) % 5) * 0.25,
}));

const rocks = [
  { position: [-6, 0.2, -4], scale: [1.6, 1.0, 1.3] },
  { position: [7, 0.1, -8], scale: [2.2, 1.3, 1.6] },
  { position: [3, 0, -2], scale: [0.8, 0.5, 0.7] },
  { position: [-11, 0.3, -10], scale: [2.6, 1.8, 2.0] },
] as const;

/** Le fond marin : dunes de sable, rochers et algues qui ondulent. */
export function SeaFloor() {
  const [floor] = useState(createFloor);
  const [time] = useState(() => ({ value: 0 }));
  const [weed] = useState(() => createSeaweed(time));

  useFrame(({ clock }) => {
    time.value = clock.elapsedTime;
  });

  return (
    <group position={[0, FLOOR_Y, 0]}>
      <mesh geometry={floor}>
        <meshStandardMaterial color={palette.sand} roughness={1} flatShading />
      </mesh>
      {rocks.map((rock, i) => (
        <mesh key={i} position={[...rock.position]} scale={[...rock.scale]} rotation={[i, i * 2, 0]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={palette.stone} roughness={0.9} flatShading />
        </mesh>
      ))}
      {seaweed.map((w, i) => (
        <mesh
          key={i}
          geometry={weed.geometry}
          material={weed.material}
          position={[w.x, 0, w.z]}
          scale={[1, w.height, 1]}
        />
      ))}
    </group>
  );
}

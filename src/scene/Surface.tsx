import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Color, DoubleSide, PlaneGeometry, ShaderMaterial } from 'three';
import { palette } from './palette';

const SURFACE_Y = 5;

function createWaves() {
  const geometry = new PlaneGeometry(90, 40, 48, 24);
  // Face tournée vers le bas : on la voit depuis l'eau.
  geometry.rotateX(Math.PI / 2);
  return { geometry, base: Float32Array.from(geometry.attributes.position.array) };
}

/** La surface de l'eau vue d'en dessous, qui ondule. */
function Waves() {
  const [{ geometry, base }] = useState(createWaves);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = base[i * 3];
      const z = base[i * 3 + 2];
      position.setY(i, Math.sin(x * 0.35 + t * 0.9) * 0.25 + Math.cos(z * 0.5 + t * 0.7) * 0.2);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh geometry={geometry} position={[0, SURFACE_Y, -10]}>
      <meshStandardMaterial
        color={palette.glow}
        emissive={palette.glow}
        emissiveIntensity={0.7}
        transparent
        opacity={0.6}
        side={DoubleSide}
      />
    </mesh>
  );
}

const rayVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const rayFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uSeed;
  varying vec2 vUv;
  void main() {
    float edges = smoothstep(0.0, 0.5, vUv.x) * smoothstep(1.0, 0.5, vUv.x);
    float fade = smoothstep(0.0, 1.0, vUv.y);
    float flicker = 0.55 + 0.45 * sin(uTime * 0.7 + uSeed * 6.2831);
    gl_FragColor = vec4(uColor, edges * fade * flicker * 0.16);
  }
`;

const rays = Array.from({ length: 8 }, (_, i) => ({
  x: -11 + i * 3 + Math.sin(i * 7.3) * 1.2,
  z: -6 + Math.cos(i * 3.1) * 3,
  width: 1.2 + (i % 3) * 0.7,
  tilt: 0.25 + Math.sin(i) * 0.08,
  seed: i / 8,
}));

function createRayMaterial(seed: number) {
  return new ShaderMaterial({
    vertexShader: rayVertex,
    fragmentShader: rayFragment,
    uniforms: { uColor: { value: new Color(palette.shallows) }, uTime: { value: 0 }, uSeed: { value: seed } },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: DoubleSide,
  });
}

/** Rayons de soleil qui traversent l'eau près de la surface. */
function LightRays() {
  const [materials] = useState(() => rays.map((ray) => createRayMaterial(ray.seed)));

  useFrame(({ clock }) => {
    for (const material of materials) material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group position={[0, SURFACE_Y - 11, 0]}>
      {rays.map((ray, i) => (
        <mesh key={i} position={[ray.x, 0, ray.z]} rotation={[0, 0, ray.tilt]} material={materials[i]}>
          <planeGeometry args={[ray.width, 24]} />
        </mesh>
      ))}
    </group>
  );
}

export function Surface() {
  return (
    <>
      <Waves />
      <LightRays />
    </>
  );
}

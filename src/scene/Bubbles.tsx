import { useRef, useState, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Object3D, Vector3, type InstancedMesh } from 'three';
import { palette } from './palette';
import type { RigInput } from './useScrollRig';

const AMBIENT = 160;
const TRAIL = 70;
const COUNT = AMBIENT + TRAIL;
const SURFACE_Y = 4.5;
/** Plan (en z) où naissent les bulles qui suivent le pointeur. */
const TRAIL_Z = 3;
const TRAIL_LIFE = 5;

interface Bubble {
  position: Vector3;
  size: number;
  speed: number;
  phase: number;
  /** Âge en secondes, pour les bulles du sillage ; -1 = inactive. */
  age: number;
}

function placeAmbient(bubble: Bubble, cameraY: number, spread: number) {
  bubble.position.set(
    (Math.random() - 0.5) * 20,
    cameraY - 10 - Math.random() * spread,
    -7 + Math.random() * 10,
  );
}

function createBubbles(): Bubble[] {
  return Array.from({ length: COUNT }, (_, i) => {
    const size = 0.03 + Math.random() ** 3 * 0.12;
    const bubble = {
      position: new Vector3(),
      size,
      speed: 0.6 + size * 12,
      phase: Math.random() * 6.28,
      age: -1,
    };
    // Les bulles d'ambiance démarrent réparties sur tout le champ de vision.
    if (i < AMBIENT) placeAmbient(bubble, 18, 20);
    return bubble;
  });
}

/**
 * Bulles qui remontent vers la surface autour de la caméra, plus un sillage de
 * bulles émis là où passe le pointeur.
 */
export function Bubbles({ rig }: { rig: RefObject<RigInput> }) {
  const mesh = useRef<InstancedMesh>(null);
  const [bubbles] = useState(createBubbles);
  const [dummy] = useState(() => new Object3D());
  const [pointer] = useState(() => new Vector3());
  const next = useRef(AMBIENT);
  const lastEmit = useRef(0);

  useFrame(({ camera, clock }, delta) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    const cameraY = camera.position.y;

    // Sillage : une bulle toutes les 40 ms tant que le pointeur bouge.
    const moving = performance.now() - rig.current.pointerMovedAt < 80;
    if (moving && t - lastEmit.current > 0.04) {
      lastEmit.current = t;
      pointer
        .set(rig.current.pointerX, rig.current.pointerY, 0.5)
        .unproject(camera)
        .sub(camera.position)
        .normalize();
      const distance = (TRAIL_Z - camera.position.z) / pointer.z;
      const bubble = bubbles[next.current];
      bubble.position.copy(camera.position).addScaledVector(pointer, distance);
      bubble.age = 0;
      next.current = next.current + 1 >= COUNT ? AMBIENT : next.current + 1;
    }

    bubbles.forEach((bubble, i) => {
      const isTrail = i >= AMBIENT;
      if (isTrail) {
        if (bubble.age < 0) {
          dummy.scale.setScalar(0);
          dummy.updateMatrix();
          mesh.current!.setMatrixAt(i, dummy.matrix);
          return;
        }
        bubble.age += dt;
        if (bubble.age > TRAIL_LIFE || bubble.position.y > SURFACE_Y) bubble.age = -1;
      } else if (bubble.position.y > Math.min(cameraY + 10, SURFACE_Y)) {
        placeAmbient(bubble, cameraY, 6);
      } else if (bubble.position.y < cameraY - 18) {
        // La caméra est remontée vite : on replace la bulle sous elle.
        placeAmbient(bubble, cameraY, 6);
      }

      bubble.position.y += bubble.speed * dt;
      bubble.position.x += Math.sin(t * 2 + bubble.phase) * 0.004;

      // Les bulles du sillage grossissent en remontant, puis disparaissent.
      const grow = isTrail ? Math.min(1, bubble.age * 3) * (1 - bubble.age / TRAIL_LIFE) : 1;
      dummy.position.copy(bubble.position);
      dummy.scale.set(bubble.size, bubble.size * (0.9 + Math.sin(t * 6 + bubble.phase) * 0.08), bubble.size);
      dummy.scale.multiplyScalar(grow);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <sphereGeometry args={[1, 12, 8]} />
      <meshStandardMaterial
        color={palette.shallows}
        emissive={palette.glow}
        emissiveIntensity={0.25}
        roughness={0.05}
        metalness={0.1}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}

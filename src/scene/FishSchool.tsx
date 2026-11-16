import { useLayoutEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, ConeGeometry, Object3D, SphereGeometry, Vector3, type InstancedMesh } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

function createFishGeometry() {
  const body = new SphereGeometry(0.5, 10, 8);
  body.scale(1, 0.42, 0.2);
  const tail = new ConeGeometry(0.22, 0.35, 4);
  tail.rotateZ(-Math.PI / 2); // la pointe vers le corps
  tail.scale(1, 1, 0.25);
  tail.translate(-0.62, 0, 0);
  const fish = mergeGeometries([body, tail])!;
  // Le poisson regarde vers +z, la convention de Object3D.lookAt.
  fish.rotateY(-Math.PI / 2);
  return fish;
}

interface FishSchoolProps {
  count: number;
  y: number;
  /** Rayon de la boucle que suit le banc. */
  radius: number;
  colors: string[];
  size?: number;
  speed?: number;
  offset?: number;
}

/** Un banc de poissons qui tourne en boucle ; chaque poisson suit le centre avec son propre retard. */
export function FishSchool({
  count,
  y,
  radius,
  colors,
  size = 0.5,
  speed = 0.18,
  offset = 0,
}: FishSchoolProps) {
  const mesh = useRef<InstancedMesh>(null);
  const [geometry] = useState(createFishGeometry);
  const [fish] = useState(() =>
    Array.from({ length: count }, () => ({
      offset: new Vector3((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 3),
      lag: Math.random() * 1.5,
      phase: Math.random() * 6.28,
      scale: size * (0.75 + Math.random() * 0.5),
    })),
  );
  const [dummy] = useState(() => new Object3D());
  const [ahead] = useState(() => new Vector3());

  useLayoutEffect(() => {
    const color = new Color();
    fish.forEach((_, i) => mesh.current?.setColorAt(i, color.set(colors[i % colors.length])));
    if (mesh.current?.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [fish, colors]);

  const center = (t: number, target: Vector3) =>
    target.set(
      Math.sin(t * speed) * radius,
      y + Math.sin(t * speed * 2.3) * 1.2,
      Math.cos(t * speed) * radius * 0.4 - 4,
    );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime + offset;
    fish.forEach((f, i) => {
      const ft = t - f.lag;
      center(ft, dummy.position).add(f.offset);
      dummy.position.y += Math.sin(ft * 1.5 + f.phase) * 0.15;
      center(ft + 0.1, ahead).add(f.offset);
      dummy.lookAt(ahead);
      // Battement de queue : le corps entier ondule autour de son axe.
      dummy.rotateY(Math.sin(ft * 9 + f.phase) * 0.18);
      dummy.scale.setScalar(f.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial roughness={0.45} metalness={0.35} />
    </instancedMesh>
  );
}

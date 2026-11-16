import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { DIVE_DEPTH } from './palette';
import type { RigInput } from './useScrollRig';

/** La caméra descend avec le scroll et suit légèrement le pointeur (parallaxe). */
export function CameraRig({ rig }: { rig: RefObject<RigInput> }) {
  useFrame(({ camera }, delta) => {
    const { scroll, pointerX, pointerY } = rig.current;
    camera.position.y = MathUtils.damp(camera.position.y, -scroll * DIVE_DEPTH + pointerY * 0.4, 3, delta);
    camera.position.x = MathUtils.damp(camera.position.x, pointerX * 1.2, 2, delta);
    camera.lookAt(camera.position.x * 0.4, camera.position.y - 0.6, 0);
  });

  return null;
}

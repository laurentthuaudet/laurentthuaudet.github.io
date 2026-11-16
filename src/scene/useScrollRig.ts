import { useEffect, useRef } from 'react';

export interface RigInput {
  /** Progression du scroll sur la page, de 0 (haut) à 1 (bas). */
  scroll: number;
  /** Position du pointeur normalisée de -1 à 1 sur chaque axe. */
  pointerX: number;
  pointerY: number;
  /** Instant (performance.now) du dernier mouvement du pointeur. */
  pointerMovedAt: number;
}

/**
 * Suit le scroll et le pointeur au niveau de la fenêtre. Le canvas est en
 * `pointer-events: none` derrière le contenu, donc les événements R3F ne
 * l'atteignent pas : on lit directement ceux de `window`.
 * Retourne une ref (pas de re-render) lue à chaque frame dans `useFrame`.
 */
export function useScrollRig() {
  const input = useRef<RigInput>({ scroll: 0, pointerX: 0, pointerY: 0, pointerMovedAt: -Infinity });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      input.current.scroll = max > 0 ? window.scrollY / max : 0;
    };
    const onPointer = (e: PointerEvent) => {
      input.current.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      input.current.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
      input.current.pointerMovedAt = performance.now();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return input;
}

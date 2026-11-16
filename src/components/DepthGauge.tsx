import { useEffect, useRef } from 'react';
import { DIVE_METERS } from '../scene/palette';
import styles from './Header.module.css';

/** Profondeur de plongée affichée en bas à droite ; mise à jour sans re-render. */
export function DepthGauge() {
  const value = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const depth = max > 0 ? (window.scrollY / max) * DIVE_METERS : 0;
      if (value.current) value.current.textContent = `${Math.round(depth)} m`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <p className={styles.gauge} aria-hidden="true">
      <span className="label">Profondeur</span>
      <span ref={value} className={styles.gaugeValue}>
        0 m
      </span>
    </p>
  );
}

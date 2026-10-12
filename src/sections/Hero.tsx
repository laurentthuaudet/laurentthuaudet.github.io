import { cv } from '../data/cv';
import styles from './Hero.module.css';

export function Hero() {
  const { name, title, tagline, location, pdf } = cv.profile;

  return (
    <section id="top" className={styles.hero} aria-label="Présentation">
      <p className={styles.kicker}>{title}</p>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.tagline}>{tagline}</p>
      <p className={styles.location}>{location}</p>
      <div className={`${styles.actions} no-print`}>
        <a className={styles.primary} href="#contact">
          Me contacter
        </a>
        {pdf ? (
          <a className={styles.secondary} href={`${import.meta.env.BASE_URL}${pdf}`} download>
            Télécharger le CV (PDF)
          </a>
        ) : (
          <button type="button" className={styles.secondary} onClick={() => window.print()}>
            Imprimer le CV
          </button>
        )}
      </div>
    </section>
  );
}

import { Section } from '../components/Section';
import card from '../components/Card.module.css';
import { cv } from '../data/cv';
import styles from './About.module.css';

export function About() {
  return (
    <Section id="about" title="À propos">
      <div className={`${card.card} ${styles.grid}`}>
        <div className={styles.text}>
          {cv.profile.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <dl className={styles.facts}>
          <div>
            <dt>Formation</dt>
            {cv.education.map((ed) => (
              <dd key={ed.degree}>
                {ed.degree} — {ed.school} ({ed.year})
              </dd>
            ))}
          </div>
          <div>
            <dt>Langues</dt>
            {cv.languages.map((lang) => (
              <dd key={lang.name}>
                {lang.name} : {lang.level}
              </dd>
            ))}
          </div>
        </dl>
      </div>
    </Section>
  );
}

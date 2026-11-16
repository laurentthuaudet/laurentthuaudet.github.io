import { Section } from '../components/Section';
import { cv } from '../data/cv';
import styles from './About.module.css';

export function About() {
  return (
    <Section id="about" title="Profil">
      <div className={styles.grid}>
        <div className={styles.text}>
          {cv.profile.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <dl className={styles.facts}>
          <div>
            <dt className="label">Formation</dt>
            {cv.education.map((ed) => (
              <dd key={ed.degree}>
                {ed.degree} — {ed.school} ({ed.year})
              </dd>
            ))}
          </div>
          {cv.languages.length > 0 && (
            <div>
              <dt className="label">Langues</dt>
              {cv.languages.map((lang) => (
                <dd key={lang.name}>
                  {lang.name} : {lang.level}
                </dd>
              ))}
            </div>
          )}
        </dl>
      </div>
    </Section>
  );
}

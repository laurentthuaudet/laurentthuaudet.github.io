import { Section } from '../components/Section';
import { TagList } from '../components/TagList';
import card from '../components/Card.module.css';
import { cv } from '../data/cv';
import styles from './Experience.module.css';

const monthFormat = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });

/** 'AAAA-MM' → « décembre 2021 » ; 'AAAA' reste tel quel. */
function formatDate(value: string) {
  const [year, month] = value.split('-').map(Number);
  return month ? monthFormat.format(new Date(year, month - 1)) : String(year);
}

export function Experience() {
  return (
    <Section id="experience" title="Expériences professionnelles">
      <ol className={styles.timeline}>
        {cv.experiences.map((exp) => (
          <li key={`${exp.role}-${exp.start}`} className={`${card.card} ${styles.item}`}>
            <header className={styles.head}>
              <p className={styles.meta}>
                <time dateTime={exp.start}>{formatDate(exp.start)}</time>
                {' – '}
                {exp.end ? <time dateTime={exp.end}>{formatDate(exp.end)}</time> : 'aujourd’hui'}
                {exp.location && ` · ${exp.location}`}
              </p>
              <h3>
                {exp.role}
                {exp.company && <span className={styles.company}> · {exp.company}</span>}
              </h3>
            </header>
            {exp.summary && <p>{exp.summary}</p>}
            {exp.highlights.length > 0 && (
              <ul className={styles.highlights}>
                {exp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            {exp.clients && (
              <p className={styles.clients}>
                <span className="label">Clients</span> {exp.clients.join(', ')}
              </p>
            )}
            <TagList tags={exp.stack} label="Environnement" />
          </li>
        ))}
      </ol>
    </Section>
  );
}

import { Section } from '../components/Section';
import { TagList } from '../components/TagList';
import card from '../components/Card.module.css';
import { cv } from '../data/cv';
import styles from './Experience.module.css';

const monthFormat = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric' });

function formatMonth(value: string | null) {
  if (!value) return 'aujourd’hui';
  const [year, month] = value.split('-').map(Number);
  return monthFormat.format(new Date(year, month - 1));
}

export function Experience() {
  return (
    <Section id="experience" title="Expérience">
      <ol className={styles.timeline}>
        {cv.experiences.map((exp) => (
          <li key={`${exp.company}-${exp.start}`} className={`${card.card} ${styles.item}`}>
            <header className={styles.head}>
              <h3 className={styles.role}>
                {exp.role} <span className={styles.company}>· {exp.company}</span>
              </h3>
              <p className={styles.meta}>
                <time dateTime={exp.start}>{formatMonth(exp.start)}</time> –{' '}
                {exp.end ? <time dateTime={exp.end}>{formatMonth(exp.end)}</time> : formatMonth(null)}
                {exp.location && ` · ${exp.location}`}
              </p>
            </header>
            <p>{exp.summary}</p>
            <ul className={styles.highlights}>
              {exp.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <TagList tags={exp.stack} label="Technologies utilisées" />
          </li>
        ))}
      </ol>
    </Section>
  );
}

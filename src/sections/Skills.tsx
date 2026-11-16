import { Section } from '../components/Section';
import { TagList } from '../components/TagList';
import card from '../components/Card.module.css';
import { cv } from '../data/cv';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <Section id="skills" title="Compétences clés">
      <div className={styles.grid}>
        {cv.skills.map((group) => (
          <div key={group.label} className={`${card.card} ${styles.group}`}>
            <h3>{group.label}</h3>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className={styles.subtitle}>Environnement technique</h3>
      <dl className={styles.stack}>
        {cv.stack.map((group) => (
          <div key={group.label} className={styles.row}>
            <dt className="label">{group.label}</dt>
            <dd>
              <TagList tags={group.items} label={group.label} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

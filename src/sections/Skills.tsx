import { Section } from '../components/Section';
import { TagList } from '../components/TagList';
import card from '../components/Card.module.css';
import { cv } from '../data/cv';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <Section id="skills" title="Compétences">
      <div className={styles.grid}>
        {cv.skills.map((group) => (
          <div key={group.label} className={`${card.card} ${styles.group}`}>
            <h3 className={styles.label}>{group.label}</h3>
            <TagList tags={group.skills} label={group.label} />
          </div>
        ))}
      </div>
    </Section>
  );
}

import { Section } from '../components/Section';
import { TagList } from '../components/TagList';
import card from '../components/Card.module.css';
import { cv } from '../data/cv';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <Section id="projects" title="Projets">
      <ul className={styles.grid}>
        {cv.projects.map((project) => (
          <li key={project.name} className={`${card.card} ${styles.project}`}>
            <h3 className={styles.name}>{project.name}</h3>
            <p className={styles.description}>{project.description}</p>
            <TagList tags={project.stack} label="Technologies" />
            {(project.url || project.repo) && (
              <p className={styles.links}>
                {project.url && <a href={project.url}>Voir le site</a>}
                {project.repo && <a href={project.repo}>Code source</a>}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

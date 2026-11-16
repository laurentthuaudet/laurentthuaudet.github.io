import { cv } from '../data/cv';
import { DepthGauge } from './DepthGauge';
import styles from './Header.module.css';

const navItems = [
  { id: 'about', label: 'Profil' },
  { id: 'experience', label: 'Expériences' },
  { id: 'skills', label: 'Compétences' },
  ...(cv.projects.length > 0 ? [{ id: 'projects', label: 'Projets' }] : []),
  { id: 'contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className={`${styles.header} no-print`}>
      <a href="#top" className={styles.brand}>
        {cv.profile.name}
        <span className="visually-hidden"> — retour en haut</span>
      </a>
      <div className={styles.end}>
        <nav aria-label="Sections du CV" className={styles.navWrap}>
          <ul className={styles.nav}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <DepthGauge />
      </div>
    </header>
  );
}

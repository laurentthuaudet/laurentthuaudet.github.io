import { cv } from '../data/cv';
import styles from './Header.module.css';

export const navItems = [
  { id: 'about', label: 'À propos' },
  { id: 'experience', label: 'Expérience' },
  { id: 'skills', label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
] as const;

export function Header() {
  return (
    <header className={`${styles.header} no-print`}>
      <a href="#top" className={styles.brand}>
        {cv.profile.name
          .split(' ')
          .map((part) => part[0])
          .join('')}
        <span className="visually-hidden"> — retour en haut</span>
      </a>
      <nav aria-label="Sections du CV" className={styles.navWrap}>
        <ul className={styles.nav}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

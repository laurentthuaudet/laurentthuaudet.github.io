import { Section } from '../components/Section';
import card from '../components/Card.module.css';
import { cv } from '../data/cv';
import styles from './Contact.module.css';

export function Contact() {
  const { email, links } = cv.contact;

  return (
    <Section id="contact" title="Contact">
      <div className={`${card.card} ${styles.contact}`}>
        <p>Une opportunité, une question ou simplement envie d’échanger ? Écris-moi.</p>
        <a className={styles.email} href={`mailto:${email}`}>
          {email}
        </a>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

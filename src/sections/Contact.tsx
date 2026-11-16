import { Section } from '../components/Section';
import { cv } from '../data/cv';
import styles from './Contact.module.css';

export function Contact() {
  const { email, links } = cv.contact;

  return (
    <Section id="contact" title="Contact">
      <div className={styles.contact}>
        <p>Une mission, un poste ou une question technique ? Écrivez-moi.</p>
        <a className={styles.email} href={`mailto:${email}`}>
          {email}
        </a>
        {links.length > 0 && (
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}

// Toutes les données du CV. Remplace les valeurs « placeholder » par ton vrai parcours :
// les sections et la scène 3D se mettent à jour automatiquement.

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  about: string[];
  /** Chemin relatif à /public, ou null pour masquer le bouton. */
  pdf: string | null;
}

export interface Experience {
  role: string;
  company: string;
  location?: string;
  start: string; // 'AAAA-MM'
  end: string | null; // null = poste actuel
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  url?: string;
  repo?: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface Contact {
  email: string;
  links: { label: string; url: string }[];
}

export interface CV {
  profile: Profile;
  experiences: Experience[];
  skills: SkillGroup[];
  projects: Project[];
  education: Education[];
  languages: { name: string; level: string }[];
  contact: Contact;
}

export const cv: CV = {
  profile: {
    name: 'Laurent Thuaudet',
    title: 'Développeur Full-Stack',
    tagline: 'Je conçois des applications web soignées, du back-end à l’interface.',
    location: 'France',
    about: [
      'Placeholder — présente-toi en 2 ou 3 phrases : ton métier, ce qui te motive, ce que tu apportes à une équipe.',
      'Placeholder — un second paragraphe sur ta façon de travailler ou ce que tu cherches aujourd’hui.',
    ],
    pdf: null,
  },
  experiences: [
    {
      role: 'Développeur Full-Stack',
      company: 'Entreprise A',
      location: 'Paris',
      start: '2022-01',
      end: null,
      summary: 'Placeholder — contexte du poste et périmètre en une phrase.',
      highlights: [
        'Placeholder — réalisation chiffrée (ex. temps de chargement divisé par 2).',
        'Placeholder — projet marquant ou responsabilité clé.',
      ],
      stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    },
    {
      role: 'Développeur Web',
      company: 'Entreprise B',
      location: 'Lyon',
      start: '2019-09',
      end: '2021-12',
      summary: 'Placeholder — contexte du poste et périmètre en une phrase.',
      highlights: ['Placeholder — réalisation marquante.', 'Placeholder — autre réalisation.'],
      stack: ['JavaScript', 'Vue.js', 'PHP'],
    },
  ],
  skills: [
    { label: 'Front-end', skills: ['TypeScript', 'React', 'Three.js', 'CSS'] },
    { label: 'Back-end', skills: ['Node.js', 'PostgreSQL', 'REST', 'GraphQL'] },
    { label: 'Outils', skills: ['Git', 'Docker', 'CI/CD', 'Linux'] },
  ],
  projects: [
    {
      name: 'CV interactif',
      description: 'Ce site : un CV en HTML accessible sur fond de scène 3D réactive (React Three Fiber).',
      stack: ['React', 'React Three Fiber', 'Vite'],
      repo: 'https://github.com/',
    },
    {
      name: 'Projet perso',
      description: 'Placeholder — décris un projet dont tu es fier en une ou deux phrases.',
      stack: ['TypeScript'],
    },
  ],
  education: [{ degree: 'Placeholder — Diplôme', school: 'Placeholder — École', year: '2019' }],
  languages: [
    { name: 'Français', level: 'Langue maternelle' },
    { name: 'Anglais', level: 'Professionnel' },
  ],
  contact: {
    email: 'laurent.thuaudet@gmail.com',
    links: [
      { label: 'GitHub', url: 'https://github.com/' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    ],
  },
};

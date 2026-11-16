// Toutes les données du CV : les sections se mettent à jour automatiquement.

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  about: string[];
  /** Chemin relatif à /public, ou null pour proposer l'impression à la place. */
  pdf: string | null;
}

export interface Experience {
  role: string;
  company?: string;
  location?: string;
  start: string; // 'AAAA' ou 'AAAA-MM'
  end: string | null; // null = poste actuel
  summary?: string;
  highlights: string[];
  stack: string[];
  clients?: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
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
  /** Compétences clés, rédigées en phrases. */
  skills: SkillGroup[];
  /** Environnement technique, affiché sous forme d'étiquettes. */
  stack: SkillGroup[];
  projects: Project[];
  education: Education[];
  languages: { name: string; level: string }[];
  contact: Contact;
}

export const cv: CV = {
  profile: {
    name: 'Laurent Thuaudet',
    title: 'Ingénieur fullstack',
    tagline: '15 ans d’applications métiers à forts enjeux, du socle Symfony à l’interface Angular.',
    location: 'Bordeaux',
    about: [
      'Ingénieur fullstack avec 15 ans d’expérience sur des applications métiers à forts enjeux, à dominante backend PHP / Symfony.',
      'Ex-lead technique, j’interviens sur la conception, l’évolution et la qualité d’architectures applicatives, avec un fort accent sur la maintenabilité, la performance et le travail en équipe.',
    ],
    pdf: null,
  },
  experiences: [
    {
      role: 'Développeur backend Symfony / Angular – Lead technique',
      company: 'Scalian',
      location: 'Bordeaux',
      start: '2021-12',
      end: '2026-03',
      summary: 'Intervention sur plusieurs applications métiers à forts enjeux fonctionnels et techniques.',
      highlights: [
        'Référent backend Symfony sur plusieurs produits et plateformes web',
        'Conception et évolution d’API REST exposant des données critiques',
        'Participation aux choix d’architecture et à la structuration du socle technique',
        'Encadrement technique : revues de code, accompagnement de développeurs',
        'Amélioration de la qualité logicielle et des performances backend',
        'Contribution aux pipelines CI/CD et aux processus de livraison',
        'Rédaction de documentation technique (DAT)',
      ],
      stack: ['Symfony', 'PHP 8', 'Angular', 'Docker', 'PostgreSQL'],
      clients: ['IRSN', 'Bordeaux Métropole', 'ADEME'],
    },
    {
      role: 'Développeur Fullstack senior PHP / Symfony',
      company: 'Scalian',
      start: '2019-07',
      end: '2021-12',
      summary: 'Développement backend et frontend sur applications métiers.',
      highlights: [
        'Migration d’applications existantes vers des architectures modernes (Symfony / Angular)',
        'Développement d’API REST',
        'Migration de bases de données Oracle vers PostgreSQL',
        'Contribution aux déploiements cloud et à l’automatisation',
      ],
      stack: ['PHP', 'Symfony', 'Angular', 'Java / Spring Boot', 'NodeJS', 'PostgreSQL'],
      clients: ['RTE', 'ADEME', 'Sanofi'],
    },
    {
      role: 'Développeur PHP / Drupal',
      company: 'Smile',
      start: '2018-03',
      end: '2019-06',
      summary: 'Développement et maintenance d’applications web.',
      highlights: ['Interventions backend et frontend sur projets Drupal'],
      stack: ['PHP', 'Drupal'],
    },
    {
      role: 'Développeur Web',
      company: 'Sopra Steria / CGI',
      start: '2017',
      end: '2018',
      summary: 'Développement backend et frontend.',
      highlights: ['Maintenance et évolution d’applications existantes'],
      stack: [],
    },
    {
      role: 'Développeur Web et Logiciel',
      start: '2009',
      end: '2016',
      highlights: [],
      stack: ['PHP', 'JavaScript', 'C++'],
    },
  ],
  skills: [
    {
      label: 'Backend / Architecture',
      items: [
        'PHP 7/8, Symfony, API REST',
        'Conception et évolution d’architectures applicatives',
        'Optimisation des performances applicatives et SQL',
        'Rédaction de documentation technique et d’API',
      ],
    },
    {
      label: 'Frontend',
      items: ['Angular, TypeScript', 'HTML5, CSS3 / SCSS'],
    },
    {
      label: 'Qualité & Delivery',
      items: [
        'Revue de code, bonnes pratiques, qualité logicielle',
        'CI/CD, Docker, Git',
        'Méthodologie Agile (Scrum)',
      ],
    },
  ],
  stack: [
    { label: 'Backend', items: ['PHP 7/8', 'Symfony', 'API REST'] },
    { label: 'Frontend', items: ['Angular', 'TypeScript'] },
    { label: 'Bases de données', items: ['PostgreSQL', 'MySQL', 'Oracle', 'MariaDB'] },
    { label: 'DevOps', items: ['Docker', 'CI/CD', 'Git', 'Kubernetes (en contexte projet)'] },
    { label: 'Autres', items: ['Java', 'NodeJS', 'Shell Unix'] },
  ],
  projects: [],
  education: [
    { degree: 'Licence Informatique', school: 'EPSI Bordeaux', year: '2009' },
    { degree: 'DUT Informatique', school: 'IUT Bordeaux 1', year: '2008' },
  ],
  languages: [],
  contact: {
    email: 'laurent.thuaudet@hotmail.fr',
    links: [
      { label: 'GitHub', url: 'https://github.com/laurentthuaudet' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/laurent-thuaudet-030461182/' },
    ],
  },
};

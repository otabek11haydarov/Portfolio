export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  resumeUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Languages' | 'Data & Analytics' | 'Frameworks' | 'Tools';
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  repo: string;
  emoji: string;
}

export interface Experience {
  id?: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export const profile: Profile = {
  name: 'Otabek Haydarov',
  title: 'Software Engineer & Data Analyst',
  tagline: 'I turn messy data into clean insights and clean code into great products.',
  email: 'otabek11haydarov@gmail.com',
  github: 'https://github.com/otabek11haydarov',
  linkedin: 'https://www.linkedin.com/in/otabek-haydarov',
  location: 'Tashkent, Uzbekistan',
  resumeUrl: '/resume.pdf',
};

export const aboutText =
  'I’m a Data Analyst with a solid engineering foundation, focused on turning complex datasets into clear, actionable business insights. While my primary drive is data exploration, dashboarding, and analytics workflows, my background in web development allows me to bridge the gap between backend data pipelines and intuitive interfaces. I care deeply about data integrity, analytical clarity, and delivering metrics that drive confident decisions.';

export const skills: Skill[] = [
  { name: 'Python', level: 95, category: 'Languages' },
  { name: 'TypeScript', level: 45, category: 'Languages' },
  { name: 'SQL', level: 92, category: 'Languages' },
  { name: 'JavaScript', level: 88, category: 'Languages' },
  { name: 'React', level: 50, category: 'Frameworks' },
  { name: 'Node.js', level: 85, category: 'Frameworks' },
  { name: 'FastAPI', level: 35, category: 'Frameworks' },
  { name: 'Pandas / NumPy', level: 20, category: 'Data & Analytics' },
  { name: 'Tableau', level: 25, category: 'Data & Analytics' },
  { name: 'Power BI', level: 80, category: 'Data & Analytics' },
  { name: 'Git', level: 90, category: 'Tools' },
  { name: 'Figma', level: 68, category: 'Tools' },
];

export const projects: Project[] = [
  {
    title: 'E-Commerce Profitability Analysis',
    description:
      'End-to-end analytics project auditing 2,000+ orders in PostgreSQL to identify unit economics, shipping margin leakage (13% vs 31%), and multi-channel marketing ROAS.',
    tags: ['PostgreSQL', 'Python', 'SQL', 'Data Analytics'],
    link: 'https://github.com/otabek11haydarov/E-Commerce-Profitability-Analysis',
    repo: 'https://github.com/otabek11haydarov/E-Commerce-Profitability-Analysis',
    emoji: '📊',
  },
  {
    title: 'U.S. Electric Vehicle Market Share Analysis',
    description:
      'End-to-end data analytics project evaluating 287M+ registered vehicles across 51 jurisdictions to uncover EV adoption trends, alternative fuel penetration, and charging infrastructure priorities.',
    tags: ['PostgreSQL', 'Python', 'Tableau', 'SQL'],
    link: 'https://github.com/otabek11haydarov/Analyzing-US-Electric-Vehicle-Market-Share',
    repo: 'https://github.com/otabek11haydarov/Analyzing-US-Electric-Vehicle-Market-Share',
    emoji: '⚡',
  },
];

export const experience: Experience[] = [
  {
    role: 'Open to Work — Seeking Internship / Junior Role',
    company: 'Available for Opportunities (Tashkent / Remote)',
    period: '2025 — Present',
    description:
      'Actively open for Internship and Junior Data Analyst / Software Engineer positions. Ready to bring value with solid skills in Python, SQL, Power BI, React, TypeScript, and automated data pipelines.',
  },
];

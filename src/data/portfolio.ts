export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Languages' | 'Data & Analytics' | 'Frameworks' | 'Tools';
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  repo: string;
  emoji: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const profile = {
  name: 'Otabek Haydarov',
  title: 'Software Engineer & Data Analyst',
  tagline: 'I turn messy data into clean insights and clean code into great products.',
  email: 'otabek11haydarov@gmail.com',
  github: 'https://github.com/otabek11haydarov',
  linkedin: 'https://linkedin.com/in/jordanrivera',
  location: 'Tashkent, Uzbekistan',
};

export const aboutText = `I’m a Data Analyst with a solid engineering foundation, focused on turning complex datasets into clear, actionable business insights. While my primary drive is data exploration, dashboarding, and analytics workflows, my background in web development allows me to bridge the gap between backend data pipelines and intuitive interfaces. I care deeply about data integrity, analytical clarity, and delivering metrics that drive confident decisions.`;

export const skills: Skill[] = [
  { name: 'Python', level: 95, category: 'Languages' },
  { name: 'TypeScript', level: 45, category: 'Languages' },
  { name: 'SQL', level: 92, category: 'Languages' },
  { name: 'JavaScript', level: 88, category: 'Languages' },
  { name: 'React', level: 90, category: 'Frameworks' },
  { name: 'Node.js', level: 85, category: 'Frameworks' },
  { name: 'FastAPI', level: 82, category: 'Frameworks' },
  { name: 'Pandas / NumPy', level: 20, category: 'Data & Analytics' },
  { name: 'Tableau', level: 5, category: 'Data & Analytics' },
  { name: 'Power BI', level: 80, category: 'Data & Analytics' },
  { name: 'scikit-learn', level: 20, category: 'Data & Analytics' },
  { name: 'Docker', level: 10, category: 'Tools' },
  { name: 'Git', level: 90, category: 'Tools' },
  { name: 'AWS', level: 10, category: 'Tools' },
  { name: 'Figma', level: 68, category: 'Tools' },
];

export const projects: Project[] = [
  {
    title: 'Revenue Forecasting Dashboard',
    description:
      'Built an interactive dashboard that forecasts quarterly revenue using time-series models. Reduced forecast error by 23% compared to the previous spreadsheet-based approach.',
    tags: ['Python', 'Prophet', 'React', 'D3.js'],
    link: '#',
    repo: '#',
    emoji: '📈',
  },
  {
    title: 'Customer Churn Pipeline',
    description:
      'Designed an end-to-end ETL pipeline that ingests 2M+ rows daily, applies a gradient-boosted churn model, and pushes at-risk accounts to the CRM in real time.',
    tags: ['Python', 'Airflow', 'PostgreSQL', 'scikit-learn'],
    link: '#',
    repo: '#',
    emoji: '🔄',
  },
  {
    title: 'Analytics Component Library',
    description:
      'An open-source React component library for embedding charts and KPI cards in any app. 1.2k+ GitHub stars and used by 30+ teams.',
    tags: ['TypeScript', 'React', 'Tailwind', 'Vite'],
    link: '#',
    repo: '#',
    emoji: '🧩',
  },
  {
    title: 'Natural Language Query Engine',
    description:
      'A tool that lets non-technical users ask questions in plain English and get SQL results back. Powered by an LLM with a validated SQL-generation guard layer.',
    tags: ['Python', 'FastAPI', 'LLM', 'PostgreSQL'],
    link: '#',
    repo: '#',
    emoji: '💬',
  },
  {
    title: 'Realtime Sentiment Tracker',
    description:
      'Streams tweets and product reviews through a sentiment model and visualizes trends on a live map. Handles 500 events/sec with sub-second latency.',
    tags: ['Kafka', 'Python', 'WebSocket', 'React'],
    link: '#',
    repo: '#',
    emoji: '🗺️',
  },
  {
    title: 'Personal Finance Visualizer',
    description:
      'A web app that categorizes transactions automatically and shows spending breakdowns with interactive charts. Featured on a popular dev showcase.',
    tags: ['TypeScript', 'React', 'Supabase', 'Recharts'],
    link: '#',
    repo: '#',
    emoji: '💰',
  },
];

export const experience: Experience[] = [
  {
    role: 'Senior Data Analyst',
    company: 'Northwind Analytics',
    period: '2023 — Present',
    description:
      'Lead analyst for the growth team. Built the experimentation platform, automated weekly reporting, and partnered with engineering on data quality initiatives.',
  },
  {
    role: 'Full-Stack Developer',
    company: 'Brightwave Labs',
    period: '2020 — 2023',
    description:
      'Developed customer-facing dashboards and internal tools using React and Node.js. Shipped the analytics module used by 10k+ daily active users.',
  },
  {
    role: 'Data Engineer',
    company: 'Crestline Financial',
    period: '2018 — 2020',
    description:
      'Built and maintained ETL pipelines feeding the risk and compliance teams. Migrated legacy reporting to a modern cloud data stack.',
  },
];

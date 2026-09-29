const tech = [
  'Python', 'TypeScript', 'React', 'SQL', 'Pandas', 'Tableau',
  'Node.js', 'FastAPI', 'Docker', 'AWS', 'PostgreSQL', 'scikit-learn',
  'Power BI', 'Git', 'NumPy', 'Tailwind',
];

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-8 border-y border-white/5 bg-[#0c121f]">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...tech, ...tech].map((t, i) => (
          <span
            key={i}
            className="mx-6 font-display font-semibold text-lg text-slate-600"
          >
            {t}
            <span className="text-sky-500/40 ml-6">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

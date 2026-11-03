const tech = [
  'Python', 'TypeScript', 'React', 'SQL', 'Pandas', 'Tableau',
  'Node.js', 'FastAPI', 'PostgreSQL', 'scikit-learn',
  'Power BI', 'Git', 'NumPy', 'Tailwind',
];

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-8 border-y border-amber-900/30 bg-[#1c0f09]">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...tech, ...tech].map((t, i) => (
          <span
            key={i}
            className="mx-6 font-display font-semibold text-lg text-amber-200/40 hover:text-amber-100 transition-colors cursor-default"
          >
            {t}
            <span className="text-[#f07f3c]/50 ml-6">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

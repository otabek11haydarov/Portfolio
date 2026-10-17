import { useMemo } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { usePortfolio, type Skill } from '@/context/PortfolioContext';

const categories: Skill['category'][] = ['Languages', 'Data & Analytics', 'Frameworks', 'Tools'];

const categoryIcons: Record<string, string> = {
  Languages: '{ }',
  'Data & Analytics': '📊',
  Frameworks: '⚙',
  Tools: '🛠',
};

export default function Skills() {
  const { ref, visible } = useReveal();
  const { data } = usePortfolio();
  const { skills } = data;

  const grouped = useMemo(() => {
    const map = new Map<string, Skill[]>();
    for (const cat of categories) {
      map.set(cat, skills.filter((s) => s.category === cat));
    }
    return map;
  }, [skills]);


  return (
    <section id="skills" className="relative py-28 px-6 bg-[#0c121f]">
      <div ref={ref} className={`max-w-5xl mx-auto reveal ${visible ? 'is-visible' : ''}`}>
        <p className="text-sky-400 font-display font-semibold text-sm tracking-widest uppercase mb-3">
          Skills
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">
          Tools I use to build and analyze
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={cat}
              className="interactive-card p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              style={{ '--card-idx': idx } as React.CSSProperties}
            >
              <h3 className="flex items-center gap-2.5 font-display font-semibold text-lg text-slate-200 mb-6">
                <span className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm">
                  {categoryIcons[cat]}
                </span>
                <span>{cat}</span>
              </h3>
              <div className="space-y-4">
                {grouped.get(cat)?.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-sky-400 font-mono text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800/80 overflow-hidden">
                      <div
                        className="skill-bar-animated h-full rounded-full"
                        style={{ width: visible ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useReveal } from '@/hooks/useReveal';
import { usePortfolio } from '@/context/PortfolioContext';

const stats = [
  { value: 'Open', label: 'For Internship' },
  { value: '5+', label: 'Projects Completed' },
  { value: '10+', label: 'Technologies Used' },
  { value: '100%', label: 'Dedication & Focus' },
];

export default function About() {
  const { ref, visible } = useReveal();
  const { data } = usePortfolio();
  const { aboutText } = data;

  return (
    <section id="about" className="relative py-28 px-6">
      <div ref={ref} className={`max-w-5xl mx-auto reveal ${visible ? 'is-visible' : ''}`}>
        <p className="text-[#f07f3c] font-display font-semibold text-sm tracking-widest uppercase mb-3">
          About
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-8 text-white">
          A bit about my background
        </h2>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3">
            <p className="text-amber-100/90 text-lg leading-relaxed mb-6">{aboutText}</p>
            <p className="text-amber-200/70 leading-relaxed">
              When I’m not analyzing data or building projects, you’ll find me exploring predictive models, diving into data visualization techniques, and learning new technologies.
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className="interactive-card stat-card-float rounded-2xl bg-[#21140e]/50 border border-amber-900/40 p-5 text-center transition-all duration-300 backdrop-blur-sm"
                style={{ '--card-idx': idx } as React.CSSProperties}
              >
                <p className="font-display font-bold text-3xl bg-gradient-to-r from-[#f07f3c] via-[#ffd2a8] to-[#f07f3c] bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-xs text-amber-200/70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

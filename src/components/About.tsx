import { useReveal } from '@/hooks/useReveal';
import { usePortfolio } from '@/context/PortfolioContext';

const stats = [
  { value: '< 1', label: 'Year Experience' },
  { value: '5+', label: 'Projects Delivered' },
  { value: '2M+', label: 'Rows Processed Daily' },
  { value: '100%', label: 'Data-Driven Focus' },
];

export default function About() {
  const { ref, visible } = useReveal();
  const { data } = usePortfolio();
  const { aboutText } = data;


  return (
    <section id="about" className="relative py-28 px-6">
      <div ref={ref} className={`max-w-5xl mx-auto reveal ${visible ? 'is-visible' : ''}`}>
        <p className="text-sky-400 font-display font-semibold text-sm tracking-widest uppercase mb-3">
          About
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-8">
          A bit about my background
        </h2>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">{aboutText}</p>
            <p className="text-slate-400 leading-relaxed">
              When I’m not analyzing data or building projects, you’ll find me exploring predictive models, diving into data visualization techniques, and learning new technologies.
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 text-center hover:border-sky-500/30 hover:bg-sky-500/[0.03] transition-all duration-300"
              >
                <p className="font-display font-bold text-3xl bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-xs text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

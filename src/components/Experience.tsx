import { Briefcase, ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Experience() {
  const { ref, visible } = useReveal();
  const { data } = usePortfolio();
  const { experience } = data;

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="relative py-28 px-6 bg-[#0c121f]">
      <div ref={ref} className={`max-w-4xl mx-auto reveal ${visible ? 'is-visible' : ''}`}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sky-400 font-display font-semibold text-sm tracking-widest uppercase mb-3">
              Career & Pathway
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Experience & Opportunities
            </h2>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all self-start sm:self-auto group btn-interactive btn-cta-glow"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to Work — Available for Internship</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="relative pl-8 border-l border-white/10 space-y-10">
          {experience.map((e) => (
            <div key={e.id || `${e.company}-${e.role}`} className="relative">
              <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center">
                <Briefcase className="w-2 h-2 text-sky-400" />
              </div>
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-sky-500/20 transition-colors duration-300">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-display font-semibold text-lg text-slate-100">{e.role}</h3>
                  <span className="text-xs text-slate-500 font-medium">{e.period}</span>
                </div>
                <p className="text-sky-400 text-sm font-medium mb-3">{e.company}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

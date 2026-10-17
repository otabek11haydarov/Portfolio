import { ExternalLink, Github } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Projects() {
  const { ref, visible } = useReveal();
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <section id="projects" className="relative py-28 px-6">
      <div ref={ref} className={`max-w-6xl mx-auto reveal ${visible ? 'is-visible' : ''}`}>
        <p className="text-sky-400 font-display font-semibold text-sm tracking-widest uppercase mb-3">
          Projects
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">
          Selected work
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.id || p.title}

              className="group relative rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-sky-500/30 hover:bg-sky-500/[0.02] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{p.emoji}</div>
              <h3 className="font-display font-semibold text-lg text-slate-100 mb-2 group-hover:text-sky-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{p.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${p.title}`}
                  className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-sky-400 transition-colors px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-sky-500/30 btn-interactive"
                >
                  <ExternalLink className="w-4 h-4" /> Live
                </a>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code of ${p.title}`}
                  className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-sky-400 transition-colors px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-sky-500/30 btn-interactive"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

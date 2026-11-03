import { ExternalLink, Github, Terminal } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { usePortfolio } from '@/context/PortfolioContext';

const getLivePlaygroundUrl = (title: string, defaultLink: string) => {
  const lower = title.toLowerCase();
  if (lower.includes('commerce') || lower.includes('profitability')) {
    return '/playground.html?project=ecommerce';
  }
  if (lower.includes('electric') || lower.includes('vehicle') || lower.includes('ev')) {
    return '/playground.html?project=ev';
  }
  if (lower.includes('component')) {
    return '/playground.html?project=components';
  }
  return defaultLink;
};

export default function Projects() {
  const { ref, visible } = useReveal();
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <section id="projects" className="relative py-28 px-6">
      <div ref={ref} className={`max-w-6xl mx-auto reveal ${visible ? 'is-visible' : ''}`}>
        <p className="text-[#f07f3c] font-display font-semibold text-sm tracking-widest uppercase mb-3">
          Projects & Live Playground
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 text-white">
          Selected work & Sandbox
        </h2>

        {/* Live Playground Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 p-5 rounded-2xl bg-[#21140e]/60 border border-amber-900/40 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#f07f3c]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Interactive SQL & Data Workbench Available</span>
            </div>
            <p className="text-sm text-amber-200/80 max-w-2xl">
              Endilikda har bir loyiha uchun interaktiv <strong className="text-white">Live Playground</strong> mavjud: PostgreSQL soʻrovlarini bajarish, unit economics tahlili va metrikalarni bevosita brauzeringizda sinab koʻring.
            </p>
          </div>
          <a
            href="/playground.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-xs shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all btn-interactive shrink-0"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch Live Playground</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => {
            const liveUrl = getLivePlaygroundUrl(p.title, p.link);
            const isPlayground = liveUrl.includes('playground.html');

            return (
              <article
                key={p.id || p.title}
                className="interactive-card group relative rounded-2xl bg-[#21140e]/60 border border-amber-900/40 p-6 flex flex-col justify-between"
                style={{ '--card-idx': idx } as React.CSSProperties}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{p.emoji}</span>
                    {isPlayground && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Playground
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-[#f07f3c] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-amber-200/70 leading-relaxed mb-4">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#3b1b10]/60 border border-amber-900/40 text-xs text-amber-200/80 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-amber-900/30">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo of ${p.title}`}
                    className="flex items-center gap-1.5 text-sm text-amber-200/80 hover:text-[#f07f3c] transition-colors px-3 py-1.5 rounded-lg bg-white/[0.03] border border-amber-900/40 hover:border-[#f07f3c]/40 btn-interactive"
                  >
                    <ExternalLink className="w-4 h-4 text-[#f07f3c]" />
                    <span>Live {isPlayground ? 'Sandbox' : 'Demo'}</span>
                  </a>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View source code of ${p.title}`}
                    className="flex items-center gap-1.5 text-sm text-amber-200/80 hover:text-[#f07f3c] transition-colors px-3 py-1.5 rounded-lg bg-white/[0.03] border border-amber-900/40 hover:border-[#f07f3c]/40 btn-interactive"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

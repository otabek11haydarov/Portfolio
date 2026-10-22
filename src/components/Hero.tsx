import { useState, useRef, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, MapPin, FileDown, ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const resumeOptions = [
  {
    code: 'en',
    label: 'English',
    badge: 'EN',
    flag: '🇬🇧',
    description: 'Standard International CV',
    url: '/resume-en.pdf',
    fileName: 'Otabek_Haydarov_Resume_EN.pdf',
  },
  {
    code: 'ru',
    label: 'Русский',
    badge: 'RU',
    flag: '🇷🇺',
    description: 'Резюме на русском языке',
    url: '/resume-ru.pdf',
    fileName: 'Otabek_Haydarov_Resume_RU.pdf',
  },
  {
    code: 'uz',
    label: 'Oʻzbekcha',
    badge: 'UZ',
    flag: '🇺🇿',
    description: 'Oʻzbek tilidagi rezyume',
    url: '/resume-uz.pdf',
    fileName: 'Otabek_Haydarov_Resume_UZ.pdf',
  },
];

export default function Hero() {
  const { data } = usePortfolio();
  const { profile } = data;
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(event.target as Node)) {
        setIsResumeOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsResumeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDownload = (option: typeof resumeOptions[0]) => {
    // 1. Open in new tab automatically
    window.open(option.url, '_blank', 'noopener,noreferrer');

    // 2. Trigger automatic file download
    const link = document.createElement('a');
    link.href = option.url;
    link.download = option.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsResumeOpen(false);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Animated blobs */}
      <div className="blob w-96 h-96 bg-sky-500 top-20 -left-20 animate-float" />
      <div className="blob w-80 h-80 bg-teal-400 bottom-10 right-0 animate-float" style={{ animationDelay: '2s' }} />
      <div className="blob w-72 h-72 bg-indigo-500 top-1/3 right-1/4 animate-float" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for new opportunities
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl leading-[1.08] mb-6">
          {profile.name.split(' ')[0]}
          <br />
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
            {profile.name.split(' ').slice(1).join(' ')}
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium mb-4">
          {profile.title}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {profile.tagline}
        </p>

        {/* Primary CTA Buttons (Mobile Full Width / Desktop Row) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 w-full max-w-sm sm:max-w-none mx-auto">
          {/* Resume Language Dropdown */}
          <div ref={resumeRef} className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsResumeOpen((prev) => !prev)}
              aria-expanded={isResumeOpen}
              aria-haspopup="true"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-semibold text-sm hover:opacity-95 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all hover:-translate-y-0.5 group btn-interactive btn-cta-glow text-center cursor-pointer"
            >
              <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              <span>Download CV / Resume</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isResumeOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isResumeOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#0b1324]/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl shadow-sky-950/60 z-50 animate-in fade-in zoom-in-95 duration-150"
                role="menu"
              >
                <div className="px-3 py-2 border-b border-white/5 mb-1 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Tilni tanlang / Select Language
                  </span>
                  <span className="text-[10px] text-sky-400 font-mono">PDF</span>
                </div>
                <div className="space-y-1">
                  {resumeOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => handleDownload(opt)}
                      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-white/10 active:bg-white/15 transition-all group/item cursor-pointer"
                      role="menuitem"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-base shrink-0 group-hover/item:border-sky-500/30 group-hover/item:bg-sky-500/10 transition-colors">
                          {opt.flag}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-white group-hover/item:text-sky-300 transition-colors">
                              {opt.label}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-tight">
                            {opt.description}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover/item:text-sky-400 shrink-0 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 font-medium text-sm hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5 btn-interactive text-center"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 text-sky-400" />
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all duration-200 btn-interactive"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all duration-200 btn-interactive"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all duration-200 btn-interactive"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <MapPin className="w-4 h-4" />
          {profile.location}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-sky-400 transition-colors btn-interactive p-2 rounded-full"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  );
}

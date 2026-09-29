import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile } from '@/data/portfolio';

export default function Hero() {
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

        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-6">
          {profile.name.split(' ')[0]}
          <br />
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
            {profile.name.split(' ').slice(1).join(' ')}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 font-medium mb-4">
          {profile.title}
        </p>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {profile.tagline}
        </p>

        <div className="flex items-center justify-center gap-4 mb-10">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all duration-200"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-sky-400 transition-colors"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  );
}

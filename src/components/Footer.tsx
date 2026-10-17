import { Code2, Heart, Shield, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a
          href="#hero"
          className="flex items-center gap-2 font-display font-bold hover:text-sky-400 transition-colors"
          aria-label="Otabek Haydarov - Back to top"
        >
          <Code2 className="w-5 h-5 text-sky-400" />
          <span>OH<span className="text-sky-400">.</span></span>
        </a>

        <p className="text-sm text-slate-500 flex items-center gap-1.5">
          Built with <Heart className="w-3.5 h-3.5 text-sky-400" /> by {profile.name}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-400 hover:text-sky-400 transition-colors btn-interactive"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-400 hover:text-sky-400 transition-colors btn-interactive"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-400 hover:text-sky-400 transition-colors btn-interactive"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {profile.name}
          </p>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-500 hover:text-sky-400 transition-colors btn-interactive"
              title="Admin Panel"
              aria-label="Open Admin Panel"
            >
              <Shield className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

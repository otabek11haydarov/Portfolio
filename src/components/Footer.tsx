import { Code2, Heart, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Footer() {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <footer className="border-t border-amber-900/30 py-8 px-6 bg-[#150d09]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a
          href="#hero"
          className="flex items-center gap-2 font-display font-bold text-amber-50 hover:text-[#f07f3c] transition-colors"
          aria-label="Otabek Haydarov - Back to top"
        >
          <Code2 className="w-5 h-5 text-[#f07f3c]" />
          <span>OH<span className="text-[#f07f3c]">.</span></span>
        </a>

        <p className="text-sm text-amber-200/60 flex items-center gap-1.5">
          Built with <Heart className="w-3.5 h-3.5 text-[#f07f3c] fill-[#f07f3c]/20" /> by {profile.name}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-[#21140e]/60 hover:bg-[#f07f3c]/20 text-amber-200/70 hover:text-[#f07f3c] border border-amber-900/30 hover:border-[#f07f3c]/40 transition-colors btn-interactive"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-[#21140e]/60 hover:bg-[#f07f3c]/20 text-amber-200/70 hover:text-[#f07f3c] border border-amber-900/30 hover:border-[#f07f3c]/40 transition-colors btn-interactive"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-1.5 rounded-lg bg-[#21140e]/60 hover:bg-[#f07f3c]/20 text-amber-200/70 hover:text-[#f07f3c] border border-amber-900/30 hover:border-[#f07f3c]/40 transition-colors btn-interactive"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <p className="text-sm text-amber-200/50">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

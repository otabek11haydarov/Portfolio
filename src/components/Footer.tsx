import { Code2, Heart, Shield } from 'lucide-react';
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
        <div className="flex items-center gap-2 font-display font-bold">
          <Code2 className="w-5 h-5 text-sky-400" />
          <span>OH<span className="text-sky-400">.</span></span>
        </div>
        <p className="text-sm text-slate-500 flex items-center gap-1.5">
          Built with <Heart className="w-3.5 h-3.5 text-sky-400" /> by {profile.name}
        </p>
        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {profile.name}
          </p>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-500 hover:text-sky-400 transition-colors"
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

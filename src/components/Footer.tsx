import { Code2, Heart } from 'lucide-react';
import { profile } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-bold">
          <Code2 className="w-5 h-5 text-sky-400" />
          <span>JR<span className="text-sky-400">.</span></span>
        </div>
        <p className="text-sm text-slate-500 flex items-center gap-1.5">
          Built with <Heart className="w-3.5 h-3.5 text-sky-400" /> using React & Tailwind
        </p>
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#150d09]/90 backdrop-blur-md border-b border-amber-900/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2 font-display font-bold text-lg text-amber-50"
          aria-label="Otabek Haydarov - Home"
        >
          <Code2 className="w-6 h-6 text-[#f07f3c]" />
          <span>OH<span className="text-[#f07f3c]">.</span></span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-amber-100/80 hover:text-[#f07f3c] transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-[#f07f3c]/10 text-[#f07f3c] border border-[#f07f3c]/30 text-sm font-medium hover:bg-[#f07f3c]/20 transition-colors duration-200 btn-interactive btn-cta-glow"
        >
          Let's talk
        </a>

        <button
          className="md:hidden text-amber-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f07f3c]/40"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#150d09]/98 backdrop-blur-xl border-t border-amber-900/30 px-6 py-5 shadow-2xl">
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base font-medium text-amber-100/80 hover:text-[#f07f3c] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-4 mt-3 border-t border-amber-900/30">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#f07f3c] text-white font-semibold text-sm shadow-lg shadow-orange-500/25 btn-interactive btn-cta-glow"
            >
              Let's talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

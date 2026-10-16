import { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Contact() {
  const { ref, visible } = useReveal();
  const { data } = usePortfolio();
  const { profile } = data;

  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: 'New contact from Portfolio!'
        })
      });
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div ref={ref} className={`max-w-5xl mx-auto reveal ${visible ? 'is-visible' : ''}`}>
        <p className="text-sky-400 font-display font-semibold text-sm tracking-widest uppercase mb-3">
          Contact
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
          Let's build something together
        </h2>
        <p className="text-slate-400 max-w-xl mb-12">
          Whether you need a data pipeline, a dashboard, or a full-stack collaborator — I'd love to hear about your project.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-slate-200 group-hover:text-sky-400 transition-colors">{profile.email}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Location</p>
                <p className="text-slate-200">{profile.location}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all"
              >
                <Github className="w-5 h-5" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Contact form */}
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 space-y-5"
          >
            {/* O'zingizning Web3Forms Access Key ingizni shu yerga yozasiz */}
            <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
            
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0f1a] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0f1a] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0f1a] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/50 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-teal-500 text-white font-medium text-sm hover:from-sky-400 hover:to-teal-400 transition-all duration-200"
            >
              <Send className="w-4 h-4" /> Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

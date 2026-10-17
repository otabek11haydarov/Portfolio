import { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Contact() {
  const { ref, visible } = useReveal();
  const { data } = usePortfolio();
  const { profile } = data;

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;

    try {
      if (web3formsKey && web3formsKey !== 'YOUR_ACCESS_KEY_HERE') {
        // Option A: Web3Forms API dispatch
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: form.name,
            email: form.email,
            message: form.message,
            subject: `New portfolio inquiry from ${form.name}`,
          }),
        });
        const resData = await response.json();
        if (!response.ok || !resData.success) {
          throw new Error(resData.message || 'Failed to send message via Web3Forms');
        }
      } else {
        // Option B: Reliable FormSubmit dispatch directly to profile.email
        const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
            _subject: `New portfolio inquiry from ${form.name} (${form.email})`,
            _template: 'table',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message. Please contact directly via email.');
        }
      }

      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setErrorMessage(error.message || 'Something went wrong. Please email directly.');
    } finally {
      setLoading(false);
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
              aria-label={`Send direct email to ${profile.email}`}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 transition-colors group btn-interactive"
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
                aria-label="Visit Otabek Haydarov's GitHub profile"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all btn-interactive"
              >
                <Github className="w-5 h-5" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Otabek Haydarov's LinkedIn profile"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all btn-interactive"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 space-y-5"
          >
            {sent && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            {errorMessage && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label htmlFor="contact-name" className="block text-sm text-slate-400 mb-1.5">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0f1a] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                placeholder="Your name"
                aria-label="Your Name"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm text-slate-400 mb-1.5">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0f1a] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                placeholder="you@example.com"
                aria-label="Your Email"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm text-slate-400 mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0f1a] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/50 transition-colors resize-none"
                placeholder="Tell me about your project..."
                aria-label="Your Message"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-label="Send Message"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-teal-500 text-white font-medium text-sm hover:from-sky-400 hover:to-teal-400 transition-all duration-200 disabled:opacity-60 cursor-pointer btn-interactive btn-cta-glow"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

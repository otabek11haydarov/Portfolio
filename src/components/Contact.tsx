import { Mail, MapPin, Send, Github, Linkedin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { useReveal } from '@/hooks/useReveal';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Contact() {
  const { ref, visible } = useReveal();
  const { data } = usePortfolio();
  const { profile } = data;

  const formId = import.meta.env.VITE_FORMSPREE_ID || 'mjyyvdpq';
  const [state, handleSubmit] = useForm(formId);

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

            <div className="interactive-card flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
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
          {state.succeeded ? (
            <div className="interactive-card rounded-2xl bg-white/[0.03] border border-emerald-500/30 p-8 text-center space-y-4 flex flex-col items-center justify-center animate-in fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
                Thank you for reaching out! Your message has been sent directly to my inbox via Formspree. I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="interactive-card rounded-2xl bg-white/[0.03] border border-white/10 p-6 space-y-5"
            >
              {state.errors && state.errors.length > 0 && (
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>Failed to send message. Please verify your details or email directly.</span>
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
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0a0f1a] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                  placeholder="Your name"
                  aria-label="Your Name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
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
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0a0f1a] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                  placeholder="you@example.com"
                  aria-label="Your Email"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
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
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0a0f1a] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  aria-label="Your Message"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                aria-label="Send Message"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-teal-500 text-white font-medium text-sm hover:from-sky-400 hover:to-teal-400 transition-all duration-200 disabled:opacity-60 cursor-pointer btn-interactive btn-cta-glow"
              >
                {state.submitting ? (
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
          )}
        </div>
      </div>
    </section>
  );
}

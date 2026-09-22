import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Navigation, Send, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';
import { coreCommittee } from '@/data/team';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function Contact() {
  const ref = useRevealOnScroll<HTMLElement>();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const contacts = coreCommittee.filter((m) => m.phone);

  return (
    <section id="contact" ref={ref} className="section-py bg-[var(--surface)]/50">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title mt-2 mb-4">Get in Touch</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Have questions? Reach out to the organizing committee.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: venue + contacts */}
          <div className="space-y-5">
            {/* Venue */}
            <div className="surface-card p-5 reveal">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                  <MapPin size={20} className="text-[var(--accent)]" />
                </div>
                <h3 className="font-display text-lg font-bold">Venue</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-1 font-medium">
                {SITE_CONFIG.venue}
              </p>
              <p className="text-sm text-[var(--text-muted)]">{SITE_CONFIG.address}</p>
              <div className="mt-4 surface-card aspect-video bg-[var(--code-bg)] flex flex-col items-center justify-center gap-2">
                <Navigation size={32} className="text-[var(--text-muted)]" />
                <p className="text-xs text-[var(--text-muted)]">Map placeholder</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Google Maps URL: {SITE_CONFIG.googleMapsURL}
                </p>
              </div>
            </div>

            {/* Core contacts */}
            <div className="surface-card p-5 reveal">
              <h3 className="font-display text-lg font-bold mb-4">Core Committee Contacts</h3>
              <div className="space-y-2">
                {contacts.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{c.role}</p>
                    </div>
                    <a
                      href={`tel:${c.phone!.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] font-medium hover:underline"
                    >
                      <Phone size={14} />
                      {c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="surface-card p-5 reveal">
              <h3 className="font-display text-lg font-bold mb-3">Connect</h3>
              <div className="flex flex-wrap gap-3">
                <span className="badge badge-neutral">
                  <Mail size={14} /> {SITE_CONFIG.email}
                </span>
                <span className="badge badge-neutral">
                  <Instagram size={14} /> {SITE_CONFIG.instagram}
                </span>
                <span className="badge badge-neutral">
                  <MessageCircle size={14} /> {SITE_CONFIG.whatsapp}
                </span>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="surface-card p-6 reveal">
            <h3 className="font-display text-lg font-bold mb-4">Send a Message</h3>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 size={48} className="text-[var(--success)] mb-3" />
                <p className="font-display font-semibold text-lg">Message Sent!</p>
                <p className="text-sm text-[var(--text-muted)]">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-medium mb-1.5">
                    Name
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="c-msg" className="block text-sm font-medium mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="c-msg"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

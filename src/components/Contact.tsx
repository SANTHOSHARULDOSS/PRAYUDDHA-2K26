import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Navigation, Send, CheckCircle2 } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function Contact() {
  const { contact, siteConfig } = useCMS();
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

  return (
    <section id="contact" ref={ref} className="section-py bg-[var(--surface)]/50">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="section-eyebrow">Contact & Connect</span>
          <h2 className="section-title mt-2 mb-4">Get in Touch</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Have questions about events, registration, or reaching the venue? Connect with our organizing committee.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left: Centralized contacts & social */}
          <div className="space-y-6">
            {/* Main Helpline Info */}
            <div className="surface-card p-6 reveal space-y-4 rounded-2xl border border-[var(--border)]">
              <h3 className="font-display text-lg font-bold border-b border-[var(--border)] pb-3">
                Official Symposium Contact Info
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Official Email</p>
                    <a href={`mailto:${contact.email}`} className="font-medium text-[var(--text-primary)] hover:text-[var(--accent)]">
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Helpline Phones</p>
                    <p className="font-medium text-[var(--text-primary)] font-mono">
                      {contact.phone1} / {contact.phone2}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Venue Location</p>
                    <p className="font-medium text-[var(--text-primary)]">
                      {siteConfig.institution}, Tiruchirappalli – 620024
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="surface-card p-5 reveal rounded-2xl border border-[var(--border)] space-y-3">
              <h3 className="font-display text-base font-bold">Social Channels</h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-accent text-xs flex items-center gap-1.5 py-2 px-3 hover:scale-105 transition-transform"
                >
                  <MessageCircle size={14} /> WhatsApp Community
                </a>
                <a
                  href={`https://instagram.com/${contact.instagramUrl.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-neutral text-xs flex items-center gap-1.5 py-2 px-3 hover:scale-105 transition-transform"
                >
                  <Instagram size={14} /> {contact.instagramUrl}
                </a>
              </div>
            </div>
          </div>

          {/* Right: Send Message Form */}
          <div className="surface-card p-6 sm:p-8 reveal rounded-2xl border border-[var(--border)] flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl font-bold mb-2">Send a Message</h3>
              <p className="text-xs text-[var(--text-muted)] mb-6">
                Fill out the message form below and our team will get back to you shortly.
              </p>

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
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="block text-sm font-medium mb-1.5">
                      Email Address
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
                      placeholder="Your question or message..."
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full py-3 shadow-md">
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          <span className="section-eyebrow">Venue & Reach</span>
          <h2 className="section-title mt-2 mb-4">Location & How to Reach</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Find event blocks, travel routes, and organizing committee contact information.
          </p>
        </div>

        {/* HOW TO REACH & VENUE BLOCKS GUIDE */}
        <div className="surface-card p-6 sm:p-8 mb-12 rounded-2xl border border-[var(--border)] reveal space-y-6 bg-[var(--surface)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
            <div>
              <span className="badge badge-accent text-xs mb-2">NH 336 Location</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                {SITE_CONFIG.institution}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Tiruchirappalli – Pudukkottai National Highway (NH 336), Tiruchirappalli – 620024
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Anna+University+BIT+Campus+Tiruchirappalli"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary shrink-0 flex items-center gap-2"
            >
              <Navigation size={16} />
              Open in Google Maps
            </a>
          </div>

          {/* Venue & Blocks Breakdown */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              📍 Venue & Blocks Schedule
            </h4>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[var(--code-bg)] border border-[var(--border)]">
                <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-1">
                  Inauguration
                </span>
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  Dr. A.P.J. Abdul Kalam Auditorium
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">B-Block</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--code-bg)] border border-[var(--border)]">
                <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-1">
                  Technical & Non-Tech Events
                </span>
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  Event Labs & Classrooms
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">C-Block</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--code-bg)] border border-[var(--border)]">
                <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-1">
                  Prize Distribution
                </span>
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  Valedictory Ceremony
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">B-Block Auditorium</p>
              </div>
            </div>
          </div>

          {/* Travel Route Cards */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              🚌 Travel Routes
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Route 1: From Trichy */}
              <div className="surface-card p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-display font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
                    <Navigation size={16} className="text-[var(--accent)]" />
                    From Trichy
                  </h5>
                  <span className="badge badge-accent text-[11px]">Frequent Buses</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Buses run frequently from Trichy Central Bus Stand / Chathiram Bus Stand towards Keeranur / Pudukkottai route.
                </p>
                <div className="p-2.5 rounded-lg bg-[var(--code-bg)] text-xs font-medium text-[var(--text-primary)]">
                  Get down at: <span className="text-[var(--accent)] font-bold">Anna University / BIT Campus stop</span>
                </div>
              </div>

              {/* Route 2: From Keeranur */}
              <div className="surface-card p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-display font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
                    <Navigation size={16} className="text-[var(--accent)]" />
                    From Keeranur
                  </h5>
                  <span className="badge badge-accent text-[11px]">Frequent Buses</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Frequent buses available from Keeranur side taking the Trichy direction / BIT Campus route.
                </p>
                <div className="p-2.5 rounded-lg bg-[var(--code-bg)] text-xs font-medium text-[var(--text-primary)]">
                  Get down at: <span className="text-[var(--accent)] font-bold">BIT Campus stop</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Info & Simple Flow */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[var(--accent-light)]/40 border border-[var(--accent)]/30">
            <div className="text-xs text-[var(--text-primary)] space-y-1">
              <p className="font-bold flex items-center gap-1 text-sm text-[var(--accent)]">
                🎫 Bus Ticket Information
              </p>
              <p>Ask for <span className="font-semibold text-[var(--text-primary)]">Anna University / BIT Campus</span> ticket when boarding.</p>
              <p className="text-[11px] text-[var(--text-muted)]">Approximate fare: ₹15 – ₹30 depending on starting point and bus service.</p>
            </div>
            <div className="text-xs font-mono bg-[var(--surface)] px-3 py-2 rounded-lg border border-[var(--border)] text-[var(--accent)] font-semibold shrink-0">
              Flow: Bus → BIT Campus → B-Block (Auditorium)
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: contacts & social */}
          <div className="space-y-5">
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

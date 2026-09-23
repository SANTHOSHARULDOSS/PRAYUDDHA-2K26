import { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, Image as ImageIcon, X, Trophy, Award } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useCountdown } from '@/hooks/useCountdown';

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="surface-card w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
        <span className="font-display text-xl sm:text-2xl font-bold tabular-nums text-[var(--text-primary)]">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const timeLeft = useCountdown(SITE_CONFIG.countdownDate);
  const [showPosterModal, setShowPosterModal] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 overflow-hidden">
      {/* Subtle technical background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--background)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-[var(--accent)] opacity-[0.04] blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-[var(--accent)] opacity-[0.03] blur-3xl" />
      </div>

      <div className="container-px w-full max-w-7xl mx-auto space-y-8">
        {/* UPPER INSTITUTIONAL HEADER BAR */}
        <div className="animate-fade-in-up surface-card p-4 sm:p-6 rounded-2xl border border-[var(--border)] shadow-sm bg-[var(--surface)]/80 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            {/* Left: Official Anna University Seal */}
            <div className="flex items-center gap-4 shrink-0">
              <img
                src="/images/anna-university-logo.png"
                alt="Anna University Logo"
                className="h-16 sm:h-20 md:h-22 w-auto object-contain drop-shadow-sm"
              />
              <div className="hidden sm:block h-12 w-px bg-[var(--border)]" />
            </div>

            {/* Center: Institutional Hierarchy */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]" />
                <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
                  ANNA UNIVERSITY, TIRUCHIRAPPALLI
                </p>
              </div>
              <h2 className="font-display font-semibold text-sm sm:text-base md:text-lg text-[var(--text-primary)]">
                {SITE_CONFIG.institution}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                Organized by Department of Information Technology & Department of AI & ML
              </p>
            </div>

            {/* Right: Official PRAYUDDHA Emblem */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <div className="h-12 w-px bg-[var(--border)]" />
              <img
                src="/images/prayuddha-logo.png"
                alt="PRAYUDDHA Emblem"
                className="h-16 sm:h-20 md:h-22 w-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* MAIN HERO GRID: Content + Official Poster Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Event Title, Details & Countdown */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Eyebrow badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 badge badge-accent">
              <Sparkles size={14} />
              {SITE_CONFIG.symposiumIdentity}
            </div>

            {/* Main Title */}
            <div>
              <h1
                className="animate-fade-in-up font-display font-extrabold tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
              >
                <span className="text-[var(--text-primary)]">PRAYUDDHA</span>{' '}
                <span className="text-[var(--accent)]">2K26</span>
              </h1>
              <p className="animate-fade-in-up font-display text-lg sm:text-xl font-semibold text-[var(--text-secondary)] mt-2">
                {SITE_CONFIG.motto} — <span className="text-[var(--accent)]">{SITE_CONFIG.tagline}</span>
              </p>
            </div>

            {/* Event Info Pills */}
            <div className="animate-fade-in-up flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="surface-card flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm">
                <Calendar size={15} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-secondary)]">
                  {SITE_CONFIG.eventDate}, {SITE_CONFIG.eventDay}
                </span>
              </div>
              <div className="surface-card flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm">
                <Clock size={15} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-secondary)]">
                  {SITE_CONFIG.eventTime}
                </span>
              </div>
              <div className="surface-card flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm">
                <MapPin size={15} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-secondary)]">
                  {SITE_CONFIG.venue}
                </span>
              </div>
            </div>

            {/* Countdown */}
            {!timeLeft.isExpired ? (
              <div className="animate-fade-in-up flex flex-col items-center lg:items-start gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Symposium Countdown
                </span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CountdownUnit value={timeLeft.days} label="Days" />
                  <span className="font-display text-xl text-[var(--text-muted)] -mt-4">:</span>
                  <CountdownUnit value={timeLeft.hours} label="Hours" />
                  <span className="font-display text-xl text-[var(--text-muted)] -mt-4">:</span>
                  <CountdownUnit value={timeLeft.minutes} label="Mins" />
                  <span className="font-display text-xl text-[var(--text-muted)] -mt-4">:</span>
                  <CountdownUnit value={timeLeft.seconds} label="Secs" />
                </div>
              </div>
            ) : (
              <div className="surface-card inline-block px-5 py-2.5">
                <span className="font-display text-base font-semibold text-[var(--accent)]">
                  The Symposium is Live!
                </span>
              </div>
            )}

            {/* CTAs */}
            <div className="animate-fade-in-up flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button onClick={() => scrollTo('register')} className="btn btn-primary">
                Register Now
                <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo('events')} className="btn btn-secondary">
                Explore Events
              </button>
              <button
                onClick={() => setShowPosterModal(true)}
                className="btn btn-secondary flex items-center gap-2"
              >
                <ImageIcon size={16} />
                View Official Poster
              </button>
            </div>

            {/* Slogan */}
            <p className="animate-fade-in-up font-display text-xs font-bold tracking-[0.25em] text-[var(--text-muted)] uppercase">
              {SITE_CONFIG.slogan}
            </p>
          </div>

          {/* Right Column: Official Poster Card & Highlights */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md relative group">
              {/* Decorative aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)]/30 to-[var(--accent-secondary,var(--accent))]/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />

              {/* Main Card */}
              <div className="relative surface-card rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl p-3 bg-[var(--surface)]">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/10">
                  <img
                    src="/images/prayuddha-poster.jpg"
                    alt="PRAYUDDHA 2K26 Official Poster"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => setShowPosterModal(true)}
                  />
                  {/* Glass Overlay on Hover */}
                  <div
                    onClick={() => setShowPosterModal(true)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer text-white p-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                      <ImageIcon size={24} className="text-white" />
                    </div>
                    <span className="font-display text-sm font-semibold">Click to view full poster</span>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[var(--accent)]" />
                    Official Symposium Poster
                  </div>
                </div>

                {/* Highlights bar under poster */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-[var(--accent-light)] border border-[var(--accent)]/20 flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--accent)]">
                    <Trophy size={14} />
                    <span>Cash Prizes & Trophies</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[var(--accent-light)] border border-[var(--accent)]/20 flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--accent)]">
                    <Award size={14} />
                    <span>Participation Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN POSTER LIGHTBOX MODAL */}
      {showPosterModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setShowPosterModal(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full surface-card rounded-2xl overflow-hidden p-2 bg-black/90 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="w-full flex items-center justify-between p-3 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <img src="/images/prayuddha-logo.png" alt="Logo" className="h-6 w-auto" />
                <span className="font-display font-bold text-sm">PRAYUDDHA 2K26 Official Poster</span>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Poster Image */}
            <div className="w-full overflow-auto max-h-[80vh] flex items-center justify-center p-2">
              <img
                src="/images/prayuddha-poster.jpg"
                alt="PRAYUDDHA 2K26 Full Poster"
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


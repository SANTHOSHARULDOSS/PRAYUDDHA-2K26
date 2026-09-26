import { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  BookOpen,
  X,
  Trophy,
  Award,
  Bell,
} from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useCountdown } from '@/hooks/useCountdown';
import BrochureModal from './BrochureModal';
import ArcherAnimation from './ArcherAnimation';

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
  const { siteConfig, poster, brochure, announcements } = useCMS();
  const timeLeft = useCountdown(siteConfig.countdownDate);
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [dismissedNotice, setDismissedNotice] = useState(false);

  const activeNotice = announcements.find((a) => a.isPublished);

  const handleRegisterClick = () => {
    window.open(siteConfig.googleFormUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 overflow-hidden">
      {/* Background Grid Pattern */}
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

      <div className="container-px w-full max-w-7xl mx-auto space-y-6">
        {/* LIVE ANNOUNCEMENT BANNER */}
        {activeNotice && !dismissedNotice && (
          <div className="surface-card p-3 sm:p-4 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-light)]/20 text-xs sm:text-sm flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <span className={`badge shrink-0 text-[10px] ${
                activeNotice.type === 'urgent' ? 'badge-danger' : 'badge-accent'
              }`}>
                <Bell size={12} className="mr-1 inline" /> NOTICE
              </span>
              <p className="font-medium text-[var(--text-primary)]">
                <strong>{activeNotice.title}:</strong> {activeNotice.content}
              </p>
            </div>
            <button
              onClick={() => setDismissedNotice(true)}
              className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] shrink-0"
              aria-label="Dismiss notice"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* UPPER INSTITUTIONAL HEADER BAR */}
        <div className="animate-fade-in-up surface-card p-4 sm:p-6 rounded-2xl border border-[var(--border)] shadow-sm bg-[var(--surface)]/80 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            {/* Left: Official Anna University Seal */}
            <div className="flex items-center gap-4 shrink-0">
              <img
                src="/images/branding/anna-university-logo.png"
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
                {siteConfig.institution}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                Organized by Department of Information Technology & Department of AI & ML
              </p>
            </div>

            {/* Right: Official PRAYUDDHA Emblem */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <div className="h-12 w-px bg-[var(--border)]" />
              <img
                src="/images/branding/prayuddha-logo.png"
                alt="PRAYUDDHA Emblem"
                className="h-16 sm:h-20 md:h-22 w-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* MAIN HERO GRID: Content + Official Poster Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Event Title, Details & Countdown */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 relative">
            {/* Eyebrow badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 badge badge-accent">
              <Sparkles size={14} />
              {siteConfig.symposiumIdentity}
            </div>

            {/* Main Title */}
            <div>
              <h1
                className="animate-fade-in-up font-display font-extrabold tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
              >
                <span className="text-[var(--text-primary)]">{siteConfig.siteName.split(' ')[0]}</span>{' '}
                <span className="text-[var(--accent)]">{siteConfig.edition}</span>
              </h1>
              <p className="animate-fade-in-up font-display text-lg sm:text-xl font-semibold text-[var(--text-secondary)] mt-2">
                {siteConfig.motto} — <span className="text-[var(--accent)]">{siteConfig.tagline}</span>
              </p>
            </div>

            {/* Event Info Pills */}
            <div className="animate-fade-in-up flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="surface-card flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm">
                <Calendar size={15} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-secondary)]">
                  {siteConfig.eventDate}, {siteConfig.eventDay}
                </span>
              </div>
              <div className="surface-card flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm">
                <Clock size={15} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-secondary)]">
                  {siteConfig.eventTime}
                </span>
              </div>
              <div className="surface-card flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm">
                <MapPin size={15} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-secondary)]">
                  {siteConfig.venue}
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

            {/* Action CTAs + ARCHER ANIMATION */}
            <div className="relative animate-fade-in-up flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <ArcherAnimation />

              <button
                onClick={handleRegisterClick}
                className="btn btn-primary shadow-lg hover:scale-105 transition-transform"
              >
                {siteConfig.registrationBtnText || 'Register Now'}
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setShowBrochureModal(true)}
                className="btn btn-secondary flex items-center gap-2 shadow-sm"
              >
                <BookOpen size={16} />
                View 2-Page Brochure
              </button>

              <button
                onClick={() => setShowPosterModal(true)}
                className="btn btn-secondary flex items-center gap-2 shadow-sm"
              >
                <ImageIcon size={16} />
                View Official Poster
              </button>
            </div>

            {/* Slogan */}
            <p className="animate-fade-in-up font-display text-xs font-bold tracking-[0.25em] text-[var(--text-muted)] uppercase">
              {siteConfig.slogan}
            </p>
          </div>

          {/* Right Column: Official Poster Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md relative group">
              {/* Decorative aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)]/30 to-[var(--accent)]/10 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />

              {/* Main Card */}
              <div className="relative surface-card rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl p-3 bg-[var(--surface)]">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/10">
                  <img
                    src={poster.posterUrl}
                    alt={poster.caption || 'PRAYUDDHA Official Poster'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => setShowPosterModal(true)}
                  />
                  {/* Overlay */}
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

      {/* FULL-SCREEN POSTER MODAL */}
      {showPosterModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setShowPosterModal(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full surface-card rounded-2xl overflow-hidden p-2 bg-black/90 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between p-3 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <img src="/images/branding/prayuddha-logo.png" alt="Logo" className="h-6 w-auto" />
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

            <div className="w-full overflow-auto max-h-[80vh] flex items-center justify-center p-2">
              <img
                src={poster.posterUrl}
                alt="PRAYUDDHA 2K26 Full Poster"
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2-PAGE BROCHURE MODAL */}
      {showBrochureModal && (
        <BrochureModal brochure={brochure} onClose={() => setShowBrochureModal(false)} />
      )}
    </section>
  );
}

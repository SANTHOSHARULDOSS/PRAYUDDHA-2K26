import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useCountdown } from '@/hooks/useCountdown';

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="surface-card w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        <span className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-[var(--text-primary)]">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const timeLeft = useCountdown(SITE_CONFIG.countdownDate);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
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

      <div className="container-px w-full py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 badge badge-accent mb-6">
            <Sparkles size={14} />
            {SITE_CONFIG.symposiumIdentity}
          </div>

          {/* Title */}
          <h1
            className="animate-fade-in-up font-display font-bold tracking-tight mb-3"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', animationDelay: '0.1s', opacity: 0 }}
          >
            <span className="text-[var(--text-primary)]">PRAYUDDHA</span>{' '}
            <span className="text-[var(--accent)]">2K26</span>
          </h1>

          {/* Motto */}
          <p
            className="animate-fade-in-up font-display text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mb-2"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            {SITE_CONFIG.motto}
          </p>

          <p
            className="animate-fade-in-up text-base text-[var(--text-secondary)] mb-1"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            An Inter-Collegiate Technical Symposium
          </p>
          <p
            className="animate-fade-in-up text-sm text-[var(--text-muted)] mb-8"
            style={{ animationDelay: '0.35s', opacity: 0 }}
          >
            {SITE_CONFIG.institution} · {SITE_CONFIG.university}, {SITE_CONFIG.city}
          </p>

          {/* Event info pills */}
          <div
            className="animate-fade-in-up flex flex-wrap items-center justify-center gap-3 mb-8"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            <div className="surface-card flex items-center gap-2 px-4 py-2">
              <Calendar size={16} className="text-[var(--accent)]" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                {SITE_CONFIG.eventDate}, {SITE_CONFIG.eventDay}
              </span>
            </div>
            <div className="surface-card flex items-center gap-2 px-4 py-2">
              <Clock size={16} className="text-[var(--accent)]" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                {SITE_CONFIG.eventTime}
              </span>
            </div>
            <div className="surface-card flex items-center gap-2 px-4 py-2">
              <MapPin size={16} className="text-[var(--accent)]" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                {SITE_CONFIG.venue}
              </span>
            </div>
          </div>

          {/* Countdown */}
          {!timeLeft.isExpired ? (
            <div
              className="animate-fade-in-up flex items-center justify-center gap-3 sm:gap-4 mb-8"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              <CountdownUnit value={timeLeft.days} label="Days" />
              <span className="font-display text-2xl text-[var(--text-muted)] -mt-6">:</span>
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <span className="font-display text-2xl text-[var(--text-muted)] -mt-6">:</span>
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <span className="font-display text-2xl text-[var(--text-muted)] -mt-6">:</span>
              <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          ) : (
            <div className="surface-card inline-block px-6 py-3 mb-8">
              <span className="font-display text-lg font-semibold text-[var(--accent)]">
                The event has begun!
              </span>
            </div>
          )}

          {/* CTAs */}
          <div
            className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            <button onClick={() => scrollTo('register')} className="btn btn-primary w-full sm:w-auto">
              Register Now
              <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo('events')} className="btn btn-secondary w-full sm:w-auto">
              Explore Events
            </button>
          </div>

          {/* Slogan */}
          <p
            className="animate-fade-in-up mt-10 font-display text-sm font-semibold tracking-[0.2em] text-[var(--text-muted)] uppercase"
            style={{ animationDelay: '0.7s', opacity: 0 }}
          >
            {SITE_CONFIG.slogan}
          </p>
        </div>
      </div>
    </section>
  );
}

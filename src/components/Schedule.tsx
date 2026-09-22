import { Clock, Coffee, Flag, MapPin } from 'lucide-react';
import { schedule, inaugurationCeremony } from '@/data/schedule';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function Schedule() {
  const ref = useRevealOnScroll<HTMLElement>();

  return (
    <section id="schedule" ref={ref} className="section-py">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="section-eyebrow">Schedule</span>
          <h2 className="section-title mt-2 mb-4">Event Schedule</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            The full-day programme for PRAYUDDHA 2K26 on {SITE_CONFIG.eventDate}.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {/* Desktop: horizontal, Mobile: vertical */}
          <div className="relative">
            {/* Vertical line for mobile */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)] md:hidden" />

            <div className="space-y-4">
              {schedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`reveal flex items-start gap-4 ${
                    item.isBreak ? 'opacity-80' : ''
                  }`}
                >
                  {/* Dot */}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      item.isBreak
                        ? 'bg-[var(--warning-light)]'
                        : item.isEnd
                        ? 'bg-[var(--danger-light)]'
                        : 'bg-[var(--accent-light)]'
                    }`}
                  >
                    {item.isBreak ? (
                      <Coffee size={14} className="text-[var(--warning)]" />
                    ) : item.isEnd ? (
                      <Flag size={14} className="text-[var(--danger)]" />
                    ) : (
                      <Clock size={14} className="text-[var(--accent)]" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="surface-card p-4 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-display font-semibold text-sm">
                        {item.programme}
                      </span>
                      <span className="text-xs font-medium text-[var(--text-muted)] tabular-nums">
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inauguration Ceremony details */}
        <div className="max-w-3xl mx-auto mt-10 surface-card p-6 reveal">
          <h3 className="font-display text-lg font-bold mb-2">Inauguration Ceremony</h3>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            9:00 AM – 10:30 AM · {SITE_CONFIG.venue}
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {inaugurationCeremony.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Banner Launch */}
        <div className="max-w-3xl mx-auto mt-4 surface-card p-4 reveal flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--accent-light)] flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-[var(--accent)]" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm">Banner Launch — 11:00 AM</p>
            <p className="text-xs text-[var(--text-muted)]">Venue: {SITE_CONFIG.bannerLaunchVenue}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

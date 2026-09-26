import { useState, useMemo, useEffect } from 'react';
import {
  Brain,
  Drama,
  Compass,
  Link as LinkIcon,
  Gamepad,
  Code,
  Wand2,
  Layout,
  Terminal,
  Presentation,
  ArrowRight,
  Trophy,
  UtensilsCrossed,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Ticket,
} from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import EventModal from './EventModal';
import type { EventItemData } from '@/types/cms';
import type { SymposiumEvent, EventStatus } from '@/data/events';

const iconMap: Record<string, typeof Brain> = {
  brain: Brain,
  drama: Drama,
  compass: Compass,
  link: LinkIcon,
  gamepad: Gamepad,
  code: Code,
  wand: Wand2,
  layout: Layout,
  terminal: Terminal,
  presentation: Presentation,
};

const studentMessages = [
  'Trichy la irundhu vara ready-aa? PRAYUDDHA 2K26-ku direct-aa vandhuru!',
  'Keeranur side-aa? Bus frequent-aa irukku — straight-aa BIT Campus-ku vandhudunga!',
  'Oru naal. Neraya events. New people. New ideas. Full memories.',
  'Just watch panna vara vendam… participate panna vandhu unga talent-a show pannunga!',
  'Friends-oda team up panni oru event-a conquer pannunga!',
  'Skills irukka? Show pannunga. Ideas irukka? Battle pannunga.',
  'Competition mattum illa — connections, experience, memories ellame oru place-la.',
  '9 AM-ku start… 4:45 PM varaikkum full-on PRAYUDDHA!',
  'Technical-aa irundhaalum, non-technical-aa irundhaalum… ungalukku oru stage inga irukku.',
  'College-la irundhu veliya oru different experience venuma? PRAYUDDHA 2K26-ku vandhuru!',
  'See you at BIT Campus. Let the ideas battle.',
];

const filters = ['All', 'Technical', 'Non-Technical'] as const;
type Filter = (typeof filters)[number];

function statusBadge(status: EventStatus) {
  switch (status) {
    case 'Open':
      return <span className="badge badge-success">Open</span>;
    case 'Coming Soon':
      return <span className="badge badge-warning">Coming Soon</span>;
    case 'Closed':
      return <span className="badge badge-danger">Closed</span>;
    case 'Full':
      return <span className="badge badge-neutral">Full</span>;
  }
}

export default function Events() {
  const { events: cmsEvents, siteConfig } = useCMS();
  const ref = useRevealOnScroll<HTMLElement>();
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<SymposiumEvent | null>(null);
  const [msgIdx, setMsgIdx] = useState(0);

  useBodyScrollLock(selected !== null);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % studentMessages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const publishedEvents = useMemo(
    () => cmsEvents.filter((e) => e.isPublished).sort((a, b) => a.displayOrder - b.displayOrder),
    [cmsEvents]
  );

  const filtered = useMemo(() => {
    if (filter === 'All') return publishedEvents;
    return publishedEvents.filter((e) => e.category === filter);
  }, [filter, publishedEvents]);

  return (
    <section id="events" ref={ref} className="section-py bg-[var(--surface)]/50">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-8 reveal">
          <span className="section-eyebrow">Symposium Competitions</span>
          <h2 className="section-title mt-2 mb-3">Events at PRAYUDDHA</h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            Explore technical and non-technical competitions designed to challenge, engage, and celebrate every kind of talent.
          </p>
        </div>

        {/* SINGLE ENTRY FEE & LUNCH HIGHLIGHT BANNERS */}
        <div className="max-w-4xl mx-auto mb-10 reveal grid sm:grid-cols-2 gap-4">
          <div className="surface-card p-4 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-light)]/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
              <Ticket size={20} />
            </div>
            <div>
              <span className="font-display font-bold text-xs uppercase tracking-wider text-[var(--accent)] block">
                ONE ENTRY FEE • FULL SYMPOSIUM ACCESS
              </span>
              <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                Single Registration Fee of {siteConfig.registrationFee} Covers All Events & Biryani Lunch
              </p>
            </div>
          </div>

          <div className="surface-card p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <UtensilsCrossed size={20} />
            </div>
            <div>
              <span className="font-display font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                🍗 Veg & Non-Veg Biryani Lunch Provided
              </span>
              <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                Delicious Veg & Non-Veg Biryani will be provided for registered participants.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 reveal">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn ${
                filter === f ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {f} ({f === 'All' ? publishedEvents.length : publishedEvents.filter((e) => e.category === f).length})
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event) => {
            const Icon = iconMap[event.image] ?? Code;
            const isTech = event.category === 'Technical';
            return (
              <button
                key={event.id}
                onClick={() => setSelected(event as any)}
                className="surface-card p-5 text-left rounded-xl border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 hover:-translate-y-1 group flex flex-col justify-between shadow-sm bg-[var(--surface)]"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
                      <Icon size={24} className="text-[var(--accent)]" />
                    </div>
                    {statusBadge(event.status)}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display text-lg font-bold">{event.name}</h3>
                    <span className="badge badge-neutral text-[10px]">{event.category}</span>
                  </div>

                  {event.tagline && (
                    <p className="text-xs font-semibold text-[var(--accent)] mb-2">
                      {event.tagline}
                    </p>
                  )}

                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-4">
                    {event.description}
                  </p>
                </div>

                <div>
                  <div className="mb-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-semibold text-[var(--text-primary)]">
                      <Trophy size={14} className="text-[var(--accent)]" />
                      {event.firstPrize && event.secondPrize
                        ? `${event.firstPrize} | ${event.secondPrize}`
                        : event.prizes}
                    </span>
                    <span className="text-[var(--text-muted)] text-[11px] font-medium">
                      {event.teamSize}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-semibold text-[var(--accent)] group-hover:gap-2 transition-all">
                    View Details & Rules
                    <ArrowRight size={14} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Student Tip Banner */}
        <div className="max-w-3xl mx-auto mt-12 reveal">
          <div className="surface-card p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[var(--accent)] shrink-0 font-bold">
              <Sparkles size={16} />
              <span className="hidden sm:inline">Student Tip:</span>
            </div>
            <p className="text-[var(--text-primary)] font-medium italic text-center transition-all duration-300">
              "{studentMessages[msgIdx]}"
            </p>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setMsgIdx((prev) => (prev - 1 + studentMessages.length) % studentMessages.length)}
                className="p-1 rounded hover:bg-[var(--code-bg)] text-[var(--text-muted)]"
                aria-label="Previous tip"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setMsgIdx((prev) => (prev + 1) % studentMessages.length)}
                className="p-1 rounded hover:bg-[var(--code-bg)] text-[var(--text-muted)]"
                aria-label="Next tip"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <EventModal event={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

import { useState, useMemo } from 'react';
import { Brain, Drama, Compass, Link as LinkIcon, Gamepad, Code, ArrowRight } from 'lucide-react';
import { events, type SymposiumEvent, type EventStatus } from '@/data/events';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import EventModal from './EventModal';

const iconMap: Record<string, typeof Brain> = {
  brain: Brain,
  drama: Drama,
  compass: Compass,
  link: LinkIcon,
  gamepad: Gamepad,
  code: Code,
};

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
  const ref = useRevealOnScroll<HTMLElement>();
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<SymposiumEvent | null>(null);

  useBodyScrollLock(selected !== null);

  const filtered = useMemo(() => {
    if (filter === 'All') return events;
    return events.filter((e) => e.category === filter);
  }, [filter]);

  return (
    <section id="events" ref={ref} className="section-py bg-[var(--surface)]/50">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Events</span>
          <h2 className="section-title mt-2 mb-4">Events at PRAYUDDHA</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Explore technical and non-technical competitions designed to challenge, engage, and
            celebrate every kind of talent.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 reveal">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn ${
                filter === f ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event) => {
            const Icon = iconMap[event.image] ?? Code;
            return (
              <button
                key={event.id}
                onClick={() => setSelected(event)}
                className="surface-card p-5 text-left reveal hover:border-[var(--accent)] transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
                    <Icon size={24} className="text-[var(--accent)]" />
                  </div>
                  {statusBadge(event.status)}
                </div>
                <h3 className="font-display text-lg font-bold mb-1">{event.name}</h3>
                <span className="badge badge-neutral mb-3">{event.category}</span>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-4">
                  {event.description}
                </p>
                <div className="flex items-center gap-1 text-sm font-semibold text-[var(--accent)] group-hover:gap-2 transition-all">
                  View Details
                  <ArrowRight size={14} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <EventModal event={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

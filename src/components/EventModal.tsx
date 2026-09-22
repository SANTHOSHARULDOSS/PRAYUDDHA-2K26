import { useEffect, useRef } from 'react';
import { X, Users, Clock, IndianRupee, Trophy, GraduationCap, ListChecks, Medal, ArrowRight } from 'lucide-react';
import type { SymposiumEvent } from '@/data/events';
import { SITE_CONFIG } from '@/data/siteConfig';

interface Props {
  event: SymposiumEvent;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const details = [
    { icon: Users, label: 'Team Size', value: event.teamSize },
    { icon: IndianRupee, label: 'Entry Fee', value: event.fee },
    { icon: Clock, label: 'Duration', value: event.duration },
    { icon: ListChecks, label: 'Rounds', value: event.rounds },
    { icon: GraduationCap, label: 'Eligibility', value: event.eligibility },
    { icon: Trophy, label: 'Prizes', value: event.prizes },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="surface-elevated w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[var(--radius-xl)] animate-scale-in"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-[var(--border)] bg-[var(--surface-elevated)]">
          <div>
            <span className="badge badge-accent mb-2">{event.category}</span>
            <h3 id="event-modal-title" className="font-display text-xl font-bold">
              {event.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost btn !px-2.5 !py-2"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6">
          {/* About */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              About
            </h4>
            <p className="text-[var(--text-secondary)]">{event.description}</p>
          </div>

          {/* Details grid */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Details
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {details.map((d) => (
                <div key={d.label} className="surface-card p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center shrink-0">
                    <d.icon size={16} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      {d.label}
                    </p>
                    <p className="text-sm text-[var(--text-primary)] font-medium">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Rules
            </h4>
            <ul className="space-y-2">
              {event.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <Medal size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Registration CTA */}
          <div className="surface-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Ready to participate?</p>
              <p className="text-xs text-[var(--text-muted)]">
                {event.registrationLink === 'TBA'
                  ? 'Registration link will be available soon.'
                  : 'Click to register for this event.'}
              </p>
            </div>
            <button
              onClick={() => scrollTo('register')}
              className="btn btn-primary w-full sm:w-auto"
              disabled={event.status === 'Coming Soon'}
            >
              Register
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

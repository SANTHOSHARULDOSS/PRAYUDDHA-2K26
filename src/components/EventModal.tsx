import { useEffect, useRef } from 'react';
import {
  X,
  Users,
  Clock,
  IndianRupee,
  Trophy,
  GraduationCap,
  ListChecks,
  Medal,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Brain,
} from 'lucide-react';
import type { SymposiumEvent } from '@/data/events';

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

  const isTech = event.category === 'Technical';

  const details = [
    { icon: Users, label: 'Team Size', value: event.teamSize },
    { icon: IndianRupee, label: 'Entry Fee', value: 'Single Entry Fee for Full Symposium' },
    { icon: Clock, label: 'Duration', value: event.duration },
    { icon: ListChecks, label: 'Rounds', value: event.rounds },
    { icon: GraduationCap, label: 'Eligibility', value: event.eligibility },
    { icon: Trophy, label: 'Prizes', value: event.prizes },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="surface-elevated w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[var(--radius-xl)] border border-[var(--border)] shadow-2xl animate-scale-in"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-[var(--border)] bg-[var(--surface-elevated)] backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-accent">{event.category}</span>
              {isTech && <span className="badge badge-success">₹1,000 | ₹500</span>}
            </div>
            <h3 id="event-modal-title" className="font-display text-xl sm:text-2xl font-bold">
              {event.name}
            </h3>
            {event.tagline && (
              <p className="text-xs sm:text-sm font-semibold text-[var(--accent)] mt-0.5">
                {event.tagline}
              </p>
            )}
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
        <div className="p-5 sm:p-6 space-y-6">
          {/* Concept / Description */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Event Concept
            </h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {event.concept ?? event.description}
            </p>
          </div>

          {/* Details grid */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Event Information
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {details.map((d) => (
                <div key={d.label} className="surface-card p-3 flex items-start gap-3 rounded-xl border border-[var(--border)]">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center shrink-0">
                    <d.icon size={16} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      {d.label}
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--text-primary)] font-medium">
                      {d.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rounds Details (if any) */}
          {event.roundsDetails && event.roundsDetails.length > 0 && (
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Rounds Overview
              </h4>
              <div className="space-y-2">
                {event.roundsDetails.map((rd, i) => (
                  <div key={i} className="surface-card p-3.5 rounded-xl border border-[var(--border)] flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {rd}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Rules & Guidelines
            </h4>
            <ul className="space-y-2">
              {event.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                  <Medal size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evaluation Criteria (if any) */}
          {event.evaluationCriteria && event.evaluationCriteria.length > 0 && (
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Evaluation Criteria
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {event.evaluationCriteria.map((ec, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--code-bg)] text-xs text-[var(--text-secondary)]">
                    <CheckCircle2 size={14} className="text-[var(--accent)] shrink-0" />
                    <span>{ec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Winner Selection Criteria */}
          {event.winnerCriteria && (
            <div className="p-3.5 rounded-xl bg-[var(--accent-light)]/40 border border-[var(--accent)]/30">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-1 flex items-center gap-1.5">
                <Trophy size={14} /> Winner Selection
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-primary)] font-medium">
                {event.winnerCriteria}
              </p>
            </div>
          )}

          {/* Skills Tested */}
          {event.skillsTested && event.skillsTested.length > 0 && (
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
                <Brain size={14} /> Skills Tested
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {event.skillsTested.map((skill) => (
                  <span key={skill} className="badge badge-neutral text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Registration CTA */}
          <div className="surface-card p-4 rounded-xl border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Ready to participate?</p>
              <p className="text-xs text-[var(--text-muted)]">
                {event.registrationLink === 'TBA'
                  ? 'Registration is open. Register now to secure your spot!'
                  : 'Click to register for this event.'}
              </p>
            </div>
            <button
              onClick={() => scrollTo('register')}
              className="btn btn-primary w-full sm:w-auto"
              disabled={event.status === 'Coming Soon'}
            >
              Register Now
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


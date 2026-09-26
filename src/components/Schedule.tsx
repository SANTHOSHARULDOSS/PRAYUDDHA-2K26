import { Clock, MapPin } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function Schedule() {
  const { schedule } = useCMS();
  const ref = useRevealOnScroll<HTMLElement>();

  const sortedSchedule = [...schedule].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="schedule" ref={ref} className="section-py">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Timeline</span>
          <h2 className="section-title mt-2 mb-4">Symposium Schedule</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Plan your day at PRAYUDDHA 2K26.
          </p>
        </div>

        <div className="max-w-3xl mx-auto surface-card rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm divide-y divide-[var(--border)] reveal bg-[var(--surface)]">
          {sortedSchedule.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                item.isBreak
                  ? 'bg-amber-500/10 border-l-4 border-l-amber-500'
                  : item.isEnd
                  ? 'bg-[var(--accent-light)]/20 border-l-4 border-l-[var(--accent)]'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[var(--accent)] block">
                    {item.time}
                  </span>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
                    {item.programme}
                  </h3>
                  {item.venue && (
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 flex items-center gap-1 font-medium">
                      <MapPin size={12} /> {item.venue}
                    </p>
                  )}
                </div>
              </div>

              {item.isBreak && <span className="badge badge-warning text-xs">Biryani Lunch</span>}
              {item.isEnd && <span className="badge badge-accent text-xs">Conclusion</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

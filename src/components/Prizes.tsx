import { Trophy, Medal, Crown, Gift, Sparkles } from 'lucide-react';
import { prizes } from '@/data/prizes';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function Prizes() {
  const ref = useRevealOnScroll<HTMLElement>();

  return (
    <section id="prizes" ref={ref} className="section-py">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="section-eyebrow">Prizes</span>
          <h2 className="section-title mt-2 mb-4">Prizes & Rewards</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Compete for glory and cash prizes across technical and non-technical symposium events.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Technical */}
          <div className="surface-card p-6 text-center reveal rounded-2xl border border-[var(--border)] shadow-sm relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="badge badge-accent text-[10px] uppercase font-bold">
                Cash Prizes
              </span>
            </div>
            <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-4">
              <Trophy size={26} className="text-[var(--accent)]" />
            </div>
            <h3 className="font-display text-lg font-bold mb-4">Technical Events</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--code-bg)] border border-[var(--border)]">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Medal size={18} className="text-amber-500" />
                  1st Prize
                </span>
                <span className="text-base font-bold text-[var(--accent)]">
                  {prizes.technical.first}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--code-bg)] border border-[var(--border)]">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Medal size={18} className="text-slate-400" />
                  2nd Prize
                </span>
                <span className="text-base font-bold text-[var(--text-primary)]">
                  {prizes.technical.second}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-4 font-medium">
              Applicable to all 4 Technical Events (Pixel2Alchemy, WebSprint, Trace-X, Idea Squash).
            </p>
          </div>

          {/* Non-Technical */}
          <div className="surface-card p-6 text-center reveal rounded-2xl border border-[var(--border)] shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-4">
              <Gift size={26} className="text-[var(--accent)]" />
            </div>
            <h3 className="font-display text-lg font-bold mb-4">Non-Technical Events</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--code-bg)] border border-[var(--border)]">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles size={16} className="text-[var(--accent)]" />
                  Awards & Gifts
                </span>
                <span className="text-xs font-semibold text-[var(--text-secondary)]">
                  To Be Announced
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-6 font-medium">
              Exciting gifts, mementos, and certificates will be awarded to winners.
            </p>
          </div>

          {/* Overall Champion */}
          <div className="surface-card p-6 text-center reveal rounded-2xl border-2 border-[var(--accent)] shadow-md relative overflow-hidden bg-[var(--surface)]">
            <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-4">
              <Crown size={28} className="text-[var(--accent)]" />
            </div>
            <h3 className="font-display text-lg font-bold mb-2">Overall Champion</h3>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Highest scoring overall college institution
            </p>
            <div className="px-4 py-3 rounded-xl bg-[var(--accent-light)] border border-[var(--accent)]/30 text-center">
              <span className="text-sm font-bold text-[var(--accent)]">
                {prizes.overallChampion}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


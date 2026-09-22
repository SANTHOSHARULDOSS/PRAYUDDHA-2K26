import { Trophy, Medal, Crown } from 'lucide-react';
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
            Compete for glory. Prize details will be announced soon.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {/* Technical */}
          <div className="surface-card p-6 text-center reveal">
            <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-4">
              <Trophy size={26} className="text-[var(--accent)]" />
            </div>
            <h3 className="font-display text-lg font-bold mb-4">Technical Events</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[var(--code-bg)]">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Medal size={16} className="text-[var(--warning)]" />
                  1st Prize
                </span>
                <span className="text-sm text-[var(--text-muted)]">{prizes.technical.first}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[var(--code-bg)]">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Medal size={16} className="text-[var(--text-muted)]" />
                  2nd Prize
                </span>
                <span className="text-sm text-[var(--text-muted)]">{prizes.technical.second}</span>
              </div>
            </div>
          </div>

          {/* Non-Technical */}
          <div className="surface-card p-6 text-center reveal">
            <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-4">
              <Trophy size={26} className="text-[var(--accent)]" />
            </div>
            <h3 className="font-display text-lg font-bold mb-4">Non-Technical Events</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[var(--code-bg)]">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Medal size={16} className="text-[var(--warning)]" />
                  1st Prize
                </span>
                <span className="text-sm text-[var(--text-muted)]">{prizes.nonTechnical.first}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[var(--code-bg)]">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Medal size={16} className="text-[var(--text-muted)]" />
                  2nd Prize
                </span>
                <span className="text-sm text-[var(--text-muted)]">{prizes.nonTechnical.second}</span>
              </div>
            </div>
          </div>

          {/* Overall Champion */}
          <div className="surface-card p-6 text-center reveal border-[var(--accent)]">
            <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-4">
              <Crown size={26} className="text-[var(--accent)]" />
            </div>
            <h3 className="font-display text-lg font-bold mb-4">Overall Champion</h3>
            <div className="flex items-center justify-center px-4 py-2.5 rounded-lg bg-[var(--code-bg)]">
              <span className="text-sm text-[var(--text-muted)]">{prizes.overallChampion}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

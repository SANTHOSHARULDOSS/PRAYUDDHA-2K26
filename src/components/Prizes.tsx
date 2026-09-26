import { Trophy, Award, Gift, Star } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function Prizes() {
  const { prizes } = useCMS();
  const ref = useRevealOnScroll<HTMLElement>();

  return (
    <section id="prizes" ref={ref} className="section-py">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Awards & Recognition</span>
          <h2 className="section-title mt-2 mb-4">Prizes & Rewards</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Exciting cash rewards, trophies, and participation certificates for all participants.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Technical Prizes Card */}
          <div className="surface-card p-6 rounded-2xl border border-[var(--accent)] reveal text-center space-y-4 relative overflow-hidden bg-[var(--surface)]">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mx-auto">
              <Trophy size={28} />
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
              Technical Events Pool
            </h3>
            <div className="space-y-2 text-sm pt-2 border-t border-[var(--border)]">
              <div className="flex items-center justify-between font-medium">
                <span className="text-[var(--text-secondary)]">1st Prize:</span>
                <span className="font-bold text-[var(--accent)] text-base">{prizes.techFirst}</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="text-[var(--text-secondary)]">2nd Prize:</span>
                <span className="font-bold text-[var(--text-primary)]">{prizes.techSecond}</span>
              </div>
            </div>
          </div>

          {/* Non-Technical Prizes Card */}
          <div className="surface-card p-6 rounded-2xl border border-[var(--border)] reveal text-center space-y-4 bg-[var(--surface)]">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mx-auto">
              <Gift size={28} />
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
              Non-Technical Events Pool
            </h3>
            <div className="space-y-2 text-sm pt-2 border-t border-[var(--border)]">
              <div className="flex items-center justify-between font-medium">
                <span className="text-[var(--text-secondary)]">1st Winner:</span>
                <span className="font-bold text-[var(--accent)] text-base">{prizes.nonTechFirst}</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="text-[var(--text-secondary)]">2nd Winner:</span>
                <span className="font-bold text-[var(--text-primary)]">{prizes.nonTechSecond}</span>
              </div>
            </div>
          </div>

          {/* Overall Championship Card */}
          <div className="surface-card p-6 rounded-2xl border-2 border-amber-500/50 reveal text-center space-y-4 bg-amber-500/5 sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
              <Award size={28} />
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
              Overall Championship
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-semibold">
              {prizes.overallChampion}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

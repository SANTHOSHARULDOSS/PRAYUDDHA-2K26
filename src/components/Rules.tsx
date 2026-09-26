import { Info, UserPlus, CreditCard, Shirt, ListChecks, Phone, Clock, ShieldAlert } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function Rules() {
  const { rules } = useCMS();
  const ref = useRevealOnScroll<HTMLElement>();

  return (
    <section id="rules" ref={ref} className="section-py bg-[var(--surface)]/50">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Guidelines</span>
          <h2 className="section-title mt-2 mb-4">Rules & Information</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Important guidelines for smooth participation in PRAYUDDHA 2K26.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {rules.map((category) => (
            <div
              key={category.id || category.category}
              className="surface-card p-6 rounded-2xl border border-[var(--border)] reveal space-y-3 bg-[var(--surface)]"
            >
              <h3 className="font-display font-bold text-lg text-[var(--accent)] border-b border-[var(--border)] pb-2 flex items-center gap-2">
                <Info size={18} />
                {category.category}
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {category.rules.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 mt-2" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

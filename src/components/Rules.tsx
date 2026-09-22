import { useState } from 'react';
import { ChevronDown, Info, UserPlus, ListChecks, CreditCard, Clock, Shirt, IdCard, XCircle, Phone } from 'lucide-react';
import { ruleCategories } from '@/data/rules';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

const iconMap: Record<string, typeof Info> = {
  info: Info,
  'user-plus': UserPlus,
  'list-checks': ListChecks,
  'credit-card': CreditCard,
  clock: Clock,
  shirt: Shirt,
  'id-card': IdCard,
  'x-circle': XCircle,
  phone: Phone,
};

export default function Rules() {
  const ref = useRevealOnScroll<HTMLElement>();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="rules" ref={ref} className="section-py bg-[var(--surface)]/50">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Rules</span>
          <h2 className="section-title mt-2 mb-4">Symposium Rules</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Please review the guidelines carefully before participating.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {ruleCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] ?? Info;
            const isOpen = openIdx === idx;
            return (
              <div key={cat.category} className="surface-card overflow-hidden reveal">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--accent-light)] flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[var(--accent)]" />
                    </div>
                    <span className="font-display font-semibold">{cat.category}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-[var(--text-muted)] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <ul className="px-4 pb-4 pl-16 space-y-2">
                    {cat.rules.map((rule, i) => (
                      <li
                        key={i}
                        className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

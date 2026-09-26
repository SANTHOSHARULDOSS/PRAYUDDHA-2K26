import { Phone, Crown } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function Team() {
  const { team } = useCMS();
  const ref = useRevealOnScroll<HTMLElement>();

  const sortedTeam = [...team].sort((a, b) => a.displayOrder - b.displayOrder);
  const priorityMembers = sortedTeam.filter((m) => m.priority);
  const regularMembers = sortedTeam.filter((m) => !m.priority);

  return (
    <section id="team" ref={ref} className="section-py bg-[var(--surface)]/50">
      <div className="container-px">
        {/* Core Committee */}
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Team</span>
          <h2 className="section-title mt-2 mb-4">Core Organizing Committee</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            The leadership behind PRAYUDDHA 2K26.
          </p>
        </div>

        {/* President & VP — prominent */}
        {priorityMembers.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-6">
            {priorityMembers.map((member) => (
              <div
                key={member.id}
                className="surface-card p-6 text-center reveal border-[var(--accent)]"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-3">
                  <Crown size={26} className="text-[var(--accent)]" />
                </div>
                <h3 className="font-display text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-[var(--accent)] font-semibold mb-2">{member.role}</p>
                {member.phone && (
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-mono"
                  >
                    <Phone size={14} />
                    {member.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Other committee members */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
          {regularMembers.map((member) => (
            <div key={member.id} className="surface-card p-4 flex items-center justify-between reveal">
              <div>
                <h4 className="font-display font-semibold text-sm">{member.name}</h4>
                <p className="text-xs text-[var(--text-muted)]">{member.role}</p>
              </div>
              {member.phone && (
                <a
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="btn-ghost btn !px-2 !py-1.5"
                  aria-label={`Call ${member.name}`}
                >
                  <Phone size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

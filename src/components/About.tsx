import { Target, Eye, Zap, Users, Building2, Lightbulb } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

const pillars = [
  {
    icon: Lightbulb,
    title: 'IDEAS',
    description: 'A platform where innovation meets opportunity, and ideas take center stage.',
  },
  {
    icon: Users,
    title: 'PEOPLE',
    description: 'Bringing together students, faculty, and minds from across institutions.',
  },
  {
    icon: Zap,
    title: 'OPPORTUNITIES',
    description: 'Compete, collaborate, and build connections that extend beyond the classroom.',
  },
  {
    icon: Target,
    title: 'IMPACT',
    description: 'Where ideas ignite and impacts resonate far beyond the symposium.',
  },
];

export default function About() {
  const ref = useRevealOnScroll<HTMLElement>();

  return (
    <section id="about" ref={ref} className="section-py">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="section-eyebrow">About</span>
          <h2 className="section-title mt-2 mb-4">About PRAYUDDHA</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            PRAYUDDHA 2K26 is an inter-collegiate technical and non-technical symposium organized by
            the Department of Information Technology and the Department of Artificial Intelligence &
            Machine Learning at the University College of Engineering (BIT) Campus, Anna University,
            Tiruchirappalli.
          </p>
        </div>

        {/* Institutional & Department Banner */}
        <div className="surface-card p-6 sm:p-8 mb-12 rounded-2xl border border-[var(--border)] reveal flex flex-col md:flex-row items-center justify-between gap-6 bg-[var(--surface)]">
          <div className="flex items-center gap-4 shrink-0">
            <img
              src="/images/branding/anna-university-logo.png"
              alt="Anna University Logo"
              className="h-16 sm:h-20 w-auto object-contain"
            />
            <div className="h-12 w-px bg-[var(--border)] hidden sm:block" />
            <img
              src="/images/branding/prayuddha-logo.png"
              alt="PRAYUDDHA Emblem"
              className="h-14 sm:h-18 w-auto object-contain hidden xs:block"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              Official University Symposium
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-1">
              {SITE_CONFIG.institution}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Anna University, Tiruchirappalli – 620024
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="surface-card p-6 sm:p-8 reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                <Eye size={20} className="text-[var(--accent)]" />
              </div>
              <h3 className="font-display text-xl font-bold">Vision</h3>
            </div>
            <p className="text-[var(--text-secondary)]">
              To create a platform where students from diverse institutions converge to exchange
              ideas, showcase talent, and push the boundaries of innovation beyond conventional
              limits.
            </p>
          </div>
          <div className="surface-card p-6 sm:p-8 reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                <Target size={20} className="text-[var(--accent)]" />
              </div>
              <h3 className="font-display text-xl font-bold">Mission</h3>
            </div>
            <p className="text-[var(--text-secondary)]">
              To foster a competitive yet collaborative environment that encourages technical
              excellence, creative expression, and intellectual growth among future engineers and
              innovators.
            </p>
          </div>
        </div>

        {/* Why PRAYUDDHA */}
        <div className="surface-card p-6 sm:p-8 mb-12 reveal">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
              <Zap size={20} className="text-[var(--accent)]" />
            </div>
            <h3 className="font-display text-xl font-bold">Why PRAYUDDHA?</h3>
          </div>
          <p className="text-[var(--text-secondary)] mb-4">
            PRAYUDDHA — meaning "battle" — is more than a competition. It is a symposium beyond
            boundaries where ideas battle, minds clash, and innovation emerges victorious. It
            celebrates the spirit of inquiry, the courage to compete, and the joy of collaboration.
          </p>
          <p className="font-display font-semibold text-[var(--accent)]">
            {SITE_CONFIG.tagline}
          </p>
        </div>

        {/* Core values pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {pillars.map((p) => (
            <div key={p.title} className="surface-card p-5 text-center reveal">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-3">
                <p.icon size={22} className="text-[var(--accent)]" />
              </div>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-2">
                {p.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Organizing departments */}
        <div className="surface-card p-6 sm:p-8 reveal">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
              <Building2 size={20} className="text-[var(--accent)]" />
            </div>
            <h3 className="font-display text-xl font-bold">Organizing Departments</h3>
          </div>
          <ul className="space-y-2">
            {SITE_CONFIG.departments.map((dept) => (
              <li key={dept} className="flex items-center gap-2 text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                {dept}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)]">
              {SITE_CONFIG.institution} · {SITE_CONFIG.university}, {SITE_CONFIG.city} –{' '}
              {SITE_CONFIG.pincode}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

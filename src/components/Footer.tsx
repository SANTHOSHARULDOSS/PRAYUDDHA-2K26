import { Heart } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container-px py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-lg mb-2">
              <span className="text-[var(--accent)]">PRAYUDDHA</span> 2K26
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-2">{SITE_CONFIG.motto}</p>
            <p className="text-xs text-[var(--text-muted)]">{SITE_CONFIG.slogan}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-1.5">
              {SITE_CONFIG.navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href.slice(1));
                    }}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Explore</h4>
            <ul className="space-y-1.5">
              {SITE_CONFIG.navLinks.slice(5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href.slice(1));
                    }}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#register"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('register');
                  }}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Address</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {SITE_CONFIG.institution}
              <br />
              {SITE_CONFIG.university}
              <br />
              {SITE_CONFIG.city} – {SITE_CONFIG.pincode}
              <br />
              {SITE_CONFIG.state}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 PRAYUDDHA 2K26. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
            Built with <Heart size={12} className="text-[var(--danger)]" /> by the IT & AIML Departments
          </p>
        </div>
      </div>
    </footer>
  );
}

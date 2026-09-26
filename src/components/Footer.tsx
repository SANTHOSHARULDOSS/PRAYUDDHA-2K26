import { useState, useRef, useEffect } from 'react';
import { Heart, X, Code, UserCheck, Shield } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const { siteConfig } = useCMS();
  const [showCredits, setShowCredits] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowCredits(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] relative">
      <div className="container-px py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/images/branding/anna-university-logo.png"
                alt="Anna University Crest"
                className="h-10 w-auto object-contain"
              />
              <div className="h-6 w-px bg-[var(--border)]" />
              <img
                src="/images/branding/prayuddha-logo.png"
                alt="PRAYUDDHA Logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <h3 className="font-display font-bold text-lg">
              <span className="text-[var(--accent)]">{siteConfig.siteName.split(' ')[0]}</span> {siteConfig.edition}
            </h3>
            <p className="text-sm text-[var(--text-muted)]">{siteConfig.motto}</p>
            <p className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              {siteConfig.slogan}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-1.5">
              {siteConfig.navLinks.slice(0, 5).map((link) => (
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
            <h4 className="font-display font-semibold text-sm mb-3">Explore & Admin</h4>
            <ul className="space-y-1.5">
              {siteConfig.navLinks.slice(5).map((link) => (
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
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="text-sm text-[var(--accent)] font-semibold hover:underline flex items-center gap-1 mt-1"
                  >
                    <Shield size={13} />
                    Admin Portal (/admin)
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Address</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {siteConfig.institution}
              <br />
              {siteConfig.university}
              <br />
              {siteConfig.city} – {siteConfig.pincode}
              <br />
              {siteConfig.state}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 PRAYUDDHA 2K26. All rights reserved.
          </p>

          <button
            onClick={() => setShowCredits(true)}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 cursor-pointer focus:outline-none py-1 px-2 rounded-md hover:bg-[var(--code-bg)]"
            title="Click to view website credits"
          >
            <span>Built with</span>
            <Heart size={12} className="text-[var(--danger)] fill-[var(--danger)]" />
            <span>by the IT & AIML Departments</span>
          </button>
        </div>
      </div>

      {/* CREDITS POPOVER MODAL */}
      {showCredits && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowCredits(false)}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="surface-elevated max-w-sm w-full p-6 rounded-2xl border border-[var(--border)] shadow-2xl space-y-4 animate-scale-in text-center relative bg-[var(--surface-elevated)]"
          >
            <button
              onClick={() => setShowCredits(false)}
              className="absolute top-3.5 right-3.5 p-1 rounded-lg hover:bg-[var(--code-bg)] text-[var(--text-muted)] transition-colors"
              aria-label="Close credits panel"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mx-auto mb-2">
              <Code size={22} />
            </div>

            <div>
              <span className="badge badge-accent text-[10px] font-bold uppercase tracking-wider mb-2">
                Website Credits
              </span>
              <h4 className="font-display font-bold text-lg text-[var(--text-primary)]">
                Built with care for PRAYUDDHA 2K26
              </h4>
            </div>

            <div className="surface-card p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <p className="font-display text-base font-extrabold text-[var(--accent)] flex items-center justify-center gap-1.5">
                <UserCheck size={16} /> Santhosh
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Vice President
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-medium pt-1">
                Website Design & Development
              </p>
              <p className="text-[11px] text-[var(--text-muted)] pt-0.5">
                Department of Information Technology & AI-ML
              </p>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] italic">
              Anna University, BIT Campus, Tiruchirappalli
            </p>

            <button
              onClick={() => setShowCredits(false)}
              className="btn btn-secondary text-xs !py-1.5 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

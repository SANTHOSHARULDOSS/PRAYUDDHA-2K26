import { useEffect, useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useBodyScrollLock(isOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = SITE_CONFIG.navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (href: string) => {
    closeMenu();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-px flex items-center justify-between h-16">
          {/* Brand & Logos */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 shrink-0 group"
          >
            <img
              src="/images/anna-university-logo.png"
              alt="Anna University Logo"
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="h-6 w-px bg-[var(--border)] hidden xs:block" />
            <img
              src="/images/prayuddha-logo.png"
              alt="PRAYUDDHA Logo"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] leading-tight flex items-center gap-1">
                <span className="text-[var(--accent)]">PRAYUDDHA</span>
                <span className="text-xs font-semibold text-[var(--text-muted)]">2K26</span>
              </span>
              <span className="text-[10px] font-medium text-[var(--text-muted)] hidden xl:block">
                Anna University, BIT Campus
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {SITE_CONFIG.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick('#register')}
              className="btn btn-primary hidden sm:flex"
            >
              <Calendar size={16} />
              Register Now
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="btn-ghost btn !px-2.5 !py-2 lg:hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-16 right-0 bottom-0 z-40 w-[80%] max-w-sm bg-[var(--surface)] border-l border-[var(--border)] lg:hidden transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1 p-4 pt-6">
          {SITE_CONFIG.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                activeSection === link.href.slice(1)
                  ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--code-bg)]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => handleNavClick('#register')}
            className="btn btn-primary mt-4 w-full"
          >
            <Calendar size={16} />
            Register Now
          </button>
        </div>
      </div>
    </>
  );
}

import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme, type Theme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { id: Theme; label: string; icon: typeof Sun }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'prayuddha', label: 'PRAYUDDHA', icon: Sparkles },
  ];

  const current = options.find((o) => o.id === theme) ?? options[0];
  const CurrentIcon = current.icon;

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn-secondary !px-2.5 !py-1.5 flex items-center gap-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
        aria-label={`Current Theme: ${current.label}. Click to switch theme.`}
        aria-expanded={isOpen}
      >
        <CurrentIcon size={15} className={theme === 'prayuddha' ? 'text-[var(--accent)]' : ''} />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown size={12} className="text-[var(--text-muted)]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 surface-card rounded-xl border border-[var(--border)] shadow-xl p-1 z-50 animate-scale-in">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setTheme(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                  isSelected
                    ? 'bg-[var(--accent-light)] text-[var(--accent)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--code-bg)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon size={14} className={opt.id === 'prayuddha' ? 'text-amber-500' : ''} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


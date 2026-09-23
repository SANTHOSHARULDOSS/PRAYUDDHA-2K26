import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'prayuddha';

const STORAGE_KEY = 'prayuddha-theme';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark' || stored === 'prayuddha') {
    return stored;
  }
  // Light theme MUST be the default theme for first-time visitors
  return 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme };
}


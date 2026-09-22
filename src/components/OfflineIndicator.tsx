import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 surface-card px-4 py-2 flex items-center gap-2 text-sm shadow-lg animate-fade-in-up">
      <WifiOff size={16} className="text-[var(--warning)]" />
      <span className="text-[var(--text-secondary)]">You're offline. Some features may be unavailable.</span>
    </div>
  );
}

import { useState } from 'react';
import { Lock, User, KeyRound, ShieldCheck, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onGoHome: () => void;
}

export default function AdminLogin({ onLoginSuccess, onGoHome }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const inputUser = username.trim().toLowerCase();
    const inputPass = password;

    try {
      // 1. Try Supabase Auth if Supabase is configured
      if (isSupabaseConfigured && supabase) {
        // Map username or email to valid format
        const email = inputUser.includes('@') ? inputUser : `${inputUser}@prayuddha2k26.org`;
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password: inputPass,
        });

        if (!authError && data.session) {
          sessionStorage.setItem('prayuddha_admin_auth', 'true');
          sessionStorage.setItem('prayuddha_admin_user', data.user.email || 'Admin');
          onLoginSuccess();
          setIsLoading(false);
          return;
        } else if (authError && !authError.message.includes('Invalid login credentials')) {
          console.warn('Supabase Auth error:', authError.message);
        }
      }

      // 2. Fallback check for local development credentials
      const savedPassword = localStorage.getItem('prayuddha_admin_password');
      const savedUsername = localStorage.getItem('prayuddha_admin_username');

      const isAcc1 =
        (inputUser === 'admin' || (savedUsername && inputUser === savedUsername.toLowerCase())) &&
        (inputPass === 'admin@sandy' || (savedPassword && inputPass === savedPassword));

      const isAcc2 = inputUser === 'prayuddha' && inputPass === 'aubit@it';

      if (isAcc1 || isAcc2) {
        sessionStorage.setItem('prayuddha_admin_auth', 'true');
        sessionStorage.setItem('prayuddha_admin_user', inputUser === 'prayuddha' ? 'PRAYUDDHA' : 'Admin');
        onLoginSuccess();
      } else {
        setError('Invalid admin credentials. Please check your username and password.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--accent)]/10 blur-3xl" />

      <button
        onClick={onGoHome}
        className="absolute top-6 left-6 text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Public Website
      </button>

      <div className="w-full max-w-md surface-card p-8 rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-2xl space-y-6 relative z-10 backdrop-blur-md">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center mx-auto mb-3 border border-[var(--accent)]/30 shadow-inner">
            <ShieldCheck size={32} />
          </div>
          <span className="badge badge-accent text-xs uppercase tracking-wider font-bold">
            PRAYUDDHA 2K26 CMS
          </span>
          <h1 className="font-display text-2xl font-extrabold text-white">Admin Portal</h1>
          <p className="text-xs text-zinc-400">
            Log in to manage live website content, events, poster, gallery, and registrations.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-zinc-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3 top-3 text-zinc-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Lock size={16} />
            Authenticate & Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

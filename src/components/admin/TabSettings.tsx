import { useState } from 'react';
import { Database, Shield, Key, Download, Upload, RotateCcw, CheckCircle2, Copy, AlertTriangle } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { cmsService } from '@/services/cmsService';
import type { CMSState } from '@/types/cms';

interface TabSettingsProps {
  data: CMSState;
}

export default function TabSettings({ data }: TabSettingsProps) {
  const [newPassword, setNewPassword] = useState('');
  const [showSql, setShowSql] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }
    localStorage.setItem('prayuddha_admin_password', newPassword);
    setNewPassword('');
    showToast('Admin password updated successfully!');
  };

  const handleExportBackup = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prayuddha-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CMS JSON Backup downloaded!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedState = JSON.parse(event.target?.result as string);
        if (importedState && importedState.siteConfig) {
          localStorage.setItem('prayuddha_2k26_cms_state_v1', JSON.stringify(importedState));
          window.location.reload();
        } else {
          alert('Invalid backup JSON format.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all CMS content to original default seed data?')) {
      cmsService.resetToDefault();
      window.location.reload();
    }
  };

  const sqlCode = `-- PRAYUDDHA 2K26 SUPABASE DATABASE TABLES
-- Copy and run in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS site_config (id TEXT PRIMARY KEY DEFAULT 'default', google_form_url TEXT, registration_status TEXT, qr_code_url TEXT, updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS gallery (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT, description TEXT, category TEXT, image_url TEXT, display_order INT, is_published BOOL);
CREATE TABLE IF NOT EXISTS poster (id TEXT PRIMARY KEY DEFAULT 'default', poster_url TEXT, caption TEXT, is_published BOOL);
CREATE TABLE IF NOT EXISTS brochure (id TEXT PRIMARY KEY DEFAULT 'default', page1_url TEXT, page2_url TEXT, title TEXT, is_published BOOL);
CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, name TEXT, category TEXT, description TEXT, prizes TEXT, status TEXT, is_published BOOL);
CREATE TABLE IF NOT EXISTS team (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT, role TEXT, phone TEXT, priority BOOL);
`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Database size={22} className="text-[var(--accent)]" />
            Database Architecture & System Settings
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Check Supabase connection status, change admin password, backup/restore CMS JSON data, or view SQL schema.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Database Status Card */}
        <div className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4 text-white">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-display font-bold text-base flex items-center gap-2">
              <Database size={18} className="text-[var(--accent)]" /> Backend & Database Connection
            </h3>
            <span className={`badge text-[10px] ${isSupabaseConfigured ? 'badge-success' : 'badge-warning'}`}>
              {isSupabaseConfigured ? 'Supabase Connected' : 'Local Persistence Active'}
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            {isSupabaseConfigured
              ? 'Supabase cloud database and storage are active. Content edits sync automatically to your Supabase tables.'
              : 'Local persistent storage (LocalStorage + IndexedDB + Base64 media) is active. Content changes reflect live immediately on public pages without requiring backend setup.'}
          </p>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
            <p className="font-bold text-white">Supabase Setup Instructions (Optional):</p>
            <p className="text-zinc-400 text-[11px]">
              Add <code className="text-emerald-400 font-mono">VITE_SUPABASE_URL</code> and <code className="text-emerald-400 font-mono">VITE_SUPABASE_ANON_KEY</code> to your environment variables on Vercel or <code className="text-emerald-400 font-mono">.env</code>.
            </p>

            <button
              onClick={() => setShowSql(!showSql)}
              className="btn btn-secondary text-[11px] !py-1 w-full mt-1"
            >
              {showSql ? 'Hide SQL Schema Script' : 'View One-Click Supabase SQL Script'}
            </button>

            {showSql && (
              <div className="mt-2 p-3 rounded-lg bg-black text-[11px] font-mono text-emerald-400 overflow-x-auto relative">
                <button
                  onClick={copySql}
                  className="absolute top-2 right-2 text-xs bg-zinc-800 text-white px-2 py-1 rounded flex items-center gap-1"
                >
                  <Copy size={12} /> {copied ? 'Copied!' : 'Copy SQL'}
                </button>
                <pre>{sqlCode}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Change Admin Password Card */}
        <form onSubmit={handlePasswordChange} className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4 text-white">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-display font-bold text-base flex items-center gap-2">
              <Shield size={18} className="text-[var(--accent)]" /> Security & Admin Password
            </h3>
            <span className="badge badge-accent text-[10px]">Protected Route</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5">New Admin Password</label>
            <div className="relative">
              <Key size={16} className="absolute left-3 top-3 text-zinc-400" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white"
                placeholder="Enter new admin password"
              />
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Default password is "prayuddha2026". Minimum 6 characters.</p>
          </div>

          <button type="submit" className="btn btn-primary w-full py-2.5 text-xs font-bold">
            Update Admin Password
          </button>
        </form>
      </div>

      {/* Backup & Reset Card */}
      <div className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4 text-white">
        <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3">
          Backup, Restore & Reset CMS Data
        </h3>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleExportBackup}
            className="btn btn-secondary text-xs flex items-center gap-1.5"
          >
            <Download size={15} /> Export JSON Data Backup
          </button>

          <label className="btn btn-secondary text-xs cursor-pointer flex items-center gap-1.5">
            <Upload size={15} /> Restore JSON Backup
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>

          <button
            onClick={handleResetDefaults}
            className="btn btn-secondary text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-1.5 ml-auto"
          >
            <RotateCcw size={15} /> Reset All Content to Default Seed Data
          </button>
        </div>
      </div>
    </div>
  );
}

import {
  Image as ImageIcon,
  Calendar,
  Users,
  FileText,
  BookOpen,
  QrCode,
  Bell,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type { CMSState } from '@/types/cms';

interface TabOverviewProps {
  data: CMSState;
  onNavigateTab: (tab: string) => void;
}

export default function TabOverview({ data, onNavigateTab }: TabOverviewProps) {
  const publishedGalleryCount = data.gallery.filter((g) => g.isPublished).length;
  const publishedEventsCount = data.events.filter((e) => e.isPublished).length;
  const techEventsCount = data.events.filter((e) => e.category === 'Technical').length;
  const nonTechEventsCount = data.events.filter((e) => e.category === 'Non-Technical').length;

  return (
    <div className="space-y-6">
      {/* Top Banner Status */}
      <div className="surface-card p-6 rounded-2xl border border-[var(--accent)]/30 bg-gradient-to-r from-[var(--accent)]/10 via-zinc-900 to-zinc-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-accent text-xs uppercase font-bold">Live Production CMS</span>
            <span className="badge badge-success text-xs">Direct Live Updates Active</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
            PRAYUDDHA 2K26 Content Management System
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Changes made in this admin dashboard immediately reflect on the live website without Vercel/GitHub redeployment.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-xs flex items-center gap-1.5"
          >
            <ExternalLink size={14} />
            View Live Public Site
          </a>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gallery metric */}
        <button
          onClick={() => onNavigateTab('gallery')}
          className="surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-[var(--accent)] transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ImageIcon size={20} />
            </div>
            <span className="text-xs font-mono text-zinc-400 font-semibold group-hover:text-[var(--accent)]">
              Manage ↗
            </span>
          </div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Gallery Photos</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-display text-2xl font-bold text-white">{data.gallery.length}</span>
            <span className="text-xs text-zinc-400">{publishedGalleryCount} Published</span>
          </div>
        </button>

        {/* Events metric */}
        <button
          onClick={() => onNavigateTab('events')}
          className="surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-[var(--accent)] transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <span className="text-xs font-mono text-zinc-400 font-semibold group-hover:text-[var(--accent)]">
              Manage ↗
            </span>
          </div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Events</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-display text-2xl font-bold text-white">{data.events.length}</span>
            <span className="text-xs text-zinc-400">{techEventsCount} Tech | {nonTechEventsCount} Non-Tech</span>
          </div>
        </button>

        {/* Team metric */}
        <button
          onClick={() => onNavigateTab('team')}
          className="surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-[var(--accent)] transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Users size={20} />
            </div>
            <span className="text-xs font-mono text-zinc-400 font-semibold group-hover:text-[var(--accent)]">
              Manage ↗
            </span>
          </div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Committee Members</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-display text-2xl font-bold text-white">{data.team.length}</span>
            <span className="text-xs text-zinc-400">Core Leadership</span>
          </div>
        </button>

        {/* Registration status metric */}
        <button
          onClick={() => onNavigateTab('registration')}
          className="surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-[var(--accent)] transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <QrCode size={20} />
            </div>
            <span className="text-xs font-mono text-zinc-400 font-semibold group-hover:text-[var(--accent)]">
              Manage ↗
            </span>
          </div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Registration Status</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className={`font-display text-xl font-bold ${
              data.siteConfig.registrationStatus === 'OPEN' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {data.siteConfig.registrationStatus}
            </span>
            <span className="text-xs text-zinc-400">Google Form Active</span>
          </div>
        </button>
      </div>

      {/* Quick Status Cards Grid */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Poster Status Card */}
        <div className="surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[var(--accent)]" />
              <h3 className="font-display font-bold text-sm text-white">Official Poster Status</h3>
            </div>
            <span className={`badge text-[10px] ${data.poster.isPublished ? 'badge-success' : 'badge-neutral'}`}>
              {data.poster.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
          <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/40 border border-zinc-800 relative group">
            <img
              src={data.poster.posterUrl}
              alt="Poster Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => onNavigateTab('poster')}
            className="btn btn-secondary w-full text-xs flex items-center justify-center gap-1"
          >
            Manage Poster & Replace Image
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Brochure Status Card */}
        <div className="surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-[var(--accent)]" />
              <h3 className="font-display font-bold text-sm text-white">2-Page Brochure Status</h3>
            </div>
            <span className={`badge text-[10px] ${data.brochure.isPublished ? 'badge-success' : 'badge-neutral'}`}>
              {data.brochure.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-black/40 border border-zinc-800 relative">
              <img src={data.brochure.page1Url} alt="Page 1" className="w-full h-full object-cover" />
              <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                Page 1
              </span>
            </div>
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-black/40 border border-zinc-800 relative">
              <img src={data.brochure.page2Url} alt="Page 2" className="w-full h-full object-cover" />
              <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                Page 2
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('brochure')}
            className="btn btn-secondary w-full text-xs flex items-center justify-center gap-1"
          >
            Manage 2-Page Brochure
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Google Form & QR Card */}
        <div className="surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <QrCode size={18} className="text-[var(--accent)]" />
              <h3 className="font-display font-bold text-sm text-white">Registration & QR Code</h3>
            </div>
            <span className="badge badge-accent text-[10px]">Active Link</span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-zinc-400 block mb-0.5">Google Form URL:</span>
              <p className="font-mono text-[11px] text-emerald-400 truncate bg-zinc-950 p-2 rounded border border-zinc-800">
                {data.siteConfig.googleFormUrl}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <img
                src={data.siteConfig.qrCodeUrl}
                alt="QR Code"
                className="w-16 h-16 rounded-lg object-contain bg-white p-1 shrink-0"
              />
              <div className="space-y-1">
                <p className="font-bold text-white">UPI Fee: {data.siteConfig.registrationFee}</p>
                <p className="text-zinc-400">Phone: {data.siteConfig.upiPhone}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('registration')}
            className="btn btn-secondary w-full text-xs flex items-center justify-center gap-1"
          >
            Edit Google Form URL & QR
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Announcements Log Summary */}
      <div className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-[var(--accent)]" />
            <h3 className="font-display font-bold text-base text-white">Active Announcements & Notices</h3>
          </div>
          <button
            onClick={() => onNavigateTab('announcements')}
            className="btn btn-secondary text-xs"
          >
            Add / Edit Announcements
          </button>
        </div>

        <div className="space-y-2">
          {data.announcements.map((a) => (
            <div
              key={a.id}
              className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`badge text-[10px] ${
                    a.type === 'urgent' ? 'badge-danger' : a.type === 'warning' ? 'badge-warning' : 'badge-neutral'
                  }`}>
                    {a.type.toUpperCase()}
                  </span>
                  <p className="font-bold text-white text-sm">{a.title}</p>
                </div>
                <p className="text-zinc-400 line-clamp-1">{a.content}</p>
              </div>
              <span className={`badge shrink-0 text-[10px] ${a.isPublished ? 'badge-success' : 'badge-neutral'}`}>
                {a.isPublished ? 'Live' : 'Hidden'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

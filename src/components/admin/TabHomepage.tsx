import { useState } from 'react';
import { Home, CheckCircle2, Sparkles } from 'lucide-react';
import type { SiteConfigData } from '@/types/cms';
import { cmsService } from '@/services/cmsService';

interface TabHomepageProps {
  siteConfig: SiteConfigData;
}

export default function TabHomepage({ siteConfig }: TabHomepageProps) {
  const [siteName, setSiteName] = useState(siteConfig.siteName);
  const [edition, setEdition] = useState(siteConfig.edition);
  const [motto, setMotto] = useState(siteConfig.motto);
  const [slogan, setSlogan] = useState(siteConfig.slogan);
  const [tagline, setTagline] = useState(siteConfig.tagline);
  const [symposiumIdentity, setSymposiumIdentity] = useState(siteConfig.symposiumIdentity);
  const [eventDate, setEventDate] = useState(siteConfig.eventDate);
  const [eventDateShort, setEventDateShort] = useState(siteConfig.eventDateShort);
  const [eventDay, setEventDay] = useState(siteConfig.eventDay);
  const [eventTime, setEventTime] = useState(siteConfig.eventTime);
  const [venue, setVenue] = useState(siteConfig.venue);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.updateSiteConfig({
      siteName,
      edition,
      motto,
      slogan,
      tagline,
      symposiumIdentity,
      eventDate,
      eventDateShort,
      eventDay,
      eventTime,
      venue,
    });
    showToast('Homepage text & event dates updated live!');
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      <div className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Home size={22} className="text-[var(--accent)]" />
            Homepage Branding & Dates Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Edit Hero title, motto, slogans, event date, time, and venue details without code redeployments.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-5 text-white max-w-3xl">
        <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3 flex items-center gap-2">
          <Sparkles size={18} className="text-[var(--accent)]" /> Identity & Branding
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Site / Event Name</label>
            <input
              type="text"
              required
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Edition</label>
            <input
              type="text"
              required
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold text-[var(--accent)]"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Motto</label>
            <input
              type="text"
              required
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Slogan</label>
            <input
              type="text"
              required
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Tagline</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-medium"
            />
          </div>
        </div>

        <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3 pt-2">Event Date & Venue Details</h3>

        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Event Date</label>
            <input
              type="text"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Day of Week</label>
            <input
              type="text"
              required
              value={eventDay}
              onChange={(e) => setEventDay(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Event Timing</label>
            <input
              type="text"
              required
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Auditorium / Venue Location</label>
          <input
            type="text"
            required
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-semibold"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full py-3 text-sm font-bold shadow-lg">
          Save Homepage Text & Dates Live
        </button>
      </form>
    </div>
  );
}

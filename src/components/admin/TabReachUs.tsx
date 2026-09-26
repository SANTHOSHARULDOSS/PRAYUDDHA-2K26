import { useState } from 'react';
import { Navigation, Bus, MapPin, CheckCircle2, DollarSign } from 'lucide-react';
import type { TravelRouteData } from '@/types/cms';
import { cmsService } from '@/services/cmsService';

interface TabReachUsProps {
  travel: TravelRouteData;
}

export default function TabReachUs({ travel }: TabReachUsProps) {
  const [venueName, setVenueName] = useState(travel.venueName);
  const [bBlockInfo, setBBlockInfo] = useState(travel.bBlockInfo);
  const [cBlockInfo, setCBlockInfo] = useState(travel.cBlockInfo);
  const [trichyRouteInfo, setTrichyRouteInfo] = useState(travel.trichyRouteInfo);
  const [keeranurRouteInfo, setKeeranurRouteInfo] = useState(travel.keeranurRouteInfo);
  const [fareEstimate, setFareEstimate] = useState(travel.fareEstimate);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(travel.googleMapsUrl);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.updateTravelRoute({
      venueName,
      bBlockInfo,
      cBlockInfo,
      trichyRouteInfo,
      keeranurRouteInfo,
      fareEstimate,
      googleMapsUrl,
    });
    showToast('Travel & Reach Us routes updated live!');
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
            <Navigation size={22} className="text-[var(--accent)]" />
            Travel & Reach Us / Bus Routes Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Centralized source of truth for venue block information, Trichy & Keeranur bus routes, drop points, and fare estimates.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-5 text-white max-w-3xl">
        <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3 flex items-center gap-2">
          <MapPin size={18} className="text-[var(--accent)]" /> Venue & Block Information
        </h3>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Venue Auditorium Name</label>
          <input
            type="text"
            required
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">B-Block Description</label>
            <input
              type="text"
              required
              value={bBlockInfo}
              onChange={(e) => setBBlockInfo(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">C-Block Description</label>
            <input
              type="text"
              required
              value={cBlockInfo}
              onChange={(e) => setCBlockInfo(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs"
            />
          </div>
        </div>

        <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3 pt-2 flex items-center gap-2">
          <Bus size={18} className="text-[var(--accent)]" /> Bus Routes & Instructions
        </h3>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">
            Route 1: From Trichy Central / Chathiram / Mannarpuram / Panjapur
          </label>
          <textarea
            rows={2}
            required
            value={trichyRouteInfo}
            onChange={(e) => setTrichyRouteInfo(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs leading-relaxed resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">
            Route 2: From Keeranur / Pudukkottai Side
          </label>
          <textarea
            rows={2}
            required
            value={keeranurRouteInfo}
            onChange={(e) => setKeeranurRouteInfo(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs leading-relaxed resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1 flex items-center gap-1">
              <DollarSign size={14} className="text-[var(--accent)]" /> Bus Fare Estimate
            </label>
            <input
              type="text"
              required
              value={fareEstimate}
              onChange={(e) => setFareEstimate(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Google Maps Location Link</label>
            <input
              type="text"
              required
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs font-mono"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full py-3 text-sm font-bold shadow-lg">
          Save Travel & Bus Routes Live
        </button>
      </form>
    </div>
  );
}

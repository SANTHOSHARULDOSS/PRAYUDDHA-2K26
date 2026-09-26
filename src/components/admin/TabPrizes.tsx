import { useState } from 'react';
import { Trophy, CheckCircle2 } from 'lucide-react';
import type { PrizesData } from '@/types/cms';
import { cmsService } from '@/services/cmsService';

interface TabPrizesProps {
  prizes: PrizesData;
}

export default function TabPrizes({ prizes }: TabPrizesProps) {
  const [techFirst, setTechFirst] = useState(prizes.techFirst);
  const [techSecond, setTechSecond] = useState(prizes.techSecond);
  const [nonTechFirst, setNonTechFirst] = useState(prizes.nonTechFirst);
  const [nonTechSecond, setNonTechSecond] = useState(prizes.nonTechSecond);
  const [overallChampion, setOverallChampion] = useState(prizes.overallChampion);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.updatePrizes({
      techFirst,
      techSecond,
      nonTechFirst,
      nonTechSecond,
      overallChampion,
    });
    showToast('Prize details updated live!');
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
            <Trophy size={22} className="text-[var(--accent)]" />
            Prize Pool Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Edit technical cash prizes, non-technical award gifts, and overall championship trophy information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-5 text-white max-w-2xl">
        <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3">Technical Events Prize Pool</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">1st Prize</label>
            <input
              type="text"
              required
              value={techFirst}
              onChange={(e) => setTechFirst(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold text-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">2nd Prize</label>
            <input
              type="text"
              required
              value={techSecond}
              onChange={(e) => setTechSecond(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold text-emerald-400"
            />
          </div>
        </div>

        <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3 pt-2">Non-Technical Events Prize Pool</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">1st Prize / Gift</label>
            <input
              type="text"
              required
              value={nonTechFirst}
              onChange={(e) => setNonTechFirst(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">2nd Prize / Gift</label>
            <input
              type="text"
              required
              value={nonTechSecond}
              onChange={(e) => setNonTechSecond(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-semibold"
            />
          </div>
        </div>

        <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3 pt-2">Overall Championship Trophy</h3>
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Championship Trophy Description</label>
          <input
            type="text"
            required
            value={overallChampion}
            onChange={(e) => setOverallChampion(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold text-[var(--accent)]"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full py-3 text-sm font-bold shadow-lg">
          Save Prize Details Live
        </button>
      </form>
    </div>
  );
}

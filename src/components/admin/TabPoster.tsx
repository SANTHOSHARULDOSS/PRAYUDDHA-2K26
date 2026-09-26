import { useState } from 'react';
import { Upload, FileText, CheckCircle2, Eye, EyeOff, RotateCcw } from 'lucide-react';
import type { PosterData } from '@/types/cms';
import { uploadMediaFile } from '@/lib/supabase';
import { cmsService } from '@/services/cmsService';

interface TabPosterProps {
  poster: PosterData;
}

export default function TabPoster({ poster }: TabPosterProps) {
  const [posterUrl, setPosterUrl] = useState(poster.posterUrl);
  const [caption, setCaption] = useState(poster.caption);
  const [isPublished, setIsPublished] = useState(poster.isPublished);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadMediaFile(file, 'poster');
      setPosterUrl(url);
      cmsService.savePoster({ posterUrl: url, caption, isPublished });
      showToast('Poster uploaded and updated live!');
    } catch (err) {
      console.error('Poster upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.savePoster({ posterUrl, caption, isPublished });
    showToast('Poster changes saved and updated live!');
  };

  const handleResetDefault = () => {
    const defaultUrl = '/images/poster/prayuddha-2k26-official-poster.png';
    setPosterUrl(defaultUrl);
    cmsService.savePoster({ posterUrl: defaultUrl, caption, isPublished });
    showToast('Poster reset to default official poster.');
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
            <FileText size={22} className="text-[var(--accent)]" />
            Official Symposium Poster Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Upload new poster image, replace existing poster, toggle publish state, or update poster caption.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <label className="btn btn-primary text-xs cursor-pointer flex items-center gap-1.5 shadow-md">
            <Upload size={15} />
            {isUploading ? 'Uploading...' : 'Replace Poster Image'}
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-start">
        {/* Left: Preview Card */}
        <div className="md:col-span-5 surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-display font-bold text-sm text-white">Live Published Preview</h3>
            <span className={`badge text-[10px] ${isPublished ? 'badge-success' : 'badge-neutral'}`}>
              {isPublished ? 'Published' : 'Draft'}
            </span>
          </div>

          <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/40 border border-zinc-800 shadow-xl relative">
            <img src={posterUrl} alt="Poster Live Preview" className="w-full h-full object-cover" />
          </div>

          <p className="text-xs text-zinc-400 text-center font-medium italic">
            "{caption}"
          </p>
        </div>

        {/* Right: Controls & Options */}
        <form onSubmit={handleSave} className="md:col-span-7 surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-5 text-white">
          <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3">Poster Configuration</h3>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5">Poster Image URL</label>
            <input
              type="text"
              required
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-white"
              placeholder="/images/prayuddha-poster.jpg or cloud storage URL"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5">Poster Caption</label>
            <input
              type="text"
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white"
              placeholder="PRAYUDDHA 2K26 Official Poster"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div>
              <p className="text-sm font-bold">Publish Poster Live</p>
              <p className="text-xs text-zinc-400">Controls visibility in Hero section and poster lightbox.</p>
            </div>

            <button
              type="button"
              onClick={() => setIsPublished(!isPublished)}
              className={`btn text-xs ${isPublished ? 'btn-primary' : 'btn-secondary'}`}
            >
              {isPublished ? <Eye size={15} /> : <EyeOff size={15} />}
              {isPublished ? 'Published Live' : 'Hidden (Draft)'}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className="btn btn-primary text-xs flex-1 py-3 font-bold">
              Save & Publish Poster Changes
            </button>
            <button
              type="button"
              onClick={handleResetDefault}
              className="btn btn-secondary text-xs flex items-center gap-1.5"
            >
              <RotateCcw size={14} />
              Reset Default
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

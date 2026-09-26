import { useState } from 'react';
import { Upload, BookOpen, CheckCircle2, Eye, EyeOff, RotateCcw, Sparkles } from 'lucide-react';
import type { BrochureData } from '@/types/cms';
import { uploadMediaFile } from '@/lib/supabase';
import { cmsService } from '@/services/cmsService';

interface TabBrochureProps {
  brochure: BrochureData;
}

export default function TabBrochure({ brochure }: TabBrochureProps) {
  const [page1Url, setPage1Url] = useState(brochure.page1Url);
  const [page2Url, setPage2Url] = useState(brochure.page2Url);
  const [title, setTitle] = useState(brochure.title);
  const [isPublished, setIsPublished] = useState(brochure.isPublished);
  const [isUploading, setIsUploading] = useState<'page1' | 'page2' | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handlePageUpload = async (e: React.ChangeEvent<HTMLInputElement>, pageNum: 1 | 2) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const pageKey = pageNum === 1 ? 'page1' : 'page2';
    setIsUploading(pageKey);

    try {
      const url = await uploadMediaFile(file, `brochure-p${pageNum}`);
      if (pageNum === 1) setPage1Url(url);
      else setPage2Url(url);

      cmsService.saveBrochure({
        page1Url: pageNum === 1 ? url : page1Url,
        page2Url: pageNum === 2 ? url : page2Url,
        title,
        isPublished,
      });

      showToast(`Brochure Page ${pageNum} updated live!`);
    } catch (err) {
      console.error('Brochure upload failed:', err);
    } finally {
      setIsUploading(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.saveBrochure({ page1Url, page2Url, title, isPublished });
    showToast('Brochure details saved live!');
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
            <BookOpen size={22} className="text-[var(--accent)]" />
            2-Page Official Brochure Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Upload & Replace Page 1 and Page 2 individually. Public website opens high-resolution 2-page viewer.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPublished(!isPublished)}
            className={`btn text-xs ${isPublished ? 'btn-primary' : 'btn-secondary'}`}
          >
            {isPublished ? <Eye size={15} /> : <EyeOff size={15} />}
            {isPublished ? 'Published Live' : 'Draft Mode'}
          </button>
        </div>
      </div>

      {/* Page 1 & Page 2 Management Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Page 1 Upload & Preview */}
        <div className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4 text-white">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="badge badge-accent text-xs">PAGE 1</span>
              <h3 className="font-display font-bold text-sm">Brochure Front Cover</h3>
            </div>
            <label className="btn btn-secondary text-xs cursor-pointer flex items-center gap-1.5">
              <Upload size={14} />
              {isUploading === 'page1' ? 'Uploading...' : 'Replace Page 1'}
              <input type="file" accept="image/*" onChange={(e) => handlePageUpload(e, 1)} className="hidden" disabled={!!isUploading} />
            </label>
          </div>

          <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/40 border border-zinc-800 shadow-xl relative">
            <img src={page1Url} alt="Page 1 Preview" className="w-full h-full object-cover" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Page 1 Image URL</label>
            <input
              type="text"
              value={page1Url}
              onChange={(e) => setPage1Url(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono"
            />
          </div>
        </div>

        {/* Page 2 Upload & Preview */}
        <div className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4 text-white">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="badge badge-accent text-xs">PAGE 2</span>
              <h3 className="font-display font-bold text-sm">Brochure Schedule & Map</h3>
            </div>
            <label className="btn btn-secondary text-xs cursor-pointer flex items-center gap-1.5">
              <Upload size={14} />
              {isUploading === 'page2' ? 'Uploading...' : 'Replace Page 2'}
              <input type="file" accept="image/*" onChange={(e) => handlePageUpload(e, 2)} className="hidden" disabled={!!isUploading} />
            </label>
          </div>

          <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/40 border border-zinc-800 shadow-xl relative">
            <img src={page2Url} alt="Page 2 Preview" className="w-full h-full object-cover" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Page 2 Image URL</label>
            <input
              type="text"
              value={page2Url}
              onChange={(e) => setPage2Url(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <form onSubmit={handleSave} className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4 text-white">
        <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3">Brochure Title & Settings</h3>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Brochure Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full py-3 text-sm font-bold">
          Save 2-Page Brochure Configuration
        </button>
      </form>
    </div>
  );
}

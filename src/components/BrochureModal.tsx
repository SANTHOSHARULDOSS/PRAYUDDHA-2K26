import { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Sparkles, BookOpen } from 'lucide-react';
import type { BrochureData } from '@/types/cms';

interface BrochureModalProps {
  brochure: BrochureData;
  onClose: () => void;
}

export default function BrochureModal({ brochure, onClose }: BrochureModalProps) {
  const [activeTab, setActiveTab] = useState<'both' | 'page1' | 'page2'>('both');
  const [zoom, setZoom] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.75));
  const resetZoom = () => setZoom(1);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-6xl max-h-[92vh] w-full surface-card rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col text-white shadow-2xl animate-scale-in"
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-white/10 bg-zinc-900/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2">
                {brochure.title || 'PRAYUDDHA 2K26 Official Brochure'}
                <span className="badge badge-accent text-[10px]">2 Pages</span>
              </h3>
              <p className="text-xs text-zinc-400">High-Resolution Official Symposium Guide</p>
            </div>
          </div>

          {/* View Mode & Zoom Controls */}
          <div className="flex items-center gap-2">
            {/* View Mode Tabs */}
            <div className="flex items-center p-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs">
              <button
                onClick={() => setActiveTab('both')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'both' ? 'bg-[var(--accent)] text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Both Pages
              </button>
              <button
                onClick={() => setActiveTab('page1')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'page1' ? 'bg-[var(--accent)] text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Page 1
              </button>
              <button
                onClick={() => setActiveTab('page2')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'page2' ? 'bg-[var(--accent)] text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Page 2
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-zinc-800 p-1 rounded-lg border border-zinc-700 text-xs">
              <button
                onClick={zoomOut}
                className="p-1 rounded hover:bg-zinc-700 text-zinc-300 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="px-1 font-mono text-[11px] min-w-[40px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={zoomIn}
                className="p-1 rounded hover:bg-zinc-700 text-zinc-300 transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={resetZoom}
                className="p-1 rounded hover:bg-zinc-700 text-zinc-300 transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Download */}
            <a
              href={brochure.page1Url}
              download="prayuddha-brochure-page1.png"
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors hidden md:flex items-center gap-1.5 text-xs font-medium"
              title="Download Brochure"
            >
              <Download size={15} />
              Download
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
              aria-label="Close brochure modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Brochure Viewing Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-zinc-950/80 flex items-center justify-center min-h-[50vh]">
          <div
            className="transition-transform duration-200 ease-out origin-center w-full max-w-5xl"
            style={{ transform: `scale(${zoom})` }}
          >
            {activeTab === 'both' ? (
              <div className="grid md:grid-cols-2 gap-6 items-start">
                {/* Page 1 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
                    <span className="flex items-center gap-1 font-bold text-[var(--accent)]">
                      <Sparkles size={12} /> Page 1 — Front Cover & Highlights
                    </span>
                    <a
                      href={brochure.page1Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-zinc-400 hover:text-white"
                    >
                      Full Res ↗
                    </a>
                  </div>
                  <div className="surface-card rounded-xl overflow-hidden border border-zinc-800 bg-black/40 shadow-2xl">
                    <img
                      src={brochure.page1Url}
                      alt="Brochure Page 1"
                      className="w-full h-auto object-contain max-h-[70vh] rounded-lg"
                    />
                  </div>
                </div>

                {/* Page 2 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
                    <span className="flex items-center gap-1 font-bold text-[var(--accent)]">
                      <Sparkles size={12} /> Page 2 — Schedule, Rules & Map
                    </span>
                    <a
                      href={brochure.page2Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-zinc-400 hover:text-white"
                    >
                      Full Res ↗
                    </a>
                  </div>
                  <div className="surface-card rounded-xl overflow-hidden border border-zinc-800 bg-black/40 shadow-2xl">
                    <img
                      src={brochure.page2Url}
                      alt="Brochure Page 2"
                      className="w-full h-auto object-contain max-h-[70vh] rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ) : activeTab === 'page1' ? (
              <div className="max-w-3xl mx-auto space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
                  <span className="font-bold text-[var(--accent)]">Page 1 — Front Cover</span>
                </div>
                <div className="surface-card rounded-xl overflow-hidden border border-zinc-800 bg-black/40 shadow-2xl">
                  <img
                    src={brochure.page1Url}
                    alt="Brochure Page 1"
                    className="w-full h-auto object-contain max-h-[75vh] mx-auto rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
                  <span className="font-bold text-[var(--accent)]">Page 2 — Event Schedule & Map</span>
                </div>
                <div className="surface-card rounded-xl overflow-hidden border border-zinc-800 bg-black/40 shadow-2xl">
                  <img
                    src={brochure.page2Url}
                    alt="Brochure Page 2"
                    className="w-full h-auto object-contain max-h-[75vh] mx-auto rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="p-3 border-t border-white/10 bg-zinc-900/90 text-center text-xs text-zinc-400 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <span>PRAYUDDHA 2K26 · Anna University (BIT Campus) Tiruchirappalli</span>
          <span className="font-mono text-[11px] text-zinc-500">
            Pinch/Scroll to zoom · Press ESC to close
          </span>
        </div>
      </div>
    </div>
  );
}

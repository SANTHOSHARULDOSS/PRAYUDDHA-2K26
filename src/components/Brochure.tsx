import { useState } from 'react';
import { BookOpen, Download, Maximize2, Sparkles } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import BrochureModal from './BrochureModal';

export default function Brochure() {
  const { brochure } = useCMS();
  const ref = useRevealOnScroll<HTMLElement>();
  const [showModal, setShowModal] = useState(false);

  if (!brochure.isPublished) return null;

  return (
    <section id="brochure" ref={ref} className="section-py bg-[var(--surface)]/40 border-y border-[var(--border)]">
      <div className="container-px max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow flex items-center justify-center gap-1.5 mx-auto">
            <BookOpen size={14} /> Official Guide
          </span>
          <h2 className="section-title mt-2 mb-3">PRAYUDDHA 2K26 BROCHURE</h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            Complete 2-Page Symposium Brochure with event rules, schedule, and venue details.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-secondary text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Maximize2 size={14} /> Fullscreen & Zoom Mode
            </button>
            <a
              href={brochure.page1Url}
              download="prayuddha-brochure-page1.png"
              className="btn btn-ghost text-xs flex items-center gap-1.5"
            >
              <Download size={14} /> Download Page 1
            </a>
            <a
              href={brochure.page2Url}
              download="prayuddha-brochure-page2.png"
              className="btn btn-ghost text-xs flex items-center gap-1.5"
            >
              <Download size={14} /> Download Page 2
            </a>
          </div>
        </div>

        {/* DIRECT BROCHURE DISPLAY — BOTH PAGES ONE BELOW THE OTHER */}
        <div className="space-y-8 max-w-4xl mx-auto reveal">
          {/* BROCHURE PAGE 1 */}
          <div className="surface-card rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl bg-[var(--surface)] space-y-2 p-3 sm:p-5">
            <div className="flex items-center justify-between px-2 py-1 text-xs text-[var(--text-muted)] font-mono border-b border-[var(--border)] pb-2 mb-2">
              <span className="font-bold text-[var(--accent)] flex items-center gap-1.5">
                <Sparkles size={14} /> BROCHURE — PAGE 1 (Front Cover & Highlights)
              </span>
              <a
                href={brochure.page1Url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] hover:underline"
              >
                Open Original ↗
              </a>
            </div>
            <div className="w-full flex items-center justify-center rounded-xl overflow-hidden bg-black/5">
              <img
                src={brochure.page1Url}
                alt="PRAYUDDHA 2K26 Brochure Page 1"
                className="w-full h-auto object-contain rounded-xl shadow-md max-w-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* BROCHURE PAGE 2 */}
          <div className="surface-card rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl bg-[var(--surface)] space-y-2 p-3 sm:p-5">
            <div className="flex items-center justify-between px-2 py-1 text-xs text-[var(--text-muted)] font-mono border-b border-[var(--border)] pb-2 mb-2">
              <span className="font-bold text-[var(--accent)] flex items-center gap-1.5">
                <Sparkles size={14} /> BROCHURE — PAGE 2 (Events, Schedule & Map)
              </span>
              <a
                href={brochure.page2Url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] hover:underline"
              >
                Open Original ↗
              </a>
            </div>
            <div className="w-full flex items-center justify-center rounded-xl overflow-hidden bg-black/5">
              <img
                src={brochure.page2Url}
                alt="PRAYUDDHA 2K26 Brochure Page 2"
                className="w-full h-auto object-contain rounded-xl shadow-md max-w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN ZOOM MODAL */}
      {showModal && (
        <BrochureModal brochure={brochure} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
}

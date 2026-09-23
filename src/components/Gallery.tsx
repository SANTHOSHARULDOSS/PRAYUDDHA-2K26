import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { galleryItems, galleryFilters } from '@/data/gallery';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

export default function Gallery() {
  const ref = useRevealOnScroll<HTMLElement>();
  const [filter, setFilter] = useState<string>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useBodyScrollLock(lightboxIdx !== null);

  const filtered =
    filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const nextImage = useCallback(() => {
    setLightboxIdx((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filtered.length;
    });
  }, [filtered.length]);

  const prevImage = useCallback(() => {
    setLightboxIdx((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxIdx, closeLightbox, nextImage, prevImage]);

  return (
    <section id="gallery" ref={ref} className="section-py">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Gallery</span>
          <h2 className="section-title mt-2 mb-4">Gallery</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Moments from PRAYUDDHA. Photos will be added after the event.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 reveal">
          {galleryFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'} !text-xs`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setLightboxIdx(idx)}
              className="surface-card aspect-square overflow-hidden group reveal relative rounded-xl border border-[var(--border)]"
              aria-label={`View ${item.caption}`}
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                <span className="text-xs font-semibold text-white font-display leading-tight">
                  {item.caption}
                </span>
                <span className="text-[10px] text-white/70">{item.category}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIdx !== null && filtered[lightboxIdx] && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 btn-ghost btn !px-2.5 !py-2 text-white hover:bg-white/10"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 btn-ghost btn !px-2.5 !py-2 text-white hover:bg-white/10"
              aria-label="Previous"
            >
              <ChevronLeft size={28} />
            </button>
            <div className="max-w-4xl w-full text-center flex flex-col items-center">
              <div className="max-h-[75vh] w-auto overflow-hidden rounded-xl surface-card flex items-center justify-center mb-4 bg-black/50 p-2">
                <img
                  src={filtered[lightboxIdx].image}
                  alt={filtered[lightboxIdx].caption}
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
                />
              </div>
              <p className="text-white font-display font-semibold text-lg">
                {filtered[lightboxIdx].caption}
              </p>
              <p className="text-white/70 text-sm">{filtered[lightboxIdx].category}</p>
            </div>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 btn-ghost btn !px-2.5 !py-2 text-white hover:bg-white/10"
              aria-label="Next"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

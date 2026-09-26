import { useState, useMemo } from 'react';
import { Sparkles, X, Image as ImageIcon } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import type { GalleryItemData } from '@/types/cms';

export default function Gallery() {
  const { gallery } = useCMS();
  const ref = useRevealOnScroll<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItemData | null>(null);

  const publishedPhotos = useMemo(
    () => gallery.filter((g) => g.isPublished).sort((a, b) => a.displayOrder - b.displayOrder),
    [gallery]
  );

  const categories = useMemo(() => {
    const cats = ['All', 'Inauguration', 'Events', 'Behind the Scenes', 'Venue', 'Other'];
    return cats.filter((c) => c === 'All' || publishedPhotos.some((p) => p.category === c));
  }, [publishedPhotos]);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return publishedPhotos;
    return publishedPhotos.filter((p) => p.category === activeCategory);
  }, [activeCategory, publishedPhotos]);

  return (
    <section id="gallery" ref={ref} className="section-py bg-[var(--surface)]/30">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Symposium Gallery</span>
          <h2 className="section-title mt-2 mb-4">Highlights & Moments</h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            Explore photos from PRAYUDDHA poster launches, campus venue blocks, and inauguration events.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn ${
                activeCategory === cat ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="surface-card rounded-2xl overflow-hidden border border-[var(--border)] group cursor-pointer hover:border-[var(--accent)] transition-all duration-300 shadow-sm hover:-translate-y-1 bg-[var(--surface)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <span className="badge badge-accent text-xs">View Photo</span>
                </div>
                <span className="absolute top-3 left-3 badge badge-neutral text-[10px]">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="font-display font-bold text-base text-[var(--text-primary)] line-clamp-1">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full surface-card rounded-2xl overflow-hidden p-3 bg-zinc-950 border border-white/10 text-white flex flex-col items-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between p-3 border-b border-white/10">
              <div>
                <span className="badge badge-accent text-[10px] mb-1">{selectedPhoto.category}</span>
                <h4 className="font-display font-bold text-base">{selectedPhoto.title}</h4>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                aria-label="Close photo"
              >
                <X size={20} />
              </button>
            </div>

            <div className="w-full overflow-auto max-h-[75vh] p-2 flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>

            {selectedPhoto.description && (
              <p className="p-3 text-xs text-zinc-400 text-center border-t border-white/10 w-full">
                {selectedPhoto.description}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

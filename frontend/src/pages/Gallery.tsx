import React, { useState } from 'react';
import { useCMS, Artwork } from '../contexts/CMSContext';
import { usePageMeta } from '../hooks/usePageMeta';
import ArtworkCard from '../components/ArtworkCard';
import Lightbox from '../components/Lightbox';

type Category = 'All' | string;

export function Gallery() {
  usePageMeta('gallery');
  const { artworks } = useCMS();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: Category[] = ['All', ...Array.from(new Set(artworks.map(a => a.category)))];

  const filtered = artworks.filter(a => {
    if (!a.visible) return false;
    if (activeCategory === 'All') return true;
    return a.category === activeCategory;
  });

  return (
    <div className="page-transition pt-20">
      {/* Header */}
      <section className="py-16 px-4 bg-white text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-charcoal mb-4">Gallery</h1>
        <div className="w-12 h-px bg-gold mx-auto mb-4" />
        <p className="font-body text-sm text-charcoal-muted tracking-wide">
          Original paintings available for purchase and commission
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-beige-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 md:px-6 py-4 font-body text-xs tracking-widest uppercase transition-all border-b-2 whitespace-nowrap ${
                  activeCategory === cat
                    ? 'border-charcoal text-charcoal'
                    : 'border-transparent text-charcoal-muted hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding bg-beige">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-charcoal-muted italic">No artworks in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((artwork, index) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onClick={() => setLightboxIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          artworks={filtered}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export default Gallery;

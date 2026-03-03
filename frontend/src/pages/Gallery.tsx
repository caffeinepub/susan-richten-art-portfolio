import React, { useState, useEffect } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { Search, X } from 'lucide-react';
import { useCMS, Artwork } from '../contexts/CMSContext';
import { usePageMeta } from '../hooks/usePageMeta';
import ArtworkCard from '../components/ArtworkCard';
import Lightbox from '../components/Lightbox';
import BackToTopButton from '../components/BackToTopButton';
import Breadcrumbs from '../components/Breadcrumbs';
import SkeletonCard from '../components/SkeletonCard';

type Category = 'All' | string;

export function Gallery() {
  usePageMeta('gallery');
  const { artworks, isLoading } = useCMS();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const search = useSearch({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();

  const categories: Category[] = ['All', ...Array.from(new Set(artworks.map(a => a.category)))];

  const filtered = artworks.filter(a => {
    if (!a.visible) return false;
    if (activeCategory !== 'All' && a.category !== activeCategory) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        a.title.toLowerCase().includes(term) ||
        a.medium.toLowerCase().includes(term) ||
        a.location.toLowerCase().includes(term)
      );
    }
    return true;
  });

  // Open lightbox from URL param ?open=<id>
  useEffect(() => {
    const openId = search?.open;
    if (openId && filtered.length > 0) {
      const idx = filtered.findIndex(a => a.id === openId);
      if (idx !== -1) {
        setLightboxIndex(idx);
      }
    }
  }, [search?.open, filtered.length]);

  const handleLightboxClose = () => {
    setLightboxIndex(null);
    // Clear the open param from URL
    navigate({ to: '/gallery', search: {} });
  };

  return (
    <div className="page-transition pt-20">
      {/* Breadcrumbs */}
      <Breadcrumbs currentPageName="Gallery" />

      {/* Header */}
      <section className="py-16 px-4 bg-white text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-charcoal mb-4">Gallery</h1>
        <div className="w-12 h-px bg-gold mx-auto mb-4" />
        <p className="font-body text-sm text-charcoal-muted tracking-wide">
          Original paintings available for purchase and commission
        </p>
      </section>

      {/* Search Bar */}
      <div className="bg-white px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by title, medium, or location..."
              className="w-full pl-9 pr-9 py-2.5 border border-beige-dark bg-beige text-charcoal font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

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
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <SkeletonCard variant="artwork" count={8} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-charcoal-muted italic">
                {searchTerm ? 'No artworks match your search.' : 'No artworks in this category.'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 font-body text-sm text-gold hover:underline"
                >
                  Clear search
                </button>
              )}
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
          onClose={handleLightboxClose}
        />
      )}

      <BackToTopButton />
    </div>
  );
}

export default Gallery;

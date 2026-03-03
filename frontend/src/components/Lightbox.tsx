import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Camera } from 'lucide-react';
import { Artwork } from '../contexts/CMSContext';

interface LightboxProps {
  artwork: Artwork;
  artworks: Artwork[];
  onClose: () => void;
  onNavigate: (artwork: Artwork) => void;
}

export function Lightbox({ artwork, artworks, onClose, onNavigate }: LightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [photoIndex, setPhotoIndex] = useState(0);

  const currentIndex = artworks.findIndex(a => a.id === artwork.id);

  // Build the full photo set for the current artwork
  const photoSet = [
    artwork.imageUrl,
    ...(artwork.additionalImages ?? []),
  ].filter(Boolean);

  const hasMultiplePhotos = photoSet.length > 1;

  // Reset photo index when artwork changes
  useEffect(() => {
    setPhotoIndex(0);
    setZoom(1);
  }, [artwork.id]);

  const goNextPhoto = useCallback(() => {
    setPhotoIndex(i => (i + 1) % photoSet.length);
    setZoom(1);
  }, [photoSet.length]);

  const goPrevPhoto = useCallback(() => {
    setPhotoIndex(i => (i - 1 + photoSet.length) % photoSet.length);
    setZoom(1);
  }, [photoSet.length]);

  const goNext = useCallback(() => {
    const next = artworks[(currentIndex + 1) % artworks.length];
    onNavigate(next);
    setZoom(1);
  }, [artworks, currentIndex, onNavigate]);

  const goPrev = useCallback(() => {
    const prev = artworks[(currentIndex - 1 + artworks.length) % artworks.length];
    onNavigate(prev);
    setZoom(1);
  }, [artworks, currentIndex, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        if (hasMultiplePhotos) goNextPhoto();
        else goNext();
      }
      if (e.key === 'ArrowLeft') {
        if (hasMultiplePhotos) goPrevPhoto();
        else goPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev, goNextPhoto, goPrevPhoto, hasMultiplePhotos]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => Math.min(3, Math.max(1, z - e.deltaY * 0.001)));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex" onClick={onClose}>
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        onClick={e => e.stopPropagation()}
        onWheel={handleWheel}
      >
        <img
          src={photoSet[photoIndex]}
          alt={artwork.title}
          className="max-h-[85vh] max-w-full object-contain transition-transform duration-200 select-none"
          style={{ transform: `scale(${zoom})` }}
          draggable={false}
        />

        {/* Photo navigation arrows */}
        {hasMultiplePhotos && (
          <>
            <button
              onClick={goPrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors rounded-full"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors rounded-full"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Photo dots */}
        {hasMultiplePhotos && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photoSet.map((_, i) => (
              <button
                key={i}
                onClick={() => setPhotoIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === photoIndex ? 'bg-gold w-4' : 'bg-white/40'
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Zoom controls */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button
            onClick={() => setZoom(z => Math.min(3, z + 0.25))}
            className="p-1.5 bg-black/50 text-white hover:bg-black/70 transition-colors rounded"
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(1, z - 0.25))}
            className="p-1.5 bg-black/50 text-white hover:bg-black/70 transition-colors rounded"
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
        </div>

        {/* Photo count indicator */}
        {hasMultiplePhotos && (
          <div className="absolute top-4 right-16 flex items-center gap-1.5 bg-black/50 text-white text-xs font-body px-2 py-1 rounded">
            <Camera size={12} className="text-gold" />
            {photoIndex + 1} / {photoSet.length}
          </div>
        )}
      </div>

      {/* Details panel */}
      <div
        className="w-72 bg-charcoal flex flex-col shrink-0 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 flex-1">
          <h2 className="font-heading text-2xl text-beige mb-1">{artwork.title}</h2>
          <p className="font-body text-xs text-beige/50 tracking-widest uppercase mb-4">
            {artwork.year} · {artwork.category}
          </p>

          <div className="space-y-3 mb-6">
            <div>
              <span className="font-body text-xs text-beige/40 tracking-widest uppercase">Medium</span>
              <p className="text-beige mt-0.5">{artwork.medium}</p>
            </div>
            {artwork.size && (
              <div>
                <span className="font-body text-xs text-beige/40 tracking-widest uppercase">Size</span>
                <p className="text-beige mt-0.5">{artwork.size}</p>
              </div>
            )}
            {artwork.location && (
              <div>
                <span className="font-body text-xs text-beige/40 tracking-widest uppercase">Location</span>
                <p className="text-beige mt-0.5">{artwork.location}</p>
              </div>
            )}
            <div>
              <span className={`inline-block font-body text-xs px-2 py-1 rounded ${
                artwork.availability === 'Available'
                  ? 'bg-sage/20 text-sage'
                  : 'bg-beige/10 text-beige/50'
              }`}>
                {artwork.availability}
              </span>
            </div>
          </div>

          {artwork.description && (
            <p className="font-body text-sm text-beige/70 leading-relaxed">
              {artwork.description}
            </p>
          )}
        </div>

        {/* Artwork navigation footer */}
        <div className="p-4 border-t border-beige/10 flex items-center justify-between">
          <button
            onClick={goPrev}
            className="flex items-center gap-1 font-body text-xs text-beige/50 hover:text-beige transition-colors"
          >
            <ChevronLeft size={14} />
            Prev
          </button>
          <span className="font-body text-xs text-beige/30">
            {currentIndex + 1} / {artworks.length}
          </span>
          <button
            onClick={goNext}
            className="flex items-center gap-1 font-body text-xs text-beige/50 hover:text-beige transition-colors"
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;

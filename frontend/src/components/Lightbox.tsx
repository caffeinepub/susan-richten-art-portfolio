import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Artwork } from '../contexts/CMSContext';

interface LightboxProps {
  artworks: Artwork[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ artworks, initialIndex, onClose }: LightboxProps) {
  const [artworkIndex, setArtworkIndex] = useState(initialIndex);
  const [photoIndex, setPhotoIndex] = useState(0);

  const artwork = artworks[artworkIndex];

  // Build photo set for current artwork
  const photos = artwork
    ? [artwork.image, ...(artwork.additionalImages || [])]
    : [];

  // Reset photo index when artwork changes
  useEffect(() => {
    setPhotoIndex(0);
  }, [artworkIndex]);

  // Reset artwork index when initialIndex changes
  useEffect(() => {
    setArtworkIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        if (photos.length > 1) {
          setPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
        }
      }
      if (e.key === 'ArrowRight') {
        if (photos.length > 1) {
          setPhotoIndex(prev => (prev + 1) % photos.length);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, photos.length]);

  if (!artwork) return null;

  const prevPhoto = () => setPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
  const nextPhoto = () => setPhotoIndex(prev => (prev + 1) % photos.length);
  const prevArtwork = () => setArtworkIndex(prev => (prev - 1 + artworks.length) % artworks.length);
  const nextArtwork = () => setArtworkIndex(prev => (prev + 1) % artworks.length);

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl mx-4 flex flex-col md:flex-row gap-0 bg-background rounded-sm overflow-hidden shadow-2xl max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Image panel */}
        <div className="relative flex-1 bg-charcoal flex items-center justify-center min-h-[300px] md:min-h-[500px]">
          <img
            src={photos[photoIndex]}
            alt={artwork.title}
            className="max-w-full max-h-[60vh] md:max-h-[80vh] object-contain"
          />

          {/* Photo navigation arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-charcoal/70 hover:bg-charcoal text-warm-white p-2 rounded-full transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-charcoal/70 hover:bg-charcoal text-warm-white p-2 rounded-full transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Photo dot indicators */}
          {photos.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === photoIndex ? 'bg-gold' : 'bg-warm-white/40'
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-charcoal/70 hover:bg-charcoal text-warm-white p-2 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Details panel */}
        <div className="w-full md:w-72 flex flex-col bg-background overflow-y-auto">
          <div className="flex-1 p-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-1">{artwork.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{artwork.year} · {artwork.medium}</p>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Size</span>
                <p className="text-foreground">{artwork.size}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Location</span>
                <p className="text-foreground">{artwork.location}</p>
              </div>
              {artwork.available && (
                <div className="mt-3">
                  <span className="inline-block bg-gold text-charcoal text-xs font-semibold px-2 py-1 rounded-sm">
                    Available for Purchase
                  </span>
                </div>
              )}
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{artwork.description}</p>
          </div>

          {/* Artwork navigation footer */}
          <div className="border-t border-border p-4 flex items-center justify-between">
            <button
              onClick={prevArtwork}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={16} />
              Prev
            </button>
            <span className="text-xs text-muted-foreground">
              {artworkIndex + 1} / {artworks.length}
            </span>
            <button
              onClick={nextArtwork}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Camera } from 'lucide-react';
import { Artwork } from '../contexts/CMSContext';
import { useLazyLoad } from '../hooks/useLazyLoad';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
}

export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const { ref, isVisible } = useLazyLoad();
  const extraPhotoCount = artwork.additionalImages?.length ?? 0;
  const totalPhotos = 1 + extraPhotoCount;

  return (
    <div
      ref={ref}
      className={`group cursor-pointer bg-white shadow-gallery hover:shadow-gallery-hover transition-all duration-300 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
      onClick={() => onClick(artwork)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        {isVisible ? (
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-beige" />
        )}

        {/* Availability badge */}
        <div className={`absolute top-2 right-2 text-xs font-body px-2 py-1 rounded ${
          artwork.availability === 'Available'
            ? 'bg-sage text-white'
            : 'bg-charcoal-light text-white'
        }`}>
          {artwork.availability}
        </div>

        {/* Multi-photo badge */}
        {extraPhotoCount > 0 && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-gold/90 text-charcoal text-xs font-body px-2 py-1 rounded">
            <Camera size={11} />
            <span>{totalPhotos}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg text-charcoal">{artwork.title}</h3>
        <p className="font-body text-xs text-charcoal-muted mt-1">{artwork.year} · {artwork.category}</p>
      </div>
    </div>
  );
}

export default ArtworkCard;

import { Camera } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import type { Artwork } from '../contexts/CMSContext';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick?: () => void;
}

export default function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const navigate = useNavigate();
  const totalPhotos = 1 + (artwork.additionalImages?.length || 0);

  const handleRequestStyle = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate({ to: '/commissions', search: { artwork: artwork.title } });
  };

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden bg-beige aspect-[4/3]">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Availability badge */}
        {artwork.available && (
          <div className="absolute top-3 right-3 bg-gold text-charcoal text-xs font-semibold px-2 py-1 rounded-sm">
            Available
          </div>
        )}
        {/* Photo count badge */}
        {artwork.additionalImages && artwork.additionalImages.length > 0 && (
          <div className="absolute bottom-3 left-3 bg-charcoal/80 text-beige text-xs font-medium px-2 py-1 rounded-sm flex items-center gap-1">
            <Camera size={11} className="text-gold" />
            <span>{totalPhotos}</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
      </div>
      <div className="pt-3 pb-1">
        <h3 className="font-heading text-base font-medium text-charcoal">{artwork.title}</h3>
        {artwork.size && (
          <p className="font-body text-sm text-charcoal mt-0.5">{artwork.size}</p>
        )}
        <p className="font-body text-sm text-charcoal-muted mt-0.5">{artwork.medium} · {artwork.year}</p>
        {artwork.location && (
          <p className="font-body text-xs text-charcoal-muted mt-0.5">{artwork.location}</p>
        )}
      </div>
      {/* Request This Style button for sold artworks */}
      {!artwork.available && (
        <button
          onClick={handleRequestStyle}
          className="mt-1 mb-2 px-3 py-1.5 border border-charcoal text-charcoal font-body text-xs tracking-wide uppercase hover:bg-beige-dark transition-colors"
        >
          Request This Style
        </button>
      )}
    </div>
  );
}

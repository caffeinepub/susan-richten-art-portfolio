import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PressMention } from '../contexts/CMSContext';

interface PressMentionCardProps {
  mention: PressMention;
}

export function PressMentionCard({ mention }: PressMentionCardProps) {
  return (
    <a
      href={mention.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white p-6 shadow-gallery hover:shadow-gallery-hover transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="font-heading text-lg text-charcoal group-hover:text-gold transition-colors">
            {mention.publication}
          </h4>
          <p className="font-body text-xs text-charcoal-muted mt-0.5">{mention.date}</p>
        </div>
        <ExternalLink size={16} className="text-charcoal-muted group-hover:text-gold transition-colors shrink-0 mt-1" />
      </div>
      {mention.headline && (
        <p className="font-body text-sm font-semibold text-charcoal mb-2">{mention.headline}</p>
      )}
      <p className="font-body text-sm text-charcoal-light leading-relaxed line-clamp-3">
        {mention.excerpt}
      </p>
    </a>
  );
}

export default PressMentionCard;

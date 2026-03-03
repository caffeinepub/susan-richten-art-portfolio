import React from 'react';
import { Testimonial } from '../contexts/CMSContext';
import { MissingInfoText } from './MissingInfoText';

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map(t => (
        <div key={t.id} className="bg-white p-8 shadow-gallery">
          <div className="font-heading text-5xl text-gold/30 leading-none mb-3 select-none">"</div>
          <blockquote className="font-heading text-lg italic text-charcoal leading-relaxed mb-4">
            {t.quote || <MissingInfoText />}
          </blockquote>
          <div className="font-body text-sm tracking-widest uppercase text-charcoal-light">
            {t.name || <MissingInfoText />}
          </div>
          {t.location && (
            <div className="font-body text-xs text-charcoal-muted mt-1">{t.location}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TestimonialGrid;

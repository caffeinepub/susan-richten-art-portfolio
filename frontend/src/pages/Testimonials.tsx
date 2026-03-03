import React, { useState } from 'react';
import { useCMS } from '../contexts/CMSContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { TestimonialGrid } from '../components/TestimonialGrid';
import { PressMentionCard } from '../components/PressMentionCard';

export function Testimonials() {
  usePageMeta('testimonials');
  const { testimonials, pressMentions } = useCMS();
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  return (
    <div className="page-transition pt-20">
      {/* Header */}
      <section className="py-16 px-4 bg-white text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-charcoal mb-4">Testimonials & Press</h1>
        <div className="w-12 h-px bg-gold mx-auto mb-4" />
        <p className="font-body text-sm text-charcoal-muted">
          What clients and the press say about the work
        </p>
      </section>

      {/* View Toggle */}
      <div className="bg-beige border-b border-beige-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-0">
          <button
            onClick={() => setViewMode('carousel')}
            className={`px-6 py-4 font-body text-xs tracking-widest uppercase border-b-2 transition-all ${
              viewMode === 'carousel'
                ? 'border-charcoal text-charcoal'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            Carousel
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-6 py-4 font-body text-xs tracking-widest uppercase border-b-2 transition-all ${
              viewMode === 'grid'
                ? 'border-charcoal text-charcoal'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <section className="section-padding bg-beige">
        <div className="max-w-5xl mx-auto">
          {viewMode === 'carousel' ? (
            <TestimonialCarousel testimonials={testimonials} />
          ) : (
            <TestimonialGrid testimonials={testimonials} />
          )}
        </div>
      </section>

      {/* Press Mentions */}
      {pressMentions.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Press</h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressMentions.map(mention => (
                <PressMentionCard key={mention.id} mention={mention} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Testimonials;

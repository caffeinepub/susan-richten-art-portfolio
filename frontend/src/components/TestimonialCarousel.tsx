import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../contexts/CMSContext';
import { MissingInfoText } from './MissingInfoText';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoRotateMs?: number;
}

export function TestimonialCarousel({ testimonials, autoRotateMs = 4000 }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(next, autoRotateMs);
    return () => clearInterval(timer);
  }, [next, autoRotateMs, testimonials.length]);

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto text-center px-8 md:px-16">
      <div className="font-heading text-7xl text-gold/30 leading-none mb-2 select-none">"</div>
      <blockquote className="font-heading text-xl md:text-2xl italic text-charcoal leading-relaxed mb-6 min-h-[80px]">
        {t.quote || <MissingInfoText />}
      </blockquote>
      <div className="font-body text-sm tracking-widest uppercase text-charcoal-light">
        {t.name || <MissingInfoText />}
      </div>
      {t.location && (
        <div className="font-body text-xs text-charcoal-muted mt-1">{t.location}</div>
      )}

      {testimonials.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-charcoal-light hover:text-charcoal transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-charcoal-light hover:text-charcoal transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-charcoal w-4' : 'bg-charcoal/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TestimonialCarousel;

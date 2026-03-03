import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '../contexts/CMSContext';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);

  if (!testimonials.length) return null;

  const prev = () => setIndex(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex(i => (i + 1) % testimonials.length);
  const current = testimonials[index];

  return (
    <div className="relative max-w-2xl mx-auto text-center">
      <blockquote className="font-display text-xl md:text-2xl text-foreground leading-relaxed mb-6">
        "{current.quote}"
      </blockquote>
      <div className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{current.name}</span>
        {current.location && <span> · {current.location}</span>}
        {current.role && <span> · {current.role}</span>}
      </div>

      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? 'bg-primary' : 'bg-border'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 rounded-full border border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

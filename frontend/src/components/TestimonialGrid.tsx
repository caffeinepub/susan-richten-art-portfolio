import type { Testimonial } from '../contexts/CMSContext';

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export default function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  if (!testimonials.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map(t => (
        <div key={t.id} className="border border-border rounded-sm p-6 hover:border-primary/40 transition-colors">
          <blockquote className="text-foreground leading-relaxed mb-4">
            "{t.quote}"
          </blockquote>
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{t.name}</span>
            {t.location && <span> · {t.location}</span>}
            {t.role && <span className="block mt-0.5 text-xs">{t.role}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

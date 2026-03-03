import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { Artwork } from '../contexts/CMSContext';

interface HeroSlideshowProps {
  artworks: Artwork[];
  artistName: string;
  tagline: string;
  onArtworkClick?: (index: number) => void;
}

export default function HeroSlideshow({ artworks, artistName, tagline, onArtworkClick }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const slides = artworks.length > 0 ? artworks : null;

  const goTo = useCallback((index: number) => {
    if (!slides || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 300);
  }, [slides, transitioning]);

  const prev = useCallback(() => {
    if (!slides) return;
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides, goTo]);

  const next = useCallback(() => {
    if (!slides) return;
    goTo((current + 1) % slides.length);
  }, [current, slides, goTo]);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const bgImage = slides ? slides[current]?.image : '/assets/generated/hero-bg.dim_1920x1080.png';

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Background slides */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: transitioning ? 0 : 1,
        }}
      />
      <div className="absolute inset-0 bg-charcoal/50" />

      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-beige/70 mb-4">
          Original Hawaiian Art
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-beige mb-6 leading-tight">
          {artistName}
        </h1>
        <p className="font-heading text-xl md:text-2xl italic text-beige/80 mb-10">
          {tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/gallery"
            className="px-8 py-4 bg-beige text-charcoal font-body text-sm tracking-widest uppercase hover:bg-white transition-colors"
          >
            View Gallery
          </Link>
          <Link
            to="/commissions"
            className="px-8 py-4 border border-beige text-beige font-body text-sm tracking-widest uppercase hover:bg-beige hover:text-charcoal transition-colors"
          >
            Commission a Painting
          </Link>
        </div>
      </div>

      {/* Prev/Next arrows */}
      {slides && slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-charcoal/40 hover:bg-gold/80 text-beige rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-charcoal/40 hover:bg-gold/80 text-beige rounded-full transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-gold w-6' : 'bg-beige/50 hover:bg-beige/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

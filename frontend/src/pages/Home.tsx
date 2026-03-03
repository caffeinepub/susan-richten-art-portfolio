import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCMS } from '../contexts/CMSContext';
import { usePageMeta } from '../hooks/usePageMeta';
import ArtworkCard from '../components/ArtworkCard';
import Lightbox from '../components/Lightbox';
import HeroSlideshow from '../components/HeroSlideshow';
import SkeletonCard from '../components/SkeletonCard';

export function Home() {
  usePageMeta('home');
  const { artworks, testimonials, siteSettings, isLoading } = useCMS();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const featuredArtworks = artworks.filter(a => a.featured && a.visible);

  const handleFeaturedClick = (index: number) => {
    const artwork = featuredArtworks[index];
    if (artwork) {
      navigate({ to: '/gallery', search: { open: artwork.id } });
    }
  };

  return (
    <div className="page-transition">
      {/* Hero Slideshow */}
      <HeroSlideshow
        artworks={featuredArtworks}
        artistName={siteSettings.heroArtistName}
        tagline={siteSettings.heroTagline}
        onArtworkClick={handleFeaturedClick}
      />

      {/* Artist Intro */}
      <section className="section-padding bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-lg text-charcoal-light leading-relaxed">
            {siteSettings.heroIntroText}
          </p>
          <div className="w-12 h-px bg-gold mx-auto mt-8" />
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="section-padding bg-beige">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Featured Works</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonCard variant="artwork" count={3} />
            </div>
          ) : featuredArtworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArtworks.map((artwork, index) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onClick={() => handleFeaturedClick(index)}
                />
              ))}
            </div>
          ) : null}
          <div className="text-center mt-10">
            <a
              href="/gallery"
              className="inline-block px-8 py-3 border border-charcoal text-charcoal font-body text-sm tracking-widest uppercase hover:bg-charcoal hover:text-beige transition-colors"
            >
              View All Works
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {(isLoading || testimonials.length > 0) && (
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">What Collectors Say</h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SkeletonCard variant="testimonial" count={4} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.slice(0, 4).map(t => (
                  <div key={t.id} className="bg-beige p-8">
                    <p className="font-heading text-lg italic text-charcoal-light leading-relaxed mb-6">
                      "{t.quote}"
                    </p>
                    <div>
                      <p className="font-body text-sm font-semibold text-charcoal">{t.name}</p>
                      <p className="font-body text-xs text-charcoal-muted">{t.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="section-padding bg-charcoal text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-beige mb-4">Stay Connected</h2>
          <p className="font-body text-sm text-beige/70 mb-8">
            Be the first to know about new works, exhibitions, and commission availability.
          </p>
          <div className="flex gap-0 max-w-sm mx-auto">
            <input
              type="email"
              placeholder={siteSettings.newsletterPlaceholder || 'Enter your email'}
              className="flex-1 px-4 py-3 bg-white text-charcoal font-body text-sm focus:outline-none"
            />
            <button className="px-6 py-3 bg-gold text-white font-body text-sm tracking-widest uppercase hover:bg-gold/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          artworks={featuredArtworks}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export default Home;

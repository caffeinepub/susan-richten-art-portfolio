import React from 'react';
import { Link } from '@tanstack/react-router';
import { useCMS } from '../contexts/CMSContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { ArtworkCard } from '../components/ArtworkCard';
import { Lightbox } from '../components/Lightbox';
import { MissingInfoText } from '../components/MissingInfoText';
import { PlaceholderImage } from '../components/PlaceholderImage';
import { Artwork } from '../contexts/CMSContext';
import { MapPin, ExternalLink } from 'lucide-react';

export function Home() {
  usePageMeta('home');
  const { artworks, testimonials, homepageSettings } = useCMS();
  const [selectedArtwork, setSelectedArtwork] = React.useState<Artwork | null>(null);

  const featuredArtworks = artworks.filter(a => a.featured && a.visible);

  const mapPins = [
    { label: 'Ocean Bloom', location: 'Honolulu, HI' },
    { label: 'Harbor Light', location: 'Kailua, HI' },
    { label: 'Mountain Echo', location: 'Maui, HI' },
    { label: 'Coastal Reverie', location: 'Kona, HI' },
  ];

  const googleMapsUrl = 'https://www.google.com/maps/search/art+installations+hawaii/@20.7984,-156.3319,8z';

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={homepageSettings.heroImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-wide">
            {homepageSettings.heroArtistName}
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="font-body text-lg md:text-xl text-white/80 tracking-wide">
            {homepageSettings.heroTagline || <MissingInfoText className="text-white/60" />}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery"
              className="px-8 py-3 bg-white text-charcoal font-body text-sm tracking-widest uppercase hover:bg-beige transition-colors"
            >
              View Gallery
            </Link>
            <Link
              to="/commissions"
              className="px-8 py-3 border border-white text-white font-body text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
            >
              Commission Work
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* Featured Artworks */}
      {featuredArtworks.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Featured Works</h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArtworks.map(artwork => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onClick={setSelectedArtwork}
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/gallery"
                className="inline-block px-8 py-3 border border-charcoal text-charcoal font-body text-sm tracking-widest uppercase hover:bg-charcoal hover:text-beige transition-colors"
              >
                View All Works
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Artist Intro */}
      <section className="section-padding bg-beige">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-6">The Artist</h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-base md:text-lg text-charcoal-light leading-relaxed mb-8">
            {homepageSettings.artistIntro || <MissingInfoText />}
          </p>
          <Link
            to="/about"
            className="inline-block px-8 py-3 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-charcoal">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-beige mb-3">Stay Connected</h2>
          <p className="font-body text-sm text-beige/70 mb-8 tracking-wide">
            Be the first to hear about new works, exhibitions, and commission availability.
          </p>
          <NewsletterSignup />
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-beige-dark">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">What Clients Say</h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* Installation Locations */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Installation Locations</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-4" />
            <p className="font-body text-sm text-charcoal-muted">Works installed across Hawaii and beyond</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {/* Google Maps link panel */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1 min-h-64 rounded overflow-hidden bg-beige border border-beige-dark hover:border-gold transition-colors flex flex-col items-center justify-center gap-4 p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <MapPin className="w-8 h-8 text-gold" />
              </div>
              <div>
                <p className="font-heading text-xl text-charcoal mb-1">View on Google Maps</p>
                <p className="font-body text-sm text-charcoal-muted">Explore installation sites across the Hawaiian Islands</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-5 py-2 bg-charcoal text-beige font-body text-xs tracking-widest uppercase rounded group-hover:bg-charcoal-light transition-colors">
                Open Map <ExternalLink className="w-3 h-3" />
              </span>
            </a>

            {/* Location list */}
            <div className="flex-1 flex flex-col justify-center gap-3">
              {mapPins.map((pin, i) => (
                <a
                  key={i}
                  href={`https://www.google.com/maps/search/${encodeURIComponent(pin.label + ' ' + pin.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded border border-beige-dark bg-beige hover:border-gold hover:bg-beige-dark transition-colors"
                >
                  <div className="w-8 h-8 shrink-0 rounded-full bg-gold/15 flex items-center justify-center group-hover:bg-gold/25 transition-colors">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm text-charcoal">{pin.label}</p>
                    <p className="font-body text-xs text-charcoal-muted">{pin.location}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-charcoal-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedArtwork && (
        <Lightbox
          artwork={selectedArtwork}
          artworks={featuredArtworks}
          onClose={() => setSelectedArtwork(null)}
          onNavigate={setSelectedArtwork}
        />
      )}
    </div>
  );
}

export default Home;

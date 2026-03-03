import React, { useState } from 'react';
import { useCMS } from '../contexts/CMSContext';
import { usePageMeta } from '../hooks/usePageMeta';
import ArtworkCard from '../components/ArtworkCard';
import Lightbox from '../components/Lightbox';
import CommissionInquiryForm from '../components/CommissionInquiryForm';
import FAQAccordion from '../components/FAQAccordion';

export function Commissions() {
  usePageMeta('commissions');
  const { artworks, commissionsPageContent } = useCMS();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const portfolioArtworks = artworks.filter(a => a.visible).slice(0, 6);

  return (
    <div className="page-transition pt-20">
      {/* Hero */}
      <section className="py-20 px-4 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl md:text-6xl text-beige mb-6">Commission a Painting</h1>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-base text-beige/80 leading-relaxed">
            {commissionsPageContent.heroText}
          </p>
        </div>
      </section>

      {/* Process Steps */}
      {commissionsPageContent.processSteps.length > 0 && (
        <section className="section-padding bg-beige">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">The Process</h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {commissionsPageContent.processSteps
                .slice()
                .sort((a, b) => a.stepNumber - b.stepNumber)
                .map(step => (
                  <div key={step.id} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-4">
                      <span className="font-heading text-xl text-gold">{step.stepNumber}</span>
                    </div>
                    <h3 className="font-heading text-xl text-charcoal mb-2">{step.title}</h3>
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">{step.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-6">Pricing</h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-base text-charcoal-light leading-relaxed">
            {commissionsPageContent.pricingText}
          </p>
        </div>
      </section>

      {/* Portfolio Sample */}
      {portfolioArtworks.length > 0 && (
        <section className="section-padding bg-beige">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Recent Work</h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioArtworks.map((artwork, index) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onClick={() => setLightboxIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Form */}
      <section className="section-padding bg-white" id="inquiry">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Start Your Commission</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="font-body text-sm text-charcoal-muted">
              Fill out the form below and I'll be in touch within 2–3 business days.
            </p>
          </div>
          <CommissionInquiryForm />
        </div>
      </section>

      {/* FAQ */}
      {commissionsPageContent.faqItems.length > 0 && (
        <section className="section-padding bg-beige">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">FAQ</h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
            <FAQAccordion items={commissionsPageContent.faqItems} />
          </div>
        </section>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          artworks={portfolioArtworks}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export default Commissions;

import React from 'react';
import { useCMS } from '../contexts/CMSContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import CommissionInquiryForm from '../components/CommissionInquiryForm';
import { FAQAccordion } from '../components/FAQAccordion';
import { ArtworkCard } from '../components/ArtworkCard';
import { MissingInfoText } from '../components/MissingInfoText';
import { Lightbox } from '../components/Lightbox';
import { Artwork } from '../contexts/CMSContext';

export function Commissions() {
  usePageMeta('commissions');
  const { artworks, commissionsPageContent } = useCMS();
  const [selectedArtwork, setSelectedArtwork] = React.useState<Artwork | null>(null);

  const portfolioExamples = artworks.filter(a => a.visible).slice(0, 4);

  return (
    <div className="page-transition pt-20">
      {/* Hero */}
      <section className="py-20 px-4 bg-charcoal text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-beige mb-6">Commission a Work</h1>
        <div className="w-12 h-px bg-gold mx-auto mb-6" />
        <p className="font-body text-base md:text-lg text-beige/70 max-w-2xl mx-auto leading-relaxed">
          {commissionsPageContent.heroText || <MissingInfoText className="text-beige/50" />}
        </p>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">The Process</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commissionsPageContent.processSteps.map(step => (
              <div key={step.id} className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="font-heading text-lg text-gold">{step.stepNumber}</span>
                </div>
                <div>
                  <h3 className="font-heading text-xl text-charcoal mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-charcoal-light leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-beige-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-6">Pricing</h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <div className="bg-white p-8 md:p-12">
            <p className="font-body text-base text-charcoal-light leading-relaxed">
              {commissionsPageContent.pricingText || <MissingInfoText />}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Examples */}
      {portfolioExamples.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Recent Work</h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {portfolioExamples.map(artwork => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onClick={setSelectedArtwork}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Before/After */}
      <section className="section-padding bg-beige">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Before & After</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-4" />
            <p className="font-body text-sm text-charcoal-muted">Drag to reveal the transformation</p>
          </div>
          <BeforeAfterSlider
            beforeSrc="/assets/generated/before-wall.dim_900x600.png"
            afterSrc="/assets/generated/after-wall.dim_900x600.png"
          />
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Start Your Project</h2>
            <div className="w-12 h-px bg-gold mx-auto mb-4" />
            <p className="font-body text-sm text-charcoal-muted">
              Fill out the form below and you'll receive a response within 24–48 hours.
            </p>
          </div>
          <CommissionInquiryForm />
        </div>
      </section>

      {/* FAQ */}
      {commissionsPageContent.faqItems.length > 0 && (
        <section className="section-padding bg-beige-dark">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">FAQ</h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
            <FAQAccordion items={commissionsPageContent.faqItems} />
          </div>
        </section>
      )}

      {selectedArtwork && (
        <Lightbox
          artwork={selectedArtwork}
          artworks={portfolioExamples}
          onClose={() => setSelectedArtwork(null)}
          onNavigate={setSelectedArtwork}
        />
      )}
    </div>
  );
}

export default Commissions;

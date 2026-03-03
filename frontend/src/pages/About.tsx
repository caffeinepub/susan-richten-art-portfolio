import React, { useState } from 'react';
import { SiInstagram, SiFacebook, SiPinterest } from 'react-icons/si';
import { Download } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import { usePageMeta } from '../hooks/usePageMeta';
import CareerTimeline from '../components/CareerTimeline';
import PressMentionCard from '../components/PressMentionCard';
import MissingInfoText from '../components/MissingInfoText';
import BackToTopButton from '../components/BackToTopButton';
import Breadcrumbs from '../components/Breadcrumbs';
import SkeletonCard from '../components/SkeletonCard';
import { Skeleton } from '@/components/ui/skeleton';

export function About() {
  usePageMeta('about');
  const { aboutPageContent, siteSettings, isLoading } = useCMS();
  const [pressKitMsg, setPressKitMsg] = useState(false);

  const igUrl = siteSettings.socialPlatforms.find(p => p.icon === 'instagram' || p.name.toLowerCase() === 'instagram')?.url || '';
  const fbUrl = siteSettings.socialPlatforms.find(p => p.icon === 'facebook' || p.name.toLowerCase() === 'facebook')?.url || '';
  const ptUrl = siteSettings.socialPlatforms.find(p => p.icon === 'pinterest' || p.name.toLowerCase() === 'pinterest')?.url || '';

  return (
    <div className="page-transition pt-20">
      {/* Breadcrumbs */}
      <Breadcrumbs currentPageName="About" />

      {/* Header */}
      <section className="py-16 px-4 bg-white text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-charcoal mb-4">About the Artist</h1>
        <div className="w-12 h-px bg-gold mx-auto" />
      </section>

      {/* Portrait + Bio */}
      <section className="section-padding bg-beige">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Portrait */}
          <div className="relative" style={{ minHeight: '400px' }}>
            {isLoading ? (
              <Skeleton className="w-full bg-beige-dark" style={{ aspectRatio: '4/5', minHeight: '400px' }} />
            ) : (
              <div
                className="w-full overflow-hidden relative"
                style={{ aspectRatio: '4/5', minHeight: '400px' }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    backgroundColor: 'oklch(0.963 0.018 80)',
                    backgroundImage: `repeating-linear-gradient(45deg, oklch(0.93 0.022 80) 0px, oklch(0.93 0.022 80) 1px, transparent 1px, transparent 12px)`,
                  }}
                />
                <img
                  src={aboutPageContent.portraitImage}
                  alt="Artist portrait"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-2">Marina Vasquez</h2>
            <p className="font-body text-xs tracking-widest uppercase text-charcoal-muted mb-6">Ocean View, HI</p>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-3 w-full bg-beige-dark" />
                <Skeleton className="h-3 w-5/6 bg-beige-dark" />
                <Skeleton className="h-3 w-4/6 bg-beige-dark" />
              </div>
            ) : (
              <div className="font-body text-base text-charcoal-light leading-relaxed">
                {aboutPageContent.bio ? (
                  <p>{aboutPageContent.bio}</p>
                ) : (
                  <MissingInfoText />
                )}
              </div>
            )}

            {/* Social Links */}
            <div className="mt-8 flex flex-col gap-3">
              <h4 className="font-body text-xs tracking-widest uppercase text-charcoal-muted">Follow</h4>
              <a href={igUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-charcoal-light hover:text-charcoal transition-colors">
                <SiInstagram size={16} />
                {igUrl ? 'Instagram' : <MissingInfoText className="text-xs" />}
              </a>
              <a href={fbUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-charcoal-light hover:text-charcoal transition-colors">
                <SiFacebook size={16} />
                {fbUrl ? 'Facebook' : <MissingInfoText className="text-xs" />}
              </a>
              <a href={ptUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-charcoal-light hover:text-charcoal transition-colors">
                <SiPinterest size={16} />
                {ptUrl ? 'Pinterest' : <MissingInfoText className="text-xs" />}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-6">Artist Statement</h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          {isLoading ? (
            <div className="space-y-2 max-w-xl mx-auto">
              <Skeleton className="h-4 w-full bg-beige-dark" />
              <Skeleton className="h-4 w-5/6 mx-auto bg-beige-dark" />
              <Skeleton className="h-4 w-4/6 mx-auto bg-beige-dark" />
            </div>
          ) : (
            <div className="font-heading text-xl md:text-2xl italic text-charcoal-light leading-relaxed">
              {aboutPageContent.artistStatement ? (
                <span>"{aboutPageContent.artistStatement}"</span>
              ) : (
                <MissingInfoText />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Career Timeline */}
      <section className="section-padding bg-beige-dark">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Career Milestones</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="w-16 h-4 bg-beige shrink-0 mt-1" />
                  <Skeleton className="flex-1 h-4 bg-beige" />
                </div>
              ))}
            </div>
          ) : (
            <CareerTimeline milestones={aboutPageContent.careerMilestones} />
          )}
        </div>
      </section>

      {/* Press & Media */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">Press & Media</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkeletonCard variant="press" count={4} />
            </div>
          ) : aboutPageContent.pressLinks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutPageContent.pressLinks.map(mention => (
                <PressMentionCard
                  key={mention.id}
                  publication={mention.publication}
                  date={mention.date}
                  headline={mention.headline}
                  url={mention.url}
                  excerpt={mention.excerpt}
                />
              ))}
            </div>
          ) : (
            <p className="text-center"><MissingInfoText /></p>
          )}
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-12 px-4 bg-beige text-center">
        <h3 className="font-heading text-2xl text-charcoal mb-4">Press Kit</h3>
        <button
          onClick={() => setPressKitMsg(true)}
          className="inline-flex items-center gap-2 px-8 py-3 border border-charcoal text-charcoal font-body text-sm tracking-widest uppercase hover:bg-charcoal hover:text-beige transition-colors"
        >
          <Download size={16} />
          Download Press Kit
        </button>
        {pressKitMsg && (
          <p className="mt-4 font-body text-sm italic text-charcoal-muted animate-fade-in">
            Press kit not yet uploaded — check back soon.
          </p>
        )}
      </section>

      <BackToTopButton />
    </div>
  );
}

export default About;

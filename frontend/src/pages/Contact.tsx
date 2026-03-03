import React from 'react';
import { MapPin } from 'lucide-react';
import { SiInstagram, SiFacebook, SiPinterest } from 'react-icons/si';
import { useCMS } from '../contexts/CMSContext';
import { usePageMeta } from '../hooks/usePageMeta';
import ContactForm from '../components/ContactForm';
import MissingInfoText from '../components/MissingInfoText';
import Breadcrumbs from '../components/Breadcrumbs';
import SkeletonForm from '../components/SkeletonForm';

export function Contact() {
  usePageMeta('contact');
  const { siteSettings, isLoading } = useCMS();

  const igUrl = siteSettings.socialPlatforms.find(p => p.icon === 'instagram' || p.name.toLowerCase() === 'instagram')?.url || '';
  const fbUrl = siteSettings.socialPlatforms.find(p => p.icon === 'facebook' || p.name.toLowerCase() === 'facebook')?.url || '';
  const ptUrl = siteSettings.socialPlatforms.find(p => p.icon === 'pinterest' || p.name.toLowerCase() === 'pinterest')?.url || '';

  return (
    <div className="page-transition pt-20">
      {/* Breadcrumbs */}
      <Breadcrumbs currentPageName="Contact" />

      {/* Header */}
      <section className="py-16 px-4 bg-white text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-charcoal mb-4">Get in Touch</h1>
        <div className="w-12 h-px bg-gold mx-auto mb-4" />
        <p className="font-body text-sm text-charcoal-muted">
          You'll receive a confirmation within 24–48 hours.
        </p>
      </section>

      <section className="section-padding bg-beige">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-3xl text-charcoal mb-8">Send a Message</h2>
            {isLoading ? <SkeletonForm /> : <ContactForm />}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Location */}
            <div>
              <h3 className="font-heading text-2xl text-charcoal mb-4">Studio Location</h3>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-sm text-charcoal font-semibold">Ocean View, HI</p>
                  <p className="font-body text-xs text-charcoal-muted mt-1">Big Island, Hawaii</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div
              className="w-full relative overflow-hidden"
              style={{
                aspectRatio: '4/3',
                backgroundColor: 'oklch(0.963 0.018 80)',
                backgroundImage: `repeating-linear-gradient(45deg, oklch(0.93 0.022 80) 0px, oklch(0.93 0.022 80) 1px, transparent 1px, transparent 12px)`,
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="font-heading text-xl italic text-charcoal-light select-none">Map</span>
                <span className="font-body text-xs text-charcoal-muted">Ocean View, HI</span>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-heading text-2xl text-charcoal mb-4">Follow Along</h3>
              <div className="flex flex-col gap-3">
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
        </div>
      </section>
    </div>
  );
}

export default Contact;

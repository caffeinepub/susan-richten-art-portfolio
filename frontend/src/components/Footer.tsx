import React from 'react';
import { Link } from '@tanstack/react-router';
import { SiInstagram, SiFacebook, SiPinterest } from 'react-icons/si';
import { Heart, Eye, Users, Lock } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import { MissingInfoText } from './MissingInfoText';
import { useGetPageViewCount, useGetUniqueVisitorCount } from '../hooks/useQueries';

export function Footer() {
  const { navItems, siteSettings } = useCMS();
  const year = new Date().getFullYear();
  const hostname = typeof window !== 'undefined' ? encodeURIComponent(window.location.hostname) : 'unknown-app';

  const { data: pageViewCount } = useGetPageViewCount();
  const { data: uniqueVisitorCount } = useGetUniqueVisitorCount();

  return (
    <footer className="bg-charcoal text-beige py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl text-beige mb-3">{siteSettings.siteTitle}</h3>
            <p className="font-body text-sm text-beige/70 leading-relaxed">
              {siteSettings.siteTagline || 'Artist · Ocean View, HI'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-beige/50 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="font-body text-sm text-beige/70 hover:text-beige transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-beige/50 mb-4">Follow</h4>
            <div className="flex flex-col gap-3">
              <a
                href={siteSettings.socialInstagram || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-beige/70 hover:text-beige transition-colors"
              >
                <SiInstagram size={16} />
                {siteSettings.socialInstagram ? 'Instagram' : <MissingInfoText className="text-beige/50 text-xs" />}
              </a>
              <a
                href={siteSettings.socialFacebook || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-beige/70 hover:text-beige transition-colors"
              >
                <SiFacebook size={16} />
                {siteSettings.socialFacebook ? 'Facebook' : <MissingInfoText className="text-beige/50 text-xs" />}
              </a>
              <a
                href={siteSettings.socialPinterest || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-beige/70 hover:text-beige transition-colors"
              >
                <SiPinterest size={16} />
                {siteSettings.socialPinterest ? 'Pinterest' : <MissingInfoText className="text-beige/50 text-xs" />}
              </a>
            </div>
          </div>
        </div>

        {/* Visitor counters */}
        <div className="border-t border-beige/10 pt-6 mb-4">
          <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
            <div className="flex items-center gap-2 font-body text-xs text-beige/50">
              <Eye size={13} className="text-gold/70" />
              <span>
                Total Visits:{' '}
                <span className="text-beige/70 font-medium">
                  {pageViewCount !== undefined ? pageViewCount.toString() : '—'}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 font-body text-xs text-beige/50">
              <Users size={13} className="text-gold/70" />
              <span>
                Unique Visitors:{' '}
                <span className="text-beige/70 font-medium">
                  {uniqueVisitorCount !== undefined ? uniqueVisitorCount.toString() : '—'}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-beige/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-beige/40">
            © {year} {siteSettings.siteTitle}. All rights reserved.
          </p>

          <Link
            to="/admin"
            className="flex items-center gap-1.5 font-body text-xs text-beige/30 hover:text-beige/60 transition-colors group"
          >
            <Lock size={11} className="group-hover:text-gold/60 transition-colors" />
            Admin Sign In
          </Link>

          <p className="font-body text-xs text-beige/40 flex items-center gap-1">
            Built with <Heart size={12} className="text-gold fill-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-beige/60 hover:text-beige transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

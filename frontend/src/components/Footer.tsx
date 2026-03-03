import { Link } from '@tanstack/react-router';
import { Instagram, Facebook, Heart } from 'lucide-react';
import { SiPinterest } from 'react-icons/si';
import { useCMS } from '../contexts/CMSContext';
import { usePageViewTracker } from '../hooks/usePageViewTracker';
import { useUniqueVisitorTracker } from '../hooks/useUniqueVisitorTracker';

export default function Footer() {
  const { siteSettings, navigationItems } = useCMS();
  const { pageViewCount } = usePageViewTracker();
  const { uniqueVisitorCount } = useUniqueVisitorTracker();

  const navItems = [...navigationItems].sort((a, b) => a.order - b.order);

  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'susan-richten-art'
  );

  const socialIconMap: Record<string, React.ReactNode> = {
    instagram: <Instagram size={18} />,
    facebook: <Facebook size={18} />,
    pinterest: <SiPinterest size={18} />,
  };

  return (
    <footer className="bg-charcoal text-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-semibold text-beige mb-2">
              {siteSettings.heroArtistName || 'Susan Richten'}
            </h3>
            <p className="text-beige/70 text-sm leading-relaxed">
              {siteSettings.siteTagline || 'Fine Art & Commissions'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-beige/50 mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="text-sm text-beige/70 hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Admin */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-beige/50 mb-3">
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              {siteSettings.socialPlatforms.map(platform => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-beige/70 hover:text-gold transition-colors"
                  aria-label={platform.name}
                >
                  {socialIconMap[platform.icon.toLowerCase()] ?? <span className="text-xs">{platform.name}</span>}
                </a>
              ))}
            </div>

            {/* Visitor counters */}
            <div className="text-xs text-beige/40 space-y-0.5 mb-4">
              {pageViewCount !== undefined && (
                <p>{pageViewCount.toLocaleString()} page views</p>
              )}
              {uniqueVisitorCount !== undefined && (
                <p>{uniqueVisitorCount.toLocaleString()} unique visitors</p>
              )}
            </div>

            {/* Admin Sign In */}
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-beige/50 hover:text-gold border border-beige/20 hover:border-gold/40 rounded px-2.5 py-1.5 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Admin Sign In
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-beige/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-beige/40">
          <p>© {new Date().getFullYear()} {siteSettings.heroArtistName || 'Susan Richten'}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={11} className="text-gold fill-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

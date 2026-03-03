import { Link } from '@tanstack/react-router';
import { Heart, Lock } from 'lucide-react';
import { SiInstagram, SiFacebook, SiPinterest } from 'react-icons/si';
import { useCMS } from '../contexts/CMSContext';
import { usePageViewCount } from '../hooks/useQueries';
import { useUniqueVisitorCount } from '../hooks/useQueries';

export default function Footer() {
  const { siteSettings, navigationItems } = useCMS();
  const { data: pageViews } = usePageViewCount();
  const { data: uniqueVisitors } = useUniqueVisitorCount();

  const sortedNav = [...navigationItems].sort((a, b) => a.order - b.order);

  const getSocialIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case 'instagram': return <SiInstagram size={18} />;
      case 'facebook': return <SiFacebook size={18} />;
      case 'pinterest': return <SiPinterest size={18} />;
      default: return null;
    }
  };

  const appId = encodeURIComponent(window.location.hostname || 'marina-vasquez-art');

  return (
    <footer className="bg-charcoal text-beige border-t border-beige/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-2 text-beige">{siteSettings.siteTitle}</h3>
            <p className="text-sm text-beige/70 mb-4">{siteSettings.siteTagline}</p>
            {/* Social links */}
            <div className="flex gap-3">
              {siteSettings.socialPlatforms.map(platform => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-beige/60 hover:text-gold transition-colors"
                  aria-label={platform.name}
                >
                  {getSocialIcon(platform.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-beige/50 mb-3">Navigation</h4>
            <ul className="space-y-2">
              {sortedNav.map(item => (
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

          {/* Stats & Admin */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-beige/50 mb-3">Studio</h4>
            <div className="space-y-1 text-sm text-beige/70 mb-6">
              <p>Visitors: {uniqueVisitors !== undefined ? Number(uniqueVisitors).toLocaleString() : '—'}</p>
              <p>Page Views: {pageViews !== undefined ? Number(pageViews).toLocaleString() : '—'}</p>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-3 py-2 rounded border border-beige/30 text-sm text-beige hover:text-beige hover:border-beige/60 hover:bg-beige/10 transition-all"
            >
              <Lock size={13} />
              Admin Sign In
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-beige/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-beige/50">
          <p>© {new Date().getFullYear()} {siteSettings.siteTitle}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-gold fill-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-beige/80 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

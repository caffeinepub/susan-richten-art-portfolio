import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { siteSettings, navigationItems } = useCMS();
  const location = useLocation();

  const navItems = [...navigationItems].sort((a, b) => a.order - b.order);

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-stone/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl font-semibold text-charcoal tracking-wide group-hover:text-gold transition-colors">
              {siteSettings.heroArtistName || 'Susan Richten'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                  location.pathname === item.path
                    ? 'text-gold border-b border-gold pb-0.5'
                    : 'text-charcoal/70'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-charcoal hover:text-gold transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-warm-white border-t border-stone/20 px-4 py-4 flex flex-col gap-3">
          {navItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                location.pathname === item.path ? 'text-gold' : 'text-charcoal/70'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

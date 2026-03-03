import { useState } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useCMS } from "../contexts/CMSContext";
import { Menu, X, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { navItems, siteSettings } = useCMS();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 group"
          >
            <Palette className="w-6 h-6 text-gold" />
            <span className="font-display font-bold text-lg text-foreground group-hover:text-gold transition-colors">
              {siteSettings.siteTitle}
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate({ to: item.path })}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "text-gold bg-gold/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden md:flex bg-gold hover:bg-gold/90 text-white"
              onClick={() => navigate({ to: "/commissions" })}
            >
              Commission a Painting
            </Button>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigate({ to: item.path });
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "text-gold bg-gold/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 pb-1">
              <Button
                size="sm"
                className="w-full bg-gold hover:bg-gold/90 text-white"
                onClick={() => {
                  navigate({ to: "/commissions" });
                  setMobileOpen(false);
                }}
              >
                Commission a Painting
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

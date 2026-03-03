import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-beige border-2 border-charcoal text-charcoal flex items-center justify-center shadow-gallery hover:bg-charcoal hover:text-beige hover:border-gold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold"
    >
      <ChevronUp size={20} />
    </button>
  );
}

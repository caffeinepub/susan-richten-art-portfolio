import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  currentPageName: string;
}

export default function Breadcrumbs({ currentPageName }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white border-b border-beige-dark px-4 py-2"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 font-body text-xs text-charcoal-muted">
        <Link
          to="/"
          className="hover:text-gold transition-colors"
        >
          Home
        </Link>
        <ChevronRight size={12} className="text-charcoal-muted shrink-0" />
        <span className="text-charcoal font-medium">{currentPageName}</span>
      </div>
    </nav>
  );
}

import { useEffect } from 'react';
import { useCMS } from '../contexts/CMSContext';

export function usePageMeta(page: string) {
  const { siteSettings } = useCMS();

  useEffect(() => {
    const seoEntry = siteSettings.seoSettings.find(s => s.page === page);
    if (seoEntry) {
      document.title = seoEntry.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', seoEntry.description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = seoEntry.description;
        document.head.appendChild(meta);
      }
    }
  }, [page, siteSettings]);
}

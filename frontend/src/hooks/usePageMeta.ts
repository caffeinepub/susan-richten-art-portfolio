import { useEffect } from "react";
import { useCMS } from "../contexts/CMSContext";

type SeoPage = "home" | "about" | "gallery" | "commissions" | "contact" | "testimonials";

export function usePageMeta(pageOrTitle: SeoPage | string, description?: string) {
  const { siteSettings } = useCMS();

  useEffect(() => {
    // If called with a single string that matches a known SEO page key
    const knownPages: SeoPage[] = ["home", "about", "gallery", "commissions", "contact", "testimonials"];
    if (knownPages.includes(pageOrTitle as SeoPage) && !description) {
      const page = pageOrTitle as SeoPage;
      const seo = siteSettings.seo[page];
      if (seo) {
        document.title = seo.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", seo.description);
      }
    } else {
      // Called with explicit title and description
      document.title = pageOrTitle;
      if (description) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", description);
      }
    }
  }, [pageOrTitle, description, siteSettings]);
}

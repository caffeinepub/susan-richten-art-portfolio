import { useActor } from './useActor';
import type {
  Artwork,
  Testimonial,
  PressMention,
  CommissionInquiry,
  ContactInquiry,
  Notification,
  BlogPost,
  FAQItem,
  CommissionProcessStep,
  CareerMilestone,
  SiteSettings,
  NavigationItem,
  AllCMSData,
  SocialPlatform,
  SEOSettings,
} from '../backend';

// ─── Frontend CMS types (mirrors CMSContext) ────────────────────────────────

export interface FrontendArtwork {
  id: number;
  title: string;
  year: number;
  medium: string;
  size: string;
  location: string;
  description: string;
  category: string;
  image: string;
  additionalImages: string[];
  available: boolean;
  featured: boolean;
  visible: boolean;
  order: number;
}

export interface FrontendTestimonial {
  id: number;
  quote: string;
  name: string;
  location: string;
  role: string;
}

export interface FrontendPressMention {
  id: number;
  publication: string;
  date: string;
  headline: string;
  url: string;
  excerpt: string;
}

export interface FrontendCommissionInquiry {
  id: number;
  name: string;
  email: string;
  description: string;
  projectDescription?: string;
  projectType?: string;
  budgetRange?: string;
  budget: string;
  status: string;
  timestamp: number;
}

export interface FrontendContactInquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  timestamp: number;
}

export interface FrontendNotification {
  id: number;
  sourceType: string;
  submitterName: string;
  submitterEmail: string;
  messagePreview: string;
  fullPayload: string;
  timestamp: number;
  status: string;
}

export interface FrontendBlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  publishDate: number;
  status: string;
}

export interface FrontendFAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FrontendProcessStep {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
}

export interface FrontendCareerMilestone {
  id: number;
  year: string;
  event: string;
}

export interface FrontendSocialPlatform {
  name: string;
  url: string;
  icon: string;
}

export interface FrontendSEOSettings {
  page: string;
  title: string;
  description: string;
  keywords: string;
}

export interface FrontendSiteSettings {
  siteTitle: string;
  siteTagline: string;
  socialPlatforms: FrontendSocialPlatform[];
  seoSettings: FrontendSEOSettings[];
  googleAnalyticsId: string;
  newsletterPlaceholder: string;
  aboutBio: string;
  artistStatement: string;
  heroArtistName: string;
  heroTagline: string;
  heroIntroText: string;
  commissionHeroText: string;
  commissionPricingText: string;
}

export interface FrontendNavigationItem {
  id: number;
  name: string;
  path: string;
  order: number;
}

export interface FrontendAllCMSData {
  artworks: FrontendArtwork[];
  testimonials: FrontendTestimonial[];
  pressMentions: FrontendPressMention[];
  commissionInquiries: FrontendCommissionInquiry[];
  contactInquiries: FrontendContactInquiry[];
  notifications: FrontendNotification[];
  blogPosts: FrontendBlogPost[];
  faqItems: FrontendFAQItem[];
  processSteps: FrontendProcessStep[];
  careerMilestones: FrontendCareerMilestone[];
  siteSettings: FrontendSiteSettings | null;
  navigationItems: FrontendNavigationItem[];
}

// ─── Type conversion helpers ─────────────────────────────────────────────────

function toBackendArtwork(a: FrontendArtwork): Artwork {
  return {
    id: BigInt(a.id),
    title: a.title,
    year: BigInt(a.year),
    medium: a.medium,
    size: a.size,
    location: a.location,
    description: a.description,
    category: a.category,
    image: a.image,
    additionalImages: a.additionalImages ?? [],
    available: a.available,
    featured: a.featured,
    visible: a.visible,
    order: BigInt(a.order),
  };
}

function fromBackendArtwork(a: Artwork): FrontendArtwork {
  return {
    id: Number(a.id),
    title: a.title,
    year: Number(a.year),
    medium: a.medium,
    size: a.size,
    location: a.location,
    description: a.description,
    category: a.category,
    image: a.image,
    additionalImages: Array.from(a.additionalImages ?? []),
    available: a.available,
    featured: a.featured,
    visible: a.visible,
    order: Number(a.order),
  };
}

function toBackendTestimonial(t: FrontendTestimonial): Testimonial {
  return {
    id: BigInt(t.id),
    quote: t.quote,
    name: t.name,
    location: t.location,
    role: t.role,
  };
}

function fromBackendTestimonial(t: Testimonial): FrontendTestimonial {
  return {
    id: Number(t.id),
    quote: t.quote,
    name: t.name,
    location: t.location,
    role: t.role,
  };
}

function toBackendPressMention(p: FrontendPressMention): PressMention {
  return {
    id: BigInt(p.id),
    publication: p.publication,
    date: p.date,
    headline: p.headline,
    url: p.url,
    excerpt: p.excerpt,
  };
}

function fromBackendPressMention(p: PressMention): FrontendPressMention {
  return {
    id: Number(p.id),
    publication: p.publication,
    date: p.date,
    headline: p.headline,
    url: p.url,
    excerpt: p.excerpt,
  };
}

function toBackendCommissionInquiry(c: FrontendCommissionInquiry): CommissionInquiry {
  return {
    id: BigInt(c.id),
    name: c.name,
    email: c.email,
    description: c.description,
    budget: c.budget,
    status: c.status,
    timestamp: BigInt(c.timestamp),
  };
}

function fromBackendCommissionInquiry(c: CommissionInquiry): FrontendCommissionInquiry {
  return {
    id: Number(c.id),
    name: c.name,
    email: c.email,
    description: c.description,
    budget: c.budget,
    status: c.status,
    timestamp: Number(c.timestamp),
  };
}

function toBackendContactInquiry(c: FrontendContactInquiry): ContactInquiry {
  return {
    id: BigInt(c.id),
    name: c.name,
    email: c.email,
    message: c.message,
    status: c.status,
    timestamp: BigInt(c.timestamp),
  };
}

function fromBackendContactInquiry(c: ContactInquiry): FrontendContactInquiry {
  return {
    id: Number(c.id),
    name: c.name,
    email: c.email,
    message: c.message,
    status: c.status,
    timestamp: Number(c.timestamp),
  };
}

function toBackendNotification(n: FrontendNotification): Notification {
  return {
    id: BigInt(n.id),
    sourceType: n.sourceType,
    submitterName: n.submitterName,
    submitterEmail: n.submitterEmail,
    messagePreview: n.messagePreview,
    fullPayload: n.fullPayload,
    timestamp: BigInt(n.timestamp),
    status: n.status,
  };
}

function fromBackendNotification(n: Notification): FrontendNotification {
  return {
    id: Number(n.id),
    sourceType: n.sourceType,
    submitterName: n.submitterName,
    submitterEmail: n.submitterEmail,
    messagePreview: n.messagePreview,
    fullPayload: n.fullPayload,
    timestamp: Number(n.timestamp),
    status: n.status,
  };
}

function toBackendBlogPost(b: FrontendBlogPost): BlogPost {
  return {
    id: BigInt(b.id),
    title: b.title,
    slug: b.slug,
    content: b.content,
    publishDate: BigInt(b.publishDate),
    status: b.status,
  };
}

function fromBackendBlogPost(b: BlogPost): FrontendBlogPost {
  return {
    id: Number(b.id),
    title: b.title,
    slug: b.slug,
    content: b.content,
    publishDate: Number(b.publishDate),
    status: b.status,
  };
}

function toBackendFAQItem(f: FrontendFAQItem): FAQItem {
  return {
    id: BigInt(f.id),
    question: f.question,
    answer: f.answer,
  };
}

function fromBackendFAQItem(f: FAQItem): FrontendFAQItem {
  return {
    id: Number(f.id),
    question: f.question,
    answer: f.answer,
  };
}

function toBackendProcessStep(s: FrontendProcessStep): CommissionProcessStep {
  return {
    id: BigInt(s.id),
    stepNumber: BigInt(s.stepNumber),
    title: s.title,
    description: s.description,
  };
}

function fromBackendProcessStep(s: CommissionProcessStep): FrontendProcessStep {
  return {
    id: Number(s.id),
    stepNumber: Number(s.stepNumber),
    title: s.title,
    description: s.description,
  };
}

function toBackendCareerMilestone(m: FrontendCareerMilestone): CareerMilestone {
  return {
    id: BigInt(m.id),
    year: m.year,
    event: m.event,
  };
}

function fromBackendCareerMilestone(m: CareerMilestone): FrontendCareerMilestone {
  return {
    id: Number(m.id),
    year: m.year,
    event: m.event,
  };
}

function toBackendSiteSettings(s: FrontendSiteSettings): SiteSettings {
  return {
    siteTitle: s.siteTitle,
    siteTagline: s.siteTagline,
    socialPlatforms: s.socialPlatforms.map((p): SocialPlatform => ({
      name: p.name,
      url: p.url,
      icon: p.icon,
    })),
    seoSettings: s.seoSettings.map((e): SEOSettings => ({
      page: e.page,
      title: e.title,
      description: e.description,
      keywords: e.keywords,
    })),
    googleAnalyticsId: s.googleAnalyticsId,
    newsletterPlaceholder: s.newsletterPlaceholder,
    aboutBio: s.aboutBio,
    artistStatement: s.artistStatement,
    heroArtistName: s.heroArtistName,
    heroTagline: s.heroTagline,
    heroIntroText: s.heroIntroText,
    commissionHeroText: s.commissionHeroText,
    commissionPricingText: s.commissionPricingText,
  };
}

function fromBackendSiteSettings(s: SiteSettings): FrontendSiteSettings {
  return {
    siteTitle: s.siteTitle,
    siteTagline: s.siteTagline,
    socialPlatforms: Array.from(s.socialPlatforms).map((p) => ({
      name: p.name,
      url: p.url,
      icon: p.icon,
    })),
    seoSettings: Array.from(s.seoSettings).map((e) => ({
      page: e.page,
      title: e.title,
      description: e.description,
      keywords: e.keywords,
    })),
    googleAnalyticsId: s.googleAnalyticsId,
    newsletterPlaceholder: s.newsletterPlaceholder,
    aboutBio: s.aboutBio,
    artistStatement: s.artistStatement,
    heroArtistName: s.heroArtistName,
    heroTagline: s.heroTagline,
    heroIntroText: s.heroIntroText,
    commissionHeroText: s.commissionHeroText,
    commissionPricingText: s.commissionPricingText,
  };
}

function toBackendNavigationItem(n: FrontendNavigationItem): NavigationItem {
  return {
    id: BigInt(n.id),
    name: n.name,
    path: n.path,
    order: BigInt(n.order),
  };
}

function fromBackendNavigationItem(n: NavigationItem): FrontendNavigationItem {
  return {
    id: Number(n.id),
    name: n.name,
    path: n.path,
    order: Number(n.order),
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCMSBackend() {
  const { actor } = useActor();

  async function loadAllCMSData(): Promise<FrontendAllCMSData | null> {
    if (!actor) return null;
    try {
      const data: AllCMSData = await actor.getAllCMSData();
      return {
        artworks: Array.from(data.artworks).map(fromBackendArtwork),
        testimonials: Array.from(data.testimonials).map(fromBackendTestimonial),
        pressMentions: Array.from(data.pressMentions).map(fromBackendPressMention),
        commissionInquiries: Array.from(data.commissionInquiries).map(fromBackendCommissionInquiry),
        contactInquiries: Array.from(data.contactInquiries).map(fromBackendContactInquiry),
        notifications: Array.from(data.notifications).map(fromBackendNotification),
        blogPosts: Array.from(data.blogPosts).map(fromBackendBlogPost),
        faqItems: Array.from(data.faqItems).map(fromBackendFAQItem),
        processSteps: Array.from(data.commissionProcessSteps).map(fromBackendProcessStep),
        careerMilestones: Array.from(data.careerMilestones).map(fromBackendCareerMilestone),
        siteSettings: data.siteSettings ? fromBackendSiteSettings(data.siteSettings) : null,
        navigationItems: Array.from(data.navigationItems).map(fromBackendNavigationItem),
      };
    } catch (err) {
      console.error('[useCMSBackend] loadAllCMSData failed:', err);
      return null;
    }
  }

  async function saveArtworks(artworks: FrontendArtwork[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveArtworks: actor not ready'); return; }
    try {
      await actor.setArtworks(artworks.map(toBackendArtwork));
    } catch (err) {
      console.error('[useCMSBackend] saveArtworks failed:', err);
      throw err;
    }
  }

  async function saveTestimonials(testimonials: FrontendTestimonial[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveTestimonials: actor not ready'); return; }
    try {
      await actor.setTestimonials(testimonials.map(toBackendTestimonial));
    } catch (err) {
      console.error('[useCMSBackend] saveTestimonials failed:', err);
      throw err;
    }
  }

  async function savePressMentions(pressMentions: FrontendPressMention[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] savePressMentions: actor not ready'); return; }
    try {
      await actor.setPressMentions(pressMentions.map(toBackendPressMention));
    } catch (err) {
      console.error('[useCMSBackend] savePressMentions failed:', err);
      throw err;
    }
  }

  async function saveCommissionInquiries(inquiries: FrontendCommissionInquiry[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveCommissionInquiries: actor not ready'); return; }
    try {
      await actor.setCommissionInquiries(inquiries.map(toBackendCommissionInquiry));
    } catch (err) {
      console.error('[useCMSBackend] saveCommissionInquiries failed:', err);
      throw err;
    }
  }

  async function saveContactInquiries(inquiries: FrontendContactInquiry[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveContactInquiries: actor not ready'); return; }
    try {
      await actor.setContactInquiries(inquiries.map(toBackendContactInquiry));
    } catch (err) {
      console.error('[useCMSBackend] saveContactInquiries failed:', err);
      throw err;
    }
  }

  async function saveNotifications(notifications: FrontendNotification[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveNotifications: actor not ready'); return; }
    try {
      await actor.setNotifications(notifications.map(toBackendNotification));
    } catch (err) {
      console.error('[useCMSBackend] saveNotifications failed:', err);
      throw err;
    }
  }

  async function saveBlogPosts(blogPosts: FrontendBlogPost[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveBlogPosts: actor not ready'); return; }
    try {
      await actor.setBlogPosts(blogPosts.map(toBackendBlogPost));
    } catch (err) {
      console.error('[useCMSBackend] saveBlogPosts failed:', err);
      throw err;
    }
  }

  async function saveFAQItems(faqItems: FrontendFAQItem[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveFAQItems: actor not ready'); return; }
    try {
      await actor.setFAQItems(faqItems.map(toBackendFAQItem));
    } catch (err) {
      console.error('[useCMSBackend] saveFAQItems failed:', err);
      throw err;
    }
  }

  async function saveProcessSteps(steps: FrontendProcessStep[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveProcessSteps: actor not ready'); return; }
    try {
      await actor.setCommissionProcessSteps(steps.map(toBackendProcessStep));
    } catch (err) {
      console.error('[useCMSBackend] saveProcessSteps failed:', err);
      throw err;
    }
  }

  async function saveCareerMilestones(milestones: FrontendCareerMilestone[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveCareerMilestones: actor not ready'); return; }
    try {
      await actor.setCareerMilestones(milestones.map(toBackendCareerMilestone));
    } catch (err) {
      console.error('[useCMSBackend] saveCareerMilestones failed:', err);
      throw err;
    }
  }

  async function saveSiteSettings(settings: FrontendSiteSettings): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveSiteSettings: actor not ready'); return; }
    try {
      await actor.setSiteSettings(toBackendSiteSettings(settings));
    } catch (err) {
      console.error('[useCMSBackend] saveSiteSettings failed:', err);
      throw err;
    }
  }

  async function saveNavigationItems(items: FrontendNavigationItem[]): Promise<void> {
    if (!actor) { console.error('[useCMSBackend] saveNavigationItems: actor not ready'); return; }
    try {
      await actor.setNavigationItems(items.map(toBackendNavigationItem));
    } catch (err) {
      console.error('[useCMSBackend] saveNavigationItems failed:', err);
      throw err;
    }
  }

  return {
    loadAllCMSData,
    saveArtworks,
    saveTestimonials,
    savePressMentions,
    saveCommissionInquiries,
    saveContactInquiries,
    saveNotifications,
    saveBlogPosts,
    saveFAQItems,
    saveProcessSteps,
    saveCareerMilestones,
    saveSiteSettings,
    saveNavigationItems,
  };
}

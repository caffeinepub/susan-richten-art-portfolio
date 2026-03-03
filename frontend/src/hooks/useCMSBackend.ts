import { useActor } from './useActor';
import type {
  Artwork as BackendArtwork,
  Testimonial as BackendTestimonial,
  PressMention as BackendPressMention,
  CommissionInquiry as BackendCommissionInquiry,
  ContactInquiry as BackendContactInquiry,
  Notification as BackendNotification,
  BlogPost as BackendBlogPost,
  FAQItem as BackendFAQItem,
  CommissionProcessStep as BackendProcessStep,
  CareerMilestone as BackendCareerMilestone,
  SiteSettings as BackendSiteSettings,
  NavigationItem as BackendNavigationItem,
} from '../backend';
import type {
  Artwork,
  Testimonial,
  PressMention,
  CommissionInquiry,
  ContactInquiry,
  Notification,
  BlogPost,
  FAQItem,
  ProcessStep,
  CareerMilestone,
  SiteSettings,
  NavigationItem,
} from '../contexts/CMSContext';

// Type conversion helpers: Frontend -> Backend
function toBackendArtwork(a: Artwork): BackendArtwork {
  return {
    id: BigInt(a.id.replace(/\D/g, '') || '0'),
    title: a.title,
    year: BigInt(a.year),
    medium: a.medium,
    size: a.size,
    location: a.location,
    description: a.description,
    category: a.category,
    image: a.image,
    additionalImages: a.additionalImages,
    available: a.available,
    featured: a.featured,
    visible: a.visible,
    order: BigInt(a.order),
  };
}

function fromBackendArtwork(a: BackendArtwork): Artwork {
  return {
    id: a.id.toString(),
    title: a.title,
    year: Number(a.year),
    medium: a.medium,
    size: a.size,
    location: a.location,
    description: a.description,
    category: a.category,
    image: a.image,
    additionalImages: Array.from(a.additionalImages),
    available: a.available,
    featured: a.featured,
    visible: a.visible,
    order: Number(a.order),
  };
}

function toBackendTestimonial(t: Testimonial): BackendTestimonial {
  return {
    id: BigInt(t.id.replace(/\D/g, '') || '0'),
    quote: t.quote,
    name: t.name,
    location: t.location,
    role: t.role,
  };
}

function fromBackendTestimonial(t: BackendTestimonial): Testimonial {
  return {
    id: t.id.toString(),
    quote: t.quote,
    name: t.name,
    location: t.location,
    role: t.role,
  };
}

function toBackendPressMention(p: PressMention): BackendPressMention {
  return {
    id: BigInt(p.id.replace(/\D/g, '') || '0'),
    publication: p.publication,
    date: p.date,
    headline: p.headline,
    url: p.url,
    excerpt: p.excerpt,
  };
}

function fromBackendPressMention(p: BackendPressMention): PressMention {
  return {
    id: p.id.toString(),
    publication: p.publication,
    date: p.date,
    headline: p.headline,
    url: p.url,
    excerpt: p.excerpt,
  };
}

function toBackendCommissionInquiry(c: CommissionInquiry): BackendCommissionInquiry {
  return {
    id: BigInt(c.id.replace(/\D/g, '') || '0'),
    name: c.name,
    email: c.email,
    description: c.description,
    budget: c.budget,
    status: c.status,
    timestamp: BigInt(c.timestamp) * BigInt(1_000_000),
  };
}

function fromBackendCommissionInquiry(c: BackendCommissionInquiry): CommissionInquiry {
  return {
    id: c.id.toString(),
    name: c.name,
    email: c.email,
    description: c.description,
    budget: c.budget,
    status: c.status as CommissionInquiry['status'],
    timestamp: Number(c.timestamp / BigInt(1_000_000)),
  };
}

function toBackendContactInquiry(c: ContactInquiry): BackendContactInquiry {
  return {
    id: BigInt(c.id.replace(/\D/g, '') || '0'),
    name: c.name,
    email: c.email,
    message: c.message,
    status: c.status,
    timestamp: BigInt(c.timestamp) * BigInt(1_000_000),
  };
}

function fromBackendContactInquiry(c: BackendContactInquiry): ContactInquiry {
  return {
    id: c.id.toString(),
    name: c.name,
    email: c.email,
    message: c.message,
    status: c.status as ContactInquiry['status'],
    timestamp: Number(c.timestamp / BigInt(1_000_000)),
  };
}

function toBackendNotification(n: Notification): BackendNotification {
  return {
    id: BigInt(n.id.replace(/\D/g, '') || '0'),
    sourceType: n.sourceType,
    submitterName: n.submitterName,
    submitterEmail: n.submitterEmail,
    messagePreview: n.messagePreview,
    fullPayload: n.fullPayload,
    timestamp: BigInt(n.timestamp) * BigInt(1_000_000),
    status: n.status,
  };
}

function fromBackendNotification(n: BackendNotification): Notification {
  return {
    id: n.id.toString(),
    sourceType: n.sourceType as Notification['sourceType'],
    submitterName: n.submitterName,
    submitterEmail: n.submitterEmail,
    messagePreview: n.messagePreview,
    fullPayload: n.fullPayload,
    timestamp: Number(n.timestamp / BigInt(1_000_000)),
    status: n.status as Notification['status'],
  };
}

function toBackendBlogPost(b: BlogPost): BackendBlogPost {
  return {
    id: BigInt(b.id.replace(/\D/g, '') || '0'),
    title: b.title,
    slug: b.slug,
    content: b.content,
    publishDate: BigInt(b.publishDate) * BigInt(1_000_000),
    status: b.status,
  };
}

function fromBackendBlogPost(b: BackendBlogPost): BlogPost {
  return {
    id: b.id.toString(),
    title: b.title,
    slug: b.slug,
    content: b.content,
    publishDate: Number(b.publishDate / BigInt(1_000_000)),
    status: b.status as BlogPost['status'],
  };
}

function toBackendFAQItem(f: FAQItem): BackendFAQItem {
  return {
    id: BigInt(f.id.replace(/\D/g, '') || '0'),
    question: f.question,
    answer: f.answer,
  };
}

function fromBackendFAQItem(f: BackendFAQItem): FAQItem {
  return {
    id: f.id.toString(),
    question: f.question,
    answer: f.answer,
  };
}

function toBackendProcessStep(s: ProcessStep): BackendProcessStep {
  return {
    id: BigInt(s.id.replace(/\D/g, '') || '0'),
    stepNumber: BigInt(s.stepNumber),
    title: s.title,
    description: s.description,
  };
}

function fromBackendProcessStep(s: BackendProcessStep): ProcessStep {
  return {
    id: s.id.toString(),
    stepNumber: Number(s.stepNumber),
    title: s.title,
    description: s.description,
  };
}

function toBackendCareerMilestone(m: CareerMilestone): BackendCareerMilestone {
  return {
    id: BigInt(m.id.replace(/\D/g, '') || '0'),
    year: m.year,
    event: m.event,
  };
}

function fromBackendCareerMilestone(m: BackendCareerMilestone): CareerMilestone {
  return {
    id: m.id.toString(),
    year: m.year,
    event: m.event,
  };
}

function toBackendSiteSettings(s: SiteSettings): BackendSiteSettings {
  return {
    siteTitle: s.siteTitle,
    siteTagline: s.siteTagline,
    socialPlatforms: s.socialPlatforms,
    seoSettings: s.seoSettings,
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

function fromBackendSiteSettings(s: BackendSiteSettings): SiteSettings {
  return {
    siteTitle: s.siteTitle,
    siteTagline: s.siteTagline,
    socialPlatforms: Array.from(s.socialPlatforms),
    seoSettings: Array.from(s.seoSettings),
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

function toBackendNavigationItem(n: NavigationItem): BackendNavigationItem {
  return {
    id: BigInt(n.id.replace(/\D/g, '') || '0'),
    name: n.name,
    path: n.path,
    order: BigInt(n.order),
  };
}

function fromBackendNavigationItem(n: BackendNavigationItem): NavigationItem {
  return {
    id: n.id.toString(),
    name: n.name,
    path: n.path,
    order: Number(n.order),
  };
}

export interface CMSBackendData {
  artworks: Artwork[];
  testimonials: Testimonial[];
  pressMentions: PressMention[];
  commissionInquiries: CommissionInquiry[];
  contactInquiries: ContactInquiry[];
  notifications: Notification[];
  blogPosts: BlogPost[];
  faqItems: FAQItem[];
  processSteps: ProcessStep[];
  careerMilestones: CareerMilestone[];
  siteSettings: SiteSettings | null;
  navigationItems: NavigationItem[];
}

export function useCMSBackend() {
  const { actor } = useActor();

  async function loadAllData(): Promise<CMSBackendData> {
    if (!actor) {
      return {
        artworks: [],
        testimonials: [],
        pressMentions: [],
        commissionInquiries: [],
        contactInquiries: [],
        notifications: [],
        blogPosts: [],
        faqItems: [],
        processSteps: [],
        careerMilestones: [],
        siteSettings: null,
        navigationItems: [],
      };
    }

    try {
      const [
        artworksRaw,
        testimonialsRaw,
        pressMentionsRaw,
        commissionInquiriesRaw,
        contactInquiriesRaw,
        notificationsRaw,
        blogPostsRaw,
        faqItemsRaw,
        processStepsRaw,
        careerMilestonesRaw,
        siteSettingsRaw,
        navigationItemsRaw,
      ] = await Promise.all([
        actor.getArtworks(),
        actor.getTestimonials(),
        actor.getPressMentions(),
        actor.getCommissionInquiries(),
        actor.getContactInquiries(),
        actor.getNotifications(),
        actor.getBlogPosts(),
        actor.getFAQItems(),
        actor.getCommissionProcessSteps(),
        actor.getCareerMilestones(),
        actor.getSiteSettings(),
        actor.getNavigationItems(),
      ]);

      return {
        artworks: artworksRaw.map(fromBackendArtwork),
        testimonials: testimonialsRaw.map(fromBackendTestimonial),
        pressMentions: pressMentionsRaw.map(fromBackendPressMention),
        commissionInquiries: commissionInquiriesRaw.map(fromBackendCommissionInquiry),
        contactInquiries: contactInquiriesRaw.map(fromBackendContactInquiry),
        notifications: notificationsRaw.map(fromBackendNotification),
        blogPosts: blogPostsRaw.map(fromBackendBlogPost),
        faqItems: faqItemsRaw.map(fromBackendFAQItem),
        processSteps: processStepsRaw.map(fromBackendProcessStep),
        careerMilestones: careerMilestonesRaw.map(fromBackendCareerMilestone),
        siteSettings: siteSettingsRaw ? fromBackendSiteSettings(siteSettingsRaw) : null,
        navigationItems: navigationItemsRaw.map(fromBackendNavigationItem),
      };
    } catch (err) {
      console.error('Error loading CMS data:', err);
      return {
        artworks: [],
        testimonials: [],
        pressMentions: [],
        commissionInquiries: [],
        contactInquiries: [],
        notifications: [],
        blogPosts: [],
        faqItems: [],
        processSteps: [],
        careerMilestones: [],
        siteSettings: null,
        navigationItems: [],
      };
    }
  }

  async function saveArtworks(artworks: Artwork[]): Promise<void> {
    if (!actor) return;
    await actor.setArtworks(artworks.map(toBackendArtwork));
  }

  async function saveTestimonials(testimonials: Testimonial[]): Promise<void> {
    if (!actor) return;
    await actor.setTestimonials(testimonials.map(toBackendTestimonial));
  }

  async function savePressMentions(mentions: PressMention[]): Promise<void> {
    if (!actor) return;
    await actor.setPressMentions(mentions.map(toBackendPressMention));
  }

  async function saveCommissionInquiries(inquiries: CommissionInquiry[]): Promise<void> {
    if (!actor) return;
    await actor.setCommissionInquiries(inquiries.map(toBackendCommissionInquiry));
  }

  async function saveContactInquiries(inquiries: ContactInquiry[]): Promise<void> {
    if (!actor) return;
    await actor.setContactInquiries(inquiries.map(toBackendContactInquiry));
  }

  async function saveNotifications(notifications: Notification[]): Promise<void> {
    if (!actor) return;
    await actor.setNotifications(notifications.map(toBackendNotification));
  }

  async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
    if (!actor) return;
    await actor.setBlogPosts(posts.map(toBackendBlogPost));
  }

  async function saveFAQItems(items: FAQItem[]): Promise<void> {
    if (!actor) return;
    await actor.setFAQItems(items.map(toBackendFAQItem));
  }

  async function saveProcessSteps(steps: ProcessStep[]): Promise<void> {
    if (!actor) return;
    await actor.setCommissionProcessSteps(steps.map(toBackendProcessStep));
  }

  async function saveCareerMilestones(milestones: CareerMilestone[]): Promise<void> {
    if (!actor) return;
    await actor.setCareerMilestones(milestones.map(toBackendCareerMilestone));
  }

  async function saveSiteSettings(settings: SiteSettings): Promise<void> {
    if (!actor) return;
    await actor.setSiteSettings(toBackendSiteSettings(settings));
  }

  async function saveNavigationItems(items: NavigationItem[]): Promise<void> {
    if (!actor) return;
    await actor.setNavigationItems(items.map(toBackendNavigationItem));
  }

  return {
    loadAllData,
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

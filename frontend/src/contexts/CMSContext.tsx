import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useCMSBackend } from '../hooks/useCMSBackend';
import type {
  FrontendArtwork as Artwork,
  FrontendTestimonial as Testimonial,
  FrontendPressMention as PressMention,
  FrontendCommissionInquiry as CommissionInquiry,
  FrontendContactInquiry as ContactInquiry,
  FrontendNotification as Notification,
  FrontendBlogPost as BlogPost,
  FrontendFAQItem as FAQItem,
  FrontendProcessStep as ProcessStep,
  FrontendCareerMilestone as CareerMilestone,
  FrontendSiteSettings as SiteSettings,
  FrontendNavigationItem as NavigationItem,
  FrontendSocialPlatform as SocialPlatform,
  FrontendSEOSettings as SEOSettings,
} from '../hooks/useCMSBackend';

export type {
  FrontendArtwork as Artwork,
  FrontendTestimonial as Testimonial,
  FrontendPressMention as PressMention,
  FrontendCommissionInquiry as CommissionInquiry,
  FrontendContactInquiry as ContactInquiry,
  FrontendNotification as Notification,
  FrontendBlogPost as BlogPost,
  FrontendFAQItem as FAQItem,
  FrontendProcessStep as ProcessStep,
  FrontendCareerMilestone as CareerMilestone,
  FrontendSiteSettings as SiteSettings,
  FrontendNavigationItem as NavigationItem,
  FrontendSocialPlatform as SocialPlatform,
  FrontendSEOSettings as SEOSettings,
} from '../hooks/useCMSBackend';

// ─── MediaItem (in-memory only, not persisted to backend) ────────────────────
export interface MediaItem {
  id: number;
  filename: string;
  url: string;
  tags: string[];
  uploadedAt: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const defaultSiteSettings: SiteSettings = {
  siteTitle: 'Susan Richten',
  siteTagline: 'Fine Art & Commissions',
  socialPlatforms: [
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
  ],
  seoSettings: [
    { page: 'home', title: 'Susan Richten | Fine Art', description: 'Fine art by Susan Richten', keywords: 'art, painting, fine art' },
    { page: 'gallery', title: 'Gallery | Susan Richten', description: 'Browse artworks by Susan Richten', keywords: 'gallery, artworks' },
    { page: 'about', title: 'About | Susan Richten', description: 'About Susan Richten', keywords: 'about, artist' },
    { page: 'commissions', title: 'Commissions | Susan Richten', description: 'Commission a custom artwork', keywords: 'commissions, custom art' },
    { page: 'contact', title: 'Contact | Susan Richten', description: 'Get in touch with Susan Richten', keywords: 'contact' },
  ],
  googleAnalyticsId: '',
  newsletterPlaceholder: 'Enter your email',
  aboutBio: 'Susan Richten is a contemporary fine artist known for her evocative landscapes and portraits.',
  artistStatement: 'My work explores the interplay between light and shadow, capturing fleeting moments of beauty in the everyday world.',
  heroArtistName: 'Susan Richten',
  heroTagline: 'Fine Art & Commissions',
  heroIntroText: 'Welcome to my studio. I create original paintings and accept commissions for custom artwork.',
  commissionHeroText: 'Commission a unique, original artwork created just for you.',
  commissionPricingText: 'Pricing varies based on size, medium, and complexity. Contact me for a custom quote.',
};

const defaultNavigationItems: NavigationItem[] = [
  { id: 1, name: 'Home', path: '/', order: 1 },
  { id: 2, name: 'Gallery', path: '/gallery', order: 2 },
  { id: 3, name: 'About', path: '/about', order: 3 },
  { id: 4, name: 'Commissions', path: '/commissions', order: 4 },
  { id: 5, name: 'Contact', path: '/contact', order: 5 },
];

const defaultArtworks: Artwork[] = [
  {
    id: 1,
    title: 'Morning Light',
    year: 2023,
    medium: 'Oil on Canvas',
    size: '24" x 36"',
    location: 'Private Collection',
    description: 'A serene landscape capturing the first light of dawn.',
    category: 'Landscape',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: true,
    featured: true,
    visible: true,
    order: 1,
  },
  {
    id: 2,
    title: 'Still Waters',
    year: 2022,
    medium: 'Watercolor',
    size: '18" x 24"',
    location: 'Gallery Collection',
    description: 'Reflections on a calm lake at dusk.',
    category: 'Landscape',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: false,
    featured: true,
    visible: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Portrait Study',
    year: 2023,
    medium: 'Charcoal',
    size: '12" x 16"',
    location: 'Artist Studio',
    description: 'An intimate portrait study exploring light and shadow.',
    category: 'Portrait',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: true,
    featured: false,
    visible: true,
    order: 3,
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Susan's work is absolutely breathtaking. The commissioned piece she created for our home is a true masterpiece.",
    name: 'Emily Johnson',
    location: 'New York, NY',
    role: 'Art Collector',
  },
  {
    id: 2,
    quote: 'Working with Susan was a wonderful experience. She captured exactly what I envisioned.',
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    role: 'Interior Designer',
  },
];

const defaultPressMentions: PressMention[] = [
  {
    id: 1,
    publication: 'Art Today Magazine',
    date: '2023-06-15',
    headline: 'Rising Stars in Contemporary Art',
    url: '#',
    excerpt: "Susan Richten's luminous landscapes have captured the attention of collectors worldwide.",
  },
];

const defaultProcessSteps: ProcessStep[] = [
  { id: 1, stepNumber: 1, title: 'Initial Consultation', description: 'We discuss your vision, preferences, and requirements.' },
  { id: 2, stepNumber: 2, title: 'Concept & Proposal', description: 'I create a detailed proposal with sketches and pricing.' },
  { id: 3, stepNumber: 3, title: 'Creation', description: 'I bring your vision to life with careful attention to detail.' },
  { id: 4, stepNumber: 4, title: 'Delivery', description: 'Your finished artwork is carefully packaged and delivered.' },
];

const defaultFAQItems: FAQItem[] = [
  { id: 1, question: 'How long does a commission take?', answer: 'Typically 4-8 weeks depending on size and complexity.' },
  { id: 2, question: 'What is your pricing?', answer: 'Pricing varies based on size, medium, and complexity. Please contact me for a quote.' },
  { id: 3, question: 'Do you ship internationally?', answer: 'Yes, I ship worldwide with careful packaging to ensure safe delivery.' },
];

const defaultCareerMilestones: CareerMilestone[] = [
  { id: 1, year: '2015', event: 'Graduated with MFA from the Academy of Fine Arts' },
  { id: 2, year: '2017', event: 'First solo exhibition at the Downtown Gallery' },
  { id: 3, year: '2020', event: "Featured in Art Today Magazine's \"Artists to Watch\"" },
  { id: 4, year: '2022', event: 'International exhibition in Paris and London' },
];

// ─── Context type ─────────────────────────────────────────────────────────────

interface CMSContextType {
  // Data
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
  siteSettings: SiteSettings;
  navigationItems: NavigationItem[];
  mediaLibrary: MediaItem[];

  // Loading state
  isLoading: boolean;

  // Artworks
  addArtwork: (artwork: Omit<Artwork, 'id'>) => void;
  updateArtwork: (artwork: Artwork) => void;
  deleteArtwork: (id: number) => void;

  // Testimonials
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: number) => void;
  setTestimonials: (testimonials: Testimonial[]) => void;

  // Press Mentions
  addPressMention: (mention: Omit<PressMention, 'id'>) => void;
  updatePressMention: (mention: PressMention) => void;
  deletePressMention: (id: number) => void;
  setPressMentions: (mentions: PressMention[]) => void;

  // Commission Inquiries
  addCommissionInquiry: (inquiry: Omit<CommissionInquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateCommissionInquiryStatus: (id: number, status: string) => void;
  updateCommissionInquiry: (id: number, updates: Partial<CommissionInquiry>) => void;

  // Contact Inquiries
  addContactInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'timestamp' | 'status'>) => void;

  // Notifications
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  updateNotificationStatus: (id: number, status: string) => void;
  markNotificationRead: (id: number) => void;
  markNotificationResponded: (id: number) => void;
  deleteNotification: (id: number) => void;

  // Blog Posts
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: number) => void;

  // FAQ Items
  updateFAQItems: (items: FAQItem[]) => void;

  // Process Steps
  updateProcessSteps: (steps: ProcessStep[]) => void;

  // Career Milestones
  updateCareerMilestones: (milestones: CareerMilestone[]) => void;

  // Site Settings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Navigation Items
  updateNavigationItems: (items: NavigationItem[]) => void;

  // Media Library (in-memory only)
  addMediaItem: (item: Omit<MediaItem, 'id'>) => void;
  updateMediaItem: (item: MediaItem) => void;
  deleteMediaItem: (id: number) => void;

  // Aliases for backward compat
  navItems: NavigationItem[];
  homepageSettings: SiteSettings;
  commissionsPageContent: {
    heroText: string;
    pricingText: string;
  };
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const backend = useCMSBackend();

  const [artworks, setArtworks] = useState<Artwork[]>(defaultArtworks);
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(defaultTestimonials);
  const [pressMentions, setPressMentionsState] = useState<PressMention[]>(defaultPressMentions);
  const [commissionInquiries, setCommissionInquiries] = useState<CommissionInquiry[]>([]);
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [faqItems, setFAQItems] = useState<FAQItem[]>(defaultFAQItems);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(defaultProcessSteps);
  const [careerMilestones, setCareerMilestones] = useState<CareerMilestone[]>(defaultCareerMilestones);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(defaultNavigationItems);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Track whether backend has been loaded to avoid overwriting with defaults
  const backendLoadedRef = useRef(false);

  // ─── Load from backend on mount ───────────────────────────────────────────

  const loadFromBackend = useCallback(async () => {
    const data = await backend.loadAllCMSData();
    if (!data) return; // actor not ready yet

    backendLoadedRef.current = true;

    if (data.artworks.length > 0) setArtworks(data.artworks);
    if (data.testimonials.length > 0) setTestimonialsState(data.testimonials);
    if (data.pressMentions.length > 0) setPressMentionsState(data.pressMentions);
    if (data.commissionInquiries.length > 0) setCommissionInquiries(data.commissionInquiries);
    if (data.contactInquiries.length > 0) setContactInquiries(data.contactInquiries);
    if (data.notifications.length > 0) setNotifications(data.notifications);
    if (data.blogPosts.length > 0) setBlogPosts(data.blogPosts);
    if (data.faqItems.length > 0) setFAQItems(data.faqItems);
    if (data.processSteps.length > 0) setProcessSteps(data.processSteps);
    if (data.careerMilestones.length > 0) setCareerMilestones(data.careerMilestones);
    if (data.siteSettings) setSiteSettings(data.siteSettings);
    if (data.navigationItems.length > 0) setNavigationItems(data.navigationItems);

    setIsLoading(false);
  }, [backend]);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 20;

    async function tryLoad() {
      if (cancelled) return;
      await loadFromBackend();
      if (!backendLoadedRef.current && attempts < maxAttempts) {
        attempts++;
        setTimeout(tryLoad, 1000);
      } else {
        setIsLoading(false);
      }
    }

    tryLoad();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Helper: generate next ID ─────────────────────────────────────────────

  function nextId(items: { id: number }[]): number {
    return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
  }

  // ─── Artworks ─────────────────────────────────────────────────────────────

  const addArtwork = useCallback((artwork: Omit<Artwork, 'id'>) => {
    setArtworks((prev) => {
      const next = [...prev, { ...artwork, id: nextId(prev) }];
      backend.saveArtworks(next).catch((e) => console.error('addArtwork save failed:', e));
      return next;
    });
  }, [backend]);

  const updateArtwork = useCallback((artwork: Artwork) => {
    setArtworks((prev) => {
      const next = prev.map((a) => (a.id === artwork.id ? artwork : a));
      backend.saveArtworks(next).catch((e) => console.error('updateArtwork save failed:', e));
      return next;
    });
  }, [backend]);

  const deleteArtwork = useCallback((id: number) => {
    setArtworks((prev) => {
      const next = prev.filter((a) => a.id !== id);
      backend.saveArtworks(next).catch((e) => console.error('deleteArtwork save failed:', e));
      return next;
    });
  }, [backend]);

  // ─── Testimonials ─────────────────────────────────────────────────────────

  const addTestimonial = useCallback((testimonial: Omit<Testimonial, 'id'>) => {
    setTestimonialsState((prev) => {
      const next = [...prev, { ...testimonial, id: nextId(prev) }];
      backend.saveTestimonials(next).catch((e) => console.error('addTestimonial save failed:', e));
      return next;
    });
  }, [backend]);

  const updateTestimonial = useCallback((testimonial: Testimonial) => {
    setTestimonialsState((prev) => {
      const next = prev.map((t) => (t.id === testimonial.id ? testimonial : t));
      backend.saveTestimonials(next).catch((e) => console.error('updateTestimonial save failed:', e));
      return next;
    });
  }, [backend]);

  const deleteTestimonial = useCallback((id: number) => {
    setTestimonialsState((prev) => {
      const next = prev.filter((t) => t.id !== id);
      backend.saveTestimonials(next).catch((e) => console.error('deleteTestimonial save failed:', e));
      return next;
    });
  }, [backend]);

  const setTestimonials = useCallback((testimonials: Testimonial[]) => {
    setTestimonialsState(testimonials);
    backend.saveTestimonials(testimonials).catch((e) => console.error('setTestimonials save failed:', e));
  }, [backend]);

  // ─── Press Mentions ───────────────────────────────────────────────────────

  const addPressMention = useCallback((mention: Omit<PressMention, 'id'>) => {
    setPressMentionsState((prev) => {
      const next = [...prev, { ...mention, id: nextId(prev) }];
      backend.savePressMentions(next).catch((e) => console.error('addPressMention save failed:', e));
      return next;
    });
  }, [backend]);

  const updatePressMention = useCallback((mention: PressMention) => {
    setPressMentionsState((prev) => {
      const next = prev.map((p) => (p.id === mention.id ? mention : p));
      backend.savePressMentions(next).catch((e) => console.error('updatePressMention save failed:', e));
      return next;
    });
  }, [backend]);

  const deletePressMention = useCallback((id: number) => {
    setPressMentionsState((prev) => {
      const next = prev.filter((p) => p.id !== id);
      backend.savePressMentions(next).catch((e) => console.error('deletePressMention save failed:', e));
      return next;
    });
  }, [backend]);

  const setPressMentions = useCallback((mentions: PressMention[]) => {
    setPressMentionsState(mentions);
    backend.savePressMentions(mentions).catch((e) => console.error('setPressMentions save failed:', e));
  }, [backend]);

  // ─── Commission Inquiries ─────────────────────────────────────────────────

  const addCommissionInquiry = useCallback((inquiry: Omit<CommissionInquiry, 'id' | 'timestamp' | 'status'>) => {
    setCommissionInquiries((prev) => {
      const next = [...prev, { ...inquiry, id: nextId(prev), timestamp: Date.now(), status: 'new' }];
      backend.saveCommissionInquiries(next).catch((e) => console.error('addCommissionInquiry save failed:', e));
      return next;
    });
  }, [backend]);

  const updateCommissionInquiryStatus = useCallback((id: number, status: string) => {
    setCommissionInquiries((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, status } : c));
      backend.saveCommissionInquiries(next).catch((e) => console.error('updateCommissionInquiryStatus save failed:', e));
      return next;
    });
  }, [backend]);

  const updateCommissionInquiry = useCallback((id: number, updates: Partial<CommissionInquiry>) => {
    setCommissionInquiries((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
      backend.saveCommissionInquiries(next).catch((e) => console.error('updateCommissionInquiry save failed:', e));
      return next;
    });
  }, [backend]);

  // ─── Contact Inquiries ────────────────────────────────────────────────────

  const addContactInquiry = useCallback((inquiry: Omit<ContactInquiry, 'id' | 'timestamp' | 'status'>) => {
    setContactInquiries((prev) => {
      const next = [...prev, { ...inquiry, id: nextId(prev), timestamp: Date.now(), status: 'new' }];
      backend.saveContactInquiries(next).catch((e) => console.error('addContactInquiry save failed:', e));
      return next;
    });
  }, [backend]);

  // ─── Notifications ────────────────────────────────────────────────────────

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    setNotifications((prev) => {
      const next = [...prev, { ...notification, id: nextId(prev), timestamp: Date.now() }];
      backend.saveNotifications(next).catch((e) => console.error('addNotification save failed:', e));
      return next;
    });
  }, [backend]);

  const updateNotificationStatus = useCallback((id: number, status: string) => {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, status } : n));
      backend.saveNotifications(next).catch((e) => console.error('updateNotificationStatus save failed:', e));
      return next;
    });
  }, [backend]);

  const markNotificationRead = useCallback((id: number) => {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, status: 'read' } : n));
      backend.saveNotifications(next).catch((e) => console.error('markNotificationRead save failed:', e));
      return next;
    });
  }, [backend]);

  const markNotificationResponded = useCallback((id: number) => {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, status: 'responded' } : n));
      backend.saveNotifications(next).catch((e) => console.error('markNotificationResponded save failed:', e));
      return next;
    });
  }, [backend]);

  const deleteNotification = useCallback((id: number) => {
    setNotifications((prev) => {
      const next = prev.filter((n) => n.id !== id);
      backend.saveNotifications(next).catch((e) => console.error('deleteNotification save failed:', e));
      return next;
    });
  }, [backend]);

  // ─── Blog Posts ───────────────────────────────────────────────────────────

  const addBlogPost = useCallback((post: Omit<BlogPost, 'id'>) => {
    setBlogPosts((prev) => {
      const next = [...prev, { ...post, id: nextId(prev) }];
      backend.saveBlogPosts(next).catch((e) => console.error('addBlogPost save failed:', e));
      return next;
    });
  }, [backend]);

  const updateBlogPost = useCallback((post: BlogPost) => {
    setBlogPosts((prev) => {
      const next = prev.map((b) => (b.id === post.id ? post : b));
      backend.saveBlogPosts(next).catch((e) => console.error('updateBlogPost save failed:', e));
      return next;
    });
  }, [backend]);

  const deleteBlogPost = useCallback((id: number) => {
    setBlogPosts((prev) => {
      const next = prev.filter((b) => b.id !== id);
      backend.saveBlogPosts(next).catch((e) => console.error('deleteBlogPost save failed:', e));
      return next;
    });
  }, [backend]);

  // ─── FAQ Items ────────────────────────────────────────────────────────────

  const updateFAQItems = useCallback((items: FAQItem[]) => {
    setFAQItems(items);
    backend.saveFAQItems(items).catch((e) => console.error('updateFAQItems save failed:', e));
  }, [backend]);

  // ─── Process Steps ────────────────────────────────────────────────────────

  const updateProcessSteps = useCallback((steps: ProcessStep[]) => {
    setProcessSteps(steps);
    backend.saveProcessSteps(steps).catch((e) => console.error('updateProcessSteps save failed:', e));
  }, [backend]);

  // ─── Career Milestones ────────────────────────────────────────────────────

  const updateCareerMilestones = useCallback((milestones: CareerMilestone[]) => {
    setCareerMilestones(milestones);
    backend.saveCareerMilestones(milestones).catch((e) => console.error('updateCareerMilestones save failed:', e));
  }, [backend]);

  // ─── Site Settings ────────────────────────────────────────────────────────

  const updateSiteSettings = useCallback((partial: Partial<SiteSettings>) => {
    setSiteSettings((prev) => {
      const next = { ...prev, ...partial };
      backend.saveSiteSettings(next).catch((e) => console.error('updateSiteSettings save failed:', e));
      return next;
    });
  }, [backend]);

  // ─── Navigation Items ─────────────────────────────────────────────────────

  const updateNavigationItems = useCallback((items: NavigationItem[]) => {
    setNavigationItems(items);
    backend.saveNavigationItems(items).catch((e) => console.error('updateNavigationItems save failed:', e));
  }, [backend]);

  // ─── Media Library (in-memory only) ──────────────────────────────────────

  const addMediaItem = useCallback((item: Omit<MediaItem, 'id'>) => {
    setMediaLibrary((prev) => [...prev, { ...item, id: nextId(prev) }]);
  }, []);

  const updateMediaItem = useCallback((item: MediaItem) => {
    setMediaLibrary((prev) => prev.map((m) => (m.id === item.id ? item : m)));
  }, []);

  const deleteMediaItem = useCallback((id: number) => {
    setMediaLibrary((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // ─── Derived aliases ──────────────────────────────────────────────────────

  const commissionsPageContent = {
    heroText: siteSettings.commissionHeroText,
    pricingText: siteSettings.commissionPricingText,
  };

  const value: CMSContextType = {
    artworks,
    testimonials,
    pressMentions,
    commissionInquiries,
    contactInquiries,
    notifications,
    blogPosts,
    faqItems,
    processSteps,
    careerMilestones,
    siteSettings,
    navigationItems,
    mediaLibrary,
    isLoading,

    addArtwork,
    updateArtwork,
    deleteArtwork,

    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    setTestimonials,

    addPressMention,
    updatePressMention,
    deletePressMention,
    setPressMentions,

    addCommissionInquiry,
    updateCommissionInquiryStatus,
    updateCommissionInquiry,

    addContactInquiry,

    addNotification,
    updateNotificationStatus,
    markNotificationRead,
    markNotificationResponded,
    deleteNotification,

    addBlogPost,
    updateBlogPost,
    deleteBlogPost,

    updateFAQItems,
    updateProcessSteps,
    updateCareerMilestones,
    updateSiteSettings,
    updateNavigationItems,

    addMediaItem,
    updateMediaItem,
    deleteMediaItem,

    // Aliases
    navItems: navigationItems,
    homepageSettings: siteSettings,
    commissionsPageContent,
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCMS(): CMSContextType {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within a CMSProvider');
  return ctx;
}

export default CMSContext;

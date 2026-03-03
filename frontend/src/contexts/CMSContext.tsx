import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useCMSBackend } from '../hooks/useCMSBackend';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Artwork {
  id: string;
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

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  role: string;
}

export interface PressMention {
  id: string;
  publication: string;
  date: string;
  headline: string;
  url: string;
  excerpt: string;
}

export interface CommissionInquiry {
  id: string;
  name: string;
  email: string;
  projectType?: string;
  budgetRange?: string;
  budget: string;
  description: string;
  projectDescription?: string;
  status: 'new' | 'in-progress' | 'completed' | 'declined';
  timestamp: number;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'responded';
  timestamp: number;
}

export interface Notification {
  id: string;
  sourceType: 'commission' | 'contact' | 'newsletter';
  submitterName: string;
  submitterEmail: string;
  messagePreview: string;
  fullPayload: string;
  timestamp: number;
  status: 'unread' | 'read' | 'responded';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  publishDate: number;
  status: 'draft' | 'published';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ProcessStep is the canonical name used throughout the app (useCMSBackend imports it)
export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

export interface CareerMilestone {
  id: string;
  year: string;
  event: string;
}

export interface SocialPlatform {
  name: string;
  url: string;
  icon: string;
}

export interface SEOSettings {
  page: string;
  title: string;
  description: string;
  keywords: string;
}

export interface SiteSettings {
  siteTitle: string;
  siteTagline: string;
  socialPlatforms: SocialPlatform[];
  seoSettings: SEOSettings[];
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

export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  order: number;
}

export interface HomepageSettings {
  heroArtistName: string;
  heroTagline: string;
  heroImage: string;
  artistIntro: string;
}

export interface AboutPageContent {
  bio: string;
  artistStatement: string;
  portraitImage: string;
  careerMilestones: CareerMilestone[];
  pressLinks: PressMention[];
}

export interface CommissionsPageContent {
  heroText: string;
  pricingText: string;
  processSteps: ProcessStep[];
  faqItems: FAQItem[];
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  width: number;
  height: number;
  usedIn: string[];
  tags: string[];
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const defaultSiteSettings: SiteSettings = {
  siteTitle: 'Susan Richten',
  siteTagline: 'Fine Art & Commissions',
  heroArtistName: 'Susan Richten',
  heroTagline: 'Fine Art & Commissions',
  heroIntroText: 'Welcome to my studio — a space where light, texture, and emotion converge in every brushstroke.',
  aboutBio: 'Susan Richten is a contemporary fine artist based in New York, specializing in oil paintings that explore the interplay of light and shadow. With over 15 years of experience, her work has been exhibited in galleries across North America and Europe.',
  artistStatement: 'My work is an exploration of the liminal spaces between reality and perception. Through careful observation and deliberate technique, I seek to capture not just what we see, but how we feel in the presence of light.',
  commissionHeroText: 'Every commission is a collaboration — a chance to create something uniquely yours. I work closely with each client to understand their vision and bring it to life with care and craftsmanship.',
  commissionPricingText: 'Pricing varies based on size, complexity, and medium. Small works (8×10 to 16×20) start at $800. Medium works (18×24 to 24×36) range from $1,500–$3,500. Large works (30×40 and above) are priced from $4,000. All commissions include a certificate of authenticity.',
  newsletterPlaceholder: 'Enter your email for studio updates',
  googleAnalyticsId: '',
  socialPlatforms: [
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Pinterest', url: 'https://pinterest.com', icon: 'pinterest' },
  ],
  seoSettings: [
    {
      page: 'home',
      title: 'Susan Richten — Fine Art & Commissions',
      description: 'Explore the portfolio of Susan Richten, a contemporary fine artist specializing in oil paintings.',
      keywords: 'fine art, oil paintings, commissions, contemporary art',
    },
    {
      page: 'gallery',
      title: 'Gallery — Susan Richten',
      description: 'Browse original artworks by Susan Richten.',
      keywords: 'art gallery, original paintings, fine art',
    },
    {
      page: 'about',
      title: 'About — Susan Richten',
      description: 'Learn about Susan Richten, her background, and artistic journey.',
      keywords: 'artist bio, Susan Richten, fine art',
    },
    {
      page: 'commissions',
      title: 'Commissions — Susan Richten',
      description: 'Commission a custom artwork from Susan Richten.',
      keywords: 'art commissions, custom paintings, bespoke art',
    },
    {
      page: 'contact',
      title: 'Contact — Susan Richten',
      description: 'Get in touch with Susan Richten.',
      keywords: 'contact artist, art inquiries',
    },
    {
      page: 'testimonials',
      title: 'Testimonials — Susan Richten',
      description: 'What collectors say about Susan Richten\'s work.',
      keywords: 'testimonials, reviews, collectors',
    },
  ],
};

const defaultArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Golden Hour',
    year: 2023,
    medium: 'Oil on Canvas',
    size: '24×36 inches',
    location: 'Private Collection',
    description: 'A luminous study of late afternoon light filtering through autumn leaves.',
    category: 'Landscape',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: false,
    featured: true,
    visible: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Still Life with Peonies',
    year: 2023,
    medium: 'Oil on Linen',
    size: '18×24 inches',
    location: 'Studio',
    description: 'Soft petals rendered in delicate layers of translucent paint.',
    category: 'Still Life',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: true,
    featured: true,
    visible: true,
    order: 2,
  },
  {
    id: '3',
    title: 'Morning Mist',
    year: 2022,
    medium: 'Oil on Canvas',
    size: '30×40 inches',
    location: 'Gallery Collection',
    description: 'Atmospheric landscape capturing the quiet beauty of early morning.',
    category: 'Landscape',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: false,
    featured: true,
    visible: true,
    order: 3,
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Susan created the most beautiful portrait of our family home. The attention to detail and the way she captured the light was extraordinary.',
    name: 'Sarah M.',
    location: 'New York, NY',
    role: 'Commission Client',
  },
  {
    id: '2',
    quote: 'Working with Susan was a joy from start to finish. She truly listened to what I wanted and delivered something beyond my expectations.',
    name: 'James T.',
    location: 'Boston, MA',
    role: 'Commission Client',
  },
  {
    id: '3',
    quote: "I've purchased three pieces from Susan's gallery and each one brings me joy every single day. Her work has a timeless quality.",
    name: 'Elena R.',
    location: 'Chicago, IL',
    role: 'Collector',
  },
  {
    id: '4',
    quote: "Susan's ability to capture emotion in her paintings is unparalleled. The commission she completed for us is the centerpiece of our home.",
    name: 'Michael & Anne D.',
    location: 'San Francisco, CA',
    role: 'Collectors',
  },
];

const defaultPressMentions: PressMention[] = [
  {
    id: '1',
    publication: 'Art in America',
    date: '2023-09',
    headline: 'Susan Richten: Light as Language',
    url: '#',
    excerpt: 'Richten\'s latest series demonstrates a masterful command of light and shadow, establishing her as one of the most compelling voices in contemporary realism.',
  },
  {
    id: '2',
    publication: 'The New York Times',
    date: '2023-03',
    headline: 'Studio Visit: Inside Susan Richten\'s World',
    url: '#',
    excerpt: 'A rare glimpse into the working process of an artist whose quiet dedication to craft has earned her a devoted following.',
  },
  {
    id: '3',
    publication: 'Artforum',
    date: '2022-11',
    headline: 'New Voices in Contemporary Realism',
    url: '#',
    excerpt: 'Among the emerging realists worth watching, Susan Richten stands out for her mastery of light and her ability to imbue familiar scenes with quiet drama.',
  },
];

const defaultCareerMilestones: CareerMilestone[] = [
  { id: '1', year: '2008', event: 'BFA in Fine Arts, Rhode Island School of Design' },
  { id: '2', year: '2010', event: 'First solo exhibition, Gallery 23, New York' },
  { id: '3', year: '2014', event: 'Artist residency, Civitella Ranieri Foundation, Italy' },
  { id: '4', year: '2017', event: 'Featured in Art in America\'s "New Voices" issue' },
  { id: '5', year: '2019', event: 'Permanent collection acquisition, Museum of Contemporary Art, Chicago' },
  { id: '6', year: '2022', event: 'Retrospective exhibition, The Drawing Center, New York' },
];

const defaultFAQItems: FAQItem[] = [
  {
    id: '1',
    question: 'How long does a commission take?',
    answer: 'Most commissions take 6–12 weeks depending on size and complexity. I\'ll give you a specific timeline when we discuss your project.',
  },
  {
    id: '2',
    question: 'What information do you need to start?',
    answer: 'Reference photos, preferred size, medium preferences, and any specific elements you\'d like included. The more detail you provide, the better I can capture your vision.',
  },
  {
    id: '3',
    question: 'Do you offer payment plans?',
    answer: 'Yes. I require a 50% deposit to begin work, with the balance due upon completion. For larger commissions, we can arrange a payment schedule.',
  },
  {
    id: '4',
    question: 'Can I see progress photos?',
    answer: 'Absolutely. I share progress photos at key stages and welcome feedback throughout the process.',
  },
  {
    id: '5',
    question: 'Do you ship internationally?',
    answer: 'Yes. Paintings are professionally packed and shipped via fine art courier. International shipping costs vary by destination and are the client\'s responsibility.',
  },
];

const defaultProcessSteps: ProcessStep[] = [
  { id: '1', stepNumber: 1, title: 'Initial Consultation', description: 'We discuss your vision, preferred size, medium, and timeline. I\'ll answer any questions and provide a detailed quote.' },
  { id: '2', stepNumber: 2, title: 'Deposit & Agreement', description: 'A 50% deposit secures your commission slot. I\'ll send a simple agreement outlining the scope and timeline.' },
  { id: '3', stepNumber: 3, title: 'Creation & Updates', description: 'I begin work and share progress photos at key stages. Your feedback is welcome throughout.' },
  { id: '4', stepNumber: 4, title: 'Delivery', description: 'Upon completion and final payment, your artwork is carefully packaged and shipped or available for local pickup.' },
];

const defaultNavigationItems: NavigationItem[] = [
  { id: '1', name: 'Home', path: '/', order: 1 },
  { id: '2', name: 'Gallery', path: '/gallery', order: 2 },
  { id: '3', name: 'About', path: '/about', order: 3 },
  { id: '4', name: 'Commissions', path: '/commissions', order: 4 },
  { id: '5', name: 'Testimonials', path: '/testimonials', order: 5 },
  { id: '6', name: 'Contact', path: '/contact', order: 6 },
];

// ─── Context Type ─────────────────────────────────────────────────────────────

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
  /** Alias for navigationItems — backward compat */
  navItems: NavigationItem[];
  mediaItems: MediaItem[];
  /** Alias for mediaItems — backward compat */
  mediaLibrary: MediaItem[];
  homepageSettings: HomepageSettings;
  aboutPageContent: AboutPageContent;
  commissionsPageContent: CommissionsPageContent;
  isLoading: boolean;
  syncError: string | null;

  // Artwork operations
  addArtwork: (artwork: Omit<Artwork, 'id'>) => void;
  updateArtwork: (id: string, artwork: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;

  // Testimonial operations
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  setTestimonials: (testimonials: Testimonial[]) => void;

  // Press mention operations
  addPressMention: (mention: Omit<PressMention, 'id'>) => void;
  updatePressMention: (id: string, mention: Partial<PressMention>) => void;
  deletePressMention: (id: string) => void;
  setPressMentions: (mentions: PressMention[]) => void;

  // Commission inquiry operations
  addCommissionInquiry: (inquiry: Omit<CommissionInquiry, 'id' | 'status' | 'timestamp'>) => void;
  updateCommissionInquiryStatus: (id: string, status: CommissionInquiry['status']) => void;
  updateCommissionInquiry: (id: string, updates: Partial<CommissionInquiry>) => void;

  // Contact inquiry operations
  addContactInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'status' | 'timestamp'>) => void;
  updateContactInquiryStatus: (id: string, status: ContactInquiry['status']) => void;

  // Notification operations
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'status'>) => void;
  updateNotificationStatus: (id: string, status: Notification['status']) => void;
  deleteNotification: (id: string) => void;

  // Blog post operations
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // FAQ operations
  addFAQItem: (item: Omit<FAQItem, 'id'>) => void;
  updateFAQItem: (id: string, item: Partial<FAQItem>) => void;
  deleteFAQItem: (id: string) => void;
  updateFAQItems: (items: FAQItem[]) => void;

  // Process step operations
  addProcessStep: (step: Omit<ProcessStep, 'id'>) => void;
  updateProcessStep: (id: string, step: Partial<ProcessStep>) => void;
  deleteProcessStep: (id: string) => void;
  updateProcessSteps: (steps: ProcessStep[]) => void;

  // Career milestone operations
  addCareerMilestone: (milestone: Omit<CareerMilestone, 'id'>) => void;
  updateCareerMilestone: (id: string, milestone: Partial<CareerMilestone>) => void;
  deleteCareerMilestone: (id: string) => void;
  updateCareerMilestones: (milestones: CareerMilestone[]) => void;

  // Site settings operations
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Navigation operations
  updateNavigationItems: (items: NavigationItem[]) => void;

  // Media operations
  addMediaItem: (item: Omit<MediaItem, 'id'>) => void;
  deleteMediaItem: (id: string) => void;
  updateMediaItem: (id: string, item: Partial<MediaItem>) => void;

  // Homepage settings
  updateHomepageSettings: (settings: Partial<HomepageSettings>) => void;

  // About page content
  updateAboutPageContent: (content: Partial<AboutPageContent>) => void;

  // Commissions page content
  updateCommissionsPageContent: (content: Partial<CommissionsPageContent>) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within a CMSProvider');
  return context;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const backend = useCMSBackend();

  const [artworks, setArtworksState] = useState<Artwork[]>(defaultArtworks);
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(defaultTestimonials);
  const [pressMentions, setPressMentionsState] = useState<PressMention[]>(defaultPressMentions);
  const [commissionInquiries, setCommissionInquiriesState] = useState<CommissionInquiry[]>([]);
  const [contactInquiries, setContactInquiriesState] = useState<ContactInquiry[]>([]);
  const [notifications, setNotificationsState] = useState<Notification[]>([]);
  const [blogPosts, setBlogPostsState] = useState<BlogPost[]>([]);
  const [faqItems, setFAQItemsState] = useState<FAQItem[]>(defaultFAQItems);
  const [processSteps, setProcessStepsState] = useState<ProcessStep[]>(defaultProcessSteps);
  const [careerMilestones, setCareerMilestonesState] = useState<CareerMilestone[]>(defaultCareerMilestones);
  const [siteSettings, setSiteSettingsState] = useState<SiteSettings>(defaultSiteSettings);
  const [navigationItems, setNavigationItemsState] = useState<NavigationItem[]>(defaultNavigationItems);
  const [mediaItems, setMediaItemsState] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Load all data from backend on mount using loadAllData()
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await backend.loadAllData();

        if (data.artworks.length > 0) setArtworksState(data.artworks);
        if (data.testimonials.length > 0) setTestimonialsState(data.testimonials);
        if (data.pressMentions.length > 0) setPressMentionsState(data.pressMentions);
        if (data.commissionInquiries.length > 0) setCommissionInquiriesState(data.commissionInquiries);
        if (data.contactInquiries.length > 0) setContactInquiriesState(data.contactInquiries);
        if (data.notifications.length > 0) setNotificationsState(data.notifications);
        if (data.blogPosts.length > 0) setBlogPostsState(data.blogPosts);
        if (data.faqItems.length > 0) setFAQItemsState(data.faqItems);
        if (data.processSteps.length > 0) setProcessStepsState(data.processSteps);
        if (data.careerMilestones.length > 0) setCareerMilestonesState(data.careerMilestones);
        if (data.siteSettings) setSiteSettingsState(data.siteSettings);
        if (data.navigationItems.length > 0) setNavigationItemsState(data.navigationItems);
      } catch (err) {
        setSyncError('Failed to load data from backend');
        console.error('CMS load error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const generateId = () => Date.now().toString() + Math.random().toString(36).slice(2);

  // ── Artworks ─────────────────────────────────────────────────────────────────

  const addArtwork = useCallback((artwork: Omit<Artwork, 'id'>) => {
    const newArtwork = { ...artwork, id: generateId() };
    setArtworksState(prev => {
      const next = [...prev, newArtwork];
      backend.saveArtworks(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateArtwork = useCallback((id: string, artwork: Partial<Artwork>) => {
    setArtworksState(prev => {
      const next = prev.map(a => a.id === id ? { ...a, ...artwork } : a);
      backend.saveArtworks(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const deleteArtwork = useCallback((id: string) => {
    setArtworksState(prev => {
      const next = prev.filter(a => a.id !== id);
      backend.saveArtworks(next).catch(console.error);
      return next;
    });
  }, [backend]);

  // ── Testimonials ─────────────────────────────────────────────────────────────

  const addTestimonial = useCallback((testimonial: Omit<Testimonial, 'id'>) => {
    const newItem = { ...testimonial, id: generateId() };
    setTestimonialsState(prev => {
      const next = [...prev, newItem];
      backend.saveTestimonials(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateTestimonial = useCallback((id: string, testimonial: Partial<Testimonial>) => {
    setTestimonialsState(prev => {
      const next = prev.map(t => t.id === id ? { ...t, ...testimonial } : t);
      backend.saveTestimonials(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonialsState(prev => {
      const next = prev.filter(t => t.id !== id);
      backend.saveTestimonials(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const setTestimonials = useCallback((testimonials: Testimonial[]) => {
    setTestimonialsState(testimonials);
    backend.saveTestimonials(testimonials).catch(console.error);
  }, [backend]);

  // ── Press Mentions ────────────────────────────────────────────────────────────

  const addPressMention = useCallback((mention: Omit<PressMention, 'id'>) => {
    const newItem = { ...mention, id: generateId() };
    setPressMentionsState(prev => {
      const next = [...prev, newItem];
      backend.savePressMentions(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updatePressMention = useCallback((id: string, mention: Partial<PressMention>) => {
    setPressMentionsState(prev => {
      const next = prev.map(m => m.id === id ? { ...m, ...mention } : m);
      backend.savePressMentions(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const deletePressMention = useCallback((id: string) => {
    setPressMentionsState(prev => {
      const next = prev.filter(m => m.id !== id);
      backend.savePressMentions(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const setPressMentions = useCallback((mentions: PressMention[]) => {
    setPressMentionsState(mentions);
    backend.savePressMentions(mentions).catch(console.error);
  }, [backend]);

  // ── Commission Inquiries ──────────────────────────────────────────────────────

  const addCommissionInquiry = useCallback((inquiry: Omit<CommissionInquiry, 'id' | 'status' | 'timestamp'>) => {
    const newItem: CommissionInquiry = { ...inquiry, id: generateId(), status: 'new', timestamp: Date.now() };
    setCommissionInquiriesState(prev => {
      const next = [...prev, newItem];
      backend.saveCommissionInquiries(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateCommissionInquiryStatus = useCallback((id: string, status: CommissionInquiry['status']) => {
    setCommissionInquiriesState(prev => {
      const next = prev.map(i => i.id === id ? { ...i, status } : i);
      backend.saveCommissionInquiries(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateCommissionInquiry = useCallback((id: string, updates: Partial<CommissionInquiry>) => {
    setCommissionInquiriesState(prev => {
      const next = prev.map(i => i.id === id ? { ...i, ...updates } : i);
      backend.saveCommissionInquiries(next).catch(console.error);
      return next;
    });
  }, [backend]);

  // ── Contact Inquiries ─────────────────────────────────────────────────────────

  const addContactInquiry = useCallback((inquiry: Omit<ContactInquiry, 'id' | 'status' | 'timestamp'>) => {
    const newItem: ContactInquiry = { ...inquiry, id: generateId(), status: 'unread', timestamp: Date.now() };
    setContactInquiriesState(prev => {
      const next = [...prev, newItem];
      backend.saveContactInquiries(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateContactInquiryStatus = useCallback((id: string, status: ContactInquiry['status']) => {
    setContactInquiriesState(prev => {
      const next = prev.map(i => i.id === id ? { ...i, status } : i);
      backend.saveContactInquiries(next).catch(console.error);
      return next;
    });
  }, [backend]);

  // ── Notifications ─────────────────────────────────────────────────────────────

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'status'>) => {
    const newItem: Notification = { ...notification, id: generateId(), timestamp: Date.now(), status: 'unread' };
    setNotificationsState(prev => {
      const next = [...prev, newItem];
      backend.saveNotifications(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateNotificationStatus = useCallback((id: string, status: Notification['status']) => {
    setNotificationsState(prev => {
      const next = prev.map(n => n.id === id ? { ...n, status } : n);
      backend.saveNotifications(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const deleteNotification = useCallback((id: string) => {
    setNotificationsState(prev => {
      const next = prev.filter(n => n.id !== id);
      backend.saveNotifications(next).catch(console.error);
      return next;
    });
  }, [backend]);

  // ── Blog Posts ────────────────────────────────────────────────────────────────

  const addBlogPost = useCallback((post: Omit<BlogPost, 'id'>) => {
    const newItem = { ...post, id: generateId() };
    setBlogPostsState(prev => {
      const next = [...prev, newItem];
      backend.saveBlogPosts(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateBlogPost = useCallback((id: string, post: Partial<BlogPost>) => {
    setBlogPostsState(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...post } : p);
      backend.saveBlogPosts(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const deleteBlogPost = useCallback((id: string) => {
    setBlogPostsState(prev => {
      const next = prev.filter(p => p.id !== id);
      backend.saveBlogPosts(next).catch(console.error);
      return next;
    });
  }, [backend]);

  // ── FAQ Items ─────────────────────────────────────────────────────────────────

  const addFAQItem = useCallback((item: Omit<FAQItem, 'id'>) => {
    const newItem = { ...item, id: generateId() };
    setFAQItemsState(prev => {
      const next = [...prev, newItem];
      backend.saveFAQItems(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateFAQItem = useCallback((id: string, item: Partial<FAQItem>) => {
    setFAQItemsState(prev => {
      const next = prev.map(f => f.id === id ? { ...f, ...item } : f);
      backend.saveFAQItems(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const deleteFAQItem = useCallback((id: string) => {
    setFAQItemsState(prev => {
      const next = prev.filter(f => f.id !== id);
      backend.saveFAQItems(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateFAQItems = useCallback((items: FAQItem[]) => {
    setFAQItemsState(items);
    backend.saveFAQItems(items).catch(console.error);
  }, [backend]);

  // ── Process Steps ─────────────────────────────────────────────────────────────

  const addProcessStep = useCallback((step: Omit<ProcessStep, 'id'>) => {
    const newItem = { ...step, id: generateId() };
    setProcessStepsState(prev => {
      const next = [...prev, newItem];
      backend.saveProcessSteps(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateProcessStep = useCallback((id: string, step: Partial<ProcessStep>) => {
    setProcessStepsState(prev => {
      const next = prev.map(s => s.id === id ? { ...s, ...step } : s);
      backend.saveProcessSteps(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const deleteProcessStep = useCallback((id: string) => {
    setProcessStepsState(prev => {
      const next = prev.filter(s => s.id !== id);
      backend.saveProcessSteps(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateProcessSteps = useCallback((steps: ProcessStep[]) => {
    setProcessStepsState(steps);
    backend.saveProcessSteps(steps).catch(console.error);
  }, [backend]);

  // ── Career Milestones ─────────────────────────────────────────────────────────

  const addCareerMilestone = useCallback((milestone: Omit<CareerMilestone, 'id'>) => {
    const newItem = { ...milestone, id: generateId() };
    setCareerMilestonesState(prev => {
      const next = [...prev, newItem];
      backend.saveCareerMilestones(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateCareerMilestone = useCallback((id: string, milestone: Partial<CareerMilestone>) => {
    setCareerMilestonesState(prev => {
      const next = prev.map(m => m.id === id ? { ...m, ...milestone } : m);
      backend.saveCareerMilestones(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const deleteCareerMilestone = useCallback((id: string) => {
    setCareerMilestonesState(prev => {
      const next = prev.filter(m => m.id !== id);
      backend.saveCareerMilestones(next).catch(console.error);
      return next;
    });
  }, [backend]);

  const updateCareerMilestones = useCallback((milestones: CareerMilestone[]) => {
    setCareerMilestonesState(milestones);
    backend.saveCareerMilestones(milestones).catch(console.error);
  }, [backend]);

  // ── Site Settings ─────────────────────────────────────────────────────────────

  const updateSiteSettings = useCallback((settings: Partial<SiteSettings>) => {
    setSiteSettingsState(prev => {
      const next = { ...prev, ...settings };
      backend.saveSiteSettings(next).catch(console.error);
      return next;
    });
  }, [backend]);

  // ── Navigation Items ──────────────────────────────────────────────────────────

  const updateNavigationItems = useCallback((items: NavigationItem[]) => {
    setNavigationItemsState(items);
    backend.saveNavigationItems(items).catch(console.error);
  }, [backend]);

  // ── Media Items (local only — not persisted to backend) ───────────────────────

  const addMediaItem = useCallback((item: Omit<MediaItem, 'id'>) => {
    const newItem = { ...item, id: generateId() };
    setMediaItemsState(prev => [...prev, newItem]);
  }, []);

  const deleteMediaItem = useCallback((id: string) => {
    setMediaItemsState(prev => prev.filter(m => m.id !== id));
  }, []);

  const updateMediaItem = useCallback((id: string, item: Partial<MediaItem>) => {
    setMediaItemsState(prev => prev.map(m => m.id === id ? { ...m, ...item } : m));
  }, []);

  // ── Derived / Alias Values ────────────────────────────────────────────────────

  const homepageSettings: HomepageSettings = {
    heroArtistName: siteSettings.heroArtistName,
    heroTagline: siteSettings.heroTagline,
    heroImage: '/assets/generated/hero-bg.dim_1920x1080.png',
    artistIntro: siteSettings.heroIntroText,
  };

  const aboutPageContent: AboutPageContent = {
    bio: siteSettings.aboutBio,
    artistStatement: siteSettings.artistStatement,
    portraitImage: '/assets/generated/artist-portrait.dim_800x1000.png',
    careerMilestones,
    pressLinks: pressMentions,
  };

  const commissionsPageContent: CommissionsPageContent = {
    heroText: siteSettings.commissionHeroText,
    pricingText: siteSettings.commissionPricingText,
    processSteps,
    faqItems,
  };

  const updateHomepageSettings = useCallback((settings: Partial<HomepageSettings>) => {
    const patch: Partial<SiteSettings> = {};
    if (settings.heroArtistName !== undefined) patch.heroArtistName = settings.heroArtistName;
    if (settings.heroTagline !== undefined) patch.heroTagline = settings.heroTagline;
    if (settings.artistIntro !== undefined) patch.heroIntroText = settings.artistIntro;
    updateSiteSettings(patch);
  }, [updateSiteSettings]);

  const updateAboutPageContent = useCallback((content: Partial<AboutPageContent>) => {
    const patch: Partial<SiteSettings> = {};
    if (content.bio !== undefined) patch.aboutBio = content.bio;
    if (content.artistStatement !== undefined) patch.artistStatement = content.artistStatement;
    updateSiteSettings(patch);
    if (content.careerMilestones !== undefined) updateCareerMilestones(content.careerMilestones);
    if (content.pressLinks !== undefined) setPressMentions(content.pressLinks);
  }, [updateSiteSettings, updateCareerMilestones, setPressMentions]);

  const updateCommissionsPageContent = useCallback((content: Partial<CommissionsPageContent>) => {
    const patch: Partial<SiteSettings> = {};
    if (content.heroText !== undefined) patch.commissionHeroText = content.heroText;
    if (content.pricingText !== undefined) patch.commissionPricingText = content.pricingText;
    updateSiteSettings(patch);
    if (content.processSteps !== undefined) updateProcessSteps(content.processSteps);
    if (content.faqItems !== undefined) updateFAQItems(content.faqItems);
  }, [updateSiteSettings, updateProcessSteps, updateFAQItems]);

  // ── Context Value ─────────────────────────────────────────────────────────────

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
    navItems: navigationItems,
    mediaItems,
    mediaLibrary: mediaItems,
    homepageSettings,
    aboutPageContent,
    commissionsPageContent,
    isLoading,
    syncError,
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
    updateContactInquiryStatus,
    addNotification,
    updateNotificationStatus,
    deleteNotification,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addFAQItem,
    updateFAQItem,
    deleteFAQItem,
    updateFAQItems,
    addProcessStep,
    updateProcessStep,
    deleteProcessStep,
    updateProcessSteps,
    addCareerMilestone,
    updateCareerMilestone,
    deleteCareerMilestone,
    updateCareerMilestones,
    updateSiteSettings,
    updateNavigationItems,
    addMediaItem,
    deleteMediaItem,
    updateMediaItem,
    updateHomepageSettings,
    updateAboutPageContent,
    updateCommissionsPageContent,
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useCMSBackend } from '../hooks/useCMSBackend';

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

const defaultSiteSettings: SiteSettings = {
  siteTitle: 'Marina Vasquez Fine Art',
  siteTagline: 'Contemporary Oil Paintings & Commissions',
  socialPlatforms: [
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Pinterest', url: 'https://pinterest.com', icon: 'pinterest' },
  ],
  seoSettings: [
    { page: 'home', title: 'Marina Vasquez Fine Art', description: 'Contemporary oil paintings and custom commissions by Marina Vasquez', keywords: 'oil painting, fine art, commissions, contemporary art' },
    { page: 'gallery', title: 'Gallery | Marina Vasquez', description: 'Browse the complete collection of original oil paintings', keywords: 'gallery, oil paintings, original art' },
    { page: 'about', title: 'About | Marina Vasquez', description: 'Learn about Marina Vasquez and her artistic journey', keywords: 'artist, biography, fine art' },
    { page: 'commissions', title: 'Commissions | Marina Vasquez', description: 'Commission a custom oil painting from Marina Vasquez', keywords: 'custom painting, commission, oil painting' },
    { page: 'contact', title: 'Contact | Marina Vasquez', description: 'Get in touch with Marina Vasquez', keywords: 'contact, inquiries' },
    { page: 'testimonials', title: 'Testimonials | Marina Vasquez', description: 'What collectors say about Marina Vasquez\'s work', keywords: 'testimonials, reviews, collectors' },
  ],
  googleAnalyticsId: '',
  newsletterPlaceholder: 'Enter your email for studio updates',
  aboutBio: 'Marina Vasquez is a contemporary oil painter based in Ocean View, Hawaii, known for her luminous seascapes and intimate portraits that capture the interplay of light and emotion.',
  artistStatement: 'My work explores the boundary between the seen and felt — the way light transforms ordinary moments into something transcendent.',
  heroArtistName: 'Marina Vasquez',
  heroTagline: 'Oil Paintings that Breathe',
  heroIntroText: 'Welcome to my studio. I create original oil paintings and accept commissions for collectors who want something truly personal.',
  commissionHeroText: 'Every commission is a collaboration. I work closely with each collector to create a painting that speaks to their unique vision and space.',
  commissionPricingText: 'Pricing is based on size, complexity, and timeline. Most commissions range from $800 to $8,000. Rush orders may incur additional fees.',
};

const defaultNavigationItems: NavigationItem[] = [
  { id: '1', name: 'Home', path: '/', order: 1 },
  { id: '2', name: 'Gallery', path: '/gallery', order: 2 },
  { id: '3', name: 'About', path: '/about', order: 3 },
  { id: '4', name: 'Commissions', path: '/commissions', order: 4 },
  { id: '5', name: 'Testimonials', path: '/testimonials', order: 5 },
  { id: '6', name: 'Contact', path: '/contact', order: 6 },
];

const defaultArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Golden Hour at Waimea',
    year: 2023,
    medium: 'Oil on Canvas',
    size: '24" × 36"',
    location: 'Private Collection, Honolulu',
    description: 'A luminous study of the late afternoon light over Waimea Bay, capturing the moment when the sky turns to molten gold.',
    category: 'Seascape',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: false,
    featured: true,
    visible: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Tide Pool Reverie',
    year: 2023,
    medium: 'Oil on Linen',
    size: '18" × 24"',
    location: 'Available',
    description: 'Intimate details of a North Shore tide pool, where miniature worlds reflect the vast ocean beyond.',
    category: 'Seascape',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: true,
    featured: true,
    visible: true,
    order: 2,
  },
  {
    id: '3',
    title: 'Portrait of Leilani',
    year: 2022,
    medium: 'Oil on Canvas',
    size: '20" × 24"',
    location: 'Private Collection',
    description: 'A commissioned portrait capturing the quiet strength and warmth of a beloved grandmother.',
    category: 'Portrait',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: false,
    featured: true,
    visible: true,
    order: 3,
  },
  {
    id: '4',
    title: 'Plumeria Study No. 7',
    year: 2022,
    medium: 'Oil on Panel',
    size: '12" × 12"',
    location: 'Available',
    description: 'One in a series of intimate floral studies exploring the geometry of tropical blooms.',
    category: 'Botanical',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: true,
    featured: false,
    visible: true,
    order: 4,
  },
  {
    id: '5',
    title: 'Mauna Kea at Dawn',
    year: 2021,
    medium: 'Oil on Canvas',
    size: '30" × 40"',
    location: 'Honolulu Museum of Art (on loan)',
    description: 'The sacred mountain emerging from cloud cover at first light, painted during a residency on the Big Island.',
    category: 'Landscape',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: false,
    featured: true,
    visible: true,
    order: 5,
  },
  {
    id: '6',
    title: 'Still Life with Mangoes',
    year: 2021,
    medium: 'Oil on Linen',
    size: '16" × 20"',
    location: 'Available',
    description: 'A classic still life arrangement celebrating the colors and textures of Hawaiian tropical fruit.',
    category: 'Still Life',
    image: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: [],
    available: true,
    featured: false,
    visible: true,
    order: 6,
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Marina captured something in the portrait that I had never seen in a photograph — the way my mother\'s eyes hold both joy and wisdom simultaneously. It\'s the most treasured thing in our home.',
    name: 'Sarah K.',
    location: 'Honolulu, HI',
    role: 'Portrait Commission Client',
  },
  {
    id: '2',
    quote: 'The seascape she painted for our living room transforms the entire space. Every time I look at it, I feel the salt air and hear the waves. Extraordinary talent.',
    name: 'James & Patricia M.',
    location: 'San Francisco, CA',
    role: 'Collectors',
  },
  {
    id: '3',
    quote: 'Working with Marina on our commission was a joy from start to finish. She listened deeply, communicated throughout the process, and delivered something beyond what we imagined.',
    name: 'David L.',
    location: 'New York, NY',
    role: 'Commission Client',
  },
  {
    id: '4',
    quote: 'I\'ve collected art for thirty years and Marina\'s work stands apart. There\'s a quality of light in her paintings that I\'ve rarely seen — it seems to come from within the canvas itself.',
    name: 'Eleanor R.',
    location: 'Chicago, IL',
    role: 'Art Collector',
  },
];

const defaultPressMentions: PressMention[] = [
  {
    id: '1',
    publication: 'Honolulu Magazine',
    date: '2023-09',
    headline: 'Ten Artists Redefining Hawaiian Landscape Painting',
    url: '#',
    excerpt: 'Vasquez brings a classical European technique to distinctly Pacific subjects, creating work that feels both timeless and urgently local.',
  },
  {
    id: '2',
    publication: 'Art in America',
    date: '2022-11',
    headline: 'New Voices in Contemporary Realism',
    url: '#',
    excerpt: 'Among the emerging realists worth watching, Marina Vasquez stands out for her mastery of light and her ability to imbue familiar scenes with quiet drama.',
  },
  {
    id: '3',
    publication: 'Hawaii Tribune-Herald',
    date: '2023-03',
    headline: 'Local Artist\'s Work Acquired by Honolulu Museum',
    url: '#',
    excerpt: 'The museum\'s acquisition of "Mauna Kea at Dawn" marks a significant recognition of Vasquez\'s contribution to contemporary Hawaiian art.',
  },
];

const defaultCareerMilestones: CareerMilestone[] = [
  { id: '1', year: '2008', event: 'BFA in Painting, Rhode Island School of Design' },
  { id: '2', year: '2010', event: 'Moved to Hawaii; began painting Pacific landscapes' },
  { id: '3', year: '2013', event: 'First solo exhibition, Honolulu Arts District' },
  { id: '4', year: '2016', event: 'Artist residency, Maui Arts & Cultural Center' },
  { id: '5', year: '2019', event: 'Work acquired by Honolulu Museum of Art' },
  { id: '6', year: '2021', event: 'Featured in Art in America\'s "New Voices" issue' },
  { id: '7', year: '2023', event: 'Opened private studio in Ocean View, HI' },
];

const defaultFAQItems: FAQItem[] = [
  {
    id: '1',
    question: 'How long does a commission take?',
    answer: 'Most commissions take 6–12 weeks from deposit to delivery, depending on size and complexity. I\'ll give you a specific timeline estimate during our initial consultation.',
  },
  {
    id: '2',
    question: 'What information do you need to start?',
    answer: 'For portraits: high-resolution reference photos with good lighting. For landscapes or custom subjects: reference images, color preferences, and any specific elements you want included.',
  },
  {
    id: '3',
    question: 'Do you ship internationally?',
    answer: 'Yes. Paintings are professionally packed and shipped via fine art courier. International shipping costs vary by destination and are the client\'s responsibility.',
  },
  {
    id: '4',
    question: 'What is your payment structure?',
    answer: '50% deposit to begin, 50% upon completion before shipping. I accept bank transfer, check, or major credit cards.',
  },
  {
    id: '5',
    question: 'Can I see progress during the painting?',
    answer: 'Absolutely. I share progress photos at key stages and welcome feedback. Most clients find this part of the process deeply satisfying.',
  },
];

const defaultProcessSteps: ProcessStep[] = [
  { id: '1', stepNumber: 1, title: 'Initial Consultation', description: 'We discuss your vision, reference materials, size, and timeline. I\'ll ask questions to understand not just what you want, but why.' },
  { id: '2', stepNumber: 2, title: 'Proposal & Deposit', description: 'I send a detailed proposal with pricing and timeline. A 50% deposit secures your place in my commission queue.' },
  { id: '3', stepNumber: 3, title: 'Creation & Updates', description: 'I paint your piece and share progress photos at key stages. Your feedback is welcome throughout.' },
  { id: '4', stepNumber: 4, title: 'Delivery & Final Payment', description: 'Upon completion, I photograph the finished work and send for your approval. Final payment is due before shipping.' },
];

const defaultHomepageSettings: HomepageSettings = {
  heroArtistName: 'Marina Vasquez',
  heroTagline: 'Oil Paintings that Breathe',
  heroImage: '/assets/generated/hero-bg.dim_1920x1080.png',
  artistIntro: 'Welcome to my studio. I create original oil paintings and accept commissions for collectors who want something truly personal.',
};

const defaultAboutPageContent: AboutPageContent = {
  bio: 'Marina Vasquez is a contemporary oil painter based in Ocean View, Hawaii, known for her luminous seascapes and intimate portraits that capture the interplay of light and emotion. After earning her BFA from Rhode Island School of Design, she moved to Hawaii in 2010, where the Pacific light transformed her practice.',
  artistStatement: 'My work explores the boundary between the seen and felt — the way light transforms ordinary moments into something transcendent. I paint slowly, in layers, building up surfaces that reward close looking.',
  portraitImage: '/assets/generated/artist-portrait.dim_800x1000.png',
  careerMilestones: defaultCareerMilestones,
  pressLinks: defaultPressMentions,
};

const defaultCommissionsPageContent: CommissionsPageContent = {
  heroText: 'Every commission is a collaboration. I work closely with each collector to create a painting that speaks to their unique vision and space.',
  pricingText: 'Pricing is based on size, complexity, and timeline. Most commissions range from $800 to $8,000. Rush orders may incur additional fees.',
  processSteps: defaultProcessSteps,
  faqItems: defaultFAQItems,
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

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
  const [homepageSettings, setHomepageSettingsState] = useState<HomepageSettings>(defaultHomepageSettings);
  const [aboutPageContent, setAboutPageContentState] = useState<AboutPageContent>(defaultAboutPageContent);
  const [commissionsPageContent, setCommissionsPageContentState] = useState<CommissionsPageContent>(defaultCommissionsPageContent);
  const [isLoading, setIsLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Load all data from backend on mount
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
        if (data.navigationItems.length > 0) setNavigationItemsState(data.navigationItems);

        if (data.siteSettings) {
          setSiteSettingsState(data.siteSettings);
          setHomepageSettingsState(prev => ({
            ...prev,
            heroArtistName: data.siteSettings!.heroArtistName || prev.heroArtistName,
            heroTagline: data.siteSettings!.heroTagline || prev.heroTagline,
            artistIntro: data.siteSettings!.heroIntroText || prev.artistIntro,
          }));
          setAboutPageContentState(prev => ({
            ...prev,
            bio: data.siteSettings!.aboutBio || prev.bio,
            artistStatement: data.siteSettings!.artistStatement || prev.artistStatement,
          }));
          setCommissionsPageContentState(prev => ({
            ...prev,
            heroText: data.siteSettings!.commissionHeroText || prev.heroText,
            pricingText: data.siteSettings!.commissionPricingText || prev.pricingText,
          }));
        }
      } catch (err) {
        console.error('Failed to load CMS data from backend:', err);
        setSyncError('Failed to load data from backend');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  // Artwork operations
  const addArtwork = useCallback((artwork: Omit<Artwork, 'id'>) => {
    const newArtwork = { ...artwork, id: generateId() };
    setArtworksState(prev => {
      const updated = [...prev, newArtwork];
      backend.saveArtworks(updated).catch(() => setSyncError('Failed to save artworks'));
      return updated;
    });
  }, [backend]);

  const updateArtwork = useCallback((id: string, artwork: Partial<Artwork>) => {
    setArtworksState(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...artwork } : a);
      backend.saveArtworks(updated).catch(() => setSyncError('Failed to save artworks'));
      return updated;
    });
  }, [backend]);

  const deleteArtwork = useCallback((id: string) => {
    setArtworksState(prev => {
      const updated = prev.filter(a => a.id !== id);
      backend.saveArtworks(updated).catch(() => setSyncError('Failed to save artworks'));
      return updated;
    });
  }, [backend]);

  // Testimonial operations
  const addTestimonial = useCallback((testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial = { ...testimonial, id: generateId() };
    setTestimonialsState(prev => {
      const updated = [...prev, newTestimonial];
      backend.saveTestimonials(updated).catch(() => setSyncError('Failed to save testimonials'));
      return updated;
    });
  }, [backend]);

  const updateTestimonial = useCallback((id: string, testimonial: Partial<Testimonial>) => {
    setTestimonialsState(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, ...testimonial } : t);
      backend.saveTestimonials(updated).catch(() => setSyncError('Failed to save testimonials'));
      return updated;
    });
  }, [backend]);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonialsState(prev => {
      const updated = prev.filter(t => t.id !== id);
      backend.saveTestimonials(updated).catch(() => setSyncError('Failed to save testimonials'));
      return updated;
    });
  }, [backend]);

  const setTestimonials = useCallback((testimonials: Testimonial[]) => {
    setTestimonialsState(testimonials);
    backend.saveTestimonials(testimonials).catch(() => setSyncError('Failed to save testimonials'));
  }, [backend]);

  // Press mention operations
  const addPressMention = useCallback((mention: Omit<PressMention, 'id'>) => {
    const newMention = { ...mention, id: generateId() };
    setPressMentionsState(prev => {
      const updated = [...prev, newMention];
      backend.savePressMentions(updated).catch(() => setSyncError('Failed to save press mentions'));
      return updated;
    });
  }, [backend]);

  const updatePressMention = useCallback((id: string, mention: Partial<PressMention>) => {
    setPressMentionsState(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, ...mention } : m);
      backend.savePressMentions(updated).catch(() => setSyncError('Failed to save press mentions'));
      return updated;
    });
  }, [backend]);

  const deletePressMention = useCallback((id: string) => {
    setPressMentionsState(prev => {
      const updated = prev.filter(m => m.id !== id);
      backend.savePressMentions(updated).catch(() => setSyncError('Failed to save press mentions'));
      return updated;
    });
  }, [backend]);

  const setPressMentions = useCallback((mentions: PressMention[]) => {
    setPressMentionsState(mentions);
    backend.savePressMentions(mentions).catch(() => setSyncError('Failed to save press mentions'));
  }, [backend]);

  // Commission inquiry operations
  const addCommissionInquiry = useCallback((inquiry: Omit<CommissionInquiry, 'id' | 'status' | 'timestamp'>) => {
    const newInquiry: CommissionInquiry = {
      ...inquiry,
      id: generateId(),
      status: 'new',
      timestamp: Date.now(),
    };
    setCommissionInquiriesState(prev => {
      const updated = [...prev, newInquiry];
      backend.saveCommissionInquiries(updated).catch(() => setSyncError('Failed to save commission inquiries'));
      return updated;
    });
  }, [backend]);

  const updateCommissionInquiryStatus = useCallback((id: string, status: CommissionInquiry['status']) => {
    setCommissionInquiriesState(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, status } : i);
      backend.saveCommissionInquiries(updated).catch(() => setSyncError('Failed to save commission inquiries'));
      return updated;
    });
  }, [backend]);

  const updateCommissionInquiry = useCallback((id: string, updates: Partial<CommissionInquiry>) => {
    setCommissionInquiriesState(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, ...updates } : i);
      backend.saveCommissionInquiries(updated).catch(() => setSyncError('Failed to save commission inquiries'));
      return updated;
    });
  }, [backend]);

  // Contact inquiry operations
  const addContactInquiry = useCallback((inquiry: Omit<ContactInquiry, 'id' | 'status' | 'timestamp'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: generateId(),
      status: 'unread',
      timestamp: Date.now(),
    };
    setContactInquiriesState(prev => {
      const updated = [...prev, newInquiry];
      backend.saveContactInquiries(updated).catch(() => setSyncError('Failed to save contact inquiries'));
      return updated;
    });
  }, [backend]);

  const updateContactInquiryStatus = useCallback((id: string, status: ContactInquiry['status']) => {
    setContactInquiriesState(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, status } : i);
      backend.saveContactInquiries(updated).catch(() => setSyncError('Failed to save contact inquiries'));
      return updated;
    });
  }, [backend]);

  // Notification operations
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'status'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      timestamp: Date.now(),
      status: 'unread',
    };
    setNotificationsState(prev => {
      const updated = [...prev, newNotification];
      backend.saveNotifications(updated).catch(() => setSyncError('Failed to save notifications'));
      return updated;
    });
  }, [backend]);

  const updateNotificationStatus = useCallback((id: string, status: Notification['status']) => {
    setNotificationsState(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, status } : n);
      backend.saveNotifications(updated).catch(() => setSyncError('Failed to save notifications'));
      return updated;
    });
  }, [backend]);

  const deleteNotification = useCallback((id: string) => {
    setNotificationsState(prev => {
      const updated = prev.filter(n => n.id !== id);
      backend.saveNotifications(updated).catch(() => setSyncError('Failed to save notifications'));
      return updated;
    });
  }, [backend]);

  // Blog post operations
  const addBlogPost = useCallback((post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: generateId() };
    setBlogPostsState(prev => {
      const updated = [...prev, newPost];
      backend.saveBlogPosts(updated).catch(() => setSyncError('Failed to save blog posts'));
      return updated;
    });
  }, [backend]);

  const updateBlogPost = useCallback((id: string, post: Partial<BlogPost>) => {
    setBlogPostsState(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...post } : p);
      backend.saveBlogPosts(updated).catch(() => setSyncError('Failed to save blog posts'));
      return updated;
    });
  }, [backend]);

  const deleteBlogPost = useCallback((id: string) => {
    setBlogPostsState(prev => {
      const updated = prev.filter(p => p.id !== id);
      backend.saveBlogPosts(updated).catch(() => setSyncError('Failed to save blog posts'));
      return updated;
    });
  }, [backend]);

  // FAQ operations
  const addFAQItem = useCallback((item: Omit<FAQItem, 'id'>) => {
    const newItem = { ...item, id: generateId() };
    setFAQItemsState(prev => {
      const updated = [...prev, newItem];
      backend.saveFAQItems(updated).catch(() => setSyncError('Failed to save FAQ items'));
      return updated;
    });
  }, [backend]);

  const updateFAQItem = useCallback((id: string, item: Partial<FAQItem>) => {
    setFAQItemsState(prev => {
      const updated = prev.map(f => f.id === id ? { ...f, ...item } : f);
      backend.saveFAQItems(updated).catch(() => setSyncError('Failed to save FAQ items'));
      return updated;
    });
  }, [backend]);

  const deleteFAQItem = useCallback((id: string) => {
    setFAQItemsState(prev => {
      const updated = prev.filter(f => f.id !== id);
      backend.saveFAQItems(updated).catch(() => setSyncError('Failed to save FAQ items'));
      return updated;
    });
  }, [backend]);

  const updateFAQItems = useCallback((items: FAQItem[]) => {
    setFAQItemsState(items);
    backend.saveFAQItems(items).catch(() => setSyncError('Failed to save FAQ items'));
  }, [backend]);

  // Process step operations
  const addProcessStep = useCallback((step: Omit<ProcessStep, 'id'>) => {
    const newStep = { ...step, id: generateId() };
    setProcessStepsState(prev => {
      const updated = [...prev, newStep];
      backend.saveProcessSteps(updated).catch(() => setSyncError('Failed to save process steps'));
      return updated;
    });
  }, [backend]);

  const updateProcessStep = useCallback((id: string, step: Partial<ProcessStep>) => {
    setProcessStepsState(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...step } : s);
      backend.saveProcessSteps(updated).catch(() => setSyncError('Failed to save process steps'));
      return updated;
    });
  }, [backend]);

  const deleteProcessStep = useCallback((id: string) => {
    setProcessStepsState(prev => {
      const updated = prev.filter(s => s.id !== id);
      backend.saveProcessSteps(updated).catch(() => setSyncError('Failed to save process steps'));
      return updated;
    });
  }, [backend]);

  const updateProcessSteps = useCallback((steps: ProcessStep[]) => {
    setProcessStepsState(steps);
    backend.saveProcessSteps(steps).catch(() => setSyncError('Failed to save process steps'));
  }, [backend]);

  // Career milestone operations
  const addCareerMilestone = useCallback((milestone: Omit<CareerMilestone, 'id'>) => {
    const newMilestone = { ...milestone, id: generateId() };
    setCareerMilestonesState(prev => {
      const updated = [...prev, newMilestone];
      backend.saveCareerMilestones(updated).catch(() => setSyncError('Failed to save career milestones'));
      return updated;
    });
  }, [backend]);

  const updateCareerMilestone = useCallback((id: string, milestone: Partial<CareerMilestone>) => {
    setCareerMilestonesState(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, ...milestone } : m);
      backend.saveCareerMilestones(updated).catch(() => setSyncError('Failed to save career milestones'));
      return updated;
    });
  }, [backend]);

  const deleteCareerMilestone = useCallback((id: string) => {
    setCareerMilestonesState(prev => {
      const updated = prev.filter(m => m.id !== id);
      backend.saveCareerMilestones(updated).catch(() => setSyncError('Failed to save career milestones'));
      return updated;
    });
  }, [backend]);

  const updateCareerMilestones = useCallback((milestones: CareerMilestone[]) => {
    setCareerMilestonesState(milestones);
    backend.saveCareerMilestones(milestones).catch(() => setSyncError('Failed to save career milestones'));
  }, [backend]);

  // Site settings operations
  const updateSiteSettings = useCallback((settings: Partial<SiteSettings>) => {
    setSiteSettingsState(prev => {
      const updated = { ...prev, ...settings };
      backend.saveSiteSettings(updated).catch(() => setSyncError('Failed to save site settings'));
      return updated;
    });
  }, [backend]);

  // Navigation operations
  const updateNavigationItems = useCallback((items: NavigationItem[]) => {
    setNavigationItemsState(items);
    backend.saveNavigationItems(items).catch(() => setSyncError('Failed to save navigation items'));
  }, [backend]);

  // Media operations
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

  // Homepage settings
  const updateHomepageSettings = useCallback((settings: Partial<HomepageSettings>) => {
    setHomepageSettingsState(prev => {
      const updated = { ...prev, ...settings };
      setSiteSettingsState(prevSite => {
        const updatedSite = {
          ...prevSite,
          heroArtistName: updated.heroArtistName,
          heroTagline: updated.heroTagline,
          heroIntroText: updated.artistIntro,
        };
        backend.saveSiteSettings(updatedSite).catch(() => setSyncError('Failed to save site settings'));
        return updatedSite;
      });
      return updated;
    });
  }, [backend]);

  // About page content
  const updateAboutPageContent = useCallback((content: Partial<AboutPageContent>) => {
    setAboutPageContentState(prev => {
      const updated = { ...prev, ...content };
      if (content.careerMilestones) {
        setCareerMilestonesState(content.careerMilestones);
        backend.saveCareerMilestones(content.careerMilestones).catch(() => setSyncError('Failed to save career milestones'));
      }
      if (content.pressLinks) {
        setPressMentionsState(content.pressLinks);
        backend.savePressMentions(content.pressLinks).catch(() => setSyncError('Failed to save press mentions'));
      }
      setSiteSettingsState(prevSite => {
        const updatedSite = {
          ...prevSite,
          aboutBio: updated.bio,
          artistStatement: updated.artistStatement,
        };
        backend.saveSiteSettings(updatedSite).catch(() => setSyncError('Failed to save site settings'));
        return updatedSite;
      });
      return updated;
    });
  }, [backend]);

  // Commissions page content
  const updateCommissionsPageContent = useCallback((content: Partial<CommissionsPageContent>) => {
    setCommissionsPageContentState(prev => {
      const updated = { ...prev, ...content };
      if (content.processSteps) {
        setProcessStepsState(content.processSteps);
        backend.saveProcessSteps(content.processSteps).catch(() => setSyncError('Failed to save process steps'));
      }
      if (content.faqItems) {
        setFAQItemsState(content.faqItems);
        backend.saveFAQItems(content.faqItems).catch(() => setSyncError('Failed to save FAQ items'));
      }
      setSiteSettingsState(prevSite => {
        const updatedSite = {
          ...prevSite,
          commissionHeroText: updated.heroText,
          commissionPricingText: updated.pricingText,
        };
        backend.saveSiteSettings(updatedSite).catch(() => setSyncError('Failed to save site settings'));
        return updatedSite;
      });
      return updated;
    });
  }, [backend]);

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

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}

export default CMSContext;

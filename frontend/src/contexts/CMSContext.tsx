import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  path: string;
}

export interface Artwork {
  id: string;
  title: string;
  medium: string;
  dimensions: string;
  size: string;
  year: number;
  price: number;
  available: boolean;
  availability: 'Available' | 'Sold' | 'Reserved';
  featured: boolean;
  visible: boolean;
  category: string;
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  location: string;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  publishDate: string;
  status: 'draft' | 'published';
}

export interface CommissionInquiry {
  id: string;
  name: string;
  email: string;
  projectDescription: string;
  projectType: string;
  budgetRange: string;
  budget: string;
  timeline: string;
  description: string;
  status: 'unread' | 'read' | 'responded';
  submittedAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'responded';
  submittedAt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  role?: string;
  rating?: number;
}

export interface PressMention {
  id: string;
  publication: string;
  date: string;
  headline: string;
  excerpt: string;
  url: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  event: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingTier {
  id: string;
  name: string;
  priceRange: string;
  description: string;
  features: string[];
}

export interface SiteSettings {
  siteTitle: string;
  siteTagline: string;
  socialInstagram: string;
  socialFacebook: string;
  socialPinterest: string;
  googleAnalyticsId: string;
  newsletterIntegration: string;
  seo: {
    home: { title: string; description: string };
    about: { title: string; description: string };
    gallery: { title: string; description: string };
    commissions: { title: string; description: string };
    contact: { title: string; description: string };
    testimonials: { title: string; description: string };
  };
}

export interface HomepageSettings {
  heroArtistName: string;
  heroTagline: string;
  heroImage: string;
  artistIntro: string;
}

export interface AboutPageContent {
  biography: string;
  artistStatement: string;
  portraitImage: string;
  milestones: TimelineMilestone[];
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
  url: string;
  filename: string;
  width: number;
  height: number;
  tags: string[];
  usedIn: string[];
  uploadedAt: string;
}

interface CMSContextType {
  navItems: NavItem[];
  setNavItems: (items: NavItem[]) => void;
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  addArtwork: (artwork: Artwork) => void;
  updateArtwork: (id: string, updates: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
  blogPosts: BlogPost[];
  setBlogPosts: (posts: BlogPost[]) => void;
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  commissionInquiries: CommissionInquiry[];
  addCommissionInquiry: (inquiry: CommissionInquiry) => void;
  updateCommissionInquiry: (id: string, updates: Partial<CommissionInquiry>) => void;
  contactInquiries: ContactInquiry[];
  addContactInquiry: (inquiry: ContactInquiry) => void;
  updateContactInquiry: (inquiry: ContactInquiry) => void;
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
  pressMentions: PressMention[];
  setPressMentions: (mentions: PressMention[]) => void;
  siteSettings: SiteSettings;
  setSiteSettings: (settings: SiteSettings) => void;
  homepageSettings: HomepageSettings;
  setHomepageSettings: (settings: HomepageSettings) => void;
  aboutPageContent: AboutPageContent;
  setAboutPageContent: (content: AboutPageContent) => void;
  commissionsPageContent: CommissionsPageContent;
  setCommissionsPageContent: (content: CommissionsPageContent) => void;
  mediaLibrary: MediaItem[];
  addMediaItem: (item: MediaItem) => void;
  deleteMediaItem: (id: string) => void;
  updateMediaItem: (id: string, updates: Partial<MediaItem>) => void;
}

const defaultNavItems: NavItem[] = [
  { id: '1', label: 'Gallery', path: '/gallery' },
  { id: '2', label: 'About', path: '/about' },
  { id: '3', label: 'Commissions', path: '/commissions' },
  { id: '4', label: 'Testimonials', path: '/testimonials' },
  { id: '5', label: 'Contact', path: '/contact' },
];

const defaultArtworks: Artwork[] = [
  {
    id: '1', title: 'Ocean Reverie', medium: 'Oil on Canvas', dimensions: '36" × 48"', size: '36" × 48"',
    year: 2023, price: 4800, available: true, availability: 'Available', featured: true, visible: true,
    category: 'Seascape', imageUrl: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: ['/assets/generated/artwork-placeholder.dim_600x480.png', '/assets/generated/artwork-placeholder.dim_600x480.png'],
    description: 'A sweeping seascape capturing the interplay of light and water at dusk.', location: 'Ocean View, HI', order: 1,
  },
  {
    id: '2', title: 'Volcanic Bloom', medium: 'Acrylic on Board', dimensions: '24" × 30"', size: '24" × 30"',
    year: 2023, price: 2600, available: false, availability: 'Sold', featured: true, visible: true,
    category: 'Abstract', imageUrl: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: ['/assets/generated/artwork-placeholder.dim_600x480.png', '/assets/generated/artwork-placeholder.dim_600x480.png'],
    description: 'Bold volcanic forms emerge from layers of rich acrylic pigment.', location: 'Private Collection', order: 2,
  },
  {
    id: '3', title: 'Tide Pool Meditation', medium: 'Watercolor', dimensions: '18" × 24"', size: '18" × 24"',
    year: 2022, price: 1400, available: true, availability: 'Available', featured: false, visible: true,
    category: 'Seascape', imageUrl: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: ['/assets/generated/artwork-placeholder.dim_600x480.png', '/assets/generated/artwork-placeholder.dim_600x480.png'],
    description: 'Delicate watercolor study of a Hawaiian tide pool teeming with life.', location: 'Ocean View, HI', order: 3,
  },
  {
    id: '4', title: 'Lava Flow at Midnight', medium: 'Oil on Canvas', dimensions: '48" × 60"', size: '48" × 60"',
    year: 2022, price: 7200, available: true, availability: 'Available', featured: true, visible: true,
    category: 'Landscape', imageUrl: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: ['/assets/generated/artwork-placeholder.dim_600x480.png', '/assets/generated/artwork-placeholder.dim_600x480.png'],
    description: 'Dramatic nocturnal scene of molten lava meeting the Pacific Ocean.', location: 'Ocean View, HI', order: 4,
  },
  {
    id: '5', title: 'Plumeria Morning', medium: 'Pastel', dimensions: '12" × 16"', size: '12" × 16"',
    year: 2023, price: 950, available: true, availability: 'Available', featured: false, visible: true,
    category: 'Botanical', imageUrl: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: ['/assets/generated/artwork-placeholder.dim_600x480.png', '/assets/generated/artwork-placeholder.dim_600x480.png'],
    description: 'Soft pastel rendering of plumeria blossoms in early morning light.', location: 'Ocean View, HI', order: 5,
  },
  {
    id: '6', title: 'Reef Abstraction', medium: 'Mixed Media', dimensions: '30" × 40"', size: '30" × 40"',
    year: 2021, price: 3400, available: false, availability: 'Sold', featured: false, visible: true,
    category: 'Abstract', imageUrl: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: ['/assets/generated/artwork-placeholder.dim_600x480.png', '/assets/generated/artwork-placeholder.dim_600x480.png'],
    description: 'Mixed media exploration of coral reef textures and underwater light.', location: 'Private Collection', order: 6,
  },
  {
    id: '7', title: 'Mauna Kea Dusk', medium: 'Oil on Canvas', dimensions: '40" × 50"', size: '40" × 50"',
    year: 2021, price: 5600, available: true, availability: 'Available', featured: false, visible: true,
    category: 'Landscape', imageUrl: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: ['/assets/generated/artwork-placeholder.dim_600x480.png', '/assets/generated/artwork-placeholder.dim_600x480.png'],
    description: 'The summit of Mauna Kea bathed in the golden hues of a Pacific sunset.', location: 'Ocean View, HI', order: 7,
  },
  {
    id: '8', title: 'Hula in the Rain', medium: 'Acrylic on Canvas', dimensions: '20" × 28"', size: '20" × 28"',
    year: 2020, price: 2100, available: true, availability: 'Available', featured: false, visible: true,
    category: 'Figurative', imageUrl: '/assets/generated/artwork-placeholder.dim_600x480.png',
    additionalImages: ['/assets/generated/artwork-placeholder.dim_600x480.png', '/assets/generated/artwork-placeholder.dim_600x480.png'],
    description: 'A graceful hula dancer captured mid-movement in a tropical rain shower.', location: 'Ocean View, HI', order: 8,
  },
];

const defaultTestimonials: Testimonial[] = [
  { id: '1', quote: "Malia created the most breathtaking seascape for our living room. The colors perfectly capture the view from our lanai. We couldn't be happier.", name: 'Sarah & Tom Mitchell', location: 'Honolulu, HI', role: 'Collectors', rating: 5 },
  { id: '2', quote: "Working with Malia was an absolute pleasure. She listened carefully to my vision and delivered something even more beautiful than I imagined.", name: 'James Nakamura', location: 'Maui, HI', role: 'Collector', rating: 5 },
  { id: '3', quote: "We commissioned a large triptych for our hotel lobby. Malia's work has become the centerpiece of our space and guests constantly comment on it.", name: 'The Kahananui Family', location: 'Kailua, HI', role: 'Hotel Owners', rating: 5 },
  { id: '4', quote: "I purchased three pieces from Malia's gallery show and they transformed my home office. Her use of light is simply extraordinary.", name: 'Dr. Patricia Lowe', location: 'San Francisco, CA', role: 'Collector', rating: 5 },
];

const defaultPressMentions: PressMention[] = [
  { id: '1', publication: 'Honolulu Magazine', date: '2023-09-01', headline: 'Rising Stars of Hawaiian Art', excerpt: "Malia Fonoti's luminous seascapes have captured the attention of collectors across the Pacific...", url: '#' },
  { id: '2', publication: 'Pacific Arts Quarterly', date: '2023-05-15', headline: 'The New Wave of Island Painters', excerpt: 'Among the most exciting voices in contemporary Hawaiian art, Fonoti stands out for her...', url: '#' },
  { id: '3', publication: 'Maui Time', date: '2022-11-20', headline: 'Local Artist Makes Waves at Lahaina Gallery', excerpt: "A sold-out opening night marked the debut of Malia Fonoti's latest collection...", url: '#' },
];

const defaultSiteSettings: SiteSettings = {
  siteTitle: 'Malia Fonoti Fine Art',
  siteTagline: 'Original Hawaiian Art & Custom Commissions',
  socialInstagram: 'https://instagram.com',
  socialFacebook: 'https://facebook.com',
  socialPinterest: 'https://pinterest.com',
  googleAnalyticsId: '',
  newsletterIntegration: '',
  seo: {
    home: { title: 'Malia Fonoti Fine Art | Original Hawaiian Art', description: 'Discover original Hawaiian art by Malia Fonoti — seascapes, landscapes, and custom commissions from Ocean View, Hawaii.' },
    about: { title: 'About Malia Fonoti | Hawaiian Artist', description: "Learn about Malia Fonoti's journey as a Hawaiian artist, her techniques, and her deep connection to the islands." },
    gallery: { title: 'Gallery | Malia Fonoti Fine Art', description: 'Browse original paintings and prints by Malia Fonoti. Seascapes, landscapes, botanicals, and abstract works.' },
    commissions: { title: 'Custom Commissions | Malia Fonoti Fine Art', description: 'Commission a one-of-a-kind original painting by Malia Fonoti. Custom artwork for homes, businesses, and gifts.' },
    contact: { title: 'Contact | Malia Fonoti Fine Art', description: 'Get in touch with Malia Fonoti for inquiries, commissions, or gallery information.' },
    testimonials: { title: 'Testimonials | Malia Fonoti Fine Art', description: 'Read what collectors and clients say about working with Malia Fonoti.' },
  },
};

const defaultHomepageSettings: HomepageSettings = {
  heroArtistName: 'Malia Fonoti',
  heroTagline: "Capturing the Soul of Hawaiʻi",
  heroImage: '/assets/generated/hero-bg.dim_1920x1080.png',
  artistIntro: 'Original paintings inspired by the volcanic landscapes, ocean depths, and vibrant flora of the Hawaiian Islands.',
};

const defaultAboutPageContent: AboutPageContent = {
  biography: "Born and raised on the Big Island of Hawaiʻi, Malia Fonoti has spent over two decades translating the raw beauty of the islands onto canvas. Her work is held in private collections across the United States, Japan, and Australia.",
  artistStatement: "I paint because the islands demand it. Every sunrise over Mauna Kea, every wave that crashes against the black sand, every plumeria blossom — they all carry stories that I feel compelled to share. My work is an act of gratitude.",
  portraitImage: '/assets/generated/artist-portrait.dim_800x1000.png',
  milestones: [
    { id: '1', year: '2001', event: 'Graduated from University of Hawaiʻi with BFA in Studio Art' },
    { id: '2', year: '2004', event: 'First solo exhibition at Volcano Art Center' },
    { id: '3', year: '2008', event: 'Artist residency at Hui Noʻeau Visual Arts Center, Maui' },
    { id: '4', year: '2012', event: 'Featured in Pacific Arts Quarterly annual showcase' },
    { id: '5', year: '2016', event: 'Commissioned for Honolulu International Airport public art installation' },
    { id: '6', year: '2019', event: 'Retrospective exhibition at Honolulu Museum of Art' },
    { id: '7', year: '2022', event: 'Launched online gallery and commission program' },
  ],
  pressLinks: defaultPressMentions,
};

const defaultCommissionsPageContent: CommissionsPageContent = {
  heroText: 'Work directly with Malia to create a one-of-a-kind original artwork tailored to your vision and space.',
  pricingText: 'Commissions are priced based on size, medium, and complexity. Small works start at $800, medium works from $1,500, and large-scale pieces from $4,000. A 50% deposit is required to begin.',
  processSteps: [
    { id: '1', stepNumber: 1, title: 'Initial Consultation', description: 'Share your vision, preferred size, color palette, and any reference images. We\'ll discuss the scope and timeline.' },
    { id: '2', stepNumber: 2, title: 'Concept & Deposit', description: 'Malia creates preliminary sketches for your approval. A 50% deposit secures your commission slot.' },
    { id: '3', stepNumber: 3, title: 'Creation', description: 'Watch your painting come to life with progress updates at key milestones throughout the process.' },
    { id: '4', stepNumber: 4, title: 'Delivery', description: 'Final approval, remaining balance, and careful packaging for safe delivery to your door.' },
  ],
  faqItems: [
    { id: '1', question: 'How long does a commission take?', answer: 'Timelines vary by size and complexity. Small works typically take 2–3 weeks, medium works 4–6 weeks, and large works 8–12 weeks.' },
    { id: '2', question: 'Do you ship internationally?', answer: 'Yes! Malia ships worldwide. Paintings are carefully rolled or crated depending on size, and fully insured during transit.' },
    { id: '3', question: 'Can I request a specific Hawaiian location?', answer: 'Absolutely. Many clients commission paintings of places meaningful to them — a favorite beach, a family property, or a memorable view.' },
    { id: '4', question: 'What is your revision policy?', answer: 'One round of minor revisions is included. Major compositional changes after work has begun may incur additional fees.' },
  ],
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems);
  const [artworks, setArtworks] = useState<Artwork[]>(defaultArtworks);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [commissionInquiries, setCommissionInquiries] = useState<CommissionInquiry[]>([]);
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [pressMentions, setPressMentions] = useState<PressMention[]>(defaultPressMentions);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>(defaultHomepageSettings);
  const [aboutPageContent, setAboutPageContent] = useState<AboutPageContent>(defaultAboutPageContent);
  const [commissionsPageContent, setCommissionsPageContent] = useState<CommissionsPageContent>(defaultCommissionsPageContent);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);

  const addArtwork = (artwork: Artwork) => setArtworks(prev => [...prev, artwork]);
  const updateArtwork = (id: string, updates: Partial<Artwork>) =>
    setArtworks(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  const deleteArtwork = (id: string) => setArtworks(prev => prev.filter(a => a.id !== id));

  const addBlogPost = (post: BlogPost) => setBlogPosts(prev => [...prev, post]);
  const updateBlogPost = (id: string, updates: Partial<BlogPost>) =>
    setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  const deleteBlogPost = (id: string) => setBlogPosts(prev => prev.filter(p => p.id !== id));

  const addCommissionInquiry = (inquiry: CommissionInquiry) =>
    setCommissionInquiries(prev => [...prev, inquiry]);
  const updateCommissionInquiry = (id: string, updates: Partial<CommissionInquiry>) =>
    setCommissionInquiries(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));

  const addContactInquiry = (inquiry: ContactInquiry) =>
    setContactInquiries(prev => [...prev, inquiry]);
  const updateContactInquiry = (inquiry: ContactInquiry) =>
    setContactInquiries(prev => prev.map(i => i.id === inquiry.id ? inquiry : i));

  const addMediaItem = (item: MediaItem) => setMediaLibrary(prev => [...prev, item]);
  const deleteMediaItem = (id: string) => setMediaLibrary(prev => prev.filter(m => m.id !== id));
  const updateMediaItem = (id: string, updates: Partial<MediaItem>) =>
    setMediaLibrary(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));

  return (
    <CMSContext.Provider value={{
      navItems, setNavItems,
      artworks, setArtworks, addArtwork, updateArtwork, deleteArtwork,
      blogPosts, setBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
      commissionInquiries, addCommissionInquiry, updateCommissionInquiry,
      contactInquiries, addContactInquiry, updateContactInquiry,
      testimonials, setTestimonials,
      pressMentions, setPressMentions,
      siteSettings, setSiteSettings,
      homepageSettings, setHomepageSettings,
      aboutPageContent, setAboutPageContent,
      commissionsPageContent, setCommissionsPageContent,
      mediaLibrary, addMediaItem, deleteMediaItem, updateMediaItem,
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within CMSProvider');
  return context;
}

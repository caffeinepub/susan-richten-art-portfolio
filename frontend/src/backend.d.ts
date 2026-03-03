import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface NavigationItem {
    id: bigint;
    order: bigint;
    name: string;
    path: string;
}
export interface BlogPost {
    id: bigint;
    status: string;
    title: string;
    content: string;
    publishDate: Time;
    slug: string;
}
export interface Testimonial {
    id: bigint;
    name: string;
    role: string;
    quote: string;
    location: string;
}
export type Time = bigint;
export interface SEOSettings {
    title: string;
    page: string;
    description: string;
    keywords: string;
}
export interface PressMention {
    id: bigint;
    url: string;
    date: string;
    headline: string;
    excerpt: string;
    publication: string;
}
export interface SiteSettings {
    siteTitle: string;
    commissionPricingText: string;
    newsletterPlaceholder: string;
    heroIntroText: string;
    socialPlatforms: Array<SocialPlatform>;
    heroArtistName: string;
    googleAnalyticsId: string;
    seoSettings: Array<SEOSettings>;
    artistStatement: string;
    aboutBio: string;
    siteTagline: string;
    commissionHeroText: string;
    heroTagline: string;
}
export interface Artwork {
    id: bigint;
    title: string;
    featured: boolean;
    order: bigint;
    size: string;
    year: bigint;
    description: string;
    additionalImages: Array<string>;
    available: boolean;
    visible: boolean;
    category: string;
    image: string;
    location: string;
    medium: string;
}
export interface Notification {
    id: bigint;
    status: string;
    fullPayload: string;
    submitterName: string;
    messagePreview: string;
    sourceType: string;
    timestamp: Time;
    submitterEmail: string;
}
export interface CommissionProcessStep {
    id: bigint;
    title: string;
    description: string;
    stepNumber: bigint;
}
export interface SocialPlatform {
    url: string;
    icon: string;
    name: string;
}
export interface CommissionInquiry {
    id: bigint;
    status: string;
    name: string;
    description: string;
    email: string;
    timestamp: Time;
    budget: string;
}
export interface CareerMilestone {
    id: bigint;
    year: string;
    event: string;
}
export interface FAQItem {
    id: bigint;
    question: string;
    answer: string;
}
export interface ContactInquiry {
    id: bigint;
    status: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface backendInterface {
    addUniqueVisitor(visitorId: string): Promise<boolean>;
    getArtworks(): Promise<Array<Artwork>>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getCareerMilestones(): Promise<Array<CareerMilestone>>;
    getCommissionInquiries(): Promise<Array<CommissionInquiry>>;
    getCommissionProcessSteps(): Promise<Array<CommissionProcessStep>>;
    getContactInquiries(): Promise<Array<ContactInquiry>>;
    getFAQItems(): Promise<Array<FAQItem>>;
    getNavigationItems(): Promise<Array<NavigationItem>>;
    getNotifications(): Promise<Array<Notification>>;
    getPageViewCount(): Promise<bigint>;
    getPressMentions(): Promise<Array<PressMention>>;
    getSiteSettings(): Promise<SiteSettings | null>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUniqueVisitorCount(): Promise<bigint>;
    incrementPageView(): Promise<void>;
    setArtworks(artworksArray: Array<Artwork>): Promise<void>;
    setBlogPosts(blogPostsArray: Array<BlogPost>): Promise<void>;
    setCareerMilestones(milestonesArray: Array<CareerMilestone>): Promise<void>;
    setCommissionInquiries(commissionInquiriesArray: Array<CommissionInquiry>): Promise<void>;
    setCommissionProcessSteps(stepsArray: Array<CommissionProcessStep>): Promise<void>;
    setContactInquiries(contactInquiriesArray: Array<ContactInquiry>): Promise<void>;
    setFAQItems(faqItemsArray: Array<FAQItem>): Promise<void>;
    setNavigationItems(navigationItemsArray: Array<NavigationItem>): Promise<void>;
    setNotifications(notificationsArray: Array<Notification>): Promise<void>;
    setPressMentions(pressMentionsArray: Array<PressMention>): Promise<void>;
    setSiteSettings(settings: SiteSettings): Promise<void>;
    setTestimonials(testimonialsArray: Array<Testimonial>): Promise<void>;
}

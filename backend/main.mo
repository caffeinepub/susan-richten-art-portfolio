import Set "mo:core/Set";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Nat "mo:core/Nat";

actor {
  public type Artwork = {
    id : Nat;
    title : Text;
    year : Nat;
    medium : Text;
    size : Text;
    location : Text;
    description : Text;
    category : Text;
    image : Text;
    additionalImages : [Text];
    available : Bool;
    featured : Bool;
    visible : Bool;
    order : Nat;
  };

  public type Testimonial = {
    id : Nat;
    quote : Text;
    name : Text;
    location : Text;
    role : Text;
  };

  public type PressMention = {
    id : Nat;
    publication : Text;
    date : Text;
    headline : Text;
    url : Text;
    excerpt : Text;
  };

  public type CommissionInquiry = {
    id : Nat;
    name : Text;
    email : Text;
    description : Text;
    budget : Text;
    status : Text;
    timestamp : Time.Time;
  };

  public type ContactInquiry = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    status : Text;
    timestamp : Time.Time;
  };

  public type Notification = {
    id : Nat;
    sourceType : Text;
    submitterName : Text;
    submitterEmail : Text;
    messagePreview : Text;
    fullPayload : Text;
    timestamp : Time.Time;
    status : Text;
  };

  public type BlogPost = {
    id : Nat;
    title : Text;
    slug : Text;
    content : Text;
    publishDate : Time.Time;
    status : Text;
  };

  public type FAQItem = {
    id : Nat;
    question : Text;
    answer : Text;
  };

  public type CommissionProcessStep = {
    id : Nat;
    stepNumber : Nat;
    title : Text;
    description : Text;
  };

  public type CareerMilestone = {
    id : Nat;
    year : Text;
    event : Text;
  };

  public type SocialPlatform = {
    name : Text;
    url : Text;
    icon : Text;
  };

  public type SEOSettings = {
    page : Text;
    title : Text;
    description : Text;
    keywords : Text;
  };

  public type SiteSettings = {
    siteTitle : Text;
    siteTagline : Text;
    socialPlatforms : [SocialPlatform];
    seoSettings : [SEOSettings];
    googleAnalyticsId : Text;
    newsletterPlaceholder : Text;
    aboutBio : Text;
    artistStatement : Text;
    heroArtistName : Text;
    heroTagline : Text;
    heroIntroText : Text;
    commissionHeroText : Text;
    commissionPricingText : Text;
  };

  public type NavigationItem = {
    id : Nat;
    name : Text;
    path : Text;
    order : Nat;
  };

  var totalPageViews = 0;
  let uniqueVisitorIds = Set.empty<Text>();

  // CMS Data Storage (Stable Variables)
  var artworksList = List.empty<Artwork>();
  var testimonialsList = List.empty<Testimonial>();
  var pressMentionsList = List.empty<PressMention>();
  var commissionInquiriesList = List.empty<CommissionInquiry>();
  var contactInquiriesList = List.empty<ContactInquiry>();
  var notificationsList = List.empty<Notification>();
  var blogPostsList = List.empty<BlogPost>();
  var faqItemsList = List.empty<FAQItem>();
  var commissionProcessStepsList = List.empty<CommissionProcessStep>();
  var careerMilestonesList = List.empty<CareerMilestone>();
  var siteSettingsValue : ?SiteSettings = null;
  var navigationItemsList = List.empty<NavigationItem>();

  // Redundant function kept for legacy purposes, should not be called in new code
  public query ({ caller }) func getPageViewCount() : async Nat {
    totalPageViews;
  };

  public query ({ caller }) func getUniqueVisitorCount() : async Nat {
    uniqueVisitorIds.size();
  };

  public shared ({ caller }) func incrementPageView() : async () {
    totalPageViews += 1;
  };

  public shared ({ caller }) func addUniqueVisitor(visitorId : Text) : async Bool {
    if (uniqueVisitorIds.contains(visitorId)) {
      false;
    } else {
      uniqueVisitorIds.add(visitorId);
      true;
    };
  };

  // CMS Data Management Functions

  // Artworks
  public shared ({ caller }) func setArtworks(artworksArray : [Artwork]) : async () {
    artworksList.clear();
    artworksArray.forEach(func(artwork) { artworksList.add(artwork) });
  };

  public query ({ caller }) func getArtworks() : async [Artwork] {
    artworksList.toArray();
  };

  // Testimonials
  public shared ({ caller }) func setTestimonials(testimonialsArray : [Testimonial]) : async () {
    testimonialsList.clear();
    testimonialsArray.forEach(func(testimonial) { testimonialsList.add(testimonial) });
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonialsList.toArray();
  };

  // Press Mentions
  public shared ({ caller }) func setPressMentions(pressMentionsArray : [PressMention]) : async () {
    pressMentionsList.clear();
    pressMentionsArray.forEach(func(pressMention) { pressMentionsList.add(pressMention) });
  };

  public query ({ caller }) func getPressMentions() : async [PressMention] {
    pressMentionsList.toArray();
  };

  // Commission Inquiries
  public shared ({ caller }) func setCommissionInquiries(commissionInquiriesArray : [CommissionInquiry]) : async () {
    commissionInquiriesList.clear();
    commissionInquiriesArray.forEach(func(inquiry) { commissionInquiriesList.add(inquiry) });
  };

  public query ({ caller }) func getCommissionInquiries() : async [CommissionInquiry] {
    commissionInquiriesList.toArray();
  };

  // Contact Inquiries
  public shared ({ caller }) func setContactInquiries(contactInquiriesArray : [ContactInquiry]) : async () {
    contactInquiriesList.clear();
    contactInquiriesArray.forEach(func(inquiry) { contactInquiriesList.add(inquiry) });
  };

  public query ({ caller }) func getContactInquiries() : async [ContactInquiry] {
    contactInquiriesList.toArray();
  };

  // Notifications
  public shared ({ caller }) func setNotifications(notificationsArray : [Notification]) : async () {
    notificationsList.clear();
    notificationsArray.forEach(func(notification) { notificationsList.add(notification) });
  };

  public query ({ caller }) func getNotifications() : async [Notification] {
    notificationsList.toArray();
  };

  // Blog Posts
  public shared ({ caller }) func setBlogPosts(blogPostsArray : [BlogPost]) : async () {
    blogPostsList.clear();
    blogPostsArray.forEach(func(blogPost) { blogPostsList.add(blogPost) });
  };

  public query ({ caller }) func getBlogPosts() : async [BlogPost] {
    blogPostsList.toArray();
  };

  // FAQ Items
  public shared ({ caller }) func setFAQItems(faqItemsArray : [FAQItem]) : async () {
    faqItemsList.clear();
    faqItemsArray.forEach(func(faqItem) { faqItemsList.add(faqItem) });
  };

  public query ({ caller }) func getFAQItems() : async [FAQItem] {
    faqItemsList.toArray();
  };

  // Commission Process Steps
  public shared ({ caller }) func setCommissionProcessSteps(stepsArray : [CommissionProcessStep]) : async () {
    commissionProcessStepsList.clear();
    stepsArray.forEach(func(step) { commissionProcessStepsList.add(step) });
  };

  public query ({ caller }) func getCommissionProcessSteps() : async [CommissionProcessStep] {
    commissionProcessStepsList.toArray();
  };

  // Career Milestones
  public shared ({ caller }) func setCareerMilestones(milestonesArray : [CareerMilestone]) : async () {
    careerMilestonesList.clear();
    milestonesArray.forEach(func(milestone) { careerMilestonesList.add(milestone) });
  };

  public query ({ caller }) func getCareerMilestones() : async [CareerMilestone] {
    careerMilestonesList.toArray();
  };

  // Site Settings
  public shared ({ caller }) func setSiteSettings(settings : SiteSettings) : async () {
    siteSettingsValue := ?settings;
  };

  public query ({ caller }) func getSiteSettings() : async ?SiteSettings {
    siteSettingsValue;
  };

  // Navigation Items
  public shared ({ caller }) func setNavigationItems(navigationItemsArray : [NavigationItem]) : async () {
    navigationItemsList.clear();
    navigationItemsArray.forEach(func(navItem) { navigationItemsList.add(navItem) });
  };

  public query ({ caller }) func getNavigationItems() : async [NavigationItem] {
    navigationItemsList.toArray();
  };
};

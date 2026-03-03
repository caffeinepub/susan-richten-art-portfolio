import List "mo:core/List";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Time "mo:core/Time";

module {
  type Artwork = {
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

  type Testimonial = {
    id : Nat;
    quote : Text;
    name : Text;
    location : Text;
    role : Text;
  };

  type PressMention = {
    id : Nat;
    publication : Text;
    date : Text;
    headline : Text;
    url : Text;
    excerpt : Text;
  };

  type CommissionInquiry = {
    id : Nat;
    name : Text;
    email : Text;
    description : Text;
    budget : Text;
    status : Text;
    timestamp : Time.Time;
  };

  type ContactInquiry = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    status : Text;
    timestamp : Time.Time;
  };

  type Notification = {
    id : Nat;
    sourceType : Text;
    submitterName : Text;
    submitterEmail : Text;
    messagePreview : Text;
    fullPayload : Text;
    timestamp : Time.Time;
    status : Text;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    slug : Text;
    content : Text;
    publishDate : Time.Time;
    status : Text;
  };

  type FAQItem = {
    id : Nat;
    question : Text;
    answer : Text;
  };

  type CommissionProcessStep = {
    id : Nat;
    stepNumber : Nat;
    title : Text;
    description : Text;
  };

  type CareerMilestone = {
    id : Nat;
    year : Text;
    event : Text;
  };

  type SocialPlatform = {
    name : Text;
    url : Text;
    icon : Text;
  };

  type SEOSettings = {
    page : Text;
    title : Text;
    description : Text;
    keywords : Text;
  };

  type SiteSettings = {
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

  type NavigationItem = {
    id : Nat;
    name : Text;
    path : Text;
    order : Nat;
  };

  type OldActor = {
    artworksList : List.List<Artwork>;
    testimonialsList : List.List<Testimonial>;
    pressMentionsList : List.List<PressMention>;
    commissionInquiriesList : List.List<CommissionInquiry>;
    contactInquiriesList : List.List<ContactInquiry>;
    notificationsList : List.List<Notification>;
    blogPostsList : List.List<BlogPost>;
    faqItemsList : List.List<FAQItem>;
    commissionProcessStepsList : List.List<CommissionProcessStep>;
    careerMilestonesList : List.List<CareerMilestone>;
    siteSettingsValue : ?SiteSettings;
    navigationItemsList : List.List<NavigationItem>;
    totalPageViews : Nat;
    uniqueVisitorIds : Set.Set<Text>;
  };

  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    old;
  };
};

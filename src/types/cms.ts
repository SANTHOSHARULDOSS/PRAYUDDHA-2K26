import type { EventCategory, EventStatus } from '@/data/events';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface SiteConfigData {
  siteName: string;
  edition: string;
  motto: string;
  slogan: string;
  tagline: string;
  symposiumIdentity: string;
  entryFeeNotice: string;
  eventDate: string;
  eventDateShort: string;
  eventDay: string;
  eventTime: string;
  countdownDate: string;
  venue: string;
  institution: string;
  university: string;
  city: string;
  pincode: string;
  state: string;
  address: string;
  googleFormUrl: string;
  registrationStatus: 'OPEN' | 'CLOSED';
  registrationBtnText: string;
  registrationFee: string;
  upiPhone: string;
  qrCodeUrl: string;
  googleMapsUrl: string;
  navLinks: NavLinkItem[];
}

export interface AnnouncementData {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'urgent' | 'warning';
  priority: number;
  isPublished: boolean;
  date: string;
}

export interface GalleryItemData {
  id: string;
  title: string;
  description: string;
  category: 'Inauguration' | 'Events' | 'Behind the Scenes' | 'Venue' | 'Other';
  image: string;
  displayOrder: number;
  date?: string;
  isPublished: boolean;
}

export interface PosterData {
  posterUrl: string;
  caption: string;
  isPublished: boolean;
  lastUpdated: string;
}

export interface BrochureData {
  page1Url: string;
  page2Url: string;
  title: string;
  isPublished: boolean;
  lastUpdated: string;
}

export interface EventItemData {
  id: string;
  name: string;
  category: EventCategory;
  tagline?: string;
  description: string;
  concept?: string;
  rules: string[];
  roundsDetails?: string[];
  evaluationCriteria?: string[];
  winnerCriteria?: string;
  skillsTested?: string[];
  teamSize: string;
  fee: string;
  duration: string;
  rounds: string;
  eligibility: string;
  prizes: string;
  firstPrize?: string;
  secondPrize?: string;
  image: string;
  registrationLink: string;
  status: EventStatus;
  displayOrder: number;
  isPublished: boolean;
}

export interface TeamMemberData {
  id: string;
  name: string;
  initial?: string;
  role: string;
  phone?: string;
  photo?: string;
  priority?: boolean;
  displayOrder: number;
}

export interface ContactConfigData {
  email: string;
  phone1: string;
  phone2: string;
  whatsappUrl: string;
  instagramUrl: string;
  address: string;
}

export interface TravelRouteData {
  venueName: string;
  bBlockInfo: string;
  cBlockInfo: string;
  trichyRouteInfo: string;
  keeranurRouteInfo: string;
  fareEstimate: string;
  googleMapsUrl: string;
}

export interface ScheduleItemData {
  id: string;
  time: string;
  programme: string;
  venue?: string;
  isBreak?: boolean;
  isEnd?: boolean;
  displayOrder: number;
}

export interface PrizesData {
  techFirst: string;
  techSecond: string;
  nonTechFirst: string;
  nonTechSecond: string;
  overallChampion: string;
}

export interface RuleCategoryData {
  id: string;
  category: string;
  icon: string;
  rules: string[];
}

export interface CMSState {
  siteConfig: SiteConfigData;
  announcements: AnnouncementData[];
  gallery: GalleryItemData[];
  poster: PosterData;
  brochure: BrochureData;
  events: EventItemData[];
  team: TeamMemberData[];
  contact: ContactConfigData;
  travel: TravelRouteData;
  schedule: ScheduleItemData[];
  prizes: PrizesData;
  rules: RuleCategoryData[];
  lastUpdated: number;
}

export type Region = 'MY' | 'ID';
export type Language = 'MY' | 'EN';

export interface RoadtourStateData {
  id: string;
  name: string;
  code: string;
  zone: 'Pantai Timur' | 'Selatan' | 'Utara' | 'Tengah' | 'Borneo';
  hotel: string;
  date: string;
  attendees: number | string;
  status: 'completed' | 'upcoming' | 'coming_soon';
  highlight: string;
  coverImage: string;
  gallery: {
    url: string;
    caption: string;
  }[];
}

export interface IBActivityItem {
  id: string;
  title: string;
  date?: string;
  location?: string;
  category?: 'Workshop' | 'Dinner' | 'Merchandise' | 'Leadership' | 'Student' | string;
  imageUrl: string;
  url?: string;
  description: string;
  caption?: string;
}

export interface IBRegionData {
  id?: 'MY' | 'ID';
  region: Region;
  title: string;
  badge?: string;
  description: string;
  coverImage?: string;
  stats?: {
    activeIB: string;
    totalVolume: string;
    monthlyRebate: string;
    tierCommission: string;
  };
  activities: IBActivityItem[];
  albumImages?: Array<{ id: string; url: string; caption: string }>;
  registrationUrl: string;
  registerLink?: string;
  buttonText?: string;
}

export interface AlgoMetric {
  pair: string;
  timeframe: string;
  winrate: string;
  profitFactor: string;
  avgRR: string;
  maxDrawdown: string;
  totalTrades: string;
}

export interface TraderTestimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  avatar: string;
  profit: string;
  comment: string;
  verifiedBadge: boolean;
}

export interface SetupProofItem {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  gainPips: string;
  rrRatio: string;
  date: string;
  imageUrl: string;
  chartDescription: string;
}

export interface CommunityLinks {
  telegramVip: string;
  whatsAppCareline: string;
  tiktok: string;
  youtube: string;
  instagram: string;
}

export interface UpcomingEventForm {
  id: string;
  stateId: string;
  eventName: string;
  date: string;
  venue: string;
  seatsQuota: number;
}

export interface LiveEventAlertData {
  id: string;
  title?: string;
  eventName?: string;
  state: string;
  location: string;
  date: string;
  quota: string;
  image_url?: string;
  isActive: boolean;
  updatedAt?: string;
}

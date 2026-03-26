export interface SiteConfig {
  company_name: string;
  logo_text: string;
  hero_title: string;
  hero_subtitle: string;
  primary_color: string;
  logo_url?: string | null;
  banner_url?: string | null;
  banner_bg_url?: string | null;
}

export interface TrackingStatus {
  id: string;
  status: 'pending' | 'in_transit' | 'at_customs' | 'delivered';
  currentLocation: string;
  history: { date: string; location: string; description: string }[];
  origin: string;
  destination: string;
  estimatedDelivery: string;
}

export interface Agency {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  lat: number;
  lng: number;
}

export interface PricingPlan {
  name: string;
  pricePerKg: number;
  deliveryDays: string;
  features: string[];
}

import { Head } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import AdminDashboard from '@/components/brayan-brush/AdminDashboard';
import type {
  PricingRouteItem,
  ProhibitedCategoryAdmin,
  QuoteItem,
  ServiceItem,
  SiteConfig,
} from '@/api/brayan-api';

interface AdminProps {
  config: SiteConfig;
  services: ServiceItem[];
  prohibitedCategories: ProhibitedCategoryAdmin[];
  quotes: QuoteItem[];
  pricingRoutes: PricingRouteItem[];
}

export default function Admin({ config, services, prohibitedCategories, quotes, pricingRoutes }: AdminProps) {
  return (
    <BrayanBrushLayout>
      <Head title="Panel Administrativo - Brayan Brush" />
      <AdminDashboard
        config={config}
        services={services}
        prohibitedCategories={prohibitedCategories}
        quotes={quotes}
        pricingRoutes={pricingRoutes}
      />
    </BrayanBrushLayout>
  );
}

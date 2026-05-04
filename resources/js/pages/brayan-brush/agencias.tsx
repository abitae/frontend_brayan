import { Head, usePage } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import AgenciesSection from '@/components/brayan-brush/AgenciesSection';
import type { SiteConfig } from '@/api/brayan-api';

export default function Agencias() {
  const siteConfig = usePage().props.siteConfig as SiteConfig | null;

  return (
    <BrayanBrushLayout>
      <Head title="Agencias - Brayan Brush" />
      <AgenciesSection
        introTitle={siteConfig?.agencies_intro_title}
        introSubtitle={siteConfig?.agencies_intro_subtitle}
        ctaTitle={siteConfig?.agencies_cta_title}
        ctaText={siteConfig?.agencies_cta_text}
        ctaButtonLabel={siteConfig?.agencies_cta_button_label}
        agencies={siteConfig?.agencies_list}
      />
    </BrayanBrushLayout>
  );
}

import { Head, usePage } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import AboutSection from '@/components/brayan-brush/AboutSection';
import type { SiteConfig } from '@/api/brayan-api';

export default function Nosotros() {
  const siteConfig = usePage().props.siteConfig as SiteConfig | null;
  const companyName = siteConfig?.company_name ?? 'Brayan Brush';

  return (
    <BrayanBrushLayout>
      <Head title="Nosotros - Brayan Brush" />
      <AboutSection
        companyName={companyName}
        content={{
          titlePrefix: siteConfig?.about_title_prefix ?? undefined,
          titleHighlight: siteConfig?.about_title_highlight ?? undefined,
          titleSuffix: siteConfig?.about_title_suffix ?? undefined,
          paragraph1: siteConfig?.about_paragraph_1 ?? undefined,
          paragraph2: siteConfig?.about_paragraph_2 ?? undefined,
          imageUrl: siteConfig?.about_image_url ?? undefined,
        }}
      />
    </BrayanBrushLayout>
  );
}

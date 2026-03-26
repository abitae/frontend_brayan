import { Head, usePage } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import AboutSection from '@/components/brayan-brush/AboutSection';

export default function Nosotros() {
  const siteConfig = usePage().props.siteConfig as { company_name?: string } | null;
  const companyName = siteConfig?.company_name ?? 'Brayan Brush';

  return (
    <BrayanBrushLayout>
      <Head title="Nosotros - Brayan Brush" />
      <AboutSection companyName={companyName} />
    </BrayanBrushLayout>
  );
}

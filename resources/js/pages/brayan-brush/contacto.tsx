import { Head } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import ContactSection from '@/components/brayan-brush/ContactSection';

export default function Contacto() {
  return (
    <BrayanBrushLayout>
      <Head title="Contacto - Brayan Brush" />
      <ContactSection />
    </BrayanBrushLayout>
  );
}

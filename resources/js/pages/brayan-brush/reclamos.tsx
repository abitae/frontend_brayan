import { Head } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import ComplaintsSection from '@/components/brayan-brush/ComplaintsSection';

export default function Reclamos() {
  return (
    <BrayanBrushLayout>
      <Head title="Libro de Reclamaciones - Brayan Brush" />
      <ComplaintsSection />
    </BrayanBrushLayout>
  );
}

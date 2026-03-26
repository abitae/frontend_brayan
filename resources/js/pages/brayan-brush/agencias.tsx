import { Head } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import AgenciesSection from '@/components/brayan-brush/AgenciesSection';

export default function Agencias() {
  return (
    <BrayanBrushLayout>
      <Head title="Agencias - Brayan Brush" />
      <AgenciesSection />
    </BrayanBrushLayout>
  );
}

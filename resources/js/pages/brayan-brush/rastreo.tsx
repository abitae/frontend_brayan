import { Head } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import TrackingSection from '@/components/brayan-brush/TrackingSection';

export default function Rastreo() {
  return (
    <BrayanBrushLayout>
      <Head title="Rastreo - Brayan Brush" />
      <div className="min-h-[80vh] py-10">
        <TrackingSection />
      </div>
    </BrayanBrushLayout>
  );
}

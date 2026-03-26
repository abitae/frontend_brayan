import { Head } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import ProhibitedSection from '@/components/brayan-brush/ProhibitedSection';

interface ProhibicionesProps {
  prohibitedItems: { title: string; items: string[] }[];
}

export default function Prohibiciones({ prohibitedItems }: ProhibicionesProps) {
  return (
    <BrayanBrushLayout>
      <Head title="Artículos Prohibidos - Brayan Brush" />
      <ProhibitedSection items={prohibitedItems} />
    </BrayanBrushLayout>
  );
}

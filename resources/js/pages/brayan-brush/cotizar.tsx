import { Head, usePage } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import CalculatorSection, { type CalculatorDefaults, type QuotePayload } from '@/components/brayan-brush/CalculatorSection';
import { submitQuote } from '@/api/brayan-api';
import Swal from 'sweetalert2';

interface CotizarPageProps {
  calculatorDefaults?: CalculatorDefaults | null;
}

export default function Cotizar({ calculatorDefaults }: CotizarPageProps) {
  const pageProps = usePage().props as CotizarPageProps;
  const defaults = calculatorDefaults ?? pageProps.calculatorDefaults ?? undefined;

  const handleQuoteSubmit = async (quote: QuotePayload) => {
    try {
      await submitQuote(quote);
    } catch (err) {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err instanceof Error ? err.message : 'Error al enviar la cotización.',
          confirmButtonColor: '#059669'
      });
      throw err; // Permite al modal manejar el estado de carga
    }
  };

  return (
    <BrayanBrushLayout>
      <Head title="Cotizar - Brayan Brush" />
      <div className="min-h-[80vh] py-10">
        <CalculatorSection onQuoteSubmit={handleQuoteSubmit} calculatorDefaults={defaults} />
      </div>
    </BrayanBrushLayout>
  );
}

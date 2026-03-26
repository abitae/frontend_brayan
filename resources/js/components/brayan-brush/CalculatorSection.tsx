import { useState, useEffect } from 'react';
import { getPricingRoutes } from '@/api/brayan-api';
import type { PricingRouteItem } from '@/api/brayan-api';
import { ICONS } from '@/constants/brayan';

const DEFAULT_ORIGINS = ['Lima', 'Callao', 'Trujillo'];
const DEFAULT_DESTINATIONS = ['Arequipa', 'Cusco', 'Piura', 'Trujillo'];

export interface CalculatorDefaults {
  default_mode?: 'weight' | 'dimensions';
  default_weight?: number;
  default_length?: number;
  default_width?: number;
  default_height?: number;
}

export interface QuotePayload {
  nombre: string;
  email?: string;
  telefono: string;
  servicio: string;
  mensaje: string;
  estimated_price?: number;
}

interface CalculatorSectionProps {
  onQuoteSubmit?: (quote: QuotePayload) => Promise<void> | void;
  calculatorDefaults?: CalculatorDefaults | null;
}

export default function CalculatorSection({ onQuoteSubmit, calculatorDefaults }: CalculatorSectionProps) {
  const defaults = calculatorDefaults ?? {};
  const [pricingRoutes, setPricingRoutes] = useState<PricingRouteItem[]>([]);
  const [calcMode, setCalcMode] = useState<'weight' | 'dimensions'>(defaults.default_mode ?? 'weight');
  const [weight, setWeight] = useState(defaults.default_weight ?? 5);
  const [length, setLength] = useState(defaults.default_length ?? 30);
  const [width, setWidth] = useState(defaults.default_width ?? 30);
  const [height, setHeight] = useState(defaults.default_height ?? 30);
  const [origin, setOrigin] = useState('Lima');
  const [destination, setDestination] = useState('Arequipa');
  const [serviceType, setServiceType] = useState('standard');
  const [result, setResult] = useState({ total: 0, volumetric: 0, charged: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDetails, setBookingDetails] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getPricingRoutes().then(setPricingRoutes).catch(() => {});
  }, []);

  const origins = [...new Set([...DEFAULT_ORIGINS, ...pricingRoutes.map((r) => r.origin)])].sort();
  const destinations = [...new Set([...DEFAULT_DESTINATIONS, ...pricingRoutes.map((r) => r.destination)])].sort();

  useEffect(() => {
    const route = pricingRoutes.find((r) => r.origin === origin && r.destination === destination);
    const factor = route?.volumetric_factor ?? 5000;
    const baseFee = route?.base_fee ?? 25;
    const pricePerKg = route?.price_per_kg ?? 1.4;

    const volumetricWeight = (length * width * height) / factor;
    const chargedWeight = calcMode === 'weight' ? weight : Math.max(weight, volumetricWeight);
    const serviceMultiplier = serviceType === 'express' ? 1.5 : 1;
    const total = baseFee + chargedWeight * pricePerKg * serviceMultiplier;
    setResult({
      total: parseFloat(total.toFixed(2)),
      volumetric: parseFloat(volumetricWeight.toFixed(2)),
      charged: parseFloat(chargedWeight.toFixed(2)),
    });
  }, [weight, length, width, height, origin, destination, serviceType, calcMode, pricingRoutes]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fullDetails = `Cotización: S/ ${result.total.toFixed(2)}. Ruta: ${origin} a ${destination}. Peso: ${result.charged}kg. ${bookingDetails}`;
    
    try {
      if (onQuoteSubmit) {
        await Promise.resolve(onQuoteSubmit({
          nombre: bookingName,
          email: bookingEmail || '',
          telefono: bookingPhone,
          servicio: `Reserva - ${serviceType.toUpperCase()}`,
          mensaje: fullDetails,
          estimated_price: result.total,
        }));
      }
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsModalOpen(false);
        setBookingName('');
        setBookingPhone('');
        setBookingDetails('');
        setBookingEmail('');
        setIsSubmitting(false);
      }, 4000);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const ContainerIcon = ICONS.Container;

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden" id="cotizador">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Cotizador Inteligente
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Calcula el costo de tu <span className="text-emerald-600">envío</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Obtén una tarifa inmediata basada en peso real o dimensiones volumétricas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 bg-white rounded-[48px] p-8 md:p-12 shadow-2xl border border-slate-100">
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Origen</label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-6 py-4 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bold"
                  >
                    {origins.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Destino</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-6 py-4 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bold"
                  >
                    {destinations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4 block ml-1">
                  Método de Cálculo
                </label>
                <div className="flex p-1.5 bg-slate-100 rounded-2xl w-full">
                  <button
                    type="button"
                    onClick={() => setCalcMode('weight')}
                    className={`flex-1 py-4 rounded-xl font-black text-sm transition-all ${
                      calcMode === 'weight' ? 'bg-white text-emerald-600 shadow-xl' : 'text-slate-500'
                    }`}
                  >
                    Por Peso Real
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMode('dimensions')}
                    className={`flex-1 py-4 rounded-xl font-black text-sm transition-all ${
                      calcMode === 'dimensions' ? 'bg-white text-emerald-600 shadow-xl' : 'text-slate-500'
                    }`}
                  >
                    Por Volumen
                  </button>
                </div>
              </div>

              {calcMode === 'weight' ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-slate-700">Peso estimado (kg)</label>
                    <span className="text-3xl font-black text-emerald-600">{weight} KG</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">Largo (cm)</label>
                    <input
                      type="number"
                      min={1}
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      placeholder="Ej. 30"
                      className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-xl px-4 py-4 font-bold text-lg text-center placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">Ancho (cm)</label>
                    <input
                      type="number"
                      min={1}
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      placeholder="Ej. 30"
                      className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-xl px-4 py-4 font-bold text-lg text-center placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">Alto (cm)</label>
                    <input
                      type="number"
                      min={1}
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      placeholder="Ej. 30"
                      className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-xl px-4 py-4 font-bold text-lg text-center placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setServiceType('standard')}
                  className={`flex-1 p-5 rounded-3xl border-2 transition-all ${
                    serviceType === 'standard' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 bg-white'
                  }`}
                >
                  <p className="font-black text-slate-900 mb-1">Económico</p>
                  <p className="text-xs text-slate-500 font-medium">3 a 5 días hábiles</p>
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('express')}
                  className={`flex-1 p-5 rounded-3xl border-2 transition-all ${
                    serviceType === 'express' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 bg-white'
                  }`}
                >
                  <p className="font-black text-slate-900 mb-1">Express</p>
                  <p className="text-xs text-slate-500 font-medium">24 a 48 horas</p>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-black mb-10 border-b border-white/10 pb-6 uppercase tracking-widest flex items-center justify-between">
                Resumen de Tarifa
                <ContainerIcon />
              </h3>
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center text-slate-400 font-bold">
                  <span>Peso Base para Cobro:</span>
                  <span className="text-white">{result.charged} KG</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 font-bold">
                  <span>Ruta:</span>
                  <span className="text-white">{origin} → {destination}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 font-bold">
                  <span>Servicio:</span>
                  <span className="text-emerald-400 uppercase text-xs">
                    {serviceType === 'express' ? 'Prioritario' : 'Estándar'}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] ml-1">
                  Total Estimado
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-black tracking-tighter">S/ {result.total.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-4">
                  * Tarifa aproximada. Incluye IGV y seguros básicos.
                </p>
              </div>
              <button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-6 rounded-3xl font-black text-lg mt-12 transition-all shadow-xl"
                onClick={() => setIsModalOpen(true)}
              >
                Reservar Envío Ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            onClick={() => !isSuccess && setIsModalOpen(false)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            aria-label="Cerrar"
          />
          <div className="bg-white rounded-[40px] w-full max-w-lg p-8 md:p-12 relative z-10 shadow-2xl">
            {isSuccess ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8">
                  ✓
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">¡Reserva Registrada!</h3>
                <p className="text-slate-500 text-lg">
                  Un asesor validará tu cotización de S/ {result.total} y te contactará en breve.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Finalizar Reserva</h3>
                    <p className="text-slate-500 font-medium mt-1">Completa tus datos para agendar el envío.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-slate-300 hover:text-slate-900 p-2 bg-slate-50 rounded-full"
                  >
                    ✕
                  </button>
                </div>
                <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resumen</p>
                    <p className="font-black text-slate-900 text-lg">{origin} → {destination}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-600 font-black text-2xl">S/ {result.total.toFixed(2)}</p>
                  </div>
                </div>
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="booking-name" className="block text-sm font-bold text-slate-700">
                      Nombre completo *
                    </label>
                    <input
                      id="booking-name"
                      required
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 outline-none font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="booking-phone" className="block text-sm font-bold text-slate-700">
                        Teléfono *
                      </label>
                      <input
                        id="booking-phone"
                        required
                        type="tel"
                        placeholder="Ej. 999 888 777"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 outline-none font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="booking-email" className="block text-sm font-bold text-slate-700">
                        Email (opcional)
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 outline-none font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="booking-details" className="block text-sm font-bold text-slate-700">
                      Detalles de la carga
                    </label>
                    <textarea
                      id="booking-details"
                      rows={3}
                      placeholder="Descripción, dimensiones o requisitos especiales..."
                      value={bookingDetails}
                      onChange={(e) => setBookingDetails(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 outline-none font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-y transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-emerald-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                       <span className="animate-pulse flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Procesando Reserva...
                       </span>
                    ) : 'Confirmar Reserva'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

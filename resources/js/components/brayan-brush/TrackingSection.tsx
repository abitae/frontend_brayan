import { useEffect, useState } from 'react';
import { getConfig, getTracking } from '@/api/brayan-api';
import type { TrackingResult } from '@/api/brayan-api';
import { ICONS } from '@/constants/brayan';

/** reCAPTCHA v3 (invisible): execute(siteKey, { action }) devuelve un token. */
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SCRIPT_ID = 'recaptcha-api-script';
const RECAPTCHA_ACTION = 'tracking';
const CAPTCHA_REQUIRED_MSG = 'Completa la verificación de seguridad.';

function normalizeTrackingResult(data: unknown): TrackingResult {
  const d = data as Record<string, unknown>;
  const history = Array.isArray(d?.history)
    ? (d.history as { date?: string; location?: string; desc?: string }[]).map((h) => ({
        date: h?.date ?? '',
        location: h?.location ?? '',
        desc: h?.desc ?? '',
      }))
    : [];
  return {
    code: typeof d?.code === 'string' ? d.code : '',
    status: typeof d?.status === 'string' ? d.status : 'registrado',
    status_label: typeof d?.status_label === 'string' ? d.status_label : 'Registrado',
    current_location: d?.current_location != null ? String(d.current_location) : null,
    origin: typeof d?.origin === 'string' ? d.origin : '—',
    destination: typeof d?.destination === 'string' ? d.destination : '—',
    estimated_delivery: d?.estimated_delivery != null ? String(d.estimated_delivery) : null,
    progress: typeof d?.progress === 'number' ? d.progress : 0,
    history,
    is_home: typeof d?.is_home === 'boolean' ? d.is_home : false,
    delivery_address: d?.delivery_address != null ? String(d.delivery_address) : null,
  };
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'registrado':
      return 'bg-slate-500/20 text-slate-300 border-slate-500/50';
    case 'enviado':
      return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
    case 'recibido':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    case 'retornado':
      return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
    case 'entregado':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
    default:
      return 'bg-slate-500/20 text-slate-300 border-slate-500/50';
  }
}

export default function TrackingSection() {
  const [trackingCode, setTrackingCode] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaSiteKey, setRecaptchaSiteKey] = useState<string | null>(null);

  useEffect(() => {
    getConfig().then((c) => {
      const key = c.recaptcha_site_key ?? null;
      setRecaptchaSiteKey(key && key.length > 0 ? key : null);
    });
  }, []);

  useEffect(() => {
    if (!recaptchaSiteKey) return;
    if (document.getElementById(RECAPTCHA_SCRIPT_ID)) return;
    const script = document.createElement('script');
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`;
    script.async = true;
    document.head.appendChild(script);
  }, [recaptchaSiteKey]);

  const handleTrack = async () => {
    const code = trackingCode.trim();
    if (!code) return;
    setError(null);
    setResult(null);

    let token = '';
    if (recaptchaSiteKey && typeof window !== 'undefined' && window.grecaptcha) {
      try {
        token = await new Promise<string>((resolve, reject) => {
          window.grecaptcha!.ready(async () => {
            try {
              const t = await window.grecaptcha!.execute(recaptchaSiteKey!, { action: RECAPTCHA_ACTION });
              resolve(t);
            } catch (e) {
              reject(e);
            }
          });
        });
      } catch {
        setError(CAPTCHA_REQUIRED_MSG);
        return;
      }
      if (!token) {
        setError(CAPTCHA_REQUIRED_MSG);
        return;
      }
    }

    setIsLoading(true);
    try {
      const data = await getTracking(code, token);
      setResult(normalizeTrackingResult(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo consultar el seguimiento.');
    } finally {
      setIsLoading(false);
    }
  };

  const BoxIcon = ICONS.Box;
  const MapPinIcon = ICONS.MapPin;
  const SearchIcon = ICONS.Search;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Rastreo por <span className="text-emerald-600 font-black">código</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Consulta el estado de tu envío: Registrado, Enviado, Recibido, Retornado o Entregado.
          </p>
        </div>

        <div className="bg-slate-50 rounded-[40px] p-10 md:p-14 border border-slate-100 shadow-2xl shadow-slate-200/50 mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative grow group">
              <div className="absolute inset-y-0 left-6 flex items-center text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                placeholder="Código de guía (ej: ENC-000001-1770945006-0-7900)"
                className="w-full pl-16 pr-6 py-6 bg-white border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-3xl outline-none shadow-sm font-bold tracking-wide transition-all text-lg"
              />
            </div>
            <button
              type="button"
              onClick={handleTrack}
              disabled={isLoading}
              className="bg-emerald-600 text-white px-12 py-6 rounded-3xl font-black text-lg hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Rastrear'
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center md:text-left">
            Ingresa el código de tu encomienda (ej. ENC-000001-1770945006-0-7900) para ver el estado del envío.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-6 rounded-3xl bg-rose-50 border border-rose-200 text-rose-800 font-medium">
            {error}
          </div>
        )}

        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
              <div className="bg-slate-900 p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <p className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                    Código de guía
                  </p>
                  <h3 className="text-3xl font-black tracking-tighter">{result.code}</h3>
                </div>
                <div
                  className={`backdrop-blur-md px-6 py-4 rounded-2xl border ${getStatusBadgeClass(result.status)}`}
                >
                  <p className="font-black text-[10px] uppercase tracking-[0.2em] mb-1">Estado</p>
                  <p className="text-xl font-black">{result.status_label}</p>
                </div>
              </div>

              <div className="p-10">
                <div className="flex justify-between items-center mb-16 relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-100 -translate-y-1/2 z-0 rounded-full" />
                  <div
                    className="absolute top-1/2 left-0 h-1.5 bg-emerald-500 -translate-y-1/2 z-0 rounded-full transition-all duration-1000"
                    style={{ width: `${result.progress}%` }}
                  />
                  <div className="z-10 text-center">
                    <div className="w-16 h-16 bg-white border-4 border-emerald-500 rounded-full flex items-center justify-center text-emerald-600 shadow-lg mx-auto mb-3">
                      <BoxIcon />
                    </div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{result.origin}</p>
                  </div>
                  <div className="z-10 text-center">
                    <div className="w-16 h-16 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-slate-300 shadow-sm mx-auto mb-3">
                      <MapPinIcon />
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                      {result.is_home && result.delivery_address
                        ? 'Entrega a domicilio'
                        : result.destination}
                    </p>
                    {result.is_home && result.delivery_address && (
                      <p className="text-[10px] text-slate-500 mt-1 max-w-[140px] mx-auto leading-tight">
                        {result.delivery_address}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                  <div className="bg-slate-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      Ubicación actual
                    </p>
                    <p className="font-bold text-slate-800 flex items-center gap-2">
                      {result.status !== 'entregado' && result.status !== 'retornado' && (
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                      )}
                      {result.current_location ?? '—'}
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">
                      Llegada estimada
                    </p>
                    <p className="font-black text-emerald-900">{result.estimated_delivery ?? '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 rounded-[40px] p-10 border border-slate-100">
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-10 pb-4 border-b border-slate-200">
                Estados: Registrado → Enviado → Recibido → Entregado (o Retornado)
              </h4>
              <div className="space-y-10">
                {!(result.history?.length) ? (
                  <p className="text-slate-500 text-sm">Sin eventos aún.</p>
                ) : (
                  (result.history ?? []).map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative group">
                      <div className="relative z-10">
                        <div
                          className={`w-4 h-4 rounded-full mt-1 border-4 ${
                            idx === result.history.length - 1
                              ? 'bg-emerald-500 border-emerald-100'
                              : 'bg-slate-300 border-white'
                          }`}
                        />
                        {idx < result.history.length - 1 && (
                          <div className="absolute top-5 left-[7px] bottom-[-40px] w-0.5 bg-slate-200" />
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                          {step.date}
                        </p>
                        <p className="font-black text-slate-800 text-sm mb-1">{step.location}</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

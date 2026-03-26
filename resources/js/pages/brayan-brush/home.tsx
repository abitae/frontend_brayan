import { Head, Link, usePage } from '@inertiajs/react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import AboutSection from '@/components/brayan-brush/AboutSection';
import AgenciesSection from '@/components/brayan-brush/AgenciesSection';
import ContactSection from '@/components/brayan-brush/ContactSection';
import ServicesSection from '@/components/brayan-brush/ServicesSection';

interface SiteConfigProp {
  company_name: string;
  hero_title: string;
  hero_subtitle: string;
  banner_bg_url?: string | null;
  banner_url?: string | null;
}

interface HomeProps {
  services: { id: string; title: string; description: string; icon_type: string }[];
  prohibitedItems: { title: string; items: string[] }[];
}

export default function Home({ services }: HomeProps) {
  const siteConfig = usePage().props.siteConfig as SiteConfigProp | null;
  const config = siteConfig ?? {
    company_name: 'Brayan Brush',
    hero_title: 'Logística Inteligente.',
    hero_subtitle: 'Especialistas en transporte terrestre nacional con la flota más segura del Perú.',
    banner_bg_url: null,
    banner_url: 'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&q=80&w=1200',
  };

  return (
    <BrayanBrushLayout>
      <Head title="Inicio - Brayan Brush" />
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {config.banner_bg_url ? (
            <img
              src={config.banner_bg_url}
              alt="Fondo Brayan Brush"
              className="w-full h-full object-cover brightness-[0.9]"
            />
          ) : (
            <div className="w-full h-full bg-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,transparent_40%,rgba(5,150,105,0.05))]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-4 py-2 px-6 rounded-full bg-emerald-100/60 backdrop-blur-xl border border-emerald-200/50 text-emerald-800 font-black text-[10px] uppercase tracking-[0.4em] mb-12 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                Conectando Regiones de Perú
              </div>
              <h1 className="text-7xl md:text-[100px] font-black text-slate-900 leading-[0.85] tracking-tighter mb-10">
                {config.company_name} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400">
                  {config.hero_title}
                </span>
              </h1>
              <div className="relative mb-16 pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-600 to-emerald-400 rounded-full" />
                <p className="text-2xl text-slate-500 leading-relaxed max-w-lg font-semibold italic">
                  &quot;{config.hero_subtitle}&quot;
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                <Link
                  href="/cotizar"
                  className="w-full sm:w-auto bg-emerald-600 text-white px-14 py-6 rounded-[32px] font-black text-xl transition-all shadow-[0_30px_60px_-15px_rgba(5,150,105,0.4)] hover:bg-emerald-500 flex items-center justify-center gap-3 group"
                >
                  Cotizar Ahora
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://i.pravatar.cc/100?u=1" alt="Cliente" />
                    <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://i.pravatar.cc/100?u=2" alt="Cliente" />
                    <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://i.pravatar.cc/100?u=3" alt="Cliente" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-none mb-1">+500 Clientes</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Confían cada mes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative z-10 rounded-[100px] overflow-hidden shadow-2xl aspect-[4/5] max-w-[550px] ml-auto">
                <img
                  src={config.banner_url || 'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&q=80&w=1200'}
                  alt="Truck Brayan Brush"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-16 left-16 right-16">
                  <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-6" />
                  <h3 className="text-white text-4xl font-black leading-tight drop-shadow-xl">
                    Infraestructura de Clase Mundial en Carretera.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="servicios" className="pt-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-4">
          <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">
            Portafolio Estratégico
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Servicios Especializados</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Soluciones logísticas adaptadas dinámicamente para cada tipo de carga.
          </p>
        </div>
        <ServicesSection items={services} />
      </div>
      <div id="nosotros">
        <AboutSection companyName={config.company_name} />
      </div>
      <div id="agencias">
        <AgenciesSection />
      </div>
      <div id="contacto-home">
        <ContactSection />
      </div>
    </BrayanBrushLayout>
  );
}

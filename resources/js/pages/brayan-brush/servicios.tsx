import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import BrayanBrushLayout from '@/layouts/brayan-brush-layout';
import ServicesSection from '@/components/brayan-brush/ServicesSection';
import { ICONS } from '@/constants/brayan';

interface ServiciosProps {
  services: { id: string; title: string; description: string; icon_type: string; image_url?: string }[];
}

export default function Servicios({ services }: ServiciosProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter((s) => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BrayanBrushLayout>
      <Head title="Servicios Premium - Brayan Brush" />
      
      {/* Nuevo Hero Section Interactivo */}
      <div className="bg-slate-900 pt-48 pb-32 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
        {/* Patrón de fondo animado/estético */}
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.4),transparent_60%)]"></div>
            <div style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} className="w-full h-full opacity-30"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-4xl px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px] mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Catálogo de Servicios Logísticos
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
              Soluciones a la <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                velocidad
              </span> de tu negocio
            </h1>
            <p className="text-slate-400 text-lg md:text-2xl mx-auto font-medium mb-12 max-w-2xl leading-relaxed">
              Explora nuestra red de transporte, almacenamiento y paquetería diseñada para superar las exigencias modernas.
            </p>

            {/* Buscador Interactivo */}
            <div className="max-w-xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-[30px] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative flex bg-white/10 backdrop-blur-md rounded-[28px] p-2 border border-emerald-500/30">
                   <div className="flex-grow flex items-center pl-6">
                       <svg className="w-6 h-6 text-emerald-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                       </svg>
                       <input 
                           type="text" 
                           placeholder="Buscar un servicio..." 
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full bg-transparent border-none outline-none text-white px-4 py-3 placeholder-slate-400 font-medium text-lg focus:ring-0"
                       />
                   </div>
                </div>
            </div>
        </div>
      </div>

      {/* Grid de Servicios con Transición SVG */}
      <div className="bg-slate-50 relative z-20">
        <div className="absolute top-0 inset-x-0 -translate-y-full">
            <svg viewBox="0 0 1440 120" className="w-full h-auto text-slate-50 fill-current" preserveAspectRatio="none">
                <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
            </svg>
        </div>

        <div className="pt-10 pb-10">
            {filteredServices.length > 0 ? (
                <ServicesSection items={filteredServices} />
            ) : (
                <div className="text-center py-32 px-4 max-w-2xl mx-auto">
                    <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">No encontramos coincidencias</h3>
                    <p className="text-slate-500 text-lg mb-8">
                        No hay servicios que coincidan con &quot;{searchTerm}&quot;. Intenta con otra palabra.
                    </p>
                    <button 
                        onClick={() => setSearchTerm('')} 
                        className="px-6 py-3 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-emerald-100 hover:text-emerald-700 transition"
                    >
                        Ver todos los servicios
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Banner de Características */}
      <div className="bg-white py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div className="space-y-4">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto transform -rotate-6 transition hover:rotate-0">
                          <ICONS.Box />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900">Seguridad Total</h4>
                      <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                          Monitoreo GPS 24/7 y pólizas contra todo riesgo para que tu carga llegue intacta.
                      </p>
                  </div>
                  <div className="space-y-4 relative">
                      <div className="hidden md:block absolute top-8 left-0 -ml-6 w-12 h-px bg-slate-200"></div>
                      <div className="hidden md:block absolute top-8 right-0 -mr-6 w-12 h-px bg-slate-200"></div>
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto scale-110 shadow-lg shadow-emerald-500/10">
                          <ICONS.Package />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900">Velocidad Express</h4>
                      <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                          Rutas optimizadas diariamente para garantizar entregas en tiempo récord.
                      </p>
                  </div>
                  <div className="space-y-4">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto transform rotate-6 transition hover:rotate-0">
                          <ICONS.Home />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900">Atención Personalizada</h4>
                      <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                          Un asesor logístico dedicado para gestionar todos tus envíos, sin complicaciones.
                      </p>
                  </div>
              </div>
          </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="relative py-32 bg-slate-900 overflow-hidden text-center">
          <div className="absolute inset-0 bg-emerald-900/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-600/30 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-4">
              <h2 className="text-5xl font-black text-white mb-8 tracking-tight">¿Listo para mover tu carga?</h2>
              <p className="text-xl text-emerald-100/80 mb-12">
                  Cotiza ahora mismo y descubre por qué las mejores empresas confían en Brayan Brush para su logística.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link 
                      href="/cotizar"
                      className="px-10 py-5 bg-emerald-600 text-white rounded-full font-black text-lg hover:bg-emerald-500 hover:scale-105 transition-all shadow-xl shadow-emerald-500/30"
                  >
                      Empezar a Cotizar Ahora
                  </Link>
                  <Link 
                      href="/contacto"
                      className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-full font-black text-lg hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm"
                  >
                      Hablar con Ventas
                  </Link>
              </div>
          </div>
      </div>
    </BrayanBrushLayout>
  );
}

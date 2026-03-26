import { Link } from '@inertiajs/react';

interface ProhibitedCategory {
  title: string;
  items: string[];
}

interface ProhibitedSectionProps {
  items?: ProhibitedCategory[];
}

export default function ProhibitedSection({ items = [] }: ProhibitedSectionProps) {
  return (
    <section className="py-24 bg-slate-50 min-h-[70vh]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-rose-600 font-bold uppercase tracking-widest text-sm mb-4 block">
            Seguridad en el transporte
          </span>
          <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Artículos Prohibidos</h2>
          <div className="w-24 h-1.5 bg-rose-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {items.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white p-10 rounded-[40px] shadow-xl shadow-slate-200 border border-slate-100 hover:shadow-2xl transition-all duration-500 group"
            >
              <h3 className="text-2xl font-black text-slate-800 mb-8 pb-4 border-b border-slate-100 group-hover:text-rose-600 transition-colors">
                {cat.title}
              </h3>
              <ul className="space-y-5">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600 font-medium leading-tight">
                    <span className="text-rose-500 text-lg mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-rose-50 border-2 border-rose-100 rounded-[30px] p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full -mr-16 -mt-16" />
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-rose-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">⚠️</span> Aviso Importante
            </h3>
            <div className="space-y-4 text-rose-800 text-lg font-medium leading-relaxed max-w-4xl">
              <p>
                El envío de artículos prohibidos está sujeto a sanciones legales y puede resultar en la cancelación del
                servicio sin derecho a reembolso.
              </p>
              <p className="text-rose-700/80">
                Si tiene dudas sobre algún artículo específico, por favor contáctenos antes de realizar el envío para
                recibir asesoría personalizada.
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <Link
                href="/contacto"
                className="bg-rose-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-rose-700 transition-colors shadow-lg"
              >
                Consultar con Soporte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

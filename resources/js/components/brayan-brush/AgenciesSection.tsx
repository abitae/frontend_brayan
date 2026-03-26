import { AGENCIES, ICONS } from '@/constants/brayan';

export default function AgenciesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Nuestra Red en Perú</h2>
          <p className="text-slate-600">Encuentra tu punto Brayan Brush más cercano en Lima, Arequipa, Trujillo o Callao.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AGENCIES.map((agency) => (
            <div
              key={agency.id}
              className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:bg-emerald-50 hover:border-emerald-200 transition-all group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <ICONS.Globe />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{agency.name}</h3>
              <p className="text-slate-500 text-sm mb-4 min-h-[40px]">
                {agency.address}, {agency.city}
              </p>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-6">
                <span>📞</span> {agency.phone}
              </div>
              <button
                type="button"
                onClick={() =>
                  window.open(`https://www.google.com/maps/search/?api=1&query=${agency.lat},${agency.lng}`)
                }
                className="w-full bg-white text-emerald-600 border border-emerald-100 py-3 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
              >
                Ver en Mapa
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-emerald-900 rounded-[40px] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold mb-4">¿Quieres ser parte de nuestra red en Perú?</h3>
              <p className="text-emerald-100 opacity-80">
                Estamos expandiéndonos en todas las provincias del Perú. Si tienes una empresa de transporte local,
                únete como agencia aliada.
              </p>
            </div>
            <button
              type="button"
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl whitespace-nowrap"
            >
              Convertirse en Aliado
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';

interface ContactSectionProps {
  onQuoteSubmit?: (q: Record<string, string>) => void;
}

export default function ContactSection({ onQuoteSubmit }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: 'Courier Local',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuoteSubmit?.(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', servicio: 'Courier Local', mensaje: '' });
    }, 5000);
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black text-slate-900 mb-8 leading-tight">
              Solicita tu <span className="text-emerald-600">Cotización</span> en línea
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
              Completa el formulario y uno de nuestros asesores expertos te enviará una propuesta personalizada de
              inmediato. Tu requerimiento aparecerá directamente en nuestro panel de gestión.
            </p>
          </div>

          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-2xl relative">
            {submitted ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">¡Solicitud Registrada!</h3>
                <p className="text-slate-600">El administrador está revisando tu cotización. Te contactaremos pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="contacto-nombre" className="block text-sm font-bold text-slate-700">
                    Nombre completo *
                  </label>
                  <input
                    id="contacto-nombre"
                    required
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="contacto-email" className="block text-sm font-bold text-slate-700">
                      Email *
                    </label>
                    <input
                      id="contacto-email"
                      required
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contacto-telefono" className="block text-sm font-bold text-slate-700">
                      Teléfono *
                    </label>
                    <input
                      id="contacto-telefono"
                      required
                      type="tel"
                      placeholder="Ej. 999 888 777"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contacto-servicio" className="block text-sm font-bold text-slate-700">
                    Tipo de servicio
                  </label>
                  <select
                    id="contacto-servicio"
                    value={formData.servicio}
                    onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none transition-colors"
                  >
                    <option>Courier Local</option>
                    <option>Mudanza Nacional</option>
                    <option>Carga Consolidada</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contacto-mensaje" className="block text-sm font-bold text-slate-700">
                    Detalles de su envío *
                  </label>
                  <textarea
                    id="contacto-mensaje"
                    required
                    rows={4}
                    placeholder="Indique origen, destino, peso aproximado y cualquier requisito especial..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-y"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-500 transition-all shadow-xl"
                >
                  Enviar Cotización al Administrador
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

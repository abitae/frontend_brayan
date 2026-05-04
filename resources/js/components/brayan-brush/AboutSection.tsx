export interface AboutPageContent {
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  paragraph1: string;
  paragraph2: string;
  imageUrl: string;
}

const DEFAULT_ABOUT: AboutPageContent = {
  titlePrefix: 'Liderazgo en la ruta nacional ',
  titleHighlight: 'peruana',
  titleSuffix: '.',
  paragraph1:
    '{{empresa}} es más que una empresa de transporte; somos su socio estratégico. Gracias a nuestro panel de control centralizado, gestionamos cada unidad con precisión quirúrgica.',
  paragraph2:
    'Nuestra misión es garantizar que su carga llegue a tiempo, sin importar el destino en el vasto territorio peruano. La tecnología y el compromiso son nuestros pilares.',
  imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
};

interface AboutSectionProps {
  companyName: string;
  content?: Partial<AboutPageContent> | null;
}

export default function AboutSection({ companyName, content }: AboutSectionProps) {
  const c = { ...DEFAULT_ABOUT, ...content };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
              <img src={c.imageUrl} alt={`Flota de ${companyName}`} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 p-6 rounded-2xl shadow-xl z-20 text-white">
              <p className="text-2xl font-black">{companyName}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest">Excelencia en Logística</p>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-5xl font-black text-slate-900 mb-8 leading-[1.1]">
              {c.titlePrefix}
              <span className="text-emerald-600">{c.titleHighlight}</span>
              {c.titleSuffix}
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
              <p>{c.paragraph1.replace(/\{\{empresa\}\}/g, companyName)}</p>
              <p>{c.paragraph2.replace(/\{\{empresa\}\}/g, companyName)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

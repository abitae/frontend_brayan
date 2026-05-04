import type { ComponentType } from 'react';
import { Link } from '@inertiajs/react';
import { Ban, Bot, FileText, LogOut, Palette, Receipt, Route, Wrench } from 'lucide-react';
import { logout } from '@/routes';

export const ADMIN_WEB_TAB_IDS = [
  'branding',
  'servicios',
  'nosotros',
  'agencias',
  'precios',
  'cotizador',
  'cotizaciones',
  'prohibiciones',
  'gemini',
] as const;

export type AdminWebTabId = (typeof ADMIN_WEB_TAB_IDS)[number];

export function isAdminWebTabId(value: string | undefined): value is AdminWebTabId {
  return Boolean(value && (ADMIN_WEB_TAB_IDS as readonly string[]).includes(value));
}

/** SVG estáticos (evita depender de exports Lucide en algunos bundles). */
function SvgBuilding({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12h12" />
      <path d="M6 16h12" />
      <path d="m10 6 4 0" />
      <path d="M14 10v4" />
      <path d="M10 10v4" />
    </svg>
  );
}

function SvgPin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

interface AdminWebSidebarProps {
  activeTab: AdminWebTabId;
  onSelectTab: (id: AdminWebTabId) => void;
}

function NavButton({
  label,
  Icon,
  active,
  onClick,
}: {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
        active ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon className="w-5 h-5 shrink-0 opacity-90" />
      {label}
    </button>
  );
}

export default function AdminWebSidebar({ activeTab, onSelectTab }: AdminWebSidebarProps) {
  return (
    <aside className="md:w-72 shrink-0 flex flex-col rounded-2xl bg-white border border-slate-200 shadow-sm h-fit relative z-20">
      <div className="p-5 border-b border-slate-100 bg-slate-50/80 shrink-0">
        <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Administración Web</h2>
      </div>

      <nav className="p-3 flex flex-col gap-1.5" aria-label="Secciones del panel">
        <span className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contenido</span>

        <NavButton
          label="Branding & Media"
          Icon={Palette}
          active={activeTab === 'branding'}
          onClick={() => onSelectTab('branding')}
        />
        <NavButton
          label="Servicios"
          Icon={Wrench}
          active={activeTab === 'servicios'}
          onClick={() => onSelectTab('servicios')}
        />

        <div className="mt-2 mb-1 rounded-2xl border-2 border-emerald-200 bg-emerald-50/80 p-2 space-y-1.5">
          <p className="px-2 pt-1 text-[10px] font-black uppercase tracking-wider text-emerald-800">
            Páginas públicas
          </p>
          <button
            type="button"
            onClick={() => onSelectTab('nosotros')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
              activeTab === 'nosotros'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'bg-white text-slate-800 border border-emerald-100 hover:bg-emerald-100/80'
            }`}
          >
            <SvgBuilding className="w-5 h-5 shrink-0 opacity-90" />
            Nosotros
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('agencias')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
              activeTab === 'agencias'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'bg-white text-slate-800 border border-emerald-100 hover:bg-emerald-100/80'
            }`}
          >
            <SvgPin className="w-5 h-5 shrink-0 opacity-90" />
            Agencias
          </button>
        </div>

        <span className="px-3 py-2 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Comercial</span>
        <NavButton
          label="Precios por ruta"
          Icon={Route}
          active={activeTab === 'precios'}
          onClick={() => onSelectTab('precios')}
        />
        <NavButton
          label="Cotizador"
          Icon={FileText}
          active={activeTab === 'cotizador'}
          onClick={() => onSelectTab('cotizador')}
        />
        <NavButton
          label="Solicitudes de cotización"
          Icon={Receipt}
          active={activeTab === 'cotizaciones'}
          onClick={() => onSelectTab('cotizaciones')}
        />

        <span className="px-3 py-2 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Configuración</span>
        <NavButton
          label="Prohibiciones"
          Icon={Ban}
          active={activeTab === 'prohibiciones'}
          onClick={() => onSelectTab('prohibiciones')}
        />
        <NavButton
          label="Asistente IA"
          Icon={Bot}
          active={activeTab === 'gemini'}
          onClick={() => onSelectTab('gemini')}
        />
      </nav>

      <div className="p-3 mt-auto border-t border-slate-100 bg-slate-50/50">
        <Link
          href={logout().url}
          method="post"
          as="button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-700 transition-all"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}

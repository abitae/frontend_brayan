import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { ICONS } from '@/constants/brayan';
import SmartAssistant from '@/components/brayan-brush/SmartAssistant';
import { logout } from '@/routes';
import FlashMessages from '@/components/FlashMessages';

interface SiteConfigShared {
  company_name: string;
  logo_text: string;
  logo_url?: string | null;
}

export default function BrayanBrushLayout({ children }: PropsWithChildren) {
  const { url } = usePage();
  const path = url === '/' ? 'inicio' : url.replace(/^\//, '').split('?')[0];
  const isAdmin = path === 'admin';
  const siteConfig = (usePage().props.siteConfig as SiteConfigShared | null) ?? {
    company_name: 'Brayan Brush',
    logo_text: 'Corporación Logística',
    logo_url: null,
  };
  const auth = usePage().props.auth as { user: unknown } | undefined;
  const isAuth = Boolean(auth?.user);

  const navItems = [
    { id: 'inicio', label: 'Inicio', href: '/' },
    { id: 'servicios', label: 'Servicios', href: '/servicios' },
    { id: 'nosotros', label: 'Nosotros', href: '/nosotros' },
    { id: 'agencias', label: 'Agencias', href: '/agencias' },
    { id: 'contacto', label: 'Contáctanos', href: '/contacto' },
  ];

  const TruckIcon = ICONS.Truck;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 border-slate-200 text-slate-900 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-2">
              {siteConfig.logo_url ? (
                <img src={siteConfig.logo_url} alt="Logo" className="h-10 w-auto object-contain" />
              ) : (
                <div className="p-2 bg-emerald-600 rounded-lg text-white group-hover:bg-emerald-500 transition-colors">
                  <TruckIcon />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight leading-none text-slate-900">
                {siteConfig.company_name}
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                {siteConfig.logo_text}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const active = path === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-bold transition-all hover:text-emerald-600 py-2 ${
                    active ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-3 ml-4">
              <Link
                href="/rastreo"
                className={`px-5 py-2.5 rounded-full font-black text-sm transition-all border-2 ${
                  path === 'rastreo'
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                    : 'border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'
                }`}
              >
                Rastrear
              </Link>
              <Link
                href="/cotizar"
                className={`bg-emerald-600 text-white px-6 py-2.5 rounded-full font-black text-sm hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20 ${
                  path === 'cotizar' ? 'ring-4 ring-emerald-500/30' : ''
                }`}
              >
                Cotizar
              </Link>
              {isAuth ? (
                <>
                  <Link
                    href="/admin"
                    className="px-5 py-2.5 rounded-full font-black text-sm bg-emerald-600 text-white hover:bg-emerald-500"
                  >
                    Panel Admin
                  </Link>
                  <Link
                    href={logout().url}
                    method="post"
                    as="button"
                    className="px-5 py-2.5 rounded-full font-black text-sm border-2 border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    Cerrar sesión
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-full font-black text-sm border-2 border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-20">{children}</main>

      <footer
        className={
          isAdmin
            ? 'bg-slate-200 text-slate-800 pt-12 pb-8 border-t border-slate-300'
            : 'bg-slate-900 text-white pt-20 pb-10'
        }
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {siteConfig.logo_url ? (
                <img
                  src={siteConfig.logo_url}
                  alt="Logo"
                  className={`h-8 w-auto ${isAdmin ? '' : 'brightness-0 invert'}`}
                />
              ) : (
                <div className="p-2 bg-emerald-600 rounded-lg text-white">
                  <TruckIcon />
                </div>
              )}
              <span className="text-2xl font-black tracking-tight">{siteConfig.company_name}</span>
            </div>
            <p className={isAdmin ? 'text-slate-600 text-sm' : 'text-slate-400 text-sm leading-relaxed font-medium'}>
              Liderazgo y tecnología en transporte terrestre nacional peruano. Conectando regiones con seguridad.
            </p>
          </div>

          <div>
            <h4 className="font-black mb-8 text-emerald-600 uppercase tracking-widest text-xs">Empresa</h4>
            <ul className={`space-y-3 text-sm font-bold ${isAdmin ? 'text-slate-600' : 'text-slate-400'}`}>
              <li>
                <Link href="/nosotros" className="hover:text-emerald-600 transition-colors">Sobre Nosotros</Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-emerald-600 transition-colors">Servicios</Link>
              </li>
              <li>
                <Link href="/agencias" className="hover:text-emerald-600 transition-colors">Agencias Perú</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 text-emerald-600 uppercase tracking-widest text-xs">Seguridad y Soporte</h4>
            <ul className={`space-y-3 text-sm font-bold ${isAdmin ? 'text-slate-600' : 'text-slate-400'}`}>
              <li>
                <Link href="/prohibiciones" className="hover:text-rose-500 transition-colors">Artículos Prohibidos</Link>
              </li>
              <li>
                <Link href="/cotizar" className="hover:text-emerald-600 transition-colors">Cotizar Envío</Link>
              </li>
              <li>
                <Link href="/rastreo" className="hover:text-emerald-600 transition-colors">Seguimiento</Link>
              </li>
              <li>
                <Link href="/reclamos" className="hover:text-rose-500 transition-colors">Libro de Reclamaciones</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 text-emerald-600 uppercase tracking-widest text-xs">Gestión</h4>
            <Link
              href={isAuth ? '/admin' : '/login'}
              className="block w-full bg-emerald-600 text-white py-4 rounded-2xl hover:bg-emerald-500 transition-all text-xs font-black uppercase tracking-widest shadow-lg text-center"
            >
              Panel Administrativo
            </Link>
            {isAuth && (
              <Link
                href={logout().url}
                method="post"
                as="button"
                className="block w-full mt-3 py-3 rounded-2xl border-2 border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-100 text-xs font-black uppercase tracking-widest text-center transition-colors"
              >
                Cerrar sesión
              </Link>
            )}
            <p className="text-[10px] text-slate-500 mt-4 text-center font-bold">Brayan Brush - Laravel</p>
          </div>
        </div>
        <div
          className={`max-w-7xl mx-auto px-4 mt-20 pt-8 border-t text-[10px] font-black uppercase tracking-widest flex flex-col md:flex-row justify-between items-center text-center ${
            isAdmin ? 'border-slate-300 text-slate-500' : 'border-slate-800 text-slate-500'
          }`}
        >
          <p>© 2024 {siteConfig.company_name} - Corporación Logística Perú. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span>Cloud Infrastructure</span>
            <span>Security Validated</span>
          </div>
        </div>
      </footer>
      <FlashMessages />
      {path !== 'admin' && <SmartAssistant />}
    </div>
  );
}

import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import {
  Ban,
  Bot,
  FileText,
  LogOut,
  Palette,
  Receipt,
  Route,
  Wrench,
} from 'lucide-react';
import { logout } from '@/routes';
import {
  createPricingRoute,
  createProhibitedCategory,
  createProhibitedItem,
  createService,
  deletePricingRoute,
  deleteProhibitedCategory,
  deleteProhibitedItem,
  deleteQuote,
  deleteService,
  updateConfig,
  updatePricingRoute,
  updateProhibitedCategory,
  updateProhibitedItem,
  updateQuote,
  updateService,
  uploadBanner,
  uploadBannerBg,
  uploadLogo,
  uploadServiceImage,
} from '@/api/brayan-api';
import type {
  PricingRouteItem,
  ProhibitedCategoryAdmin,
  QuoteItem,
  ServiceItem,
  SiteConfig,
} from '@/api/brayan-api';

const ICON_TYPES = ['Box', 'Home', 'Package'] as const;

interface AdminDashboardProps {
  config: SiteConfig;
  services: ServiceItem[];
  prohibitedCategories: ProhibitedCategoryAdmin[];
  quotes: QuoteItem[];
  pricingRoutes: PricingRouteItem[];
}

export default function AdminDashboard({
  config,
  services: initialServices,
  prohibitedCategories: initialProhibited,
  quotes: initialQuotes,
  pricingRoutes: initialPricingRoutes,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('branding');
  const [localConfig, setLocalConfig] = useState(config);
  const [localServices, setLocalServices] = useState<ServiceItem[]>(initialServices);
  const [localProhibited, setLocalProhibited] = useState<ProhibitedCategoryAdmin[]>(initialProhibited);
  const [localQuotes, setLocalQuotes] = useState<QuoteItem[]>(initialQuotes);
  const [localPricingRoutes, setLocalPricingRoutes] = useState<PricingRouteItem[]>(initialPricingRoutes);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Formulario nuevo servicio
  const [newService, setNewService] = useState({ title: '', description: '', icon_type: 'Box' as const });
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [editingQuotePrice, setEditingQuotePrice] = useState<Record<number, string>>({});
  // Precios: formulario nueva ruta
  const [newPricingRoute, setNewPricingRoute] = useState({
    origin: '',
    destination: '',
    base_fee: 25,
    price_per_kg: 1.5,
    volumetric_factor: 5000,
  });
  const [editingPricingId, setEditingPricingId] = useState<number | null>(null);
  const [geminiApiKeyInput, setGeminiApiKeyInput] = useState('');
  const [openaiApiKeyInput, setOpenaiApiKeyInput] = useState('');

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);
  useEffect(() => {
    setLocalServices(initialServices);
  }, [initialServices]);
  useEffect(() => {
    setLocalProhibited(initialProhibited);
  }, [initialProhibited]);
  useEffect(() => {
    setLocalQuotes(initialQuotes);
  }, [initialQuotes]);
  useEffect(() => {
    setLocalPricingRoutes(initialPricingRoutes);
  }, [initialPricingRoutes]);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'logo' | 'banner' | 'banner_bg'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(type);
    try {
      const res =
        type === 'logo' ? await uploadLogo(file) : type === 'banner' ? await uploadBanner(file) : await uploadBannerBg(file);
      const url = res?.url ?? null;
      if (type === 'logo') setLocalConfig((c) => ({ ...c, logo_url: url }));
      else if (type === 'banner') setLocalConfig((c) => ({ ...c, banner_url: url }));
      else setLocalConfig((c) => ({ ...c, banner_bg_url: url }));
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al subir el archivo.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    } finally {
      setUploading(null);
    }
    e.target.value = '';
  };

  const saveBranding = async () => {
    setSaving(true);
    try {
      await updateConfig(localConfig);
      Swal.fire({ icon: 'success', text: 'Configuración guardada.', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al guardar.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    } finally {
      setSaving(false);
    }
  };

  const saveAssistant = async () => {
    setSaving(true);
    try {
      const payload: SiteConfig = {
        ...localConfig,
        assistant_provider: localConfig.assistant_provider ?? 'gemini',
        gemini_enabled: localConfig.gemini_enabled ?? false,
        gemini_model: localConfig.gemini_model || 'gemini-2.0-flash',
        gemini_system_instruction: localConfig.gemini_system_instruction || null,
        openai_enabled: localConfig.openai_enabled ?? true,
        openai_model: localConfig.openai_model || 'gpt-4o-mini',
        openai_system_instruction: localConfig.openai_system_instruction || null,
      };
      if (geminiApiKeyInput.trim()) payload.gemini_api_key = geminiApiKeyInput.trim();
      if (openaiApiKeyInput.trim()) payload.openai_api_key = openaiApiKeyInput.trim();
      await updateConfig(payload);
      setGeminiApiKeyInput('');
      setOpenaiApiKeyInput('');
      Swal.fire({ icon: 'success', text: 'Configuración del asistente guardada.', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al guardar.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    } finally {
      setSaving(false);
    }
  };

  // --- Servicios CRUD ---
  const handleCreateService = async () => {
    if (!newService.title.trim() || !newService.description.trim()) return;
    try {
      const created = await createService({
        title: newService.title.trim(),
        description: newService.description.trim(),
        icon_type: newService.icon_type,
      });
      setLocalServices((prev) => [...prev, created]);
      setNewService({ title: '', description: '', icon_type: 'Box' });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al crear servicio.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleUpdateService = async (id: string, data: { title?: string; description?: string; icon_type?: 'Box' | 'Home' | 'Package' }) => {
    try {
      const updated = await updateService(id, data);
      setLocalServices((prev) => prev.map((s) => (s.id === id ? updated : s)));
      setEditingServiceId(null);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al actualizar.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleDeleteService = async (id: string) => {
    const res = await Swal.fire({ title: '¿Confirmar acción?', text: '¿Eliminar este servicio?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí', cancelButtonText: 'No' });
    if (!res.isConfirmed) return;
    try {
      await deleteService(id);
      setLocalServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al eliminar.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleUploadServiceImage = async (serviceId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(`service-${serviceId}`);
    try {
      const res = await uploadServiceImage(serviceId, file);
      setLocalServices((prev) => prev.map((s) => (s.id === serviceId ? res.service : s)));
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al subir la imagen.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    } finally {
      setUploading(null);
    }
    e.target.value = '';
  };

  // --- Precios CRUD ---
  const handleCreatePricingRoute = async () => {
    if (!newPricingRoute.origin.trim() || !newPricingRoute.destination.trim()) return;
    try {
      const created = await createPricingRoute({
        origin: newPricingRoute.origin.trim(),
        destination: newPricingRoute.destination.trim(),
        base_fee: newPricingRoute.base_fee,
        price_per_kg: newPricingRoute.price_per_kg,
        volumetric_factor: newPricingRoute.volumetric_factor,
      });
      setLocalPricingRoutes((prev) => [...prev, created]);
      setNewPricingRoute({ origin: '', destination: '', base_fee: 25, price_per_kg: 1.5, volumetric_factor: 5000 });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al crear ruta.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleUpdatePricingRoute = async (
    id: number,
    data: { origin?: string; destination?: string; base_fee?: number; price_per_kg?: number; volumetric_factor?: number }
  ) => {
    try {
      const updated = await updatePricingRoute(id, data);
      setLocalPricingRoutes((prev) => prev.map((r) => (r.id === id ? updated : r)));
      setEditingPricingId(null);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al actualizar.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleDeletePricingRoute = async (id: number) => {
    const res = await Swal.fire({ title: '¿Confirmar acción?', text: '¿Eliminar esta ruta de precio?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí', cancelButtonText: 'No' });
    if (!res.isConfirmed) return;
    try {
      await deletePricingRoute(id);
      setLocalPricingRoutes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al eliminar.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  // --- Prohibiciones CRUD ---
  const handleCreateCategory = async () => {
    if (!newCategoryTitle.trim()) return;
    try {
      const created = await createProhibitedCategory(newCategoryTitle.trim());
      setLocalProhibited((prev) => [...prev, created]);
      setNewCategoryTitle('');
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al crear categoría.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleUpdateCategory = async (id: number, title: string) => {
    try {
      const updated = await updateProhibitedCategory(id, { title });
      setLocalProhibited((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al actualizar categoría.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const res = await Swal.fire({ title: '¿Confirmar acción?', text: '¿Eliminar esta categoría y todos sus ítems?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí', cancelButtonText: 'No' });
    if (!res.isConfirmed) return;
    try {
      await deleteProhibitedCategory(id);
      setLocalProhibited((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al eliminar.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleCreateItem = async (categoryId: number, label: string) => {
    if (!label.trim()) return;
    try {
      const created = await createProhibitedItem(categoryId, label.trim());
      setLocalProhibited((prev) =>
        prev.map((c) => (c.id === categoryId ? { ...c, items: [...c.items, created] } : c))
      );
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al agregar ítem.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleUpdateItem = async (categoryId: number, itemId: number, label: string) => {
    try {
      const updated = await updateProhibitedItem(itemId, { label });
      setLocalProhibited((prev) =>
        prev.map((c) =>
          c.id === categoryId ? { ...c, items: c.items.map((i) => (i.id === itemId ? updated : i)) } : c
        )
      );
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al actualizar ítem.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleDeleteItem = async (categoryId: number, itemId: number) => {
    const res = await Swal.fire({ title: '¿Confirmar acción?', text: '¿Eliminar este ítem?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí', cancelButtonText: 'No' });
    if (!res.isConfirmed) return;
    try {
      await deleteProhibitedItem(itemId);
      setLocalProhibited((prev) =>
        prev.map((c) => (c.id === categoryId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c))
      );
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al eliminar.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  // --- Cotizaciones: editar precio final ---
  const handleUpdateQuotePrice = async (id: number, final_price: number | null) => {
    try {
      const updated = await updateQuote(id, { final_price });
      setLocalQuotes((prev) => prev.map((q) => (q.id === id ? updated : q)));
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al actualizar precio.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const handleDeleteQuote = async (id: number) => {
    const res = await Swal.fire({ title: '¿Confirmar acción?', text: '¿Eliminar esta cotización?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí', cancelButtonText: 'No' });
    if (!res.isConfirmed) return;
    try {
      await deleteQuote(id);
      setLocalQuotes((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err instanceof Error ? err.message : 'Error al eliminar.', toast: true, position: 'top-end', timer: 4000, showConfirmButton: false });
    }
  };

  const refreshData = () => router.reload();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-6 md:p-12 pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <aside className="md:w-72 shrink-0 flex flex-col rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden h-fit">
            <div className="p-5 border-b border-slate-100 bg-slate-50/80">
              <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                Administración Web
              </h2>
            </div>
            <nav className="p-3 flex flex-col gap-1 overflow-y-auto">
              <span className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Contenido
              </span>
              {[
                { id: 'branding', label: 'Branding & Media', Icon: Palette },
                { id: 'servicios', label: 'Servicios', Icon: Wrench },
              ].map((tab) => {
                const Icon = tab.Icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      active
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0 opacity-90" />
                    {tab.label}
                  </button>
                );
              })}
              <span className="px-3 py-2 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Comercial
              </span>
              {[
                { id: 'precios', label: 'Precios por ruta', Icon: Route },
                { id: 'cotizador', label: 'Cotizador', Icon: FileText },
                { id: 'cotizaciones', label: 'Solicitudes de cotización', Icon: Receipt },
              ].map((tab) => {
                const Icon = tab.Icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      active
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0 opacity-90" />
                    {tab.label}
                  </button>
                );
              })}
              <span className="px-3 py-2 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Configuración
              </span>
              {[
                { id: 'prohibiciones', label: 'Prohibiciones', Icon: Ban },
                { id: 'gemini', label: 'Asistente IA', Icon: Bot },
              ].map((tab) => {
                const Icon = tab.Icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      active
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0 opacity-90" />
                    {tab.label}
                  </button>
                );
              })}
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

          <main className="flex-grow bg-white border border-slate-200 rounded-[40px] p-8 md:p-12 shadow-sm">
            {activeTab === 'branding' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-black mb-8">Gestión de Identidad</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Logo (cabecera)</label>
                      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200">
                        {localConfig.logo_url && (
                          <img src={localConfig.logo_url} className="h-10 w-auto rounded max-h-12 object-contain" alt="Logo" />
                        )}
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg,.webp"
                          onChange={(e) => handleFileUpload(e, 'logo')}
                          className="text-xs text-slate-600"
                          disabled={!!uploading}
                        />
                        {uploading === 'logo' && <span className="text-xs text-slate-600">Subiendo…</span>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Banner (imagen principal hero)
                      </label>
                      <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200">
                        {localConfig.banner_url && (
                          <img src={localConfig.banner_url} className="w-full h-32 object-cover rounded-lg mb-2" alt="Banner" />
                        )}
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg,.webp"
                          onChange={(e) => handleFileUpload(e, 'banner')}
                          className="w-full text-xs text-slate-600"
                          disabled={!!uploading}
                        />
                        {uploading === 'banner' && <span className="text-xs text-slate-600">Subiendo…</span>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fondo hero</label>
                      <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200">
                        {localConfig.banner_bg_url && (
                          <img
                            src={localConfig.banner_bg_url}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                            alt="Fondo"
                          />
                        )}
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg,.webp"
                          onChange={(e) => handleFileUpload(e, 'banner_bg')}
                          className="w-full text-xs text-slate-600"
                          disabled={!!uploading}
                        />
                        {uploading === 'banner_bg' && <span className="text-xs text-slate-600">Subiendo…</span>}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Nombre de la empresa
                    </label>
                    <input
                      type="text"
                      value={localConfig.company_name || ''}
                      onChange={(e) => setLocalConfig({ ...localConfig, company_name: e.target.value })}
                      placeholder="Ej. Brayan Brush"
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Texto bajo el logo</label>
                    <input
                      type="text"
                      value={localConfig.logo_text || ''}
                      onChange={(e) => setLocalConfig({ ...localConfig, logo_text: e.target.value })}
                      placeholder="Ej. Corporación Logística"
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Título del hero</label>
                    <input
                      type="text"
                      value={localConfig.hero_title || ''}
                      onChange={(e) => setLocalConfig({ ...localConfig, hero_title: e.target.value })}
                      placeholder="Ej. Logística Inteligente."
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Subtítulo del hero
                    </label>
                    <input
                      type="text"
                      value={localConfig.hero_subtitle || ''}
                      onChange={(e) => setLocalConfig({ ...localConfig, hero_subtitle: e.target.value })}
                      placeholder="Ej. Especialistas en transporte..."
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mt-6">
                      URL del servicio de rastreo (opcional)
                    </label>
                    <input
                      type="url"
                      value={localConfig.tracking_api_url ?? ''}
                      onChange={(e) => setLocalConfig({ ...localConfig, tracking_api_url: e.target.value || null })}
                      placeholder="https://system_brayan.test/api/frontend/tracking"
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Si está vacío, se usan datos de prueba. El servicio debe aceptar GET con ?codigo=XXX.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Sube las imágenes, revisa la vista previa y pulsa &quot;Guardar Cambios&quot; para que se actualicen en
                  la web.
                </p>
                <button
                  type="button"
                  onClick={saveBranding}
                  disabled={saving}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50"
                >
                  {saving ? 'Guardando…' : 'Guardar Cambios'}
                </button>
              </div>
            )}

            {activeTab === 'servicios' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-black">Servicios</h3>
                <div className="grid gap-4">
                  {localServices.map((s) => (
                    <div key={s.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                      {editingServiceId === s.id ? (
                        <ServiceEditForm
                          service={s}
                          onSave={(data) => handleUpdateService(s.id, data)}
                          onCancel={() => setEditingServiceId(null)}
                        />
                      ) : (
                        <>
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex gap-4 min-w-0">
                              <div className="shrink-0 w-20 h-20 rounded-2xl bg-slate-200 overflow-hidden flex items-center justify-center">
                                {s.image_url ? (
                                  <img src={s.image_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-slate-500 text-xs">Sin imagen</span>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-lg">{s.title}</p>
                                <p className="text-xs text-slate-600 mt-2 line-clamp-2">{s.description}</p>
                                <span className="text-[10px] text-slate-500 uppercase mt-2 inline-block">{s.icon_type}</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0">
                              <label className="text-[10px] font-bold text-slate-500 uppercase cursor-pointer">
                                {uploading === `service-${s.id}` ? 'Subiendo…' : 'Subir imagen'}
                                <input
                                  type="file"
                                  accept=".png,.jpg,.jpeg,.webp"
                                  className="hidden"
                                  disabled={!!uploading}
                                  onChange={(e) => handleUploadServiceImage(s.id, e)}
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => setEditingServiceId(s.id)}
                                className="text-xs font-bold text-emerald-400 hover:underline"
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteService(s.id)}
                                className="text-xs font-bold text-rose-400 hover:underline"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Agregar servicio</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={newService.title}
                      onChange={(e) => setNewService((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Título"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <select
                      value={newService.icon_type}
                      onChange={(e) =>
                        setNewService((prev) => ({ ...prev, icon_type: e.target.value as 'Box' | 'Home' | 'Package' }))
                      }
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {ICON_TYPES.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Descripción"
                    rows={2}
                    className="w-full mt-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleCreateService}
                    className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-500"
                  >
                    Agregar servicio
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'precios' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-black">Precios por peso y medidas (origen – destino)</h3>
                <p className="text-sm text-slate-600">
                  Configura tarifas por ruta. El cotizador usa: costo = cuota_base + (peso_cobrado × precio_por_kg).
                  Peso cobrado = máximo entre peso real y peso volumétrico (L×A×H / factor).
                </p>
                <div className="grid gap-4">
                  {localPricingRoutes.map((r) => (
                    <div key={r.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                      {editingPricingId === r.id ? (
                        <PricingRouteEditForm
                          route={r}
                          onSave={(data) => handleUpdatePricingRoute(r.id, data)}
                          onCancel={() => setEditingPricingId(null)}
                        />
                      ) : (
                        <div className="flex justify-between items-center flex-wrap gap-4">
                          <div>
                            <p className="font-bold text-lg">
                              {r.origin} → {r.destination}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">
                              Cuota base: S/ {r.base_fee} · S/ {r.price_per_kg}/kg · Factor vol.: {r.volumetric_factor}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingPricingId(r.id)}
                              className="text-xs font-bold text-emerald-400 hover:underline"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePricingRoute(r.id)}
                              className="text-xs font-bold text-rose-400 hover:underline"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Nueva ruta de precio</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <input
                      type="text"
                      value={newPricingRoute.origin}
                      onChange={(e) => setNewPricingRoute((p) => ({ ...p, origin: e.target.value }))}
                      placeholder="Origen (ej. Lima)"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="text"
                      value={newPricingRoute.destination}
                      onChange={(e) => setNewPricingRoute((p) => ({ ...p, destination: e.target.value }))}
                      placeholder="Destino (ej. Arequipa)"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={newPricingRoute.base_fee}
                      onChange={(e) => setNewPricingRoute((p) => ({ ...p, base_fee: parseFloat(e.target.value) || 0 }))}
                      placeholder="Cuota base"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      value={newPricingRoute.price_per_kg}
                      onChange={(e) => setNewPricingRoute((p) => ({ ...p, price_per_kg: parseFloat(e.target.value) || 0 }))}
                      placeholder="S/ por kg"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="number"
                      min="100"
                      value={newPricingRoute.volumetric_factor}
                      onChange={(e) => setNewPricingRoute((p) => ({ ...p, volumetric_factor: parseInt(e.target.value, 10) || 5000 }))}
                      placeholder="Factor vol."
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCreatePricingRoute}
                    className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-500"
                  >
                    Agregar ruta
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'prohibiciones' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-black">Editor de Artículos Prohibidos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {localProhibited.map((cat) => (
                    <div key={cat.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                      <div className="flex justify-between items-center gap-2 mb-4">
                        <input
                          className="bg-transparent text-xl font-black text-rose-400 w-full border-b border-slate-200 pb-2 outline-none focus:ring-0 focus:border-rose-500"
                          defaultValue={cat.title}
                          onBlur={(e) => {
                            const v = e.target.value.trim();
                            if (v && v !== cat.title) handleUpdateCategory(cat.id, v);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="text-xs font-bold text-rose-400 hover:underline shrink-0"
                        >
                          Eliminar categoría
                        </button>
                      </div>
                      <ul className="space-y-2">
                        {cat.items.map((item) => (
                          <li key={item.id} className="flex gap-2 items-center">
                            <input
                              className="bg-white border-none rounded-lg px-3 py-2 text-xs flex-grow outline-none focus:ring-1 focus:ring-rose-500"
                              defaultValue={item.label}
                              onBlur={(e) => {
                                const v = e.target.value.trim();
                                if (v && v !== item.label) handleUpdateItem(cat.id, item.id, v);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(cat.id, item.id)}
                              className="text-rose-400 hover:text-rose-300 text-xs"
                              aria-label="Eliminar"
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                      <AddItemForm categoryId={cat.id} onAdd={handleCreateItem} />
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Nueva categoría</p>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newCategoryTitle}
                      onChange={(e) => setNewCategoryTitle(e.target.value)}
                      placeholder="Título de la categoría"
                      className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <button
                      type="button"
                      onClick={handleCreateCategory}
                      className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-500"
                    >
                      Agregar categoría
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cotizador' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-black">Configuración del cotizador (peso o volumen)</h3>
                <p className="text-sm text-slate-600">
                  Define el método de cálculo por defecto y los valores iniciales que verán los usuarios al abrir la página de cotización.
                </p>
                <div className="space-y-6 max-w-xl">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">
                      Método de cálculo por defecto
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="calc_mode"
                          checked={(localConfig.calculator_default_mode ?? 'weight') === 'weight'}
                          onChange={() =>
                            setLocalConfig((c) => ({ ...c, calculator_default_mode: 'weight' }))
                          }
                          className="rounded-full border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-slate-800 font-medium">Por peso real</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="calc_mode"
                          checked={(localConfig.calculator_default_mode ?? 'weight') === 'dimensions'}
                          onChange={() =>
                            setLocalConfig((c) => ({ ...c, calculator_default_mode: 'dimensions' }))
                          }
                          className="rounded-full border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-slate-800 font-medium">Por volumen</span>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">
                        Peso por defecto (kg)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={5000}
                        value={localConfig.calculator_default_weight ?? 5}
                        onChange={(e) =>
                          setLocalConfig((c) => ({
                            ...c,
                            calculator_default_weight: parseInt(e.target.value, 10) || 5,
                          }))
                        }
                        className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-4 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">
                        Largo por defecto (cm)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={500}
                        value={localConfig.calculator_default_length ?? 30}
                        onChange={(e) =>
                          setLocalConfig((c) => ({
                            ...c,
                            calculator_default_length: parseInt(e.target.value, 10) || 30,
                          }))
                        }
                        className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-4 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">
                        Ancho por defecto (cm)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={500}
                        value={localConfig.calculator_default_width ?? 30}
                        onChange={(e) =>
                          setLocalConfig((c) => ({
                            ...c,
                            calculator_default_width: parseInt(e.target.value, 10) || 30,
                          }))
                        }
                        className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-4 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">
                        Alto por defecto (cm)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={500}
                        value={localConfig.calculator_default_height ?? 30}
                        onChange={(e) =>
                          setLocalConfig((c) => ({
                            ...c,
                            calculator_default_height: parseInt(e.target.value, 10) || 30,
                          }))
                        }
                        className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-4 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={saveBranding}
                  disabled={saving}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50"
                >
                  {saving ? 'Guardando…' : 'Guardar configuración del cotizador'}
                </button>
              </div>
            )}

            {activeTab === 'cotizaciones' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black">Solicitudes de cotización enviadas</h3>
                  <button
                    type="button"
                    onClick={refreshData}
                    className="text-xs font-bold text-slate-600 hover:text-white"
                  >
                    Actualizar
                  </button>
                </div>
                {localQuotes.length === 0 ? (
                  <div className="text-center py-20 bg-slate-50/20 rounded-[40px] border border-slate-200">
                    <p className="text-slate-500">No hay cotizaciones recibidas.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {localQuotes.map((q) => (
                      <div key={q.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-grow">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <p className="font-bold text-lg">{q.nombre}</p>
                              {q.created_at && (
                                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                                  {new Date(q.created_at).toLocaleDateString('es-PE', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-emerald-600 font-bold">{q.servicio}</p>
                            <p className="text-sm text-slate-700 mt-2">{q.mensaje}</p>
                            <p className="text-xs text-slate-500 mt-1">📞 {q.telefono}</p>
                            {q.email && (
                              <p className="text-xs text-slate-500">✉️ {q.email}</p>
                            )}
                            {q.estimated_price != null && (
                              <p className="text-xs text-slate-600 mt-1 font-medium">Estimado: S/ {q.estimated_price}</p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 md:min-w-[180px]">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                              Precio final (S/)
                            </label>
                            <div className="flex gap-2 items-center">
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={
                                  editingQuotePrice[q.id] !== undefined
                                    ? editingQuotePrice[q.id]
                                    : q.final_price != null
                                      ? String(q.final_price)
                                      : ''
                                }
                                onChange={(e) =>
                                  setEditingQuotePrice((prev) => ({ ...prev, [q.id]: e.target.value }))
                                }
                                onBlur={(e) => {
                                  const raw = e.target.value.trim();
                                  const val = raw === '' ? null : parseFloat(raw);
                                  setEditingQuotePrice((prev) => {
                                    const next = { ...prev };
                                    delete next[q.id];
                                    return next;
                                  });
                                  if (val !== null && !Number.isNaN(val) && val >= 0 && val !== q.final_price) {
                                    handleUpdateQuotePrice(q.id, val);
                                  }
                                }}
                                placeholder="0.00"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-right font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                              />
                              <span className="text-slate-500 text-sm">S/</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteQuote(q.id)}
                              className="text-xs font-bold text-rose-400 hover:underline mt-2"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'gemini' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-black">Asistente IA (Gemini o ChatGPT)</h3>
                <p className="text-sm text-slate-600">
                  Elige el proveedor del bot del sitio y configura su API key y opciones. Ambos pueden consultar el rastreo de envíos.
                </p>

                <div className="space-y-4 max-w-2xl">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">
                    Proveedor del asistente
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="assistant_provider"
                        checked={(localConfig.assistant_provider ?? 'gemini') === 'gemini'}
                        onChange={() =>
                          setLocalConfig((c) => ({ ...c, assistant_provider: 'gemini' }))
                        }
                        className="rounded-full border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="font-medium text-slate-800">Google Gemini</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="assistant_provider"
                        checked={(localConfig.assistant_provider ?? 'gemini') === 'chatgpt'}
                        onChange={() =>
                          setLocalConfig((c) => ({ ...c, assistant_provider: 'chatgpt' }))
                        }
                        className="rounded-full border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="font-medium text-slate-800">ChatGPT (OpenAI)</span>
                    </label>
                  </div>
                </div>

                {(localConfig.assistant_provider ?? 'gemini') === 'gemini' && (
                  <div className="space-y-6 max-w-2xl border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                    <h4 className="font-black text-slate-800">Configuración de Gemini</h4>
                    <div className="flex items-center gap-4">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Gemini habilitado
                      </label>
                      <input
                        type="checkbox"
                        checked={!!localConfig.gemini_enabled}
                        onChange={(e) =>
                          setLocalConfig((c) => ({ ...c, gemini_enabled: e.target.checked }))
                        }
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        API Key (Google AI Studio)
                      </label>
                      <input
                        type="password"
                        value={geminiApiKeyInput}
                        onChange={(e) => setGeminiApiKeyInput(e.target.value)}
                        placeholder={
                          localConfig.gemini_has_api_key
                            ? 'Dejar en blanco para no cambiar la clave actual'
                            : 'Pega aquí tu API key'
                        }
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      {localConfig.gemini_has_api_key && (
                        <p className="text-[10px] text-slate-500">Ya hay una API key configurada.</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Modelo</label>
                      <select
                        value={localConfig.gemini_model || 'gemini-2.0-flash'}
                        onChange={(e) =>
                          setLocalConfig((c) => ({ ...c, gemini_model: e.target.value }))
                        }
                        className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="gemini-2.0-flash">gemini-2.0-flash (recomendado)</option>
                        <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                        <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Instrucción de sistema (opcional)
                      </label>
                      <textarea
                        value={localConfig.gemini_system_instruction ?? ''}
                        onChange={(e) =>
                          setLocalConfig((c) => ({
                            ...c,
                            gemini_system_instruction: e.target.value || null,
                          }))
                        }
                        rows={4}
                        placeholder="Ej: Eres un asistente de Brayan Brush. Responde en español."
                        className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-4 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                )}

                {(localConfig.assistant_provider ?? 'gemini') === 'chatgpt' && (
                  <div className="space-y-6 max-w-2xl border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                    <h4 className="font-black text-slate-800">Configuración de ChatGPT (OpenAI)</h4>
                    <div className="flex items-center gap-4">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        ChatGPT habilitado
                      </label>
                      <input
                        type="checkbox"
                        checked={!!localConfig.openai_enabled}
                        onChange={(e) =>
                          setLocalConfig((c) => ({ ...c, openai_enabled: e.target.checked }))
                        }
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        API Key (OpenAI)
                      </label>
                      <input
                        type="password"
                        value={openaiApiKeyInput}
                        onChange={(e) => setOpenaiApiKeyInput(e.target.value)}
                        placeholder={
                          localConfig.openai_has_api_key
                            ? 'Dejar en blanco para no cambiar la clave actual'
                            : 'Pega aquí tu API key de OpenAI'
                        }
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      {localConfig.openai_has_api_key && (
                        <p className="text-[10px] text-slate-500">Ya hay una API key configurada.</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Modelo</label>
                      <select
                        value={localConfig.openai_model || 'gpt-4o-mini'}
                        onChange={(e) =>
                          setLocalConfig((c) => ({ ...c, openai_model: e.target.value }))
                        }
                        className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="gpt-4o-mini">gpt-4o-mini (rápido y económico)</option>
                        <option value="gpt-4o">gpt-4o</option>
                        <option value="gpt-4-turbo">gpt-4-turbo</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Instrucción de sistema (opcional)
                      </label>
                      <textarea
                        value={localConfig.openai_system_instruction ?? ''}
                        onChange={(e) =>
                          setLocalConfig((c) => ({
                            ...c,
                            openai_system_instruction: e.target.value || null,
                          }))
                        }
                        rows={4}
                        placeholder="Ej: Eres un asistente de Brayan Brush. Responde en español."
                        className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-4 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={saveAssistant}
                  disabled={saving}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50"
                >
                  {saving ? 'Guardando…' : 'Guardar configuración del asistente'}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function ServiceEditForm({
  service,
  onSave,
  onCancel,
}: {
  service: ServiceItem;
  onSave: (data: { title: string; description: string; icon_type: 'Box' | 'Home' | 'Package' }) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [icon_type, setIcon_type] = useState<'Box' | 'Home' | 'Package'>(service.icon_type as 'Box' | 'Home' | 'Package');

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <select
        value={icon_type}
        onChange={(e) => setIcon_type(e.target.value as 'Box' | 'Home' | 'Package')}
        className="bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {ICON_TYPES.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSave({ title, description, icon_type })}
          className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm"
        >
          Guardar
        </button>
        <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm">
          Cancelar
        </button>
      </div>
    </div>
  );
}

function PricingRouteEditForm({
  route,
  onSave,
  onCancel,
}: {
  route: PricingRouteItem;
  onSave: (data: {
    origin?: string;
    destination?: string;
    base_fee?: number;
    price_per_kg?: number;
    volumetric_factor?: number;
  }) => void;
  onCancel: () => void;
}) {
  const [origin, setOrigin] = useState(route.origin);
  const [destination, setDestination] = useState(route.destination);
  const [base_fee, setBase_fee] = useState(route.base_fee);
  const [price_per_kg, setPrice_per_kg] = useState(route.price_per_kg);
  const [volumetric_factor, setVolumetric_factor] = useState(route.volumetric_factor);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <input
        type="text"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        placeholder="Origen"
        className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destino"
        className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <input
        type="number"
        step="0.01"
        min="0"
        value={base_fee}
        onChange={(e) => setBase_fee(parseFloat(e.target.value) || 0)}
        placeholder="Cuota base"
        className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <input
        type="number"
        step="0.0001"
        min="0"
        value={price_per_kg}
        onChange={(e) => setPrice_per_kg(parseFloat(e.target.value) || 0)}
        placeholder="S/ por kg"
        className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <input
        type="number"
        min="100"
        value={volumetric_factor}
        onChange={(e) => setVolumetric_factor(parseInt(e.target.value, 10) || 5000)}
        placeholder="Factor vol."
        className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="flex gap-2 lg:col-span-5">
        <button
          type="button"
          onClick={() => onSave({ origin, destination, base_fee, price_per_kg, volumetric_factor })}
          className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm"
        >
          Guardar
        </button>
        <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm">
          Cancelar
        </button>
      </div>
    </div>
  );
}

function AddItemForm({ categoryId, onAdd }: { categoryId: number; onAdd: (categoryId: number, label: string) => void }) {
  const [label, setLabel] = useState('');

  return (
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Nuevo ítem"
        className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-rose-500"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (label.trim()) {
              onAdd(categoryId, label.trim());
              setLabel('');
            }
          }
        }}
      />
      <button
        type="button"
        onClick={() => {
          if (label.trim()) {
            onAdd(categoryId, label.trim());
            setLabel('');
          }
        }}
        className="text-[10px] font-black uppercase text-emerald-400 hover:underline shrink-0"
      >
        + Agregar
      </button>
    </div>
  );
}

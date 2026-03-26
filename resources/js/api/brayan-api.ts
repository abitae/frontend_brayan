/**
 * Cliente API para Brayan Brush (mismo Laravel, rutas /api/*).
 * Usa sesión y CSRF (cookie XSRF-TOKEN).
 */

function getCsrfToken(): string | null {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

const API_BASE = '';

async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const csrf = getCsrfToken();
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (csrf) headers['X-XSRF-TOKEN'] = csrf;
  if (options.body && typeof options.body === 'string' && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText, detail: res.statusText }));
    throw new Error((err as { detail?: string; message?: string }).detail || (err as { message?: string }).message || res.statusText);
  }
  return res.json();
}

async function uploadFile(path: string, file: File): Promise<{ url: string }> {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const form = new FormData();
  form.append('file', file);
  const csrf = getCsrfToken();
  const headers: Record<string, string> = {};
  if (csrf) headers['X-XSRF-TOKEN'] = csrf;
  const res = await fetch(url, {
    method: 'POST',
    body: form,
    credentials: 'include',
    headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText, detail: res.statusText }));
    throw new Error((err as { detail?: string; message?: string }).detail || (err as { message?: string }).message || res.statusText);
  }
  return res.json();
}

export interface SiteConfig {
  company_name: string;
  logo_text: string;
  hero_title: string;
  hero_subtitle: string;
  primary_color: string;
  logo_url?: string | null;
  banner_url?: string | null;
  banner_bg_url?: string | null;
  tracking_api_url?: string | null;
  gemini_model?: string | null;
  gemini_system_instruction?: string | null;
  gemini_enabled?: boolean;
  gemini_has_api_key?: boolean;
  gemini_api_key?: string | null;
  assistant_provider?: 'gemini' | 'chatgpt';
  openai_api_key?: string | null;
  openai_model?: string | null;
  openai_system_instruction?: string | null;
  openai_enabled?: boolean;
  openai_has_api_key?: boolean;
  calculator_default_mode?: 'weight' | 'dimensions';
  calculator_default_weight?: number;
  calculator_default_length?: number;
  calculator_default_width?: number;
  calculator_default_height?: number;
  recaptcha_site_key?: string | null;
}

export interface TrackingResult {
  code: string;
  status: string;
  status_label: string;
  current_location: string | null;
  origin: string;
  destination: string;
  estimated_delivery: string | null;
  progress: number;
  history: { date: string; location: string; desc: string }[];
  is_home?: boolean;
  delivery_address?: string | null;
}

const TRACKING_404_MESSAGE = 'Encomienda no encontrada.';
const TRACKING_5XX_MESSAGE = 'Error al consultar el seguimiento. Intenta de nuevo.';

export async function getTracking(code: string, captchaToken: string): Promise<TrackingResult> {
  const url = `${API_BASE}/api/tracking`;
  const csrf = getCsrfToken();
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (csrf) headers['X-XSRF-TOKEN'] = csrf;
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ code: code.trim(), captcha_token: captchaToken }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    const msg = (err as { message?: string }).message;
    if (res.status === 404) {
      throw new Error(TRACKING_404_MESSAGE);
    }
    if (res.status >= 500) {
      throw new Error(msg && msg.length < 200 ? msg : TRACKING_5XX_MESSAGE);
    }
    throw new Error(msg || res.statusText);
  }
  return res.json();
}

export async function getConfig(): Promise<SiteConfig> {
  return fetchApi<SiteConfig>('/api/config');
}

export async function updateConfig(config: SiteConfig): Promise<{ message: string }> {
  return fetchApi<{ message: string }>('/api/config', {
    method: 'POST',
    body: JSON.stringify(config),
  });
}

export async function uploadLogo(file: File): Promise<{ url: string }> {
  return uploadFile('/api/config/upload-logo', file);
}

export async function uploadBanner(file: File): Promise<{ url: string }> {
  return uploadFile('/api/config/upload-banner', file);
}

export async function uploadBannerBg(file: File): Promise<{ url: string }> {
  return uploadFile('/api/config/upload-banner-bg', file);
}

export async function assistantChat(message: string): Promise<string> {
  const data = await fetchApi<{ text: string }>('/api/assistant/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
  return data.text;
}

// --- Servicios (admin) ---
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon_type: string;
  image_url?: string | null;
}

export async function getServices(): Promise<ServiceItem[]> {
  return fetchApi<ServiceItem[]>('/api/services');
}

export async function createService(data: {
  title: string;
  description: string;
  icon_type: 'Box' | 'Home' | 'Package';
}): Promise<ServiceItem> {
  return fetchApi<ServiceItem>('/api/services', { method: 'POST', body: JSON.stringify(data) });
}

export async function updateService(
  id: string,
  data: { title?: string; description?: string; icon_type?: 'Box' | 'Home' | 'Package' }
): Promise<ServiceItem> {
  return fetchApi<ServiceItem>(`/api/services/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function deleteService(id: string): Promise<{ message: string }> {
  return fetchApi<{ message: string }>(`/api/services/${id}`, { method: 'DELETE' });
}

export async function uploadServiceImage(serviceId: string, file: File): Promise<{ url: string; service: ServiceItem }> {
  const url = `${API_BASE}/api/services/${serviceId}/upload-image`;
  const form = new FormData();
  form.append('file', file);
  const csrf = getCsrfToken();
  const headers: Record<string, string> = {};
  if (csrf) headers['X-XSRF-TOKEN'] = csrf;
  const res = await fetch(url, { method: 'POST', body: form, credentials: 'include', headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error((err as { message?: string }).message || res.statusText);
  }
  return res.json();
}

// --- Precios por ruta (cotizaciones) ---
export interface PricingRouteItem {
  id: number;
  origin: string;
  destination: string;
  base_fee: number;
  price_per_kg: number;
  volumetric_factor: number;
}

export async function getPricingRoutes(): Promise<PricingRouteItem[]> {
  return fetchApi<PricingRouteItem[]>('/api/pricing-routes');
}

export async function createPricingRoute(data: {
  origin: string;
  destination: string;
  base_fee?: number;
  price_per_kg: number;
  volumetric_factor?: number;
}): Promise<PricingRouteItem> {
  return fetchApi<PricingRouteItem>('/api/pricing-routes', { method: 'POST', body: JSON.stringify(data) });
}

export async function updatePricingRoute(
  id: number,
  data: { origin?: string; destination?: string; base_fee?: number; price_per_kg?: number; volumetric_factor?: number }
): Promise<PricingRouteItem> {
  return fetchApi<PricingRouteItem>(`/api/pricing-routes/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function deletePricingRoute(id: number): Promise<{ message: string }> {
  return fetchApi<{ message: string }>(`/api/pricing-routes/${id}`, { method: 'DELETE' });
}

// --- Prohibiciones (admin) ---
export interface ProhibitedItemAdmin {
  id: number;
  label: string;
}

export interface ProhibitedCategoryAdmin {
  id: number;
  title: string;
  items: ProhibitedItemAdmin[];
}

export async function getProhibitedCategories(): Promise<ProhibitedCategoryAdmin[]> {
  return fetchApi<ProhibitedCategoryAdmin[]>('/api/prohibited-categories');
}

export async function createProhibitedCategory(title: string): Promise<ProhibitedCategoryAdmin> {
  return fetchApi<ProhibitedCategoryAdmin>('/api/prohibited-categories', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

export async function updateProhibitedCategory(
  id: number,
  data: { title: string }
): Promise<ProhibitedCategoryAdmin> {
  return fetchApi<ProhibitedCategoryAdmin>(`/api/prohibited-categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteProhibitedCategory(id: number): Promise<{ message: string }> {
  return fetchApi<{ message: string }>(`/api/prohibited-categories/${id}`, { method: 'DELETE' });
}

export async function createProhibitedItem(
  categoryId: number,
  label: string
): Promise<ProhibitedItemAdmin> {
  return fetchApi<ProhibitedItemAdmin>('/api/prohibited-items', {
    method: 'POST',
    body: JSON.stringify({ prohibited_category_id: categoryId, label }),
  });
}

export async function updateProhibitedItem(
  id: number,
  data: { label: string }
): Promise<ProhibitedItemAdmin> {
  return fetchApi<ProhibitedItemAdmin>(`/api/prohibited-items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteProhibitedItem(id: number): Promise<{ message: string }> {
  return fetchApi<{ message: string }>(`/api/prohibited-items/${id}`, { method: 'DELETE' });
}

// --- Cotizaciones ---
export interface QuoteItem {
  id: number;
  nombre: string;
  email: string | null;
  telefono: string;
  servicio: string;
  mensaje: string;
  estimated_price: number | null;
  final_price: number | null;
  created_at: string;
}

export async function submitQuote(data: {
  nombre: string;
  email?: string;
  telefono: string;
  servicio: string;
  mensaje: string;
  estimated_price?: number;
}): Promise<{ id: number; message: string }> {
  return fetchApi<{ id: number; message: string }>('/api/quotes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getQuotes(): Promise<QuoteItem[]> {
  return fetchApi<QuoteItem[]>('/api/quotes');
}

export async function updateQuote(
  id: number,
  data: { final_price?: number | null; nombre?: string; telefono?: string; mensaje?: string }
): Promise<QuoteItem> {
  return fetchApi<QuoteItem>(`/api/quotes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteQuote(id: number): Promise<{ message: string }> {
  return fetchApi<{ message: string }>(`/api/quotes/${id}`, { method: 'DELETE' });
}

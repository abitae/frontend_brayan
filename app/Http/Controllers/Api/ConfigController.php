<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteConfig;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class ConfigController extends Controller
{

    /**
     * Get site configuration (public).
     */
    public function index(): JsonResponse
    {
        $config = SiteConfig::default();

        $payload = [
            'company_name' => $config->company_name,
            'logo_text' => $config->logo_text,
            'hero_title' => $config->hero_title,
            'hero_subtitle' => $config->hero_subtitle,
            'primary_color' => $config->primary_color,
            'logo_url' => $config->logo_url,
            'banner_url' => $config->banner_url,
            'banner_bg_url' => $config->banner_bg_url,
        ];
        $siteKey = config('services.recaptcha.site_key');
        if (! empty($siteKey)) {
            $payload['recaptcha_site_key'] = $siteKey;
        }

        return response()->json($payload);
    }

    /**
     * Update site configuration (auth required).
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'logo_text' => 'required|string|max:255',
            'hero_title' => 'required|string|max:255',
            'hero_subtitle' => 'required|string|max:500',
            'primary_color' => 'required|string|max:20',
            'logo_url' => 'nullable|string',
            'banner_url' => 'nullable|string',
            'banner_bg_url' => 'nullable|string',
            'tracking_api_url' => 'nullable|string|max:500',
            'calculator_default_mode' => 'nullable|string|in:weight,dimensions',
            'calculator_default_weight' => 'nullable|integer|min:1|max:5000',
            'calculator_default_length' => 'nullable|integer|min:1|max:500',
            'calculator_default_width' => 'nullable|integer|min:1|max:500',
            'calculator_default_height' => 'nullable|integer|min:1|max:500',
            'gemini_api_key' => 'nullable|string|max:500',
            'gemini_model' => 'nullable|string|max:64',
            'gemini_system_instruction' => 'nullable|string|max:8000',
            'gemini_enabled' => 'nullable|boolean',
            'assistant_provider' => 'nullable|string|in:gemini,chatgpt',
            'openai_api_key' => 'nullable|string|max:500',
            'openai_model' => 'nullable|string|max:64',
            'openai_system_instruction' => 'nullable|string|max:8000',
            'openai_enabled' => 'nullable|boolean',
        ]);

        $config = SiteConfig::default();

        if (isset($validated['gemini_api_key'])) {
            $validated['gemini_api_key'] = $validated['gemini_api_key'] ?: null;
        }
        if (isset($validated['gemini_enabled'])) {
            $validated['gemini_enabled'] = (bool) $validated['gemini_enabled'];
        }
        if (isset($validated['assistant_provider'])) {
            $validated['assistant_provider'] = $validated['assistant_provider'] === 'chatgpt' ? 'chatgpt' : 'gemini';
        }
        if (isset($validated['openai_api_key'])) {
            $validated['openai_api_key'] = $validated['openai_api_key'] ?: null;
        }
        if (isset($validated['openai_enabled'])) {
            $validated['openai_enabled'] = (bool) $validated['openai_enabled'];
        }

        $config->update($validated);

        return response()->json(['message' => 'Configuración actualizada']);
    }

    /**
     * Upload logo and return public URL (auth required).
     */
    public function uploadLogo(Request $request): JsonResponse
    {
        $url = $this->uploadFile($request, 'logo');

        $config = SiteConfig::default();
        $config->update(['logo_url' => $url]);

        return response()->json(['url' => $url]);
    }

    /**
     * Upload banner and return public URL (auth required).
     */
    public function uploadBanner(Request $request): JsonResponse
    {
        $url = $this->uploadFile($request, 'banner');

        $config = SiteConfig::default();
        $config->update(['banner_url' => $url]);

        return response()->json(['url' => $url]);
    }

    /**
     * Upload banner background and return public URL (auth required).
     */
    public function uploadBannerBg(Request $request): JsonResponse
    {
        $url = $this->uploadFile($request, 'banner_bg');

        $config = SiteConfig::default();
        $config->update(['banner_bg_url' => $url]);

        return response()->json(['url' => $url]);
    }

    private function uploadFile(Request $request, string $prefix): string
    {
        $request->validate([
            'file' => 'required|file|mimes:png,jpg,jpeg,webp|max:10240',
        ]);

        $file = $request->file('file');
        $ext = $file->getClientOriginalExtension();
        $name = $prefix.'_'.time().'.'.strtolower($ext);

        $path = $file->storeAs('uploads', $name, 'public');

        return Storage::disk('public')->url($path);
    }
}

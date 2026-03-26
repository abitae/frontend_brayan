<?php

namespace App\Http\Controllers\BrayanBrush;

use App\Http\Controllers\Controller;
use App\Models\PricingRoute;
use App\Models\ProhibitedCategory;
use App\Models\Quote;
use App\Models\Service;
use App\Models\SiteConfig;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function __invoke(): Response
    {
        $config = SiteConfig::default();

        $quotes = Quote::orderByDesc('created_at')->get()->map(fn ($q) => [
            'id' => $q->id,
            'nombre' => $q->nombre,
            'email' => $q->email,
            'telefono' => $q->telefono,
            'servicio' => $q->servicio,
            'mensaje' => $q->mensaje,
            'estimated_price' => $q->estimated_price ? (float) $q->estimated_price : null,
            'final_price' => $q->final_price ? (float) $q->final_price : null,
            'created_at' => $q->created_at->toIso8601String(),
        ])->values()->all();

        return Inertia::render('brayan-brush/admin', [
            'config' => [
                'company_name' => $config->company_name,
                'logo_text' => $config->logo_text,
                'hero_title' => $config->hero_title,
                'hero_subtitle' => $config->hero_subtitle,
                'primary_color' => $config->primary_color,
                'logo_url' => $config->logo_url,
                'banner_url' => $config->banner_url,
                'banner_bg_url' => $config->banner_bg_url,
                'tracking_api_url' => $config->tracking_api_url,
                'calculator_default_mode' => $config->calculator_default_mode ?? 'weight',
                'calculator_default_weight' => $config->calculator_default_weight !== null ? (int) $config->calculator_default_weight : 5,
                'calculator_default_length' => $config->calculator_default_length !== null ? (int) $config->calculator_default_length : 30,
                'calculator_default_width' => $config->calculator_default_width !== null ? (int) $config->calculator_default_width : 30,
                'calculator_default_height' => $config->calculator_default_height !== null ? (int) $config->calculator_default_height : 30,
                'gemini_model' => $config->gemini_model,
                'gemini_system_instruction' => $config->gemini_system_instruction,
                'gemini_enabled' => $config->gemini_enabled,
                'gemini_has_api_key' => ! empty($config->gemini_api_key),
                'assistant_provider' => $config->assistant_provider === 'chatgpt' ? 'chatgpt' : 'gemini',
                'openai_model' => $config->openai_model,
                'openai_system_instruction' => $config->openai_system_instruction,
                'openai_enabled' => (bool) ($config->openai_enabled ?? true),
                'openai_has_api_key' => ! empty($config->openai_api_key),
            ],
            'services' => Service::listForFront()->values()->all(),
            'prohibitedCategories' => ProhibitedCategory::listForAdmin()->values()->all(),
            'quotes' => $quotes,
            'pricingRoutes' => PricingRoute::orderBy('origin')->orderBy('destination')->get()->map(fn ($r) => [
                'id' => $r->id,
                'origin' => $r->origin,
                'destination' => $r->destination,
                'base_fee' => (float) $r->base_fee,
                'price_per_kg' => (float) $r->price_per_kg,
                'volumetric_factor' => (int) $r->volumetric_factor,
            ])->values()->all(),
        ]);
    }
}

<?php

namespace App\Http\Middleware;

use App\Models\SiteConfig;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $siteConfig = null;
        try {
            $config = SiteConfig::default();
            $siteConfig = [
                'company_name' => $config->company_name,
                'logo_text' => $config->logo_text,
                'hero_title' => $config->hero_title,
                'hero_subtitle' => $config->hero_subtitle,
                'primary_color' => $config->primary_color,
                'logo_url' => $config->logo_url,
                'banner_url' => $config->banner_url,
                'banner_bg_url' => $config->banner_bg_url,
            ];
        } catch (\Throwable) {
            // Tables may not exist yet during migrations
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'siteConfig' => $siteConfig,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
                'info' => fn () => $request->session()->get('info'),
            ],
        ];
    }
}

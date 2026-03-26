<?php

namespace App\Providers;

use App\Models\SiteConfig;
use Gemini;
use Gemini\Contracts\ClientContract;
use Gemini\Laravel\Exceptions\MissingApiKey;
use GuzzleHttp\Client as GuzzleClient;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Sobrescribir el cliente Gemini para usar la API key de SiteConfig (admin) con fallback a config
        $this->app->bind(ClientContract::class, function (): \Gemini\Client {
            $apiKey = SiteConfig::default()->gemini_api_key ?? config('gemini.api_key');
            if (! is_string($apiKey) || $apiKey === '') {
                throw MissingApiKey::create();
            }
            $baseUrl = config('gemini.base_url');
            $timeout = (int) config('gemini.request_timeout', 30);
            $client = Gemini::factory()
                ->withApiKey(apiKey: $apiKey)
                ->withHttpClient(client: new GuzzleClient(['timeout' => $timeout]));
            if (! empty($baseUrl)) {
                $client->withBaseUrl(baseUrl: $baseUrl);
            }

            return $client->make();
        });
        $this->app->alias(ClientContract::class, 'gemini');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}

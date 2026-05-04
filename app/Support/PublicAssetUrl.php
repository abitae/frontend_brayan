<?php

namespace App\Support;

use Illuminate\Http\Request;

/**
 * Evita mixed content: URLs guardadas con http:// cuando el sitio se sirve por HTTPS.
 */
class PublicAssetUrl
{
    /**
     * Construye la URL pública al fichero en el disco "public" (storage/app/public/...),
     * usando el mismo esquema y host que la petición actual.
     */
    public static function fromPublicDiskPath(Request $request, string $pathOnPublicDisk): string
    {
        $pathOnPublicDisk = ltrim($pathOnPublicDisk, '/');

        return rtrim($request->getSchemeAndHttpHost(), '/').'/storage/'.$pathOnPublicDisk;
    }

    /**
     * Si la petición (o APP_URL) es HTTPS, convierte http:// → https:// para recursos del mismo sitio.
     */
    public static function normalize(?string $url): ?string
    {
        if ($url === null || $url === '') {
            return $url;
        }

        if (! preg_match('#^http://#i', $url)) {
            return $url;
        }

        if (! self::shouldServeAssetsOverHttps()) {
            return $url;
        }

        return (string) preg_replace('#^http://#i', 'https://', $url, 1);
    }

    private static function shouldServeAssetsOverHttps(): bool
    {
        if (! app()->runningInConsole()) {
            try {
                $req = request();
                if ($req instanceof Request && $req->getScheme() === 'https') {
                    return true;
                }
            } catch (\Throwable) {
                //
            }
        }

        return str_starts_with((string) config('app.url'), 'https://');
    }

    /**
     * @param  array<string, mixed>  $config
     * @return array<string, mixed>
     */
    public static function normalizeSiteMediaUrls(array $config): array
    {
        foreach (['logo_url', 'banner_url', 'banner_bg_url', 'about_image_url'] as $key) {
            if (array_key_exists($key, $config)) {
                $config[$key] = self::normalize($config[$key] ?? null);
            }
        }

        return $config;
    }
}

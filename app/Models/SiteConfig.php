<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteConfig extends Model
{
    protected $table = 'site_config';

    public $incrementing = false;

    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'company_name',
        'logo_text',
        'hero_title',
        'hero_subtitle',
        'primary_color',
        'logo_url',
        'banner_url',
        'banner_bg_url',
        'tracking_api_url',
        'calculator_default_mode',
        'calculator_default_weight',
        'calculator_default_length',
        'calculator_default_width',
        'calculator_default_height',
        'gemini_api_key',
        'gemini_model',
        'gemini_system_instruction',
        'gemini_enabled',
        'assistant_provider',
        'openai_api_key',
        'openai_model',
        'openai_system_instruction',
        'openai_enabled',
        'about_title_prefix',
        'about_title_highlight',
        'about_title_suffix',
        'about_paragraph_1',
        'about_paragraph_2',
        'about_image_url',
        'agencies_intro_title',
        'agencies_intro_subtitle',
        'agencies_cta_title',
        'agencies_cta_text',
        'agencies_cta_button_label',
        'agencies_list',
    ];

    protected $casts = [
        'gemini_enabled' => 'boolean',
        'openai_enabled' => 'boolean',
        'agencies_list' => 'array',
    ];

    /**
     * Lista de agencias por defecto (misma que el frontend antes del panel).
     *
     * @return list<array{id: string, name: string, address: string, city: string, phone: string, lat: float, lng: float}>
     */
    public static function defaultAgenciesList(): array
    {
        return [
            ['id' => '1', 'name' => 'Sede Central Lima', 'address' => 'Av. Javier Prado Este 1234, San Isidro', 'city' => 'Lima', 'phone' => '+51 1 700 1234', 'lat' => -12.0917, 'lng' => -77.027],
            ['id' => '2', 'name' => 'Centro Logístico Callao', 'address' => 'Av. Argentina 4500', 'city' => 'Callao', 'phone' => '+51 1 700 5678', 'lat' => -12.0433, 'lng' => -77.1],
            ['id' => '3', 'name' => 'Agencia Arequipa', 'address' => 'Av. Parra 102', 'city' => 'Arequipa', 'phone' => '+51 54 203040', 'lat' => -16.409, 'lng' => -71.5375],
            ['id' => '4', 'name' => 'Sede Norte Trujillo', 'address' => 'Av. Larco 880', 'city' => 'Trujillo', 'phone' => '+51 44 304050', 'lat' => -8.116, 'lng' => -79.03],
        ];
    }

    /**
     * @return array<string, string|null>
     */
    public static function defaultAboutContent(): array
    {
        return [
            'about_title_prefix' => 'Liderazgo en la ruta nacional ',
            'about_title_highlight' => 'peruana',
            'about_title_suffix' => '.',
            'about_paragraph_1' => '{{empresa}} es más que una empresa de transporte; somos su socio estratégico. Gracias a nuestro panel de control centralizado, gestionamos cada unidad con precisión quirúrgica.',
            'about_paragraph_2' => 'Nuestra misión es garantizar que su carga llegue a tiempo, sin importar el destino en el vasto territorio peruano. La tecnología y el compromiso son nuestros pilares.',
            'about_image_url' => 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
        ];
    }

    /**
     * @return array<string, string|null>
     */
    public static function defaultAgenciesPageCopy(): array
    {
        return [
            'agencies_intro_title' => 'Nuestra Red en Perú',
            'agencies_intro_subtitle' => 'Encuentra tu punto Brayan Brush más cercano en Lima, Arequipa, Trujillo o Callao.',
            'agencies_cta_title' => '¿Quieres ser parte de nuestra red en Perú?',
            'agencies_cta_text' => 'Estamos expandiéndonos en todas las provincias del Perú. Si tienes una empresa de transporte local, únete como agencia aliada.',
            'agencies_cta_button_label' => 'Convertirse en Aliado',
        ];
    }

    /**
     * Textos e imágenes de Nosotros / Agencias con valores por defecto si aún no hay datos en BD.
     *
     * @return array<string, mixed>
     */
    public function resolvedPageContent(): array
    {
        $about = self::defaultAboutContent();
        $agenciesCopy = self::defaultAgenciesPageCopy();

        return [
            'about_title_prefix' => $this->about_title_prefix ?? $about['about_title_prefix'],
            'about_title_highlight' => $this->about_title_highlight ?? $about['about_title_highlight'],
            'about_title_suffix' => $this->about_title_suffix ?? $about['about_title_suffix'],
            'about_paragraph_1' => $this->about_paragraph_1 ?? $about['about_paragraph_1'],
            'about_paragraph_2' => $this->about_paragraph_2 ?? $about['about_paragraph_2'],
            'about_image_url' => $this->about_image_url ?? $about['about_image_url'],
            'agencies_intro_title' => $this->agencies_intro_title ?? $agenciesCopy['agencies_intro_title'],
            'agencies_intro_subtitle' => $this->agencies_intro_subtitle ?? $agenciesCopy['agencies_intro_subtitle'],
            'agencies_cta_title' => $this->agencies_cta_title ?? $agenciesCopy['agencies_cta_title'],
            'agencies_cta_text' => $this->agencies_cta_text ?? $agenciesCopy['agencies_cta_text'],
            'agencies_cta_button_label' => $this->agencies_cta_button_label ?? $agenciesCopy['agencies_cta_button_label'],
            'agencies_list' => is_array($this->agencies_list) ? $this->agencies_list : self::defaultAgenciesList(),
        ];
    }

    /**
     * Get the default site config, creating it if it does not exist.
     */
    public static function default(): self
    {
        return self::firstOrCreate(
            ['id' => 'default'],
            [
                'company_name' => 'Brayan Brush',
                'logo_text' => 'Corporación Logística',
                'hero_title' => 'Brayan Brush.',
                'hero_subtitle' => 'Líder en transporte terrestre nacional en Perú.',
                'primary_color' => '#059669',
                'logo_url' => null,
                'banner_url' => null,
                'banner_bg_url' => null,
                'tracking_api_url' => null,
                'calculator_default_mode' => 'weight',
                'calculator_default_weight' => 5,
                'calculator_default_length' => 30,
                'calculator_default_width' => 30,
                'calculator_default_height' => 30,
                'gemini_api_key' => null,
                'gemini_model' => 'gemini-2.0-flash',
                'gemini_system_instruction' => null,
                'gemini_enabled' => true,
                'assistant_provider' => 'gemini',
                'openai_api_key' => null,
                'openai_model' => 'gpt-4o-mini',
                'openai_system_instruction' => null,
                'openai_enabled' => true,
                ...self::defaultAboutContent(),
                ...self::defaultAgenciesPageCopy(),
                'agencies_list' => self::defaultAgenciesList(),
            ]
        );
    }
}

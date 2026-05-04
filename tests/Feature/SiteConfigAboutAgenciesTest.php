<?php

use App\Models\SiteConfig;
use App\Models\User;

/**
 * Replica el flujo del panel: Nosotros + CRUD de agencias vía POST /api/config.
 */
function siteConfigUpdatePayload(SiteConfig $c, array $overrides = []): array
{
    $base = [
        'company_name' => $c->company_name,
        'logo_text' => $c->logo_text,
        'hero_title' => $c->hero_title,
        'hero_subtitle' => $c->hero_subtitle,
        'primary_color' => $c->primary_color,
        'logo_url' => $c->logo_url,
        'banner_url' => $c->banner_url,
        'banner_bg_url' => $c->banner_bg_url,
    ];

    return array_merge($base, $overrides);
}

test('usuario autenticado puede guardar textos de Nosotros y persisten en site_config', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $config = SiteConfig::default();

    $response = $this->postJson('/api/config', siteConfigUpdatePayload($config, [
        'about_title_prefix' => 'Prefijo QA',
        'about_title_highlight' => 'highlight',
        'about_title_suffix' => ' sufijo.',
        'about_paragraph_1' => 'Párrafo uno QA {{empresa}}.',
        'about_paragraph_2' => 'Párrafo dos.',
    ]));

    $response->assertOk()->assertJson(['message' => 'Configuración actualizada']);

    $config->refresh();
    expect($config->about_title_prefix)->toBe('Prefijo QA');
    expect($config->about_title_highlight)->toBe('highlight');
    expect($config->about_paragraph_1)->toContain('{{empresa}}');
});

test('usuario autenticado puede vaciar agencies_list y la API pública devuelve lista vacía', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $config = SiteConfig::default();

    $response = $this->postJson('/api/config', siteConfigUpdatePayload($config, [
        'agencies_list' => [],
    ]));

    $response->assertOk();

    $config->refresh();
    expect($config->agencies_list)->toBeArray()->toBeEmpty();

    $public = $this->getJson('/api/config');
    $public->assertOk();
    expect($public->json('agencies_list'))->toBeArray()->toBeEmpty();
});

test('usuario autenticado puede guardar dos agencias y luego dejar solo una', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $config = SiteConfig::default();

    $two = [
        [
            'id' => 'qa-a',
            'name' => 'Sede QA A',
            'address' => 'Calle 1',
            'city' => 'Lima',
            'phone' => '+51 1 111',
            'lat' => -12.0,
            'lng' => -77.0,
        ],
        [
            'id' => 'qa-b',
            'name' => 'Sede QA B',
            'address' => 'Calle 2',
            'city' => 'Arequipa',
            'phone' => '+51 54 222',
            'lat' => -16.4,
            'lng' => -71.5,
        ],
    ];

    $this->postJson('/api/config', siteConfigUpdatePayload($config, [
        'agencies_list' => $two,
    ]))->assertOk();

    $config->refresh();
    expect($config->agencies_list)->toHaveCount(2);

    $publicTwo = $this->getJson('/api/config');
    expect($publicTwo->json('agencies_list'))->toHaveCount(2);

    $one = array_slice($two, 0, 1);
    $this->postJson('/api/config', siteConfigUpdatePayload($config, [
        'agencies_list' => $one,
    ]))->assertOk();

    $config->refresh();
    expect($config->agencies_list)->toHaveCount(1);
    expect($config->agencies_list[0]['id'])->toBe('qa-a');

    $publicOne = $this->getJson('/api/config');
    expect($publicOne->json('agencies_list'))->toHaveCount(1);
    expect($publicOne->json('agencies_list.0.name'))->toBe('Sede QA A');
});

test('invitado no puede actualizar la configuración del sitio', function () {
    $config = SiteConfig::default();

    $this->postJson('/api/config', siteConfigUpdatePayload($config, [
        'about_title_prefix' => 'hack',
    ]))->assertUnauthorized();
});

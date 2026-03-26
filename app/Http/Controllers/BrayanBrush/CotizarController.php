<?php

namespace App\Http\Controllers\BrayanBrush;

use App\Http\Controllers\Controller;
use App\Models\SiteConfig;
use Inertia\Inertia;
use Inertia\Response;

class CotizarController extends Controller
{
    public function __invoke(): Response
    {
        $config = SiteConfig::default();

        return Inertia::render('brayan-brush/cotizar', [
            'calculatorDefaults' => [
                'default_mode' => $config->calculator_default_mode ?? 'weight',
                'default_weight' => $config->calculator_default_weight !== null ? (int) $config->calculator_default_weight : 5,
                'default_length' => $config->calculator_default_length !== null ? (int) $config->calculator_default_length : 30,
                'default_width' => $config->calculator_default_width !== null ? (int) $config->calculator_default_width : 30,
                'default_height' => $config->calculator_default_height !== null ? (int) $config->calculator_default_height : 30,
            ],
        ]);
    }
}

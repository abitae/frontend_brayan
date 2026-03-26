<?php

namespace App\Http\Controllers\BrayanBrush;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiciosController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('brayan-brush/servicios', [
            'services' => Service::listForFront()->values()->all(),
        ]);
    }

    public function show(Service $service): Response
    {
        return Inertia::render('brayan-brush/servicio-detalle', [
            'service' => [
                'id' => (string) $service->id,
                'title' => $service->title,
                'description' => $service->description,
                'icon_type' => $service->icon_type,
                'image_url' => $service->image_url,
            ],
            'otherServices' => Service::where('id', '!=', $service->id)
                ->orderBy('sort_order')
                ->take(3)
                ->get()
                ->map(fn ($s) => [
                    'id' => (string) $s->id,
                    'title' => $s->title,
                    'description' => $s->description,
                    'icon_type' => $s->icon_type,
                    'image_url' => $s->image_url,
                ]),
        ]);
    }
}

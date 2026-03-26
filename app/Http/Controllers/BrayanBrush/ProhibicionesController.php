<?php

namespace App\Http\Controllers\BrayanBrush;

use App\Http\Controllers\Controller;
use App\Models\ProhibitedCategory;
use Inertia\Inertia;
use Inertia\Response;

class ProhibicionesController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('brayan-brush/prohibiciones', [
            'prohibitedItems' => ProhibitedCategory::listForFront()->values()->all(),
        ]);
    }
}

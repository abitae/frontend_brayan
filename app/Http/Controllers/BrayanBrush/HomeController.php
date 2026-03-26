<?php

namespace App\Http\Controllers\BrayanBrush;

use App\Http\Controllers\Controller;
use App\Models\ProhibitedCategory;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('brayan-brush/home', [
            'services' => Service::listForFront()->values()->all(),
            'prohibitedItems' => ProhibitedCategory::listForFront()->values()->all(),
        ]);
    }
}

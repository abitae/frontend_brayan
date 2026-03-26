<?php

namespace App\Http\Controllers\BrayanBrush;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class RastreoController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('brayan-brush/rastreo');
    }
}

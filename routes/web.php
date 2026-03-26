<?php

use App\Http\Controllers\BrayanBrush\AdminController;
use App\Http\Controllers\BrayanBrush\AgenciasController;
use App\Http\Controllers\BrayanBrush\ContactoController;
use App\Http\Controllers\BrayanBrush\CotizarController;
use App\Http\Controllers\BrayanBrush\HomeController;
use App\Http\Controllers\BrayanBrush\NosotrosController;
use App\Http\Controllers\BrayanBrush\ProhibicionesController;
use App\Http\Controllers\BrayanBrush\RastreoController;
use App\Http\Controllers\BrayanBrush\ReclamosController;
use App\Http\Controllers\BrayanBrush\ServiciosController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::prefix('api')->group(function () {
    require __DIR__.'/api.php';
});

Route::get('/', HomeController::class)->name('home');
Route::get('/cotizar', CotizarController::class)->name('brayan.cotizar');
Route::get('/rastreo', RastreoController::class)->name('brayan.rastreo');
Route::get('/servicios', [ServiciosController::class, 'index'])->name('brayan.servicios');
Route::get('/servicios/{service}', [ServiciosController::class, 'show'])->name('brayan.servicios.show');
Route::get('/nosotros', NosotrosController::class)->name('brayan.nosotros');
Route::get('/agencias', AgenciasController::class)->name('brayan.agencias');
Route::get('/contacto', ContactoController::class)->name('brayan.contacto');
Route::get('/prohibiciones', ProhibicionesController::class)->name('brayan.prohibiciones');
Route::get('/reclamos', ReclamosController::class)->name('brayan.reclamos');
Route::get('/admin', AdminController::class)->middleware(['auth', 'verified'])->name('brayan.admin');

Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('welcome');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';

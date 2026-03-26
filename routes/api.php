<?php

use App\Http\Controllers\Api\AssistantController;
use App\Http\Controllers\Api\ConfigController;
use App\Http\Controllers\Api\PricingRouteController;
use App\Http\Controllers\Api\ProhibitedCategoryController;
use App\Http\Controllers\Api\ProhibitedItemController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TrackingController;
use Illuminate\Support\Facades\Route;

Route::get('/config', [ConfigController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/prohibited-categories', [ProhibitedCategoryController::class, 'index']);
Route::get('/pricing-routes', [PricingRouteController::class, 'index']);
Route::get('/tracking', [TrackingController::class, 'show']);
Route::post('/tracking', [TrackingController::class, 'store']);

Route::post('/assistant/chat', [AssistantController::class, 'chat']);
Route::post('/quotes', [QuoteController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::post('/config', [ConfigController::class, 'update']);
    Route::post('/config/upload-logo', [ConfigController::class, 'uploadLogo']);
    Route::post('/config/upload-banner', [ConfigController::class, 'uploadBanner']);
    Route::post('/config/upload-banner-bg', [ConfigController::class, 'uploadBannerBg']);

    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);
    Route::post('/services/{service}/upload-image', [ServiceController::class, 'uploadImage']);

    Route::post('/pricing-routes', [PricingRouteController::class, 'store']);
    Route::put('/pricing-routes/{pricingRoute}', [PricingRouteController::class, 'update']);
    Route::delete('/pricing-routes/{pricingRoute}', [PricingRouteController::class, 'destroy']);

    Route::post('/prohibited-categories', [ProhibitedCategoryController::class, 'store']);
    Route::put('/prohibited-categories/{prohibitedCategory}', [ProhibitedCategoryController::class, 'update']);
    Route::delete('/prohibited-categories/{prohibitedCategory}', [ProhibitedCategoryController::class, 'destroy']);

    Route::post('/prohibited-items', [ProhibitedItemController::class, 'store']);
    Route::put('/prohibited-items/{prohibitedItem}', [ProhibitedItemController::class, 'update']);
    Route::delete('/prohibited-items/{prohibitedItem}', [ProhibitedItemController::class, 'destroy']);

    Route::get('/quotes', [QuoteController::class, 'index']);
    Route::put('/quotes/{quote}', [QuoteController::class, 'update']);
    Route::delete('/quotes/{quote}', [QuoteController::class, 'destroy']);
});

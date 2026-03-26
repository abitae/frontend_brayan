<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PricingRoute;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PricingRouteController extends Controller
{
    public function index(): JsonResponse
    {
        $routes = PricingRoute::orderBy('origin')->orderBy('destination')->get()->map(fn (PricingRoute $r) => [
            'id' => $r->id,
            'origin' => $r->origin,
            'destination' => $r->destination,
            'base_fee' => (float) $r->base_fee,
            'price_per_kg' => (float) $r->price_per_kg,
            'volumetric_factor' => (int) $r->volumetric_factor,
        ]);

        return response()->json($routes);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'origin' => 'required|string|max:100',
            'destination' => 'required|string|max:100',
            'base_fee' => 'nullable|numeric|min:0',
            'price_per_kg' => 'required|numeric|min:0',
            'volumetric_factor' => 'nullable|integer|min:100',
        ]);

        $validated['base_fee'] = $validated['base_fee'] ?? 0;
        $validated['volumetric_factor'] = $validated['volumetric_factor'] ?? 5000;

        $route = PricingRoute::create($validated);

        return response()->json([
            'id' => $route->id,
            'origin' => $route->origin,
            'destination' => $route->destination,
            'base_fee' => (float) $route->base_fee,
            'price_per_kg' => (float) $route->price_per_kg,
            'volumetric_factor' => (int) $route->volumetric_factor,
        ], 201);
    }

    public function update(Request $request, PricingRoute $pricingRoute): JsonResponse
    {
        $validated = $request->validate([
            'origin' => 'sometimes|string|max:100',
            'destination' => 'sometimes|string|max:100',
            'base_fee' => 'nullable|numeric|min:0',
            'price_per_kg' => 'sometimes|numeric|min:0',
            'volumetric_factor' => 'nullable|integer|min:100',
        ]);

        $pricingRoute->update($validated);

        $pricingRoute->refresh();

        return response()->json([
            'id' => $pricingRoute->id,
            'origin' => $pricingRoute->origin,
            'destination' => $pricingRoute->destination,
            'base_fee' => (float) $pricingRoute->base_fee,
            'price_per_kg' => (float) $pricingRoute->price_per_kg,
            'volumetric_factor' => (int) $pricingRoute->volumetric_factor,
        ]);
    }

    public function destroy(PricingRoute $pricingRoute): JsonResponse
    {
        $pricingRoute->delete();

        return response()->json(['message' => 'Ruta de precio eliminada']);
    }
}

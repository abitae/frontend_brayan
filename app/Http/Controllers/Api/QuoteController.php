<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    /**
     * Listado de cotizaciones (admin).
     */
    public function index(): JsonResponse
    {
        $quotes = Quote::orderByDesc('created_at')->get()->map(fn (Quote $q) => [
            'id' => $q->id,
            'nombre' => $q->nombre,
            'email' => $q->email,
            'telefono' => $q->telefono,
            'servicio' => $q->servicio,
            'mensaje' => $q->mensaje,
            'estimated_price' => $q->estimated_price ? (float) $q->estimated_price : null,
            'final_price' => $q->final_price ? (float) $q->final_price : null,
            'created_at' => $q->created_at->toIso8601String(),
        ]);

        return response()->json($quotes);
    }

    /**
     * Crear cotización (público, desde el formulario de cotizar).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telefono' => 'required|string|max:50',
            'servicio' => 'required|string|max:255',
            'mensaje' => 'required|string|max:2000',
            'estimated_price' => 'nullable|numeric|min:0',
        ]);

        $quote = Quote::create($validated);

        return response()->json([
            'id' => $quote->id,
            'message' => 'Cotización registrada',
        ], 201);
    }

    /**
     * Actualizar cotización (admin): principalmente final_price.
     */
    public function update(Request $request, Quote $quote): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'email' => 'nullable|email|max:255',
            'telefono' => 'sometimes|string|max:50',
            'servicio' => 'sometimes|string|max:255',
            'mensaje' => 'sometimes|string|max:2000',
            'estimated_price' => 'nullable|numeric|min:0',
            'final_price' => 'nullable|numeric|min:0',
        ]);

        $quote->update($validated);

        return response()->json([
            'id' => $quote->id,
            'nombre' => $quote->nombre,
            'email' => $quote->email,
            'telefono' => $quote->telefono,
            'servicio' => $quote->servicio,
            'mensaje' => $quote->mensaje,
            'estimated_price' => $quote->estimated_price ? (float) $quote->estimated_price : null,
            'final_price' => $quote->final_price ? (float) $quote->final_price : null,
            'created_at' => $quote->created_at->toIso8601String(),
        ]);
    }

    public function destroy(Quote $quote): JsonResponse
    {
        $quote->delete();

        return response()->json(['message' => 'Cotización eliminada']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProhibitedCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProhibitedCategoryController extends Controller
{
    /**
     * Listado en formato árbol: { id, title, items: [ { id, label } ] }.
     */
    public function index(): JsonResponse
    {
        $categories = ProhibitedCategory::with('items')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (ProhibitedCategory $c) => [
                'id' => $c->id,
                'title' => $c->title,
                'items' => $c->items->map(fn ($i) => ['id' => $i->id, 'label' => $i->label])->values()->all(),
            ]);

        return response()->json($categories);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $maxOrder = ProhibitedCategory::max('sort_order') ?? -1;
        $validated['sort_order'] = $maxOrder + 1;

        $category = ProhibitedCategory::create($validated);

        return response()->json([
            'id' => $category->id,
            'title' => $category->title,
            'items' => [],
        ], 201);
    }

    public function update(Request $request, ProhibitedCategory $prohibitedCategory): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $prohibitedCategory->update($validated);

        return response()->json([
            'id' => $prohibitedCategory->id,
            'title' => $prohibitedCategory->title,
            'items' => $prohibitedCategory->items->map(fn ($i) => ['id' => $i->id, 'label' => $i->label])->values()->all(),
        ]);
    }

    public function destroy(ProhibitedCategory $prohibitedCategory): JsonResponse
    {
        $prohibitedCategory->delete();

        return response()->json(['message' => 'Categoría eliminada']);
    }
}

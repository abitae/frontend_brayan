<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProhibitedCategory;
use App\Models\ProhibitedItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProhibitedItemController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'prohibited_category_id' => 'required|exists:prohibited_categories,id',
            'label' => 'required|string|max:255',
        ]);

        $category = ProhibitedCategory::findOrFail($validated['prohibited_category_id']);
        $maxOrder = $category->items()->max('sort_order') ?? -1;
        $validated['sort_order'] = $maxOrder + 1;

        $item = ProhibitedItem::create($validated);

        return response()->json([
            'id' => $item->id,
            'label' => $item->label,
        ], 201);
    }

    public function update(Request $request, ProhibitedItem $prohibitedItem): JsonResponse
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
        ]);

        $prohibitedItem->update($validated);

        return response()->json([
            'id' => $prohibitedItem->id,
            'label' => $prohibitedItem->label,
        ]);
    }

    public function destroy(ProhibitedItem $prohibitedItem): JsonResponse
    {
        $prohibitedItem->delete();

        return response()->json(['message' => 'Ítem eliminado']);
    }
}

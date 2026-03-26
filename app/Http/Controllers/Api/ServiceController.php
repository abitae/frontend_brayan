<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    private function serviceToArray(Service $s): array
    {
        return [
            'id' => (string) $s->id,
            'title' => $s->title,
            'description' => $s->description,
            'icon_type' => $s->icon_type,
            'image_url' => $s->image_url,
        ];
    }

    public function index(): JsonResponse
    {
        $services = Service::orderBy('sort_order')->get()->map(fn (Service $s) => $this->serviceToArray($s));

        return response()->json($services);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'icon_type' => 'required|string|in:Box,Home,Package',
        ]);

        $maxOrder = Service::max('sort_order') ?? -1;
        $validated['sort_order'] = $maxOrder + 1;

        $service = Service::create($validated);

        return response()->json($this->serviceToArray($service), 201);
    }

    public function update(Request $request, Service $service): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:500',
            'icon_type' => 'sometimes|string|in:Box,Home,Package',
        ]);

        $service->update($validated);

        return response()->json($this->serviceToArray($service));
    }

    public function destroy(Service $service): JsonResponse
    {
        $service->delete();

        return response()->json(['message' => 'Servicio eliminado']);
    }

    public function uploadImage(Request $request, Service $service): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:png,jpg,jpeg,webp|max:10240',
        ]);

        $file = $request->file('file');
        $ext = $file->getClientOriginalExtension();
        $name = 'service_'.$service->id.'_'.time().'.'.strtolower($ext);
        $path = $file->storeAs('uploads', $name, 'public');
        $url = Storage::disk('public')->url($path);

        $service->update(['image_url' => $url]);

        return response()->json(['url' => $url, 'service' => $this->serviceToArray($service->fresh())]);
    }
}

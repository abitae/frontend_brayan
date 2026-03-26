<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\TrackingNotFoundException;
use App\Exceptions\TrackingServerException;
use App\Http\Controllers\Controller;
use App\Services\TrackingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TrackingController extends Controller
{
    public function __construct(
        private readonly TrackingService $tracking
    ) {}

    /**
     * Consultar seguimiento por código (público). POST con captcha_token para validación.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|max:64',
            'captcha_token' => 'required|string',
        ]);

        $secret = config('services.recaptcha.secret_key');
        if (empty($secret)) {
            return response()->json(['message' => 'Completa la verificación de seguridad.'], 422);
        }

        $verify = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $secret,
            'response' => $validated['captcha_token'],
            'remoteip' => $request->ip(),
        ]);

        $body = $verify->json();
        if (! ($body['success'] ?? false)) {
            return response()->json(['message' => 'Completa la verificación de seguridad.'], 422);
        }

        // reCAPTCHA v3: validar action y score (0.0–1.0; umbral típico >= 0.5)
        $action = $body['action'] ?? '';
        $score = (float) ($body['score'] ?? 0);
        if ($action !== 'tracking' || $score < 0.5) {
            return response()->json(['message' => 'Completa la verificación de seguridad.'], 422);
        }

        try {
            $result = $this->tracking->track($validated['code']);

            return response()->json($result);
        } catch (TrackingNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (TrackingServerException $e) {
            return response()->json(['message' => $e->getMessage()], 502);
        } catch (\Throwable $e) {
            report($e);
            Log::warning('Tracking error', ['message' => $e->getMessage()]);

            return response()->json(['message' => 'Error al consultar el seguimiento. Intenta de nuevo.'], 500);
        }
    }

    /**
     * Consultar seguimiento por código (GET, sin captcha; mantener por compatibilidad).
     */
    public function show(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|max:64',
        ]);

        try {
            $result = $this->tracking->track($validated['code']);

            return response()->json($result);
        } catch (TrackingNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (TrackingServerException $e) {
            return response()->json(['message' => $e->getMessage()], 502);
        } catch (\Throwable $e) {
            report($e);
            return response()->json(['message' => 'Error al consultar el seguimiento. Intenta de nuevo.'], 500);
        }
    }
}

<?php

namespace App\Services;

use App\Models\SiteConfig;
use Gemini\Data\Content;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    /** Model that is currently available in the Gemini API (v1beta). */
    private const DEFAULT_MODEL = 'gemini-2.0-flash';

    /** Fallback if the configured model is not found (e.g. deprecated). */
    private const FALLBACK_MODEL = 'gemini-2.0-flash';

    private const DEFAULT_SYSTEM_INSTRUCTION = 'Eres el Asistente Inteligente de Brayan Brush - Corporación Logística, '
        . 'una empresa líder en Perú especializada exclusivamente en transporte terrestre por camiones. '
        . 'Tu tono es profesional, servicial y experto. '
        . 'Ayudas con: transporte de carga por carretera en Perú (Lima, Arequipa, Trujillo, etc.), '
        . 'seguridad vial, empaque para tránsito terrestre, sostenibilidad en flotas. '
        . 'Brayan Brush NO realiza envíos aéreos ni marítimos; solo logística terrestre nacional peruana. '
        . 'Cuando recibas "Contexto (consulta de rastreo realizada por el sistema)", usa esos datos para responder al usuario sobre el estado de su envío de forma clara y amable.';

    private function apiKey(): ?string
    {
        $config = SiteConfig::default();
        $key = $config->gemini_api_key ?? config('gemini.api_key');

        return $key ? (string) $key : null;
    }

    /**
     * Return the model name for the API. Ensures full model names (e.g. gemini-1.5-flash)
     * since the API rejects short names like "gemini-1.5".
     */
    private function model(): string
    {
        $config = SiteConfig::default();
        $model = trim((string) ($config->gemini_model ?? self::DEFAULT_MODEL));
        if ($model === '') {
            return self::DEFAULT_MODEL;
        }

        $normalized = match (true) {
            $model === 'gemini-1.5' => 'gemini-1.5-flash',
            $model === 'gemini-2.0' => 'gemini-2.0-flash',
            str_starts_with($model, 'gemini-1.5-') => $model,
            str_starts_with($model, 'gemini-2.0-') => $model,
            default => $model,
        };

        return $normalized;
    }

    private function systemInstruction(): string
    {
        $config = SiteConfig::default();
        $text = $config->gemini_system_instruction ?? self::DEFAULT_SYSTEM_INSTRUCTION;

        return $text ? (string) $text : self::DEFAULT_SYSTEM_INSTRUCTION;
    }

    public function isEnabled(): bool
    {
        return (bool) (SiteConfig::default()->gemini_enabled ?? true);
    }

    /**
     * Send a message to Gemini and return the generated text.
     * If $context is provided (e.g. tracking data), it is prepended so the model can use it to answer.
     *
     * @param  string  $message  User message
     * @param  string|null  $context  Optional context (e.g. result of a tracking query) to inject into the turn
     * @return string
     *
     * @throws \RuntimeException if API key is missing or request fails
     */
    public function chat(string $message, ?string $context = null): string
    {
        if (! $this->isEnabled()) {
            throw new \RuntimeException('El asistente está desactivado. Actívalo en el panel de administración.');
        }

        $apiKey = $this->apiKey();
        if (empty($apiKey)) {
            throw new \RuntimeException(
                'Asistente no configurado: falta la API key de Gemini. '
                . 'Añade GEMINI_API_KEY en el archivo .env o configúrala en Admin → Gemini IA.'
            );
        }

        $userContent = $message;
        if ($context !== null && $context !== '') {
            $userContent = "Contexto (consulta de rastreo realizada por el sistema):\n".$context."\n\nPregunta del usuario: ".$message;
        }

        $model = $this->model();

        try {
            $response = Gemini::generativeModel(model: $model)
                ->withSystemInstruction(Content::parse($this->systemInstruction()))
                ->generateContent($userContent);

            $text = $response->text();
        } catch (\Throwable $e) {
            $msg = $e->getMessage();
            $isQuotaExceeded = str_contains($msg, 'Quota exceeded')
                || str_contains($msg, 'quota')
                || str_contains($msg, 'rate-limit')
                || str_contains($msg, 'Please retry in');

            if ($isQuotaExceeded) {
                Log::warning('Gemini API quota/rate limit', ['message' => $msg]);
                throw new \RuntimeException(
                    'Se ha superado la cuota gratuita de Gemini para hoy. '
                    . 'Puedes esperar unos segundos y volver a intentar, o activar facturación en Google AI Studio (aistudio.google.com). '
                    . 'Si prefieres, cambia el asistente a ChatGPT en Admin → Asistente IA.'
                );
            }

            $isModelNotFound = (str_contains($msg, 'is not found') || str_contains($msg, 'is not supported for generateContent'))
                && $model !== self::FALLBACK_MODEL;

            if ($isModelNotFound) {
                Log::info('Gemini model not available, retrying with fallback', ['model' => $model, 'fallback' => self::FALLBACK_MODEL]);
                try {
                    $response = Gemini::generativeModel(model: self::FALLBACK_MODEL)
                        ->withSystemInstruction(Content::parse($this->systemInstruction()))
                        ->generateContent($userContent);
                    $text = $response->text();
                } catch (\Throwable $e2) {
                    Log::warning('Gemini API error (fallback failed)', ['message' => $e2->getMessage()]);
                    throw new \RuntimeException('Error del asistente: '.$e2->getMessage());
                }
            } else {
                Log::warning('Gemini API error', ['message' => $msg]);
                throw new \RuntimeException('Error del asistente: '.$msg);
            }
        }

        return $text !== null && $text !== '' ? $text : 'No pude generar una respuesta.';
    }
}

<?php

namespace App\Services;

use App\Models\SiteConfig;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAIChatService
{
    private const DEFAULT_MODEL = 'gpt-4o-mini';

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
        $key = $config->openai_api_key ?? config('services.openai.api_key');

        return $key ? (string) $key : null;
    }

    private function model(): string
    {
        $config = SiteConfig::default();
        $model = trim((string) ($config->openai_model ?? self::DEFAULT_MODEL));

        return $model !== '' ? $model : self::DEFAULT_MODEL;
    }

    private function systemInstruction(): string
    {
        $config = SiteConfig::default();
        $text = $config->openai_system_instruction ?? self::DEFAULT_SYSTEM_INSTRUCTION;

        return $text ? (string) $text : self::DEFAULT_SYSTEM_INSTRUCTION;
    }

    public function isEnabled(): bool
    {
        return (bool) (SiteConfig::default()->openai_enabled ?? true);
    }

    /**
     * Send a message to OpenAI Chat Completions and return the generated text.
     *
     * @param  string  $message  User message
     * @param  string|null  $context  Optional context (e.g. tracking data) to inject into the user message
     */
    public function chat(string $message, ?string $context = null): string
    {
        if (! $this->isEnabled()) {
            throw new \RuntimeException('El asistente ChatGPT está desactivado. Actívalo en Admin → Asistente IA.');
        }

        $apiKey = $this->apiKey();
        if (empty($apiKey)) {
            throw new \RuntimeException(
                'Asistente ChatGPT no configurado: falta la API key de OpenAI. '
                . 'Configúrala en Admin → Asistente IA (ChatGPT).'
            );
        }

        $userContent = $message;
        if ($context !== null && $context !== '') {
            $userContent = "Contexto (consulta de rastreo realizada por el sistema):\n".$context."\n\nPregunta del usuario: ".$message;
        }

        $response = Http::withToken($apiKey)
            ->timeout(60)
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => $this->model(),
                'messages' => [
                    ['role' => 'system', 'content' => $this->systemInstruction()],
                    ['role' => 'user', 'content' => $userContent],
                ],
            ]);

        if (! $response->successful()) {
            $body = $response->json();
            $errorMessage = $body['error']['message'] ?? $response->body();
            Log::warning('OpenAI API error', ['status' => $response->status(), 'body' => $response->body()]);

            if (stripos($errorMessage, 'quota') !== false || stripos($errorMessage, 'billing') !== false || stripos($errorMessage, 'exceeded') !== false) {
                throw new \RuntimeException(
                    'Se ha superado la cuota o el límite de facturación de tu cuenta de OpenAI. '
                    . 'Revisa tu plan y facturación en platform.openai.com o cambia el asistente a Google Gemini en Admin → Asistente IA.'
                );
            }

            throw new \RuntimeException('Error del asistente: '.$errorMessage);
        }

        $data = $response->json();
        $text = $data['choices'][0]['message']['content'] ?? null;

        return $text !== null && $text !== '' ? trim($text) : 'No pude generar una respuesta.';
    }
}

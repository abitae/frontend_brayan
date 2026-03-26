<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteConfig;
use App\Services\GeminiService;
use App\Services\OpenAIChatService;
use App\Services\TrackingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AssistantController extends Controller
{
    public function __construct(
        private readonly GeminiService $gemini,
        private readonly OpenAIChatService $openai,
        private readonly TrackingService $tracking
    ) {}

    /**
     * Chat with the logistics assistant (Gemini or ChatGPT, according to admin config). Public.
     * If the message mentions a tracking code, the assistant consults the external tracking endpoint
     * and uses that data to answer.
     */
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string|max:4096',
        ]);

        $message = $request->input('message');
        $trackingContext = $this->resolveTrackingContext($message);
        $provider = $this->assistantProvider();

        try {
            $text = $provider === 'chatgpt'
                ? $this->openai->chat($message, $trackingContext)
                : $this->gemini->chat($message, $trackingContext);
        } catch (\Throwable $e) {
            Log::warning('Assistant chat error', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);

            return response()->json(
                ['message' => $e->getMessage()],
                503
            );
        }

        return response()->json(['text' => $text]);
    }

    private function assistantProvider(): string
    {
        $provider = trim((string) (SiteConfig::default()->assistant_provider ?? 'gemini'));

        return in_array($provider, ['gemini', 'chatgpt'], true) ? $provider : 'gemini';
    }

    /**
     * If the user message looks like a tracking query (contains a code), call the tracking
     * endpoint and return a text summary for Gemini. Otherwise return null.
     */
    private function resolveTrackingContext(string $message): ?string
    {
        $code = $this->extractTrackingCode($message);
        if ($code === null || $code === '') {
            return null;
        }

        try {
            $result = $this->tracking->track($code);
        } catch (\Throwable $e) {
            Log::warning('Assistant tracking lookup failed', ['code' => $code, 'error' => $e->getMessage()]);

            return null;
        }

        return $this->formatTrackingForContext($result);
    }

    /**
     * Extract a potential tracking code from the message (e.g. BB-001, BB-2024-DEMO).
     * Prefers hyphenated codes; otherwise alphanumeric with at least one letter to avoid postal codes/years.
     */
    private function extractTrackingCode(string $message): ?string
    {
        $message = trim($message);
        if ($message === '') {
            return null;
        }

        // Pattern: "XX-123" or "BB-2024-DEMO" style
        if (preg_match('/\b([A-Za-z0-9]{2,}-[A-Za-z0-9-]+)\b/', $message, $m)) {
            return trim($m[1]);
        }
        // Alphanumeric 5+ chars with at least one letter (avoids "15001", "2024")
        if (preg_match('/\b([A-Za-z][A-Za-z0-9]{4,}|[A-Za-z0-9]{2,}[A-Za-z][A-Za-z0-9]*)\b/', $message, $m)) {
            return trim($m[1]);
        }

        return null;
    }

    /**
     * Format tracking result array as plain text for Gemini context.
     *
     * @param  array{code: string, status: string, status_label: string, current_location: string|null, origin: string, destination: string, estimated_delivery: string|null, progress: int, history: array}  $result
     */
    private function formatTrackingForContext(array $result): string
    {
        $lines = [
            'Código: '.($result['code'] ?? ''),
            'Estado: '.($result['status_label'] ?? $result['status'] ?? ''),
            'Ubicación actual: '.($result['current_location'] ?? 'No indicada'),
            'Origen: '.($result['origin'] ?? ''),
            'Destino: '.($result['destination'] ?? ''),
            'Entrega estimada: '.($result['estimated_delivery'] ?? 'No indicada'),
        ];

        $history = $result['history'] ?? [];
        if ($history !== []) {
            $lines[] = 'Historial:';
            foreach ($history as $h) {
                $date = $h['date'] ?? '';
                $location = $h['location'] ?? '';
                $desc = $h['desc'] ?? '';
                $lines[] = "  - {$date} | {$location} | {$desc}";
            }
        }

        return implode("\n", $lines);
    }
}

import { useState } from 'react';
import { assistantChat } from '@/api/brayan-api';

export default function SmartAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    {
      role: 'ai',
      text: '¡Hola! Soy tu asistente de Brayan Brush. ¿En qué puedo ayudarte hoy con tus envíos terrestres en Perú?',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = query;
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setLoading(true);
    try {
      const aiResponse = await assistantChat(userMsg);
      setMessages((prev) => [...prev, { role: 'ai', text: aiResponse || 'No pude procesar la solicitud.' }]);
    } catch (err) {
      const errorMessage =
        err instanceof Error && err.message
          ? err.message
          : 'Lo siento, estoy teniendo dificultades para conectarme. Intenta de nuevo más tarde.';
      setMessages((prev) => [...prev, { role: 'ai', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          <div className="bg-emerald-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">🤖</div>
              <span className="font-bold text-white">Brayan Brush AI</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 p-1 rounded-full"
            >
              ✕
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 shadow-sm border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <span className="whitespace-pre-wrap break-words">{m.text}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pregunta sobre logística en Perú..."
              className="flex-grow min-w-0 bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
            />
            <button
              type="button"
              onClick={handleSend}
              className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-500 transition-colors"
            >
              ➔
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white text-3xl hover:scale-110 transition-transform"
        >
          🤖
        </button>
      )}
    </div>
  );
}

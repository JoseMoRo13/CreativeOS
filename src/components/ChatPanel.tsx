import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw, ChevronDown, Check, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, SpecialistRole, MethodologyPhase, CreativeProject } from '../types';

interface ChatPanelProps {
  project: CreativeProject;
  activeRole: SpecialistRole;
  currentPhase: MethodologyPhase;
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onClearChat?: () => void;
}

const QUICK_PROMPTS: Record<SpecialistRole, string[]> = {
  director: [
    'Evalúa críticamente la coherencia general entre el problema y la dirección de arte.',
    '¿Qué trampas o clichés habituales amenazan este proyecto?',
    '¿Cómo podemos elevar la vara estética sin perder efectividad comercial?',
  ],
  strategy: [
    '¿Qué información crítica nos falta para no asumir nada a ciegas?',
    'Analiza la diferencia entre el problema de negocio y el problema de comunicación.',
    'Desafía el insight actual: ¿es una verdad humana o solo un dato estadístico?',
  ],
  concept: [
    'Propón una metáfora rectora audaz y no complaciente para este concepto.',
    '¿Pasaría esta idea el test de la competencia o cualquiera podría firmarla?',
    'Crea un conflicto dramático o tensión que impulse la campaña.',
  ],
  art_direction: [
    'Propón un sistema cromático de 4 colores con justificación semiótica.',
    'Define las reglas de composición y uso de espacio negativo para OOH.',
    '¿Qué tratamiento de luz y texturas táctiles evitará que se sienta como arte genérico de stock?',
  ],
  copy: [
    'Escribe 3 titulares con ritmo para vía pública que funcionen en 3 segundos.',
    'Redacta un manifiesto breve que declare la postura de la marca.',
    'Revisa este claim y quítale cualquier palabra vacía publicitaria.',
  ],
  ai_visual: [
    'Genera un prompt cinematográfico para Midjourney v6 con lente, ISO y ratio 16:9.',
    'Define los negative prompts clave para evitar la estética plástica de IA.',
    'Adapta este concepto visual a un render macro editorial en FLUX 1.1 Pro.',
  ],
};

export const ChatPanel: React.FC<ChatPanelProps> = ({
  project,
  activeRole,
  currentPhase,
  onSendMessage,
  isLoading,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [project.chatHistory, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText.trim();
    setInputText('');
    await onSendMessage(text);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentQuickPrompts = QUICK_PROMPTS[activeRole] || QUICK_PROMPTS.director;

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] border-r border-[#F4F4F4]/10">
      {/* Chat Header */}
      <div className="p-3.5 border-b border-[#F4F4F4]/10 bg-[#0A0A0A] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#151515] border border-white/10 flex items-center justify-center text-[#FF3B00]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-serif italic text-[#F4F4F4]">CreativeOS Intelligence</span>
              <span className="w-1.5 h-1.5 bg-[#FF3B00] animate-pulse" />
            </div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
              Role: {activeRole.toUpperCase()} // Phase: {currentPhase.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Phase Badge */}
        <div className="text-[9px] uppercase tracking-widest px-2.5 py-1 bg-[#151515] text-[#FF3B00] border border-[#FF3B00]/40 font-mono">
          Live Studio
        </div>
      </div>

      {/* Critical Guidance Notice */}
      <div className="px-4 py-2 bg-[#151515] border-b border-white/10 border-l-2 border-[#FF3B00] flex items-center gap-2 text-[10px] text-white/70 font-mono">
        <AlertCircle className="w-3.5 h-3.5 text-[#FF3B00] shrink-0" />
        <span className="truncate">
          CRITERIO: Si una ruta es complaciente o clichada, CreativeOS exigirá tensión y contraste.
        </span>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {project.chatHistory.map((msg) => {
          const isAI = msg.sender === 'creativeos';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                {isAI ? (
                  <>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#FF3B00]">
                      CreativeOS // {msg.role || activeRole}
                    </span>
                  </>
                ) : (
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
                    Art Director Brief
                  </span>
                )}
                <span className="text-[9px] font-mono text-white/30">{msg.timestamp}</span>
              </div>

              <div
                className={`relative group max-w-[92%] p-4 text-xs leading-relaxed ${
                  isAI
                    ? 'bg-[#151515] border border-white/10 border-t-2 border-t-[#FF3B00] text-[#F4F4F4]'
                    : 'bg-[#1E1E1E] border border-white/20 text-[#F4F4F4] font-normal'
                }`}
              >
                {/* Copy response button */}
                {isAI && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-black/60 hover:bg-black text-white/60 hover:text-white cursor-pointer border border-white/10"
                    title="Copiar texto"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-[#FF3B00]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}

                {isAI ? (
                  <div className="prose prose-invert prose-xs max-w-none space-y-2 text-[#F4F4F4]/90 [&_h1]:font-serif [&_h1]:italic [&_h2]:font-serif [&_h2]:italic [&_h3]:font-serif [&_strong]:text-[#FF3B00] [&_blockquote]:border-l-[#FF3B00] [&_blockquote]:italic [&_blockquote]:font-serif">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap font-sans text-white/90">{msg.text}</p>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-center gap-1.5 px-1">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#FF3B00]">
                CreativeOS // Reasoning
              </span>
            </div>
            <div className="bg-[#151515] border border-white/10 border-t-2 border-t-[#FF3B00] p-4 flex items-center gap-2.5">
              <div className="w-2 h-2 bg-[#FF3B00] animate-ping" />
              <span className="text-xs font-serif italic text-white/70">
                Razonando: Información → Problema → Oportunidad → Dirección de Arte...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-4 pt-2.5 pb-2 border-t border-[#F4F4F4]/10 bg-[#0A0A0A]">
        <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1.5 flex items-center justify-between">
          <span>Inquiries // {activeRole}:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {currentQuickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => onSendMessage(prompt)}
              className="text-[10px] bg-[#151515] hover:bg-[#202020] text-white/75 hover:text-[#FF3B00] border border-white/10 hover:border-[#FF3B00]/60 px-3 py-1 whitespace-nowrap transition-all cursor-pointer shrink-0 text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3.5 bg-[#0A0A0A] border-t border-[#F4F4F4]/10">
        <div className="flex items-center gap-2">
          <input
            id="creative-chat-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Discute con CreativeOS (${activeRole.toUpperCase()} en fase ${currentPhase})...`}
            className="flex-1 bg-[#151515] border border-white/10 px-3.5 py-2 text-xs text-[#F4F4F4] placeholder-white/30 focus:outline-none focus:border-[#FF3B00] transition-all"
            disabled={isLoading}
          />
          <button
            id="send-chat-btn"
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-3.5 py-2 bg-[#FF3B00] hover:bg-[#ff5522] disabled:bg-neutral-800 text-[#0A0A0A] disabled:text-neutral-500 font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
            title="Enviar mensaje"
          >
            <Send className="w-3.5 h-3.5 font-bold" />
          </button>
        </div>
      </form>
    </div>
  );
};

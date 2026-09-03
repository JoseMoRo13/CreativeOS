import React, { useState } from 'react';
import { Palette, Type, Layout, Sun, Camera, Copy, Check, Sparkles, Image as ImageIcon, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { ArtDirectionSystem } from '../types';

interface ArtDirectionStudioProps {
  artDirection?: ArtDirectionSystem;
  brandName: string;
  selectedTerritoryName?: string;
  onGenerateArtDirection: () => void;
  isGenerating: boolean;
  onGenerateImageConcept: (prompt: string, promptIndex: number) => Promise<void>;
  isGeneratingImage: boolean;
}

export const ArtDirectionStudio: React.FC<ArtDirectionStudioProps> = ({
  artDirection,
  brandName,
  selectedTerritoryName,
  onGenerateArtDirection,
  isGenerating,
  onGenerateImageConcept,
  isGeneratingImage,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleCopyPrompt = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPromptIndex(idx);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  if (!artDirection) {
    return (
      <div className="p-12 text-center bg-[#0A0A0A] border border-white/10 space-y-4">
        <Palette className="w-8 h-8 text-[#FF3B00] mx-auto" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-mono block">
          Phase 05 // Art Direction Studio
        </span>
        <h3 className="text-2xl font-serif italic text-[#F4F4F4]">
          Universo Visual Pendiente de Generación
        </h3>
        <p className="text-xs text-white/50 max-w-md mx-auto leading-relaxed">
          Para profundizar en la dirección de arte con rigor metodológico, primero seleccionamos el territorio ({selectedTerritoryName || 'Territorio Seleccionado'}) y luego generamos el sistema visual completo.
        </p>
        <button
          onClick={onGenerateArtDirection}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-[#FF3B00] hover:bg-[#ff5522] disabled:bg-neutral-800 text-[#0A0A0A] disabled:text-neutral-500 font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm"
        >
          {isGenerating ? 'Profundizando Sistema Visual...' : 'Generar Sistema de Dirección de Arte'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Visual Concept Banner */}
      <div className="p-6 bg-[#0A0A0A] border border-[#F4F4F4]/10 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF3B00] animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF3B00]">
              Concepto Visual Rector // {selectedTerritoryName || 'Sistema Central'}
            </span>
          </div>

          <button
            onClick={onGenerateArtDirection}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-[#F4F4F4]/30 hover:border-[#F4F4F4] text-[#F4F4F4] hover:bg-[#F4F4F4] hover:text-[#0A0A0A] text-[10px] uppercase tracking-widest transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Regenerando...' : 'Regenerar Sistema'}</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[#F4F4F4] leading-snug">
          "{artDirection.visualConcept}"
        </h2>
      </div>

      {/* 1. Interactive Color Palette */}
      <div className="p-6 bg-[#0A0A0A] border border-[#F4F4F4]/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif text-[#FF3B00]">01</span>
            <h4 className="text-[11px] font-bold text-[#F4F4F4] uppercase tracking-widest">
              Paleta Cromática & Semiótica del Color
            </h4>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono">
            Haz clic en un swatch para copiar el código hex
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {artDirection.colorPalette.map((color) => {
            const isCopied = copiedHex === color.hex;

            return (
              <div
                key={color.hex}
                onClick={() => handleCopyHex(color.hex)}
                className="group relative flex flex-col justify-between p-3.5 border border-white/10 bg-[#151515] hover:border-[#FF3B00] transition-all cursor-pointer"
              >
                {/* Visual Swatch */}
                <div
                  className="w-full h-16 mb-3 border border-white/10 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: color.hex }}
                >
                  <span
                    className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity px-2 py-0.5 bg-black/80 text-white"
                  >
                    {isCopied ? '¡Copiado!' : 'Copiar'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif tracking-tight text-[#F4F4F4] truncate">
                      {color.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#FF3B00]">
                      {color.hex}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/60 font-serif italic mt-1.5 leading-tight">
                    {color.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Typography Pairing */}
      <div className="p-6 bg-[#0A0A0A] border border-[#F4F4F4]/10 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="text-xs font-serif text-[#FF3B00]">02</span>
          <h4 className="text-[11px] font-bold text-[#F4F4F4] uppercase tracking-widest">
            Sistema Tipográfico & Jerarquía Visual
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Display Font */}
          <div className="p-4 bg-[#151515] border border-white/10 space-y-2">
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#FF3B00] block">
              Display / Headlines
            </span>
            <div className="text-3xl font-serif italic text-[#F4F4F4] tracking-tight">
              {artDirection.typography.displayFont}
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              {artDirection.typography.displayUsage}
            </p>
          </div>

          {/* Body Font */}
          <div className="p-4 bg-[#151515] border border-white/10 space-y-2">
            <span className="text-[9px] uppercase font-mono tracking-widest text-white/40 block">
              Reading Body / Text
            </span>
            <div className="text-xl font-medium text-white/90 font-sans">
              {artDirection.typography.bodyFont}
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              {artDirection.typography.bodyUsage}
            </p>
          </div>
        </div>

        {/* Pairing Rationale */}
        <div className="p-4 bg-[#151515] border-t-2 border-[#FF3B00] text-xs text-white/80">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF3B00] block mb-1">
            Diálogo Tipográfico // Rationale
          </span>
          <p className="font-serif italic text-[#F4F4F4] leading-relaxed">
            "{artDirection.typography.hierarchyRationale}"
          </p>
        </div>
      </div>

      {/* 3. Composition, Lighting & Texture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Composition */}
        <div className="p-6 bg-[#0A0A0A] border border-[#F4F4F4]/10 space-y-3">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="text-xs font-serif text-[#FF3B00]">03</span>
            <h4 className="text-[11px] font-bold text-[#F4F4F4] uppercase tracking-widest">
              Composición & Encuadres
            </h4>
          </div>
          <div className="space-y-3 text-xs text-white/70 font-sans">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-0.5">Encuadre:</span>
              <p className="text-[#F4F4F4]">{artDirection.composition.framingRules}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-0.5">Espacio Negativo:</span>
              <p className="text-[#F4F4F4]">{artDirection.composition.negativeSpace}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-0.5">Retícula:</span>
              <p className="text-[#F4F4F4]">{artDirection.composition.gridStyle}</p>
            </div>
          </div>
        </div>

        {/* Lighting & Materials */}
        <div className="p-6 bg-[#0A0A0A] border border-[#F4F4F4]/10 space-y-3">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="text-xs font-serif text-[#FF3B00]">04</span>
            <h4 className="text-[11px] font-bold text-[#F4F4F4] uppercase tracking-widest">
              Iluminación, Óptica & Textura
            </h4>
          </div>
          <div className="space-y-3 text-xs text-white/70 font-sans">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-0.5">Luz:</span>
              <p className="text-[#F4F4F4]">{artDirection.lightingAndTexture.lightingStyle}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-0.5">Texturas & Materiales:</span>
              <p className="text-[#F4F4F4]">{artDirection.lightingAndTexture.textureTreatment}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-0.5">Óptica Sugerida:</span>
              <p className="text-[#F4F4F4]">{artDirection.lightingAndTexture.lensRecommendation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Applications across Media */}
      <div className="p-6 bg-[#0A0A0A] border border-[#F4F4F4]/10 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="text-xs font-serif text-[#FF3B00]">05</span>
          <h4 className="text-[11px] font-bold text-[#F4F4F4] uppercase tracking-widest">
            Aplicaciones en Medios Reales
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#151515] border border-white/10">
            <span className="text-[9px] uppercase tracking-widest text-[#FF3B00] font-mono block mb-1.5">
              Vía Pública / OOH
            </span>
            <p className="text-xs text-white/75 leading-relaxed">
              {artDirection.applications.ooh}
            </p>
          </div>

          <div className="p-4 bg-[#151515] border border-white/10">
            <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono block mb-1.5">
              Film / Audiovisual
            </span>
            <p className="text-xs text-white/75 leading-relaxed">
              {artDirection.applications.audiovisual}
            </p>
          </div>

          <div className="p-4 bg-[#151515] border border-white/10">
            <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono block mb-1.5">
              Digital / Interactivo
            </span>
            <p className="text-xs text-white/75 leading-relaxed">
              {artDirection.applications.digital}
            </p>
          </div>
        </div>
      </div>

      {/* 5. AI Prompt Studio & Live Visualizer */}
      <div className="p-6 bg-[#0A0A0A] border border-[#F4F4F4]/10 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif text-[#FF3B00]">06</span>
            <h4 className="text-[11px] font-bold text-[#F4F4F4] uppercase tracking-widest">
              Laboratorio de Prompts de IA & Producción Latente
            </h4>
          </div>
          <span className="text-[9px] text-[#FF3B00] font-mono uppercase tracking-widest">
            Engine: Midjourney v6 / FLUX 1.1 / Imagen
          </span>
        </div>

        <div className="space-y-4">
          {artDirection.aiPrompts.map((aiPrompt, idx) => {
            const isCopied = copiedPromptIndex === idx;

            return (
              <div
                key={idx}
                className="p-5 bg-[#121212] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-serif italic text-[#F4F4F4]">
                    {aiPrompt.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyPrompt(aiPrompt.prompt, idx)}
                      className="flex items-center gap-1 text-[10px] uppercase tracking-widest px-3 py-1 bg-transparent border border-white/20 hover:border-white text-white transition-all cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-[#FF3B00]" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onGenerateImageConcept(aiPrompt.prompt, idx)}
                      disabled={isGeneratingImage}
                      className="flex items-center gap-1 text-[10px] uppercase tracking-widest px-3 py-1 bg-[#FF3B00] hover:bg-[#ff5522] disabled:bg-neutral-800 text-[#0A0A0A] disabled:text-neutral-500 font-bold transition-all cursor-pointer shadow-sm disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{isGeneratingImage ? 'Renderizando...' : 'Renderizar Visual'}</span>
                    </button>
                  </div>
                </div>

                {/* Prompt Text */}
                <div className="p-3.5 bg-[#0A0A0A] border border-white/10 font-mono text-[11px] text-[#F4F4F4] leading-relaxed break-words">
                  {aiPrompt.prompt}
                </div>

                {/* Parameters & Negative Prompt */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
                  <div className="p-2.5 bg-[#151515] border border-white/10">
                    <span className="font-mono uppercase tracking-widest text-[#FF3B00] block mb-1">Parámetros Ópticos:</span>
                    <code className="text-white/80 font-mono">{aiPrompt.parameters}</code>
                  </div>
                  <div className="p-2.5 bg-[#151515] border border-white/10">
                    <span className="font-mono uppercase tracking-widest text-white/40 block mb-1">Negative Prompt:</span>
                    <span className="text-white/60">{aiPrompt.negativePrompt}</span>
                  </div>
                </div>

                {/* Generated Visual Concept (if any) */}
                {aiPrompt.generatedImage && (
                  <div className="mt-4 border border-white/10">
                    <div className="p-2.5 bg-[#151515] flex items-center justify-between text-[10px] uppercase tracking-widest text-white/60 border-b border-white/10">
                      <span className="flex items-center gap-1.5 font-mono text-[#FF3B00]">
                        <ImageIcon className="w-3.5 h-3.5" /> Render Concept // Art Direction
                      </span>
                      <a
                        href={aiPrompt.generatedImage}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-white/40 hover:text-white"
                      >
                        Ver Fullscreen <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="relative bg-[#0A0A0A] flex items-center justify-center max-h-[440px] overflow-hidden">
                      <img
                        src={aiPrompt.generatedImage}
                        alt={aiPrompt.title}
                        className="w-full h-auto object-cover max-h-[440px]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

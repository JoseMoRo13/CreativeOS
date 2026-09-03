import React from 'react';
import { Sparkles, Edit3, Check, Search, Target, Lightbulb, Compass, Award, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { MethodologyPhase, CreativeProject } from '../types';
import { TerritoriesMatrix } from './TerritoriesMatrix';
import { ArtDirectionStudio } from './ArtDirectionStudio';

interface MethodologyWorkspaceProps {
  project: CreativeProject;
  onGenerateStep: (step: MethodologyPhase) => Promise<void>;
  isGeneratingStep: boolean;
  onSelectTerritory: (territoryId: string) => void;
  onGenerateTerritories: () => void;
  isGeneratingTerritories: boolean;
  onGenerateArtDirection: () => void;
  isGeneratingArtDirection: boolean;
  onGenerateImageConcept: (prompt: string, promptIndex: number) => Promise<void>;
  isGeneratingImage: boolean;
  onSelectPhase: (phase: MethodologyPhase) => void;
}

export const MethodologyWorkspace: React.FC<MethodologyWorkspaceProps> = ({
  project,
  onGenerateStep,
  isGeneratingStep,
  onSelectTerritory,
  onGenerateTerritories,
  isGeneratingTerritories,
  onGenerateArtDirection,
  isGeneratingArtDirection,
  onGenerateImageConcept,
  isGeneratingImage,
  onSelectPhase,
}) => {
  const phase = project.currentPhase;

  // Selected territory object
  const selectedTerritory = project.territories.find(
    (t) => t.id === project.selectedTerritoryId
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-[#0A0A0A]">
      {/* Project Overview Card */}
      <div className="p-5 md:p-6 bg-[#0A0A0A] border border-[#F4F4F4]/10 relative">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-white/10 pb-4 mb-4">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF3B00] block mb-1">
              Active Session Brief //
            </span>
            <h2 className="text-2xl md:text-3xl font-serif italic tracking-tight text-[#F4F4F4]">
              {project.brand}
            </h2>
            <p className="text-xs text-white/50 mt-0.5">{project.category}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-[#151515] text-[#F4F4F4] border border-white/10 font-mono">
              Audience: {project.targetAudience.slice(0, 35)}...
            </span>
          </div>
        </div>

        <div>
          <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1.5 font-mono">
            Creative Challenge & Context //
          </span>
          <p className="text-xs text-[#F4F4F4]/80 leading-relaxed font-sans">
            {project.brief}
          </p>
        </div>
      </div>

      {/* PHASE 1: DESCUBRIR */}
      {phase === 'descubrir' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 bg-[#0A0A0A] border border-[#F4F4F4]/10">
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#FF3B00] font-mono block mb-1">
                Methodology // Phase 01
              </span>
              <h3 className="text-2xl font-serif italic tracking-tight text-[#F4F4F4]">
                Descubrir: Contexto & Vacíos de Información
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Identifica qué se necesita, por qué, para quién y qué preguntas críticas no están resueltas.
              </p>
            </div>

            <button
              onClick={() => onGenerateStep('descubrir')}
              disabled={isGeneratingStep}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF3B00] hover:bg-[#ff5522] disabled:bg-neutral-800 text-[#0A0A0A] disabled:text-neutral-500 font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingStep ? 'Auditando...' : 'Auditar y Descubrir'}</span>
            </button>
          </div>

          <div className="p-6 bg-[#121212] border border-white/10">
            {project.discoveryNotes ? (
              <div className="prose prose-invert prose-xs max-w-none space-y-3 text-[#F4F4F4]/90 [&_h1]:font-serif [&_h1]:italic [&_h2]:font-serif [&_h2]:italic [&_h3]:font-serif [&_strong]:text-[#FF3B00] [&_blockquote]:border-l-[#FF3B00] [&_blockquote]:italic [&_blockquote]:font-serif">
                <ReactMarkdown>{project.discoveryNotes}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-12 text-white/40 text-xs font-serif italic">
                Haz clic en "Auditar y Descubrir" para que CreativeOS desmonte el brief e identifique los vacíos clave.
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => onSelectPhase('definir')}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#F4F4F4] hover:bg-[#F4F4F4] hover:text-[#0A0A0A] text-[#F4F4F4] text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-all"
            >
              <span>Avanzar a Fase 02: Definir</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: DEFINIR */}
      {phase === 'definir' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 bg-[#0A0A0A] border border-[#F4F4F4]/10">
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#FF3B00] font-mono block mb-1">
                Methodology // Phase 02
              </span>
              <h3 className="text-2xl font-serif italic tracking-tight text-[#F4F4F4]">
                Definir: Diagnóstico Creativo
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Convierte la información en un diagnóstico: Problema de comunicación, Objetivo y Oportunidad.
              </p>
            </div>

            <button
              onClick={() => onGenerateStep('definir')}
              disabled={isGeneratingStep}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF3B00] hover:bg-[#ff5522] disabled:bg-neutral-800 text-[#0A0A0A] disabled:text-neutral-500 font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingStep ? 'Diagnosticando...' : 'Generar Diagnóstico'}</span>
            </button>
          </div>

          <div className="p-6 bg-[#121212] border border-white/10">
            {project.definitionNotes ? (
              <div className="prose prose-invert prose-xs max-w-none space-y-3 text-[#F4F4F4]/90 [&_h1]:font-serif [&_h1]:italic [&_h2]:font-serif [&_h2]:italic [&_h3]:font-serif [&_strong]:text-[#FF3B00] [&_blockquote]:border-l-[#FF3B00] [&_blockquote]:italic [&_blockquote]:font-serif">
                <ReactMarkdown>{project.definitionNotes}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-12 text-white/40 text-xs font-serif italic">
                Haz clic en "Generar Diagnóstico" para convertir la información en un análisis crítico.
              </div>
            )}
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => onSelectPhase('descubrir')}
              className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white cursor-pointer"
            >
              ← Volver a Descubrir
            </button>
            <button
              onClick={() => onSelectPhase('insight')}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#F4F4F4] hover:bg-[#F4F4F4] hover:text-[#0A0A0A] text-[#F4F4F4] text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-all"
            >
              <span>Avanzar a Fase 03: Insight</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3: INSIGHT */}
      {phase === 'insight' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 bg-[#0A0A0A] border border-[#F4F4F4]/10">
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#FF3B00] font-mono block mb-1">
                Methodology // Phase 03
              </span>
              <h3 className="text-2xl font-serif italic tracking-tight text-[#F4F4F4]">
                Insight: Verdad Humana & Tensión Cultural
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Busca una verdad humana, cultural o emocional que permita construir la idea (Dato estadístico ≠ Insight).
              </p>
            </div>

            <button
              onClick={() => onGenerateStep('insight')}
              disabled={isGeneratingStep}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF3B00] hover:bg-[#ff5522] disabled:bg-neutral-800 text-[#0A0A0A] disabled:text-neutral-500 font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingStep ? 'Destilando Insight...' : 'Destilar Insight'}</span>
            </button>
          </div>

          <div className="p-6 bg-[#121212] border border-white/10">
            {project.insightNotes ? (
              <div className="prose prose-invert prose-xs max-w-none space-y-3 text-[#F4F4F4]/90 [&_h1]:font-serif [&_h1]:italic [&_h2]:font-serif [&_h2]:italic [&_h3]:font-serif [&_strong]:text-[#FF3B00] [&_blockquote]:border-l-[#FF3B00] [&_blockquote]:italic [&_blockquote]:font-serif">
                <ReactMarkdown>{project.insightNotes}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-12 text-white/40 text-xs font-serif italic">
                Haz clic en "Destilar Insight" para extraer la tensión cultural y humana del proyecto.
              </div>
            )}
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => onSelectPhase('definir')}
              className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white cursor-pointer"
            >
              ← Volver a Definir
            </button>
            <button
              onClick={() => onSelectPhase('territorios')}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#F4F4F4] hover:bg-[#F4F4F4] hover:text-[#0A0A0A] text-[#F4F4F4] text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-all"
            >
              <span>Avanzar a Fase 04: Territorios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 4: TERRITORIOS */}
      {phase === 'territorios' && (
        <div className="space-y-4">
          <TerritoriesMatrix
            territories={project.territories}
            selectedTerritoryId={project.selectedTerritoryId}
            onSelectTerritory={onSelectTerritory}
            onGenerateTerritories={onGenerateTerritories}
            isGenerating={isGeneratingTerritories}
          />

          <div className="flex justify-between pt-4">
            <button
              onClick={() => onSelectPhase('insight')}
              className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white cursor-pointer"
            >
              ← Volver a Insight
            </button>
            <button
              onClick={() => onSelectPhase('profundizar')}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF3B00] hover:bg-[#ff5522] text-[#0A0A0A] text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-all"
            >
              <span>Avanzar a Fase 05: Profundizar Dirección de Arte</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 5: PROFUNDIZAR / DIRECCIÓN DE ARTE */}
      {phase === 'profundizar' && (
        <div className="space-y-4">
          <ArtDirectionStudio
            artDirection={project.artDirection}
            brandName={project.brand}
            selectedTerritoryName={selectedTerritory?.name}
            onGenerateArtDirection={onGenerateArtDirection}
            isGenerating={isGeneratingArtDirection}
            onGenerateImageConcept={onGenerateImageConcept}
            isGeneratingImage={isGeneratingImage}
          />

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => onSelectPhase('territorios')}
              className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white cursor-pointer"
            >
              ← Volver a Territorios
            </button>
            <div className="text-[10px] uppercase tracking-widest text-[#FF3B00] font-mono flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#FF3B00]" />
              <span>Metodología Completa Desarrollada</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

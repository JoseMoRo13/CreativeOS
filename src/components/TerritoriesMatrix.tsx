import React from 'react';
import { Compass, Check, AlertTriangle, Eye, Sparkles, MessageSquare } from 'lucide-react';
import { CreativeTerritory } from '../types';

interface TerritoriesMatrixProps {
  territories: CreativeTerritory[];
  selectedTerritoryId?: string;
  onSelectTerritory: (territoryId: string) => void;
  onGenerateTerritories: () => void;
  isGenerating: boolean;
}

export const TerritoriesMatrix: React.FC<TerritoriesMatrixProps> = ({
  territories,
  selectedTerritoryId,
  onSelectTerritory,
  onGenerateTerritories,
  isGenerating,
}) => {
  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-[#0A0A0A] border border-[#F4F4F4]/10">
        <div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#FF3B00] font-mono block mb-1">
            Methodology // Phase 04
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif italic tracking-tight text-[#F4F4F4]">
            Territorios Creativos Contrastantes
          </h2>
          <p className="text-xs text-white/50 mt-1 max-w-xl">
            Rutas conceptuales no redundantes, con fundamento estratégico y dirección visual autónoma.
          </p>
        </div>

        <button
          id="generate-territories-btn"
          onClick={onGenerateTerritories}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF3B00] hover:bg-[#ff5522] disabled:bg-neutral-800 text-[#0A0A0A] disabled:text-neutral-500 text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isGenerating ? 'Explorando Territorios...' : 'Explorar 3 Territorios'}</span>
        </button>
      </div>

      {/* Grid of Territories */}
      {territories.length === 0 ? (
        <div className="p-12 text-center bg-[#0A0A0A] border border-white/10">
          <Compass className="w-8 h-8 text-[#FF3B00] mx-auto mb-3" />
          <h3 className="text-lg font-serif italic text-[#F4F4F4] mb-1">
            Sin Territorios Generados Aún
          </h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto mb-4">
            Inicia la exploración conceptual para que CreativeOS proponga tres territorios contrastantes basados en el brief y el insight.
          </p>
          <button
            onClick={onGenerateTerritories}
            className="px-4 py-2 border border-[#F4F4F4] text-[10px] uppercase tracking-widest text-[#F4F4F4] hover:bg-[#F4F4F4] hover:text-[#0A0A0A] transition-all cursor-pointer"
          >
            Generar Territorios
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {territories.map((territory, index) => {
            const isSelected = territory.id === selectedTerritoryId;

            return (
              <section
                key={territory.id}
                className={`relative flex flex-col justify-between border p-6 transition-all ${
                  isSelected
                    ? 'border-[#FF3B00] bg-[#101010] ring-1 ring-[#FF3B00]'
                    : 'border-[#F4F4F4]/10 bg-[#0A0A0A] hover:border-white/20'
                }`}
              >
                {/* Floating Tag */}
                <div className="absolute -top-3 left-6 bg-[#0A0A0A] px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-[#FF3B00] font-mono border border-white/10">
                  {isSelected ? `Territory 0${index + 1} Selected` : `Territory 0${index + 1}`}
                </div>

                <div>
                  {/* Title & Risk Factor */}
                  <div className="flex justify-between items-baseline mb-2 pt-1">
                    <h3 className="text-2xl font-serif tracking-tight text-[#F4F4F4]">
                      {territory.name}
                    </h3>
                    <span className="text-[10px] font-mono text-white/40 uppercase">
                      PATH: 0{index + 1}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-[#FF3B00] font-serif italic mb-4">
                    "{territory.tagline}"
                  </p>

                  {/* Central Idea Description */}
                  <p className="text-xs leading-relaxed text-white/70 mb-5">
                    {territory.centralIdea}
                  </p>

                  {/* Insight Quote Box */}
                  <div className="border border-white/10 bg-[#151515] p-3.5 mb-4">
                    <div className="text-[9px] uppercase tracking-widest text-white/40 mb-1.5 font-mono">
                      Primary Insight
                    </div>
                    <div className="text-xs font-serif italic text-[#F4F4F4] leading-snug">
                      "{territory.insight}"
                    </div>
                  </div>

                  {/* Visual Hooks & Dot Grid */}
                  <div className="border border-white/10 bg-[#151515] p-3.5 mb-4">
                    <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/40 mb-1.5 font-mono">
                      <span>Visual Hooks // Art Dir</span>
                      <span className="text-[#FF3B00]">10x10 GRID</span>
                    </div>
                    <div className="h-6 w-full bg-editorial-dots mb-2 border border-white/5 opacity-80" />
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      {territory.visualPotential}
                    </p>
                  </div>

                  {/* Narrative Potential */}
                  <div className="border border-white/10 bg-[#151515] p-3.5 mb-4">
                    <div className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-mono">
                      Narrative Tension
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      {territory.narrativePotential}
                    </p>
                  </div>

                  {/* CreativeOS Editorial Critique */}
                  <div className="p-3.5 bg-[#151515] border-t-2 border-[#FF3B00] mb-5">
                    <div className="text-[9px] uppercase tracking-widest text-[#FF3B00] font-bold mb-1 font-mono">
                      Art Direction Critique
                    </div>
                    <p className="text-xs text-white/80 italic font-serif leading-relaxed">
                      "{territory.critique}"
                    </p>
                  </div>
                </div>

                {/* Bottom Footer & Selection Action Button */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                  <button
                    onClick={() => onSelectTerritory(territory.id)}
                    className={`w-full py-2.5 px-4 text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-[#F4F4F4] text-[#0A0A0A] hover:bg-white'
                        : 'bg-transparent border border-[#F4F4F4] text-[#F4F4F4] hover:bg-[#F4F4F4] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>
                      {isSelected ? 'Territorio Seleccionado' : 'Bloquear para Dirección de Arte'}
                    </span>
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};

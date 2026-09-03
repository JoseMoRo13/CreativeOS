import React from 'react';
import { Search, Target, Lightbulb, Compass, Award, ArrowRight, ShieldAlert } from 'lucide-react';
import { MethodologyPhase } from '../types';

interface MethodologyStepperProps {
  currentPhase: MethodologyPhase;
  onSelectPhase: (phase: MethodologyPhase) => void;
}

interface PhaseConfig {
  id: MethodologyPhase;
  number: string;
  name: string;
  tagline: string;
  icon: React.ElementType;
}

const PHASES: PhaseConfig[] = [
  {
    id: 'descubrir',
    number: '01',
    name: 'Descubrir',
    tagline: 'Contexto & Vacíos',
    icon: Search,
  },
  {
    id: 'definir',
    number: '02',
    name: 'Definir',
    tagline: 'Diagnóstico Creativo',
    icon: Target,
  },
  {
    id: 'insight',
    number: '03',
    name: 'Insight',
    tagline: 'Verdad Humana',
    icon: Lightbulb,
  },
  {
    id: 'territorios',
    number: '04',
    name: 'Territorios',
    tagline: 'Rutas Contrastantes',
    icon: Compass,
  },
  {
    id: 'profundizar',
    number: '05',
    name: 'Profundizar',
    tagline: 'Dirección de Arte & Sistema',
    icon: Award,
  },
];

export const MethodologyStepper: React.FC<MethodologyStepperProps> = ({
  currentPhase,
  onSelectPhase,
}) => {
  const currentIndex = PHASES.findIndex((p) => p.id === currentPhase);

  return (
    <div className="w-full bg-[#0A0A0A] border-b border-[#F4F4F4]/10 px-4 lg:px-8 py-2.5">
      <div className="w-full flex flex-col gap-2.5">
        {/* Core Principle & Reasoning Chain */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF3B00] animate-pulse rounded-none" />
            <span className="text-white/40 tracking-[0.25em]">
              Principle //
            </span>
            <span className="text-[#F4F4F4] font-serif italic text-sm tracking-normal normal-case">
              "No crear antes de entender"
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[9px] font-mono tracking-widest text-white/40">
            <span>METHODOLOGY:</span>
            <span className="text-white/70">INFO</span>
            <ArrowRight className="w-2.5 h-2.5 text-white/30" />
            <span className="text-white/70">PROBLEM</span>
            <ArrowRight className="w-2.5 h-2.5 text-white/30" />
            <span className="text-white/70">OPPORTUNITY</span>
            <ArrowRight className="w-2.5 h-2.5 text-white/30" />
            <span className="text-[#FF3B00]">INSIGHT</span>
            <ArrowRight className="w-2.5 h-2.5 text-white/30" />
            <span className="text-white/70">CONCEPT</span>
            <ArrowRight className="w-2.5 h-2.5 text-white/30" />
            <span className="text-[#FF3B00]">ART DIRECTION</span>
            <ArrowRight className="w-2.5 h-2.5 text-white/30" />
            <span className="text-white/90 font-bold">EXECUTION</span>
          </div>
        </div>

        {/* The 5 Editorial Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1">
          {PHASES.map((phase, idx) => {
            const isActive = phase.id === currentPhase;
            const isCompleted = idx < currentIndex;

            return (
              <button
                key={phase.id}
                id={`step-button-${phase.id}`}
                onClick={() => onSelectPhase(phase.id)}
                className={`relative text-left p-2.5 sm:p-3 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#151515] border-[#FF3B00] text-[#F4F4F4]'
                    : isCompleted
                    ? 'bg-[#0E0E0E] border-white/10 hover:border-white/20 text-[#F4F4F4]/80'
                    : 'bg-[#0A0A0A] border-white/5 hover:border-white/10 text-white/40'
                }`}
              >
                {/* Top active indicator line */}
                {isActive && (
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF3B00]" />
                )}

                <div className="flex items-start gap-2.5">
                  <span
                    className={`font-serif text-2xl leading-none ${
                      isActive
                        ? 'text-[#FF3B00]'
                        : isCompleted
                        ? 'text-[#F4F4F4]/90'
                        : 'text-white/20'
                    }`}
                  >
                    {idx + 1}
                  </span>

                  <div className="overflow-hidden">
                    <div className="text-[11px] font-bold uppercase tracking-wider truncate">
                      {phase.name}
                    </div>
                    <div className="text-[9px] uppercase tracking-widest mt-0.5 truncate">
                      {isActive ? (
                        <span className="text-[#FF3B00] font-bold animate-pulse">
                          Active Phase
                        </span>
                      ) : isCompleted ? (
                        <span className="text-white/40">Completed</span>
                      ) : (
                        <span className="text-white/25">{phase.tagline}</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

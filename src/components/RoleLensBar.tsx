import React from 'react';
import { Brain, Lightbulb, Palette, PenTool, Bot, Sparkles } from 'lucide-react';
import { SpecialistRole } from '../types';

interface RoleLensBarProps {
  activeRole: SpecialistRole;
  onSelectRole: (role: SpecialistRole) => void;
}

interface RoleConfig {
  id: SpecialistRole;
  num: string;
  name: string;
  shortLabel: string;
  subLabel: string;
  icon: React.ElementType;
  description: string;
}

const ROLES: RoleConfig[] = [
  {
    id: 'director',
    num: '00',
    name: 'Omni Director',
    shortLabel: 'Director',
    subLabel: 'Creative Direction',
    icon: Sparkles,
    description: 'Coordina los 5 perfiles para balancear estrategia, concepto, arte, copy y producción de IA.',
  },
  {
    id: 'strategy',
    num: '01',
    name: 'Brand Strategy',
    shortLabel: 'Strategy',
    subLabel: 'Insights & Logic',
    icon: Brain,
    description: 'Diagnóstico del problema, tensiones culturales, oportunidades de negocio e insights.',
  },
  {
    id: 'concept',
    num: '02',
    name: 'Concept Direction',
    shortLabel: 'Concept',
    subLabel: 'The Territory',
    icon: Lightbulb,
    description: 'Grandes ideas, metáforas rectoras y territorios creativos contrastantes.',
  },
  {
    id: 'art_direction',
    num: '03',
    name: 'Art Direction',
    shortLabel: 'Art Direction',
    subLabel: 'Visual Systems',
    icon: Palette,
    description: 'Paleta cromática con justificación semiótica, tipografía, composición, luz y texturas.',
  },
  {
    id: 'copy',
    num: '04',
    name: 'Copy & Narrative',
    shortLabel: 'Copy & Story',
    subLabel: 'Narrative Voice',
    icon: PenTool,
    description: 'Claims rectores, manifiestos de marca, titulares con ritmo y storytelling.',
  },
  {
    id: 'ai_visual',
    num: '05',
    name: 'AI Visual Prompter',
    shortLabel: 'AI Visual',
    subLabel: 'Latent Production',
    icon: Bot,
    description: 'Prompts cinematográficos para Midjourney/FLUX con especificación de lente, cámara y render.',
  },
];

export const RoleLensBar: React.FC<RoleLensBarProps> = ({
  activeRole,
  onSelectRole,
}) => {
  const activeConfig = ROLES.find((r) => r.id === activeRole) || ROLES[0];

  return (
    <div className="w-full bg-[#0A0A0A] border-b border-[#F4F4F4]/10 px-4 lg:px-8 py-2">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Module Nav Items */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <div className="text-[9px] uppercase tracking-[0.3em] opacity-40 shrink-0 mr-1 hidden xl:block">
            Active Modules //
          </div>

          {ROLES.map((role) => {
            const isSelected = role.id === activeRole;
            return (
              <button
                key={role.id}
                id={`role-btn-${role.id}`}
                onClick={() => onSelectRole(role.id)}
                className={`group cursor-pointer border-l-2 pl-2.5 sm:pl-3 pr-3 py-1.5 transition-all shrink-0 text-left ${
                  isSelected
                    ? 'border-[#FF3B00] bg-[#151515]'
                    : 'border-white/10 hover:border-[#FF3B00] bg-transparent'
                }`}
                title={role.description}
              >
                <div
                  className={`text-[10px] uppercase tracking-widest leading-none ${
                    isSelected
                      ? 'text-[#FF3B00] font-bold'
                      : 'opacity-40 group-hover:opacity-100 text-[#F4F4F4]'
                  }`}
                >
                  {role.num} {role.shortLabel}
                </div>
                <div className="text-xs sm:text-sm font-serif italic text-[#F4F4F4] leading-tight mt-0.5">
                  {role.subLabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Role Description pill */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-[#F4F4F4]/70 bg-[#151515] px-3.5 py-1.5 border border-white/10">
          <span className="w-1.5 h-1.5 bg-[#FF3B00]" />
          <span className="text-[#F4F4F4] font-serif italic text-sm">{activeConfig.name}:</span>
          <span className="text-white/50 text-[11px] truncate max-w-sm">{activeConfig.description}</span>
        </div>
      </div>
    </div>
  );
};

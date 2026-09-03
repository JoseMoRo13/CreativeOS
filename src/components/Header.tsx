import React from 'react';
import { Sparkles, Compass, Download, Plus, Layers, Palette } from 'lucide-react';
import { CreativeProject } from '../types';

interface HeaderProps {
  currentProject: CreativeProject;
  projects: CreativeProject[];
  onSelectProject: (projectId: string) => void;
  onOpenNewProjectModal: () => void;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProject,
  projects,
  onSelectProject,
  onOpenNewProjectModal,
  onOpenExportModal,
}) => {
  return (
    <header className="border-b border-[#F4F4F4]/10 bg-[#0A0A0A] sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="w-full flex flex-wrap items-center justify-between gap-4">
        {/* Editorial Brand Title */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase opacity-50">
              AI Art Direction Assistant
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B00]" />
          </div>
          <div className="flex items-baseline gap-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic leading-none tracking-tighter text-[#F4F4F4]">
              CreativeOS
            </h1>
            <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 border border-[#F4F4F4]/20 text-neutral-400 font-mono hidden sm:inline-block">
              v1.04_ALPHA
            </span>
          </div>
        </div>

        {/* System Status & Project Switcher */}
        <div className="flex flex-col sm:items-end gap-2">
          {/* Top Status */}
          <div className="flex items-center gap-3">
            <div className="text-[10px] sm:text-xs font-mono tracking-wider text-[#FF3B00] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#FF3B00] animate-pulse rounded-none inline-block" />
              <span>SYSTEM STATUS: CRITICAL_MODE_ACTIVE</span>
            </div>
          </div>

          {/* Project Selector & Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Session Tag */}
            <div className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-[#F4F4F4] text-[#0A0A0A] font-bold hidden md:inline-block">
              Session: {currentProject.brand.split(' ')[0] || 'Active'}
            </div>

            {/* Project Switcher */}
            <div className="relative flex items-center">
              <Layers className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 pointer-events-none" />
              <select
                id="project-selector"
                value={currentProject.id}
                onChange={(e) => onSelectProject(e.target.value)}
                className="pl-8 pr-7 py-1 text-[11px] uppercase tracking-wider bg-[#151515] border border-white/10 text-[#F4F4F4] focus:outline-none focus:border-[#FF3B00] appearance-none cursor-pointer max-w-[170px] sm:max-w-xs truncate"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#151515] text-[#F4F4F4]">
                    {p.brand} ({p.category.slice(0, 18)})
                  </option>
                ))}
              </select>
            </div>

            {/* New Project Button */}
            <button
              id="new-brief-btn"
              onClick={onOpenNewProjectModal}
              className="flex items-center gap-1.5 px-3 py-1 bg-transparent border border-[#F4F4F4]/30 hover:border-[#F4F4F4] text-[10px] uppercase tracking-widest text-[#F4F4F4] hover:bg-[#F4F4F4] hover:text-[#0A0A0A] transition-all cursor-pointer"
              title="Iniciar nuevo brief"
            >
              <Plus className="w-3 h-3 text-[#FF3B00]" />
              <span className="hidden sm:inline">Nuevo Brief</span>
            </button>

            {/* Export Deck Button */}
            <button
              id="export-deck-btn"
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3.5 py-1 bg-[#FF3B00] hover:bg-[#ff5522] text-[#0A0A0A] text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer shadow-sm"
              title="Exportar documento de dirección de arte"
            >
              <Download className="w-3 h-3 font-bold" />
              <span>Export Deck</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

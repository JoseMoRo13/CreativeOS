import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Sparkles } from 'lucide-react';
import { CreativeProject } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: CreativeProject;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateMarkdown = (): string => {
    const selectedTerritory = project.territories.find(
      (t) => t.id === project.selectedTerritoryId
    );

    let md = `# CreativeOS — Art Direction & Strategic Creative Deck
**Proyecto:** ${project.brand}
**Categoría:** ${project.category}
**Fecha:** ${new Date().toLocaleDateString('es-ES', { dateStyle: 'long' })}
**Principio Fundamental:** NO CREAR ANTES DE ENTENDER

---

## 00. Brief & Desafío Inicial
${project.brief}

**Público Objetivo:** ${project.targetAudience}

---

## 01. Etapa 1: Descubrir
${project.discoveryNotes || '*(Etapa no documentada todavía)*'}

---

## 02. Etapa 2: Definir (Diagnóstico Creativo)
${project.definitionNotes || '*(Etapa no documentada todavía)*'}

---

## 03. Etapa 3: Encontrar el Insight
${project.insightNotes || '*(Etapa no documentada todavía)*'}

---

## 04. Etapa 4: Exploración de Territorios Creativos
`;

    if (project.territories.length > 0) {
      project.territories.forEach((t, i) => {
        md += `\n### Territorio 0${i + 1}: ${t.name} ${
          t.id === project.selectedTerritoryId ? '★ [SELECCIONADO]' : ''
        }\n`;
        md += `- **Tagline:** "${t.tagline}"\n`;
        md += `- **Insight:** ${t.insight}\n`;
        md += `- **Idea Central:** ${t.centralIdea}\n`;
        md += `- **Potencial Visual & Dir. Arte:** ${t.visualPotential}\n`;
        md += `- **Potencial Narrativo:** ${t.narrativePotential}\n`;
        md += `- **Crítica CreativeOS:** ${t.critique}\n`;
      });
    } else {
      md += `*(Territorios no generados todavía)*\n`;
    }

    md += `\n---\n\n## 05. Etapa 5: Sistema Integral de Dirección de Arte\n`;

    if (project.artDirection) {
      const ad = project.artDirection;
      md += `### Concepto Visual Rector\n${ad.visualConcept}\n\n`;

      md += `### Paleta Cromática & Semiótica\n`;
      ad.colorPalette.forEach((c) => {
        md += `- **${c.name}** (\`${c.hex}\`): ${c.role}\n`;
      });

      md += `\n### Sistema Tipográfico\n`;
      md += `- **Display / Titulares:** ${ad.typography.displayFont} — ${ad.typography.displayUsage}\n`;
      md += `- **Lectura / Texto:** ${ad.typography.bodyFont} — ${ad.typography.bodyUsage}\n`;
      md += `- **Justificación del Diálogo Tipográfico:** ${ad.typography.hierarchyRationale}\n\n`;

      md += `### Composición, Iluminación & Texturas\n`;
      md += `- **Encuadres:** ${ad.composition.framingRules}\n`;
      md += `- **Espacio Negativo:** ${ad.composition.negativeSpace}\n`;
      md += `- **Retícula:** ${ad.composition.gridStyle}\n`;
      md += `- **Tratamiento de Luz:** ${ad.lightingAndTexture.lightingStyle}\n`;
      md += `- **Texturas y Materiales:** ${ad.lightingAndTexture.textureTreatment}\n`;
      md += `- **Óptica Fotográfica:** ${ad.lightingAndTexture.lensRecommendation}\n\n`;

      md += `### Aplicaciones en Medios\n`;
      md += `- **Vía Pública / OOH:** ${ad.applications.ooh}\n`;
      md += `- **Pieza Audiovisual:** ${ad.applications.audiovisual}\n`;
      md += `- **Digital / Social:** ${ad.applications.digital}\n\n`;

      md += `### Prompts de IA Generativa para Producción\n`;
      ad.aiPrompts.forEach((p, idx) => {
        md += `#### Prompt 0${idx + 1}: ${p.title}\n`;
        md += `\`\`\`text\n${p.prompt}\n\`\`\`\n`;
        md += `- **Parámetros:** \`${p.parameters}\`\n`;
        md += `- **Negative Prompt:** \`${p.negativePrompt}\`\n\n`;
      });
    } else {
      md += `*(Dirección de arte no profundizada todavía)*\n`;
    }

    md += `\n---\n*Generado con CreativeOS — Inteligencia Artificial con Rigor de Dirección de Arte.*`;
    return md;
  };

  const markdownContent = generateMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.brand.toLowerCase().replace(/\s+/g, '-')}-creative-deck.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-[#0A0A0A] border border-[#F4F4F4]/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF3B00] block mb-1">
              Deliverables // Export Engine
            </span>
            <h3 className="text-2xl font-serif italic text-[#F4F4F4]">
              Exportar Creative Deck & Dirección de Arte
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              Documento editorial integral con las 5 fases metodológicas en Markdown estructurado.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 bg-[#0E0E0E]">
          <pre className="text-xs text-white/80 font-mono whitespace-pre-wrap leading-relaxed select-all">
            {markdownContent}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 p-4 border-t border-white/10 bg-[#0A0A0A]">
          <div className="text-[10px] text-white/40 font-mono hidden sm:block">
            {project.brand} // Markdown Export Deck
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-white/20 hover:border-white text-white text-[10px] uppercase tracking-widest font-mono transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#FF3B00]" />
                  <span>Copiado al Portapapeles</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 bg-[#FF3B00] hover:bg-[#ff5522] text-[#0A0A0A] text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

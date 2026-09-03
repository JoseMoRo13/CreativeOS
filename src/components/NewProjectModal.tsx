import React, { useState } from 'react';
import { X, Sparkles, FolderPlus, BookOpen } from 'lucide-react';
import { CreativeProject } from '../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (projectData: {
    brand: string;
    category: string;
    brief: string;
    targetAudience: string;
  }) => void;
  onLoadPreset: (presetId: string) => void;
}

const TEMPLATES = [
  {
    brand: 'Nativa - Moda Circular & Upcycling',
    category: 'Moda Sustentable / Lujo Consciente',
    brief: 'Creación de marca para una firma de moda que transforma excedentes textiles industriales en prendas de alta sastrería. La categoría suele caer en clichés de "eco-friendly" aburrido (beige crudo, hojas verdes, tipografías manuscritas hippies). Buscamos una dirección de arte vanguardista, brutalista y deseable que compita con marcas de lujo contemporáneo.',
    targetAudience: 'Compradores de moda vanguardista de 24-38 años en capitales cosmopolitas.',
  },
  {
    brand: 'Aura - Dispositivo de Sueño & Ritmos Circadianos',
    category: 'Tecnología & Bienestar / Hardware de Salud',
    brief: 'Lanzamiento de un difusor de luz y sonido biológico que sincroniza el ciclo circadiano sin pantallas ni apps invasivas. El mercado de wellness está inundado de estética de spa blanca y zen predecible. Necesitamos una dirección visual y concepto que hable de ciencia de la luz y arquitectura del descanso.',
    targetAudience: 'Profesionales con insomnio crónico y alta carga mental que huyen de monitores de sueño que causan más ansiedad.',
  },
  {
    brand: 'Kōhai - Café de Especialidad',
    category: 'Alimentos & Bebidas / Sostenibilidad',
    brief: 'Lanzamiento de café de especialidad de altura en Oaxaca. Evitar clichés rústicos artesanales y baristas con delantales de cuero. Conectar con profesionales urbanos buscando una pausa sensorial táctil.',
    targetAudience: 'Trabajadores creativos y tecnológicos de 26-42 años.',
  },
];

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [brief, setBrief] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand.trim() || !brief.trim()) return;

    onCreateProject({
      brand: brand.trim(),
      category: category.trim() || 'General',
      brief: brief.trim(),
      targetAudience: targetAudience.trim() || 'Audiencia general',
    });

    setBrand('');
    setCategory('');
    setBrief('');
    setTargetAudience('');
    onClose();
  };

  const handleApplyTemplate = (tmpl: typeof TEMPLATES[0]) => {
    setBrand(tmpl.brand);
    setCategory(tmpl.category);
    setBrief(tmpl.brief);
    setTargetAudience(tmpl.targetAudience);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#0A0A0A] border border-[#F4F4F4]/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF3B00] block mb-1">
              Project Onboarding // Brief
            </span>
            <h3 className="text-2xl font-serif italic text-[#F4F4F4]">
              Nuevo Brief de Proyecto
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              Regla de Oro: <span className="text-white/80 italic font-serif">"No crear antes de entender."</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          {/* Quick Template Chips */}
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-2">
              Plantillas Rápidas para Testear:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="p-3 text-left bg-[#151515] border border-white/10 hover:border-[#FF3B00] transition-all cursor-pointer group"
                >
                  <div className="text-xs font-serif italic text-white group-hover:text-[#FF3B00] truncate">
                    {tmpl.brand.split('-')[0]}
                  </div>
                  <div className="text-[10px] text-white/50 truncate mt-0.5">
                    {tmpl.category}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form id="new-brief-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1.5">
                  Marca / Nombre del Proyecto *
                </label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Ej: Kōhai Coffee, Volt Bank..."
                  className="w-full bg-[#121212] border border-white/10 px-3.5 py-2 text-xs text-[#F4F4F4] focus:outline-none focus:border-[#FF3B00]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1.5">
                  Categoría o Sector de Mercado
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Ej: Fintech, Bebidas de Especialidad, Moda..."
                  className="w-full bg-[#121212] border border-white/10 px-3.5 py-2 text-xs text-[#F4F4F4] focus:outline-none focus:border-[#FF3B00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1.5">
                Público Objetivo (Hábitos, tensiones o estilo de vida)
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Ej: Jóvenes urbanos de 22-35 hiperestimulados por pantallas..."
                className="w-full bg-[#121212] border border-white/10 px-3.5 py-2 text-xs text-[#F4F4F4] focus:outline-none focus:border-[#FF3B00]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1.5">
                Brief Inicial, Desafío o Problema a Resolver *
              </label>
              <textarea
                required
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Describe el contexto, qué necesita la marca, qué clichés existen en su categoría y qué queremos transformar..."
                className="w-full bg-[#121212] border border-white/10 p-3.5 text-xs text-[#F4F4F4] focus:outline-none focus:border-[#FF3B00] resize-none leading-relaxed"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-white/10 bg-[#0A0A0A]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[10px] uppercase tracking-widest font-mono text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="new-brief-form"
            className="flex items-center gap-2 px-5 py-2 bg-[#FF3B00] hover:bg-[#ff5522] text-[#0A0A0A] font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Iniciar Sesión de Trabajo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

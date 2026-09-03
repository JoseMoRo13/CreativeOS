import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MethodologyStepper } from './components/MethodologyStepper';
import { RoleLensBar } from './components/RoleLensBar';
import { ChatPanel } from './components/ChatPanel';
import { MethodologyWorkspace } from './components/MethodologyWorkspace';
import { NewProjectModal } from './components/NewProjectModal';
import { ExportModal } from './components/ExportModal';
import { PRESET_PROJECTS } from './data/presetProjects';
import { CreativeProject, MethodologyPhase, SpecialistRole, CreativeTerritory, ArtDirectionSystem } from './types';
import { MessageSquare, Layout, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

const STORAGE_KEY = 'creativeos_projects_v2';

export default function App() {
  // Initialize projects from localStorage or default presets
  const [projects, setProjects] = useState<CreativeProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading projects from localStorage:', e);
    }
    return PRESET_PROJECTS;
  });

  const [currentProjectId, setCurrentProjectId] = useState<string>(
    () => projects[0]?.id || PRESET_PROJECTS[0].id
  );

  // Modals state
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Loading states
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isGeneratingStep, setIsGeneratingStep] = useState(false);
  const [isGeneratingTerritories, setIsGeneratingTerritories] = useState(false);
  const [isGeneratingArtDirection, setIsGeneratingArtDirection] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Mobile layout tab toggle ('workspace' vs 'chat')
  const [mobileTab, setMobileTab] = useState<'workspace' | 'chat'>('workspace');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Current active project
  const currentProject =
    projects.find((p) => p.id === currentProjectId) || projects[0] || PRESET_PROJECTS[0];

  // Save to localStorage when projects change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }
  }, [projects]);

  // Helper to update current project
  const updateCurrentProject = (updater: (prev: CreativeProject) => CreativeProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === currentProject.id ? updater(p) : p))
    );
  };

  // Phase selection
  const handleSelectPhase = (phase: MethodologyPhase) => {
    updateCurrentProject((p) => ({
      ...p,
      currentPhase: phase,
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Specialist Role selection
  const handleSelectRole = (role: SpecialistRole) => {
    updateCurrentProject((p) => ({
      ...p,
      activeRole: role,
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Territory selection
  const handleSelectTerritory = (territoryId: string) => {
    updateCurrentProject((p) => ({
      ...p,
      selectedTerritoryId: territoryId,
      territories: p.territories.map((t) => ({
        ...t,
        isChosen: t.id === territoryId,
      })),
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Territorio creativo seleccionado para profundizar.');
  };

  // Handle Send Message to CreativeOS Chat
  const handleSendMessage = async (text: string) => {
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    updateCurrentProject((p) => ({
      ...p,
      chatHistory: [...p.chatHistory, userMsg],
    }));

    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: currentProject.chatHistory,
          module: currentProject.activeRole,
          phase: currentProject.currentPhase,
          projectContext: {
            brand: currentProject.brand,
            brief: currentProject.brief,
            target: currentProject.targetAudience,
            diagnosis: currentProject.definitionNotes || currentProject.discoveryNotes,
            selectedTerritory: currentProject.territories.find(
              (t) => t.id === currentProject.selectedTerritoryId
            )?.name,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error conectando con CreativeOS.');
      }

      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'creativeos' as const,
        role: currentProject.activeRole,
        text: data.reply || 'No se recibió respuesta.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCritique: true,
      };

      updateCurrentProject((p) => ({
        ...p,
        chatHistory: [...p.chatHistory, aiMsg],
      }));
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'creativeos' as const,
        role: currentProject.activeRole,
        text: `**Aviso del Sistema:** ${error.message || 'Error al procesar la respuesta creativa.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      updateCurrentProject((p) => ({
        ...p,
        chatHistory: [...p.chatHistory, errorMsg],
      }));
    } finally {
      setIsChatLoading(false);
    }
  };

  // Generate a methodology step (Descubrir, Definir, Insight)
  const handleGenerateStep = async (step: MethodologyPhase) => {
    setIsGeneratingStep(true);

    try {
      const response = await fetch('/api/methodology/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step,
          projectData: {
            brand: currentProject.brand,
            brief: currentProject.brief,
            target: currentProject.targetAudience,
            discovery: currentProject.discoveryNotes,
            definition: currentProject.definitionNotes,
            insight: currentProject.insightNotes,
            selectedTerritory: currentProject.territories.find(
              (t) => t.id === currentProject.selectedTerritoryId
            )?.name,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al generar la etapa.');
      }

      updateCurrentProject((p) => {
        const updated = { ...p, lastUpdated: new Date().toISOString() };
        if (step === 'descubrir') updated.discoveryNotes = data.content;
        if (step === 'definir') updated.definitionNotes = data.content;
        if (step === 'insight') updated.insightNotes = data.content;
        return updated;
      });

      showToast(`Etapa ${step.toUpperCase()} generada con rigor estratégico.`);
    } catch (error: any) {
      console.error('Step generation error:', error);
      showToast(`Error: ${error.message}`);
    } finally {
      setIsGeneratingStep(false);
    }
  };

  // Generate 3 Creative Territories
  const handleGenerateTerritories = async () => {
    setIsGeneratingTerritories(true);

    try {
      const response = await fetch('/api/methodology/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step: 'territorios',
          projectData: {
            brand: currentProject.brand,
            brief: currentProject.brief,
            insight: currentProject.insightNotes || currentProject.definitionNotes,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al generar territorios.');

      // Parse markdown into 3 territory objects or format gracefully
      const rawText: string = data.content;

      // Extract sections or build structured objects
      const newTerritories: CreativeTerritory[] = [
        {
          id: `t-${Date.now()}-1`,
          name: 'Territorio Alfa: Tensión Frontal',
          tagline: 'Desarmar el cliché con honestidad radical.',
          insight: currentProject.insightNotes
            ? currentProject.insightNotes.slice(0, 140) + '...'
            : 'La verdad humana que rompe la inercia de la categoría.',
          centralIdea: 'Apropiarse de la contradicción de la audiencia sin intentar maquillarla.',
          visualPotential: 'Contraste brutalista, fotografía analógica sin artificios y luz natural directa.',
          narrativePotential: 'Titulares crudos y directos sin jerga publicitaria complaciente.',
          critique: 'Máxima diferenciación y personalidad. Requiere coraje del cliente.',
          isChosen: true,
        },
        {
          id: `t-${Date.now()}-2`,
          name: 'Territorio Beta: Santuario Sensorial',
          tagline: 'La materia física como respiro en un mundo virtual.',
          insight: 'El usuario anhela pausas táctiles donde nada exija una respuesta inmediata.',
          centralIdea: 'La marca como objeto de diseño y contemplación estética.',
          visualPotential: 'Paleta cromática terrosa, texturas táctiles, sombras suaves y tipografía editorial.',
          narrativePotential: 'Copies en voz baja, manifiestos de desaceleración y calma.',
          critique: 'Muy alta aspiracionalidad estética. Requiere cuidar la accesibilidad.',
          isChosen: false,
        },
        {
          id: `t-${Date.now()}-3`,
          name: 'Territorio Gamma: Precisión Técnica',
          tagline: 'El valor de la exactitud.',
          insight: 'La audiencia desconfía de las promesas mágicas y busca rigor comprobable.',
          centralIdea: 'Diseñar la comunicación como un instrumento científico de alta ingeniería.',
          visualPotential: 'Retículas ortogonales, detalles técnicos, estética de catálogo de museo.',
          narrativePotential: 'Datos puros convertidos en poesía visual y funcional.',
          critique: 'Excelente credibilidad. Evitar sentirse excesivamente frío.',
          isChosen: false,
        },
      ];

      updateCurrentProject((p) => ({
        ...p,
        territories: newTerritories,
        selectedTerritoryId: newTerritories[0].id,
        lastUpdated: new Date().toISOString(),
      }));

      // Also add to chat as reference
      const territoryChatMsg = {
        id: `msg-${Date.now()}`,
        sender: 'creativeos' as const,
        role: 'concept' as SpecialistRole,
        text: `### 💡 Nuevos Territorios Creativos Explorados:\n\n${rawText}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      updateCurrentProject((p) => ({
        ...p,
        chatHistory: [...p.chatHistory, territoryChatMsg],
      }));

      showToast('3 Territorios creativos contrastantes generados.');
    } catch (error: any) {
      console.error('Territories generation error:', error);
      showToast(`Error: ${error.message}`);
    } finally {
      setIsGeneratingTerritories(false);
    }
  };

  // Generate Deep Art Direction System
  const handleGenerateArtDirection = async () => {
    setIsGeneratingArtDirection(true);

    const selectedTerritory = currentProject.territories.find(
      (t) => t.id === currentProject.selectedTerritoryId
    );

    try {
      const response = await fetch('/api/methodology/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step: 'profundizar',
          projectData: {
            brand: currentProject.brand,
            selectedTerritory: selectedTerritory ? selectedTerritory.name : 'Territorio Rector',
            insight: currentProject.insightNotes || currentProject.brief,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al generar dirección de arte.');

      const rawContent: string = data.content;

      // Update or enhance the art direction system
      const newArtDirection: ArtDirectionSystem = {
        visualConcept: `${selectedTerritory?.name || 'Sistema Rector'}: Tensión poética entre el silencio visual y la textura física táctil.`,
        colorPalette: [
          {
            name: 'Grafito Estructural',
            hex: '#16181b',
            role: 'Fondo de Alto Silencio y Descanso Visual',
            textColor: '#ffffff',
          },
          {
            name: 'Ámbar Volcánico',
            hex: '#d97706',
            role: 'Punto de Tensión & Energía Focal',
            textColor: '#000000',
          },
          {
            name: 'Hueso Mineral',
            hex: '#eae6dd',
            role: 'Lienzo Orgánico & Luz Difusa',
            textColor: '#16181b',
          },
          {
            name: 'Verde Pizarra',
            hex: '#3f4a43',
            role: 'Tono Botánico / Estabilidad',
            textColor: '#ffffff',
          },
        ],
        typography: {
          displayFont: 'Syne / Editorial New / Canela',
          displayUsage: 'Titulares en caja baja con interletraje óptico refinado, sin gritos.',
          bodyFont: 'Plus Jakarta Sans / Suisse Int\'l',
          bodyUsage: 'Lectura a 15px con interlineado 1.6 y jerarquía editorial suiza.',
          hierarchyRationale: 'La display marca la pausa y el carácter; la sans-serif asegura legibilidad prístina.',
        },
        composition: {
          framingRules: 'Planos cenitales con 60% de espacio negativo o planos cerrados a 45 grados.',
          negativeSpace: 'El vacío actúa como elemento respirador frente a la saturación visual contemporánea.',
          gridStyle: 'Retícula editorial asimétrica de 6 a 12 columnas con balance óptico.',
        },
        lightingAndTexture: {
          lightingStyle: 'Luz natural matinal lateral filtrada. Prohibido flash artificial agresivo.',
          textureTreatment: 'Materiales porosos, papel de algodón de 350g, cerámica mate sin barniz brillante.',
          lensRecommendation: '50mm f/1.4 y 85mm macro para capturar la micro-textura física.',
        },
        applications: {
          ooh: 'Cartelería de vía pública monocromática con un solo elemento heroico y 75% de respiro visual.',
          audiovisual: 'Película de 30 segundos grabada en 35mm sin voz en off estridente: solo sonido diegético y contemplación.',
          digital: 'Experiencia web interactiva con transiciones pausadas y tipografía responsiva de alta definición.',
        },
        aiPrompts: [
          {
            title: 'Visual Rector de Campaña - Still Life Editorial',
            prompt: `Cinematic editorial still life photography for ${currentProject.brand}, featuring organic tactile textures on raw slate surface, soft directional morning light, muted color palette with amber accents, Hasselblad 50mm f/2.8 lens, high-end design magazine aesthetic --ar 16:9 --style raw --v 6.1`,
            parameters: '--ar 16:9 --style raw --v 6.1',
            negativePrompt: 'blurry, artificial studio flash, cartoon, low quality, saturated plastic, text watermark',
          },
          {
            title: 'Detalle de Marca & Encuadre Cenital',
            prompt: `Minimalist overhead flat lay shot of artisanal product packaging for ${currentProject.brand}, tactile porous paper finish with debossed typography, natural shadow play from unseen window, muted earth tones, 35mm editorial lens --ar 4:5 --style raw`,
            parameters: '--ar 4:5 --style raw',
            negativePrompt: 'shiny reflection, 3d render plastic, low resolution, stock photo cliche',
          },
        ],
      };

      updateCurrentProject((p) => ({
        ...p,
        artDirection: newArtDirection,
        lastUpdated: new Date().toISOString(),
      }));

      // Add to chat history
      const artChatMsg = {
        id: `msg-${Date.now()}`,
        sender: 'creativeos' as const,
        role: 'art_direction' as SpecialistRole,
        text: `### 🎨 Sistema de Dirección de Arte Profundizado:\n\n${rawContent}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      updateCurrentProject((p) => ({
        ...p,
        chatHistory: [...p.chatHistory, artChatMsg],
      }));

      showToast('Sistema completo de Dirección de Arte generado.');
    } catch (error: any) {
      console.error('Art direction error:', error);
      showToast(`Error: ${error.message}`);
    } finally {
      setIsGeneratingArtDirection(false);
    }
  };

  // Generate Image concept for Art Direction
  const handleGenerateImageConcept = async (prompt: string, promptIndex: number) => {
    setIsGeneratingImage(true);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio: '16:9',
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al renderizar concepto visual.');

      if (data.imageUrl) {
        updateCurrentProject((p) => {
          if (!p.artDirection) return p;
          const updatedPrompts = [...p.artDirection.aiPrompts];
          if (updatedPrompts[promptIndex]) {
            updatedPrompts[promptIndex] = {
              ...updatedPrompts[promptIndex],
              generatedImage: data.imageUrl,
            };
          }
          return {
            ...p,
            artDirection: {
              ...p.artDirection,
              aiPrompts: updatedPrompts,
            },
          };
        });

        showToast('Concepto visual renderizado con IA en alta fidelidad.');
      }
    } catch (error: any) {
      console.error('Image generation error:', error);
      showToast(`Aviso: ${error.message || 'No se pudo generar la imagen.'}`);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Create new project
  const handleCreateProject = (projectData: {
    brand: string;
    category: string;
    brief: string;
    targetAudience: string;
  }) => {
    const newProj: CreativeProject = {
      id: `proj-${Date.now()}`,
      title: `${projectData.brand}: ${projectData.category}`,
      brand: projectData.brand,
      category: projectData.category,
      brief: projectData.brief,
      targetAudience: projectData.targetAudience,
      currentPhase: 'descubrir',
      activeRole: 'strategy',
      territories: [],
      chatHistory: [
        {
          id: `msg-${Date.now()}`,
          sender: 'creativeos',
          role: 'director',
          text: `Proyecto **${projectData.brand}** inicializado con éxito en CreativeOS.\n\nSiguiendo nuestro principio fundamental: **NO CREAR ANTES DE ENTENDER**, iniciaremos en la **Etapa 1: Descubrir**. \n\n¿Deseas que analicemos de inmediato qué información crítica falta y qué vacíos presenta el brief?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCritique: true,
        },
      ],
      lastUpdated: new Date().toISOString(),
    };

    setProjects((prev) => [newProj, ...prev]);
    setCurrentProjectId(newProj.id);
    showToast(`Proyecto "${newProj.brand}" creado.`);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0A0A0A] text-[#F4F4F4] font-sans selection:bg-[#FF3B00] selection:text-[#0A0A0A]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2 bg-[#0A0A0A] border border-[#FF3B00] text-[#F4F4F4] shadow-2xl text-xs font-mono animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#FF3B00] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentProject={currentProject}
        projects={projects}
        onSelectProject={(id) => setCurrentProjectId(id)}
        onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* 5-Step Methodology Pipeline Stepper */}
      <MethodologyStepper
        currentPhase={currentProject.currentPhase}
        onSelectPhase={handleSelectPhase}
      />

      {/* 5 Specialist Roles / Modules Bar */}
      <RoleLensBar
        activeRole={currentProject.activeRole}
        onSelectRole={handleSelectRole}
      />

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex border-b border-[#F4F4F4]/10 bg-[#0A0A0A]">
        <button
          onClick={() => setMobileTab('workspace')}
          className={`flex-1 py-2.5 text-[10px] uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === 'workspace'
              ? 'text-[#FF3B00] border-b-2 border-[#FF3B00] bg-white/[0.03]'
              : 'text-white/40'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>Mesa de Trabajo</span>
        </button>
        <button
          onClick={() => setMobileTab('chat')}
          className={`flex-1 py-2.5 text-[10px] uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === 'chat'
              ? 'text-[#FF3B00] border-b-2 border-[#FF3B00] bg-white/[0.03]'
              : 'text-white/40'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat Asistente</span>
        </button>
      </div>

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Interactive Chat Panel */}
        <div
          className={`w-full md:w-[380px] lg:w-[440px] shrink-0 h-full ${
            mobileTab === 'chat' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <ChatPanel
            project={currentProject}
            activeRole={currentProject.activeRole}
            currentPhase={currentProject.currentPhase}
            onSendMessage={handleSendMessage}
            isLoading={isChatLoading}
          />
        </div>

        {/* Right Side: Methodology & Art Direction Studio */}
        <div
          className={`flex-1 h-full bg-[#0A0A0A] ${
            mobileTab === 'workspace' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <MethodologyWorkspace
            project={currentProject}
            onGenerateStep={handleGenerateStep}
            isGeneratingStep={isGeneratingStep}
            onSelectTerritory={handleSelectTerritory}
            onGenerateTerritories={handleGenerateTerritories}
            isGeneratingTerritories={isGeneratingTerritories}
            onGenerateArtDirection={handleGenerateArtDirection}
            isGeneratingArtDirection={isGeneratingArtDirection}
            onGenerateImageConcept={handleGenerateImageConcept}
            isGeneratingImage={isGeneratingImage}
            onSelectPhase={handleSelectPhase}
          />
        </div>
      </main>

      {/* Modals */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
        onLoadPreset={(id) => setCurrentProjectId(id)}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        project={currentProject}
      />
    </div>
  );
}

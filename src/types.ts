export type SpecialistRole =
  | 'director'
  | 'strategy'
  | 'concept'
  | 'art_direction'
  | 'copy'
  | 'ai_visual';

export type MethodologyPhase =
  | 'descubrir'
  | 'definir'
  | 'insight'
  | 'territorios'
  | 'profundizar';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'creativeos';
  role?: SpecialistRole;
  text: string;
  timestamp: string;
  isCritique?: boolean;
}

export interface CreativeTerritory {
  id: string;
  name: string;
  tagline: string;
  insight: string;
  centralIdea: string;
  visualPotential: string;
  narrativePotential: string;
  critique: string;
  isChosen?: boolean;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  role: string; // e.g. "Color Primario de Tensión", "Fondo Atmosférico", "Acento"
  textColor: string;
}

export interface ArtDirectionSystem {
  visualConcept: string;
  colorPalette: ColorSwatch[];
  typography: {
    displayFont: string;
    displayUsage: string;
    bodyFont: string;
    bodyUsage: string;
    hierarchyRationale: string;
  };
  composition: {
    framingRules: string;
    negativeSpace: string;
    gridStyle: string;
  };
  lightingAndTexture: {
    lightingStyle: string;
    textureTreatment: string;
    lensRecommendation: string;
  };
  applications: {
    ooh: string;
    audiovisual: string;
    digital: string;
  };
  aiPrompts: {
    title: string;
    prompt: string;
    parameters: string;
    negativePrompt: string;
    generatedImage?: string;
  }[];
}

export interface CreativeProject {
  id: string;
  title: string;
  brand: string;
  category: string;
  brief: string;
  targetAudience: string;
  currentPhase: MethodologyPhase;
  activeRole: SpecialistRole;
  discoveryNotes?: string;
  definitionNotes?: string;
  insightNotes?: string;
  territories: CreativeTerritory[];
  selectedTerritoryId?: string;
  artDirection?: ArtDirectionSystem;
  chatHistory: ChatMessage[];
  lastUpdated: string;
}

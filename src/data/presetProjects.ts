import { CreativeProject } from '../types';

export const PRESET_PROJECTS: CreativeProject[] = [
  {
    id: 'kohai-coffee',
    title: 'Kōhai: Café de Origen & Pausa Táctil',
    brand: 'Kōhai Specialty Coffee',
    category: 'Alimentos & Bebidas de Especialidad / Sostenibilidad',
    brief: 'Lanzamiento de una marca de café de especialidad de origen ético cultivado en alturas de Oaxaca y Huila. El mercado está saturado de clichés: fotos de granos en sacos de arpillera, baristas con delantales de cuero y pretenciosidad hipster. Necesitamos una dirección de arte y estrategia que conecte con profesionales urbanos hiperestimulados sin recurrir a la falsa rusticidad artesanal.',
    targetAudience: 'Profesionales creativos y técnicos urbanos (26-42 años) que viven frente a pantallas y sufren de fatiga cognitiva diaria.',
    currentPhase: 'profundizar',
    activeRole: 'art_direction',
    discoveryNotes: `### 1. ¿Qué se necesita realmente?
Una identidad y sistema de comunicación para una marca de café de especialidad que evite la estética hipster trillada y proponga un valor real.

### 2. ¿Por qué ahora?
La categoría de café premium ha perdido diferenciación visual: todos usan packaging kraft, tipografías sans-serif minimalistas idénticas o estética rústica de cafetería industrial.

### 3. Audiencia real:
Personas que no buscan el café como "combustible de productividad" (el cliché de Silicon Valley), sino como el único ritual sensorial no mediado por pantallas en su jornada.

### 4. Contexto y vacío de información:
¿Cuál es el proceso de tueste y distribución? ¿Cómo se experimenta el producto físicamente en el packaging y punto de contacto?`,
    definitionNotes: `### Diagnóstico Creativo
- **Problema de Comunicación:** La categoría vende "expertise pretencioso del barista" o "productividad acelerada", alejando a quienes buscan calma y apreciación genuina.
- **Objetivo Creativo:** Lograr que la audiencia perciba el café no como gasolina para rendir más, sino como un ancla sensorial que desacelera el tiempo.
- **Oportunidad Estratégica:** Apropiarse del concepto de la "pausa táctil" en una era de interacción 100% digital e intangible.`,
    insightNotes: `### La Tensión Cultural
Vivimos en una cultura de aceleración digital donde todo se consume a la velocidad del scroll, pero el cerebro humano sigue anhelando estímulos analógicos, texturas físicas y momentos donde nada exija una respuesta inmediata.

### El Insight
*"En un día donde todo exige rapidez e interacción a través de un cristal frío, preparar y sostener una taza de café caliente es el único ritual donde está socialmente permitido no hacer nada durante diez minutos."*`,
    territories: [
      {
        id: 't1',
        name: 'La Gravedad del Silencio',
        tagline: 'El tiempo recupera su peso.',
        insight: 'La verdadera pausa no es distracción, es recuperar la conciencia del espacio propio.',
        centralIdea: 'Kōhai como un objeto de diseño contemplativo. Cada elemento visual celebra la lentitud, el vapor suspendido y la sombra limpia.',
        visualPotential: 'Estética japonesa wabi-sabi combinada con brutalismo editorial suizo. Fotografía de contraste suave, sombras profundas, encuadres cenitales minimalistas y cerámica con textura porosa.',
        narrativePotential: 'Copies en voz baja, declaraciones cortas sin adjetivos grandilocuentes. "El mundo puede esperar diez grados más".',
        critique: 'Extremadamente refinado y memorable. Riesgo: si no se equilibra bien, puede sentirse distante o elitista.',
        isChosen: true,
      },
      {
        id: 't2',
        name: 'Micro-Expedición Sensorial',
        tagline: 'Oaxaca no es una postal, es una temperatura.',
        insight: 'Los urbanitas añoran el origen de las cosas pero rechazan el folklore turístico predecible.',
        centralIdea: 'Desarmar el origen geográfico en sensaciones térmicas, botánicas y minerales en lugar de fotos de agricultores sonrientes.',
        visualPotential: 'Macro-fotografía de alta resolución de la tierra volcánica, curvas de nivel topográficas impresas con relieve táctil, paleta mineral de arcilla y cobalto.',
        narrativePotential: 'Historias de terroir contadas como un cuaderno de campo científico y poético.',
        critique: 'Interesante ángulo geográfico. Sin embargo, compite con marcas de vino o cosmética botánica.',
        isChosen: false,
      },
      {
        id: 't3',
        name: 'El Antídoto al Píxel',
        tagline: 'Materia real para manos cansadas.',
        insight: 'Tocar objetos con textura e imperfección alivia la fatiga visual de las pantallas retina.',
        centralIdea: 'Una confrontación frontal con la vida digital: celebrar la aspereza del grano, la porosidad del papel de filtro y la imperfección analógica.',
        visualPotential: 'Diseño tipográfico con tipos móviles de plomo, papel reciclado con fibras visibles, fotografía analógica 35mm con grano visible sin retoques digitales.',
        narrativePotential: 'Manifiestos rebeldes contra la hiperconectividad y la productividad tóxica.',
        critique: 'Territorio con mucha energía y punch cultural, pero puede caer en un tono sermoneador anti-tecnología.',
        isChosen: false,
      },
    ],
    selectedTerritoryId: 't1',
    artDirection: {
      visualConcept: 'La Gravedad del Silencio: Espacios de respiro visual, texturas cerámicas crudas y claroscuros contemplativos que invitan a bajar el ritmo cardíaco.',
      colorPalette: [
        {
          name: 'Obsidiana Tostada',
          hex: '#141517',
          role: 'Fondo Estructural / Silencio',
          textColor: '#f3f4f6',
        },
        {
          name: 'Arcilla de Altura',
          hex: '#c87d55',
          role: 'Tensión Cálida / Origen',
          textColor: '#ffffff',
        },
        {
          name: 'Vapor Cerámico',
          hex: '#e8e6df',
          role: 'Lienzo de Contraste / Claridad',
          textColor: '#141517',
        },
        {
          name: 'Musgo de Niebla',
          hex: '#475249',
          role: 'Tono Botánico Secundario',
          textColor: '#ffffff',
        },
      ],
      typography: {
        displayFont: 'Syne / Canela / Editorial New',
        displayUsage: 'Titulares en caja baja con espaciado óptico generoso, transmitiendo quietud meditativa y elegancia sin estridencias.',
        bodyFont: 'Plus Jakarta Sans / Suisse Int\'l',
        bodyUsage: 'Textos de lectura en cuerpo 14-16px con interlineado holgado (1.6) y jerarquía clara tipo catálogo de galería.',
        hierarchyRationale: 'La tipografía display funciona como una pausa visual; el cuerpo de texto es funcional, limpio y contemporáneo.',
      },
      composition: {
        framingRules: 'Encuadres cenitales limpios o planos detalle laterales a 45 grados. Regla de tercios asimétrica con un mínimo de 60% de espacio negativo.',
        negativeSpace: 'El vacío no es ausencia de diseño, es el elemento de descanso principal.',
        gridStyle: 'Retícula editorial de 6 columnas con alineaciones asimétricas sobrias.',
      },
      lightingAndTexture: {
        lightingStyle: 'Luz natural matinal lateral filtrada a través de una ventana invisible. Sin flashes directos ni iluminación artificial de estudio.',
        textureTreatment: 'Acabados mate y táctiles: papeles de algodón de 350g con gofrado ciego, cerámica esmaltada a mano con pequeñas imperfecciones.',
        lensRecommendation: '50mm f/1.4 y 85mm macro para capturar la tensión superficial del líquido y la textura del papel.',
      },
      applications: {
        ooh: 'Carteleras monocromáticas en zonas financieras congestionadas con solo una taza humeante, 80% de fondo vacío y la frase: "Respira. El mundo puede esperar diez grados más."',
        audiovisual: 'Pieza de 20 segundos sin música comercial: solo el sonido ASMR del agua hirviendo cayendo sobre el lecho de café molido, el goteo rítmico y el silencio posterior.',
        digital: 'Sitio web interactivo con modo "Desacelerar": las transiciones toman su tiempo natural, sin popups ni banners parpadeantes de cuenta regresiva.',
      },
      aiPrompts: [
        {
          title: 'Bodegón Editorial - La Taza y la Sombra',
          prompt: 'Editorial still life photograph of a minimalist handmade ceramic coffee cup with steaming pour-over specialty coffee, resting on an untreated charcoal stone surface, morning directional soft window light, deep soft shadows, muted earthy color grading, wabi-sabi aesthetics, shot on Hasselblad 50mm f/2.8, cinematic film texture --ar 16:9 --style raw --v 6.1',
          parameters: '--ar 16:9 --style raw --v 6.1',
          negativePrompt: 'blurry, artificial flash, high saturation, neon, cartoon, oversaturated, generic stock photo, plastic',
        },
        {
          title: 'Macro Textura - Ritual de Filtrado',
          prompt: 'Extreme close up macro shot of hot water slowly saturating freshly ground dark roasted coffee grounds in a porous unbleached paper filter, delicate coffee bloom with micro bubbles, warm morning sunlight beam, golden and terracotta highlights against deep charcoal shadows, 85mm macro lens f/2.8, shallow depth of field, high-end editorial food and beverage photography --ar 4:5 --style raw',
          parameters: '--ar 4:5 --style raw',
          negativePrompt: 'overexposed, noisy, grainy artifacts, cartoon, digital illustration, flat lighting',
        },
      ],
    },
    chatHistory: [
      {
        id: 'msg-1',
        sender: 'creativeos',
        role: 'director',
        text: 'Bienvenido a CreativeOS. He analizado el brief de **Kōhai**. Mi primer dictamen crítico: la categoría de café de especialidad está cayendo en un pozo de clichés predecibles (sacos de yute, ilustraciones de plantas botánicas y estética hipster artesanal). \n\nPara construir una dirección de arte verdaderamente diferenciada, aplicamos nuestro principio fundamental: **NO CREAR ANTES DE ENTENDER**. Hemos definido el diagnóstico y extraído un insight que sitúa el producto como un refugio sensorial frente a la hiperestimulación digital.',
        timestamp: '10:00',
        isCritique: true,
      },
      {
        id: 'msg-2',
        sender: 'user',
        text: '¿Por qué descartamos el territorio de "El Antídoto al Píxel"? Sonaba muy rebelde para redes.',
        timestamp: '10:02',
      },
      {
        id: 'msg-3',
        sender: 'creativeos',
        role: 'strategy',
        text: 'Como estratega, te advierto: "El Antídoto al Píxel" es una idea reactiva, no propositiva. Cuando una marca se define exclusivamente en contra de la tecnología ("odio las pantallas"), termina sonando a manifiesto nostálgico de los años 90. \n\nEn cambio, **"La Gravedad del Silencio"** no juzga al usuario por trabajar en una computadora; le ofrece un objeto de contemplación que convive armónicamente con su vida moderna. A nivel de dirección de arte, nos permite un universo mucho más sofisticado y atemporal.',
        timestamp: '10:03',
        isCritique: true,
      },
    ],
    lastUpdated: '2026-09-03T10:04:00Z',
  },
  {
    id: 'volt-bank',
    title: 'Volt: Rebranding de Neobanco para Gen Z',
    brand: 'Volt Financial',
    category: 'Fintech / Banca Digital',
    brief: 'Rediseño de marca y dirección de arte para un neobanco que busca captar a jóvenes de 18 a 27 años. Todos los competidores usan gradientes violeta-azul, emojis flotantes 3D y lenguaje condescendiente ("¡Hey! Haz crecer tus ahorros 🚀"). Queremos una dirección visual madura, honesta y sin condescendencia.',
    targetAudience: 'Jóvenes de 18 a 27 años con múltiples fuentes de ingresos (freelance, micro-inversiones) que sienten ansiedad ante el costo de vida.',
    currentPhase: 'territorios',
    activeRole: 'concept',
    discoveryNotes: `### Auditoría Crítica:
La banca para jóvenes sufre de "infantilización corporativa": logos con caritas sonrientes, mascotas 3D de plástico y promesas falsas de hacerse rico fácil.

### Problema Real:
La Gen Z no tiene problemas para usar apps; tiene ansiedad financiera real (alquileres impagables, precariedad laboral). Quieren herramientas transparentes, no un parque de diversiones.`,
    definitionNotes: `### Diagnóstico:
- **Problema de Comunicación:** Falta de respeto al intelecto del usuario. El tono festivo de las fintech choca con la crudeza de la realidad económica.
- **Objetivo Creativo:** Posicionar a Volt como la herramienta financiera más sobria, certera y brutalmente transparente del mercado.`,
    insightNotes: `### Insight:
*"Los jóvenes no quieren que su banco sea su 'amigo' ni que use su jerga en Twitter. Quieren que sea como un instrumento de precisión suizo: silencioso, exacto y sin juicios morales sobre cómo gastan su dinero."*`,
    territories: [
      {
        id: 'v1',
        name: 'Instrumento de Precisión',
        tagline: 'Cero ruido. Cero moralina. Solo números claros.',
        insight: 'El dinero es una herramienta técnica, no un meme.',
        centralIdea: 'Volt se presenta con la estética de un sintetizador analógico o un velocímetro aeronáutico de alta gama.',
        visualPotential: 'Diseño ultra-monoespaciado, contrastes altos de negro y verde fósforo técnico, diagramas de flujo cinéticos inspirados en terminales financieras profesionales adaptadas al smartphone.',
        narrativePotential: 'Tono directo, telegráfico y transparente: "Tu dinero hoy. Sin rodeos."',
        critique: 'Diferenciación radical frente a los neobancos color pastel. Muy aspiracional para la generación que creció con interfaces complejas.',
        isChosen: true,
      },
      {
        id: 'v2',
        name: 'La Realidad Sin Filtros',
        tagline: 'Las cosas cuestan lo que cuestan.',
        insight: 'El optimismo forzado de la publicidad genera rechazo cuando la inflación aprieta.',
        centralIdea: 'Comportarse con la franqueza de un documento periodístico.',
        visualPotential: 'Fotografía documental en blanco y negro de la vida urbana cotidiana, tipografía bold sans-serif de periódico y gráficos con estilo infográfico austero.',
        narrativePotential: 'Titulares crudos que validan la lucha económica cotidiana sin paternalismo.',
        critique: 'Gran honestidad, pero corre el riesgo de asociar la marca con pesimismo crónico.',
        isChosen: false,
      },
    ],
    selectedTerritoryId: 'v1',
    chatHistory: [
      {
        id: 'v-msg-1',
        sender: 'creativeos',
        role: 'director',
        text: 'Analizando el brief de Volt: Hemos prohibido explícitamente los gradientes púrpuras, las manos 3D con pulgares arriba y los copies condescendientes. Si queremos ganar el respeto de esta audiencia, el sistema visual debe reflejar competencia técnica y sobriedad.',
        timestamp: '11:15',
        isCritique: true,
      },
    ],
    lastUpdated: '2026-09-03T11:20:00Z',
  },
];

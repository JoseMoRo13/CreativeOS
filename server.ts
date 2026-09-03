import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Lazy initialization of Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

const CREATIVEOS_SYSTEM_PROMPT = `
Eres CreativeOS, un asistente de inteligencia artificial de élite especializado en dirección creativa, estrategia de comunicación, branding, publicidad y dirección de arte.

Tu función principal es ayudar a transformar un problema, una necesidad o un brief en una solución creativa con fundamento estratégico y alto potencial visual.

COMBINAS CINCO PERFILES PROFESIONALES:
1. 🧠 Estratega de marca: Identifica problemas de fondo, tensiones culturales, oportunidades de negocio y verdaderos insights humanos.
2. 💡 Director creativo: Desarrolla conceptos rectores memorables, territorios creativos contrastantes y campañas integradas.
3. 🎨 Director de arte: Transforma las ideas en sistemas y universos visuales (paletas cromáticas con justificación semiótica, tipografía display vs lectura, composición, encuadre, iluminación, texturas, estilo fotográfico/3D y dirección de arte en piezas reales).
4. ✍️ Especialista en comunicación: Construye mensajes contundentes, claims, copys con ritmo, manifiestos y storytelling coherente con la estrategia.
5. 🤖 Especialista en IA generativa: Convierte las decisiones de arte en prompts de alta precisión para herramientas de IA (Midjourney v6, FLUX 1.1 Pro, Imagen 3), con terminología fotográfica y cinematográfica (lentes, iluminación, planos, color grading).

PERSONALIDAD PROFESIONAL:
- Estratégico, Creativo, Crítico, Directo, Visual, Curioso, Propositivo.
- REGLA DE ORO: NO SEAS COMPLACIENTE. Si una idea es débil o genérica, dilo con tacto pero con total claridad: "La idea tiene potencial, pero actualmente es genérica porque podría funcionar para cualquier marca competidora. Sugiero buscar un insight más específico...".
- Evita clichés publicitarios desgastados, frases huecas de marketing ("empodera tu pasión", "sé tú mismo") y listas superficiales de 10 ocurrencias sin fondo. Prefiere 2-3 caminos explorados con profundidad quirúrgica.

PRINCIPIO FUNDAMENTAL DE CREATIVEOS:
"NO CREAR ANTES DE ENTENDER"
Nunca propongas una solución creativa sin comprender primero el problema que debe resolverse.
Modelo de razonamiento:
INFORMACIÓN → PROBLEMA → OPORTUNIDAD → INSIGHT → CONCEPTO → DIRECCIÓN CREATIVA → DIRECCIÓN DE ARTE → EJECUCIÓN

METODOLOGÍA EN 5 ETAPAS:
1. DESCUBRIR: ¿Qué se necesita? ¿Por qué? ¿Para quién? ¿Contexto cultural? ¿Qué información crítica falta?
2. DEFINIR: Diagnóstico creativo (Problema de comunicación real, Objetivo creativo qué pensar/sentir/hacer, Oportunidad de diferenciación).
3. ENCONTRAR EL INSIGHT: Verdad humana o tensión cultural reveladora (no un simple dato estadístico).
4. CREAR TERRITORIOS: Desarrollar direcciones creativas contrastantes con Nombre, Insight, Idea central, Potencial visual y Potencial narrativo.
5. SELECCIONAR Y PROFUNDIZAR: Concepto rector → Mensaje/Copy → Universo de Dirección de Arte completo → Aplicaciones en medios → Prompts y producción.

Responde siempre en español profesional, con terminología precisa de agencia/estudio de diseño y formato visualmente estructurado con markdown.
`;

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Interactive Chat with CreativeOS
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], module = "all", phase = "descubrir", projectContext } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "El mensaje es requerido." });
    }

    const ai = getGenAI();

    // Module focus prompt modification
    let roleFocus = "";
    switch (module) {
      case "strategy":
        roleFocus = "\nMODO ACTIVO: 🧠 ESTRATEGA DE MARCA. Enfócate primordialmente en el diagnóstico del problema, tensiones de mercado, perfil del usuario y el hallazgo de insights no obvios.";
        break;
      case "concept":
        roleFocus = "\nMODO ACTIVO: 💡 DIRECTOR CREATIVO. Enfócate en el concepto central, la gran idea, la metáfora rectora y los territorios de campaña.";
        break;
      case "art_direction":
        roleFocus = "\nMODO ACTIVO: 🎨 DIRECTOR DE ARTE. Enfócate rigurosamente en el universo visual: paleta de color (con códigos hex y jerarquía), pares tipográficos, composición (regla de tercios, simetría brutalista, etc.), estilo de iluminación (luz suave, chiaroscuro, golden hour, neón difuso), texturas y coherencia estética.";
        break;
      case "copy":
        roleFocus = "\nMODO ACTIVO: ✍️ ESPECIALISTA EN COMUNICACIÓN / COPYWRITER. Enfócate en el claim rector, tono de voz, manifiesto de marca, titulares con punch y bajadas conceptuales.";
        break;
      case "ai_visual":
        roleFocus = "\nMODO ACTIVO: 🤖 ESPECIALISTA EN IA GENERATIVA & PROMPTING. Convierte las intenciones de dirección de arte en prompts ultra-detallados para Midjourney v6 y FLUX, especificando lente (ej. 35mm f/1.4), cámara, tipo de plano, iluminación, paleta y negative prompts.";
        break;
      default:
        roleFocus = "\nMODO ACTIVO: ⚡ DIRECCIÓN CREATIVA INTEGRAL (Coordinando Estrategia, Concepto, Arte, Copy e IA).";
    }

    const phaseInfo = `\nFASE METODOLÓGICA ACTUAL: ${phase.toUpperCase()} (Recuerda el principio: No crear antes de entender).`;

    let contextString = "";
    if (projectContext) {
      contextString = `\nCONTEXTO DEL PROYECTO ACTUAL:\n- Nombre / Marca: ${projectContext.brand || "Sin especificar"}\n- Brief / Necesidad: ${projectContext.brief || "No detallado"}\n- Público Objetivo: ${projectContext.target || "General"}\n- Diagnóstico actual: ${projectContext.diagnosis || "En proceso"}\n- Territorio seleccionado: ${projectContext.selectedTerritory || "Pendiente de definir"}`;
    }

    const systemInstruction = `${CREATIVEOS_SYSTEM_PROMPT}\n${roleFocus}\n${phaseInfo}\n${contextString}`;

    // Construct contents with formatted history
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) {
        if (item.sender === "user") {
          contents.push({ role: "user", parts: [{ text: item.text }] });
        } else if (item.sender === "creativeos") {
          contents.push({ role: "model", parts: [{ text: item.text }] });
        }
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "No se pudo generar respuesta en este momento.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: error.message || "Error procesando la solicitud en CreativeOS.",
    });
  }
});

// Structured methodology generator (Descubrir, Definir, Insight, Territorios, Profundizar)
app.post("/api/methodology/step", async (req, res) => {
  try {
    const { step, projectData } = req.body;
    if (!step) {
      return res.status(400).json({ error: "Paso de metodología requerido." });
    }

    const ai = getGenAI();

    let stepPrompt = "";
    if (step === "descubrir") {
      stepPrompt = `
Genera la ETAPA 1: DESCUBRIR para el siguiente proyecto:
Marca/Producto: ${projectData.brand || "Marca"}
Brief/Problema inicial: ${projectData.brief || "Necesidad de comunicación"}
Público objetivo aproximado: ${projectData.target || "Audiencia"}

Sigue estrictamente la metodología de CreativeOS:
Identifica:
1. ¿Qué se necesita realmente?
2. ¿Por qué se necesita ahora?
3. ¿Para quién es (más allá de la demografía superficial: hábitos, tensiones, frustraciones)?
4. ¿Cuál es el contexto cultural y de mercado?
5. ¿Cuál es el problema raíz que debe resolverse?
6. ¿Qué información crítica aún falta para no asumir nada a ciegas?

Sé incisivo, analítico y honesto. Formatea la respuesta con subtítulos elegantes en Markdown.
`;
    } else if (step === "definir") {
      stepPrompt = `
Genera la ETAPA 2: DEFINIR (DIAGNÓSTICO CREATIVO) para el siguiente proyecto:
Marca/Producto: ${projectData.brand}
Brief: ${projectData.brief}
Descubrimiento previo: ${projectData.discovery || "Análisis de contexto completado"}

Convierte la información en un DIAGNÓSTICO ESTRATÉGICO riguroso:
1. Problema de Comunicación: ¿Qué está dificultando la conexión real entre la marca y las personas? (Diferencia entre el problema de ventas/negocio y el problema de comunicación).
2. Objetivo Creativo: ¿Qué queremos que las personas piensen, sientan o hagan exactamente?
3. Oportunidad Estratégica: ¿Qué territorio o espacio no reclamado existe en la categoría para desarrollar una solución diferente y no cliché?
4. Juicio Crítico de CreativeOS: Evaluación de la viabilidad y advertencia sobre trampas o clichés comunes en este sector.
`;
    } else if (step === "insight") {
      stepPrompt = `
Genera la ETAPA 3: ENCONTRAR EL INSIGHT para el siguiente proyecto:
Marca/Producto: ${projectData.brand}
Diagnóstico: ${projectData.definition || projectData.brief}

RECUERDA: Un dato estadístico ("la gente toma café de mañana") NO es un insight.
Un insight es una verdad humana, cultural o emocional no dicha que genera un clic instantáneo ("La gente no busca café solo por la cafeína, busca una pausa táctil permitida en un día hiperacelerado").

Entrega:
1. El Dato de partida vs. La Verdad Humana subyacente.
2. La Tensión Cultural o Emocional clave.
3. El INSIGHT PRINCIPAL (formúlalo en 1 o 2 frases contundentes y memorables).
4. 2 Insights alternativos para explorar otros ángulos emocionales.
5. Cómo este insight abre la puerta a la dirección de arte y narrativa.
`;
    } else if (step === "territorios") {
      stepPrompt = `
Genera la ETAPA 4: EXPLORACIÓN DE TERRITORIOS CREATIVOS para:
Marca: ${projectData.brand}
Insight validado: ${projectData.insight || projectData.brief}

Crea EXACTAMENTE 3 TERRITORIOS CREATIVOS radicalmente diferentes entre sí (ninguno genérico).
Para cada uno de los 3 territorios incluye:
- Nombre del Territorio (evocador, sonoro)
- Insight que lo sustenta
- Idea Central (Qué propone la campaña o dirección)
- Potencial Visual & Dirección de Arte preliminar (atmósfera cromática, referencias estéticas, textura visual)
- Potencial Narrativo (titular ancla, tono de voz y cómo se extiende a piezas)
- Evaluación crítica de CreativeOS (nivel de diferenciación vs riesgo)

Sé audaz y específico.
`;
    } else if (step === "profundizar") {
      stepPrompt = `
Genera la ETAPA 5: SELECCIONAR Y PROFUNDIZAR - SISTEMA COMPLETO DE DIRECCIÓN DE ARTE Y CAMPAÑA para:
Marca: ${projectData.brand}
Territorio seleccionado: ${projectData.selectedTerritory || "Territorio Rector"}
Insight: ${projectData.insight || ""}

Desarrolla el universo creativo integral:
1. 💡 CONCEPTO RECTOR & MANIFIESTO
- La Gran Idea en una frase
- Manifiesto o Claim de campaña

2. 🎨 SISTEMA Y UNIVERSO DE DIRECCIÓN DE ARTE (Máxima profundidad):
- Concepto Visual Rector (el principio que rige cada imagen y pieza)
- Paleta Cromática: Especifica 4 a 5 colores exactos con nombres poéticos, códigos Hexadecimales (#HEX) y su rol semiótico en la composición.
- Tipografía: Pares tipográficos recomendados (Display/Editorial para titulares y sans/serif para lectura) con justificación de personalidad.
- Composición y Encuadres: Reglas de composición espacial, uso de negativos, simetría vs tensión diagonal.
- Iluminación y Textura: Tratamiento de la luz (naturalista, contraluz dramático, luz estroboscópica, difusión analógica, grano 35mm, acabados táctiles).
- Tratamiento Fotográfico / Audiovisual: Lentes recomendados (ej. 28mm gran angular cercano, 85mm retrato íntimo), profundidad de campo, grading de color.

3. ✍️ COPY & APLICACIONES CLAVE:
- Titulares para Vía Pública / OOH (impacto en 3 segundos)
- Pieza Audiovisual / Guión de apertura (30 segundos)
- Aplicación Digital / Social Media interactiva

4. 🤖 PROMPTS PROFESIONALES DE IA GENERATIVA (Midjourney / FLUX / Imagen):
- 2 Prompts completos, cinematográficos y listos para copiar, con parámetros de cámara, iluminación, color y negative prompts.
`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: stepPrompt,
      config: {
        systemInstruction: CREATIVEOS_SYSTEM_PROMPT,
        temperature: 0.75,
      },
    });

    res.json({
      step,
      content: response.text || "No se pudo generar contenido para este paso.",
    });
  } catch (error: any) {
    console.error("Error in /api/methodology/step:", error);
    res.status(500).json({
      error: error.message || "Error al procesar el paso metodológico.",
    });
  }
});

// Prompt generator for AI visual production
app.post("/api/generate-prompt", async (req, res) => {
  try {
    const { concept, artStyle, platform = "midjourney", cameraLens, lighting, mood } = req.body;

    const ai = getGenAI();

    const promptRequest = `
Como Especialista en IA Generativa y Director de Arte de CreativeOS:
Genera un set de prompts de altísima precisión para ${platform.toUpperCase()} basados en:
- Concepto/Idea: ${concept || "Dirección de arte moderna"}
- Estilo Artístico: ${artStyle || "Fotografía editorial de alta gama"}
- Lente y Cámara sugerida: ${cameraLens || "35mm prime lens, f/1.8"}
- Iluminación: ${lighting || "Luz suave direccional, tonos cinematográficos"}
- Mood/Emoción: ${mood || "Estratégico, memorable, sofisticado"}

Entrega:
1. Prompt Principal en inglés (estándar de la industria para Midjourney/FLUX) con todos los modificadores técnicos y estéticos sin palabras clichés de baja calidad.
2. Parámetros recomendados (--ar 16:9, --style raw, --v 6.1, etc.).
3. Negative prompt (elementos a excluir para evitar acabados plásticos de IA genérica).
4. Variante alternativa con otro enfoque de plano o ángulo.
5. Explicación breve de por qué este prompt respeta la dirección de arte establecida.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptRequest,
      config: {
        systemInstruction: CREATIVEOS_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    res.json({ promptResult: response.text });
  } catch (error: any) {
    console.error("Error in /api/generate-prompt:", error);
    res.status(500).json({ error: error.message || "Error generando prompt de arte." });
  }
});

// Generate visual concept image using Gemini Image model
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt, aspectRatio = "1:1" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "El prompt visual es obligatorio." });
    }

    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-image",
      contents: {
        parts: [
          {
            text: `Art direction concept visual, high-end editorial aesthetic, professional production: ${prompt}`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
        },
      },
    });

    let imageUrl = null;
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || "image/png";
          imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      return res.status(422).json({
        error: "No se pudo generar la imagen a partir del prompt especificado.",
      });
    }

    res.json({ imageUrl });
  } catch (error: any) {
    console.error("Error in /api/generate-image:", error);
    res.status(500).json({
      error: error.message || "Error al renderizar el concepto visual.",
    });
  }
});

// Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CreativeOS Server running on port ${PORT}`);
  });
}

startServer();

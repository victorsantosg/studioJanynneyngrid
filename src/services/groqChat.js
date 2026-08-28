const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_PRIMARY_MODEL = 'openai/gpt-oss-120b';
const GROQ_SECONDARY_MODEL = 'qwen/qwen3.6-27b';

const GEMINI_PRIMARY_MODEL = 'gemini-3.6-flash';
const GEMINI_SECONDARY_MODEL = 'gemini-3.5-flash-lite';

// Chaves de API lidas das variáveis de ambiente (Vercel / .env local)
const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';


const SYSTEM_PROMPT = `
Você é a Assistente Criativa e Consultora de Estamparia do **Studio Janynne Yngrid** (estúdio de design de superfície, estamparia exclusiva em aquarela têxtil e identidade de coleções).

### QUEM É JANYNNE YNGRID & O STUDIO:
- **Janynne Yngrid**: Designer de superfície e artista têxtil especializada em aquarelas feitas à mão e digitalizadas com fidelidade máxima.
- **Especialidades**: Estamparia corrida (rapport perfeito sem emendas), estampas localizadas, barrados, cartelas de cores personalizadas e consultoria estética para marcas de moda.
- **Nichos atendidos com maestria**:
  1. Moda Feminina / Casual Chic / Resort
  2. Moda Infantil & Bebê (traços lúdicos e delicados como a coleção "Frutificar" e "Paraíso")
  3. Moda Praia & Beachwear (como cangas, maiôs e saídas de praia)
  4. Acessórios e Home Decor (bolsas, almofadas, papéis de parede)
- **Coleções Autorais de Destaque**:
  - *Summer Mocha & Blue (2025)*: Destaque para Mocha Mousse com azul escuro e textura rica.
  - *Frutificar (2024)*: Coleção infantil aquarelada em cartela primavera/verão com linho.
  - *Paraíso (2024)*: Universo lúdico infantil desenvolvido para Turma de Meninas.
  - *Santa Palha (2024)*: Aquarela com textura orgânica e toque natural.

### SUA MISSÃO COMO GERADORA DE BRIEFING:
1. Receba o cliente com tom caloroso, sofisticado, criativo e acolhedor (use emojis delicados como 🌸, 🎨, 🌿, ✨).
2. Conduza um diálogo fluido e envolvente para descobrir:
   - **Nicho/Público**: (ex: Infantil, Moda Feminina, Moda Praia, etc.)
   - **Tema & Inspiração**: (ex: Jardim Secreto, Frutas Tropicais, Botânica Romântica, Mar & Conchas, etc.)
   - **Cartela de Cores / Vibe**: (ex: Tons pastel suaves, Cores solares vibrantes, Mocha e Azul, Terracota e Verde oliva)
   - **Peças e Aplicações Pretendidas**: (ex: Vestidos longos, biquínis, cangas, conjuntos, almofadas)
   - **Prazos ou Quantidade de Estampas**: (uma estampa principal ou coleção completa com falsos lisos)

3. **QUANDO GERAR O BRIEFING CONCLUÍDO:**
Sempre que você tiver reunido informações suficientes do cliente OU se o cliente pedir para sintetizar/fechar o briefing, além da sua resposta cordial, inclua OBRIGATORIAMENTE no final da mensagem um bloco no formato exato abaixo:

:::BRIEFING_CARD
{
  "titulo": "Nome ou Tema Sugerido para a Coleção",
  "nicho": "Nicho / Segmento",
  "tema": "Conceito e Elementos Visuais Chave",
  "cores": "Paleta de Cores Recomendada",
  "pecas": "Peças e Aplicações Pretendidas",
  "resumoWhatsApp": "Texto conciso e elegante para enviar direto para a Janynne no WhatsApp"
}
:::

Importante: Mantenha sempre o tom profissional, apaixonado por arte e focado em valorizar o trabalho autoral do estúdio. Responda em Português do Brasil.
`;

function cleanThinkingTokens(text) {
  if (!text) return '';
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  if (cleaned.includes('<think>')) {
    cleaned = cleaned.replace(/<think>[\s\S]*/gi, '').trim();
  }
  return cleaned;
}

/**
 * Chamada à API do Google Gemini
 */
async function callGemini(messages, modelName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_KEY}`;

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini status ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Gemini retornou conteúdo vazio.');
  return cleanThinkingTokens(rawText);
}

/**
 * Chamada à API da Groq Cloud
 */
async function callGroq(messages, modelName) {
  const payload = {
    model: modelName,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ],
    temperature: 0.7,
    max_tokens: 2048,
    top_p: 0.95
  };

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Groq status ${response.status}`);
  }

  const data = await response.json();
  const rawContent = data.choices?.[0]?.message?.content;
  if (!rawContent) throw new Error('Groq retornou conteúdo vazio.');
  return cleanThinkingTokens(rawContent);
}

/**
 * Orquestrador com Failover Inteligente:
 * 1. Google Gemini 3.6 Flash (Veloz, sem tags de thinking e excelente em português)
 * 2. Google Gemini 3.5 Flash Lite (Leve e estável)
 * 3. Groq Cloud (GPT-OSS 120B)
 * 4. Groq Cloud (Qwen 3.6 27B)
 */
export async function sendChatMessage(messages) {
  const attempts = [
    { provider: 'Google Gemini (3.6 Flash)', fn: () => callGemini(messages, GEMINI_PRIMARY_MODEL) },
    { provider: 'Google Gemini (3.5 Flash Lite)', fn: () => callGemini(messages, GEMINI_SECONDARY_MODEL) },
    { provider: 'Groq Cloud (GPT-OSS 120B)', fn: () => callGroq(messages, GROQ_PRIMARY_MODEL) },
    { provider: 'Groq Cloud (Qwen 3.6)', fn: () => callGroq(messages, GROQ_SECONDARY_MODEL) }
  ];

  let lastError = null;

  for (const attempt of attempts) {
    try {
      const reply = await attempt.fn();
      if (reply) return reply;
    } catch (err) {
      console.warn(`[AI Failover] ${attempt.provider} falhou: ${err.message}. Tentando contingência...`);
      lastError = err;
    }
  }

  throw new Error(`Falha em todos os provedores de IA: ${lastError?.message || 'Indisponibilidade temporária'}`);
}

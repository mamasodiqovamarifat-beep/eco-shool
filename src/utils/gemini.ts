import { GoogleGenAI } from '@google/genai';

export const DEFAULT_GEMINI_KEY = 'AIzaSyCJfF1WAfzmx8C-6-sSz6cgmHQakeX37dQ';

export function getGeminiApiKey(): string {
  try {
    const saved = localStorage.getItem('eco_gemini_api_key');
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch {
    // Ignore localStorage errors
  }

  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim()) {
    return envKey.trim();
  }

  return DEFAULT_GEMINI_KEY;
}

export function setGeminiApiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem('eco_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('eco_gemini_api_key');
    }
  } catch (err) {
    console.error('Failed to save Gemini key to localStorage:', err);
  }
}

export function getGenAIClient(customKey?: string): GoogleGenAI {
  const apiKey = (customKey && customKey.trim()) || getGeminiApiKey();
  return new GoogleGenAI({ apiKey });
}

/**
 * Test Gemini API connection to verify the key works
 */
export async function testGeminiConnection(key?: string): Promise<{ success: boolean; message: string }> {
  try {
    const ai = getGenAIClient(key);
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Eco-Schools Yashil Maktab dasturi uchun 1 ta qisqa ruhlantiruvchi shior yoz (uzbek tilida, 5-7 soz).',
    });

    const reply = response.text || 'Aloqa muvaffaqiyatli o‘rnatildi!';
    return {
      success: true,
      message: `Gemini AI muvaffaqiyatli ulandi! Namunaviy javob: "${reply.trim()}"`,
    };
  } catch (error: any) {
    console.error('Gemini connection test failed:', error);
    return {
      success: false,
      message: error?.message || 'Gemini API kaliti bilan bog‘lanishda xatolik yuz berdi. Internet va kalitni tekshiring.',
    };
  }
}

/**
 * Generate speech notes for speaker on current slide
 */
export async function generateSpeakerNotes(params: {
  slideTitle: string;
  slideSubtitle?: string;
  slideDescription?: string;
  bulletPoints?: string[];
  schoolName: string;
}): Promise<string> {
  const ai = getGenAIClient();
  const prompt = `
Siz Eco-Schools (Yashil Maktablar) xalqaro dasturi bo'yicha ekspert taqdimotchisiz.
Maktab nomi: ${params.schoolName}
Slayd sarlavhasi: "${params.slideTitle}"
Quyi sarlavha: "${params.slideSubtitle || ''}"
Tavsif: "${params.slideDescription || ''}"
Asosiy bandlar:
${(params.bulletPoints || []).map((b) => `- ${b}`).join('\n')}

Vazifa: Ushbu slaydni hakamlar hay'ati va maktab jamoasi oldida jonli himoya qilayotgan o'quvchi yoki o'qituvchi uchun 1-2 daqiqalik ta'sirli, aniq va ishonchli NUTQ (ma'ruza matni) yozib bering.
Nutq o'zbek tilida, professional va ruhlantiruvchi ohangda bo'lsin. Hech qanday keraksiz kirish so'zlarsiz, to'g'ridan-to'g'ri nutq matnini taqdim eting.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
  });

  return response.text || '';
}

/**
 * Generate AI eco-advice or answers to eco-questions
 */
export async function askGeminiEcoAdvisor(question: string, schoolName: string): Promise<string> {
  const ai = getGenAIClient();
  const prompt = `
Siz O'zbekistondagi Eco-Schools (Yashil Maktablar) dasturi bo'yicha rasmiy AI Eko-Maslahatchisiz.
Maktab: ${schoolName}.
Foydalanuvchi savoli / murojaati: "${question}"

Vazifa: Ushbu savolga amaliy, aniq, O'zbekiston iqlimi va maktab sharoitiga mos, Eco-Schools 7 qadam mezonlariga tayangan holda professional va batafsil javob bering. O'zbek tilida yozing.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
  });

  return response.text || '';
}

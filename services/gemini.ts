
import { GoogleGenAI } from "@google/genai";

export const getWaterFact = async (stageName: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a short, fun, and educational fact for kids about the water cycle stage: ${stageName}. Keep it simple and in Arabic. Maximum 20 words.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || "الماء حياة!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "هل تعلم أن الماء على الأرض اليوم هو نفس الماء الذي كان موجوداً منذ ملايين السنين؟";
  }
};

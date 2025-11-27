import { GoogleGenAI } from "@google/genai";
import { CelestialBody } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI", error);
}

export const fetchCelestialInfo = async (body: CelestialBody): Promise<string> => {
  if (!ai) {
    return "未配置 API 密钥，无法获取实时数据。";
  }

  try {
    const prompt = `
      你是一位天文学专家。请用中文提供关于 ${body.name} 的简明、有趣且具有教育意义的摘要。
      重点介绍它的关键特征、有趣的事实以及它在太阳系中的作用。
      请将回复控制在 150 字以内。不要使用 markdown 格式（如加粗或标题），仅提供纯文本段落。
      ${body.type === 'moon' ? '请提及它绕行的行星。' : ''}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "暂时没有可用信息。";
  } catch (error) {
    console.error("Error fetching data from Gemini:", error);
    return "获取数据失败。请检查您的网络连接或 API 密钥。";
  }
};
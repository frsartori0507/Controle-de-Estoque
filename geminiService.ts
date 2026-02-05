
import { GoogleGenAI, Type } from "@google/genai";
import { PaintItem, Transaction } from './types';

export const analyzeInventory = async (paints: PaintItem[], transactions: Transaction[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analise estes dados de inventário de tintas:
      Estoque Atual: ${JSON.stringify(paints)}
      Transações Recentes: ${JSON.stringify(transactions)}
      
      Forneça: 1. Itens que precisam de compra imediata. 2. Tendência de consumo (alta/baixa). 3. Duas dicas de otimização de espaço.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          alerts: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Lista de itens em estado crítico."
          },
          trend: {
            type: Type.STRING,
            description: "Resumo da tendência de movimento."
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Dicas de gestão."
          }
        },
        required: ["alerts", "trend", "tips"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return null;
  }
};

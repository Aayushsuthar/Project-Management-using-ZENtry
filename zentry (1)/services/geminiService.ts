
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI client using named parameters and direct environment variable access
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateTaskDescription = async (taskTitle: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional and detailed description for a business task titled: "${taskTitle}". Include key objectives and potential sub-tasks.`,
      config: {
        maxOutputTokens: 300,
        temperature: 0.7,
      }
    });
    // Access response.text as a property directly
    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Error connecting to AI Assistant.";
  }
};

export const chatWithAssistant = async (history: { role: string, text: string }[], message: string) => {
  const ai = getAIClient();
  try {
    // Correctly map history to Content objects with roles
    const contents = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: "You are ZENtry CoPilot, a helpful business AI assistant integrated into the ZENtry platform. You help with CRM summaries, task planning, and general office productivity. Keep responses concise and professional.",
        temperature: 0.8,
      }
    });
    // Access response.text as a property directly
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "The AI assistant is temporarily unavailable.";
  }
};

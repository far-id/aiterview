import { GoogleGenAI } from "@google/genai";
import { getCurrentKey, rotateKey } from "./geminiKeyManager";

export async function sendGemini(model: string, prompt: string, history: any[], configResponseSchema: any) {
  let attempts = 3;

  while (attempts > 0) {
    const apiKey = await getCurrentKey();

    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: model || "gemini-2.5-flash-lite",
      history,
      config: {
        responseMimeType: "application/json",
        responseSchema: configResponseSchema
      }
    });

    try {
      const { text } = await chat.sendMessage({ message: prompt });
      return text;
    } catch (err: any) {
      console.error("🔥 Gemini Error:", err, "endnya disini",);

      if (err.message.includes("429")) {
        console.log("429 Rate Limit, Rotating key...");
        await rotateKey();
        attempts--;
        continue;
      }

      throw err;
    }
  }

  throw new Error("All Gemini API keys have reached their rate limits.");
}

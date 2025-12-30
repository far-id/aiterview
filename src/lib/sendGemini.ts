import { GoogleGenAI } from "@google/genai";
import { getCurrentKey, rotateKey } from "./geminiKeyManager";

export async function sendGemini(model: string, prompt: string, history: any[], configResponseSchema: any) {
  let attempts = 3;

  while (attempts > 0) {
    console.log('getCurrentKey called');
    const apiKey = await getCurrentKey();
    console.log('getCurrentKey returned');

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
      console.log("Sending prompt to Gemini...");
      const { text } = await chat.sendMessage({ message: prompt });
      console.log("Received response from Gemini.");
      return text;
    } catch (err: any) {
      console.error("🔥 Gemini Error:", err, "end is here.",);

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

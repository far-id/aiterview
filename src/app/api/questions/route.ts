'use server';
import { NextRequest } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";

export async function POST(request: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'Gemini API key is not set' }), { status: 500 });
  }

  const { conversations, answer } = await request.json();

  console.log('Conversation:', conversations);
  console.log('Answer:', answer);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: [
      ...conversations.map((message: { role: string, text: string }) => ({
        role: message.role,
        parts: [{ text: message.text }],
      }))
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          pertanyaan: { type: Type.STRING },
          kategori: { type: Type.STRING, enum: ["technical", "behavioral", "situational"] },
          tips: { type: Type.STRING },
        },
        propertyOrdering: ["pertanyaan", "kategori", "tips"],
      }
    }
  });

  let parsedResponse: any = {};

  try {
    const { text } = await chat.sendMessage({ message: answer, });
    console.log('Response text:', text);
    parsedResponse = JSON.parse(text?.match(/{[\s\S]*}/)?.[0] || '{}');
  } catch (error) {
    if ((error as { code?: number }).code === 503) {
      return new Response(JSON.stringify({ error: 'Model sedang overload' }), { status: 503 });
    }
    else {
      console.error('Error parsing response:', error);
      return new Response(JSON.stringify({ error: 'Terjadi kesalahan' }), { status: 500 });
    }
  }

  console.log('Parsed response:', parsedResponse);
  return new Response(
    JSON.stringify({ message: parsedResponse }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

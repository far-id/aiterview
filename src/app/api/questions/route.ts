'use server';
import { NextRequest } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";
import { normalizeConversationText } from '@/lib/utils';

export async function POST(request: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'Gemini API key is not set' }), { status: 500 });
  }

  const { conversations, answer } = await request.json();
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const history = conversations.map((message: { role: string, text: string, category: string | null }) => ({
    role: message.role,
    parts: [{
      text:
        message.category ?
          `${normalizeConversationText(message.text)} [Kategori: ${message.category}]` :
          normalizeConversationText(message.text)
    }],
  }))

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: [...history],
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
    const { text } = await chat.sendMessage({ message: answer + 'berikan pertanyaan berikutnya, sesuai dengan instruksi yang telah diberikan variasi pertanyaan, penyesuaian dan tetap berdasar pada post lowongan yang telah disebutkan.', });
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

'use server';
import { NextRequest } from 'next/server';
import { Type } from "@google/genai";
import { normalizeConversationText } from '@/lib/utils';
import { sendGemini } from '@/lib/sendGemini';

export async function POST(request: NextRequest) {
  const { conversations, answer } = await request.json();
  const history = conversations.map((message: { role: string, text: string, category: string | null }) => ({
    role: message.role,
    parts: [{
      text:
        message.category ?
          `${normalizeConversationText(message.text)} [Kategori: ${message.category}]` :
          normalizeConversationText(message.text)
    }],
  }))

  try {
    const response = await sendGemini("gemini-3-flash-preview", answer, history, {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        category: { type: Type.STRING, enum: ["technical", "behavioral", "situational"] },
        tips: { type: Type.STRING },
      },
      propertyOrdering: ["question", "category", "tips"],
    });


    return new Response(
      JSON.stringify({
        message:
          JSON.parse(response?.match(/{[\s\S]*}/)?.[0] || "{}")
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const errorCode = (error as { code?: number }).code ?? 500;
    console.error(errorCode, 'Error parsing response:', error);

    return new Response(JSON.stringify({ error: `Error Occured on Server (code: ${errorCode})` }), { status: errorCode });
  }
}

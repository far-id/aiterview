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
    const prompt = `
      ${answer}.

      now generate the next question according to all the previous instructions
      the next question must follow the same structure and style used before
      adapt and personalize the next question based on the above answer if possible
      if the answer gives specific information relate your next question directly to it and probe deeper
      maintain variety across technical behavioral and situational categories
      ensure the new question remains aligned with the job description and requirements from the same job posting
      output only JSON with the keys question category tips and do not include anything else outside the JSON
    `;
    const response = await sendGemini("gemini-2.5-flash-lite", prompt, history, {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        category: { type: Type.STRING, enum: ["technical", "behavioral", "situational"] },
        tips: { type: Type.STRING },
      },
      propertyOrdering: ["question", "category", "tips"],
    });

    console.log('Received response:', response);

    return new Response(
      JSON.stringify({ message: response }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const errorCode = (error as { code?: number }).code;
    console.error('Error parsing response:', error);

    return new Response(JSON.stringify({ error: `Error Occured on Server (code: ${errorCode})` }), { status: errorCode });
  }
}

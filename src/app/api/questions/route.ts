'use server';
import { NextRequest } from 'next/server';
import { Type } from "@google/genai";
import { sendGemini } from '@/lib/sendGemini';
import { questionsRequestSchema } from '@/validator/questionsShcema';
import { validateRequest } from '@/lib/validateRequest';
import { buildConversationHistory } from '@/lib/conversationHistoryBuilder';

export async function POST(request: NextRequest) {
  const validation = await validateRequest(
    request,
    questionsRequestSchema
  );

  if (!validation.success) {
    return validation.response;
  }

  const { conversations, answer } = validation.data;
  const history = buildConversationHistory(conversations);

  try {
    console.log('Sending answer to Gemini ... ');
    const response = await sendGemini("gemini-3-flash-preview", answer, history, {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        category: { type: Type.STRING, enum: ["technical", "behavioral", "situational"] },
        tips: { type: Type.STRING },
      },
      propertyOrdering: ["question", "category", "tips"],
    });
    console.log('Received response from Gemini:', response);

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

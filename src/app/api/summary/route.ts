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
  const history = [
    ...conversations.map((message: { role: string, text: string, category?: string }) => ({
      role: message.role,
      parts: [{
        text:
          message.role === 'model' ?
            `${normalizeConversationText(message.text)} [Kategori: ${message.category ?? 'unknown'}]` :
            normalizeConversationText(message.text)
      }],
    })),
    {
      role: 'user',
      parts: [{ text: normalizeConversationText(answer) }],
    }
  ];

  const config = {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          myAnswer: { type: Type.STRING },
          feedback: { type: Type.STRING },
          example: { type: Type.STRING }
        },
        required: ["question", "myAnswer", "feedback", "example"],
        propertyOrdering: ["question", "myAnswer", "feedback", "example"],
      }
    }
  }

  const technicalChat = ai.chats.create({
    model: "gemini-2.5-flash-preview-05-20",
    history: history,
    config: config,
  });
  const behavioralChat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: history,
    config: config,
  });
  const situationalChat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: history,
    config: config,
  });

  let parsedResponse: any = {};

  const technicalPrompt = `Berikan penilaian atau feedback yang komprehensif dengan prinsip Behavioral Event Interview(BEI) untuk masing masing jawaban saya pada pertanyaan berkategori [technical].
  Hanya berikan feedback untuk pertanyaan dengan kategori technical. Abaikan atau kosongkan kategori behavioral dan situational.
  Berikan response dalam format JSON yang telah ditentukan. [question] berisi string pertanyaan yang telah diajukan, [myAnswer] berisi jawaban saya, [feedback] berisi penilaian atau feedback yang komprehensif dari kamu atas jawaban saya, dan [example] berisi contoh jawaban yang baik sesuai feedback yang kamu berikan, panjang [example] harus cukup pendek agar bisa dijawab dalam waktu kurang dari 2 menit. pada example, berikan contoh jawaban yang natural, yang bisa dijawab dengan lisan atau ucapan.
  gunakan bahasa indonesia.`;
  const behavioralPrompt = `Berikan penilaian atau feedback yang komprehensif dengan prinsip Behavioral Event Interview(BEI) untuk masing masing jawaban saya pada pertanyaan berkategori [behavioral].
  Hanya berikan feedback untuk pertanyaan dengan kategori behavioral. Abaikan atau kosongkan kategori technical dan situational.
  Berikan response dalam format JSON yang telah ditentukan. [question] berisi string pertanyaan yang telah diajukan, [myAnswer] berisi jawaban saya, [feedback] berisi penilaian atau feedback yang komprehensif dari kamu atas jawaban saya, dan [example] berisi contoh jawaban yang baik sesuai feedback yang kamu berikan, panjang [example] harus cukup pendek agar bisa dijawab dalam waktu kurang dari 2 menit. pada example, berikan contoh jawaban yang natural, yang bisa dijawab dengan lisan atau ucapan.
  gunakan bahasa indonesia.`;
  const situationalPrompt = `Berikan penilaian atau feedback yang komprehensif dengan prinsip Behavioral Event Interview(BEI) untuk masing masing jawaban saya pada pertanyaan berkategori [situational].
  Hanya berikan feedback untuk pertanyaan dengan kategori situational. Abaikan atau kosongkan kategori technical dan situational.
  Berikan response dalam format JSON yang telah ditentukan. [question] berisi string pertanyaan yang telah diajukan, [myAnswer] berisi jawaban saya, [feedback] berisi penilaian atau feedback yang komprehensif dari kamu atas jawaban saya, dan [example] berisi contoh jawaban yang baik sesuai feedback yang kamu berikan, panjang [example] harus cukup pendek agar bisa dijawab dalam waktu kurang dari 2 menit. pada example, berikan contoh jawaban yang natural, yang bisa dijawab dengan lisan atau ucapan.
  gunakan bahasa indonesia.`;

  try {
    const { text: technicalFeednack } = await technicalChat.sendMessage({
      message: technicalPrompt,
    });
    const { text: behavioralFeednack } = await behavioralChat.sendMessage({
      message: behavioralPrompt,
    });
    const { text: situationalFeednack } = await situationalChat.sendMessage({
      message: situationalPrompt,
    });

    parsedResponse = {
      technical: JSON.parse(technicalFeednack ?? '[]'),
      behavioral: JSON.parse(behavioralFeednack ?? '[]'),
      situational: JSON.parse(situationalFeednack ?? '[]'),
    }
  } catch (error) {
    const errorCode = (error as { code?: number }).code;
    if (errorCode === 500 || errorCode === 501 || errorCode === 502 || errorCode === 503 || errorCode === 504) {
      return new Response(JSON.stringify({ error: `Terjadi kesalahan pada server (kode: ${errorCode})` }), { status: errorCode });
    } else {
      console.error('Error parsing response:', error);
      return new Response(JSON.stringify({ error: 'Terjadi kesalahan' }), { status: 500 });
    }
  }

  return new Response(
    JSON.stringify({ message: parsedResponse }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

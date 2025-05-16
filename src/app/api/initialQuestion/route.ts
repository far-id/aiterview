'use server';
import { NextRequest } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";

export async function POST(request: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'Gemini API key is not set' }), { status: 500 });
  }

  const body = await request.json();
  const { position, description, responsibility, requirement } = body;

  // format response yang diharapkan
  // json pertanyaan berupa { "pertanyaan": string, "kategori": string, "tips": string }
  // json penilaian berupa { "technical": [{ "pertanyaan": string, "penilaian": string, "saran": string }], "behavioral": [{ "pertanyaan": string, "penilaian": string, "saran": string }], "situational": [{ "pertanyaan": string, "penilaian": string, "saran": string }] }

  // ? kayanya harus ada yg dibenerin. kalo gw kasih jawaban absurd dia jadi gila? apakah masih? harus di cek terus
  // todo: kadang ainya ngulang pertanyaan yang sama
  const prompt = `
    kamu adalah pewawancara yang sudah berpengalaman. gunakan metode BEI yang mengikuti format "STAR" atau "SAR" atau "CAR" untuk membuat pertanyaan. buatkan 8 pertanyaan dengan kategori 'technical', 'behavioral' atau 'situational'.
    technical bertujuan Menilai pengetahuan dan keterampilan teknis kandidat yang relevan dengan posisi yang dilamar.
    behavioral bertujuan Menggali bagaimana kandidat telah menangani situasi tertentu di masa lalu untuk memprediksi perilaku mereka di masa depan.
    situasional bertujuan Menilai bagaimana kandidat akan menangani situasi hipotetis yang mungkin terjadi di tempat kerja.
    buat hanya menampilkan pertanyaan dan kategori saja dalam bentuk json, jangan berikan respon lain selain dalam bentuk json. semua yang saya kirimkan selanjutnya merupakan jawaban saya.tampilkan pertanyaan satu per satu setelah saya menjawab pertanyaan tersebut.
    kemudian lanjut ke pertanyaan selanjutnya dan jika memungkinkan sesuaikan dengan jawaban saya sebelumnya. jika pertanyaan berhubungan dengan jawaban sebelumnya maka coba ubah kalimat pertanyaannya agar lebih spesifik. Berikan juga fariasi pertanyaan yang berbeda untuk setiap kategori.
    berikan juga sedikit tips untuk menjawab pertanyaan. setelah saya menjawab semua pertanyaan berikan penilaianmu dari jawaban dari masing masing jawaban saya dengan menerapkan BEI dalam satu respon json.

    Berikut adalah post lowongan pekerjaan untuk posisi ${position}:
    deskripsi pekerjaan atau perusahaan: ${description}
    tanggung jawab: ${responsibility}
    requirement: ${requirement}
  `;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: [],
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
    const { text } = await chat.sendMessage({ message: prompt, });
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
    JSON.stringify({ prompt, message: parsedResponse }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

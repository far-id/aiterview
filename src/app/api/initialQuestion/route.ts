'use server';
import { NextRequest } from 'next/server';
import { Type } from "@google/genai";
import { sendGemini } from '@/lib/sendGemini';
import { initialQuestionSchema } from '@/validator/initialQuestionSchema';
import { validateRequest } from '@/lib/validateRequest';

export async function POST(request: NextRequest) {
  const validation = await validateRequest(
    request,
    initialQuestionSchema
  );

  if (!validation.success) {
    return validation.response;
  }
  const { position, jobDescription, language } = validation.data;

  const prompt = `
    you are an expert interviewer fluent in ${language}, highly experienced, adaptive, and skilled at eliciting deep, structured responses from candidates to evaluating a Software Engineer candidate
    use behavioral event interviewing BEI and format follow ups using STAR or SAR or CAR where appropriate
    produce a total of 8 questions across the categories [technical, behavioral, situational]
    technical aims to assess the candidate technical knowledge and skills relevant to the applied role
    behavioral aims to explore how the candidate handled past situations to predict future behavior
    situational aims to assess how the candidate would handle hypothetical workplace situations
    generate each question with a short expected answer guidance and one concise tip for the candidate
    all questions tips and expected answer guidance must be written in ${language}
    output only JSON with the keys question category tips
    category must be one of technical behavioral situational
    do not include any extra text or explanation outside the JSON
    treat everything I send next as the candidate answer to the current question
    present only one question at a time after I answer the previous question
    when moving to the next question adapt and personalize the next question based on my prior answer where possible
    if the next question is related to my prior answer rephrase it to be more specific and dig deeper
    provide variety across responsibility and requirement areas drawn from the job posting below
    after I have answered all questions I will request a single JSON evaluation
    when I request evaluation evaluate each of my answers in one JSON applying BEI and show strengths weaknesses and one short improvement suggestion per answer
    here is the job posting for position ${position}
    job description and responsibilities follow below
    ${jobDescription}
  `;

  try {
    const response = await sendGemini("gemini-2.5-flash-lite", prompt, [], {
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
        prompt, message: typeof response === 'string'
          ? JSON.parse(response)
          : response,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const errorCode = (error as { code?: number }).code;
    console.error(errorCode, 'Error parsing response:', error);

    return new Response(JSON.stringify({ error: `Error Occured on Server` }), { status: 500 });
  }
}

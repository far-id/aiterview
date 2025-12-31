'use server';
import { NextRequest } from 'next/server';
import { Type } from "@google/genai";
import { normalizeConversationText } from '@/lib/utils';
import { sendGemini } from '@/lib/sendGemini';
import { summaryRequestSchema } from '@/validator/summarySchema';
import { validateRequest } from '@/lib/validateRequest';
import { buildConversationHistory } from '@/lib/conversationHistoryBuilder';

export async function POST(request: NextRequest) {
  const validation = await validateRequest(
    request,
    summaryRequestSchema
  );

  if (!validation.success) {
    return validation.response;
  }

  const { conversations, language } = validation.data;
  let history = buildConversationHistory(conversations);

  const answer = history.pop()?.parts[0].text || '';
  const evaluationQuestionsConfigResponseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        myAnswer: { type: Type.STRING },
        strengths: { type: Type.STRING },
        weaknesses: { type: Type.STRING },
        improvementSuggestion: { type: Type.STRING },
      },
      propertyOrdering: ["question", "myAnswer", "strengths", "weaknesses", "improvementSuggestion"]
    }
  }
  const summaryConfigResponseSchema = {
    type: Type.OBJECT,
    properties: {
      overall_candidate_summary: { type: Type.STRING },
      competency_assessment: {
        type: Type.OBJECT,
        properties: {
          teamwork: {
            type: Type.OBJECT,
            properties: {
              assessment: { type: Type.STRING },
              strengths_observed: { type: Type.STRING },
              evidence_quality: { type: Type.STRING, enum: ["Strong", "Limited", "Insufficient"] },
              notes: { type: Type.STRING },
            }
          },
          result_oriented: {
            type: Type.OBJECT,
            properties: {
              assessment: { type: Type.STRING },
              strengths_observed: { type: Type.STRING },
              evidence_quality: { type: Type.STRING, enum: ["Strong", "Limited", "Insufficient"] },
              notes: { type: Type.STRING },
            }
          },
          communication: {
            type: Type.OBJECT,
            properties: {
              assessment: { type: Type.STRING },
              strengths_observed: { type: Type.STRING },
              evidence_quality: { type: Type.STRING, enum: ["Strong", "Limited", "Insufficient"] },
              notes: { type: Type.STRING },
            }
          },
          integrity: {
            type: Type.OBJECT,
            properties: {
              assessment: { type: Type.STRING },
              strengths_observed: { type: Type.STRING },
              evidence_quality: { type: Type.STRING, enum: ["Strong", "Limited", "Insufficient"] },
              notes: { type: Type.STRING },
            }
          },
          people_development: {
            type: Type.OBJECT,
            properties: {
              assessment: { type: Type.STRING },
              strengths_observed: { type: Type.STRING },
              evidence_quality: { type: Type.STRING, enum: ["Strong", "Limited", "Insufficient"] },
              notes: { type: Type.STRING },
            }
          },
        }
      }
    },
    propertyOrdering: ["overall_candidate_summary", "competency_assessment"],
  };

  try {
    console.log("Sending data to Gemini for evaluation questions...");
    const evaluationQuestions = await sendGemini("gemini-3-flash-preview", answer, history, evaluationQuestionsConfigResponseSchema);

    history = [
      ...history,
      {
        role: 'user',
        parts: [{ text: normalizeConversationText(answer) }],
      },
      {
        role: 'model',
        parts: [{ text: normalizeConversationText(evaluationQuestions ?? '') }],
      }
    ]

    const prompt = `
    You are an experienced HR and Technical Interviewer evaluating a Software Engineer candidate based on a Behavioral Event Interview (BEI), using ${language} language.

Return the response strictly in JSON format.

You are provided with:
- The full interview transcript
- The per-question evaluation results, including identified weaknesses and improvement_suggestions

Your task is to critically assess the candidate’s competencies using ONLY the available evidence, while explicitly considering the quality, consistency, and credibility of the answers.

Competencies to Assess:
- Teamwork
- Result Oriented
- Communication
- Integrity
- People Development

Assessment Guidelines (STRICT):
- Prioritize BEI-compliant answers that describe real past behavior with clear actions and outcomes.
- If most supporting answers are marked as Partial or No, the competency MUST be rated as "Limited" or "Insufficient".
- Do NOT compensate weak evidence with assumptions, intentions, or hypothetical potential.
- Explicitly point out gaps, vague answers, missing outcomes, or lack of ownership.
- Use technical answers only to evaluate reasoning, decision-making, and applied knowledge — NOT coding ability.
- Use situational answers as secondary indicators ONLY and clearly label them as hypothetical.
- If a competency lacks clear behavioral evidence, state this clearly and directly.
- Do NOT fabricate, infer, or soften conclusions beyond what is stated in the data.
- Maintain a professional, objective, and critical HR tone similar to real hiring evaluations.

Be more critical than supportive.
Clarity and honesty are more important than encouragement.

Output Format:
{
  "overall_candidate_summary": "",
  "competency_assessment": {
    "teamwork": {
      "assessment": "",
      "strengths_observed": "",
      "evidence_quality": "Strong | Limited | Insufficient",
      "notes": ""
    },
    "result_oriented": {
      "assessment": "",
      "strengths_observed": "",
      "evidence_quality": "Strong | Limited | Insufficient",
      "notes": ""
    },
    "communication": {
      "assessment": "",
      "strengths_observed": "",
      "evidence_quality": "Strong | Limited | Insufficient",
      "notes": ""
    },
    "integrity": {
      "assessment": "",
      "strengths_observed": "",
      "evidence_quality": "Strong | Limited | Insufficient",
      "notes": ""
    },
    "people_development": {
      "assessment": "",
      "strengths_observed": "",
      "evidence_quality": "Strong | Limited | Insufficient",
      "notes": ""
    }
  }
}`;

    console.log("Sending data to Gemini for summary...");
    const summary = await sendGemini("gemini-3-flash-preview", prompt, history, summaryConfigResponseSchema);
    console.log("All responses received from Gemini.");
    return new Response(
      JSON.stringify({
        data: {
          evaluationQuestions:
            typeof evaluationQuestions === 'string'
              ? JSON.parse(evaluationQuestions)
              : evaluationQuestions,

          summary:
            typeof summary === 'string'
              ? JSON.parse(summary)
              : summary
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const errorCode = (error as { code?: number }).code;
    if (errorCode === 500 || errorCode === 501 || errorCode === 502 || errorCode === 503 || errorCode === 504) {
      return new Response(JSON.stringify({ error: `Terjadi kesalahan pada server (kode: ${errorCode})` }), { status: errorCode });
    } else {
      console.error('Error parsing response:', error);
      return new Response(JSON.stringify({ error: 'Terjadi kesalahan' }), { status: 500 });
    }
  }
}

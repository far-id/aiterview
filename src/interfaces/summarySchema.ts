export interface EvaluationSchema {
  data: {
    evaluationQuestions: EvaluationQuestion[];
    summary: EvaluationSummary;
  }
}

export interface EvaluationQuestion {
  question: string;
  myAnswer: string;
  strengths: string;
  weaknesses: string;
  improvementSuggestion: string;
}

export interface EvaluationSummary {
  overall_candidate_summary: string;
  competency_assessment: {
    communication: CompetencyDetail;
    integrity: CompetencyDetail;
    people_development: CompetencyDetail;
    result_oriented: CompetencyDetail;
    teamwork: CompetencyDetail;
  };
}

export type EvidenceQuality = "Strong" | "Limited" | "Insufficient";

export interface CompetencyDetail {
  assessment: string;
  strengths_observed: string;
  evidence_quality: EvidenceQuality;
  notes: string;
}

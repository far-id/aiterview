'use client'

import { useEffect, useState } from 'react';
import { EvaluationQuestion, EvaluationSchema, EvaluationSummary } from '@/interfaces/summarySchema';

export default function useSummary() {
  const [summary, setSummary] = useState<EvaluationSchema | undefined>()

  const getEvaluationSummary = (): EvaluationSummary | undefined => {
    return summary?.data.summary;
  }

  const getEvaluationQuestions = (): EvaluationQuestion[] | undefined => {
    return summary?.data.evaluationQuestions;
  }

  const storeSummary = (data: EvaluationSchema) => {
    setSummary(data);
    sessionStorage.setItem('summary', JSON.stringify(data));
  };

  const clearSummary = (): void => {
    setSummary(undefined);
    sessionStorage.removeItem('summary');
  };

  useEffect(() => {
    const storedSummary = sessionStorage.getItem('summary');
    if (storedSummary) {
      const parsedSummary = JSON.parse(storedSummary) as EvaluationSchema;
      setSummary(parsedSummary);
    }
  }, []);

  return {
    getEvaluationSummary,
    getEvaluationQuestions,
    storeSummary,
    clearSummary,
  };
}

'use client'

import { useState } from 'react';
import { SummarySchema } from '@/interfaces/summarySchema';

export default function useSummary() {
  const [summary, setSummary] = useState<SummarySchema | undefined>()

  const storeSummary = (data: SummarySchema) => {
    setSummary(data);

    window.sessionStorage.setItem('summary', JSON.stringify(data));
  };

  const clearSummary = (): void => {
    setSummary(undefined);
    window.sessionStorage.removeItem('summary');
  };

  return {
    summary,
    storeSummary,
    clearSummary,
  };
}

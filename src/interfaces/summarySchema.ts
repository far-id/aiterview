export interface SummarySchema {
  technical: SummaryItemSchema[];
  behavioral: SummaryItemSchema[];
  situational: SummaryItemSchema[];
}

export interface SummaryItemSchema {
  question: string;
  myAnswer: string;
  feedback: string;
  example: string;
}

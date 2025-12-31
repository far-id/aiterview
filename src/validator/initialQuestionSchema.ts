import { z } from 'zod';

export const initialQuestionSchema = z.object({
  position: z.string().min(3, {
    message: 'Position must be at least 3 characters long',
  }),
  jobDescription: z.string().min(20, {
    message: 'Job description must be at least 20 characters long',
  }),
  language: z.enum(["English", "Indonesian", "english", "indonesian", "en", "id"], {
    errorMap: () => ({
      message: "Language must be either English or Indonesian",
    }),
  }),
});

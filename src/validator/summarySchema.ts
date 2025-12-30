import { z } from "zod";
import { conversationSchema } from './questionsShcema';

export const summaryRequestSchema = z.object({
  language: z.enum(["English", "Indonesian"], {
    errorMap: () => ({
      message: "Language must be either English or Indonesian",
    }),
  }),

  conversations: z
    .array(conversationSchema)
    .min(9, "Conversation must contain a complete interview transcript")
    .max(25, "Conversation history is too long"),
});

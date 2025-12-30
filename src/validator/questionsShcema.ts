import { z } from "zod";

const roleEnum = z.enum(["user", "model"]);
const categoryEnum = z.enum(["technical", "behavioral", "situational"]);

export const conversationSchema = z.object({
  role: roleEnum,
  text: z
    .string()
    .min(1, "Text must not be empty")
    .max(8000, "Text is too long"),

  category: categoryEnum.optional(),
}).superRefine((data, ctx) => {
  // Category is only allowed for model responses
  if (data.role === "user" && data.category) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Category is not allowed for user messages",
      path: ["category"],
    });
  }
});

export const questionsRequestSchema = z.object({
  answer: z
    .string()
    .min(1, "Answer must not be empty")
    .max(3000, "Answer is too long"),

  conversations: z
    .array(conversationSchema)
    .min(2, "Conversation must contain at least a system prompt and one exchange")
    .max(25, "Conversation history is too long"),
});


export const aswerSchema = z.object({
  answer: z.string().min(2, { message: 'We need your answer' }),
});

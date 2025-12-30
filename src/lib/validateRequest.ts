import { NextRequest } from "next/server";
import { ZodSchema } from "zod";

type ValidationSuccess<T> = {
  success: true;
  data: T;
};

type ValidationFailure = {
  success: false;
  response: Response;
};

export async function validateRequest<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<ValidationSuccess<T> | ValidationFailure> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return {
      success: false,
      response: Response.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      )
    };
  }

  const result = schema.safeParse(body);

  if (!result.success) {
    return {
      success: false,
      response: Response.json(
        {
          error: "Invalid request payload",
          details: result.error.issues.map(issue => ({
            field: issue.path.join("."),
            message: issue.message
          }))
        },
        { status: 400 }
      )
    };
  }

  return {
    success: true,
    data: result.data
  };
}

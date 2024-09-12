import { Context, Next } from "hono";
import { z } from "zod";

export const validator = (schema: z.ZodSchema) => {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      schema.parse(body);
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ error: error.errors }, 400);
      }
      return c.json({ error: "Invalid request" }, 400);
    }
  };
};

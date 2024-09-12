import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  completed: z.boolean(),
  createdAt: z.date(),
});

export const CreateTodoSchema = TodoSchema.omit({
  //we don't need to send id and createdAt, it will be automatic
  id: true,
  createdAt: true,
}).extend({
  //we want this field to be not required, so we set default value
  completed: z.boolean().optional().default(false),
});

export const UpdateTodoSchema = CreateTodoSchema.partial();

export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodoDTO = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoDTO = z.infer<typeof UpdateTodoSchema>;

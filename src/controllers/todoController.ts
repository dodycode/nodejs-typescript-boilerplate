import { Context } from "hono";
import { todos } from "../db/schema";
import { CreateTodoSchema, UpdateTodoSchema } from "../models/todo";
import { TodoRepository } from "../repositories/todo";

export class TodoController {
  constructor(private todoRepository: TodoRepository) {}

  getAllTodos = async (c: Context) => {
    const todos = await this.todoRepository.findAll();
    return c.json(todos);
  };

  getTodoById = async (c: Context) => {
    const id = c.req.param("id");
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      return c.json({ message: "Todo not found" }, 404);
    }
    return c.json(todo);
  };

  createTodo = async (c: Context) => {
    const body = await c.req.json<typeof todos.$inferInsert>();
    const validatedData = CreateTodoSchema.parse(body);
    const todo = await this.todoRepository.create(validatedData);
    return c.json(todo, 201);
  };

  updateTodo = async (c: Context) => {
    const id = c.req.param("id");
    const body = await c.req.json<Partial<typeof todos.$inferInsert>>();
    const validatedData = UpdateTodoSchema.parse(body);
    const todo = await this.todoRepository.update(id, validatedData);
    if (!todo) {
      return c.json({ message: "Todo not found" }, 404);
    }
    return c.json(todo);
  };

  deleteTodo = async (c: Context) => {
    const id = c.req.param("id");
    await this.todoRepository.delete(id);
    return c.json({ message: "Todo deleted successfully" }, 200);
  };
}

import { Context } from "hono";
import { todos } from "../db/schema";
import { CreateTodoSchema, UpdateTodoSchema } from "../models/todo";
import { todoRepository } from "../repositories/todo";

type typeop = typeof todoRepository;

class TodoController {
  constructor(private todoRepository: typeop) {}

  getAllTodos = async (c: Context) => {
    const todos = await this.todoRepository.findAll();
    return c.json(todos);
  };

  getTodoById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const todo = await this.todoRepository.findOne(id);
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
    const id = parseInt(c.req.param("id"));
    const body = await c.req.json<Partial<typeof todos.$inferInsert>>();
    const validatedData = UpdateTodoSchema.parse(body);
    const todo = await this.todoRepository.update(id, validatedData);
    if (!todo) {
      return c.json({ message: "Todo not found" }, 404);
    }
    return c.json(todo);
  };

  deleteTodo = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    await this.todoRepository.delete(id);
    return c.json({ message: "Todo deleted successfully" }, 200);
  };
}

export const todoController = new TodoController(todoRepository);

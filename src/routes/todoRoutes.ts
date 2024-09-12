import { Hono } from "hono";
import { TodoController } from "../controllers/todoController";
import { TodoRepository } from "../repositories/todo";
import { db } from "../db/db";
import { validator } from "../middleware/validator";
import { CreateTodoSchema, UpdateTodoSchema } from "../models/todo";

const todoRouter = new Hono();

const todoRepository = new TodoRepository(db);
const todoController = new TodoController(todoRepository);

todoRouter.get("/", todoController.getAllTodos);
todoRouter.get("/:id", todoController.getTodoById);
todoRouter.post("/", validator(CreateTodoSchema), todoController.createTodo);
todoRouter.put("/:id", validator(UpdateTodoSchema), todoController.updateTodo);
todoRouter.delete("/:id", todoController.deleteTodo);

export { todoRouter };

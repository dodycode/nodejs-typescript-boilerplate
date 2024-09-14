import { Hono } from "hono";
import { todoController } from "../controllers/todoController";
import { validator } from "../middleware/validator";
import { CreateTodoSchema, UpdateTodoSchema } from "../models/todo";

const todoRouter = new Hono();

todoRouter.get("/", todoController.getAllTodos);
todoRouter.get("/:id", todoController.getTodoById);
todoRouter.post("/", validator(CreateTodoSchema), todoController.createTodo);
todoRouter.put("/:id", validator(UpdateTodoSchema), todoController.updateTodo);
todoRouter.delete("/:id", todoController.deleteTodo);

export { todoRouter };

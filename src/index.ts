import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { todoRouter } from "./routes/todoRoutes";

const app = new Hono();

app.route("/v1/todos", todoRouter);

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`); // Listening on http://localhost:3000
});

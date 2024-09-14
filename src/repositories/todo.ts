// import { eq } from "drizzle-orm";
import { db, type DbConnection } from "../db/db";
import { todos } from "../db/schema";
import { BaseRepository } from "./baseRepository";

class TodoRepository extends BaseRepository<typeof todos, "id"> {
  constructor(db: DbConnection) {
    super(db, todos, "id");
  }

  // You can add Todo-specific methods here if needed
  // async findByTitle(name: string): Promise<typeof todos.$inferSelect> {
  //   const result = await this.db
  //     .select()
  //     .from(todos)
  //     .where(eq(todos.title, name))
  //     .limit(1);
  //   return result[0];
  // }
}

export const todoRepository = new TodoRepository(db);

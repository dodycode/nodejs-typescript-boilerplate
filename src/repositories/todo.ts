// import { eq } from "drizzle-orm";
import { todos } from "../db/schema";
import { BaseRepository } from "./baseRepository";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export class TodoRepository extends BaseRepository<typeof todos> {
  constructor(db: PostgresJsDatabase) {
    super(db, todos);
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

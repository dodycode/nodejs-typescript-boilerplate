import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { PgTableWithColumns } from "drizzle-orm/pg-core";

export class BaseRepository<T extends PgTableWithColumns<any>> {
  constructor(
    protected db: PostgresJsDatabase,
    protected table: T,
  ) {}

  async findAll(): Promise<T["$inferSelect"][]> {
    return this.db.select().from(this.table);
  }

  async findById(id: string): Promise<T["$inferSelect"] | undefined> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));
    return result[0];
  }

  async create(data: T["$inferInsert"]): Promise<T["$inferSelect"]> {
    const result = await this.db.insert(this.table).values(data).returning();
    return result[0];
  }

  async update(
    id: string,
    data: Partial<T["$inferInsert"]>,
  ): Promise<T["$inferSelect"] | undefined> {
    const result = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

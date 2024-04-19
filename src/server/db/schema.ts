// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { pgEnum } from "node_modules/drizzle-orm/pg-core/index.cjs";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `dict_${name}`);

const wordLevelEnum = pgEnum("level", ["a1, a2, b1, b2, c1, c2"]);

export const posts = createTable(
  "words",
  {
    id: serial("id").primaryKey(),
    word: varchar("word", { length: 50 }),
    level: wordLevelEnum("level"),
    definitionURL: varchar("definition_url", { length: 255 }),
    pronauciationURL: varchar("pronunciation_url", { length: 255 }),
    pos: varchar("pos", { length: 50 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("word_idx").on(example.word),
  }),
);

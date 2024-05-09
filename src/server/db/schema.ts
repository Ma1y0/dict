// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `dict_${name}`);

export const words = createTable(
  "words",
  {
    id: serial("id").primaryKey(),
    word: varchar("word", { length: 50 }).unique().notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (table) => ({
    nameIndex: index("word_idx").on(table.word),
  }),
);

export const wordsRelations = relations(words, ({ many }) => ({
  meanings: many(meanings),
}));

// Word Meaning
export const meanings = createTable(
  "meanings",
  {
    id: serial("id").primaryKey(),
    wordId: integer("word_id").notNull(),
    pos: varchar("pos", { length: 50 }),
    definition: text("definition").notNull(),
		example: text("example"),
    synonyms: varchar("synonyms", { length: 50 }).array().notNull(),
    antonyms: varchar("antonyms", { length: 50 }).array().notNull(),
  },
  (table) => ({
    wordIdIndex: index("word_id_idx").on(table.wordId),
  }),
);

export const meaningsRelations = relations(meanings, ({ one }) => ({
  word: one(words, {
    fields: [meanings.wordId],
    references: [words.id],
  }),
}));

// User's to-learn words
export const toLearn = createTable(
  "to_learn",
  {
    userId: integer("user_id").primaryKey(),
    wordId: integer("word_id").notNull(),
    appearance: integer("appearance").notNull().default(0),
    knew: integer("knew").notNull().default(0),
    didntKnow: integer("didnt_know").notNull().default(0),
  },
  (table) => ({
    wordLearnIndex: index("word_learn_idx").on(table.wordId),
  }),
);

export const toLearnRelations = relations(toLearn, ({ one }) => ({
  word: one(words, {
    fields: [toLearn.wordId],
    references: [words.id],
  }),
}));

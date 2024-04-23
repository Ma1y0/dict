// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
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

// Word
export const wordLevelEnum = pgEnum("level", [
  "a1",
  "a2",
  "b1",
  "b2",
  "c1",
  "c2",
]);

export const words = createTable(
  "words",
  {
    id: serial("id").primaryKey(),
    word: varchar("word", { length: 50 }).notNull(),
    level: wordLevelEnum("level"),
    // definitionURL: varchar("definition_url", { length: 255 }),
    // pronauciationURL: varchar("pronunciation_url", { length: 255 }),
    pos: varchar("pos", { length: 50 }),
    // appearance: integer("appearance").default(0),
    // knownCount: integer("known_count").default(0),
    // unknownCount: integer("unknown_count").default(0),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (table) => ({
    nameIndex: index("word_idx").on(table.word),
    // appearanceIndex: index("appearance_idx").on(table.appearance),
    // knownCountIndex: index("known_count_idx").on(table.knownCount),
    // unknownCountIndex: index("unknown_count_idx").on(table.unknownCount),
  }),
);

export const wordsRelations = relations(words, ({ many }) => ({
  meanings: many(meanings),
  userRecords: many(userRecords),
}));

// Word Meaning
export const meanings = createTable("meanings", {
  id: serial("id").primaryKey(),
  wordId: integer("word_id").notNull(),
  pos: varchar("pos", { length: 50 }),
  definition: text("definition").notNull(),
  synonyms: varchar("synonyms", { length: 50 }).array(),
  antonyms: varchar("antonyms", { length: 50 }).array(),
});

export const meaningsRelations = relations(meanings, ({ one }) => ({
  word: one(words, {
    fields: [meanings.wordId],
    references: [words.id],
  }),
}));

// User's records
export const userRecordEnum = pgEnum("type", ["know", "unknown"]);

export const userRecords = createTable("user_records", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 256 }).notNull(),
  wordId: integer("word_id").notNull(),
  type: userRecordEnum("type").notNull(),
});

export const userRecordRelations = relations(userRecords, ({ one }) => ({
  word: one(words, {
    fields: [userRecords.wordId],
    references: [words.id],
  }),
}));

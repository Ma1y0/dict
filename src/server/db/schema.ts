// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  char,
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
  toLearn: many(toLearn),
  translations: many(translations),
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
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    wordId: integer("word_id").notNull(),
    appearance: integer("appearance").notNull().default(0),
    knew: integer("knew").notNull().default(0),
    didntKnow: integer("didnt_know").notNull().default(0),
  },
  (table) => ({
    wordLearnIndex: index("word_learn_idx").on(table.wordId),
    wordAppearanceIndex: index("word_learn_appearance_idx").on(
      table.appearance,
    ),
    wordKnewIndex: index("word_learn_knew_idx").on(table.knew),
    didntKnowIndex: index("word_learn_didnkt_know_idx").on(table.didntKnow),
  }),
);

export const toLearnRelations = relations(toLearn, ({ one }) => ({
  word: one(words, {
    fields: [toLearn.wordId],
    references: [words.id],
  }),
}));

// Word translation
export const translations = createTable(
  "translations",
  {
    id: serial("id").primaryKey(),
    wordId: integer("word_id").notNull(),
    language: char("language", { length: 2 }).notNull(), // ISO 639-1 language code
    translation: text("translation").notNull(),
  },
  (table) => ({
    translationWord: index("translation_word_idx").on(table.wordId),
    translationLanguage: index("translation_language_idx").on(table.language),
  }),
);

export const translationsRelations = relations(translations, ({ one }) => ({
  word: one(words, {
    fields: [translations.wordId],
    references: [words.id],
  }),
}));

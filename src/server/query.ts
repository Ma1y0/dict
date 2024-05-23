import "server-only";
import { db } from "./db";
import { parseDefJson } from "~/lib/parseDefinitionJSON";
import { meanings, toLearn, translations } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { type TargetLanguageCode } from "deepl-node";
import { translate } from "./translate";
import { eq } from "drizzle-orm";

export async function getWord(s: string) {
  const word = await db.query.words.findFirst({
    where: (words, { eq }) => eq(words.word, s),
    with: {
      meanings: true,
      translations: true,
    },
  });

  // There aren't any meanings available
  if (!word?.meanings.length && word != undefined) {
    await fetchDefiniton(word.word, word.id);

    return getWord(s);
  }

  // There aren't any translations available
  if (!word?.translations.length && word != undefined) {
    await createTranslation(word.word, word.id, "cs");

    return getWord(s);
  }

  return word;
}

async function fetchDefiniton(word: string, wordId: number) {
  type newMeaning = typeof meanings.$inferInsert;

  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  );

  if (res.status == 404) {
    return;
  }

  if (!res.ok) {
    throw new Error(
      `Failed to fetch definition:\nStatus: ${res.status}\nWord: ${word}\nBody: ${await res.json()}`,
    );
  }

  const definitionsParsed = parseDefJson(await res.json());
  const definitions: newMeaning[] = definitionsParsed.map((x) => ({
    wordId: wordId,
    definition: x.definition,
    pos: x.partOfSpeech,
    synonyms: x.synonyms,
    antonyms: x.antonyms,
    example: x.example,
  }));

  await db.insert(meanings).values(definitions);
}

export async function addWordToLearnList(wordId: number) {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  await db.insert(toLearn).values({ userId, wordId: Number(wordId) });
}

export async function getUsersToLearnList() {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const words = db.query.toLearn.findMany({
    where: (word, { eq }) => eq(word.userId, userId),
    with: {
      word: true,
    },
  });

  return words;
}

/// Translations
async function createTranslation(
  word: string,
  wordId: number,
  lang: TargetLanguageCode,
) {
  const translation = await translate(word, lang);

  await db
    .insert(translations)
    .values({ wordId, language: lang, translation: translation.text });
}

/// Flashcards
export async function getToLearn(limit: number) {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const data = await db.query.toLearn.findMany({
    where: (toLearn, { eq }) => eq(toLearn.userId, userId),
    orderBy: (toLearn, { asc }) => [asc(toLearn.appearance)],
    limit: limit,
    with: {
      word: {
        columns: {
          id: true,
          word: true,
        },
        with: {
          meanings: true,
          translations: true,
        },
      },
    },
  });

  // Increase appearance
  await Promise.all(
    data.map(async (x) => {
      await db
        .update(toLearn)
        .set({ appearance: x.appearance + 1 })
        .where(eq(toLearn.id, x.id));
    }),
  );

  // await sleep(5000);

  return data;
}

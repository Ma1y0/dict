import "server-only";
import { db } from "./db";
import { parseDefJson } from "~/lib/parseDefinitionJSON";
import { meanings, toLearn } from "./db/schema";
import { auth } from "@clerk/nextjs/server";

export async function getWord(s: string) {
  const word = await db.query.words.findFirst({
    where: (words, { eq }) => eq(words.word, s),
    with: {
      meanings: true,
    },
  });

  // There aren't any meanings available
  if (!word?.meanings.length && word != undefined) {
    await fetchDefiniton(word.word, word.id);

    return getWord(s);
  }

  return word;
}

async function fetchDefiniton(word: string, wordId: number) {
  type newMeaning = typeof meanings.$inferInsert;

  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  );

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

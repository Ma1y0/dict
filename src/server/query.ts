import "server-only";
import { db } from "./db";
import { parseDefJson } from "~/lib/parseDefinitionJSON";
import { meanings } from "./db/schema";

export async function getWord(s: string) {
  const word = await db.query.words.findFirst({
    where: (words, { eq }) => eq(words.word, s),
    with: {
      meanings: true,
    },
  });

  // Here aren't any meanings available
  if (!word?.meanings.length && word != undefined) {
		fetchDefiniton(word.word, word.id)
  }

  return word;
}

async function fetchDefiniton(word: string, wordId: number) {
	type newMeaning = typeof meanings.$inferInsert

  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  );

  if (!res.ok) {
		console.log(`Failed to fetch definition:\nStatus: ${res.status}\nWord: ${word}\nBody: ${await res.json()}`)
	}

	const definitionsParsed = parseDefJson(await res.json())
	const definitions: newMeaning[] = definitionsParsed.map(x => ({wordId: wordId, definition: x.definition, pos: x.partOfSpeech, synonyms: x.synonyms, antonyms: x.antonyms, example: x.example}))

	await db.insert(meanings).values(definitions)
}

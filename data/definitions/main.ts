import { sql } from "@vercel/postgres";
import { parseDefJson, type Meaning } from "./parser";

interface WordRecord {
  word: string;
}

async function getWords(): Promise<WordRecord[]> {
  const file = Bun.file("words.json");

  if (!(await file.exists())) {
    const a = await sql`SELECT (word) FROM dict_words;`;
    Bun.write(file, JSON.stringify(a.rows));
  }

  return await file.json();
}



async function main() {
  const words = await getWords();
  const definitions = new Map<string, Meaning[]>();

  for (const word of words) {
    const def = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.word}`,
    );
    const def_json = await def.json();
    const m = parseDefJson(def_json);
    definitions.set(word.word, m);
  }
}

await main();

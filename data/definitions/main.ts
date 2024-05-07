import { sql } from "@vercel/postgres";
import { parseDefJson, type Meaning } from "./parser";
import cliProgress from "cli-progress";

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

async function fetchWord(s: string) {
  while (true) {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${s}`,
    );
    if (res.status !== 429) {
      // Wait 300 and try again
      return res;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}

async function main() {
  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);
  const words = await getWords();

  progress.start(words.length, 0);

  const def_promises = words.map(async (word) => {
    const def = await fetchWord(word.word);

    if (!def.ok) {
      return [word.word, []];
    }

    try {
      const def_json = await def.json();
      try {
        const m = parseDefJson(def_json);
        progress.increment();

        return [word.word, m];
      } catch (e) {
        console.error("===============");
        console.error(word.word);
        console.error(def_json);
        console.error("===============");

        console.error(e);

        process.exit(1);
      }
    } catch (e) {
      console.error("=====================");
      console.error(def);
      console.error("=====================");
    }
  });

  const results = (await Promise.all(def_promises)) as Array<
    [string, Meaning[]]
  >;
  progress.stop();
  const definitions = new Map<string, Meaning[]>(results);

  await Bun.write("map.json", JSON.stringify(definitions));
  console.log("All done");
}

await main();

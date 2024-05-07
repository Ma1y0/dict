import "server-only";
import { db } from "./db";

export function getWord(s: string) {
  const word = db.query.words.findFirst({
    where: (words, { eq }) => eq(words.word, s),
    with: {
      meanings: true,
    },
  });

  return word;
}

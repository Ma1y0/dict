import { db } from "..";

export async function getWord(s: string) {
  const word = db.query.words.findFirst({
    where: (words, { eq }) => eq(words.word, s),
    with: {
      meanings: true,
    },
  });

  return word;
}

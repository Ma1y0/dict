import { db } from "..";

export async function getWord(s: string) {
  const word = db.query.words.findFirst({
    where: (words, { eq }) => eq(words.word, s),
    with: {
      meanings: true,
    },
  });

  sleep(10000);

  return word;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

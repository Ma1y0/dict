import { getWord } from "~/server/db/word/query";

export async function Word(props: { word: string }) {
  const word = await getWord(props.word);

  return (
    <div className="p-6 border">
      <h1>{word?.id}</h1>
    </div>
  );
}

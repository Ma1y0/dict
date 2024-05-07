import { getWord } from "~/server/query";

export async function Word(props: { word: string }) {
  const word = await getWord(props.word);

	if (!word) {
		return null
	}


  return (
    <div className="border px-3 py-2">
      <h2 className="text-xl font-semibold">{word.word}</h2>
			<textarea value={JSON.stringify(word.meanings)} className="text-black text-lg">
			</textarea>
    </div>
  );
}

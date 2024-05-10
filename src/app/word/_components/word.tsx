import { meanings } from "~/server/db/schema";
import { addWordToLearnList, getWord } from "~/server/query";
import { AddToLearnButton } from "./addToLearButton";

export async function Word(props: { word: string }) {
  const word = await getWord(props.word);

  if (!word) {
    return null;
  }

  return (
    <div className="relative border px-3 py-2">
      <form
        action={async () => {
          "use server";

          await addWordToLearnList(word.id);
        }}
      >
        <AddToLearnButton />
      </form>

      <h2 className="h-10 text-2xl font-semibold">{word.word}</h2>
      <div className="p-3">
        <Definition definitions={word.meanings} />
      </div>
    </div>
  );
}

type definition = typeof meanings.$inferSelect;

function Definition(props: { definitions: definition[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {props.definitions.map((def) => (
        <li key={def.id} className="">
          <p>{def.definition}</p>
          <p className="text-gray-500">{def.pos}</p>
        </li>
      ))}
    </ul>
  );
}

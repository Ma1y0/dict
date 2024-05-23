import { type meanings } from "~/server/db/schema";
import { addWordToLearnList, getWord } from "~/server/query";
import { AddToLearnButton } from "./addToLearButton";
import { SignedIn } from "@clerk/nextjs";
import { capitalizeFirst } from "~/lib/utils";

export async function Word(props: { word: string }) {
  const word = await getWord(props.word);

  if (!word) {
    return null;
  }

  return (
    <div className="border px-3 py-2">
      <div className="flex h-10 flex-1 items-center justify-between border-b py-6 pb-8">
        <h2 className="text-2xl font-semibold">{capitalizeFirst(word.word)}</h2>
        <h2 className="text-gray-30 text-2xl font-semibold">
          {word.translations.map((x) => capitalizeFirst(x.translation[0] ?? "")).join(" ")}
        </h2>
        <div>
          <SignedIn>
            <form
              action={async () => {
                "use server";

                await addWordToLearnList(word.id);
              }}
            >
              <AddToLearnButton />
            </form>
          </SignedIn>
        </div>
      </div>
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

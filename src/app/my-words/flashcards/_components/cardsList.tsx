"use client";

import { useMemo, useState } from "react";
import { checkMarkIcon, noSymbolIcon } from "~/components/icons";
import { capitalizeFirst } from "~/lib/utils";
import { type getToLearn } from "~/server/query";
import { didKnowACTION, didntKnowACTION } from "../actions";
import { useCardId } from "~/lib/flashCardHook";

type Props = {
  words: Awaited<ReturnType<typeof getToLearn>>;
};

export function FlashCardsList(props: Props) {
  const { cardId, nextCard } = useCardId(props.words.length);

  const withIdDidKnowACTION = didKnowACTION.bind(null, props.words[cardId]!.id);
  const withIdDidntKnowACTION = didntKnowACTION.bind(
    null,
    props.words[cardId]!.id,
  );

  const cards = useMemo(
    () =>
      props.words.map((x) => (
        <div key={x.id} className="">
          <Card word={x} />
        </div>
      )),
    [props.words],
  );

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-6">
          <form
            action={withIdDidntKnowACTION}
            className="flex items-center justify-center"
          >
            <button onClick={() => nextCard()}>{noSymbolIcon}</button>
          </form>

          {cards[cardId]}

          <form
            action={withIdDidKnowACTION}
            className="flex items-center justify-center"
          >
            <button onClick={() => nextCard()}>{checkMarkIcon}</button>
          </form>
        </div>
      </div>
    </>
  );
}

type CardProps = {
  // ???????????????????																							?????
  word: Awaited<ReturnType<typeof getToLearn>> extends (infer U)[] ? U : never;
};

function Card(props: CardProps) {
  const [side, setSide] = useState<"front" | "back">("front");

  return (
    <div
      className="h-64 w-full select-none border bg-secondary md:w-5/6 lg:w-[38rem]"
      onClick={() =>
        setSide((prevState) => (prevState == "front" ? "back" : "front"))
      }
    >
      {side == "front" ? (
        <div className="flex h-full w-full items-center justify-center">
          <h2 className="text-6xl">{capitalizeFirst(props.word.word.word)}</h2>
        </div>
      ) : (
        <div className="h-full w-full overflow-auto p-6">
          <h2 className="text-4xl">
            {capitalizeFirst(
              props.word.word.translations[0]?.translation ?? "",
            )}
          </h2>
          <ul className="flex flex-col gap-1 p-3">
            {props.word.word.meanings.map((x) => (
              <li key={x.id}>{x.definition}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

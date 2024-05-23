"use client";

import { useState } from "react";
import { capitalizeFirst } from "~/lib/utils";
import { type getToLearn } from "~/server/query";

type Props = {
  words: Awaited<ReturnType<typeof getToLearn>>;
};

export function FlashCardsList(props: Props) {
  const cards = props.words.map((x) => (
    <div key={x.id} className="flex h-full w-full justify-center">
      <Card word={x} />
    </div>
  ));

  return <>{cards[0]}</>;
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
        <div className="p-4">
          <h2 className="text-4xl">
            {capitalizeFirst(
              props.word.word.translations[0]?.translation[0] ?? "",
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

"use client";

import { useState } from "react";
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
      className="h-64 w-full md:w-5/6 lg:w-[38rem] select-none border bg-secondary"
      onClick={() =>
        setSide((prevState) => (prevState == "front" ? "back" : "front"))
      }
    >
      {side == "front" ? (
        <div className="flex h-full w-full items-center justify-center">
          <h2 className="text-6xl">{props.word.word.word}</h2>
        </div>
      ) : (
        <div className="p-3">
          <h2 className="text-4xl">
            {props.word.word.translations[0]?.translation}
          </h2>
        </div>
      )}
    </div>
  );
}

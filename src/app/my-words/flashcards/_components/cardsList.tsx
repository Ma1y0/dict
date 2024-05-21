"use client";

import { type getToLearn } from "~/server/query";

type Props = {
  words: Awaited<ReturnType<typeof getToLearn>>;
};

export function FlashCardsList(props: Props) {
  return (
    <>
      <div>
        {props.words.map((x) => (
          <div key={x.id}>
            <Card word={x} />
          </div>
        ))}
      </div>
    </>
  );
}

type CardProps = {
  // ???????????????????																							?????
  word: Awaited<ReturnType<typeof getToLearn>> extends (infer U)[] ? U : never;
};

function Card(props: CardProps) {
  return (
    <>
      <p>{props.word.word.word}</p>
    </>
  );
}

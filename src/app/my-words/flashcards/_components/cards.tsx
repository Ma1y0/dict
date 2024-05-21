"use client";

import { type getToLearn } from "~/server/query";

type Props = {
  words: Awaited<ReturnType<typeof getToLearn>>;
};

export function FlashCards(props: Props) {
  return (
    <>
      <div>
        {props.words.map((x) => (
          <p key={x.id}>{x.id}</p>
        ))}
      </div>
    </>
  );
}

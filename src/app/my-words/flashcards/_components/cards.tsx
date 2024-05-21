import { getToLearn } from "~/server/query";
import { FlashCardsList } from "./cardsList";

export async function FlashCards() {
  const words = await getToLearn(5);

  return <FlashCardsList words={words} />;
}

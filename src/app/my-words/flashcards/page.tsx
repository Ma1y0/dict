import { getToLearn } from "~/server/query";
import { FlashCards } from "./_components/cards";

export default async function Page() {
  const words = await getToLearn(5);

  return (
    <>
      <div>
        <h1>Hello</h1>
        <FlashCards words={words} />
      </div>
    </>
  );
}

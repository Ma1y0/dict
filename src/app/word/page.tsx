import { getWord } from "~/server/db/word/query";
import { Search } from "./_components/seach";

export default async function wordPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const word = await getWord(searchParams?.query ?? "");

  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col items-center p-6">
        <div className="w-full md:w-[30%]">
          <Search />
        </div>
        <div>{word?.id}</div>
      </div>
    </>
  );
}

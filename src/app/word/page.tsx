import { Suspense } from "react";
import { Search } from "./_components/search";
import { Word } from "./_components/word";
import { Spinner } from "../_components/spinner";

export default async function wordPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col items-center p-6">
        <div className="w-full md:w-[30%]">
          <Search placeholder="Seach for a word" />
        </div>
        <div>
          {searchParams?.query && (
            <Suspense key={searchParams.query} fallback={<Spinner />}>
              <Word word={searchParams.query} />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}

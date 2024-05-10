import { Suspense } from "react";
import { Search } from "./_components/search";
import { Word } from "./_components/word";
import { Spinner } from "~/components/ui/spinner";

export default async function wordPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col items-center gap-6 p-6">
        <div className="w-full md:w-[45%]">
          <Search placeholder="Seach for a word" />
        </div>
        <div className="w-full md:w-[45%]">
          {searchParams?.query && (
            <Suspense
              key={searchParams.query}
              fallback={
                <div className="flex w-full justify-center p-6">
                  <Spinner />
                </div>
              }
            >
              <Word word={searchParams.query} />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}

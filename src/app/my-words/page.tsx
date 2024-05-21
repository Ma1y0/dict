import { Suspense } from "react";
import { getUsersToLearnList } from "~/server/query";
import { Words } from "./_components/words";
import { Spinner } from "~/components/ui/spinner";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const flashcardsIcon = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
      />
    </svg>
  </>
);

const matchIcon = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
      />
    </svg>
  </>
);

export default async function Page() {
  const usersWords = await getUsersToLearnList();

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-between p-6">
        <div className="flex w-full justify-center gap-3">
          <Button className="h-16 w-32" asChild>
            <Link href="/my-words/flashcards">
              Flashcards <span className="ml-2">{flashcardsIcon}</span>
            </Link>
          </Button>
          <Button className="h-16 w-32">
            Match <span className="ml-2">{matchIcon}</span>
          </Button>
          <Button className="h-16 w-32">Game #3</Button>
        </div>
        <div className="w-full">
          <Suspense
            fallback={
              <div className="flex w-full p-6">
                <Spinner />
              </div>
            }
          >
            <Words toLearn={usersWords} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

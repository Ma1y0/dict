import { Suspense } from "react";
import { getUsersToLearnList } from "~/server/query";
import { Words } from "./_components/words";
import { Spinner } from "~/components/ui/spinner";

export default async function Page() {
  const usersWords = await getUsersToLearnList();

  return (
    <>
      <div className="flex h-full w-full items-center justify-center p-6">
        <Suspense
          fallback={
            <div className="flex w-full justify-center p-6">
              <Spinner />
            </div>
          }
        >
          <Words toLearn={usersWords} />
        </Suspense>
      </div>
    </>
  );
}

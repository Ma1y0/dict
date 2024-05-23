import { Suspense } from "react";
import { FlashCards } from "./_components/cards";
import { Spinner } from "~/components/ui/spinner";

export default async function Page() {
  return (
    <>
      <div className="h-full w-full p-12">
        <Suspense
          fallback={
            <div className="flex h-full w-full justify-center p-6">
              <Spinner />
            </div>
          }
        >
          <FlashCards />
        </Suspense>
      </div>
    </>
  );
}

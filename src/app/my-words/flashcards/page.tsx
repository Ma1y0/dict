import { Suspense } from "react";
import { FlashCards } from "./_components/cards";
import { Spinner } from "~/components/ui/spinner";

export default async function Page() {
  return (
    <>
      <div className="h-full w-full p-12">
          <Suspense fallback={<Spinner />}>
            <FlashCards />
          </Suspense>
      </div>
    </>
  );
}

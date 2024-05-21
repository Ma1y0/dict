import { Suspense } from "react";
import { FlashCards } from "./_components/cards";
import { Spinner } from "~/components/ui/spinner";

export default async function Page() {
  return (
    <>
      <div>
        <>
          <Suspense fallback={<Spinner />}>
            <FlashCards />
          </Suspense>
        </>
      </div>
    </>
  );
}

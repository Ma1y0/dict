"use client";

import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";

export function AddToLearnButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="absolute right-3 top-2.5" disabled={pending}>
        {pending ? <Spinner /> : "Learn"}
      </Button>
    </>
  );
}

import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function HomePage() {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center p-6">
        <ul className="flex w-full flex-col gap-3 md:w-[30%]">
          <li>
            <Button className="w-full" asChild>
              <Link href="/add">Add Word</Link>
            </Button>
          </li>
          <li>
            <Button className="w-full" asChild>
              <Link href="/">My words</Link>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}

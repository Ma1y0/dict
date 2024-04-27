import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between border-b p-4 text-xl font-semibold h-16">
			<Link href="/">Dict</Link>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton appearance={{elements: {avatarBox: "h-8 w-8"}}}/>
        </SignedIn>
      </div>
    </nav>
  );
}

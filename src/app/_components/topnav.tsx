import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Dict</div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

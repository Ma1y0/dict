import { RedirectToSignIn, SignedOut } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      {children}
    </>
  );
}

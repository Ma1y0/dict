import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const user = await currentUser();
  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-7xl font-extrabold">Hello World</h1>
        <p>{user?.id}</p>
      </div>
    </>
  );
}

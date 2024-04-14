import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex h-screen w-full flex-center">
      <SignUp />
    </main>
  );
}

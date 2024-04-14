import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex h-screen w-full flex-center">
      <SignIn />
    </main>
  );
}

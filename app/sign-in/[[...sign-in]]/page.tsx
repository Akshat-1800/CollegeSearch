import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <SignIn />
      </div>
    </div>
  );
}
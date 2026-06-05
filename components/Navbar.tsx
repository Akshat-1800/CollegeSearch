"use client";

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          CollegeSearch
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/">Home</Link>

          {isSignedIn ? (
            <>
              <Link href="/colleges">
                Colleges
              </Link>

              <Link href="/compare">
                Compare
              </Link>

              <Link href="/saved">
                Saved
              </Link>

              <UserButton />
            </>
          ) : (
            <>
              <Link href="/sign-in">
                Sign In
              </Link>

              <Link href="/sign-up">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
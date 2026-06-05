"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import {
  Bookmark,
  Building2,
  GraduationCap,
  Menu,
  Scale,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/colleges", label: "Colleges", icon: Building2 },
];

const signedInLinks = [
  { href: "/compare", label: "Compare", icon: Scale },
  { href: "/saved", label: "Saved", icon: Bookmark },
];

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = isSignedIn
    ? [...baseLinks, ...signedInLinks]
    : baseLinks;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            CollegeSearch
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const Icon = link.icon;
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[0.95rem] font-medium transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {Icon ? <Icon className="size-4" /> : null}
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg border bg-background p-2 text-muted-foreground shadow-sm transition hover:text-foreground md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            {links.map((link) => {
              const Icon = link.icon;
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-[0.95rem] font-medium",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {Icon ? <Icon className="size-4" /> : null}
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-2 flex items-center gap-3">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
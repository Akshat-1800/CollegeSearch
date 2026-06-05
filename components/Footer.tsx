import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <span className="text-lg font-semibold">CollegeSearch</span>
          </div>
          <p className="mt-4 text-[0.95rem] text-muted-foreground">
            Modern college discovery for students who value clarity, confidence,
            and transparent outcomes.
          </p>
        </div>

        <div>
          <p className="text-[0.95rem] font-semibold">Navigate</p>
          <div className="mt-3 flex flex-col gap-2 text-[0.95rem] text-muted-foreground">
            <Link href="/colleges" className="hover:text-foreground">
              Explore Colleges
            </Link>
            <Link href="/compare" className="hover:text-foreground">
              Compare Programs
            </Link>
            <Link href="/saved" className="hover:text-foreground">
              Saved List
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 CollegeSearch. All rights reserved.</p>
          <p>Designed for confident college decisions.</p>
        </div>
      </div>
    </footer>
  );
}
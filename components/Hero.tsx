import Link from "next/link";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Search,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/40">
      <div className="pointer-events-none absolute -left-32 top-16 size-72 rounded-full bg-muted/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-32 size-80 rounded-full bg-muted/50 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="text-left">
          <Badge variant="secondary" className="mb-4 w-fit">
            Trusted by students across India
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find a college that matches your ambition.
          </h1>

          <p className="mt-5 max-w-xl text-[0.98rem] text-muted-foreground sm:text-lg">
            Search, compare, and save programs with transparent fees, placement
            data, and verified student reviews.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="group">
              <Link href="/colleges">
                Explore Colleges
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/compare">Compare Colleges</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Building2,
                label: "1,200+ colleges",
                sub: "Top universities",
              },
              {
                icon: GraduationCap,
                label: "350+ courses",
                sub: "Career-ready programs",
              },
              {
                icon: Star,
                label: "Verified reviews",
                sub: "From real students",
              },
            ].map((stat) => (
              <Card
                key={stat.label}
                className="border-border/60 bg-card/70 backdrop-blur"
              >
                <CardContent className="flex items-center gap-3 px-4 py-4">
                  <span className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
                    <stat.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-foreground">
                      {stat.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.sub}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
              <Search className="size-5" />
            </span>
            <div>
              <p className="text-[0.95rem] font-semibold text-foreground">
                Smarter search, faster decisions
              </p>
              <p className="text-sm text-muted-foreground">
                Filter by location, fees, and ratings in seconds.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {[
              "Save colleges and revisit later.",
              "Compare placements and fees side by side.",
              "Read verified reviews before you apply.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background px-4 py-3"
              >
                <span className="mt-1 block size-2 rounded-full bg-foreground" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
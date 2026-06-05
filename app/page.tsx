import Hero from "@/components/Hero";
import FeaturedColleges from "@/components/FeaturedColleges";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <>
      <Hero />

      <FeaturedColleges />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card px-8 py-12 shadow-lg md:px-12">
          <div className="absolute -left-16 top-0 size-48 rounded-full bg-muted/40 blur-3xl" />
          <div className="relative z-10 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <Badge variant="secondary" className="mb-4 w-fit">
                Build your shortlist
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                Make confident college decisions in minutes.
              </h2>
              <p className="mt-3 text-[0.95rem] text-muted-foreground">
                Compare placements, fees, and ratings side-by-side. Save the
                colleges you love and come back anytime.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/colleges">Start Exploring</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-border/60"
              >
                <Link href="/saved">View Saved</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

import prisma from "@/lib/prisma";
import CollegeCard from "./collegeCard";
import { Badge } from "@/components/ui/badge";

export default async function FeaturedColleges() {
  const colleges =
    await prisma.college.findMany({
      take: 3,
      orderBy: {
        rating: "desc",
      },
    });

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="outline" className="mb-3 w-fit">
            Top rated picks
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight">
            Featured Colleges
          </h2>
          <p className="mt-2 max-w-2xl text-[0.95rem] text-muted-foreground">
            Handpicked institutions with standout ratings, placements, and
            student satisfaction.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            id={college.id}
            name={college.name}
            location={college.location}
            fees={college.fees}
            rating={college.rating}
            avgPackage={college.avgPackage}
            imageUrl={college.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
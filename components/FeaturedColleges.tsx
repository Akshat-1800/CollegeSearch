import prisma from "@/lib/prisma";
import CollegeCard from "./collegeCard";

export default async function FeaturedColleges() {
  const colleges =
    await prisma.college.findMany({
      take: 3,
      orderBy: {
        rating: "desc",
      },
    });

  return (
    <section className="mx-auto max-w-7xl p-6">
      <h2 className="mb-6 text-3xl font-bold">
        Featured Colleges
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
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
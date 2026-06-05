import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Bookmark } from "lucide-react";

import CollegeCard from "@/components/collegeCard";
import UnsaveCollegeButton from "@/components/UnsaveCollegeButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function SavedPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) {
    return <p>User not found.</p>;
  }

  const savedColleges = await prisma.savedCollege.findMany({
    where: {
      userId: user.id,
    },
    include: {
      college: true,
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="outline" className="mb-3 w-fit">
            Your shortlist
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Saved Colleges
          </h1>
          <p className="mt-2 text-[0.95rem] text-muted-foreground">
            Keep track of programs you want to revisit later.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[0.95rem] text-muted-foreground">
          <Bookmark className="size-4" />
          {savedColleges.length} saved
        </div>
      </div>

      {savedColleges.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-6 text-[0.95rem] text-muted-foreground">
            No saved colleges yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedColleges.map((saved) => (
            <div key={saved.college.id} className="space-y-3">
              <CollegeCard
                id={saved.college.id}
                name={saved.college.name}
                location={saved.college.location}
                fees={saved.college.fees}
                rating={saved.college.rating}
                avgPackage={saved.college.avgPackage}
                imageUrl={saved.college.imageUrl}
              />

              <UnsaveCollegeButton
                collegeId={saved.college.id}
                className="w-full"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
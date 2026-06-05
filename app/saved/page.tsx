import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import CollegeCard from "@/components/collegeCard";
import UnsaveCollegeButton from "@/components/UnsaveCollegeButton";

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
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Saved Colleges
      </h1>

      {savedColleges.length === 0 ? (
        <p>No saved colleges yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedColleges.map((saved) => (
  <div
    key={saved.college.id}
    className="space-y-2"
  >
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
    />
  </div>
))}
        </div>
      )}
    </main>
  );
}
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  GraduationCap,
  IndianRupee,
  MapPin,
  Star,
  User,
} from "lucide-react";

import SaveCollegeButton from "@/components/SaveCollegeButton";
import AddToCompareButton from "@/components/AddToCompareButton";
import ReviewForm from "@/components/ReviewForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CollegeDetailPage({ params }: Props) {
  const { id } = await params;

  const college = await prisma.college.findUnique({
    where: {
      id,
    },
    include: {
      courses: true,
      reviews: {
        include: {
          user: true,
        },},
    },
  });

  if (!college) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-10">
      <Card className="overflow-hidden">
        <div className="relative">
          <img
            src={college.imageUrl}
            alt={college.name}
            className="h-72 w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <Badge variant="secondary" className="gap-1 bg-background/90 text-foreground">
              <Star className="size-3.5" />
              {college.rating.toFixed(1)} rating
            </Badge>
          </div>
        </div>

        <CardContent className="space-y-4 px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {college.name}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-[0.95rem] text-muted-foreground">
                <MapPin className="size-4" />
                {college.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <SaveCollegeButton collegeId={college.id} />
              <AddToCompareButton collegeId={college.id} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 px-5 py-5">
            <span className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
              <Star className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="text-[0.95rem] font-semibold">
                {college.rating.toFixed(1)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 px-5 py-5">
            <span className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
              <IndianRupee className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Annual Fees</p>
              <p className="text-[0.95rem] font-semibold">
                ₹{college.fees.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 px-5 py-5">
            <span className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
              <IndianRupee className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Avg Package</p>
              <p className="text-[0.95rem] font-semibold">
                ₹{college.avgPackage.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="mt-3 text-[0.95rem] text-muted-foreground">
          {college.overview}
        </p>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-2">
          <GraduationCap className="size-5 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Courses Offered</h2>
        </div>

        {college.courses.length === 0 ? (
          <Card className="mt-4 border-dashed">
            <CardContent className="p-6 text-[0.95rem] text-muted-foreground">
              No courses available.
            </CardContent>
          </Card>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {college.courses.map((course) => (
              <Card key={course.id}>
                <CardContent className="space-y-2 px-5 py-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">{course.name}</h3>
                    <Badge variant="outline">{course.duration}</Badge>
                  </div>
                  <p className="text-[0.95rem] text-muted-foreground">
                    Fees: ₹{course.fees.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-2">
          <User className="size-5 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Student Reviews</h2>
        </div>

        <div className="mt-4">
          <ReviewForm collegeId={college.id} />
        </div>

        {college.reviews.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-6 text-[0.95rem] text-muted-foreground">
              No reviews yet.
            </CardContent>
          </Card>
        ) : (
          <div className="mt-4 space-y-4">
            {college.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="space-y-3 px-5 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[0.95rem] font-medium">
                      <span className="grid size-8 place-items-center rounded-full bg-muted text-foreground">
                        <User className="size-4" />
                      </span>
                      {review.userName || "Student"}
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <Star className="size-3.5" />
                      {review.rating.toFixed(1)}
                    </Badge>
                  </div>
                  <p className="text-[0.95rem] text-muted-foreground">
                    {review.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
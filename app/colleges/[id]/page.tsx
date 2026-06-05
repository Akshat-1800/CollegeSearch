import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import SaveCollegeButton from "@/components/SaveCollegeButton";
import AddToCompareButton from "@/components/AddToCompareButton";
import ReviewForm from "@/components/ReviewForm";

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
    <main className="mx-auto max-w-5xl p-6">
      <img
        src={college.imageUrl}
        alt={college.name}
        className="mb-6 h-80 w-full rounded-xl object-cover"
      />

      <h1 className="mb-2 text-4xl font-bold">
        {college.name}
      </h1>
      <div className="flex gap-3">
  <SaveCollegeButton collegeId={college.id} />
  <AddToCompareButton collegeId={college.id} />
</div>

      <p className="mb-4 text-gray-600">
        📍 {college.location}
      </p>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          ⭐ Rating: {college.rating}
        </div>

        <div className="rounded-lg border p-4">
          💰 Fees: ₹{college.fees.toLocaleString()}
        </div>

        <div className="rounded-lg border p-4">
          📈 Avg Package: ₹
          {college.avgPackage.toLocaleString()}
        </div>
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">
          Overview
        </h2>

        <p>{college.overview}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">
          Courses Offered
        </h2>

        {college.courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <div className="space-y-3">
            {college.courses.map((course) => (
              <div
                key={course.id}
                className="rounded-lg border p-4"
              >
                <h3 className="font-semibold">
                  {course.name}
                </h3>

                <p>
                  Duration: {course.duration}
                </p>

                <p>
                  Fees: ₹
                  {course.fees.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">
          Student Reviews
        </h2>
        <ReviewForm
  collegeId={college.id}
/>
        {college.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {college.reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-lg border p-4"
              >
                <p>
                  ⭐ {review.rating}
                </p>

                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
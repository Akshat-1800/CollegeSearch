import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { collegeId, rating, comment } =
    await req.json();

  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }
const existingReview = await prisma.review.findFirst({
  where: {
    userId: user.id,
    collegeId,
  },
});

if (existingReview) {
  return Response.json(
    {
      error: "You have already reviewed this college.",
    },
    { status: 400 }
  );
}
  const review = await prisma.review.create({
    data: {
      rating,
      comment,
      userName: user.userName ?? user.email,
      userId: user.id,
      collegeId,
    },
  });

  return Response.json(review);
}
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

  const { collegeId } = await req.json();

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

  await prisma.savedCollege.deleteMany({
    where: {
      userId: user.id,
      collegeId,
    },
  });

  return Response.json({
    success: true,
  });
}
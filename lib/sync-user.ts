import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function syncUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  let user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        userName: clerkUser.username,
      },
    });
  }

  return user;
}
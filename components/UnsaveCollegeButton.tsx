"use client";

import { useRouter } from "next/navigation";

export default function UnsaveCollegeButton({
  collegeId,
}: {
  collegeId: string;
}) {
  const router = useRouter();

  async function unsaveCollege() {
    const res = await fetch(
      "/api/unsave-college",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          collegeId,
        }),
      }
    );

    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={unsaveCollege}
      className="rounded bg-red-500 px-4 py-2 text-white"
    >
      Remove
    </button>
  );
}
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function RemoveCompareButton({
  collegeId,
}: {
  collegeId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleRemove() {
    const compareParam =
      searchParams.get("compare");

    if (!compareParam) return;

    const ids = compareParam
      .split(",")
      .filter(Boolean);

    const newIds = ids.filter(
      (id) => id !== collegeId
    );

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (newIds.length === 0) {
      params.delete("compare");
    } else {
      params.set(
        "compare",
        newIds.join(",")
      );
    }

    router.push(
      `/colleges?${params.toString()}`
    );
  }

  return (
    <button
      onClick={handleRemove}
      className="rounded bg-red-500 px-3 py-2 text-white"
    >
      Remove
    </button>
  );
}
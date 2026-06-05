"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function AddToCompareButton({
  collegeId,
}: {
  collegeId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleCompare() {
    const compareParam =
      searchParams.get("compare");

    const ids = compareParam
      ? compareParam.split(",").filter(Boolean)
      : [];

    if (ids.includes(collegeId)) {
      return;
    }

    if (ids.length >= 3) {
      alert(
        "Maximum 3 colleges can be compared."
      );
      return;
    }

    const newIds = [...ids, collegeId];

    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set(
      "compare",
      newIds.join(",")
    );

    router.push(
      `/colleges?${params.toString()}`
    );
  }

  return (
    <button
      onClick={handleCompare}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      Compare
    </button>
  );
}
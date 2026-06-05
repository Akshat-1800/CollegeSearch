"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Scale } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type AddToCompareButtonProps = {
  collegeId: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
};

export default function AddToCompareButton({
  collegeId,
  className,
  variant = "secondary",
  size = "default",
}: AddToCompareButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleCompare() {
    const compareParam = searchParams.get("compare");

    const ids = compareParam
      ? compareParam.split(",").filter(Boolean)
      : [];

    if (ids.includes(collegeId)) {
      return;
    }

    if (ids.length >= 3) {
      alert("Maximum 3 colleges can be compared.");
      return;
    }

    const newIds = [...ids, collegeId];

    const params = new URLSearchParams(searchParams.toString());

    params.set("compare", newIds.join(","));

    router.push(`/colleges?${params.toString()}`);
  }

  return (
    <Button
      onClick={handleCompare}
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
    >
      <Scale className="size-4" />
      Compare
    </Button>
  );
}
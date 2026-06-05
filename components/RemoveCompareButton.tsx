"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type RemoveCompareButtonProps = {
  collegeId: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
};

export default function RemoveCompareButton({
  collegeId,
  className,
  variant = "destructive",
  size = "sm",
}: RemoveCompareButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleRemove() {
    const compareParam = searchParams.get("compare");

    if (!compareParam) return;

    const ids = compareParam.split(",").filter(Boolean);

    const newIds = ids.filter((id) => id !== collegeId);

    const params = new URLSearchParams(searchParams.toString());

    if (newIds.length === 0) {
      params.delete("compare");
    } else {
      params.set("compare", newIds.join(","));
    }

    router.push(`/colleges?${params.toString()}`);
  }

  return (
    <Button
      onClick={handleRemove}
      variant={variant}
      size={size}
      className={cn("gap-1.5", className)}
    >
      <X className="size-3.5" />
      Remove
    </Button>
  );
}
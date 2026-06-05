"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type UnsaveCollegeButtonProps = {
  collegeId: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
};

export default function UnsaveCollegeButton({
  collegeId,
  className,
  variant = "destructive",
  size = "default",
}: UnsaveCollegeButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function unsaveCollege() {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/unsave-college", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collegeId,
      }),
    });

    if (res.ok) {
      toast.success("College removed from saved list");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <Button
      onClick={unsaveCollege}
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
      disabled={loading}
    >
      <Bookmark className="size-4" />
      {loading ? "Removing..." : "Remove"}
    </Button>
  );
}
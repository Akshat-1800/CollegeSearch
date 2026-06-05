"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SaveCollegeButtonProps = {
  collegeId: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
};

export default function SaveCollegeButton({
  collegeId,
  className,
  variant = "default",
  size = "default",
}: SaveCollegeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function saveCollege() {
    if (loading) return;

    setLoading(true);
    const res = await fetch("/api/save-college", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collegeId,
      }),
    });

    if (res.ok) {
      toast.success("College saved successfully");
    }

    setLoading(false);
  }

  return (
    <Button
      onClick={saveCollege}
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
      disabled={loading}
    >
      <Bookmark className="size-4" />
      {loading ? "Saving..." : "Save College"}
    </Button>
  );
}
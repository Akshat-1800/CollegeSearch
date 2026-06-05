"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function ReviewForm({
  collegeId,
}: {
  collegeId: string;
}) {
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            collegeId,
            rating,
            comment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "Failed to submit review"
        );
        return;
      }

      setRating(5);
      setComment("");

      router.refresh();
    } catch {
      setError(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-dashed">
      <CardContent className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-semibold">Write a Review</h3>
          <p className="text-[0.95rem] text-muted-foreground">
            Share your experience to help future students.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="rating"
              className="mb-1 block text-[0.95rem] font-medium"
            >
              Rating
            </label>
            <div className="relative">
              <Star className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-[0.95rem] text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Very Good</option>
                <option value={3}>3 - Good</option>
                <option value={2}>2 - Fair</option>
                <option value={1}>1 - Poor</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="review"
              className="mb-1 block text-[0.95rem] font-medium"
            >
              Review
            </label>
            <Textarea
              id="review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Share your experience..."
            />
          </div>

          {error && (
            <p className="text-[0.95rem] text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
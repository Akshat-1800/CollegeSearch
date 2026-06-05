"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-4 rounded-lg border p-4"
    >
      <h3 className="text-lg font-semibold">
        Write a Review
      </h3>

      <div>
        <label className="mb-1 block">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(
              Number(e.target.value)
            )
          }
          className="w-full rounded border p-2"
        >
          <option value={5}>5 ⭐</option>
          <option value={4}>4 ⭐</option>
          <option value={3}>3 ⭐</option>
          <option value={2}>2 ⭐</option>
          <option value={1}>1 ⭐</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block">
          Review
        </label>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          required
          rows={4}
          placeholder="Share your experience..."
          className="w-full rounded border p-3"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading
          ? "Submitting..."
          : "Submit Review"}
      </button>
    </form>
  );
}
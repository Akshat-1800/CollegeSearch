"use client";

export default function SaveCollegeButton({
  collegeId,
}: {
  collegeId: string;
}) {
  async function saveCollege() {
    const res = await fetch(
      "/api/save-college",
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
      alert("College Saved");
    }
  }

  return (
    <button
      onClick={saveCollege}
      className="rounded bg-black px-4 py-2 text-white"
    >
      Save College
    </button>
  );
}
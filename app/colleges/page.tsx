import prisma from "@/lib/prisma";
import CollegeCard from "@/components/collegeCard";
import RemoveCompareButton from "@/components/RemoveCompareButton";


type Props = {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    location?: string;
    maxFee?: string;
    page?: string;
    compare?: string;
  }>;
};

export default async function CollegesPage({ searchParams }: Props) {
  const params = await searchParams;

  const q = params.q ?? "";
  const sort = params.sort ?? "";
  const location = params.location ?? "";
  const maxFee = Number(params.maxFee) || undefined;
  const page = Number(params.page) || 1;
  const compareIds = params.compare
  ? params.compare.split(",")
  : [];
  const selectedColleges =
  compareIds.length > 0
    ? await prisma.college.findMany({
        where: {
          id: {
            in: compareIds,
          },
        },
      })
    : [];

  const PAGE_SIZE = 6;

  const whereClause = {
    ...(q && {
      name: {
        contains: q,
      },
    }),

    ...(location && {
      location: {
        contains: location,
      },
    }),

    ...(maxFee && {
      fees: {
        lte: maxFee,
      },
    }),
  };

  const totalColleges = await prisma.college.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalColleges / PAGE_SIZE);

  const colleges = await prisma.college.findMany({
    where: whereClause,

    orderBy:
      sort === "rating"
        ? { rating: "desc" }
        : sort === "fees"
        ? { fees: "asc" }
        : undefined,

    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Explore Colleges
      </h1>
      {compareIds.length > 0 && (
  <div className="mb-6 rounded border p-4">
    <div className="mb-3 flex items-center justify-between">
      <p>
        Selected for Compare:
        {" "}
        {compareIds.length}/3
      </p>

      {compareIds.length >= 2 && (
        <a
          href={`/compare?ids=${compareIds.join(",")}`}
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Compare Selected
        </a>
      )}
    </div>

    <div className="flex flex-wrap gap-2">
      {selectedColleges.map((college) => (
        <div
          key={college.id}
          className="flex items-center gap-2 rounded border px-3 py-2"
        >
          <span>{college.name}</span>

          <RemoveCompareButton
            collegeId={college.id}
          />
        </div>
      ))}
    </div>
  </div>
)}

      <form className="mb-8 flex flex-col gap-4 md:flex-row md:flex-wrap">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search colleges..."
          className="flex-1 rounded-lg border p-3"
        />

        <input
          type="text"
          name="location"
          defaultValue={location}
          placeholder="Location"
          className="rounded-lg border p-3"
        />

        <input
          type="number"
          name="maxFee"
          defaultValue={maxFee}
          placeholder="Max Fee"
          className="rounded-lg border p-3"
        />

        <select
          name="sort"
          defaultValue={sort}
          className="rounded-lg border p-3"
        >
          <option value="">Sort By</option>
          <option value="rating">Highest Rating</option>
          <option value="fees">Lowest Fees</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Apply
        </button>
      </form>

      {colleges.length === 0 ? (
        <p>No colleges found.</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                id={college.id}
                name={college.name}
                
                location={college.location}
                fees={college.fees}
                rating={college.rating}
                avgPackage={college.avgPackage}
                imageUrl={college.imageUrl}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((pageNum) => (
              <a
                key={pageNum}
                href={`?q=${q}&location=${location}&maxFee=${
                  maxFee ?? ""
                }&sort=${sort}&page=${pageNum}`}
                className={`rounded border px-4 py-2 ${
                  pageNum === page
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {pageNum}
              </a>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
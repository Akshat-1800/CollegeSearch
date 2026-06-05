import prisma from "@/lib/prisma";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    ids?: string;
  }>;
};

export default async function ComparePage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const ids = params.ids
    ? params.ids.split(",").filter(Boolean)
    : [];

  if (ids.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">
          Compare Colleges
        </h1>

        <p>No colleges selected.</p>
      </main>
    );
  }

  if (ids.length < 2) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">
          Compare Colleges
        </h1>

        <p>
          Select at least one more college to compare.
        </p>
      </main>
    );
  }

  const colleges = await prisma.college.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return (
    <main className="p-6 overflow-x-auto">
      <h1 className="mb-6 text-3xl font-bold">
        Compare Colleges
      </h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-4">Field</th>

            {colleges.map((college) => (
              <th
                key={college.id}
                className="border p-4"
              >
                <div className="space-y-2">
                  <p className="font-semibold">
                    {college.name}
                  </p>

                  <Link
                    href={`/colleges/${college.id}`}
                    className="text-blue-600 underline"
                  >
                    View
                  </Link>

                  <br />

                  <Link
                    href={`/compare?ids=${ids
                      .filter(
                        (id) =>
                          id !== college.id
                      )
                      .join(",")}`}
                    className="text-red-600"
                  >
                    Remove
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border p-4 font-medium">
              Location
            </td>

            {colleges.map((college) => (
              <td
                key={college.id}
                className="border p-4"
              >
                {college.location}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4 font-medium">
              Fees
            </td>

            {colleges.map((college) => (
              <td
                key={college.id}
                className="border p-4"
              >
                ₹
                {college.fees.toLocaleString()}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4 font-medium">
              Avg Package
            </td>

            {colleges.map((college) => (
              <td
                key={college.id}
                className="border p-4"
              >
                ₹
                {college.avgPackage.toLocaleString()}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4 font-medium">
              Rating
            </td>

            {colleges.map((college) => (
              <td
                key={college.id}
                className="border p-4"
              >
                ⭐ {college.rating}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </main>
  );
}
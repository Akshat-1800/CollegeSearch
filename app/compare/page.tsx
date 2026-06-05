import prisma from "@/lib/prisma";
import Link from "next/link";
import { IndianRupee, MapPin, Scale, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6">
          <Badge variant="outline" className="mb-3 w-fit">
            Comparison
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Compare Colleges
          </h1>
        </div>

        <Card className="border-dashed">
          <CardContent className="p-6 text-[0.95rem] text-muted-foreground">
            No colleges selected.
          </CardContent>
        </Card>
      </main>
    );
  }

  if (ids.length < 2) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6">
          <Badge variant="outline" className="mb-3 w-fit">
            Comparison
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Compare Colleges
          </h1>
        </div>

        <Card className="border-dashed">
          <CardContent className="p-6 text-[0.95rem] text-muted-foreground">
            Select at least one more college to compare.
          </CardContent>
        </Card>
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

  const bestRating = Math.max(...colleges.map((college) => college.rating));
  const lowestFees = Math.min(...colleges.map((college) => college.fees));
  const bestPackage = Math.max(
    ...colleges.map((college) => college.avgPackage)
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="outline" className="mb-3 w-fit">
            Comparison
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Compare Colleges
          </h1>
          <p className="mt-2 text-[0.95rem] text-muted-foreground">
            Highlighting the best values for ratings and placements.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[0.95rem] text-muted-foreground">
          <Scale className="size-4" />
          {colleges.length} colleges
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-190 w-full border-collapse">
              <thead className="bg-muted/40 text-[0.95rem]">
                <tr>
                  <th className="border-b border-border/60 p-4 text-left font-semibold">
                    Field
                  </th>

                  {colleges.map((college) => (
                    <th
                      key={college.id}
                      className="border-b border-border/60 p-4 text-left"
                    >
                      <div className="space-y-3">
                        <p className="text-[0.95rem] font-semibold">
                          {college.name}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/colleges/${college.id}`}>View</Link>
                          </Button>
                          <Button asChild size="sm" variant="destructive">
                            <Link
                              href={`/compare?ids=${ids
                                .filter((id) => id !== college.id)
                                .join(",")}`}
                            >
                              Remove
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="text-[0.95rem]">
                <tr>
                  <td className="border-b border-border/60 p-4 font-medium">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-4" />
                      Location
                    </span>
                  </td>

                  {colleges.map((college) => (
                    <td key={college.id} className="border-b border-border/60 p-4">
                      {college.location}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border-b border-border/60 p-4 font-medium">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <IndianRupee className="size-4" />
                      Fees
                    </span>
                  </td>

                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className={
                        college.fees === lowestFees
                          ? "border-b border-border/60 p-4 font-semibold text-emerald-400"
                          : "border-b border-border/60 p-4"
                      }
                    >
                      ₹{college.fees.toLocaleString()}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border-b border-border/60 p-4 font-medium">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <IndianRupee className="size-4" />
                      Avg Package
                    </span>
                  </td>

                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className={
                        college.avgPackage === bestPackage
                          ? "border-b border-border/60 p-4 font-semibold text-emerald-400"
                          : "border-b border-border/60 p-4"
                      }
                    >
                      ₹{college.avgPackage.toLocaleString()}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border-b border-border/60 p-4 font-medium">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Star className="size-4" />
                      Rating
                    </span>
                  </td>

                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className={
                        college.rating === bestRating
                          ? "border-b border-border/60 p-4 font-semibold text-emerald-400"
                          : "border-b border-border/60 p-4"
                      }
                    >
                      {college.rating.toFixed(1)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
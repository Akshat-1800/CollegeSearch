import prisma from "@/lib/prisma";
import { IndianRupee, MapPin, Search, Star } from "lucide-react";

import CollegeCard from "@/components/collegeCard";
import RemoveCompareButton from "@/components/RemoveCompareButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


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
  const rawMaxFee = params.maxFee ?? "";
  const parsedMaxFee =
    rawMaxFee === "" ? undefined : Number(rawMaxFee);
  const maxFee =
    typeof parsedMaxFee === "number" &&
    !Number.isNaN(parsedMaxFee) &&
    parsedMaxFee >= 0
      ? parsedMaxFee
      : undefined;
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
    <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="outline" className="mb-3 w-fit">
            College discovery
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Explore Colleges
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Filter by location, fees, and rating to build your shortlist.
          </p>
        </div>
      </div>

      {compareIds.length > 0 && (
        <Card className="mb-8 border-dashed bg-muted/30">
          <CardContent className="space-y-4 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold">Selected for Compare</p>
                <p className="text-xs text-muted-foreground">
                  {compareIds.length}/3 colleges added
                </p>
              </div>

              {compareIds.length >= 2 && (
                <Button asChild>
                  <a href={`/compare?ids=${compareIds.join(",")}`}>
                    Compare Selected
                  </a>
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedColleges.map((college) => (
                <div
                  key={college.id}
                  className="flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-2 text-xs"
                >
                  <span className="font-medium text-foreground">
                    {college.name}
                  </span>
                  <RemoveCompareButton collegeId={college.id} size="xs" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8">
        <CardContent className="p-5">
          <form className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search colleges..."
              className="pl-9"
            />
          </div>

          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              name="location"
              defaultValue={location}
              placeholder="Location"
              className="pl-9"
            />
          </div>

          <div className="relative">
            <IndianRupee className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="number"
              name="maxFee"
              defaultValue={maxFee}
              placeholder="Max Fee"
              min={0}
              className="pl-9"
            />
          </div>

          <div className="relative">
            <Star className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
              name="sort"
              defaultValue={sort}
              className="h-10 w-full rounded-lg border bg-background px-9 text-[0.95rem] text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Sort By</option>
              <option value="rating">Highest Rating</option>
              <option value="fees">Lowest Fees</option>
            </select>
          </div>

            <Button type="submit" className="w-full md:w-auto">
              Apply Filters
            </Button>
          </form>
        </CardContent>
      </Card>

      {colleges.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
            <p className="text-[0.95rem] font-semibold">No colleges found</p>
            <p className="text-[0.95rem] text-muted-foreground">
              Try adjusting your search or filters to find more results.
            </p>
          </CardContent>
        </Card>
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

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Button
                    key={pageNum}
                    asChild
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                  >
                    <a
                      href={`?q=${q}&location=${location}&maxFee=${
                        maxFee ?? ""
                      }&sort=${sort}&page=${pageNum}`}
                    >
                      {pageNum}
                    </a>
                  </Button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
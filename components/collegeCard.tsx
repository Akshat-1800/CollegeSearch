import Link from "next/link";
import { IndianRupee, MapPin, Star } from "lucide-react";

import AddToCompareButton from "./AddToCompareButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
type CollegeCardProps = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  avgPackage: number;
  imageUrl: string;
};

export default function CollegeCard({
  id,
  name,
  location,
  fees,
  rating,
  avgPackage,
  imageUrl,
}: CollegeCardProps) {
  return (
    <Card className="group overflow-hidden border-border/60 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:border-border">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="gap-1 bg-background/90 text-foreground">
            <Star className="size-3.5" />
            {rating.toFixed(1)}
          </Badge>
        </div>
      </div>

      <CardContent className="space-y-3 px-5 py-5">
        <div>
          <h2 className="text-xl font-semibold leading-snug text-foreground">
            {name}
          </h2>
          <p className="mt-1 flex items-center gap-2 text-[0.95rem] text-muted-foreground">
            <MapPin className="size-4" />
            {location}
          </p>
        </div>

        <div className="grid gap-2 text-[0.95rem] text-muted-foreground">
          <div className="flex items-center gap-2">
            <IndianRupee className="size-4" />
            Fees: ₹{fees.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="size-4" />
            Avg Package: ₹{avgPackage.toLocaleString()}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button asChild className="w-full">
          <Link href={`/colleges/${id}`}>View Details</Link>
        </Button>
        <AddToCompareButton collegeId={id} className="w-full" />
      </CardFooter>
    </Card>
  );
}
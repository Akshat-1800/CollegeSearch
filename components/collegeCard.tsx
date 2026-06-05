import Link from "next/link";
import AddToCompareButton from "./AddToCompareButton";
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
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg">
      <img
        src={imageUrl}
        alt={name}
        className="h-48 w-full object-cover"
      />

      <div className="space-y-2 p-4">
        <h2 className="text-xl font-semibold">{name}</h2>

        <p className="text-sm text-gray-600">
          📍 {location}
        </p>

        <p>
          ⭐ <span className="font-medium">{rating}</span>
        </p>

        <p>
          💰 Fees: ₹{fees.toLocaleString()}
        </p>

        <p>
          📈 Avg Package: ₹{avgPackage.toLocaleString()}
        </p>

        <Link
          href={`/colleges/${id}`}
          className="inline-block rounded-lg bg-black px-4 py-2 text-white"
        >
          View Details
        </Link>

        <AddToCompareButton collegeId={id} />
      </div>
    </div>
  );
}
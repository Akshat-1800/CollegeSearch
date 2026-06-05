import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-24 text-center">
      <h1 className="mb-4 text-5xl font-bold">
        Find Your Dream College
      </h1>

      <p className="mx-auto mb-8 max-w-2xl text-gray-600">
        Search, compare and save top colleges
        across India.
      </p>

      <Link
        href="/colleges"
        className="rounded bg-black px-6 py-3 text-white"
      >
        Explore Colleges
      </Link>
    </section>
  );
}
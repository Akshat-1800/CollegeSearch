import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.savedCollege.deleteMany();
await prisma.review.deleteMany();
await prisma.course.deleteMany();
await prisma.college.deleteMany();

const testUser = await prisma.user.findFirst({
where: {
userName: "test",
},
});

if (!testUser) {
throw new Error(
"User with userName 'test' not found. Please sign in once before seeding."
);
}

const colleges = [
{
name: "IIT Delhi",
location: "New Delhi",
fees: 1200000,
rating: 4.8,
avgPackage: 2500000,
overview: "Premier engineering institute in India.",
},
{
name: "IIT Bombay",
location: "Mumbai",
fees: 1100000,
rating: 4.9,
avgPackage: 2800000,
overview: "Known for engineering, research and innovation.",
},
{
name: "IIT Madras",
location: "Chennai",
fees: 1150000,
rating: 4.8,
avgPackage: 2600000,
overview: "Top-ranked engineering institution.",
},
{
name: "IIT Kanpur",
location: "Kanpur",
fees: 1050000,
rating: 4.7,
avgPackage: 2400000,
overview: "Strong research and startup culture.",
},
{
name: "IIT Kharagpur",
location: "Kharagpur",
fees: 1000000,
rating: 4.7,
avgPackage: 2200000,
overview: "Oldest IIT with diverse programs.",
},
{
name: "IIT Roorkee",
location: "Roorkee",
fees: 950000,
rating: 4.6,
avgPackage: 2100000,
overview: "Renowned engineering and technology institute.",
},
{
name: "BITS Pilani",
location: "Pilani",
fees: 1800000,
rating: 4.7,
avgPackage: 2200000,
overview: "Private institute with strong placements.",
},
{
name: "BITS Goa",
location: "Goa",
fees: 1750000,
rating: 4.5,
avgPackage: 1900000,
overview: "Popular BITS campus with excellent academics.",
},
{
name: "NIT Trichy",
location: "Tiruchirappalli",
fees: 850000,
rating: 4.6,
avgPackage: 1800000,
overview: "One of the best NITs in India.",
},
{
name: "NIT Surathkal",
location: "Mangalore",
fees: 820000,
rating: 4.5,
avgPackage: 1700000,
overview: "Excellent placements and coastal campus.",
},
{
name: "NIT Warangal",
location: "Warangal",
fees: 800000,
rating: 4.4,
avgPackage: 1600000,
overview: "Leading NIT with strong technical programs.",
},
{
name: "IIIT Hyderabad",
location: "Hyderabad",
fees: 1500000,
rating: 4.8,
avgPackage: 3000000,
overview: "Top institute for Computer Science.",
},
{
name: "IIIT Bangalore",
location: "Bangalore",
fees: 1400000,
rating: 4.6,
avgPackage: 2400000,
overview: "Known for AI and software engineering.",
},
{
name: "BHU",
location: "Varanasi",
fees: 400000,
rating: 4.4,
avgPackage: 1200000,
overview: "One of India's largest residential universities.",
},
{
name: "DTU",
location: "Delhi",
fees: 700000,
rating: 4.4,
avgPackage: 1500000,
overview: "Top state engineering university.",
},
{
name: "NSUT",
location: "Delhi",
fees: 720000,
rating: 4.4,
avgPackage: 1450000,
overview: "Strong engineering and placement record.",
},
{
name: "VIT Vellore",
location: "Vellore",
fees: 800000,
rating: 4.2,
avgPackage: 900000,
overview: "Popular private engineering university.",
},
{
name: "SRM Chennai",
location: "Chennai",
fees: 900000,
rating: 4.1,
avgPackage: 850000,
overview: "Large private university with diverse programs.",
},
{
name: "Manipal Institute of Technology",
location: "Manipal",
fees: 1400000,
rating: 4.3,
avgPackage: 1100000,
overview: "Well-known private engineering institution.",
},
{
name: "Amity Noida",
location: "Noida",
fees: 1200000,
rating: 3.9,
avgPackage: 700000,
overview: "Private university with a large campus.",
},
];

for (let i = 0; i < colleges.length; i++) {
const college = colleges[i];

await prisma.college.create({
  data: {
    ...college,

    imageUrl:
      "https://images.unsplash.com/photo-1562774053-701939374585",

    courses: {
      create: [
        {
          name: "B.Tech CSE",
          duration: "4 Years",
          fees: college.fees,
        },
        {
          name: "M.Tech AI",
          duration: "2 Years",
          fees: Math.floor(college.fees * 0.7),
        },
      ],
    },

    reviews:
      i < 10
        ? {
            create: [
              {
  rating: college.rating,
  comment:
    "Excellent placements, supportive faculty and great campus life.",
  userName: testUser.userName ?? "test",

  user: {
    connect: {
      id: testUser.id,
    },
  },
},
            ],
          }
        : undefined,
  },
});

}

console.log("✅ Seeded 20 colleges successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
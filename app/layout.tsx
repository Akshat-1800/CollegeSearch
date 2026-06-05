import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";
import { syncUser } from "@/lib/sync-user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CollegeSearch - Find Your Dream College",
  description: "Search, compare and save top colleges across India with CollegeSearch.",
};

export default async function RootLayout({
  children,
}

: Readonly<{
  children: React.ReactNode;
}>) 
{
  await syncUser();
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      >
        <body className="min-h-full flex flex-col bg-background text-foreground">
          <Navbar />
          {children}
          <Footer />
          <ToasterProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us | Sustainable Tableware & Spices Supplier in Bhubaneswar",
  description: "Learn about Trumate's mission to bring 100% biodegradable tableware and pure kitchen spices to homes, restaurants, and businesses across Bhubaneswar, Odisha.",
  alternates: {
    canonical: "/about",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
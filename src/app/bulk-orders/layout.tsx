import type { Metadata } from "next";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bulk Orders & Wholesale Biodegradable Tableware in Bhubaneswar",
  description: "Looking for wholesale biodegradable tableware, areca palm plates, or bulk kitchen spices in Bhubaneswar? Partner with Trumate for reliable supply, special pricing, and eco-friendly solutions.",
  alternates: {
    canonical: "/bulk-orders", // Update with your actual bulk orders route/path if different
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
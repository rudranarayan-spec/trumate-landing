import type { Metadata } from "next";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Trumate Supplier & Support in Bhubaneswar",
  description: "Get in touch with Trumate in Bhubaneswar, Odisha. Reach out for bulk orders, customer support, pure kitchen spices, and 100% biodegradable tableware inquiries.",
  alternates: {
    canonical: "/contact",
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
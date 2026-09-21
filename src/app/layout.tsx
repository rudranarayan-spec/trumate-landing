import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // <-- Import your Header component
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trumate",
  description: "Quality essentials for kitchens, homes and businesses across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        {/* Render Header globally across all pages */}
        <Header />
        <WhatsAppButton />
        {/* Main page content (Landing page, etc.) */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
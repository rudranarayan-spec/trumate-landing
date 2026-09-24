import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Trumate | Biodegradable Tableware & Pure Spices in Bhubaneswar",
    template: "%s | Trumate Bhubaneswar",
  },
  description: "Trumate provides 100% biodegradable tableware, areca palm plates, bagasse containers, and pure kitchen spices in Bhubaneswar, Odisha. Eco-friendly solutions for homes, restaurants, and events.",
  keywords: [
    "biodegradable tableware Bhubaneswar",
    "areca palm plates Bhubaneswar",
    "eco friendly disposables Odisha",
    "pure kitchen spices Bhubaneswar",
    "bagasse containers suppliers Bhubaneswar",
    "wholesale biodegradable plates Bhubaneswar",
    "Trumate Bhubaneswar"
  ],
  authors: [{ name: "Trumate" }],
  creator: "Trumate",
  publisher: "Trumate",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://trumate.com"), // Update with your actual domain when live
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Trumate | Biodegradable Tableware & Pure Spices in Bhubaneswar",
    description: "Discover 100% biodegradable tableware and pure kitchen spices in Bhubaneswar. Sustainable, eco-friendly solutions for modern kitchens and events.",
    url: "https://trumate.com",
    siteName: "Trumate",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trumate | Biodegradable Tableware & Pure Spices in Bhubaneswar",
    description: "Shop eco-friendly biodegradable plates, tableware, and pure kitchen spices in Bhubaneswar, Odisha.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <main>
          <Toaster position="top-right"/>
          {children}
        </main>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

export const metadata: Metadata = {
  title: "Super Admin Dashboard | Trumate",
  description: "Internal management dashboard for Trumate administrators.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-stone-100 font-sans text-stone-900">
        {children}
      </div>
    </AdminAuthProvider>
  );
}
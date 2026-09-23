import { AdminAuthProvider } from "@/context/AdminAuthContext";

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
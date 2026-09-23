"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuperAdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem("superadmin_logged_in");
    if (authStatus === "true") {
      router.replace("/superadmin/dashboard");
    } else {
      router.replace("/superadmin/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF9F5]">
      <div className="text-center text-stone-500 text-sm animate-pulse">
        Redirecting to Superadmin Portal...
      </div>
    </div>
  );
}
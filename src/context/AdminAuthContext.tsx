"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminAuthContextType {
    isAuthenticated: boolean;
    login: (user: string, pass: string) => boolean;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check local storage for session
        const authStatus = localStorage.getItem("superadmin_logged_in");
        if (authStatus === "true") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            const isLoginPage = pathname === "/superadmin/login";
            const isSuperadminRoute = pathname.startsWith("/superadmin");

            if (isSuperadminRoute && !isLoginPage && !isAuthenticated) {
                router.push("/superadmin/login");
            } else if (isLoginPage && isAuthenticated) {
                router.push("/superadmin/dashboard");
            }
        }
    }, [isAuthenticated, pathname, loading, router]);

    const login = (user: string, pass: string) => {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@trumate.com";
        const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS || "Admin@2026";

        if (user === adminEmail && pass === adminPass) {
            localStorage.setItem("superadmin_logged_in", "true");
            setIsAuthenticated(true);
            router.push("/superadmin/dashboard");
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("superadmin_logged_in");
        setIsAuthenticated(false);
        router.push("/superadmin/login");
    };

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error("useAdminAuth must be used within an AdminAuthProvider");
    }
    return context;
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Layers, ShoppingCart, ExternalLink, LogOut, MessageSquare } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/superadmin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/superadmin/dashboard/products", icon: Package },
  { name: "Categories", href: "/superadmin/dashboard/categories", icon: Layers },
  { name: "Bulk Orders", href: "/superadmin/dashboard/bulk-orders", icon: ShoppingCart },
  { name: "Inqueries", href: "/superadmin/dashboard/contact-inqueries", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between sticky top-0 h-screen shrink-0 hidden md:flex border-r border-gray-800">
      <div>
        {/* App / Brand Header */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-wider text-white">SuperAdmin</h1>
          <p className="text-xs text-gray-400 mt-1">Management Portal</p>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions: Visit Site & Logout */}
      <div className="p-4 border-t border-gray-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <ExternalLink className="w-5 h-5 shrink-0" />
          Visit Site
        </Link>
        <Link
          href="/superadmin/login"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
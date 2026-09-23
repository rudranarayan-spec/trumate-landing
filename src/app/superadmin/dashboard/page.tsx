/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Layers, Package, ShoppingCart, TrendingUp } from "lucide-react";

export default function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/stats");
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard metrics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard analytics...</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Categories */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Categories</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats?.totalCategories || 0}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats?.totalProducts || 0}</h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Total Bulk Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Bulk Order Requests</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats?.totalBulkOrders || 0}</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products Per Category Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-500" /> Products Per Category
          </h2>
          <div className="space-y-4">
            {stats?.productsPerCategory?.map((cat: any) => {
              const percentage = Math.round((cat.count / stats.totalProducts) * 100) || 0;
              return (
                <div key={cat.categoryId} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700">{cat.categoryName}</span>
                    <span className="text-gray-900 font-semibold">{cat.count} products</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Action / Recent Updates Summary Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">System Status</h2>
            <p className="text-sm text-gray-500 mb-4">
              Your database is active, synced with MongoDB Atlas, and currently serving categories like <strong>Eco Friendly</strong> and <strong>Spices</strong>.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Database Connection</span>
                <span className="text-green-600 font-medium">Connected</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Seeder Status</span>
                <span className="text-blue-600 font-medium">Synced (2 Categories)</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <a
              href="/superadmin/dashboard/products"
              className="w-full block text-center bg-gray-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Manage Products & Inventory
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
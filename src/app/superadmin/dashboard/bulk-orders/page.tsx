/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Search, Eye } from "lucide-react";

export default function BulkOrdersManagementPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBulkOrders() {
      try {
        const res = await fetch("/api/bulk-orders"); 
        const json = await res.json();
        setOrders(json.data || json || []);
      } catch (err) {
        console.error("Failed to load bulk orders", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBulkOrders();
  }, []);

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Bulk Order Requests</h1>
        <p className="text-sm text-gray-500">Review, process, and track wholesale and hospitality procurement inquiries.</p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading bulk orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="font-medium">No bulk orders found</p>
            <p className="text-xs text-gray-400 mt-1">Inquiries submitted via your website will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Client Name</th>
                  <th className="py-3 px-6">Company / Organization</th>
                  <th className="py-3 px-6">Contact Info</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6 font-medium text-gray-900">{order.name}</td>
                    <td className="py-4 px-6 text-gray-600">{order.company || "Independent"}</td>
                    <td className="py-4 px-6 text-gray-600">
                      <div>{order.email}</div>
                      <div className="text-xs text-gray-400">{order.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                        {order.status || "Pending Review"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
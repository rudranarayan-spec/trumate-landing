/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Search, Eye, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export default function BulkOrdersManagementPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal state for viewing/editing an order
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchBulkOrders = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/bulk-order");
            const json = await res.json();
            setOrders(json.data || json || []);
        } catch (err) {
            console.error("Failed to load bulk orders", err);
            toast.error("Failed to load bulk orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBulkOrders();
    }, []);

    // Handle status update or edits via PUT API
    const handleUpdateOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedOrder) return;

        setIsUpdating(true);
        try {
            const res = await fetch(`/api/bulk-order/${selectedOrder._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: selectedOrder.status,
                    message: selectedOrder.message,
                }),
            });

            if (!res.ok) throw new Error("Failed to update bulk order");

            const json = await res.json();
            toast.success("Bulk order updated successfully");

            // Update local state list
            setOrders(orders.map((o) => (o._id === selectedOrder._id ? json.data : o)));
            setSelectedOrder(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update bulk order");
        } finally {
            setIsUpdating(false);
        }
    };

    // Handle Delete using Sonner Toast confirmation
    const handleDelete = (id: string) => {
        toast("Are you sure you want to delete this bulk order record?", {
            duration: Infinity,
            action: {
                label: "Confirm",
                onClick: async () => {
                    try {
                        const res = await fetch(`/api/bulk-order/${id}`, {
                            method: "DELETE",
                        });

                        if (!res.ok) throw new Error("Failed to delete bulk order");

                        toast.success("Bulk order deleted successfully");
                        setOrders((prev) => prev.filter((o) => o._id !== id));
                    } catch (err) {
                        console.error(err);
                        toast.error("Failed to delete bulk order");
                    }
                },
            },
            cancel: {
                label: "Cancel",
                onClick: () => {},
            },
        });
    };

    const filteredOrders = orders.filter(
        (order) =>
            order.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusBadgeStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case "approved":
            case "completed":
                return "bg-green-50 text-green-700";
            case "rejected":
            case "cancelled":
                return "bg-red-50 text-red-700";
            default:
                return "bg-amber-50 text-amber-700";
        }
    };

    return (
        <div className="p-8 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Bulk Order Requests</h1>
                    <p className="text-sm text-gray-500">Review, process, and track wholesale and hospitality procurement inquiries.</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by client, business, or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="text-sm text-gray-500 font-medium">
                    Total Inquiries: <span className="text-gray-900 font-bold">{filteredOrders.length}</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading bulk orders...</div>
                ) : filteredOrders.length === 0 ? (
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
                                    <th className="py-3 px-6">Product & Qty</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition">
                                        <td className="py-4 px-6 font-medium text-gray-900">{order.name}</td>
                                        <td className="py-4 px-6 text-gray-600">
                                            <div>{order.businessName || "Independent"}</div>
                                            <div className="text-xs text-gray-400">{order.businessType}</div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-600">
                                            <div>{order.email}</div>
                                            <div className="text-xs text-gray-400">{order.phone}</div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-600">
                                            <div className="font-medium text-gray-800">{order.productInterest}</div>
                                            <div className="text-xs text-gray-500">Qty: {order.quantity}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(order.status)}`}>
                                                {order.status || "Pending Review"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-1">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition inline-block"
                                                title="View & Edit Order"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(order._id)}
                                                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition inline-block"
                                                title="Delete Order"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View / Edit Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-xl max-w-xl w-full p-6 space-y-6 my-8">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-xl font-bold text-gray-900">Bulk Order Details</h2>
                            <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateOrder} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase">Client Name</span>
                                    <p className="font-medium text-gray-900">{selectedOrder.name}</p>
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase">Email</span>
                                    <p className="font-medium text-gray-900">{selectedOrder.email}</p>
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase">Phone</span>
                                    <p className="font-medium text-gray-900">{selectedOrder.phone}</p>
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase">Business Name</span>
                                    <p className="font-medium text-gray-900">{selectedOrder.businessName} ({selectedOrder.businessType})</p>
                                </div>
                                <div className="col-span-2">
                                    <span className="block text-xs font-semibold text-gray-400 uppercase">Product Interest & Quantity</span>
                                    <p className="font-medium text-gray-900">{selectedOrder.productInterest} — <span className="text-blue-600 font-bold">{selectedOrder.quantity} units</span></p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Update Status</label>
                                <select
                                    value={selectedOrder.status || "Pending Review"}
                                    onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                    <option value="Pending Review">Pending Review</option>
                                    <option value="In Discussion">In Discussion</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Client Message / Notes</label>
                                <textarea
                                    rows={3}
                                    value={selectedOrder.message || ""}
                                    onChange={(e) => setSelectedOrder({ ...selectedOrder, message: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Optional notes or requirements..."
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setSelectedOrder(null)}
                                    className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Mail, Search, Trash2, Download, RefreshCw, CheckCircle2, XCircle, AlertCircle, Send, X } from "lucide-react";

interface Subscriber {
    _id: string;
    email: string;
    isActive: boolean;
    createdAt: string;
}

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Broadcast Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [broadcastFeedback, setBroadcastFeedback] = useState<{ success: boolean; text: string } | null>(null);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("/api/newsletter");
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to load subscribers.");
            setSubscribers(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this subscriber?")) return;

        try {
            setDeletingId(id);
            const res = await fetch(`/api/newsletter?id=${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to delete.");

            setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
        } catch (err: any) {
            alert(err.message || "Error deleting subscriber.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleSendBroadcast = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject || !message) return;

        setSending(true);
        setBroadcastFeedback(null);

        try {
            const res = await fetch("/api/newsletter/broadcast", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, message }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to send email broadcast.");

            setBroadcastFeedback({ success: true, text: data.message });
            setSubject("");
            setMessage("");
            setTimeout(() => {
                setIsModalOpen(false);
                setBroadcastFeedback(null);
            }, 3000);
        } catch (err: any) {
            setBroadcastFeedback({ success: false, text: err.message });
        } finally {
            setSending(false);
        }
    };

    const handleExportCSV = () => {
        if (subscribers.length === 0) return;

        const headers = ["Email", "Status", "Subscribed Date"];
        const rows = filteredSubscribers.map((sub) => [
            sub.email,
            sub.isActive ? "Active" : "Inactive",
            new Date(sub.createdAt).toLocaleDateString(),
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredSubscribers = subscribers.filter((sub) =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeCount = subscribers.filter((s) => s.isActive).length;

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 relative">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2.5">
                        <Mail className="size-6 text-blue-600" />
                        Newsletter Subscribers
                    </h1>
                    <p className="text-sm text-stone-500 mt-1">
                        Manage your mailing list and broadcast announcements to active subscribers.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1C3516] rounded-xl hover:bg-[#274a20] transition-colors shadow-sm cursor-pointer"
                    >
                        <Send className="size-3.5" />
                        Send Newsletter
                    </button>
                    <button
                        onClick={fetchSubscribers}
                        className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer"
                    >
                        <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                    <button
                        onClick={handleExportCSV}
                        disabled={subscribers.length === 0}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    >
                        <Download className="size-3.5" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters / Search Bar */}
            <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Search by email address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                </div>
                <div className="text-xs text-stone-500 font-medium">
                    Total Active: <span className="text-stone-900 font-bold">{activeCount}</span> / {subscribers.length}
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="size-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Table Section */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-stone-50/70 border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                                <th className="py-3.5 px-6">Email Address</th>
                                <th className="py-3.5 px-6">Status</th>
                                <th className="py-3.5 px-6">Joined Date</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-stone-400">
                                        <RefreshCw className="size-5 animate-spin mx-auto mb-2 text-blue-600" />
                                        Loading subscribers...
                                    </td>
                                </tr>
                            ) : filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-stone-400">
                                        No subscribers found.
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((sub) => (
                                    <tr key={sub._id} className="hover:bg-stone-50/50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-stone-900">{sub.email}</td>
                                        <td className="py-4 px-6">
                                            {sub.isActive ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <CheckCircle2 className="size-3 text-emerald-600" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600 border border-stone-200">
                                                    <XCircle className="size-3 text-stone-400" />
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-stone-500">
                                            {new Date(sub.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => handleDelete(sub._id)}
                                                disabled={deletingId === sub._id}
                                                className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                                                title="Delete subscriber"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Send Newsletter Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                                <Send className="size-4 text-[#1C3516]" />
                                Broadcast Newsletter ({activeCount} Active Recipients)
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg cursor-pointer"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSendBroadcast} className="p-6 space-y-4">
                            {broadcastFeedback && (
                                <div
                                    className={`p-3 rounded-xl text-xs flex items-center gap-2 ${broadcastFeedback.success
                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                            : "bg-red-50 text-red-700 border border-red-200"
                                        }`}
                                >
                                    {broadcastFeedback.success ? <CheckCircle2 className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />}
                                    <span>{broadcastFeedback.text}</span>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                                    Email Subject
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Exciting New Eco-Arrivals & Spices!"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                                    Message Content
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    placeholder="Write your newsletter announcement here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all resize-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-50 cursor-pointer transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={sending || activeCount === 0}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C3516] hover:bg-[#274a20] text-amber-50 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
                                >
                                    {sending ? <RefreshCw className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
                                    {sending ? "Sending..." : "Send to All Subscribers"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
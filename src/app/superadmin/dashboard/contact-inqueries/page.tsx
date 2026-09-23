/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Mail, Search, Trash2, Eye, X } from "lucide-react";
import { toast } from "sonner";

export default function ContactsManagementPage() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch contact messages from your API
    const fetchContacts = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/contact");
            const json = await res.json();
            setContacts(json.data || json || []);
        } catch (err) {
            console.error("Failed to load contact inquiries", err);
            toast.error("Failed to load contact inquiries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Handle updating contact status via PUT API
    const handleUpdateStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedContact) return;

        setIsUpdating(true);
        try {
            const res = await fetch(`/api/contact/${selectedContact._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: selectedContact.status,
                }),
            });

            if (!res.ok) throw new Error("Failed to update contact status");

            const json = await res.json();
            toast.success("Contact status updated successfully");

            // Update local state list
            setContacts(contacts.map((c) => (c._id === selectedContact._id ? json.data : c)));
            setSelectedContact(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update contact status");
        } finally {
            setIsUpdating(false);
        }
    };

    // Handle Delete using Sonner Toast confirmation
    const handleDelete = (id: string) => {
        toast("Are you sure you want to delete this contact message?", {
            duration: Infinity,
            action: {
                label: "Confirm",
                onClick: async () => {
                    try {
                        const res = await fetch(`/api/contact/${id}`, {
                            method: "DELETE",
                        });

                        if (!res.ok) throw new Error("Failed to delete contact");

                        toast.success("Contact message deleted successfully");
                        setContacts((prev) => prev.filter((c) => c._id !== id));
                    } catch (err) {
                        console.error(err);
                        toast.error("Failed to delete contact message");
                    }
                },
            },
            cancel: {
                label: "Cancel",
                onClick: () => {},
            },
        });
    };

    // Filter messages based on search query
    const filteredContacts = contacts.filter(
        (c) =>
            c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.subject && c.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const getStatusBadgeStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case "read":
            case "replied":
                return "bg-green-50 text-green-700";
            default:
                return "bg-amber-50 text-amber-700";
        }
    };

    return (
        <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Contact Inquiries</h1>
                <p className="text-sm text-gray-500">Review and manage customer messages submitted through your website contact form.</p>
            </div>

            {/* Search & Stats Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by sender name, email, or subject..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="text-sm text-gray-500 font-medium self-end sm:self-center">
                    Total Inquiries: <span className="text-gray-900 font-bold">{filteredContacts.length}</span>
                </div>
            </div>

            {/* Contacts Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading contact messages...</div>
                ) : filteredContacts.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <Mail className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p className="font-medium">No contact messages found</p>
                        <p className="text-xs text-gray-400 mt-1">New user submissions will appear here automatically.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3 px-6">Sender</th>
                                    <th className="py-3 px-6">Subject</th>
                                    <th className="py-3 px-6">Phone</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6">Date</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredContacts.map((contact) => (
                                    <tr key={contact._id} className="hover:bg-gray-50/50 transition">
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-gray-900">{contact.name}</div>
                                            <div className="text-xs text-gray-500">{contact.email}</div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-700 font-medium max-w-xs truncate">
                                            {contact.subject || "General Inquiry"}
                                        </td>
                                        <td className="py-4 px-6 text-gray-600">
                                            {contact.phone ? (
                                                <a href={`tel:${contact.phone}`} className="hover:underline text-blue-600">{contact.phone}</a>
                                            ) : (
                                                <span className="text-gray-400 text-xs">Not provided</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(contact.status)}`}>
                                                {contact.status || "Unread"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-500 text-xs">
                                            {new Date(contact.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-1">
                                            <button
                                                onClick={() => setSelectedContact(contact)}
                                                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition inline-block"
                                                title="View & Update Message"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(contact._id)}
                                                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition inline-block"
                                                title="Delete Message"
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

            {/* View / Update Message Modal */}
            {selectedContact && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 my-8">
                        <div className="flex justify-between items-start border-b pb-3">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{selectedContact.subject || "General Inquiry"}</h3>
                                <p className="text-xs text-gray-500">Received on {new Date(selectedContact.createdAt).toLocaleString()}</p>
                            </div>
                            <button
                                onClick={() => setSelectedContact(null)}
                                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateStatus} className="space-y-4 text-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg">
                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase">Sender Name</span>
                                    <p className="font-medium text-gray-900">{selectedContact.name}</p>
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase">Email</span>
                                    <p><a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">{selectedContact.email}</a></p>
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase">Phone</span>
                                    <p className="font-medium text-gray-900">{selectedContact.phone || "Not provided"}</p>
                                </div>
                            </div>

                            <div>
                                <span className="block text-xs font-semibold text-gray-700 uppercase mb-1">Message Content</span>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-800 whitespace-pre-wrap max-h-40 overflow-y-auto">
                                    {selectedContact.message}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Update Status</label>
                                <select
                                    value={selectedContact.status || "Unread"}
                                    onChange={(e) => setSelectedContact({ ...selectedContact, status: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                    <option value="Unread">Unread</option>
                                    <option value="Read">Read</option>
                                    <option value="Replied">Replied</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setSelectedContact(null)}
                                    className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {isUpdating ? "Saving..." : "Save Status"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
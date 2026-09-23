/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Mail, Search, Trash2, Eye, MessageSquare } from "lucide-react";

export default function ContactsManagementPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Fetch contact messages from your API
  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/contact");
        const json = await res.json();
        setContacts(json.data || json || []);
      } catch (err) {
        console.error("Failed to load contact inquiries", err);
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, []);

  // Filter messages based on search query (sender name or email or subject)
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.subject && c.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        contact.status === "Read" ? "bg-gray-100 text-gray-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {contact.status || "Unread"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-xs">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right space-x-1">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Message"
                      >
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

      {/* View Message Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedContact.subject || "General Inquiry"}</h3>
                <p className="text-xs text-gray-500">Received on {new Date(selectedContact.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Sender Name:</span>
                <p className="text-gray-900">{selectedContact.name}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Email Address:</span>
                <p><a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">{selectedContact.email}</a></p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Phone Number:</span>
                <p className="text-gray-900">{selectedContact.phone || "Not provided"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Message Content:</span>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-800 whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedContact(null)}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
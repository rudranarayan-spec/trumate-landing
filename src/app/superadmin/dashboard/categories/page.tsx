/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Layers, Trash2 } from "lucide-react";

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories"); // Ensure your category API endpoint is available
        const json = await res.json();
        setCategories(json.data || json || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Categories Management</h1>
          <p className="text-sm text-gray-500">Organize your product catalog into structured groupings.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition shadow-sm">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Total Categories: <span className="text-gray-900 font-bold">{filteredCategories.length}</span>
        </div>
      </div>

      {/* Categories Table/Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading categories...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Layers className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="font-medium">No categories found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Category Name</th>
                  <th className="py-3 px-6">Slug</th>
                  <th className="py-3 px-6">Description</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredCategories.map((cat) => (
                  <tr key={cat._id || cat.slug} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6 font-medium text-gray-900">{cat.name}</td>
                    <td className="py-4 px-6 text-gray-600 font-mono text-xs">{cat.slug}</td>
                    <td className="py-4 px-6 text-gray-500 max-w-xs truncate">{cat.description || "N/A"}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
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
    </div>
  );
}
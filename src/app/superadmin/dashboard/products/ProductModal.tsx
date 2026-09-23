/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (productData: any) => Promise<void>;
    productToEdit?: any | null;
    categories: any[];
}

export default function ProductModal({
    isOpen,
    onClose,
    onSave,
    productToEdit,
    categories,
}: ProductModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        category: "",
        price: "" as number | "",
        compareAtPrice: "" as number | "",
        stock: "" as number | "",
        sku: "",
        status: "Published",
        isFeatured: false,
        images: [""],
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name || "",
                slug: productToEdit.slug || "",
                description: productToEdit.description || "",
                category: productToEdit.category?._id || productToEdit.category || "",
                price: productToEdit.price ?? "",
                compareAtPrice: productToEdit.compareAtPrice ?? "",
                stock: productToEdit.stock ?? "",
                sku: productToEdit.sku || "",
                status: productToEdit.status || "Published",
                isFeatured: productToEdit.isFeatured || false,
                images: productToEdit.images?.length ? productToEdit.images : [""],
            });
        } else {
            setFormData({
                name: "",
                slug: "",
                description: "",
                category: categories[0]?._id || "",
                price: "",
                compareAtPrice: "",
                stock: "",
                sku: "",
                status: "Published",
                isFeatured: false,
                images: [""],
            });
        }
    }, [productToEdit, categories, isOpen]);

    // Auto-generate slug from name if adding a new product
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setFormData((prev) => ({
            ...prev,
            name,
            slug: !productToEdit
                ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                : prev.slug,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await onSave(formData);
            onClose();
        } catch (err) {
            console.error("Failed to save product", err);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        {productToEdit ? "Edit Product" : "Add New Product"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Product Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleNameChange}
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Organic Herbal Tea"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Slug *</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Category *</label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Price (₹) *</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price: e.target.value === "" ? "" : Number(e.target.value),
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Compare Price (₹)</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.compareAtPrice}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        compareAtPrice: e.target.value === "" ? "" : Number(e.target.value),
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Stock Qty *</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.stock}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        stock: e.target.value === "" ? "" : Number(e.target.value),
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">SKU Code</label>
                            <input
                                type="text"
                                value={formData.sku}
                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. TRU-TEA-01"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            >
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Image URL</label>
                        <input
                            type="text"
                            value={formData.images[0]}
                            onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Description *</label>
                        <textarea
                            required
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Detailed product description..."
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isFeatured"
                            checked={formData.isFeatured}
                            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                            Feature on Homepage Storefront
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {submitting ? "Saving..." : productToEdit ? "Update Product" : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
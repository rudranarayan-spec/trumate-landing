import mongoose, { Schema, Document, models } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  category: mongoose.Types.ObjectId;
  price: number;
  compareAtPrice?: number; // Original price for showing discounts
  stock: number;
  sku?: string;
  images: string[]; // Array of image URLs
  status: "Draft" | "Published" | "Out of Stock";
  isFeatured: boolean;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  stock: { type: Number, required: true, default: 0, min: 0 },
  sku: { type: String, unique: true, sparse: true },
  images: [{ type: String }], // List of product photo links
  status: { 
    type: String, 
    enum: ["Draft", "Published", "Out of Stock"], 
    default: "Published" 
  },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default models.Product || mongoose.model<IProduct>("Product", ProductSchema);
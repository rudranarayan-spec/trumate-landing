import mongoose, { Schema, Document, models } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, trim: true },
  image: { type: String }, // URL for category image/icon
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Category || mongoose.model<ICategory>("Category", CategorySchema);
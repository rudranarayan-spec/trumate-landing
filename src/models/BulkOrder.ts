import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBulkOrder extends Document {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  productInterest: string;
  quantity: string;
  message?: string;
  status: string;
  createdAt: Date;
}

const BulkOrderSchema = new Schema<IBulkOrder>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    businessName: { type: String, required: true },
    businessType: { type: String, required: true },
    productInterest: { type: String, required: true },
    quantity: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: "Pending Review" },
  },
  { timestamps: true }
);

const BulkOrder: Model<IBulkOrder> =
  mongoose.models.BulkOrder || mongoose.models.bulkorders || mongoose.model<IBulkOrder>("BulkOrder", BulkOrderSchema);

export default BulkOrder;
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, default: "General Inquiry" },
    message: { type: String, required: true },
    status: { type: String, default: "Unread" },
  },
  { timestamps: true }
);

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
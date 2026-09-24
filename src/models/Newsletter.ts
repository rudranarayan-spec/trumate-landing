import mongoose, { Schema, Document, Model } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Newsletter: Model<INewsletter> =
  mongoose.models.Newsletter || mongoose.model<INewsletter>("Newsletter", NewsletterSchema);

export default Newsletter;
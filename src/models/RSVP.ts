import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IRSVP extends Document {
  fullName: string;
  email: string;
  phone: string;
  attending: boolean;
  guestCount: number;
  eventsAttending: string[];
  dietaryPreferences?: string;
  message?: string;
  status: "confirmed" | "declined" | "pending";
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RSVPSchema = new Schema<IRSVP>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    attending: {
      type: Boolean,
      required: true,
      default: true,
    },
    guestCount: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      default: 1,
    },
    eventsAttending: {
      type: [String],
      required: true,
      default: [],
    },
    dietaryPreferences: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    status: {
      type: String,
      enum: ["confirmed", "declined", "pending"],
      default: "confirmed",
      index: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Composite index for fast searching and duplicate detection
RSVPSchema.index({ email: 1, phone: 1 });

export const RSVPModel: Model<IRSVP> =
  mongoose.models.RSVP || mongoose.model<IRSVP>("RSVP", RSVPSchema);

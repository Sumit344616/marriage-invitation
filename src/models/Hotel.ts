import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IHotel extends Document {
  name: string;
  address: string;
  city: string;
  phone?: string;
  websiteUrl?: string;
  mapUrl?: string;
  bookingCode?: string;
  discountNote?: string;
  distanceToVenue?: string;
  priceRange?: string;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const HotelSchema = new Schema<IHotel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      default: "Jaipur, Rajasthan",
    },
    phone: {
      type: String,
      trim: true,
    },
    websiteUrl: {
      type: String,
      trim: true,
    },
    mapUrl: {
      type: String,
      trim: true,
    },
    bookingCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    discountNote: {
      type: String,
      trim: true,
    },
    distanceToVenue: {
      type: String,
      trim: true,
    },
    priceRange: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

export const HotelModel: Model<IHotel> =
  mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema);

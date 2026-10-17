import mongoose, { Schema, type Model } from "mongoose";
import type { WeddingData } from "@/types/wedding";

const WeddingSchema = new Schema<WeddingData>(
  {
    bride: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      parents: { type: String, required: true },
      grandparents: { type: String },
      bio: { type: String },
      portraitUrl: { type: String, required: true },
    },
    groom: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      parents: { type: String, required: true },
      grandparents: { type: String },
      bio: { type: String },
      portraitUrl: { type: String, required: true },
    },
    tagline: { type: String, required: true },
    city: { type: String, required: true },
    invitationMessage: { type: String, required: true },
    shloka: {
      sanskrit: { type: String, required: true },
      translation: { type: String, required: true },
    },
    heroImage: { type: String, required: true },
    venueImage: { type: String, required: true },
    weddingDate: { type: String, required: true },
    label: { type: String },
    story: [
      {
        title: { type: String, required: true },
        date: { type: String, required: true },
        description: { type: String, required: true },
        quote: { type: String },
      },
    ],
    events: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        subtitle: { type: String },
        date: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String },
        time: { type: String },
        timezone: { type: String, default: "Asia/Kolkata" },
        venue: { type: String, required: true },
        address: { type: String, required: true },
        mapUrl: { type: String },
        description: { type: String },
        dressCode: { type: String },
        instructions: { type: String },
        order: { type: Number, default: 0 },
        isPublished: { type: Boolean, default: true },
        featured: { type: Boolean, default: false },
      },
    ],
    gallery: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        category: { type: String, required: true },
        imageUrl: { type: String, required: true },
        alt: { type: String, required: true },
        caption: { type: String },
        aspectRatio: { type: String, default: "landscape" },
      },
    ],
    guestNotes: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        category: { type: String, required: true },
        highlight: { type: String },
        content: { type: String, required: true },
      },
    ],
    music: {
      title: { type: String },
      artist: { type: String },
      audioUrl: { type: String },
    },
  },
  { timestamps: true }
);

export const WeddingModel: Model<WeddingData> =
  mongoose.models.Wedding || mongoose.model<WeddingData>("Wedding", WeddingSchema);

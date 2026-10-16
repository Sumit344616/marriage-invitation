/**
 * Shared Type Definitions — Wedding Invitation Application
 *
 * Types for Phase 1, Phase 2, and Phase 3 features (events, gallery, guest notes).
 */

/** Event classification types */
export type EventType =
  | "haldi"
  | "mehendi"
  | "sangeet"
  | "wedding"
  | "reception"
  | "custom";

/** A person in the wedding (bride or groom) */
export interface WeddingPerson {
  firstName: string;
  lastName: string;
  parents: string;
  grandparents?: string;
  bio?: string;
  portraitUrl: string;
}

/** Comprehensive wedding event structure */
export interface WeddingEvent {
  id: string;
  name: string;
  type: EventType;
  subtitle?: string;
  date: string; // ISO 8601 or formatted date
  startTime: string;
  endTime?: string;
  time?: string;
  timezone: string;
  venue: string;
  address: string;
  mapUrl?: string;
  description?: string;
  image?: string;
  dressCode?: string;
  instructions?: string;
  order: number;
  isPublished: boolean;
  featured?: boolean;
}

/** Couple love story vignette */
export interface StoryMilestone {
  title: string;
  date: string;
  description: string;
  quote?: string;
}

/** Interactive photo gallery item */
export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "pre-wedding" | "ceremonies" | "moments";
  imageUrl: string;
  alt: string;
  caption?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

/** Additional guest instructions or travel guidance */
export interface GuestNote {
  id: string;
  title: string;
  category: "travel" | "attire" | "weather" | "general";
  content: string;
  highlight?: string;
}

/** Wedding background music settings */
export interface WeddingMusic {
  title: string;
  artist?: string;
  audioUrl: string;
}

/** Top-level wedding data */
export interface WeddingData {
  bride: WeddingPerson;
  groom: WeddingPerson;
  tagline: string;
  invitationMessage: string;
  shloka: {
    sanskrit: string;
    translation: string;
  };
  events: WeddingEvent[];
  story: StoryMilestone[];
  gallery: GalleryItem[];
  guestNotes: GuestNote[];
  music?: WeddingMusic;
  weddingDate: string; // ISO 8601
  heroImage: string;
  venueImage: string;
  label?: string;
  city: string;
}

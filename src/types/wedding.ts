/**
 * Shared Type Definitions
 *
 * Core types for the wedding invitation application.
 * These will be expanded in later phases as MongoDB models are added.
 */

/** A person in the wedding (bride or groom) */
export interface WeddingPerson {
  firstName: string;
  lastName: string;
  parents: string;
  portraitUrl?: string;
}

/** A wedding event (ceremony, reception, etc.) */
export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description?: string;
  mapUrl?: string;
}

/** Top-level wedding data */
export interface WeddingData {
  bride: WeddingPerson;
  groom: WeddingPerson;
  tagline: string;
  events: WeddingEvent[];
  weddingDate: string;
  label?: string;
}

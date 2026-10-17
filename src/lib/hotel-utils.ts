/**
 * Hotel Accommodation Helpers & Business Rules
 *
 * Enforces business rules:
 * - Public visibility only for published hotels (`isPublished === true`)
 * - Clean hotel sorting by display order
 * - Safely handles empty or null hotel lists
 */

export interface HotelRecord {
  id: string;
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
}

/**
 * Filters hotels for public display.
 * Only hotels with isPublished === true are returned, sorted by order ascending.
 */
export function getPublishedHotels(hotels?: HotelRecord[] | null): HotelRecord[] {
  if (!hotels || !Array.isArray(hotels) || hotels.length === 0) {
    return [];
  }

  return hotels
    .filter((hotel) => Boolean(hotel.isPublished))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Determines whether the public hotel section should be visible.
 * Returns true only if there is at least one published hotel.
 */
export function shouldDisplayHotelSection(hotels?: HotelRecord[] | null): boolean {
  return getPublishedHotels(hotels).length > 0;
}

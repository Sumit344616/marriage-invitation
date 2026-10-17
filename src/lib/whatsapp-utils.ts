/**
 * WhatsApp Message Generator and Link Builder
 *
 * Generates verified, URL-encoded WhatsApp messages for:
 * - Public wedding invitation sharing
 * - Hotel accommodation details & guest hospitality assistance
 * - Direction & venue assistance
 */

export interface HotelShareInfo {
  name: string;
  address: string;
  phone?: string;
  bookingCode?: string;
  discountNote?: string;
  checkInDate?: string;
  checkOutDate?: string;
  mapUrl?: string;
  weddingName?: string;
}

export interface InvitationShareInfo {
  brideName: string;
  groomName: string;
  weddingDate: string;
  venueName: string;
  city: string;
  invitationUrl: string;
}

/**
 * Normalizes a phone number for WhatsApp wa.me links.
 * Strips non-digit characters except leading '+'.
 * Returns empty string if invalid.
 */
export function sanitizeWhatsAppPhone(phone?: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
  // Must be between 7 and 15 digits according to ITU E.164
  if (cleaned.length < 7 || cleaned.length > 15) return "";
  return cleaned;
}

/**
 * Builds a WhatsApp share link for wedding hotel accommodation details.
 * Encodes all parameters cleanly using encodeURIComponent.
 */
export function generateHotelWhatsAppShare(
  hotel: HotelShareInfo,
  recipientPhone?: string
): { message: string; shareUrl: string } {
  const weddingTitle = hotel.weddingName || "Ananya & Arjun's Wedding";
  
  const lines: string[] = [
    `🏨 *Accommodation Details — ${weddingTitle}*`,
    ``,
    `Dear Guest, we have arranged special hospitality accommodations for our wedding festivities:`,
    ``,
    `*Hotel:* ${hotel.name.trim()}`,
    `*Address:* ${hotel.address.trim()}`,
  ];

  if (hotel.phone) {
    lines.push(`*Front Desk Contact:* ${hotel.phone.trim()}`);
  }

  if (hotel.bookingCode) {
    lines.push(`*Wedding Booking Code:* ${hotel.bookingCode.trim()}`);
  }

  if (hotel.discountNote) {
    lines.push(`*Offer:* ${hotel.discountNote.trim()}`);
  }

  if (hotel.checkInDate || hotel.checkOutDate) {
    const dates = [
      hotel.checkInDate ? `Check-in: ${hotel.checkInDate}` : null,
      hotel.checkOutDate ? `Check-out: ${hotel.checkOutDate}` : null,
    ].filter(Boolean).join(" | ");
    lines.push(`*Dates:* ${dates}`);
  }

  if (hotel.mapUrl) {
    lines.push(`*Location & Navigation:* ${hotel.mapUrl.trim()}`);
  }

  lines.push(``);
  lines.push(`For any hospitality or transit assistance, please feel free to reach out. Looking forward to celebrating with you! ✨`);

  const message = lines.join("\n");
  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = sanitizeWhatsAppPhone(recipientPhone);

  const shareUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodedMessage}`
    : `https://api.whatsapp.com/send?text=${encodedMessage}`;

  return { message, shareUrl };
}

/**
 * Builds a WhatsApp share link for the wedding invitation card.
 */
export function generateInvitationWhatsAppShare(
  info: InvitationShareInfo,
  recipientPhone?: string
): { message: string; shareUrl: string } {
  const lines: string[] = [
    `💐 *Wedding Invitation* 💐`,
    `॥ श्री गणेशाय नमः ॥`,
    ``,
    `With the divine grace of Almighty, we joyfully invite you to celebrate the wedding union of`,
    `*${info.brideName.trim()} & ${info.groomName.trim()}*`,
    ``,
    `📅 *Date:* ${info.weddingDate.trim()}`,
    `📍 *Venue:* ${info.venueName.trim()}, ${info.city.trim()}`,
    ``,
    `View our wedding itinerary, love story, ceremonies & directions at:`,
    `${info.invitationUrl.trim()}`,
    ``,
    `We request the honour of your presence and blessings! 🙏`,
  ];

  const message = lines.join("\n");
  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = sanitizeWhatsAppPhone(recipientPhone);

  const shareUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodedMessage}`
    : `https://api.whatsapp.com/send?text=${encodedMessage}`;

  return { message, shareUrl };
}

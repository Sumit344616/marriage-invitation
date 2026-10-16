/**
 * Date and Time Utilities for Wedding Invitation
 *
 * Ensures consistent date presentation, timezone-safe formatting,
 * and reliable venue direction link construction without external dependencies.
 */

/**
 * Formats an ISO date string (e.g. "2026-12-11") into a regal wedding date string.
 * Example output: "Friday, 11th December 2026"
 */
export function formatWeddingDate(dateInput: string): string {
  if (!dateInput) return "";

  // Parse year, month, day to avoid UTC midnight timezone shift bugs
  const parts = dateInput.split("T")[0].split("-");
  if (parts.length < 3) return dateInput;

  const year = parseInt(parts[0], 10);
  const monthIndex = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  // Construct local date
  const dateObj = new Date(year, monthIndex, day);
  if (isNaN(dateObj.getTime())) return dateInput;

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekday = weekdays[dateObj.getDay()];
  const monthName = months[dateObj.getMonth()];
  const daySuffix = getDayOrdinal(day);

  return `${weekday}, ${day}${daySuffix} ${monthName} ${year}`;
}

/**
 * Returns ordinal suffix for a day number (1st, 2nd, 3rd, 4th, etc.)
 */
function getDayOrdinal(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/**
 * Formats start and optional end time nicely
 * Example: "3:30 PM onwards" or "7:00 PM – 11:30 PM"
 */
export function formatTimeRange(startTime: string, endTime?: string): string {
  if (!startTime) return "";
  if (!endTime) return startTime;
  return `${startTime} – ${endTime}`;
}

/**
 * Safely constructs a Google Maps navigation URL from mapUrl or venue & address.
 * Encodes query parameters safely.
 */
export function getDirectionsUrl(
  mapUrl?: string,
  venue?: string,
  address?: string
): string | null {
  if (mapUrl && mapUrl.startsWith("http")) {
    return mapUrl;
  }

  const query = [venue, address].filter(Boolean).join(", ");
  if (!query.trim()) {
    return null;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}

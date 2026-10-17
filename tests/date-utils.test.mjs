import test from "node:test";
import assert from "node:assert/strict";
import {
  formatWeddingDate,
  getDayOrdinal,
  formatTimeRange,
  getDirectionsUrl,
} from "../src/lib/date-utils.ts";

test("formatWeddingDate - standard ISO date", () => {
  const formatted = formatWeddingDate("2026-12-11");
  assert.equal(formatted, "Friday, 11th December 2026");
});

test("formatWeddingDate - ISO date with timestamp and timezone", () => {
  const formatted = formatWeddingDate("2026-12-11T19:30:00+05:30");
  assert.equal(formatted, "Friday, 11th December 2026");
});

test("formatWeddingDate - edge cases and fallbacks", () => {
  assert.equal(formatWeddingDate(""), "");
  assert.equal(formatWeddingDate("invalid-date"), "invalid-date");
  assert.equal(formatWeddingDate("2026-13-45"), "2026-13-45");
});

test("getDayOrdinal - correct English suffixes", () => {
  assert.equal(getDayOrdinal(1), "st");
  assert.equal(getDayOrdinal(2), "nd");
  assert.equal(getDayOrdinal(3), "rd");
  assert.equal(getDayOrdinal(4), "th");
  assert.equal(getDayOrdinal(11), "th");
  assert.equal(getDayOrdinal(12), "th");
  assert.equal(getDayOrdinal(13), "th");
  assert.equal(getDayOrdinal(21), "st");
  assert.equal(getDayOrdinal(22), "nd");
  assert.equal(getDayOrdinal(23), "rd");
  assert.equal(getDayOrdinal(31), "st");
});

test("formatTimeRange - start and end times", () => {
  assert.equal(formatTimeRange("6:00 PM"), "6:00 PM");
  assert.equal(formatTimeRange("6:00 PM", "11:30 PM"), "6:00 PM – 11:30 PM");
  assert.equal(formatTimeRange(""), "");
});

test("getDirectionsUrl - preserves valid Google Maps URL", () => {
  const original = "https://www.google.com/maps/search/?api=1&query=Jai+Mahal+Palace";
  assert.equal(getDirectionsUrl(original), original);
});

test("getDirectionsUrl - generates fallback query from venue & address", () => {
  const url = getDirectionsUrl(undefined, "Jai Mahal Palace", "Jacob Road, Jaipur");
  assert.ok(url);
  assert.ok(url.startsWith("https://www.google.com/maps/search/?api=1&query="));
  assert.ok(url.includes(encodeURIComponent("Jai Mahal Palace, Jacob Road, Jaipur")));
});

test("getDirectionsUrl - rejects malicious non-http protocols", () => {
  const dangerousUrl = "javascript:alert('xss')";
  const url = getDirectionsUrl(dangerousUrl, "Jai Mahal Palace", "Jaipur");
  // Should ignore javascript: and construct a safe google maps query
  assert.ok(!url.startsWith("javascript:"));
  assert.ok(url.startsWith("https://www.google.com/maps/search/?api=1&query="));
});

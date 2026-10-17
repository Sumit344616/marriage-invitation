import test from "node:test";
import assert from "node:assert/strict";
import {
  rsvpSubmissionSchema,
  hotelSchema,
  adminLoginSchema,
} from "../src/lib/validation-schemas.ts";

test("rsvpSubmissionSchema - valid submission passes", () => {
  const validData = {
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    attending: true,
    guestCount: 2,
    eventsAttending: ["wedding", "reception"],
    dietaryPreferences: "Vegetarian",
    message: "Heartiest congratulations!",
  };

  const parsed = rsvpSubmissionSchema.safeParse(validData);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.fullName, "Priya Sharma");
    assert.equal(parsed.data.guestCount, 2);
  }
});

test("rsvpSubmissionSchema - rejects invalid email and short names", () => {
  const invalidEmail = {
    fullName: "P", // too short
    email: "not-an-email",
    phone: "9876543210",
    attending: true,
    guestCount: 1,
    eventsAttending: ["wedding"],
  };

  const parsed = rsvpSubmissionSchema.safeParse(invalidEmail);
  assert.equal(parsed.success, false);
  if (!parsed.success) {
    const errorFields = parsed.error.issues.map((i) => i.path[0]);
    assert.ok(errorFields.includes("fullName"));
    assert.ok(errorFields.includes("email"));
  }
});

test("rsvpSubmissionSchema - rejects excessive guest count or non-digits phone", () => {
  const invalidGuests = {
    fullName: "Vikram Malhotra",
    email: "vikram@example.com",
    phone: "call-me-now", // invalid phone
    attending: true,
    guestCount: 25, // exceeds limit of 10
    eventsAttending: ["sangeet"],
  };

  const parsed = rsvpSubmissionSchema.safeParse(invalidGuests);
  assert.equal(parsed.success, false);
  if (!parsed.success) {
    const errorFields = parsed.error.issues.map((i) => i.path[0]);
    assert.ok(errorFields.includes("phone"));
    assert.ok(errorFields.includes("guestCount"));
  }
});

test("hotelSchema - valid hotel passes", () => {
  const validHotel = {
    name: "The Oberoi Rajvilas",
    address: "Babaji Ka Thikana, Goner Road, Jaipur",
    city: "Jaipur",
    phone: "+91-141-2680101",
    websiteUrl: "https://www.oberoihotels.com",
    mapUrl: "https://maps.google.com/?q=Oberoi+Rajvilas",
    bookingCode: "VIVAH2026",
    isPublished: true,
    order: 1,
  };

  const parsed = hotelSchema.safeParse(validHotel);
  assert.equal(parsed.success, true);
});

test("hotelSchema - rejects invalid URLs", () => {
  const badUrlHotel = {
    name: "Jaipur Heritage Stay",
    address: "Station Road, Jaipur",
    city: "Jaipur",
    websiteUrl: "not-a-valid-url",
  };

  const parsed = hotelSchema.safeParse(badUrlHotel);
  assert.equal(parsed.success, false);
});

test("adminLoginSchema - validates credentials format", () => {
  assert.equal(
    adminLoginSchema.safeParse({ email: "admin@wedding.com", password: "StrongPassword123" }).success,
    true
  );

  // Fails on short password
  assert.equal(
    adminLoginSchema.safeParse({ email: "admin@wedding.com", password: "short" }).success,
    false
  );

  // Fails on invalid email
  assert.equal(
    adminLoginSchema.safeParse({ email: "not-an-email", password: "StrongPassword123" }).success,
    false
  );
});

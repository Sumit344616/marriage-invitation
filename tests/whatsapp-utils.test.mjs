import test from "node:test";
import assert from "node:assert/strict";
import {
  sanitizeWhatsAppPhone,
  generateHotelWhatsAppShare,
  generateInvitationWhatsAppShare,
} from "../src/lib/whatsapp-utils.ts";

test("sanitizeWhatsAppPhone - formats international digits", () => {
  assert.equal(sanitizeWhatsAppPhone("+91 98765-43210"), "919876543210");
  assert.equal(sanitizeWhatsAppPhone("9876543210"), "9876543210");
  assert.equal(sanitizeWhatsAppPhone(""), "");
  assert.equal(sanitizeWhatsAppPhone("123"), ""); // Too short
  assert.equal(sanitizeWhatsAppPhone("invalid"), "");
});

test("generateHotelWhatsAppShare - builds complete hotel accommodation share info", () => {
  const result = generateHotelWhatsAppShare(
    {
      name: "The Grand Palace Hotel",
      address: "123 Heritage Lane, Jaipur",
      phone: "+91-141-2345678",
      bookingCode: "ROYALVIVAH2026",
      discountNote: "20% off wedding guest special tariff",
      checkInDate: "Dec 9, 2026",
      checkOutDate: "Dec 13, 2026",
      mapUrl: "https://maps.google.com/?q=The+Grand+Palace",
      weddingName: "Ananya & Arjun's Royal Wedding",
    },
    "+91 9876543210"
  );

  assert.ok(result.message.includes("The Grand Palace Hotel"));
  assert.ok(result.message.includes("ROYALVIVAH2026"));
  assert.ok(result.message.includes("20% off wedding guest special tariff"));
  assert.ok(result.shareUrl.startsWith("https://wa.me/919876543210?text="));
  assert.ok(result.shareUrl.includes(encodeURIComponent("ROYALVIVAH2026")));
});

test("generateHotelWhatsAppShare - works without recipient phone", () => {
  const result = generateHotelWhatsAppShare({
    name: "ITC Rajputana",
    address: "Palace Road, Jaipur",
  });

  assert.ok(result.shareUrl.startsWith("https://api.whatsapp.com/send?text="));
  assert.ok(result.message.includes("ITC Rajputana"));
});

test("generateInvitationWhatsAppShare - builds wedding invitation share link", () => {
  const result = generateInvitationWhatsAppShare({
    brideName: "Ananya",
    groomName: "Arjun",
    weddingDate: "Friday, 11th December 2026",
    venueName: "Jai Mahal Palace",
    city: "Jaipur",
    invitationUrl: "https://ananya-arjun-wedding.com",
  });

  assert.ok(result.message.includes("Ananya & Arjun"));
  assert.ok(result.message.includes("Jai Mahal Palace, Jaipur"));
  assert.ok(result.shareUrl.includes(encodeURIComponent("https://ananya-arjun-wedding.com")));
});

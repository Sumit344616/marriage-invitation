import test from "node:test";
import assert from "node:assert/strict";

function escapeCsvField(field) {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}

test("escapeCsvField - escapes quotes and commas cleanly", () => {
  assert.equal(escapeCsvField('Sharma & "Mehta"'), '"Sharma & ""Mehta"""');
  assert.equal(escapeCsvField("Jaipur, Rajasthan"), '"Jaipur, Rajasthan"');
  assert.equal(escapeCsvField(null), '""');
  assert.equal(escapeCsvField(42), '"42"');
});

test("csvExport - formats complete RSVP record row", () => {
  const record = {
    fullName: 'Dr. Rajesh Sharma, MD',
    email: 'rajesh@example.com',
    phone: '+91 98765 43210',
    attending: true,
    guestCount: 2,
    eventsAttending: ['wedding', 'reception'],
    dietaryPreferences: 'Jain Vegetarian',
    message: 'Wishing "infinite joy"!',
    createdAt: '2026-10-17T12:00:00.000Z',
  };

  const row = [
    escapeCsvField(record.fullName),
    escapeCsvField(record.email),
    escapeCsvField(record.phone),
    escapeCsvField(record.attending ? 'Confirmed' : 'Declined'),
    escapeCsvField(record.guestCount),
    escapeCsvField(record.eventsAttending.join('; ')),
    escapeCsvField(record.dietaryPreferences),
    escapeCsvField(record.message),
    escapeCsvField(record.createdAt),
  ].join(',');

  assert.ok(row.includes('"Dr. Rajesh Sharma, MD"'));
  assert.ok(row.includes('"Confirmed"'));
  assert.ok(row.includes('"wedding; reception"'));
  assert.ok(row.includes('"Wishing ""infinite joy""!"'));
});

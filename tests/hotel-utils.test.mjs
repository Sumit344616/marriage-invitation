import test from "node:test";
import assert from "node:assert/strict";
import {
  getPublishedHotels,
  shouldDisplayHotelSection,
} from "../src/lib/hotel-utils.ts";

test("getPublishedHotels - filters out unpublished hotels", () => {
  const sampleHotels = [
    {
      id: "h1",
      name: "Published Hotel A",
      address: "Address 1",
      city: "Jaipur",
      isPublished: true,
      order: 2,
    },
    {
      id: "h2",
      name: "Unpublished Hotel B",
      address: "Address 2",
      city: "Jaipur",
      isPublished: false,
      order: 1,
    },
    {
      id: "h3",
      name: "Published Hotel C",
      address: "Address 3",
      city: "Jaipur",
      isPublished: true,
      order: 1,
    },
  ];

  const published = getPublishedHotels(sampleHotels);
  assert.equal(published.length, 2);
  assert.equal(published[0].id, "h3"); // Order 1
  assert.equal(published[1].id, "h1"); // Order 2
});

test("shouldDisplayHotelSection - returns false when no hotels are published", () => {
  assert.equal(shouldDisplayHotelSection([]), false);
  assert.equal(shouldDisplayHotelSection(null), false);
  assert.equal(shouldDisplayHotelSection(undefined), false);

  const allUnpublished = [
    {
      id: "h1",
      name: "Draft Hotel",
      address: "Draft Address",
      city: "Jaipur",
      isPublished: false,
      order: 0,
    },
  ];
  assert.equal(shouldDisplayHotelSection(allUnpublished), false);
});

test("shouldDisplayHotelSection - returns true when at least one hotel is published", () => {
  const hotels = [
    {
      id: "h1",
      name: "Published Hotel",
      address: "Address",
      city: "Jaipur",
      isPublished: true,
      order: 1,
    },
  ];
  assert.equal(shouldDisplayHotelSection(hotels), true);
});

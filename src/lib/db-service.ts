import { connectToDatabase } from "./mongodb";
import { WeddingModel } from "@/models/Wedding";
import { HotelModel } from "@/models/Hotel";
import { RSVPModel } from "@/models/RSVP";
import { demoWedding } from "@/config/demo-data";
import type { WeddingData } from "@/types/wedding";

export const defaultDemoHotels = [
  {
    name: "Jai Mahal Palace",
    address: "Jacob Road, Civil Lines, Jaipur, Rajasthan 302006",
    city: "Jaipur, Rajasthan",
    phone: "+91 141 660 1111",
    websiteUrl: "https://www.tajhotels.com/en-in/taj/jai-mahal-palace-jaipur/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Jai+Mahal+Palace+Jaipur",
    bookingCode: "ANANYAARJUN2026",
    discountNote: "Special wedding guest room tariff • Complimentary breakfast & airport transit",
    distanceToVenue: "Official Wedding Venue Ground",
    priceRange: "Regal Heritage Luxury",
    isPublished: true,
    order: 1,
  },
  {
    name: "ITC Rajputana, a Luxury Collection Hotel",
    address: "Palace Road, Gopalbari, Jaipur, Rajasthan 302006",
    city: "Jaipur, Rajasthan",
    phone: "+91 141 510 0100",
    websiteUrl: "https://www.marriott.com/en-us/hotels/jaiak-itc-rajputana-a-luxury-collection-hotel-jaipur/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=ITC+Rajputana+Jaipur",
    bookingCode: "WEDDING-AA26",
    discountNote: "Preferred wedding guest block • Shuttle service to ceremony grounds",
    distanceToVenue: "3.2 km (8 mins drive to Jai Mahal Palace)",
    priceRange: "5-Star Luxury",
    isPublished: true,
    order: 2,
  },
  {
    name: "Hilton Jaipur",
    address: "42 Geejgarh House, Hawa Sadak, Jaipur, Rajasthan 302006",
    city: "Jaipur, Rajasthan",
    phone: "+91 141 417 0000",
    websiteUrl: "https://www.hilton.com/en/hotels/jaisjhi-hilton-jaipur/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hilton+Jaipur",
    bookingCode: "AAWED2026",
    discountNote: "Special festive package for out-of-town guests",
    distanceToVenue: "2.5 km (6 mins drive)",
    priceRange: "Premium Business & Leisure",
    isPublished: true,
    order: 3,
  },
];

/**
 * Fetches wedding data from MongoDB Atlas.
 * Automatically seeds initial wedding details if collection is empty.
 * Returns demoWedding as an unbreakable fallback if database is offline.
 */
export async function getLiveWeddingData(): Promise<WeddingData> {
  try {
    await connectToDatabase();
    let weddingDoc = await WeddingModel.findOne().lean<WeddingData>().exec();

    if (!weddingDoc) {
      // Seed initial wedding data
      const created = await WeddingModel.create(demoWedding);
      weddingDoc = created.toObject();
    }

    // Auto-seed hotels if none exist
    const hotelCount = await HotelModel.countDocuments();
    if (hotelCount === 0) {
      await HotelModel.insertMany(defaultDemoHotels);
    }

    return JSON.parse(JSON.stringify(weddingDoc));
  } catch (err) {
    console.error("Database connection fallback to static demo data:", err);
    return demoWedding;
  }
}

/**
 * Fetches published hotels for the public invitation page.
 */
export async function getPublishedHotelsList() {
  try {
    await connectToDatabase();
    const hotels = await HotelModel.find({ isPublished: true })
      .sort({ order: 1, createdAt: 1 })
      .lean()
      .exec();

    return JSON.parse(JSON.stringify(hotels));
  } catch (err) {
    console.error("Error fetching published hotels from DB, falling back:", err);
    return defaultDemoHotels.filter((h) => h.isPublished);
  }
}

/**
 * Fetches all hotels for administrative management.
 */
export async function getAllHotelsForAdmin() {
  await connectToDatabase();
  const hotels = await HotelModel.find().sort({ order: 1, createdAt: -1 }).lean().exec();
  return JSON.parse(JSON.stringify(hotels));
}

/**
 * Fetches all RSVPs for administrative dashboard.
 */
export async function getAllRSVPsForAdmin() {
  await connectToDatabase();
  const rsvps = await RSVPModel.find().sort({ createdAt: -1 }).lean().exec();
  return JSON.parse(JSON.stringify(rsvps));
}

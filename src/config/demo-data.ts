/**
 * Demo Wedding Data
 *
 * Clearly labeled demonstration content used for the Phase 1 visual prototype.
 * This will be replaced by database-driven content in Phase 4+.
 */

export const demoWedding = {
  /** Couple names */
  bride: {
    firstName: "Ananya",
    lastName: "Sharma",
    parents: "Daughter of Mr. Rajesh & Mrs. Sunita Sharma",
  },
  groom: {
    firstName: "Arjun",
    lastName: "Mehta",
    parents: "Son of Mr. Vikram & Mrs. Priya Mehta",
  },

  /** Tagline displayed on the invitation */
  tagline: "Together with their families, request the honour of your presence",

  /** Wedding events */
  events: [
    {
      id: "mehendi",
      name: "Mehendi Ceremony",
      date: "Saturday, 15th November 2025",
      time: "4:00 PM onwards",
      venue: "The Royal Garden, Sharma Residence",
      address: "42, Civil Lines, Jaipur, Rajasthan 302006",
      description:
        "An intimate afternoon of artistry and celebration as we adorn the bride with beautiful henna patterns, accompanied by music and traditional festivities.",
    },
    {
      id: "sangeet",
      name: "Sangeet & Cocktail",
      date: "Sunday, 16th November 2025",
      time: "7:00 PM onwards",
      venue: "The Grand Ballroom, ITC Rajputana",
      address: "Palace Road, Jaipur, Rajasthan 302006",
      description:
        "An enchanting evening of music, dance performances, and celebration as both families come together for a night of joy and togetherness.",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      date: "Monday, 17th November 2025",
      time: "Auspicious Muhurat – 10:30 PM",
      venue: "Jai Mahal Palace",
      address: "Jacob Road, Civil Lines, Jaipur, Rajasthan 302006",
      description:
        "The sacred union under the stars, with traditional Vedic rituals, pheras around the holy fire, and blessings from our loved ones.",
    },
    {
      id: "reception",
      name: "Wedding Reception",
      date: "Tuesday, 18th November 2025",
      time: "7:30 PM onwards",
      venue: "The Rambagh Palace",
      address: "Bhawani Singh Road, Jaipur, Rajasthan 302006",
      description:
        "An elegant evening of celebration, fine dining, and warm wishes as we begin our journey together as one family.",
    },
  ],

  /** Wedding date (for countdown) */
  weddingDate: "2025-11-17T22:30:00+05:30",

  /** Label shown on the invitation */
  label: "DEMO WEDDING INVITATION",
} as const;

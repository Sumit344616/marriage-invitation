import type { WeddingData } from "@/types/wedding";

/**
 * Demo Wedding Data — Phase 3 Complete Wedding Experience
 *
 * Centralized, typed demo data for Ananya & Arjun's wedding celebrations.
 * All media references point to local assets in /public/images/.
 * Ready for future database integration without UI modifications.
 */
export const demoWedding: WeddingData = {
  bride: {
    firstName: "Ananya",
    lastName: "Sharma",
    parents: "Daughter of Mr. Rajesh & Mrs. Sunita Sharma",
    grandparents: "Granddaughter of Late Shri Brijmohan & Smt. Kamla Sharma",
    bio: "An architect with a passion for heritage conservation and classical Indian arts. Known for her radiant grace, infectious laughter, and boundless warmth.",
    portraitUrl: "/images/bride-portrait.jpg",
  },
  groom: {
    firstName: "Arjun",
    lastName: "Mehta",
    parents: "Son of Mr. Vikram & Mrs. Priya Mehta",
    grandparents: "Grandson of Late Shri Devendra & Smt. Sarla Mehta",
    bio: "An entrepreneur and avid traveler driven by curiosity and innovation. A quiet soul with a golden heart, forever captivated by Ananya's spirited smile.",
    portraitUrl: "/images/groom-portrait.jpg",
  },

  tagline: "Together with their families, request the honour of your presence",
  city: "Jaipur, Rajasthan",

  invitationMessage:
    "With the divine grace of the Almighty and the heartfelt blessings of our beloved elders, we invite you to be part of our celebrations as two hearts, two souls, and two families unite in an eternal bond of sacred companionship.",

  shloka: {
    sanskrit:
      "मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः ।\nमंगलम् पुण्डरीकाक्षः मङ्गलाय तनो हरिः ॥",
    translation:
      "May Lord Vishnu, the all-pervading protector, bestow eternal auspiciousness, harmony, and grace upon this sacred union.",
  },

  heroImage: "/images/hero-couple.jpg",
  venueImage: "/images/venue-palace.jpg",

  story: [
    {
      title: "First Encounter",
      date: "Spring 2023 • Udaipur",
      description:
        "A chance conversation by the tranquil waters of Lake Pichola sparked an effortless connection. What began as an afternoon discussing Rajasthani architecture soon turned into hours of shared dreams and laughter.",
      quote: "Some souls simply recognize each other across any distance.",
    },
    {
      title: "The Proposal",
      date: "Winter 2024 • Jaipur",
      description:
        "Surrounded by thousands of flickering oil lamps and the starlit sky at Nahargarh Fort, Arjun asked the question that made their forever official. With tears of joy and full hearts, Ananya said yes.",
      quote: "In you, I found my sanctuary and my grandest adventure.",
    },
    {
      title: "The Sacred Promise",
      date: "December 2026 • The Vivah",
      description:
        "Now, under the royal arches of Jai Mahal Palace, we take our seven sacred steps around the sacred fire, embarking on a lifelong journey of mutual devotion, honor, and enduring love.",
      quote: "With every breath, with every step, forever together.",
    },
  ],

  events: [
    {
      id: "haldi",
      name: "Haldi & Phoolon Ki Holi",
      type: "haldi",
      subtitle: "Turmeric Blessings & Marigold Petal Showers",
      date: "2026-12-09",
      startTime: "10:30 AM",
      endTime: "1:30 PM",
      timezone: "Asia/Kolkata",
      venue: "The Mango Orchards, Sharma Villa",
      address: "42, Civil Lines, Jaipur, Rajasthan 302006",
      description:
        "A sunlit morning filled with auspicious turmeric rituals, soulful folk singing, playful marigold petal showers, and refreshing Rajasthani delicacies.",
      dressCode: "Haldi Yellows, Ochre & Sunlit Pastels",
      instructions: "Outdoor courtyard seating; herbal organic turmeric and petals provided.",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Civil+Lines+Jaipur+Rajasthan",
      order: 1,
      isPublished: true,
      featured: false,
    },
    {
      id: "mehendi",
      name: "Mehendi Ceremony",
      type: "mehendi",
      subtitle: "Henna Artistry, Bangles & Sitar Melodies",
      date: "2026-12-09",
      startTime: "4:00 PM",
      endTime: "8:00 PM",
      timezone: "Asia/Kolkata",
      venue: "The Royal Gardens, Sharma Villa",
      address: "42, Civil Lines, Jaipur, Rajasthan 302006",
      description:
        "An enchanting afternoon where traditional henna artists adorn hands with intricate motifs, accompanied by live sitar recitals and traditional Rajasthani street chaat.",
      dressCode: "Mehendi Green, Olive & Floral Kurtas / Lehengas",
      instructions: "Bespoke henna artists available for all guests throughout the afternoon.",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Civil+Lines+Jaipur+Rajasthan",
      order: 2,
      isPublished: true,
      featured: false,
    },
    {
      id: "sangeet",
      name: "Sangeet & Cocktail Evening",
      type: "sangeet",
      subtitle: "A Regal Night of Music, Dance & Glamour",
      date: "2026-12-10",
      startTime: "7:00 PM",
      endTime: "12:00 AM",
      timezone: "Asia/Kolkata",
      venue: "The Grand Ballroom, ITC Rajputana",
      address: "Palace Road, Gopalbari, Jaipur, Rajasthan 302006",
      description:
        "An exhilarating evening of choreographed family dance face-offs, live Bollywood symphony performances, artisan cocktails, and non-stop celebration under chandeliers.",
      dressCode: "Indo-Western Glitz, Shimmering Lehengas & Tuxedos",
      instructions: "Valet parking available at the main hotel porch.",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=ITC+Rajputana+Jaipur",
      order: 3,
      isPublished: true,
      featured: false,
    },
    {
      id: "wedding",
      name: "Auspicious Wedding Ceremony",
      type: "wedding",
      subtitle: "The Sacred Vedic Vivah & Pheras",
      date: "2026-12-11",
      startTime: "6:00 PM",
      endTime: "11:30 PM",
      timezone: "Asia/Kolkata",
      venue: "Jai Mahal Palace",
      address: "Jacob Road, Civil Lines, Jaipur, Rajasthan 302006",
      description:
        "The sacred union of two souls under the royal mandap by the palace fountain. Witness the grand baraat procession, floral varmala under fireworks, and seven sacred pheras around the holy fire.",
      dressCode: "Traditional Royal Ethnic • Regal Pastels, Ivory & Gold",
      instructions: "Baraat assembly at 6:00 PM; Varmala at 7:30 PM; Vedic Pheras at 10:15 PM.",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Jai+Mahal+Palace+Jaipur",
      order: 4,
      isPublished: true,
      featured: true,
    },
    {
      id: "reception",
      name: "Grand Reception",
      type: "reception",
      subtitle: "A Regal Dinner & Felicitation",
      date: "2026-12-12",
      startTime: "7:30 PM",
      endTime: "11:30 PM",
      timezone: "Asia/Kolkata",
      venue: "The Rambagh Palace Grounds",
      address: "Bhawani Singh Road, Jaipur, Rajasthan 302006",
      description:
        "An evening of royal Rajputana hospitality, bespoke culinary journeys, live instrumental symphony, and heartfelt blessings as the newlyweds greet their cherished family and friends.",
      dressCode: "Formal Royal Ethnic or Black Tie",
      instructions: "Guests are warmly invited to join us for photo felicitation and dinner.",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Rambagh+Palace+Jaipur",
      order: 5,
      isPublished: true,
      featured: false,
    },
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Royal Courtyard",
      category: "pre-wedding",
      imageUrl: "/images/hero-couple.jpg",
      alt: "Ananya and Arjun in royal attire in the palace courtyard",
      caption: "Golden hour romance amidst the carved sandstone arches of Jaipur.",
      aspectRatio: "landscape",
    },
    {
      id: "gal-2",
      title: "The Radiant Bride",
      category: "pre-wedding",
      imageUrl: "/images/bride-portrait.jpg",
      alt: "Ananya Sharma bridal portrait with kundan jewelry",
      caption: "Ananya adorned in handcrafted heirloom kundan and royal blush lehenga.",
      aspectRatio: "portrait",
    },
    {
      id: "gal-3",
      title: "The Royal Groom",
      category: "pre-wedding",
      imageUrl: "/images/groom-portrait.jpg",
      alt: "Arjun Mehta in tailored ivory sherwani and safa",
      caption: "Arjun in a bespoke ivory silk sherwani and royal turban safa.",
      aspectRatio: "portrait",
    },
    {
      id: "gal-4",
      title: "Phoolon Ki Holi",
      category: "ceremonies",
      imageUrl: "/images/gallery-haldi.jpg",
      alt: "Joyful Haldi ceremony showered with yellow marigold petals",
      caption: "Surrounded by laughter, love, and a radiant shower of fresh marigolds.",
      aspectRatio: "landscape",
    },
    {
      id: "gal-5",
      title: "Bridal Henna & Jewels",
      category: "ceremonies",
      imageUrl: "/images/gallery-mehendi.jpg",
      alt: "Intricate bridal henna design and royal glass bangles",
      caption: "Intricate Rajasthani mehendi artistry carrying stories of devotion.",
      aspectRatio: "landscape",
    },
    {
      id: "gal-6",
      title: "Corridors of Eternity",
      category: "moments",
      imageUrl: "/images/gallery-palace-walk.jpg",
      alt: "Couple walking hand in hand through the palace corridor",
      caption: "Walking hand in hand through centuries of timeless architectural grace.",
      aspectRatio: "landscape",
    },
    {
      id: "gal-7",
      title: "Sangeet Celebration",
      category: "ceremonies",
      imageUrl: "/images/gallery-sangeet.jpg",
      alt: "Couple dancing on stage during the Sangeet musical evening",
      caption: "Dancing under sparkling lights as both families celebrate together.",
      aspectRatio: "landscape",
    },
    {
      id: "gal-8",
      title: "The Palace by Dusk",
      category: "moments",
      imageUrl: "/images/venue-palace.jpg",
      alt: "Jai Mahal Palace illuminated with candle lanterns and fairy lights",
      caption: "Twilight sets over Jai Mahal Palace as our sacred vows are exchanged.",
      aspectRatio: "landscape",
    },
  ],

  guestNotes: [
    {
      id: "note-attire",
      title: "Traditional Attire & Colors",
      category: "attire",
      highlight: "Pastel Royal Ethnic",
      content:
        "We encourage guests to embrace traditional Indian festive attire. Suggested palettes include warm pastels, blush pinks, mint greens, and royal golds. Comfortable footwear is recommended for lawn celebrations.",
    },
    {
      id: "note-travel",
      title: "Airport & Transit Proximity",
      category: "travel",
      highlight: "Jaipur International Airport (JAI) — 12 km",
      content:
        "Jai Mahal Palace and ITC Rajputana are conveniently located within 20 minutes from Jaipur Airport and 10 minutes from Jaipur Junction Railway Station. Prepaid taxis and rideshares are readily available.",
    },
    {
      id: "note-weather",
      title: "Jaipur December Weather",
      category: "weather",
      highlight: "Pleasant Days (24°C) • Crisp Evenings (11°C)",
      content:
        "December in Jaipur offers beautiful golden sunshine during the day and crisp, cool evenings. Warm pashmina shawls and heaters will be available throughout our outdoor evening functions.",
    },
    {
      id: "note-hospitality",
      title: "Hospitality & Valet Helpdesk",
      category: "general",
      highlight: "24/7 Dedicated Wedding Concierge",
      content:
        "Complimentary valet parking will be available at all venue entrances. For out-of-town guests needing assistance with logistics, our wedding hospitality desk is at your service throughout the festivities.",
    },
  ],

  music: {
    title: "Kudmayi",
    artist: "Shahid Mallya • Rocky Aur Rani Kii Prem Kahaani",
    audioUrl: "/song/Kudmayi.mp3",
  },

  weddingDate: "2026-12-11T19:30:00+05:30",
  label: "DEMO WEDDING INVITATION",
};

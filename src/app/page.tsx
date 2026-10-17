import { HeroSection } from "./_sections/hero";
import { FamilySection } from "./_sections/family-section";
import { CoupleStory } from "./_sections/couple-story";
import { WeddingSpotlight } from "./_sections/wedding-spotlight";
import { CountdownSection } from "./_sections/countdown-section";
import { HotelSection } from "./_sections/hotel-section";
import { RsvpSection } from "./_sections/rsvp-section";
import { WeddingNav } from "@/components/layout/wedding-nav";
import { WeddingFooter } from "@/components/layout/wedding-footer";
import {
  InvitationEnvelope,
  MusicController,
  EventsTimeline,
  PhotoGallery,
  GuestNotes,
} from "@/components/wedding";
import { getLiveWeddingData, getPublishedHotelsList } from "@/lib/db-service";

/**
 * Public Wedding Invitation — Production Experience
 *
 * Full multi-event schedule, interactive photo gallery, guest utilities,
 * partner hotel accommodations, and live RSVP pipeline:
 * 1. Physical wax-seal invitation card opening with accessible skip
 * 2. Cinematic royal hero with photography and Sanskrit invocation
 * 3. Sacred Vedic family blessings and parental invitations
 * 4. High-fashion bride & groom portraits with 3-chapter love story
 * 5. Primary ceremony spotlight at Jai Mahal Palace with Google Maps & Calendar
 * 6. Editorial multi-event timeline (Haldi, Mehendi, Sangeet, Wedding, Reception)
 * 7. Interactive photo gallery with categories and accessible modal lightbox
 * 8. Partner hotel recommendations with WhatsApp booking code share
 * 9. Live interactive RSVP form with duplicate detection & anti-spam rate limiting
 * 10. Guest hospitality guidance (attire, airport/railway transit, December weather)
 * 11. Live ticking countdown on royal walnut backdrop
 * 12. Ambient tanpura synthesizer audio controller (strictly no autoplay)
 */
export default async function WeddingPage() {
  const wedding = await getLiveWeddingData();
  const hotels = await getPublishedHotelsList();

  const mainCeremony =
    wedding.events.find((e) => e.id === "wedding") ??
    wedding.events.find((e) => e.featured) ??
    wedding.events[0];

  return (
    <>
      {/* Luxury Wax-Seal Card Opening Experience */}
      <InvitationEnvelope wedding={wedding} />

      {/* Floating Navigation Header */}
      <WeddingNav />

      {/* Main Invitation Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Cinematic Hero */}
        <HeroSection wedding={wedding} />

        {/* Ceremonial Family Invitation & Vedic Shloka */}
        <FamilySection wedding={wedding} />

        {/* Editorial Couple Portraits & Love Story */}
        <CoupleStory wedding={wedding} />

        {/* Flagship Wedding Ceremony Spotlight */}
        <WeddingSpotlight
          event={mainCeremony}
          venueImage={wedding.venueImage}
        />

        {/* Editorial Multi-Event Timeline */}
        <EventsTimeline events={wedding.events} />

        {/* Interactive Photo Gallery with Lightbox */}
        <PhotoGallery items={wedding.gallery} />

        {/* Partner Hotels & Accommodations */}
        <HotelSection hotels={hotels} />

        {/* Live Guest Attendance RSVP Form */}
        <RsvpSection events={wedding.events} />

        {/* Guest Hospitality & Travel Guidance */}
        <GuestNotes notes={wedding.guestNotes} />

        {/* Save the Date Live Countdown */}
        <CountdownSection targetDate={wedding.weddingDate} />
      </main>

      {/* Wedding Footer */}
      <WeddingFooter />

      {/* Ambient Acoustic Indian Music Controller (User-initiated only) */}
      <MusicController />
    </>
  );
}

import { HeroSection } from "./_sections/hero";
import { FamilySection } from "./_sections/family-section";
import { CoupleStory } from "./_sections/couple-story";
import { WeddingSpotlight } from "./_sections/wedding-spotlight";
import { CountdownSection } from "./_sections/countdown-section";
import { WeddingNav } from "@/components/layout/wedding-nav";
import { WeddingFooter } from "@/components/layout/wedding-footer";
import {
  InvitationEnvelope,
  MusicController,
  EventsTimeline,
  PhotoGallery,
  GuestNotes,
} from "@/components/wedding";
import { demoWedding } from "@/config/demo-data";

/**
 * Public Wedding Invitation — Phase 3 Experience
 *
 * Full multi-event schedule, interactive photo gallery, and guest utilities:
 * 1. Physical wax-seal invitation card opening with accessible skip
 * 2. Cinematic royal hero with photography and Sanskrit invocation
 * 3. Sacred Vedic family blessings and parental invitations
 * 4. High-fashion bride & groom portraits with 3-chapter love story
 * 5. Primary ceremony spotlight at Jai Mahal Palace with Google Maps & Calendar
 * 6. Editorial multi-event timeline (Haldi, Mehendi, Sangeet, Wedding, Reception)
 * 7. Interactive photo gallery with categories and accessible modal lightbox
 * 8. Guest hospitality guidance (attire, airport/railway transit, December weather)
 * 9. Live ticking countdown on royal walnut backdrop
 * 10. Ambient tanpura synthesizer audio controller (strictly no autoplay)
 */
export default function WeddingPage() {
  const mainCeremony =
    demoWedding.events.find((e) => e.id === "wedding") ?? demoWedding.events[2];

  return (
    <>
      {/* Luxury Wax-Seal Card Opening Experience */}
      <InvitationEnvelope wedding={demoWedding} />

      {/* Floating Navigation Header */}
      <WeddingNav />

      {/* Main Invitation Content */}
      <main className="flex-1">
        {/* Cinematic Hero */}
        <HeroSection wedding={demoWedding} />

        {/* Ceremonial Family Invitation & Vedic Shloka */}
        <FamilySection wedding={demoWedding} />

        {/* Editorial Couple Portraits & Love Story */}
        <CoupleStory wedding={demoWedding} />

        {/* Flagship Wedding Ceremony Spotlight */}
        <WeddingSpotlight
          event={mainCeremony}
          venueImage={demoWedding.venueImage}
        />

        {/* Editorial Multi-Event Timeline */}
        <EventsTimeline events={demoWedding.events} />

        {/* Interactive Photo Gallery with Lightbox */}
        <PhotoGallery items={demoWedding.gallery} />

        {/* Guest Hospitality & Travel Guidance */}
        <GuestNotes notes={demoWedding.guestNotes} />

        {/* Save the Date Live Countdown */}
        <CountdownSection targetDate={demoWedding.weddingDate} />
      </main>

      {/* Wedding Footer */}
      <WeddingFooter />

      {/* Ambient Acoustic Indian Music Controller (User-initiated only) */}
      <MusicController />
    </>
  );
}

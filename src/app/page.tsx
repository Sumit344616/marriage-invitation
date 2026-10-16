import { HeroSection } from "./_sections/hero";
import { CoupleSection } from "./_sections/couple";
import { EventsSection } from "./_sections/events";
import { CountdownSection } from "./_sections/countdown-section";
import { WeddingNavWrapper } from "./_sections/nav-wrapper";
import { WeddingFooter } from "@/components/layout/wedding-footer";
import { demoWedding } from "@/config/demo-data";

/**
 * Public Wedding Invitation — Phase 1 Visual Prototype
 *
 * Demonstrates the design system with:
 * - Cinematic hero with couple names
 * - Couple introduction
 * - Event details
 * - Countdown timer
 * - Navigation and footer
 *
 * All content is demo data; no database or API calls.
 */
export default function WeddingPage() {
  return (
    <>
      <WeddingNavWrapper />
      <main className="flex-1">
        <HeroSection wedding={demoWedding} />
        <CoupleSection wedding={demoWedding} />
        <EventsSection events={demoWedding.events} />
        <CountdownSection targetDate={demoWedding.weddingDate} />
      </main>
      <WeddingFooter />
    </>
  );
}

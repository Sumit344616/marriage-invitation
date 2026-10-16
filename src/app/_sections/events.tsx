"use client";

import { AnimatedSection, SectionHeading, EventCard } from "@/components/wedding";
import type { WeddingEvent } from "@/types/wedding";

interface EventsSectionProps {
  events: readonly WeddingEvent[] | WeddingEvent[];
}

/**
 * Wedding events section displaying all ceremonies in a responsive grid.
 * The main wedding ceremony is visually emphasized.
 */
export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section
      id="events"
      className="wedding-section"
      aria-labelledby="events-heading"
    >
      <div className="wedding-container">
        <AnimatedSection>
          <SectionHeading
            label="The Celebration"
            title="Wedding Events"
            subtitle="Join us across four days of celebration, tradition, and joy as our families come together."
          />
        </AnimatedSection>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {events.map((event, index) => (
            <AnimatedSection key={event.id} delay={index * 0.1}>
              <EventCard
                event={event}
                featured={event.id === "wedding"}
                className="h-full"
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

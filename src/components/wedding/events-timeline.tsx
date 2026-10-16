"use client";

import { Calendar, Clock, MapPin, Navigation, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedSection } from "./animated-section";
import { SectionHeading } from "./section-heading";
import { formatWeddingDate, formatTimeRange, getDirectionsUrl } from "@/lib/date-utils";
import { cn } from "cn";
import type { WeddingEvent, EventType } from "@/types/wedding";

interface EventsTimelineProps {
  events: WeddingEvent[];
}

const eventTypeBadges: Record<EventType, { label: string; bg: string; text: string }> = {
  haldi: { label: "Haldi Utsav", bg: "bg-amber-100/80 border-amber-300", text: "text-amber-900" },
  mehendi: { label: "Mehendi Ceremony", bg: "bg-emerald-100/80 border-emerald-300", text: "text-emerald-900" },
  sangeet: { label: "Sangeet Soirée", bg: "bg-purple-100/80 border-purple-300", text: "text-purple-900" },
  wedding: { label: "Vedic Vivah", bg: "bg-champagne-200 border-champagne-400", text: "text-champagne-900" },
  reception: { label: "Grand Reception", bg: "bg-rose-100/80 border-rose-300", text: "text-rose-900" },
  custom: { label: "Celebration", bg: "bg-ivory-200 border-champagne/30", text: "text-walnut-800" },
};

/**
 * Editorial Wedding Events Timeline.
 *
 * Visual improvements:
 * - Animated flowing gold light beam through the central timeline line
 * - Pulsing animated sparkles node on scroll
 * - Perfect left-to-right natural text alignment inside every card (no ragged text or backward icons)
 * - Horizontal connecting pointers from timeline to cards on desktop
 * - Clear date, time, venue, attire, and directions hierarchy
 */
export function EventsTimeline({ events }: EventsTimelineProps) {
  // Only display published events sorted by order
  const publishedEvents = events
    .filter((e) => e.isPublished)
    .sort((a, b) => a.order - b.order);

  if (publishedEvents.length === 0) {
    return null;
  }

  return (
    <section
      id="events"
      className="wedding-section relative overflow-hidden bg-ivory-50"
      aria-labelledby="events-heading"
    >
      <div className="wedding-container relative z-10">
        <AnimatedSection>
          <SectionHeading
            label="The Ceremonies"
            title="Celebration Timeline"
            subtitle="Join us across four days of joyful traditions, music, sacred Vedic rituals, and fellowship."
          />
        </AnimatedSection>

        {/* Timeline Container */}
        <div className="relative mt-16 sm:mt-20">
          {/* Animated Central Connecting Gold Line with Infinite Flowing Beams */}
          <div
            className="absolute left-4 top-0 bottom-0 w-[2px] bg-champagne-300/35 md:left-1/2 md:-translate-x-1/2 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            {/* Primary Infinite Flowing Gold Beam */}
            <motion.div
              className="absolute left-0 right-0 w-full h-80 bg-gradient-to-b from-transparent via-champagne-400 via-50% to-transparent shadow-[0_0_12px_rgba(212,175,110,0.85)]"
              animate={{ top: ["-25%", "110%"] }}
              transition={{
                repeat: Infinity,
                duration: 6.5,
                ease: "linear",
              }}
            />
            {/* Secondary Staggered Infinite Beam for Seamless Continuous Flow */}
            <motion.div
              className="absolute left-0 right-0 w-full h-80 bg-gradient-to-b from-transparent via-champagne-300/90 via-50% to-transparent shadow-[0_0_10px_rgba(212,175,110,0.7)]"
              animate={{ top: ["-25%", "110%"] }}
              transition={{
                repeat: Infinity,
                duration: 6.5,
                delay: 3.25,
                ease: "linear",
              }}
            />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {publishedEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              const badge = eventTypeBadges[event.type] ?? eventTypeBadges.custom;
              const formattedDate = formatWeddingDate(event.date);
              const formattedTime = formatTimeRange(event.startTime, event.endTime);
              const directionsUrl = getDirectionsUrl(event.mapUrl, event.venue, event.address);

              return (
                <div
                  key={event.id}
                  className="relative flex flex-col md:flex-row items-start"
                >
                  {/* Infinite Animated Glowing Node (precisely aligned at top-8 with card connector) */}
                  <div
                    className="absolute left-4 -translate-x-1/2 top-8 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-champagne-400 bg-ivory-50 text-champagne-700 shadow-md md:left-1/2"
                    aria-hidden="true"
                  >
                    {/* Infinite soft breathing aura */}
                    <motion.span
                      className="absolute inset-0 rounded-full bg-champagne-400/35 pointer-events-none"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.6,
                        ease: "easeInOut",
                        delay: (index % 5) * 0.4,
                      }}
                    />
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                        delay: (index % 5) * 0.5,
                      }}
                    >
                      <Sparkles className="h-4 w-4 text-champagne-600 relative z-10" />
                    </motion.div>
                  </div>

                  {/* Event Card Wrapper (Alternating Desktop Sides with consistent left-aligned content) */}
                  <div
                    className={cn(
                      "w-full pl-12 sm:pl-16 md:pl-0 md:w-1/2",
                      isEven ? "md:pr-12 lg:pr-16" : "md:ml-auto md:pl-12 lg:pl-16"
                    )}
                  >
                    <AnimatedSection
                      direction={isEven ? "left" : "right"}
                      delay={index * 0.1}
                    >
                      <article
                        className={cn(
                          "relative text-left overflow-hidden rounded-sm border p-6 sm:p-8 transition-all duration-300 shadow-xs hover:shadow-lg",
                          event.featured
                            ? "border-champagne-400 bg-gradient-to-b from-ivory-100 via-champagne-50/20 to-ivory-100 shadow-sm"
                            : "border-champagne/30 bg-ivory-100/70"
                        )}
                      >
                        {/* Horizontal connector line on desktop pointing to node */}
                        <div
                          className={cn(
                            "hidden md:block absolute top-8 h-px bg-champagne-400/40",
                            isEven
                              ? "-right-12 lg:-right-16 w-12 lg:w-16"
                              : "-left-12 lg:-left-16 w-12 lg:w-16"
                          )}
                          aria-hidden="true"
                        />

                        {/* Top Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "inline-block rounded-full border px-3 py-0.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wider",
                              badge.bg,
                              badge.text
                            )}
                          >
                            {badge.label}
                          </span>
                          {event.featured && (
                            <span className="rounded-full bg-champagne-600 px-3 py-0.5 font-sans text-[0.6rem] font-bold uppercase tracking-widest text-ivory-50 shadow-xs">
                              Main Ceremony
                            </span>
                          )}
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-walnut-900 sm:text-3xl">
                          {event.name}
                        </h3>
                        {event.subtitle && (
                          <p className="mt-0.5 font-sans text-xs text-champagne-700">
                            {event.subtitle}
                          </p>
                        )}

                        {/* Thin champagne separator */}
                        <div className="my-4 h-px w-14 bg-champagne/40" aria-hidden="true" />

                        {/* Date & Time Bar */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-walnut-700">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 shrink-0 text-champagne-600" />
                            <span className="font-display font-medium text-walnut-900">
                              {formattedDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 shrink-0 text-champagne-600" />
                            <span className="text-walnut-800">{formattedTime}</span>
                          </div>
                        </div>

                        {/* Venue & Location */}
                        <div className="mt-4 flex items-start gap-2.5 text-xs sm:text-sm">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne-600" />
                          <div>
                            <p className="font-display font-medium text-walnut-900">
                              {event.venue}
                            </p>
                            <p className="text-walnut-500 text-xs mt-0.5">{event.address}</p>
                          </div>
                        </div>

                        {/* Description */}
                        {event.description && (
                          <p className="mt-4 font-body text-xs sm:text-sm leading-relaxed text-walnut-600 italic">
                            &ldquo;{event.description}&rdquo;
                          </p>
                        )}

                        {/* Dress Code & Instructions Box */}
                        {(event.dressCode || event.instructions) && (
                          <div className="mt-5 space-y-1.5 rounded-sm border-l-2 border-champagne-400 bg-champagne-50/70 p-3.5">
                            {event.dressCode && (
                              <p className="font-body text-xs text-walnut-700">
                                <span className="font-sans font-semibold text-champagne-800 uppercase tracking-wider text-[0.65rem]">
                                  Attire:{" "}
                                </span>
                                {event.dressCode}
                              </p>
                            )}
                            {event.instructions && (
                              <p className="font-body text-xs text-walnut-600">
                                <span className="font-sans font-semibold text-champagne-800 uppercase tracking-wider text-[0.65rem]">
                                  Note:{" "}
                                </span>
                                {event.instructions}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Directions Link */}
                        {directionsUrl && (
                          <div className="mt-6">
                            <a
                              href={directionsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-sm border border-champagne-400/80 bg-ivory-50 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-800 shadow-xs transition-all duration-300 hover:bg-champagne-400 hover:text-walnut-950 focus:outline-none focus:ring-2 focus:ring-champagne"
                            >
                              <Navigation className="h-3.5 w-3.5" />
                              Get Directions
                            </a>
                          </div>
                        )}
                      </article>
                    </AnimatedSection>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

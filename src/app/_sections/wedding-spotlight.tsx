"use client";

import Image from "next/image";
import { MapPin, Calendar, Clock, Navigation } from "lucide-react";
import { AnimatedSection } from "@/components/wedding/animated-section";
import { OrnamentalDivider } from "@/components/wedding/ornamental-divider";
import { formatWeddingDate, formatTimeRange } from "@/lib/date-utils";
import type { WeddingEvent } from "@/types/wedding";

interface WeddingSpotlightProps {
  event: WeddingEvent;
  venueImage: string;
}

/**
 * Flagship Wedding Ceremony Spotlight & Venue Guide.
 *
 * Highlights the main Vedic wedding ceremony with:
 * - High-resolution architectural twilight photography of Jai Mahal Palace
 * - Complete date, time, and ceremonial schedule
 * - Functional "Get Directions" link to Google Maps
 * - "Add to Calendar" link for guests
 * - Attire etiquette guidance
 */
export function WeddingSpotlight({ event, venueImage }: WeddingSpotlightProps) {
  // Google Calendar one-click add URL
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Ananya & Arjun — Wedding Ceremony"
  )}&dates=20261211T140000Z/20261211T200000Z&details=${encodeURIComponent(
    "The sacred wedding ceremony and Vedic pheras of Ananya Sharma and Arjun Mehta at Jai Mahal Palace, Jaipur."
  )}&location=${encodeURIComponent(
    "Jai Mahal Palace, Jacob Road, Civil Lines, Jaipur, Rajasthan 302006"
  )}`;

  return (
    <section
      id="spotlight"
      className="wedding-section relative overflow-hidden bg-ivory-50"
      aria-labelledby="spotlight-heading"
    >
      <div className="wedding-container relative z-10">
        <AnimatedSection>
          <div className="text-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-champagne-700">
              The Main Ceremony
            </span>
            <h2
              id="spotlight-heading"
              className="mt-2 font-display text-3xl font-light tracking-tight text-walnut-900 sm:text-4xl lg:text-5xl"
            >
              The Auspicious Vivah
            </h2>
            <OrnamentalDivider className="mx-auto mt-5 max-w-[200px]" symbol="✦" />
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-walnut-500 sm:text-base">
              The sacred union under starry skies, traditional Vedic rituals, pheras around the holy fire, and blessings from our loved ones.
            </p>
          </div>
        </AnimatedSection>

        {/* Feature Spotlight Card */}
        <AnimatedSection delay={0.2}>
          <div className="mt-12 overflow-hidden rounded-sm border border-champagne/40 bg-ivory-100/70 shadow-lg lg:grid lg:grid-cols-12">
            {/* Palace Venue Photography */}
            <div className="relative min-h-[300px] lg:col-span-7 lg:min-h-[460px]">
              <Image
                src={venueImage}
                alt="Jai Mahal Palace Jaipur royal wedding celebration courtyard"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut-950/70 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 z-10 rounded-sm bg-walnut-900/80 px-3 py-1 font-sans text-[0.65rem] uppercase tracking-widest text-champagne-200 backdrop-blur-xs">
                The Heritage Venue
              </div>
            </div>

            {/* Event Details Content */}
            <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-5">
              <div>
                <span className="inline-block rounded-full border border-champagne-400/40 bg-champagne-50/70 px-3 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-widest text-champagne-800">
                  Vedic Vivah
                </span>

                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-walnut-900 sm:text-3xl">
                  {event.name}
                </h3>
                <p className="mt-1 font-sans text-xs text-champagne-700">
                  {event.subtitle}
                </p>

                {/* Key Details List */}
                <div className="mt-6 space-y-4 border-t border-b border-champagne/25 py-6">
                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-champagne-600" />
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-walnut-400">
                        Date &amp; Day
                      </p>
                      <p className="font-display text-base text-walnut-900">
                        {formatWeddingDate(event.date)}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-champagne-600" />
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-walnut-400">
                        Auspicious Muhurat
                      </p>
                      <p className="font-body text-sm text-walnut-800">
                        {event.time || formatTimeRange(event.startTime, event.endTime)}
                      </p>
                    </div>
                  </div>

                  {/* Venue & Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne-600" />
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-walnut-400">
                        Ceremonial Venue
                      </p>
                      <p className="font-display text-base font-medium text-walnut-900">
                        {event.venue}
                      </p>
                      <p className="mt-0.5 font-body text-xs text-walnut-500">
                        {event.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Attire note */}
                {event.dressCode && (
                  <div className="mt-4 rounded-sm bg-champagne-50/50 p-3">
                    <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-champagne-800">
                      Dress Code
                    </p>
                    <p className="mt-0.5 font-body text-xs text-walnut-600">
                      {event.dressCode}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm border border-champagne-600 bg-champagne-600 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-ivory-50 transition-colors hover:bg-champagne-700 focus:outline-none focus:ring-2 focus:ring-champagne"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Get Directions
                </a>

                <a
                  href={gcalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-champagne/40 bg-ivory-50 px-4 py-2.5 font-sans text-xs font-medium uppercase tracking-wider text-walnut-800 transition-colors hover:bg-champagne-50 focus:outline-none focus:ring-2 focus:ring-champagne"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Add to Calendar
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

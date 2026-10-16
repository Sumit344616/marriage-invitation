"use client";

import { AnimatedSection, Countdown } from "@/components/wedding";
import { OrnamentalDivider } from "@/components/wedding/ornamental-divider";
import { Calendar } from "lucide-react";

interface CountdownSectionProps {
  targetDate: string;
}

/**
 * Save-the-date section with live countdown timer.
 * Features a dark walnut background for rich metallic contrast.
 */
export function CountdownSection({ targetDate }: CountdownSectionProps) {
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Ananya & Arjun — Wedding Celebrations"
  )}&dates=20261211T140000Z/20261211T200000Z&details=${encodeURIComponent(
    "Save the date for the wedding of Ananya Sharma & Arjun Mehta at Jai Mahal Palace, Jaipur."
  )}&location=${encodeURIComponent(
    "Jai Mahal Palace, Jacob Road, Civil Lines, Jaipur, Rajasthan 302006"
  )}`;

  return (
    <section
      id="countdown"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32"
      aria-labelledby="countdown-heading"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-walnut-950" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF6E 0.4px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="wedding-container relative z-10 text-center">
        <AnimatedSection>
          <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.25em] text-champagne-300">
            Until We Say &ldquo;I Do&rdquo;
          </p>
          <h2
            id="countdown-heading"
            className="font-display text-3xl font-light tracking-tight text-ivory-100 sm:text-4xl lg:text-5xl"
          >
            Save the Date
          </h2>
          <OrnamentalDivider
            className="mx-auto mt-5 max-w-[200px]"
            variant="champagne"
            symbol="✦"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-6 font-display text-2xl italic text-champagne-300 sm:text-3xl lg:text-4xl">
            Friday, 11th December 2026
          </p>
          <p className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-ivory-200/90 sm:text-sm">
            Jai Mahal Palace • Jaipur, Rajasthan
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <div className="mt-10 sm:mt-12">
            <Countdown targetDate={targetDate} variant="light" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <p className="font-body text-sm text-ivory-100 sm:text-base">
              We can&apos;t wait to celebrate this auspicious day with you
            </p>
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-champagne-400 px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-walnut-950 shadow-xl transition-all duration-300 hover:bg-champagne-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-champagne/50"
            >
              <Calendar className="h-4 w-4 text-walnut-950" />
              Add to Google Calendar
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

"use client";

import { AnimatedSection, Countdown } from "@/components/wedding";
import { OrnamentalDivider } from "@/components/wedding/ornamental-divider";

interface CountdownSectionProps {
  targetDate: string;
}

/**
 * Save-the-date section with countdown timer.
 * Features a dark walnut background for contrast.
 */
export function CountdownSection({ targetDate }: CountdownSectionProps) {
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
          <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-champagne/60">
            Mark Your Calendar
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
          <p className="mt-6 font-display text-lg italic text-ivory-200/70 sm:text-xl">
            Monday, 17th November 2025
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <div className="mt-10 sm:mt-12">
            <Countdown targetDate={targetDate} />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <p className="mt-10 font-body text-sm text-walnut-300/50 sm:text-base">
            We can&apos;t wait to celebrate this beautiful day with you
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

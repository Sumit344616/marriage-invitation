"use client";

import { AnimatedSection } from "@/components/wedding/animated-section";
import { OrnamentalDivider } from "@/components/wedding/ornamental-divider";
import type { WeddingData } from "@/types/wedding";

interface FamilySectionProps {
  wedding: Pick<
    WeddingData,
    "bride" | "groom" | "shloka" | "invitationMessage"
  >;
}

/**
 * Ceremonial Family Introduction & Divine Blessings Section.
 *
 * Honors the elders and families welcoming guests to the sacred union:
 * - Sacred Sanskrit Vedic Shloka with English translation
 * - Formal invitation address from both the Sharma & Mehta families
 * - Ancestral blessings and parents' names in symmetrical royal cards
 */
export function FamilySection({ wedding }: FamilySectionProps) {
  return (
    <section
      id="family"
      className="wedding-section relative overflow-hidden bg-ivory-50"
      aria-labelledby="family-heading"
    >
      <div className="wedding-container relative z-10">
        {/* Vedic Shloka Card */}
        <AnimatedSection>
          <div className="mx-auto max-w-2xl rounded-sm border border-champagne/30 bg-ivory-100/60 p-6 sm:p-8 text-center shadow-xs">
            <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-champagne-700">
              Divine Invocation
            </span>
            <p className="mt-3 font-serif text-base sm:text-lg font-medium leading-relaxed tracking-wider text-walnut-900 whitespace-pre-line">
              {wedding.shloka.sanskrit}
            </p>
            <p className="mt-3 font-body text-xs italic text-walnut-500 sm:text-sm">
              &ldquo;{wedding.shloka.translation}&rdquo;
            </p>
          </div>
        </AnimatedSection>

        {/* Section Header */}
        <AnimatedSection delay={0.15}>
          <div className="mx-auto mt-14 max-w-3xl text-center sm:mt-16">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-champagne-700">
              With the Blessings of Our Ancestors
            </p>
            <h2
              id="family-heading"
              className="mt-2 font-display text-3xl font-light tracking-tight text-walnut-900 sm:text-4xl lg:text-5xl"
            >
              The Families Cordially Invite You
            </h2>
            <OrnamentalDivider className="mx-auto mt-5 max-w-[220px]" symbol="✦" />
            <p className="mx-auto mt-6 max-w-2xl font-body text-sm leading-relaxed text-walnut-500 sm:text-base">
              {wedding.invitationMessage}
            </p>
          </div>
        </AnimatedSection>

        {/* Symmetrical Family Cards Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Bride's Family */}
          <AnimatedSection direction="left" delay={0.25}>
            <div className="relative h-full rounded-sm border border-champagne/30 bg-gradient-to-b from-ivory-100/80 to-ivory-200/50 p-8 sm:p-10 text-center shadow-xs transition-shadow duration-300 hover:shadow-md">
              {/* Corner flourishes */}
              <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-champagne/40" />
              <div className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b border-champagne/40" />

              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-champagne-700">
                Bride&apos;s Family
              </span>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-walnut-900 sm:text-3xl">
                The Sharma Family
              </h3>

              <div className="my-4 h-px w-16 mx-auto bg-champagne/30" />

              <p className="font-display text-lg font-light text-walnut-800">
                Mr. Rajesh Sharma &amp; Mrs. Sunita Sharma
              </p>
              <p className="mt-2 font-body text-xs text-walnut-500 sm:text-sm">
                {wedding.bride.grandparents}
              </p>

              <p className="mt-6 font-body text-xs italic text-walnut-400 sm:text-sm">
                Joyfully invite you to the wedding of their beloved daughter{" "}
                <span className="font-medium text-walnut-800">Ananya</span>
              </p>
            </div>
          </AnimatedSection>

          {/* Groom's Family */}
          <AnimatedSection direction="right" delay={0.35}>
            <div className="relative h-full rounded-sm border border-champagne/30 bg-gradient-to-b from-ivory-100/80 to-ivory-200/50 p-8 sm:p-10 text-center shadow-xs transition-shadow duration-300 hover:shadow-md">
              {/* Corner flourishes */}
              <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-champagne/40" />
              <div className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b border-champagne/40" />

              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-champagne-700">
                Groom&apos;s Family
              </span>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-walnut-900 sm:text-3xl">
                The Mehta Family
              </h3>

              <div className="my-4 h-px w-16 mx-auto bg-champagne/30" />

              <p className="font-display text-lg font-light text-walnut-800">
                Mr. Vikram Mehta &amp; Mrs. Priya Mehta
              </p>
              <p className="mt-2 font-body text-xs text-walnut-500 sm:text-sm">
                {wedding.groom.grandparents}
              </p>

              <p className="mt-6 font-body text-xs italic text-walnut-400 sm:text-sm">
                Joyfully invite you to the wedding of their beloved son{" "}
                <span className="font-medium text-walnut-800">Arjun</span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

"use client";

import { AnimatedSection, SectionHeading } from "@/components/wedding";
import type { WeddingData } from "@/types/wedding";

interface CoupleSectionProps {
  wedding: Pick<WeddingData, "bride" | "groom">;
}

/**
 * Couple introduction section with refined portrait placeholders.
 * Portraits will come from Cloudinary in later phases.
 */
export function CoupleSection({ wedding }: CoupleSectionProps) {
  return (
    <section
      id="couple"
      className="wedding-section bg-ivory-50"
      aria-labelledby="couple-heading"
    >
      <div className="wedding-container">
        <AnimatedSection>
          <SectionHeading
            label="Together in Love"
            title="The Couple"
            subtitle="Two hearts united by destiny, bound together by love, and blessed by their families."
          />
        </AnimatedSection>

        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:gap-20">
          {/* Bride */}
          <AnimatedSection direction="left" delay={0.15}>
            <div className="flex flex-col items-center text-center">
              {/* Portrait placeholder */}
              <div className="relative mb-6 aspect-[3/4] w-48 overflow-hidden rounded-sm border border-champagne/20 bg-ivory-200/50 sm:w-56 lg:w-64">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="font-display text-5xl text-champagne/30 sm:text-6xl">
                    {wedding.bride.firstName[0]}
                  </span>
                  <span className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-walnut-300">
                    Portrait
                  </span>
                </div>
                {/* Subtle border frame */}
                <div className="absolute inset-2 rounded-sm border border-champagne/10" aria-hidden="true" />
              </div>

              <h3 className="font-display text-2xl font-medium tracking-tight text-walnut-900 sm:text-3xl">
                {wedding.bride.firstName}{" "}
                <span className="font-light text-walnut-600">
                  {wedding.bride.lastName}
                </span>
              </h3>
              <p className="mt-2 font-body text-sm text-walnut-400 sm:text-base">
                {wedding.bride.parents}
              </p>
            </div>
          </AnimatedSection>

          {/* Groom */}
          <AnimatedSection direction="right" delay={0.3}>
            <div className="flex flex-col items-center text-center">
              {/* Portrait placeholder */}
              <div className="relative mb-6 aspect-[3/4] w-48 overflow-hidden rounded-sm border border-champagne/20 bg-ivory-200/50 sm:w-56 lg:w-64">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="font-display text-5xl text-champagne/30 sm:text-6xl">
                    {wedding.groom.firstName[0]}
                  </span>
                  <span className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-walnut-300">
                    Portrait
                  </span>
                </div>
                {/* Subtle border frame */}
                <div className="absolute inset-2 rounded-sm border border-champagne/10" aria-hidden="true" />
              </div>

              <h3 className="font-display text-2xl font-medium tracking-tight text-walnut-900 sm:text-3xl">
                {wedding.groom.firstName}{" "}
                <span className="font-light text-walnut-600">
                  {wedding.groom.lastName}
                </span>
              </h3>
              <p className="mt-2 font-body text-sm text-walnut-400 sm:text-base">
                {wedding.groom.parents}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

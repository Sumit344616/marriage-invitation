"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/wedding/animated-section";
import { SectionHeading } from "@/components/wedding/section-heading";
import type { WeddingData } from "@/types/wedding";

interface CoupleStoryProps {
  wedding: Pick<WeddingData, "bride" | "groom" | "story">;
}

/**
 * Editorial Couple Introduction & Journey of Love Section.
 *
 * Showcases the bride and groom through fine-art portraits,
 * personal reflections, and a curated vignette of their journey:
 * - High-resolution Next.js optimized imagery
 * - Symmetric bride & groom presentation
 * - Three-chapter love story vignette with pull quotes
 */
export function CoupleStory({ wedding }: CoupleStoryProps) {
  return (
    <section
      id="couple-story"
      className="wedding-section relative overflow-hidden bg-ivory-100/50"
      aria-labelledby="story-heading"
    >
      <div className="wedding-container relative z-10">
        <AnimatedSection>
          <SectionHeading
            label="The Bride & Groom"
            title="Two Souls, One Destiny"
            subtitle="Meet Ananya and Arjun as they prepare to begin their sacred journey together."
          />
        </AnimatedSection>

        {/* Editorial Couple Portraits */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-16">
          {/* Bride Feature */}
          <AnimatedSection direction="left" delay={0.2}>
            <div className="flex flex-col items-center text-center">
              <div className="group relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm border border-champagne/40 bg-ivory-200 shadow-md">
                <Image
                  src={wedding.bride.portraitUrl}
                  alt={`Bridal portrait of ${wedding.bride.firstName} ${wedding.bride.lastName}`}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 384px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-2 rounded-sm border border-champagne/20" />
              </div>

              <div className="mt-6 max-w-sm">
                <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-champagne-700">
                  The Bride
                </span>
                <h3 className="mt-1 font-display text-3xl font-light text-walnut-900">
                  {wedding.bride.firstName}{" "}
                  <span className="text-walnut-600">{wedding.bride.lastName}</span>
                </h3>
                <p className="mt-3 font-body text-xs sm:text-sm leading-relaxed text-walnut-500">
                  {wedding.bride.bio}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Groom Feature */}
          <AnimatedSection direction="right" delay={0.35}>
            <div className="flex flex-col items-center text-center">
              <div className="group relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm border border-champagne/40 bg-ivory-200 shadow-md">
                <Image
                  src={wedding.groom.portraitUrl}
                  alt={`Portrait of ${wedding.groom.firstName} ${wedding.groom.lastName}`}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 384px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-2 rounded-sm border border-champagne/20" />
              </div>

              <div className="mt-6 max-w-sm">
                <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-champagne-700">
                  The Groom
                </span>
                <h3 className="mt-1 font-display text-3xl font-light text-walnut-900">
                  {wedding.groom.firstName}{" "}
                  <span className="text-walnut-600">{wedding.groom.lastName}</span>
                </h3>
                <p className="mt-3 font-body text-xs sm:text-sm leading-relaxed text-walnut-500">
                  {wedding.groom.bio}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Story Milestones Vignettes */}
        <div className="mt-20 border-t border-champagne/25 pt-16 sm:mt-24">
          <AnimatedSection delay={0.1}>
            <div className="text-center">
              <span className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-champagne-700">
                Moments to Cherish
              </span>
              <h3 className="mt-2 font-display text-2xl font-light text-walnut-900 sm:text-3xl">
                Our Story in Three Chapters
              </h3>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {wedding.story.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.15}>
                <div className="relative h-full rounded-sm border border-champagne/25 bg-ivory-50 p-6 sm:p-8 text-center shadow-xs transition-shadow duration-300 hover:shadow-md">
                  <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-widest text-champagne-600">
                    Chapter 0{index + 1}
                  </span>
                  <h4 className="mt-2 font-display text-xl font-medium text-walnut-900">
                    {item.title}
                  </h4>
                  <p className="mt-1 font-sans text-xs text-champagne-700">
                    {item.date}
                  </p>
                  <p className="mt-4 font-body text-xs sm:text-sm leading-relaxed text-walnut-500">
                    {item.description}
                  </p>
                  {item.quote && (
                    <p className="mt-4 font-display text-xs italic text-walnut-400">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

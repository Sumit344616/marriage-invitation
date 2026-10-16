"use client";

import { Plane, Sparkles, Sun, HeartHandshake } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import { SectionHeading } from "./section-heading";
import type { GuestNote } from "@/types/wedding";

interface GuestNotesProps {
  notes?: GuestNote[];
}

const categoryIcons = {
  travel: Plane,
  attire: Sparkles,
  weather: Sun,
  general: HeartHandshake,
};

/**
 * Guest Information & Hospitality Guidance.
 *
 * Provides out-of-town and cherished guests with essential tips:
 * - Traditional attire themes & color palette suggestions
 * - Transit distance & proximity to Jaipur airport & railway
 * - Jaipur December weather and comfort guidelines
 * - Valet parking & hospitality desk details
 * Automatically hides if notes array is empty.
 */
export function GuestNotes({ notes }: GuestNotesProps) {
  if (!notes || notes.length === 0) {
    return null;
  }

  return (
    <section
      id="guest-info"
      className="wedding-section relative overflow-hidden bg-ivory-50"
      aria-labelledby="notes-heading"
    >
      <div className="wedding-container relative z-10">
        <AnimatedSection>
          <SectionHeading
            label="Guest Hospitality"
            title="Essential Information"
            subtitle="Thoughtful details to make your journey and stay in Jaipur comfortable and joyous."
          />
        </AnimatedSection>

        {/* Notes Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {notes.map((note, index) => {
            const IconComponent =
              categoryIcons[note.category] ?? HeartHandshake;

            return (
              <AnimatedSection key={note.id} delay={index * 0.1}>
                <div className="relative flex h-full flex-col justify-between rounded-sm border border-champagne/30 bg-ivory-100/60 p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-champagne">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/40 bg-champagne-100/60 text-champagne-800">
                      <IconComponent className="h-4 w-4" />
                    </div>

                    <h3 className="mt-4 font-display text-lg font-medium text-walnut-900">
                      {note.title}
                    </h3>

                    {note.highlight && (
                      <p className="mt-1 font-sans text-xs font-semibold text-champagne-800">
                        {note.highlight}
                      </p>
                    )}

                    <p className="mt-3 font-body text-xs sm:text-sm leading-relaxed text-walnut-500">
                      {note.content}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

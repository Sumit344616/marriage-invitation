"use client";

import { motion } from "motion/react";
import { OrnamentalDivider } from "@/components/wedding/ornamental-divider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { WeddingData } from "@/types/wedding";

interface HeroSectionProps {
  wedding: Pick<WeddingData, "bride" | "groom" | "tagline" | "label">;
}

/**
 * Cinematic hero section: full-viewport invitation opening.
 *
 * Features:
 * - Full-height viewport with layered background
 * - Staggered text reveal animation
 * - Ornamental borders and decorative motifs
 * - Responsive scaling for all screen sizes
 */
export function HeroSection({ wedding }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const dur = prefersReducedMotion ? 0 : undefined;

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
      aria-label="Wedding invitation"
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-200/60" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--champagne-400) 0.5px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Corner ornaments */}
      <div className="absolute inset-4 sm:inset-8 lg:inset-12 pointer-events-none" aria-hidden="true">
        {/* Top-left */}
        <div className="absolute left-0 top-0 h-16 w-16 border-l border-t border-champagne/25 sm:h-24 sm:w-24" />
        {/* Top-right */}
        <div className="absolute right-0 top-0 h-16 w-16 border-r border-t border-champagne/25 sm:h-24 sm:w-24" />
        {/* Bottom-left */}
        <div className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-champagne/25 sm:h-24 sm:w-24" />
        {/* Bottom-right */}
        <div className="absolute bottom-0 right-0 h-16 w-16 border-b border-r border-champagne/25 sm:h-24 sm:w-24" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Demo label */}
        {wedding.label && (
          <motion.span
            className="mb-8 inline-block rounded-full border border-champagne/30 bg-ivory-50/80 px-4 py-1.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-champagne-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur ?? 0.5, delay: 0.2 }}
          >
            {wedding.label}
          </motion.span>
        )}

        {/* Tagline */}
        <motion.p
          className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.25em] text-walnut-400 sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur ?? 0.8, delay: 0.4 }}
        >
          {wedding.tagline}
        </motion.p>

        {/* Names */}
        <motion.div
          className="mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur ?? 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="wedding-names text-walnut-900">
            <span className="block">{wedding.bride.firstName}</span>
            <span className="my-2 block font-display text-xl font-light italic text-champagne sm:my-3 sm:text-2xl lg:text-3xl">
              &
            </span>
            <span className="block">{wedding.groom.firstName}</span>
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mt-6 w-48 sm:mt-8 sm:w-64"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: dur ?? 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <OrnamentalDivider symbol="✦" />
        </motion.div>

        {/* Parents */}
        <motion.div
          className="mt-6 space-y-1.5 sm:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur ?? 0.8, delay: 1.5 }}
        >
          <p className="font-body text-sm text-walnut-500 sm:text-base">
            {wedding.bride.parents}
          </p>
          <p className="font-body text-sm text-walnut-500 sm:text-base">
            {wedding.groom.parents}
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur ?? 0.6, delay: 2 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-walnut-300">
              Scroll to explore
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-champagne/40 to-transparent" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

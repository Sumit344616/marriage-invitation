"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { OrnamentalDivider } from "@/components/wedding/ornamental-divider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { WeddingData } from "@/types/wedding";

interface HeroSectionProps {
  wedding: Pick<
    WeddingData,
    "bride" | "groom" | "tagline" | "heroImage" | "label" | "city"
  >;
}

/**
 * Cinematic Editorial Wedding Hero Section.
 *
 * Combines high-fashion wedding photography with regal typography:
 * - High-resolution couple photography with subtle golden hour gradient
 * - Cormorant Garamond display typography
 * - Responsive mobile & desktop compositions
 * - Respects prefers-reduced-motion
 */
export function HeroSection({ wedding }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const dur = prefersReducedMotion ? 0 : undefined;

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] sm:min-h-screen items-center justify-center overflow-hidden bg-walnut-950 text-ivory-50"
      aria-label="Wedding invitation opening"
    >
      {/* Background Image with Dark Warm Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={wedding.heroImage}
          alt={`Wedding portrait of ${wedding.bride.firstName} and ${wedding.groom.firstName}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%] opacity-35 brightness-[0.85] contrast-[1.05]"
        />
        {/* Layered vignette and gold ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-walnut-950 via-walnut-950/70 to-walnut-950/85" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF6E 0.5px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Royal Corner Ornaments */}
      <div
        className="pointer-events-none absolute inset-4 sm:inset-8 lg:inset-12 z-10"
        aria-hidden="true"
      >
        <div className="absolute left-0 top-0 h-12 w-12 border-l border-t border-champagne-400/30 sm:h-20 sm:w-20" />
        <div className="absolute right-0 top-0 h-12 w-12 border-r border-t border-champagne-400/30 sm:h-20 sm:w-20" />
        <div className="absolute bottom-0 left-0 h-12 w-12 border-b border-l border-champagne-400/30 sm:h-20 sm:w-20" />
        <div className="absolute bottom-0 right-0 h-12 w-12 border-b border-r border-champagne-400/30 sm:h-20 sm:w-20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:py-24">
        {/* Demo Tag badge */}
        {wedding.label && (
          <motion.span
            className="mb-6 inline-block rounded-full border border-champagne-400/40 bg-walnut-900/60 px-4 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-champagne-300 backdrop-blur-xs"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur ?? 0.4, delay: 0.2 }}
          >
            {wedding.label}
          </motion.span>
        )}

        {/* Sacred Invocation */}
        <motion.p
          className="font-serif text-xs sm:text-sm font-medium tracking-[0.25em] text-champagne-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur ?? 0.6, delay: 0.3 }}
        >
          ॥ श्री गणेशाय नमः ॥
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="mt-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-ivory-200/70 sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur ?? 0.7, delay: 0.5 }}
        >
          {wedding.tagline}
        </motion.p>

        {/* Couple Names */}
        <motion.div
          className="mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur ?? 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-ivory-50">
            <span className="inline-block hover:text-champagne-200 transition-colors">
              {wedding.bride.firstName}
            </span>
            <span className="mx-3 inline-block font-serif text-2xl sm:text-4xl lg:text-5xl italic font-normal text-champagne-400">
              &
            </span>
            <span className="inline-block hover:text-champagne-200 transition-colors">
              {wedding.groom.firstName}
            </span>
          </h1>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          className="mt-6 w-48 sm:mt-8 sm:w-64"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: dur ?? 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <OrnamentalDivider variant="champagne" symbol="✦" />
        </motion.div>

        {/* Wedding Date & City */}
        <motion.div
          className="mt-6 sm:mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur ?? 0.8, delay: 1.2 }}
        >
          <p className="font-display text-lg sm:text-2xl font-light tracking-wide text-champagne-200">
            Friday, 11th December 2026
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ivory-300/70">
            Jai Mahal Palace • {wedding.city}
          </p>
        </motion.div>

        {/* Scroll invitation indicator */}
        <motion.div
          className="mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur ?? 0.6, delay: 1.6 }}
        >
          <a
            href="#family"
            className="group flex flex-col items-center gap-2 text-ivory-300/60 hover:text-champagne-200 transition-colors focus:outline-none"
            aria-label="Scroll to family invitation"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.25em]">
              Explore Celebrations
            </span>
            <div className="h-9 w-px bg-gradient-to-b from-champagne-400 to-transparent group-hover:h-12 transition-all duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

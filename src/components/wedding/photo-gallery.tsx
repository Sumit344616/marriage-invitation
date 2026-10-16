"use client";

import { useState, useEffect, useCallback, useId } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionHeading } from "./section-heading";
import { AnimatedSection } from "./animated-section";
import { cn } from "cn";
import type { GalleryItem } from "@/types/wedding";

interface PhotoGalleryProps {
  items: GalleryItem[];
}

type CategoryFilter = "all" | "pre-wedding" | "ceremonies" | "moments";

const categories: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All Moments" },
  { key: "pre-wedding", label: "Portraits" },
  { key: "ceremonies", label: "Ceremonies" },
  { key: "moments", label: "Heritage" },
];

const categoryLabels: Record<string, string> = {
  "pre-wedding": "Royal Portrait",
  ceremonies: "Sacred Ceremony",
  moments: "Heritage Palace",
};

// Slide-pan animation variants with directional momentum
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    zIndex: 0,
    x: dir < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.94,
  }),
};

/**
 * Editorial Wedding Photo Gallery with Cinematic Slide-Pan Lightbox.
 *
 * Visual & Functional Enhancements:
 * - Luxury fine-art gallery grid with corner accents, category tags, and glowing hover depth
 * - Smooth, physics-based directional Slide-Pan animation (`enter`, `center`, `exit`) on photo change
 * - Mobile-responsive high-contrast Next & Previous controls (prominent glowing buttons & bottom thumb bar)
 * - Touch swipe / drag gesture support on mobile devices
 * - Interactive bottom thumbnail navigation strip with active gold indicator
 * - High-contrast readable typography for titles and descriptions
 * - Keyboard navigation (Escape, ArrowLeft, ArrowRight) and background scroll lock
 */
export function PhotoGallery({ items }: PhotoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();
  const titleId = useId();

  const filteredItems = items.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  // Close lightbox handler
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Previous image with slide-pan left direction
  const showPrev = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : filteredItems.length - 1;
    });
  }, [filteredItems.length]);

  // Next image with slide-pan right direction
  const showNext = useCallback(() => {
    setDirection(1);
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev < filteredItems.length - 1 ? prev + 1 : 0;
    });
  }, [filteredItems.length]);

  // Jump to specific photo index via thumbnail strip
  const jumpToIndex = useCallback(
    (targetIndex: number) => {
      setLightboxIndex((current) => {
        if (current === null) {
          setDirection(1);
          return targetIndex;
        }
        setDirection(targetIndex >= current ? 1 : -1);
        return targetIndex;
      });
    },
    []
  );

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  // Background scroll lock when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxIndex]);

  const currentItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="wedding-section relative overflow-hidden bg-ivory-100/60"
      aria-labelledby="gallery-heading"
    >
      <div className="wedding-container relative z-10">
        <AnimatedSection>
          <SectionHeading
            label="Visual Memories"
            title="Moments of Love & Grace"
            subtitle="Glimpses from our journey, sacred celebrations, and royal heritage moments in Jaipur."
          />
        </AnimatedSection>

        {/* Category Filter Tabs with Item Counts */}
        <AnimatedSection delay={0.15}>
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5"
            role="tablist"
            aria-label="Gallery category filters"
          >
            {categories.map(({ key, label }) => {
              const isActive = activeCategory === key;
              const count =
                key === "all"
                  ? items.length
                  : items.filter((i) => i.category === key).length;

              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(key);
                    setLightboxIndex(null);
                  }}
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-champagne",
                    isActive
                      ? "bg-champagne-400 text-walnut-950 shadow-md ring-1 ring-champagne-300"
                      : "border border-champagne-400/35 bg-ivory-50 text-walnut-700 hover:border-champagne hover:bg-champagne-50 hover:text-walnut-950"
                  )}
                >
                  <span>{label}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 font-mono text-[0.65rem] transition-colors",
                      isActive
                        ? "bg-walnut-950/15 text-walnut-950 font-bold"
                        : "bg-champagne-200/50 text-walnut-600 group-hover:bg-champagne-300/50"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Curated Editorial Photo Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {filteredItems.map((item, index) => {
            const isPortrait = item.aspectRatio === "portrait";
            const categoryBadge =
              categoryLabels[item.category] ?? "Wedding Moment";

            return (
              <AnimatedSection key={item.id} delay={index * 0.08}>
                <div
                  className="group relative cursor-pointer overflow-hidden rounded-sm border-2 border-champagne-300/40 bg-ivory-50 p-2 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-champagne-400 hover:shadow-xl"
                  onClick={() => {
                    setDirection(1);
                    setLightboxIndex(index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setDirection(1);
                      setLightboxIndex(index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View high-res photo: ${item.title}`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-walnut-900/10">
                    <Image
                      src={item.imageUrl}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={cn(
                        "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                        isPortrait ? "object-[center_20%]" : "object-center"
                      )}
                    />

                    {/* Subtle Golden Sheen on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-walnut-950/85 via-walnut-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Category Ribbon Pill */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1 rounded-full border border-champagne-400/40 bg-walnut-950/75 px-3 py-1 font-sans text-[0.62rem] font-semibold uppercase tracking-wider text-champagne-200 backdrop-blur-md shadow-xs">
                        <Sparkles className="h-2.5 w-2.5 text-champagne-400" />
                        {categoryBadge}
                      </span>
                    </div>

                    {/* Hover Caption & Expand Button */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="pr-2">
                        <p className="font-display text-lg font-medium tracking-wide text-ivory-50 drop-shadow-sm">
                          {item.title}
                        </p>
                        {item.caption && (
                          <p className="font-body text-xs text-champagne-200/90 line-clamp-1 mt-0.5">
                            {item.caption}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 rounded-full border border-champagne-200/50 bg-champagne-400 p-2 text-walnut-950 shadow-md transition-transform duration-300 group-hover:scale-110">
                        <Maximize2 className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

      {/* Accessible Fullscreen Lightbox Modal with Slide-Pan Transition */}
      <AnimatePresence>
        {currentItem && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-walnut-950/98 p-3 sm:p-6 backdrop-blur-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
          >
            {/* Top Bar: Title, Counter & High-Contrast Close Button */}
            <div className="relative z-30 flex w-full max-w-6xl items-center justify-between border-b border-champagne-400/25 pb-3 sm:pb-4 text-ivory-100">
              <div className="flex items-center gap-2.5">
                <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-champagne-400" />
                <span className="font-sans text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.2em] text-champagne-300">
                  Ananya & Arjun · Royal Gallery
                </span>
              </div>

              <div className="flex items-center gap-3 sm:gap-5">
                <span className="rounded-full border border-champagne-400/40 bg-walnut-900/90 px-3.5 py-1 font-mono text-xs font-semibold tracking-widest text-champagne-300 shadow-xs">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2 border-champagne-400 bg-walnut-900 text-champagne-300 shadow-md transition-all duration-300 hover:scale-105 hover:bg-champagne-400 hover:text-walnut-950 focus:outline-none focus:ring-2 focus:ring-champagne"
                  aria-label="Close photo lightbox"
                >
                  <X className="h-5 w-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Central Stage: Slide-Pan Image View with Glowing Side Navigation */}
            <div className="relative flex flex-1 w-full max-w-6xl items-center justify-center overflow-hidden my-auto py-2">
              {/* Left / Previous Button (Prominent Glowing Champagne on all screen sizes) */}
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-1 sm:left-3 md:left-6 z-30 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-champagne-400 bg-walnut-900/95 text-champagne-300 shadow-[0_0_20px_rgba(212,175,110,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-champagne-400 hover:text-walnut-950 hover:shadow-[0_0_30px_rgba(212,175,110,0.7)] focus:outline-none focus:ring-2 focus:ring-champagne active:scale-95"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 stroke-[2.5]" />
              </button>

              {/* Animated Slide-Pan Image Container */}
              <div className="relative flex h-[50vh] sm:h-[58vh] md:h-[64vh] w-full max-w-4xl items-center justify-center overflow-hidden px-12 sm:px-16">
                <AnimatePresence
                  custom={direction}
                  mode="popLayout"
                  initial={false}
                >
                  <motion.div
                    key={currentItem.id}
                    custom={direction}
                    variants={prefersReducedMotion ? undefined : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.28 },
                      scale: { duration: 0.28 },
                    }}
                    drag={prefersReducedMotion ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={(_, { offset, velocity }) => {
                      const swipe = offset.x;
                      if (swipe < -50 || velocity.x < -350) {
                        showNext();
                      } else if (swipe > 50 || velocity.x > 350) {
                        showPrev();
                      }
                    }}
                    className="relative flex h-full w-full items-center justify-center cursor-grab active:cursor-grabbing select-none"
                  >
                    <div className="relative h-full w-full max-h-full overflow-hidden rounded-md border-2 border-champagne-400/40 bg-walnut-950 shadow-[0_0_35px_rgba(0,0,0,0.85)]">
                      <Image
                        src={currentItem.imageUrl}
                        alt={currentItem.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 95vw, 1100px"
                        className="object-contain p-1 sm:p-2 pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right / Next Button (Prominent Glowing Champagne on all screen sizes) */}
              <button
                type="button"
                onClick={showNext}
                className="absolute right-1 sm:right-3 md:right-6 z-30 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-champagne-400 bg-walnut-900/95 text-champagne-300 shadow-[0_0_20px_rgba(212,175,110,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-champagne-400 hover:text-walnut-950 hover:shadow-[0_0_30px_rgba(212,175,110,0.7)] focus:outline-none focus:ring-2 focus:ring-champagne active:scale-95"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 stroke-[2.5]" />
              </button>
            </div>

            {/* Mobile-Friendly Bottom Quick Controls */}
            <div className="flex sm:hidden items-center justify-center gap-3 w-full py-1 z-30">
              <button
                type="button"
                onClick={showPrev}
                className="inline-flex items-center gap-1.5 rounded-full border border-champagne-400 bg-walnut-900 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 shadow-md active:bg-champagne-400 active:text-walnut-950"
              >
                <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
                Prev
              </button>
              <button
                type="button"
                onClick={showNext}
                className="inline-flex items-center gap-1.5 rounded-full border border-champagne-400 bg-walnut-900 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 shadow-md active:bg-champagne-400 active:text-walnut-950"
              >
                Next
                <ChevronRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Bottom Section: High-Contrast Caption Pill & Thumbnail Preview Strip */}
            <div className="relative z-20 flex w-full max-w-4xl flex-col items-center">
              {/* Caption Pill */}
              <div className="max-w-2xl rounded-lg border border-champagne-400/35 bg-walnut-900/90 px-5 py-2.5 sm:px-8 sm:py-3 text-center backdrop-blur-md shadow-lg">
                <h3
                  id={titleId}
                  className="font-display text-lg sm:text-2xl font-medium tracking-wide text-ivory-50"
                >
                  {currentItem.title}
                </h3>
                {currentItem.caption && (
                  <p className="mt-1 font-body text-xs sm:text-sm leading-relaxed text-champagne-200">
                    {currentItem.caption}
                  </p>
                )}
              </div>

              {/* Horizontal Thumbnail Navigation Strip */}
              <div className="mt-3 hidden sm:flex items-center justify-center gap-2 overflow-x-auto max-w-full px-2 py-1">
                {filteredItems.map((item, idx) => {
                  const isSelected = idx === lightboxIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => jumpToIndex(idx)}
                      className={cn(
                        "relative h-11 w-15 sm:h-12 sm:w-18 shrink-0 overflow-hidden rounded-xs transition-all duration-300 focus:outline-none",
                        isSelected
                          ? "border-2 border-champagne-400 scale-105 shadow-[0_0_12px_rgba(212,175,110,0.7)]"
                          : "border border-champagne-400/25 opacity-45 hover:opacity-90 hover:border-champagne-300"
                      )}
                      aria-label={`Jump to photo ${idx + 1}: ${item.title}`}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

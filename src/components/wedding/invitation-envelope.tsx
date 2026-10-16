"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { WeddingData } from "@/types/wedding";

interface InvitationEnvelopeProps {
  wedding: Pick<WeddingData, "bride" | "groom" | "city">;
  onOpen?: () => void;
}

/**
 * Royal Indian Wedding Ceremonial Opening Experience.
 *
 * Visual & Spiritual Features:
 * - 3D Embossed Metallic Gold Lord Ganesha Emblem
 * - Continuous Rotating Sacred Chakra / Mandala animation
 * - Sacred Sanskrit Shloka:
 *   "॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥"
 * - Deep royal walnut-950 candlelight & gold-dust atmosphere
 * - Auspicious couple announcement for Ananya & Arjun
 * - Interactive "Enter Invitation · शुभ विवाह" button with sound trigger (Kudmayi song)
 * - Runs on first visit & refresh with immediate 0-delay "Skip" option
 * - Cinematic parting-doors blur exit unveiling the main website
 */
export function InvitationEnvelope({ wedding, onOpen }: InvitationEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding:play-music"));
    }
    onOpen?.();
  }, [onOpen]);

  // Listen for replay requests from nav or footer
  useEffect(() => {
    const handleReopen = () => setIsOpen(false);
    window.addEventListener("wedding:reopen-intro", handleReopen);
    return () => window.removeEventListener("wedding:reopen-intro", handleReopen);
  }, []);

  // Lock body scroll when opening invitation is visible
  useEffect(() => {
    if (!isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard accessibility: ESC or Enter to open
  useEffect(() => {
    if (isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOpen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleOpen]);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="invitation-opening"
          role="dialog"
          aria-modal="true"
          aria-label="Auspicious Wedding Opening Ceremony"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-walnut-950/98 px-4 py-8 backdrop-blur-2xl select-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.08,
            filter: prefersReducedMotion ? "none" : "blur(8px)",
            transition: {
              duration: prefersReducedMotion ? 0.2 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
        >
          {/* Subtle Ambient Radial Gold Glow */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,110,0.18)_0%,rgba(38,31,26,0.95)_70%)]"
            aria-hidden="true"
          />

          {/* Quick Skip button in top right for instant access */}
          <button
            type="button"
            onClick={handleOpen}
            className="absolute right-4 top-4 z-30 rounded-full border border-champagne-400/40 bg-walnut-900/80 px-4 py-1.5 font-sans text-xs uppercase tracking-widest text-champagne-200 transition-all hover:bg-champagne-400 hover:text-walnut-950 focus:outline-none cursor-pointer sm:right-8 sm:top-8"
          >
            Skip to Invitation ✕
          </button>

          {/* Luxury Auspicious Card Container */}
          <motion.div
            className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center justify-center rounded-lg border border-champagne-400/40 bg-gradient-to-b from-walnut-900/90 via-walnut-950/95 to-walnut-950 p-6 sm:p-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.85)]"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Fine-Art Corner Accents */}
            <div className="pointer-events-none absolute inset-3 border border-champagne-400/20 rounded-xs" aria-hidden="true" />
            <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-champagne-400" aria-hidden="true" />
            <div className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-champagne-400" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-champagne-400" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-champagne-400" aria-hidden="true" />

            {/* Rotating Sacred Mandala Ring with Centered Gold Ganesha Emblem */}
            <div className="relative mx-auto mt-2 flex h-44 w-44 sm:h-52 sm:w-52 items-center justify-center">
              {/* Outer Pulsing Golden Halo */}
              <motion.div
                className="absolute inset-0 rounded-full bg-champagne-400/20 blur-2xl pointer-events-none"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.25, 1], opacity: [0.4, 0.85, 0.4] }
                }
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              />

              {/* Primary Clockwise Rotating Sacred Chakra Ring */}
              <motion.svg
                viewBox="0 0 240 240"
                className="absolute inset-0 h-full w-full text-champagne-400/60 pointer-events-none"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              >
                <circle
                  cx="120"
                  cy="120"
                  r="112"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="102"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />
                {Array.from({ length: 16 }).map((_, i) => (
                  <line
                    key={i}
                    x1="120"
                    y1="8"
                    x2="120"
                    y2="20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    transform={`rotate(${i * 22.5} 120 120)`}
                  />
                ))}
              </motion.svg>

              {/* Counter-Rotating Inner Filigree Ring */}
              <motion.svg
                viewBox="0 0 240 240"
                className="absolute inset-0 h-full w-full text-champagne-300/40 pointer-events-none"
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
              >
                <circle
                  cx="120"
                  cy="120"
                  r="92"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="8 8"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="84"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
              </motion.svg>

              {/* Centered 3D Gold Ganesha Emblem on Royal Velvet Burgundy */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative z-10 flex h-32 w-32 sm:h-38 sm:w-38 items-center justify-center overflow-hidden rounded-full border-2 border-champagne-300 bg-gradient-to-br from-[#7A1D2D] via-[#52101D] to-[#2E070F] shadow-[0_0_35px_rgba(212,175,110,0.75)]"
              >
                <Image
                  src="/images/ganesh-royal-red.jpg"
                  alt="Lord Ganesha Auspicious Wedding Emblem"
                  fill
                  priority
                  sizes="(max-width: 640px) 128px, 160px"
                  className="object-cover select-none pointer-events-none"
                />
              </motion.div>
            </div>

            {/* Sacred Vedic Shloka Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="font-serif text-sm sm:text-base font-semibold tracking-[0.3em] text-champagne-300">
                ॥ श्री गणेशाय नमः ॥
              </p>

              {/* Sanskrit Shloka */}
              <div className="mt-3 space-y-1.5 px-2">
                <p className="font-serif text-sm sm:text-lg font-medium leading-relaxed tracking-wider text-ivory-100">
                  वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
                </p>
                <p className="font-serif text-sm sm:text-lg font-medium leading-relaxed tracking-wider text-ivory-100">
                  निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                </p>
              </div>

              <p className="mt-2 text-[0.7rem] sm:text-xs font-body italic text-champagne-200/75 max-w-md mx-auto leading-relaxed">
                &ldquo;May Lord Ganesha remove all obstacles and shower eternal blessings upon this sacred bond.&rdquo;
              </p>
            </motion.div>

            {/* Auspicious Couple Announcement */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-6 w-full text-center"
            >
              <div className="my-2 h-px w-28 mx-auto bg-gradient-to-r from-transparent via-champagne-400/60 to-transparent" />

              <p className="font-sans text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-champagne-400">
                Auspicious Wedding Celebrations
              </p>

              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-light tracking-tight text-ivory-50">
                <span>{wedding.bride.firstName}</span>
                <span className="mx-2.5 font-serif text-xl sm:text-3xl italic text-champagne-400">&</span>
                <span>{wedding.groom.firstName}</span>
              </h2>

              <p className="mt-1 font-display text-xs italic tracking-widest text-champagne-200/80 sm:text-sm">
                Jai Mahal Palace • {wedding.city}
              </p>
            </motion.div>

            {/* Enter Invitation Trigger */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="mt-8 flex flex-col items-center justify-center"
            >
              <button
                type="button"
                onClick={handleOpen}
                className="relative inline-flex items-center justify-center rounded-full border-2 border-champagne-300 bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-500 px-8 sm:px-10 py-3 sm:py-3.5 text-walnut-950 shadow-sm transition-colors duration-300 hover:brightness-105 hover:border-champagne-200 cursor-pointer focus:outline-none"
              >
                <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-walnut-950">
                  Enter Invitation · शुभ विवाह
                </span>
              </button>

              <p className="mt-3 font-sans text-[0.62rem] font-medium uppercase tracking-[0.25em] text-champagne-400/80">
                Tap to Unseal & Begin Music
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

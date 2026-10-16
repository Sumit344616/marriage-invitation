"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { OrnamentalDivider } from "./ornamental-divider";
import type { WeddingData } from "@/types/wedding";

interface InvitationEnvelopeProps {
  wedding: Pick<WeddingData, "bride" | "groom" | "city">;
  onOpen?: () => void;
}

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStorageSnapshot(): boolean {
  try {
    return sessionStorage.getItem("wedding_invitation_opened") === "true";
  } catch {
    return false;
  }
}

function getServerStorageSnapshot(): boolean {
  return false;
}

/**
 * Luxury Indian Wedding Invitation Card / Envelope Opening Experience.
 *
 * Designed to evoke the ceremonial tactile experience of unsealing a gold-embossed
 * royal wedding card. Features:
 * - Wax seal emblem with couple's monogram (A & A)
 * - Sanskrit invocation: || श्री गणेशाय नमः ||
 * - Royal borders and metallic accents
 * - Fully accessible keyboard controls (Enter / Space / Escape)
 * - Instant skip button for direct access
 * - Strict adherence to prefers-reduced-motion
 */
export function InvitationEnvelope({ wedding, onOpen }: InvitationEnvelopeProps) {
  const sessionOpened = useSyncExternalStore(
    subscribeStorage,
    getStorageSnapshot,
    getServerStorageSnapshot
  );
  const [manuallyOpened, setManuallyOpened] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isOpen = sessionOpened || manuallyOpened;

  const handleOpen = useCallback(() => {
    setManuallyOpened(true);
    try {
      sessionStorage.setItem("wedding_invitation_opened", "true");
    } catch {
      // Ignore
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding:play-music"));
    }
    onOpen?.();
  }, [onOpen]);

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

  if (isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="invitation-opening"
          role="dialog"
          aria-modal="true"
          aria-label="Wedding Invitation Envelope"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-walnut-950/85 px-4 py-8 backdrop-blur-sm sm:px-6"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.04,
            transition: { duration: prefersReducedMotion ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Skip button in the top right for fast direct access */}
          <button
            type="button"
            onClick={handleOpen}
            className="absolute right-4 top-4 z-20 rounded-full border border-champagne/30 bg-walnut-900/80 px-4 py-1.5 font-sans text-xs uppercase tracking-widest text-champagne-200 transition-all hover:bg-champagne hover:text-walnut-950 focus:outline-none focus:ring-2 focus:ring-champagne sm:right-8 sm:top-8"
          >
            Skip to Invitation ✕
          </button>

          {/* Luxury Card Envelope Container */}
          <motion.div
            className="relative w-full max-w-lg rounded-sm border border-champagne/40 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFEB] to-[#ECE3DA] p-6 text-center shadow-2xl sm:p-10"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.5, ease: "easeOut" }}
          >
            {/* Ornate corner borders */}
            <div className="pointer-events-none absolute inset-3 border border-champagne/25" aria-hidden="true" />
            <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-champagne-600" aria-hidden="true" />
            <div className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-champagne-600" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-champagne-600" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-champagne-600" aria-hidden="true" />

            {/* Sacred Invocation */}
            <p className="font-serif text-xs font-semibold tracking-[0.25em] text-champagne-700 sm:text-sm">
              ॥ श्री गणेशाय नमः ॥
            </p>

            <p className="mt-4 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-walnut-500 sm:text-xs">
              Together with their families
            </p>

            {/* Couple Monogram / Names */}
            <div className="my-5">
              <h2 className="font-display text-4xl font-light tracking-tight text-walnut-900 sm:text-5xl">
                <span>{wedding.bride.firstName}</span>
                <span className="mx-2 font-serif text-2xl italic text-champagne-600 sm:text-3xl">&</span>
                <span>{wedding.groom.firstName}</span>
              </h2>
              <p className="mt-2 font-display text-xs italic tracking-widest text-walnut-400 sm:text-sm">
                Wedding Celebrations • {wedding.city}
              </p>
            </div>

            <OrnamentalDivider className="mx-auto max-w-[180px] my-4" symbol="✦" />

            {/* Wax Seal Button (Interactive trigger) */}
            <div className="my-6 flex flex-col items-center justify-center">
              <motion.button
                type="button"
                onClick={handleOpen}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className="group relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-champagne-400 bg-gradient-to-br from-[#80122B] to-[#4D0818] text-champagne-100 shadow-lg transition-shadow duration-300 hover:shadow-champagne/40 focus:outline-none focus:ring-4 focus:ring-champagne/50"
                aria-label="Open the wedding invitation"
              >
                {/* Wax seal ring design */}
                <div className="absolute inset-1 rounded-full border border-champagne-300/30" />
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-display text-sm font-semibold tracking-wider text-champagne-200">
                    A & A
                  </span>
                  <span className="mt-0.5 text-[0.55rem] uppercase tracking-widest text-champagne-300/80">
                    SEAL
                  </span>
                </div>
              </motion.button>

              <p className="mt-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-champagne-700">
                Tap to Open Invitation
              </p>
            </div>

            <p className="font-body text-xs italic text-walnut-500 sm:text-sm">
              &ldquo;Two lives, two souls, united in sacred love.&rdquo;
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

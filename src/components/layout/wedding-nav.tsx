"use client";

import { useState, useSyncExternalStore } from "react";
import { cn } from "cn";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#family", label: "Family" },
  { href: "#couple-story", label: "The Couple" },
  { href: "#spotlight", label: "The Wedding" },
  { href: "#events", label: "Ceremonies" },
  { href: "#gallery", label: "Gallery" },
  { href: "#accommodations", label: "Hotels" },
  { href: "#guest-info", label: "Guest Info" },
  { href: "#countdown", label: "Save the Date" },
] as const;

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  return window.scrollY > 40;
}

function getServerScrollSnapshot() {
  return false;
}

/**
 * Floating luxury wedding navigation with scroll-aware background transition.
 * Mobile: accessible drawer menu.
 * Desktop: horizontal link bar with quick RSVP button.
 */
export function WeddingNav() {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getServerScrollSnapshot
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-ivory-50/95 shadow-sm border-b border-champagne/20 backdrop-blur-md"
          : "bg-gradient-to-b from-walnut-950/60 to-transparent"
      )}
    >
      <nav
        className="wedding-container flex items-center justify-between py-3.5 sm:py-4"
        aria-label="Main wedding navigation"
      >
        {/* Monogram Logo */}
        <a
          href="#hero"
          className={cn(
            "font-display text-xl tracking-wider transition-colors sm:text-2xl",
            scrolled ? "text-walnut-900 hover:text-champagne-700" : "text-ivory-50 hover:text-champagne-300"
          )}
        >
          A <span className="font-serif italic text-champagne-500">&amp;</span> A
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-5 lg:gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                  scrolled
                    ? "text-walnut-700 hover:text-champagne-800"
                    : "text-ivory-100/90 hover:text-champagne-300"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop RSVP Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#rsvp"
            className="rounded-full border border-champagne-400/80 bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-500 px-5 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-walnut-950 shadow-sm transition-all duration-300 hover:brightness-105"
          >
            RSVP
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-sm p-2 transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-champagne",
            scrolled ? "text-walnut-800" : "text-ivory-100"
          )}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-champagne/20 bg-ivory-50/98 px-6 py-5 shadow-xl backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-sm px-3 py-2.5 font-sans text-xs font-semibold uppercase tracking-widest text-walnut-800 transition-colors hover:bg-champagne-50 hover:text-champagne-800"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

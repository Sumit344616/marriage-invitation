"use client";

import { useState, useEffect } from "react";
import { cn } from "cn";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#couple", label: "The Couple" },
  { href: "#events", label: "Events" },
  { href: "#countdown", label: "Save the Date" },
] as const;

/**
 * Floating wedding navigation with scroll-aware background transition.
 * Mobile: hamburger menu → slide-down panel.
 * Desktop: horizontal link bar.
 */
export function WeddingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ivory-50/90 shadow-[var(--wedding-shadow-subtle)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav
        className="wedding-container flex items-center justify-between py-4"
        aria-label="Main navigation"
      >
        {/* Logo / Monogram */}
        <a
          href="#"
          className="font-display text-xl tracking-wide text-walnut-900 transition-colors hover:text-burgundy sm:text-2xl"
        >
          A{" "}
          <span className="text-champagne">&</span>{" "}
          A
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-walnut-600 transition-colors duration-300 hover:text-burgundy"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm p-2 text-walnut-600 transition-colors hover:text-burgundy md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-champagne/15 bg-ivory-50/95 backdrop-blur-md md:hidden">
          <ul className="wedding-container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-sm px-3 py-3 font-sans text-sm font-medium uppercase tracking-[0.12em] text-walnut-600 transition-colors hover:bg-champagne/10 hover:text-burgundy"
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

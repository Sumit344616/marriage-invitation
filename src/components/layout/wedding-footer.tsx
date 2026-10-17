import { OrnamentalDivider } from "@/components/wedding/ornamental-divider";
import { Heart } from "lucide-react";

/**
 * Wedding invitation footer.
 * Refined, minimal footer with love motif and demo label.
 */
export function WeddingFooter() {
  return (
    <footer className="border-t border-champagne/15 bg-walnut-950 py-12 sm:py-16">
      <div className="wedding-container text-center">
        {/* Monogram */}
        <p className="font-display text-2xl tracking-wide text-ivory-200/80 sm:text-3xl">
          A <span className="text-champagne/60">&</span> A
        </p>

        <OrnamentalDivider
          className="mx-auto mt-4 max-w-[120px]"
          variant="champagne"
          symbol="♥"
        />

        <p className="mt-4 font-body text-sm leading-relaxed text-walnut-300/60">
          Two souls, one beautiful journey
        </p>

        <div className="mt-8 flex items-center justify-center gap-1.5 text-walnut-400/50">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em]">
            With Love &amp; Blessings
          </span>
          <Heart className="size-3 fill-champagne-400/40 text-champagne-400/60" aria-hidden="true" />
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em]">
            From Both Families
          </span>
        </div>

        <div className="mt-6 space-y-1.5">
          <p className="font-display text-base font-light tracking-widest text-champagne-300/90">
            Ananya Sharma &amp; Arjun Mehta
          </p>
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-walnut-400/60">
            Jai Mahal Palace · Jaipur, Rajasthan · December 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

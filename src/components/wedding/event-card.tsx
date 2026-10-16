import { cn } from "cn";
import { Calendar, Clock, MapPin, Navigation } from "lucide-react";
import { formatWeddingDate, formatTimeRange } from "@/lib/date-utils";
import type { WeddingEvent } from "@/types/wedding";

interface EventCardProps {
  event: WeddingEvent;
  className?: string;
  /** Visual emphasis for main ceremony */
  featured?: boolean;
}

/**
 * Wedding event card displaying ceremony/event details.
 * Features a refined layout with icons, date/time, venue, dress code, and map link.
 */
export function EventCard({ event, className, featured = false }: EventCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-sm border bg-card p-6 sm:p-8 transition-shadow duration-500",
        featured
          ? "border-champagne/50 bg-gradient-to-b from-ivory-50 to-champagne-50/20 shadow-md"
          : "border-champagne/20 shadow-xs",
        "hover:shadow-md",
        className
      )}
    >
      {/* Subtle shimmer overlay on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 wedding-shimmer" />

      {/* Top Content */}
      <div className="relative">
        {featured ? (
          <span className="mb-2 inline-block rounded-full border border-champagne-400/40 bg-champagne-100/60 px-3 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-champagne-800">
            Auspicious Ceremony
          </span>
        ) : (
          <span className="mb-2 inline-block font-sans text-[0.6rem] font-medium uppercase tracking-[0.2em] text-champagne-700">
            Celebration
          </span>
        )}

        <h3 className="font-display text-2xl font-medium tracking-tight text-walnut-900 sm:text-3xl">
          {event.name}
        </h3>

        {event.subtitle && (
          <p className="mt-0.5 font-sans text-xs text-champagne-700">
            {event.subtitle}
          </p>
        )}

        {/* Thin champagne rule */}
        <div className="my-4 h-px w-12 bg-champagne/40" aria-hidden="true" />

        {/* Details grid */}
        <div className="space-y-3 text-sm text-walnut-600">
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-champagne-600" aria-hidden="true" />
            <span className="font-body text-xs sm:text-sm text-walnut-800">{formatWeddingDate(event.date)}</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-champagne-600" aria-hidden="true" />
            <span className="font-body text-xs sm:text-sm text-walnut-800">{event.time || formatTimeRange(event.startTime, event.endTime)}</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne-600" aria-hidden="true" />
            <div>
              <span className="font-body font-medium text-walnut-900">{event.venue}</span>
              <br />
              <span className="text-xs text-walnut-500">{event.address}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <p className="mt-4 font-body text-xs sm:text-sm leading-relaxed text-walnut-500 italic">
            &ldquo;{event.description}&rdquo;
          </p>
        )}

        {/* Dress code */}
        {event.dressCode && (
          <div className="mt-4 border-t border-champagne/15 pt-3">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-champagne-800">
              Dress Code
            </p>
            <p className="font-body text-xs text-walnut-600">
              {event.dressCode}
            </p>
          </div>
        )}
      </div>

      {/* Directions action */}
      {event.mapUrl && (
        <div className="mt-6 pt-2">
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-700 transition-colors hover:text-champagne-900"
          >
            <Navigation className="h-3 w-3" />
            View on Map &rarr;
          </a>
        </div>
      )}
    </article>
  );
}

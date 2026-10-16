import { cn } from "cn";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { WeddingEvent } from "@/types/wedding";

interface EventCardProps {
  event: WeddingEvent;
  className?: string;
  /** Visual emphasis for main ceremony */
  featured?: boolean;
}

/**
 * Wedding event card displaying ceremony/event details.
 * Features a refined layout with icons, date/time, venue, and description.
 */
export function EventCard({ event, className, featured = false }: EventCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-sm border bg-card p-6 sm:p-8 transition-shadow duration-500",
        featured
          ? "border-champagne/40 shadow-[var(--wedding-shadow-soft)]"
          : "border-champagne/15 shadow-[var(--wedding-shadow-subtle)]",
        "hover:shadow-[var(--wedding-shadow-medium)]",
        className
      )}
    >
      {/* Subtle shimmer overlay on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 wedding-shimmer" />

      {/* Event name */}
      <div className="relative">
        {featured && (
          <span className="mb-3 inline-block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-champagne-500">
            Main Ceremony
          </span>
        )}
        <h3 className="font-display text-2xl font-medium tracking-tight text-walnut-900 sm:text-3xl">
          {event.name}
        </h3>

        {/* Thin champagne rule */}
        <div className="my-4 h-px w-12 bg-champagne/40" aria-hidden="true" />

        {/* Details grid */}
        <div className="space-y-3 text-sm text-walnut-600">
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 size-4 shrink-0 text-champagne-500" aria-hidden="true" />
            <span className="font-body">{event.date}</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-champagne-500" aria-hidden="true" />
            <span className="font-body">{event.time}</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-champagne-500" aria-hidden="true" />
            <div>
              <span className="font-body font-medium text-walnut-700">{event.venue}</span>
              <br />
              <span className="text-walnut-400">{event.address}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <p className="mt-5 font-body text-sm leading-relaxed text-walnut-500 italic">
            {event.description}
          </p>
        )}
      </div>
    </article>
  );
}

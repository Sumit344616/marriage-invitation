"use client";

import { useSyncExternalStore } from "react";
import { cn } from "cn";

interface CountdownProps {
  /** ISO 8601 date string for the wedding */
  targetDate: string;
  className?: string;
  variant?: "light" | "dark";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Cached timestamp store to avoid infinite loop warnings in React 19
let cachedTimestamp = 0;
let intervalId: ReturnType<typeof setInterval> | null = null;
const subscribers = new Set<() => void>();

function subscribe(callback: () => void) {
  subscribers.add(callback);

  if (subscribers.size === 1) {
    cachedTimestamp = Date.now();
    intervalId = setInterval(() => {
      cachedTimestamp = Date.now();
      subscribers.forEach((notify) => notify());
    }, 1000);
  }

  // Trigger initial tick notification for subscribers
  if (cachedTimestamp === 0) {
    cachedTimestamp = Date.now();
    callback();
  }

  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0 && intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      cachedTimestamp = 0;
    }
  };
}

function getSnapshot(): number {
  return cachedTimestamp;
}

function getServerSnapshot(): number {
  return 0;
}

/**
 * Animated wedding countdown timer.
 * Displays days, hours, minutes, seconds until the wedding date.
 * Uses a cached snapshot store to prevent React 19 infinite re-render warnings.
 */
export function Countdown({
  targetDate,
  className,
  variant = "light",
}: CountdownProps) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mounted = now > 0;

  const difference = mounted ? new Date(targetDate).getTime() - now : 0;
  const isPast = difference <= 0;

  const timeLeft: TimeLeft = {
    days: isPast ? 0 : Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: isPast ? 0 : Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: isPast ? 0 : Math.floor((difference / (1000 * 60)) % 60),
    seconds: isPast ? 0 : Math.floor((difference / 1000) % 60),
  };

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: "days", label: "Days" },
    { key: "hours", label: "Hours" },
    { key: "minutes", label: "Minutes" },
    { key: "seconds", label: "Seconds" },
  ];

  const isLight = variant === "light";

  return (
    <div
      className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}
      aria-label="Wedding countdown"
      role="timer"
    >
      {units.map(({ key, label }, i) => (
        <div key={key} className="flex items-center gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "font-display text-3xl font-light tabular-nums sm:text-4xl lg:text-5xl",
                isLight ? "text-ivory-100" : "text-walnut-900"
              )}
            >
              {mounted
                ? String(timeLeft[key]).padStart(2, "0")
                : "--"}
            </span>
            <span
              className={cn(
                "mt-1 font-sans text-[0.6rem] font-medium uppercase tracking-[0.2em] sm:text-xs",
                isLight ? "text-champagne-300" : "text-walnut-400"
              )}
            >
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              className="font-display text-2xl text-champagne-400/60 sm:text-3xl"
              aria-hidden="true"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

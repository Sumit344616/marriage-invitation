import { cn } from "cn";

interface OrnamentalDividerProps {
  className?: string;
  /** Symbol displayed in the center */
  symbol?: string;
  /** Color variant */
  variant?: "champagne" | "burgundy" | "walnut";
}

/**
 * Decorative divider with a centered ornamental symbol.
 * Used to separate sections in the invitation with visual elegance.
 */
export function OrnamentalDivider({
  className,
  symbol = "✦",
  variant = "champagne",
}: OrnamentalDividerProps) {
  const lineColor = {
    champagne: "bg-champagne/30",
    burgundy: "bg-burgundy/20",
    walnut: "bg-walnut-300/40",
  }[variant];

  const symbolColor = {
    champagne: "text-champagne",
    burgundy: "text-burgundy",
    walnut: "text-walnut-400",
  }[variant];

  return (
    <div
      className={cn("flex items-center gap-4 py-2", className)}
      role="separator"
      aria-hidden="true"
    >
      <div className={cn("h-px flex-1", lineColor)} />
      <span
        className={cn(
          "font-display text-sm tracking-widest select-none",
          symbolColor
        )}
      >
        {symbol}
      </span>
      <div className={cn("h-px flex-1", lineColor)} />
    </div>
  );
}

import { cn } from "cn";
import { OrnamentalDivider } from "./ornamental-divider";

interface SectionHeadingProps {
  /** Decorative label above the heading (e.g., "The Celebration") */
  label?: string;
  /** Main heading text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Text alignment */
  align?: "left" | "center";
  className?: string;
  /** Show ornamental divider */
  divider?: boolean;
}

/**
 * Consistent section heading with optional label, subtitle, and ornamental divider.
 * Establishes visual hierarchy across all invitation sections.
 */
export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className,
  divider = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-champagne-500">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl font-light tracking-tight text-walnut-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-body text-base leading-relaxed text-walnut-500 sm:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {divider && (
        <OrnamentalDivider className="mt-6 max-w-xs mx-auto" />
      )}
    </div>
  );
}

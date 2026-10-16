/**
 * Wedding Design Tokens
 *
 * Luxury Indian wedding aesthetic:
 * - Warm ivory backgrounds
 * - Champagne-gold accents (restrained)
 * - Deep burgundy details
 * - Rich walnut and espresso neutrals
 * - Elegant serif display typography
 *
 * These tokens are consumed by Tailwind via CSS custom properties
 * and can be swapped per-wedding theme in future phases.
 */

export const weddingColors = {
  // --- Core Palette ---
  ivory: {
    50: "#FFFEF9",
    100: "#FEFCF0",
    200: "#FDF8E1",
    300: "#FBF3CE",
    400: "#F8EDB9",
    500: "#F5E6A3",
    DEFAULT: "#FEFCF0",
  },
  champagne: {
    50: "#FBF8F0",
    100: "#F5EDDA",
    200: "#EDDCB5",
    300: "#E2C88D",
    400: "#D4AF6E",
    500: "#C9A05C",
    600: "#B8894A",
    700: "#9A6F3C",
    DEFAULT: "#D4AF6E",
  },
  burgundy: {
    50: "#FBF2F0",
    100: "#F3DCD8",
    200: "#E5B5AE",
    300: "#D28A7F",
    400: "#B85C52",
    500: "#8B2635",
    600: "#762030",
    700: "#611A28",
    800: "#4D1520",
    900: "#3A1018",
    DEFAULT: "#8B2635",
  },
  walnut: {
    50: "#F9F7F5",
    100: "#F0EBE5",
    200: "#DDD4C8",
    300: "#C4B5A3",
    400: "#A8937B",
    500: "#8D7660",
    600: "#73604E",
    700: "#5E4D3F",
    800: "#4A3D32",
    900: "#382E26",
    950: "#261F1A",
    DEFAULT: "#5E4D3F",
  },
  sage: {
    50: "#F6F7F4",
    100: "#E8EBE2",
    200: "#D5DBC8",
    300: "#B8C4A3",
    400: "#9BAD80",
    DEFAULT: "#B8C4A3",
  },

  // --- Semantic ---
  success: "#5D8A4E",
  warning: "#C9A05C",
  error: "#8B2635",
  info: "#5B7B8A",
} as const;

export const weddingTypography = {
  fonts: {
    /** Elegant serif for headings, names, and display text */
    display: "var(--font-display)",
    /** Readable serif for body text and descriptions */
    body: "var(--font-body)",
    /** Sans-serif for UI, forms, and meta text */
    sans: "var(--font-sans)",
  },
  /** Font size scale (rem) */
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
  },
  /** Line height scale */
  leading: {
    tight: "1.15",
    snug: "1.3",
    normal: "1.5",
    relaxed: "1.65",
    loose: "1.8",
  },
  /** Letter spacing */
  tracking: {
    tighter: "-0.04em",
    tight: "-0.02em",
    normal: "0",
    wide: "0.05em",
    wider: "0.1em",
    widest: "0.2em",
  },
} as const;

export const weddingSpacing = {
  section: {
    sm: "3rem",
    md: "5rem",
    lg: "7rem",
    xl: "9rem",
  },
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
  },
} as const;

export const weddingAnimation = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "700ms",
    reveal: "1000ms",
  },
  easing: {
    gentle: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    elegant: "cubic-bezier(0.16, 1, 0.3, 1)",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    smooth: "cubic-bezier(0.45, 0, 0.55, 1)",
  },
  /** Motion variants for use with `motion` library */
  variants: {
    fadeUp: {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6 } },
    },
    staggerContainer: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.15 } },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.92 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -32 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    },
    slideInRight: {
      hidden: { opacity: 0, x: 32 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    },
  },
} as const;

export const weddingShadows = {
  subtle: "0 1px 3px rgba(94, 77, 63, 0.06), 0 1px 2px rgba(94, 77, 63, 0.04)",
  soft: "0 4px 12px rgba(94, 77, 63, 0.08), 0 2px 4px rgba(94, 77, 63, 0.04)",
  medium: "0 8px 24px rgba(94, 77, 63, 0.1), 0 4px 8px rgba(94, 77, 63, 0.06)",
  elevated: "0 12px 40px rgba(94, 77, 63, 0.12), 0 6px 12px rgba(94, 77, 63, 0.08)",
  glow: "0 0 20px rgba(212, 175, 110, 0.15)",
} as const;

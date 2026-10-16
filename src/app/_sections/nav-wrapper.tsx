"use client";

import { WeddingNav } from "@/components/layout/wedding-nav";

/** Thin client wrapper so the nav can be used inside a server page */
export function WeddingNavWrapper() {
  return <WeddingNav />;
}

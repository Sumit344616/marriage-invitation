import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Inter } from "next/font/google";
import "./globals.css";

/**
 * Font Configuration — Luxury Indian Wedding Aesthetic
 *
 * Display: Cormorant Garamond — elegant high-contrast serif for names and headings
 * Body:    Lora — warm, readable serif for descriptions and body text
 * Sans:    Inter — clean sans-serif for UI elements, forms, and meta text
 */
const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ananya & Arjun — Wedding Invitation",
  description:
    "You are cordially invited to celebrate the wedding of Ananya Sharma and Arjun Mehta. Join us for a beautiful celebration of love and togetherness.",
  openGraph: {
    title: "Ananya & Arjun — Wedding Invitation",
    description:
      "You are cordially invited to celebrate the wedding of Ananya Sharma and Arjun Mehta.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${sansFont.variable} h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

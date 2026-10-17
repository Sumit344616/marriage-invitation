import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lora, Inter } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ananya & Arjun — Auspicious Wedding Invitation",
  description:
    "You are cordially invited to celebrate the sacred wedding of Ananya Sharma and Arjun Mehta at Jai Mahal Palace, Jaipur, Rajasthan. Join us for four days of divine celebrations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ananya & Arjun — Auspicious Wedding Invitation",
    description:
      "You are cordially invited to celebrate the sacred wedding of Ananya Sharma and Arjun Mehta at Jai Mahal Palace, Jaipur. Join us for four days of celebrations.",
    url: siteUrl,
    siteName: "Ananya & Arjun Wedding",
    images: [
      {
        url: "/images/hero-couple.jpg",
        width: 1200,
        height: 630,
        alt: "Ananya Sharma and Arjun Mehta Royal Wedding Invitation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananya & Arjun — Auspicious Wedding Invitation",
    description:
      "You are cordially invited to celebrate the sacred wedding of Ananya Sharma and Arjun Mehta at Jai Mahal Palace, Jaipur.",
    images: ["/images/hero-couple.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
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
      className={`${displayFont.variable} ${bodyFont.variable} ${sansFont.variable} h-full w-full max-w-full overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
      suppressHydrationWarning
    >
      <body className="min-h-full w-full max-w-full overflow-x-hidden flex flex-col bg-walnut-950 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
